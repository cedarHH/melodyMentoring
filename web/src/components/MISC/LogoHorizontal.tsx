import React from 'react';
import "../../styles/LogoHorizontal.css"

interface LogoProps {
    radius: string;
    imageUrl: string;
    text?: string;
}

const LogoHorizontal: React.FC<LogoProps> = ({radius, imageUrl, text}) => (
    <div className="logoH">
        <div className="logoH-icon">
            <img src={imageUrl} alt="logo.png" style={{ width: `${radius}`, height: `${radius}` }} />
        </div>
        {text && <div className="logoH-text">{text}</div>}
    </div>
);

export default LogoHorizontal;
