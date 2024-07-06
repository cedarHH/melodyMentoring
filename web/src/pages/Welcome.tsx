import React, {useState} from 'react';
import ImageGrid from '../components/ImageGrid';
import LogoHorizontal from '../components/MISC/LogoHorizontal';
import Button from '../components/MISC/Button';
import Tagline from '../components/MISC/Tagline';
import AuthModal, {AuthMode} from "../components/Auth/AuthModal";
import '../styles/Welcome.css';
import logo from '../assets/img/logo/mygo.png'


const WelcomePage: React.FC = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.LOGIN);

    const handleNewUserClick = () => {
        // Handle new user click
        setAuthMode(AuthMode.REGISTER);
        setShowAuthModal(true);
    };

    const handleSignInClick = () => {
        // Handle sign in click
        setAuthMode(AuthMode.LOGIN);
        setShowAuthModal(true);
    };

    return (
        <div className="container">
            <div className="left-side">
                <div className="lean-box">
                    <ImageGrid/>
                </div>
            </div>
            <div className="right-side">
                <LogoHorizontal
                    radius='6vw'
                    imageUrl={logo}
                    text='MyGO!!!!!'
                />
                <Tagline/>
                <Button className="new-user" type="button" text="I am new here" onClick={handleNewUserClick}/>
                <Button className="sign-in" type="button" text="Sign In" onClick={handleSignInClick}/>
            </div>
            {showAuthModal && (
                <AuthModal
                    authMode={authMode}
                    setAuthMode={setAuthMode}
                    onClose={() => setShowAuthModal(false)}
                />
            )}
        </div>
    );
};

export default WelcomePage;
