import React, {useState} from "react";
import Button from "../MISC/Button";
import {AuthMode} from "./AuthModal";
import LogoVertical from "../MISC/LogoVertical";
import logo from '../../assets/img/logo/mygo.jpg'
import '../../styles/AuthForm.css'

interface LoginFormProps {
    setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
    onClose: () => void;
}

const LoginForm: React.FC< LoginFormProps > = ({ setAuthMode, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onClose();
    };

    return (
        <div className="authContainer">
            <LogoVertical
                radius="10vw"
                imageUrl={logo}
                text="Login"
            />
            <form onSubmit={handleSubmit}>
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
                <Button className="buttonStyle" type="submit" text="Log in"/>
            </form>
            <div className="bottomContainer">
                <Button className="transparent-button" type="button" text="Reset password" onClick={() => {setAuthMode(AuthMode.RESET_PASSWORD)}}/>
                <Button className="transparent-button" type="button" text="New user? Sign up" onClick={() => {setAuthMode(AuthMode.REGISTER)}}/>
            </div>
        </div>
    );
};

export default LoginForm;
