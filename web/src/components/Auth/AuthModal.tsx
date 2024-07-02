import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Button from "../Button";
import "../../styles/AuthModal.css"

interface AuthModalProps {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isLogin, setIsLogin, onClose }) => {

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="auth-modal-overlay" onClick={handleOverlayClick}>
            <div className="auth-modal">
                {isLogin ? (
                    <LoginForm onSwitch={() => setIsLogin(false)} />
                ) : (
                    <RegisterForm onSwitch={() => setIsLogin(true)} />
                )}
                <Button className="new-user" text="close" onClick={onClose}/>
            </div>
        </div>
    );
};

export default AuthModal;
