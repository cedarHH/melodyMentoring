import React from 'react';

interface ButtonProps {
    className: string;
    text: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ className, text, onClick }) => (
    <button className={`button ${className}`} onClick={onClick}>
        {text}
    </button>
);

export default Button;
