import { Dispatch } from 'redux';
import {AuthThunk} from '../types/types'
import { loginRequest, loginSuccess, loginFailure } from '../actions/deprecated_AuthAction';

export const login = (email: string, password: string): AuthThunk => {
    return async (dispatch: Dispatch) => {
        dispatch(loginRequest(email, password));
        try {
            //todo
            //dispatch(loginSuccess(response));
        } catch (error) {
            dispatch(loginFailure('Login failed'));
        }
    };
};
