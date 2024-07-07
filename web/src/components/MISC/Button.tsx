import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    text: string;
    onClick?: () => void;
}

const StyledButton = styled.button`
  padding: 2vh 4vw;
  border: none;
  border-radius: 5vh;
  font-size: 2.5vw;
  cursor: pointer;
  margin-top: 1vh;
  margin-bottom: 1vh;
  width: 100%;
  text-align: center;
`;

const Button: React.FC<ButtonProps> = ({ className, type = 'button', text, onClick = () => {} }) => (
    <StyledButton className={className} type={type} onClick={onClick}>
        {text}
    </StyledButton>
);

export default Button;
