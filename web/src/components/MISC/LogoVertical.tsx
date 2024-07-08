import React from 'react';
import styled from 'styled-components';

interface LogoProps {
    radius: string;
    imageUrl: string;
    text?: string;
}

const LogoVerticalContainer = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

const LogoImage = styled.img<{ radius: string }>`
    width: ${(props) => props.radius};
    height: ${(props) => props.radius};
`;

const LogoText = styled.h2`
    font-size: 2em;
    color: #252525;
    font-family: Comic Sans MS, monospace;
`;

const LogoVertical: React.FC<LogoProps> = ({ radius, imageUrl, text }) => {
    return (
        <LogoVerticalContainer>
            <LogoImage src={imageUrl} alt="Logo" radius={radius} />
            {text && <LogoText>{text}</LogoText>}
        </LogoVerticalContainer>
    );
}

export default LogoVertical;
