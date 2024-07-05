import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ResetPasswordForm from "./ResetPasswordForm";
import "../../styles/AuthModal.css"

interface AuthModalProps {
    authMode: AuthMode;
    setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
    onClose: () => void;
}

export enum AuthMode {
    LOGIN = 'login',
    REGISTER = 'register',
    RESET_PASSWORD = 'reset_password',
}

const AuthModal: React.FC<AuthModalProps> = ({ authMode, setAuthMode, onClose }) => {

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="auth-modal-overlay" onClick={handleOverlayClick}>
            <div className="auth-modal">
                {authMode === AuthMode.LOGIN && (
                    <LoginForm
                        setAuthMode={setAuthMode}
                        onClose={onClose}
                    />
                )}
                {authMode === AuthMode.REGISTER && (
                    <RegisterForm
                        setAuthMode={setAuthMode}
                        onClose={onClose}
                    />
                )}
                {authMode === AuthMode.RESET_PASSWORD && (
                    <ResetPasswordForm
                        setAuthMode={setAuthMode}
                        onClose={onClose}
                    />
                )}
            </div>
        </div>
    );
};

export default AuthModal;
