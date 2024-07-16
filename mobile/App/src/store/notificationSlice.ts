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

export default notificationSlice.reducer;
