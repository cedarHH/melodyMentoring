import React, {useContext, useState} from "react";
import Button from "../MISC/Button";
import {AuthMode} from "./AuthModal";
import LogoVertical from "../MISC/LogoVertical";
import {AuthContext} from "../../contexts/AuthContext";
import '../../styles/Welcome.css';
import logo from "../../assets/img/logo/mygo.jpg";
import {useValidEmail, useValidNickname, useValidPassword} from "../../hooks/useAuthHooks";
import Notification from "../MISC/Notification";

interface RegisterFormProps {
    setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
    onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({setAuthMode, onClose}) => {
    const {nickname, setNickname, nicknameIsValid} = useValidNickname('');
    const {email, setEmail, emailIsValid} = useValidEmail('');
    const {password, setPassword, passwordIsValid, formatError} = useValidPassword('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('')
    const [showNotification, setShowNotification] = useState(false);
    const authContext = useContext(AuthContext)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setShowNotification(false);

        if (!nicknameIsValid) {
            setError('Invalid nickname format.');
            setShowNotification(true);
            return;
        }

        if (!emailIsValid) {
            setError('Invalid email format.');
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
            if (authContext.signUpWithEmail) {
                await authContext.signUpWithEmail(email, email, password, nickname);
                setAuthMode(AuthMode.VERIFY_CODE)
            } else {
                setError('signUpWithEmail is not defined');
                setShowNotification(true);
            }
        } catch (err: any) {
            switch (err.code) {
                case 'UsernameExistsException':
                    setError('An account with this email already exists.');
                    break;
                case 'InvalidPasswordException':
                    setError('Password does not meet the minimum requirements.');
                    break;
                case 'InvalidParameterException':
                    setError('Invalid parameters. Please check your input.');
                    break;
                case 'UserLambdaValidationException':
                    setError('The provided email is not valid.');
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
                text="Register" // Create a free account to discover your personalized learning path
            />
            {showNotification && (
                <Notification
                    width="100%"
                    message={error}
                />
            )}
            <form onSubmit={handleSubmit}>
                <input className="inputStyle"
                       type="text"
                       placeholder="Nickname"
                       value={nickname}
                       onChange={(e) => setNickname(e.target.value)}
                />
                <input className="inputStyle"
                       type="email"
                       placeholder="Email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
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
                <Button className="buttonStyle" type="submit" text="Sign up"/>
            </form>
            <div className="bottomContainer">
                <Button className="transparent-button" type="button" text="Already have an account? Log in"
                        onClick={() => {
                            setAuthMode(AuthMode.LOGIN)
                        }}
                />
            </div>
        </div>
    );
};

export default RegisterForm;
