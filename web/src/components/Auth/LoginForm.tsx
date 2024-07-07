import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../MISC/Button";
import LogoVertical from "../MISC/LogoVertical";
import Notification from "../MISC/Notification";
import {AuthMode} from "./AuthModal";
import {AuthContext} from "../../contexts/AuthContext";
import logo from '../../assets/img/logo/mygo.jpg'
import '../../styles/AuthForm.css'
import {useValidCode, useValidEmail} from "../../hooks/useAuthHooks";

interface LoginFormProps {
    setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
    onClose: () => void;
}

const LoginForm: React.FC< LoginFormProps > = ({ setAuthMode, onClose }) => {
    const {email, setEmail, emailIsValid} = useValidEmail('');
    const [password, setPassword] = useState('');
    const {code, setCode, codeIsValid} = useValidCode('');
    const [error, setError] = useState('')
    const [isConfirmed, setIsConfirmed] = useState(true)
    const [showNotification, setShowNotification] = useState(false);
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setShowNotification(false);

        if (!emailIsValid) {
            setError('Invalid email format.');
            setShowNotification(true);
            return;
        }

        try {
            if (authContext.signInWithEmail) {
                await authContext.signInWithEmail(email, password);
                navigate('/home');
            } else {
                setError('signInWithEmail is not defined');
                setShowNotification(true);
            }
        } catch (err: any) {
            switch (err.code) {
                case 'UserNotConfirmedException':
                    setError('Your account is not confirmed. Please check your email.');
                    setIsConfirmed(false);
                    break;
                case 'NotAuthorizedException':
                    setError('Incorrect email or password.');
                    break;
                // case 'UserNotFoundException':
                //     setError('User does not exist.');
                //     break;
                default:
                    setError(err.message);
            }
            setShowNotification(true);
        }
    };

    const handleVerificationCode = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!codeIsValid) {
            setError('Invalid verification code format.');
            setShowNotification(true);
            return;
        }

        try {
            if (authContext.verifyCode && authContext.signInWithEmail && email) {
                await authContext.verifyCode(email, code);
                await authContext.signInWithEmail(email, password);
                navigate("/home");
            } else {
                setError('verifyCode or email is not defined');
                setShowNotification(true);
            }
        } catch (err: any) {
            switch (err.code) {
                case 'CodeMismatchException':
                    setError('Invalid verification code.');
                    break;
                case 'ExpiredCodeException':
                    setError('The verification code has expired.');
                    break;
                default:
                    setError(err.message);
            }
            setShowNotification(true);
        }
    }

    const handleSendAgainClick = async () => {
        try {
            if (authContext.sendCode && email) {
                await authContext.sendCode(email)
            } else {
                setError('sendCode or email is not defined');
                setShowNotification(true);
            }
        } catch (err: any) {
            setError(err.code);
            setShowNotification(true);
        }
    }

    return (
        <div className="authContainer">
            <LogoVertical
                radius="10vw"
                imageUrl={logo}
                text="Login"
            />
            {showNotification && (
                <Notification
                    width="100%"
                    message={error}
                />
            )}
            <form onSubmit={handleSubmit}>
                <input className="inputStyle"
                       type="email"
                       placeholder="Email"
                       value={email}
                       disabled={!isConfirmed}
                       onChange={(e) => setEmail(e.target.value)}
                />
                <input className="inputStyle"
                       type="password"
                       placeholder="Password"
                       value={password}
                       disabled={!isConfirmed}
                       onChange={(e) => setPassword(e.target.value)}
                />
                { isConfirmed && (
                    <Button className="buttonStyle" type="submit" text="Log in"/>
                )}
            </form>
            { !isConfirmed && (
                <form onSubmit={handleVerificationCode}>
                    <input className="inputStyle"
                           type="string"
                           placeholder="Verification Code"
                           value={code}
                           onChange={(e) => setCode(e.target.value)}
                    />
                    <Button className="buttonStyle" type="submit" text="Verify"/>
                    <Button className="buttonStyle" type="button" text="Send again" onClick={handleSendAgainClick}/>
                </form>
            )}
            <div className="bottomContainer">
                <Button className="transparent-button" type="button" text="Reset password" onClick={() => {
                    setAuthMode(AuthMode.RESET_PASSWORD)
                }}/>
                <Button className="transparent-button" type="button" text="New user? Sign up" onClick={() => {
                    setAuthMode(AuthMode.REGISTER)
                }}/>
            </div>
        </div>
    );
};

export default LoginForm;
