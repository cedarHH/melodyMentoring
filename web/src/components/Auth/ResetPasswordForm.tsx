import React, {useState} from "react";
import '../../styles/Welcome.css';
import Button from "../MISC/Button";
import {AuthMode} from "./AuthModal";
import LogoVertical from "../MISC/LogoVertical";
import logo from "../../assets/img/logo/mygo.jpg";

interface ResetPasswordFormProps {
    setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
    onClose: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({setAuthMode, onClose}) => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onClose();
    };

    return (
        <div className="authContainer">
            <LogoVertical
                radius="10vw"
                imageUrl={logo}
                text="Reset Password" // Create a free account to discover your personalized learning path
            />
            <form onSubmit={handleSubmit}>
                <input className="inputStyle"
                       type="email"
                       placeholder="Email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                />
                <input className="inputStyle"
                       type="text"
                       placeholder="Enter verification code sent to your email"
                       value={verificationCode}
                       onChange={(e) => setVerificationCode(e.target.value)}
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
                <Button className="buttonStyle" type="submit" text="Reset"/>
                <Button className="buttonStyle" type="button" text="Cancel" onClick={() => {
                    onClose()
                }}/>
            </form>
        </div>
    );
};

export default ResetPasswordForm;
