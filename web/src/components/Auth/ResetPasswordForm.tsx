import React, {useContext, useState} from "react";
import '../../styles/Welcome.css';
import Button from "../MISC/Button";
import {AuthMode} from "./AuthModal";
import LogoVertical from "../MISC/LogoVertical";
import logo from "../../assets/img/logo/mygo.jpg";
import {AuthContext} from "../../contexts/AuthContext";
import Notification from "../MISC/Notification";
import {useValidCode, useValidPassword} from "../../hooks/useAuthHooks";
import {useNavigate} from "react-router-dom";

interface ResetPasswordFormProps {
    setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({setAuthMode}) => {
    const [email, setEmail] = useState('');
    const {code, setCode, codeIsValid} = useValidCode('');
    const {password, setPassword, passwordIsValid, formatError} = useValidPassword('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const authContext = useContext(AuthContext)
    const [error, setError] = useState('')
    const [stage, setStage] = useState('enterEmail');

    const sendVerificationCode = async () => {
        try {
            if (authContext.sendCode && email) {
                await authContext.sendCode(email);
                setStage('resetPassword');
            } else {
                setError('sendCode or email is not defined');
                setShowNotification(true);
            }
        } catch (err: any) {
            setError(err.code);
            setShowNotification(true);
        }
    };

    const resetPassword = async () => {
        if (!codeIsValid) {
            setError('Invalid verification code format.');
            setShowNotification(true);
            return;
        }

        if (!passwordIsValid) {
            setError(`${formatError}`);
            setShowNotification(true);
            return;
        }
        if (password !== confirmPassword) {
            setError('The passwords do not match');
            setShowNotification(true);
            return;
        }
        try {
            if(authContext.forgotPassword){
                await authContext.forgotPassword(email, code, password)
                if (authContext.signInWithEmail) {
                    await authContext.signInWithEmail(email, password);
                } else {
                    setError('signInWithEmail is not defined');
                    setShowNotification(true);
                }
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

    return (
        <div className="authContainer">
            <LogoVertical
                radius="10vw"
                imageUrl={logo}
                text="Reset Password" // Create a free account to discover your personalized learning path
            />
            {showNotification && (
                <Notification
                    width="100%"
                    message={error}
                />
            )}
            <form onSubmit={(e) => e.preventDefault()}>
                {stage === 'enterEmail' && (
                    <>
                        <input className="inputStyle"
                               type="email"
                               placeholder="Email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button className="buttonStyle" type="button" text="Send Code" onClick={sendVerificationCode}/>
                    </>
                )}
                {stage === 'resetPassword' && (
                    <>
                        <input className="inputStyle"
                               type="email"
                               value={email}
                               disabled
                        />
                        <input className="inputStyle"
                               type="text"
                               placeholder="Enter verification code"
                               value={code}
                               onChange={(e) => setCode(e.target.value)}
                        />
                        <input className="inputStyle"
                               type="password"
                               placeholder="Password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                        <input className="inputStyle"
                               type="password"
                               placeholder="Confirm Password"
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button className="buttonStyle" type="button" text="Reset Password" onClick={resetPassword}/>
                        <Button className="buttonStyle" type="button" text="Send Again" onClick={sendVerificationCode}/>
                    </>
                )}
            </form>
            <div className="bottomContainer">
                <Button className="transparent-button" type="button" text="Cancel Reset" onClick={() => {
                    setAuthMode(AuthMode.LOGIN)
                }}/>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
