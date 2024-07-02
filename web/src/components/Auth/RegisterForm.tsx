import React from "react";
import '../../styles/Welcome.css';

const RegisterForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
    return (
        <form>
            <button type="button" onClick={onSwitch}>Already have an account? Log in</button>
        </form>
    );
};

export default RegisterForm;
