import React from 'react';
import ImageGrid from '../components/ImageGrid';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Tagline from '../components/Tagline';
import '../styles/Welcome.css';

const WelcomePage: React.FC = () => {
    const handleNewUserClick = () => {
        // Handle new user click
    };

    const handleSignInClick = () => {
        // Handle sign in click
    };

    return (
        <div className="container">
            <div className="left-side">
                <div className="lean-box">
                    <ImageGrid />
                </div>
            </div>
            <div className="right-side">
                <Logo />
                <Tagline />
                <Button className="new-user" text="I am new here" onClick={handleNewUserClick} />
                <Button className="sign-in" text="Sign In" onClick={handleSignInClick} />
            </div>
        </div>
    );
};

export default WelcomePage;
