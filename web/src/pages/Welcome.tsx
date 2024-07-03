import React, {useState} from 'react';
import ImageGrid from '../components/ImageGrid';
import LogoHorizontal from '../components/MISC/LogoHorizontal';
import Button from '../components/MISC/Button';
import Tagline from '../components/MISC/Tagline';
import AuthModal from "../components/Auth/AuthModal";
import '../styles/Welcome.css';
import logo from '../assets/img/logo/mygo.png'
import {AWS_REGION, CLIENT_ID, COGNITO_DOMAIN, REDIRECT_URI} from "../constants/awsCognitoConf";


const WelcomePage: React.FC = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleNewUserClick = () => {
        // Handle new user click
        setIsLogin(false);
        setShowAuthModal(true);
    };

    const handleSignInClick = () => {
        // Handle sign in click
        setIsLogin(true);
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
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                    onClose={() => setShowAuthModal(false)}
                />
            )}
        </div>
    );
};

export default WelcomePage;

// if (!COGNITO_DOMAIN || !CLIENT_ID || !REDIRECT_URI || !AWS_REGION) {
//     console.error('Missing environment variables');
//     return;
// }
//
// let loginUrl: string;
// loginUrl = `https://${COGNITO_DOMAIN}.auth.${AWS_REGION}.amazoncognito.com/
//             login?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
// window.location.href = loginUrl;
