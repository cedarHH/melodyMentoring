import React from 'react';

interface ButtonProps {
    className: string;
    type?: 'button' | 'submit' | 'reset';
    text: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ className, type, text, onClick }) => (
    <button className={`button ${className}`} type={type} onClick={onClick}>
        {text}
    </button>
);

export default Button;
