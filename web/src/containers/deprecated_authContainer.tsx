import React from 'react';
import { connect } from 'react-redux';
import {Dispatch, UnknownAction} from 'redux';
import { login } from '../thunks/deprecated_AuthThunk';
import {authState} from '../reducers/deprecated_AuthReducer'
import {ThunkDispatch} from "redux-thunk";
import LoginForm from '../components/Auth/LoginForm';

interface LoginContainerProps {
    login: (email: string, password: string) => void;
}

const LoginContainer: React.FC<LoginContainerProps> = ({ login }) => {
    return <LoginForm
        setAuthMode={()=>{}}
        onClose={()=>{}}
    />;
};

const mapDispatchToProps = (dispatch: ThunkDispatch<authState, unknown, UnknownAction>) => ({
    login: (email: string, password: string) => dispatch(login(email, password)),
});

export default connect(null, mapDispatchToProps)(LoginContainer);
