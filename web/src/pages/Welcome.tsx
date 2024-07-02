import React from 'react';
import ImageGrid from '../components/ImageGrid';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Tagline from '../components/Tagline';
import '../styles/Welcome.css';

const WelcomePage: React.FC = () => {
    const handleNewUserClick = () => {
        // Handle new user click
        const cognitoDomain = process.env.REACT_APP_COGNITO_DOMAIN;
        const clientId = process.env.REACT_APP_CLIENT_ID;
        const redirectUri = process.env.REACT_APP_REDIRECT_URI;
        const region = process.env.REACT_APP_REGION;

        if (!cognitoDomain || !clientId || !redirectUri || !region) {
            console.error('Missing environment variables');
            return;
        }

        let loginUrl: string;
        loginUrl = `https://${cognitoDomain}.auth.${region}.amazoncognito.com/
            login?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
        window.location.href = loginUrl;
    };

    const handleSignInClick = () => {
        // Handle sign in click
    };

    return (
        <div className="container">
            <div className="left-side">
                <div className="lean-box">
                    <ImageGrid/>
                </div>
            </div>
            <div className="right-side">
                <Logo/>
                <Tagline/>
                <Button className="new-user" text="I am new here" onClick={handleNewUserClick}/>
                <Button className="sign-in" text="Sign In" onClick={handleSignInClick}/>
            </div>
        </div>
    );
};

export default WelcomePage;
