import React from 'react';
import "../../styles/LogoVertical.css"

interface LogoProps {
    radius: string;
    imageUrl: string;
    text?: string;
}

const LogoVertical: React.FC<LogoProps> = ({ radius, imageUrl, text }) => {
    return (
        <div className="logoV">
            <img src={imageUrl} alt="Logo" style={{ width: `${radius}`, height: `${radius}` }} />
            {text && <h2>{text}</h2>}
        </div>
    );
}

export default LogoVertical;
