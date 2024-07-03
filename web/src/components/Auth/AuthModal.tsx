import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../../styles/AuthModal.css"

interface AuthModalProps {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isLogin, setIsLogin, onClose }) => {

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="auth-modal-overlay" onClick={handleOverlayClick}>
            <div className="auth-modal">
                {isLogin ? (
                    <LoginForm
                        onSubmit={() => setIsLogin(false)}
                    />
                ) : (
                    <RegisterForm onSwitch={() => setIsLogin(true)} />
                )}
            </div>
        </div>
    );
};

export default AuthModal;
