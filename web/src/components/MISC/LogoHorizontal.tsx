import React from 'react';
import styled from 'styled-components';

interface LogoProps {
    radius: string;
    imageUrl: string;
    text?: string;
}

const LogoHorizontalContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 3vh;
`;

const LogoIconContainer = styled.div<{ radius: string }>`
    width: 6vw;
    height: 6vw;
    background-color: #fff;
    border-radius: 50%;
    margin-right: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const LogoText = styled.div`
    font-size: 4vw;
    font-weight: bold;
`;

const LogoHorizontal: React.FC<LogoProps> = ({ radius, imageUrl, text }) => (
    <LogoHorizontalContainer>
        <LogoIconContainer radius={radius}>
            <img src={imageUrl} alt="logo.png" />
        </LogoIconContainer>
        {text && <LogoText>{text}</LogoText>}
    </LogoHorizontalContainer>
);

export default LogoHorizontal;
