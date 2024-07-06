import React, {useState} from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ResetPasswordForm from "./ResetPasswordForm";
import "../../styles/AuthModal.css"
import VerifyCodeForm from "./verifyCodeForm";

interface AuthModalProps {
    authMode: AuthMode;
    setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
    onClose: () => void;
}

export enum AuthMode {
    LOGIN = 'login',
    REGISTER = 'register',
    RESET_PASSWORD = 'reset_password',
    VERIFY_CODE = 'verify_code'
}

const AuthModal: React.FC<AuthModalProps> = ({ authMode, setAuthMode, onClose }) => {
    const [mouseDownTarget, setMouseDownTarget] = useState<EventTarget | null>(null);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setMouseDownTarget(event.target);
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget && mouseDownTarget === event.currentTarget) {
            onClose();
        }
        setMouseDownTarget(null);
    };

    return (
        <div className="auth-modal-overlay" onClick={handleOverlayClick} onMouseDown={handleMouseDown}>
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
                {authMode === AuthMode.VERIFY_CODE && (
                    <VerifyCodeForm
                        setAuthMode={setAuthMode}
                        onClose={onClose}
                    />
                )}
            </div>
        </div>
    );
};

export default AuthModal;
