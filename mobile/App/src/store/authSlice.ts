import {createSlice, PayloadAction, ThunkAction} from '@reduxjs/toolkit';
import {signInWithEmail, signUpUserWithEmail, verifyCode, sendCode, forgotPassword, signOut} from '../libs/cognito';
import {RootState, AppDispatch} from './store';
import {showNotification, showNotificationWithTimeout} from './notificationSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../contexts/types';

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
            state.history.push(state.authMode);
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

export const {
    authStart,
    authSuccess,
    authFailure,
    logout,
    setAuthMode,
    setEmailForVerification,
    goBack
} = authSlice.actions;

export const login = (
    email: string,
    password: string,
    navigation: StackNavigationProp<RootStackParamList, 'Welcome'>,
    api: any
): ThunkAction<void, RootState, undefined, PayloadAction<any>> => async (dispatch: AppDispatch) => {
    dispatch(authStart());
    try {
        console.log(api);

        const session = await signInWithEmail(email, password);
        console.log('Login successful');
        const {accessToken, idToken, refreshToken} = session;
        const tokenData = {
            accessToken: accessToken.jwtToken,
            idToken: idToken.jwtToken,
            refreshToken: refreshToken.token,
        };
        console.log(tokenData.idToken);
        console.log('Tokens are saved successfully!');
        api.setIdToken(tokenData.idToken);
        dispatch(authSuccess({email, username: 'N/A'}));
        dispatch(showNotificationWithTimeout("Login successful"));
        navigation.navigate('SubUser');
    } catch (err: any) {
        console.log(err);
        if (err.code === 'UserNotConfirmedException') {
            dispatch(setAuthMode(AuthMode.VERIFY_CODE));
            dispatch(setEmailForVerification(email));
            dispatch(showNotificationWithTimeout("Your account is not confirmed. Please verify your email."));
        } else {
            const errorMessage = err.message || 'Failed to login';
            dispatch(authFailure(errorMessage));
            dispatch(showNotificationWithTimeout(errorMessage));
        }
        throw err;
    }
};

export const register = (
    email: string,
    username: string,
    password: string,
    confirmPassword: string
): ThunkAction<void, RootState, undefined, PayloadAction<any>> => async (dispatch: AppDispatch) => {
    if (password !== confirmPassword) {
        dispatch(authFailure("Password mismatch: The passwords do not match."));
        dispatch(showNotificationWithTimeout("Password mismatch: The passwords do not match."));
        return;
    }
    dispatch(authStart());
    try {
        const response = await signUpUserWithEmail(email, email, password, username);
        console.log('Registration successful:', response);
        dispatch(setEmailForVerification(email));
        dispatch(setAuthMode(AuthMode.VERIFY_CODE));
        dispatch(authSuccess({email, username}));
    } catch (error: any) {
        console.log(error);
        let errorMessage = "Registration failed. Please try again.";

        if (error.message) {
            if (error.message.includes('password')) {
                errorMessage = 'Password must not contain leading or trailing whitespace and must satisfy all complexity requirements.';
            } else if (error.message.includes('username')) {
                errorMessage = 'Username must be at least 1 character long and contain only valid characters.';
            } else if (error.message.includes('email')) {
                errorMessage = 'Invalid email address format.';
            } else if (error.message.includes('InvalidParameterException')) {
                errorMessage = 'Invalid input. Please make sure all fields are correctly filled.';
            } else {
                errorMessage = error.message;
            }
        }
        dispatch(authFailure(errorMessage));
        dispatch(showNotificationWithTimeout(errorMessage));
    }
};

export const verifyEmailCode = (email: string, verificationCode: string): ThunkAction<void, RootState, undefined, PayloadAction<any>> => async (dispatch: AppDispatch) => {
    dispatch(authStart());
    try {
        await verifyCode(email, verificationCode);
        dispatch(setAuthMode(AuthMode.WELCOME));
        dispatch(authSuccess({email, username: 'N/A'}));
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
        dispatch(authSuccess({email, username: 'N/A'}));
    } catch (error: any) {
        dispatch(authFailure(error.message));
        dispatch(showNotification(error.message));
    }
};

function parseErrorMessage(errorMessage: string): string {
    if (errorMessage.includes("confirmationCode")) {
        return "Invalid confirmation code. Please make sure you've entered it correctly.";
    } else if (errorMessage.includes("password")) {
        return "Password does not meet the required criteria. Please ensure it contains at least one letter and one number.";
    } else if (errorMessage.includes("username")) {
        return "Invalid username. Please ensure it meets the criteria.";
    } else {
        return "An unexpected error occurred. Please try again.";
    }
}

export const resetPassword = (
    email: string,
    verificationCode: string,
    newPassword: string
): ThunkAction<Promise<void>, RootState, undefined, PayloadAction<any>> => async (dispatch: AppDispatch) => {
    dispatch(authStart());
    try {
        await forgotPassword(email, verificationCode, newPassword);
        dispatch(setAuthMode(AuthMode.LOGIN));
        dispatch(authSuccess({email, username: 'N/A'}));
    } catch (error: any) {
        console.log(error.message);
        const userFriendlyError = parseErrorMessage(error.message);
        dispatch(authFailure(userFriendlyError));
        dispatch(showNotification(userFriendlyError));
        throw new Error(userFriendlyError);
    }
};

export const userLogout = (
    navigateToWelcome: () => void
): ThunkAction<void, RootState, undefined, PayloadAction<any>> => async (dispatch: AppDispatch) => {
    try {
        signOut();
        dispatch(logout());
        dispatch(showNotificationWithTimeout("Logout successful"));
        navigateToWelcome();
    } catch (err: any) {
        dispatch(showNotificationWithTimeout(err.message || 'Failed to logout'));
    }
};


export default authSlice.reducer;