import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/AuthAction';

interface AuthState {
    loading: boolean;
    user: any;
    error: string | null;
}

const initialState: AuthState = {
    loading: false,
    user: null,
    error: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export type authState = ReturnType<typeof authReducer>;
export default authReducer;
