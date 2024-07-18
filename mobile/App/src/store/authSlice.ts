import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { signInWithEmail, signUpUserWithEmail, verifyCode, sendCode, forgotPassword } from '../libs/cognito';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState, AppDispatch } from './store';
import { showNotification, showNotificationWithTimeout } from './notificationSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

export enum AuthMode {
    WELCOME = 'welcome',
    LOGIN = 'login',
    REGISTER = 'register',
    RESET_PASSWORD = 'reset_password',
    VERIFY_CODE = 'verify_code',
}

interface AuthState {
    isAuthenticated: boolean;
    userInfo: {
        email: string;
        username: string;
    } | null;
    loading: boolean;
    error: string | null;
    authMode: AuthMode;
    emailForVerification: string;
    history: AuthMode[];
}

const initialState: AuthState = {
    isAuthenticated: false,
    userInfo: null,
    loading: false,
    error: null,
    authMode: AuthMode.WELCOME,
    emailForVerification: '',
    history: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        authSuccess: (state, action: PayloadAction<{ email: string; username: string }>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.userInfo = action.payload;
            state.error = null;
        },
        authFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userInfo = null;
        },
        setAuthMode: (state, action: PayloadAction<AuthMode>) => {
            state.history.push(state.authMode); // 将当前页面添加到历史栈中
            state.authMode = action.payload;
        },
        setEmailForVerification: (state, action: PayloadAction<string>) => {
            state.emailForVerification = action.payload;
        },
        goBack: (state) => {
            if (state.history.length > 0) {
                state.authMode = state.history.pop()!;
            }
        },
    },
});

export const { authStart, authSuccess, authFailure, logout, setAuthMode, setEmailForVerification, goBack } = authSlice.actions;

export const login = (
    email: string,
    password: string,
    navigation: StackNavigationProp<RootStackParamList, 'Welcome'>
): ThunkAction<void, RootState, undefined, PayloadAction<any>> => async (dispatch: AppDispatch) => {
    dispatch(authStart());
    try {
        const session = await signInWithEmail(email, password);
        console.log('Login successful');
        const { accessToken, idToken, refreshToken } = session;
        const tokenData = {
            accessToken: accessToken.jwtToken,
            idToken: idToken.jwtToken,
            refreshToken: refreshToken.token,
        };
        const tokenStr = JSON.stringify(tokenData);
        console.log('Tokens are saved successfully!');
        await AsyncStorage.setItem('Token', tokenStr);
        dispatch(authSuccess({ email, username: 'N/A' }));
        dispatch(showNotificationWithTimeout("Login successful"));
        navigation.navigate('SubUser');
    } catch (err: any) {
        dispatch(authFailure(err.message || 'Failed to login'));
        dispatch(showNotificationWithTimeout(err.message || 'Failed to login'));
        throw err;
    }
};

export const register = (email: string, username: string, password: string, confirmPassword: string): ThunkAction<void, RootState, undefined, PayloadAction<any>> => async (dispatch: AppDispatch) => {
    if (password !== confirmPassword) {
        dispatch(authFailure("Password mismatch: The passwords do not match."));
        return;
    }
    dispatch(authStart());
    try {
        const response = await signUpUserWithEmail(email, email, password, username);
        console.log('Registration successful:', response);
        dispatch(setEmailForVerification(email));
        dispatch(setAuthMode(AuthMode.VERIFY_CODE));
        dispatch(authSuccess({ email, username }));
    } catch (error: any) {
        dispatch(authFailure(error.message));
    }
};

export const verifyEmailCode = (email: string, verificationCode: string): ThunkAction<void, RootState, undefined, PayloadAction<any>> => async (dispatch: AppDispatch) => {
    dispatch(authStart());
    try {
        await verifyCode(email, verificationCode);
        dispatch(setAuthMode(AuthMode.WELCOME));
        dispatch(authSuccess({ email, username: 'N/A' }));
    } catch (error: any) {
        dispatch(authFailure(error.message));
        dispatch(showNotification(error.message));
    }
};

export const sendResetCode = (email: string): ThunkAction<Promise<void>, RootState, undefined, PayloadAction<any>> => async (dispatch: AppDispatch) => {
    dispatch(authStart());
    try {
        await sendCode(email);
        dispatch(setEmailForVerification(email));
        dispatch(authSuccess({ email, username: 'N/A' }));
    } catch (error: any) {
        dispatch(authFailure(error.message));
        dispatch(showNotification(error.message));
    }
};

export const resetPassword = (email: string, verificationCode: string, newPassword: string): ThunkAction<Promise<void>, RootState, undefined, PayloadAction<any>> => async (dispatch: AppDispatch) => {
    dispatch(authStart());
    try {
        await forgotPassword(email, verificationCode, newPassword);
        dispatch(setAuthMode(AuthMode.LOGIN));
        dispatch(authSuccess({ email, username: 'N/A' }));
    } catch (error: any) {
        dispatch(authFailure(error.message));
        dispatch(showNotification(error.message));
    }
};

export default authSlice.reducer;