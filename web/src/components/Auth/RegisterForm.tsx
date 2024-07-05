import React, {useState} from "react";
import Button from "../MISC/Button";
import {AuthMode} from "./AuthModal";
import LogoVertical from "../MISC/LogoVertical";
import '../../styles/Welcome.css';
import logo from "../../assets/img/logo/mygo.jpg";

interface RegisterFormProps {
    setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
    onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({setAuthMode, onClose}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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
                text="Register" // Create a free account to discover your personalized learning path
            />
            <form onSubmit={handleSubmit}>
                <input className="inputStyle"
                       type="text"
                       placeholder="Username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
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
