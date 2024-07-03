import React, {useState} from "react";
import Button from "../MISC/Button";
import '../../styles/LoginForm.css'
import logo from '../../assets/img/logo/mygo.jpg'
import LogoVertical from "../MISC/LogoVertical";

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(email,password);
    };

    return (
        <div className="loginContainer">
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
                <Button className="transparent-button" type="button" text="Reset password" onClick={() => {}}/>
                <Button className="transparent-button" type="button" text="New user? Sign up" onClick={() => {}}/>
            </div>
        </div>
    );
};

export default LoginForm;
