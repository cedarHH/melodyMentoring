import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import notificationReducer from './notificationSlice';
import firstLoginReducer from './firstLoginSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        notification: notificationReducer,
        firstLogin: firstLoginReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
