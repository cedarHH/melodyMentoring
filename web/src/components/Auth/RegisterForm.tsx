import React from "react";
import '../../styles/Welcome.css';
import Button from "../MISC/Button";

const RegisterForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
    return (
        <form>
            <Button className="new-user" text="Already have an account? Log in" onClick={onSwitch}/>
        </form>
    );
};

export default RegisterForm;
