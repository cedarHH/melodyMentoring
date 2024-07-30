import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FirstLoginState {
    isFirstLogin: boolean | null;
}

const initialState: FirstLoginState = {
    isFirstLogin: null,
};

const firstLoginSlice = createSlice({
    name: 'firstLogin',
    initialState,
    reducers: {
        setFirstLogin(state, action: PayloadAction<boolean>) {
            state.isFirstLogin = action.payload;
        },
    },
});

export const { setFirstLogin } = firstLoginSlice.actions;

export const checkFirstLogin = () => async (dispatch: AppDispatch) => {
    try {
        const isFirstLogin = await AsyncStorage.getItem('isFirstLogin');
        if (isFirstLogin === null) {
            await AsyncStorage.setItem('isFirstLogin', 'false');
            dispatch(setFirstLogin(true));
        } else {
            dispatch(setFirstLogin(false));
        }
    } catch (error) {
        console.error('Failed to check first login:', error);
    }
};

export default firstLoginSlice.reducer;
