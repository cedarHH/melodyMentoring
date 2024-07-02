import React from "react";
import Button from "../Button";
import '../../styles/Welcome.css';

const LoginForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {

    return (
        <form>
            <Button className="new-user" text="New user? Sign up" onClick={onSwitch}/>
        </form>
    );
};

export default LoginForm;
