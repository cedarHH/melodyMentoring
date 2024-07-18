import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
    message: string;
    visible: boolean;
}

const initialState: NotificationState = {
    message: '',
    visible: false,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
            state.visible = true;
        },
        hideNotification: (state) => {
            state.message = '';
            state.visible = false;
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const showNotificationWithTimeout = (message: string): any => (dispatch: any) => {
    dispatch(showNotification(message));
    setTimeout(() => {
        dispatch(hideNotification());
    }, 3000); // 3 seconds
};

export default notificationSlice.reducer;