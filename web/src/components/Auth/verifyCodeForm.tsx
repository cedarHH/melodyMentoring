import React, {useContext, useEffect, useState} from "react";
import '../../styles/Welcome.css';
import Button from "../MISC/Button";
import {AuthMode} from "./AuthModal";
import LogoVertical from "../MISC/LogoVertical";
import logo from "../../assets/img/logo/mygo.jpg";
import {useValidCode} from "../../hooks/useAuthHooks";
import Notification from "../MISC/Notification";
import {AuthContext} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

interface VerifyCodeFormProps {
    setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
    onClose: () => void;
}

const VerifyCodeForm: React.FC<VerifyCodeFormProps> = ({setAuthMode, onClose}) => {
    const {code, setCode, codeIsValid} = useValidCode('');
    const [error, setError] = useState('')
    const [showNotification, setShowNotification] = useState(false);
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSendAgainClick = async () => {
        try {
            if (authContext.sendCode && authContext.currentUserEmail) {
                await authContext.sendCode(authContext.currentUserEmail)
            } else {
                setError('sendCode or email is not defined');
                setShowNotification(true);
            }
        } catch (err: any) {
            setError(err.code);
            setShowNotification(true);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!codeIsValid) {
            setError('Invalid verification code format.');
            setShowNotification(true);
            return;
        }

        try {
            if (authContext.verifyCode && authContext.currentUserEmail) {
                await authContext.verifyCode(authContext.currentUserEmail, code);
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
    };

    return (
        <div className="authContainer">
            <LogoVertical
                radius="10vw"
                imageUrl={logo}
                text="Verify Your Email"
            />
            {showNotification && (
                <Notification
                    width="100%"
                    message={error}
                />
            )}
            <form onSubmit={handleSubmit}>
                <input className="inputStyle"
                       type="string"
                       placeholder="Verification Code"
                       value={code}
                       onChange={(e) => setCode(e.target.value)}
                />
                <Button className="buttonStyle" type="submit" text="Verify"/>
                <Button className="buttonStyle" type="button" text="Send again" onClick={handleSendAgainClick}/>
            </form>
        </div>
    );
};

export default VerifyCodeForm;
