import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SubUserLoginState {
    [profileName: string]: boolean | null;
}

interface FirstLoginState {
    subUserLogins: SubUserLoginState;
}

const initialState: FirstLoginState = {
    subUserLogins: {},
};

const firstLoginSlice = createSlice({
    name: 'firstLogin',
    initialState,
    reducers: {
        setFirstLogin(state, action: PayloadAction<{ profileName: string, isFirstLogin: boolean }>) {
            state.subUserLogins[action.payload.profileName] = action.payload.isFirstLogin;
            console.log(`Set first login state for ${action.payload.profileName}:`, action.payload.isFirstLogin);
            },
    },
});

export const { setFirstLogin } = firstLoginSlice.actions;

export const checkFirstLogin = (profileName: string) => async (dispatch: AppDispatch) => {
    try {
        const storedValue = await AsyncStorage.getItem(`isFirstLogin_${profileName}`);
        if (storedValue === null) {
            await AsyncStorage.setItem(`isFirstLogin_${profileName}`, 'false');
            dispatch(setFirstLogin({ profileName, isFirstLogin: true }));
        } else if (storedValue === 'true') {
            dispatch(setFirstLogin({profileName, isFirstLogin: true}));
        } else {
            dispatch(setFirstLogin({ profileName, isFirstLogin: false }));
        }
    } catch (error) {
        console.error('check first login false', error);
    }
};

export default firstLoginSlice.reducer;
