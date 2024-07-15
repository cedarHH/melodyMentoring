import React from 'react';
import {AuthIsNotSignedIn, AuthIsSignedIn} from "../contexts/AuthContext";
import Welcome from "./Welcome";
import Home from "./Home";

const MainPage: React.FC = () => {
    return (
        <>
            <AuthIsNotSignedIn>
                <Welcome/>
            </AuthIsNotSignedIn>
            <AuthIsSignedIn>
                <Home/>
            </AuthIsSignedIn>
        </>
    )
}

export default MainPage;
