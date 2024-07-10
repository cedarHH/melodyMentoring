import React, {useContext} from 'react';
import {AuthContext, AuthIsNotSignedIn, AuthIsSignedIn} from "../contexts/AuthContext";
import Welcome from "./Welcome";
import Home from "./Home";

const MainPage: React.FC = () => {
    const authContext = useContext(AuthContext);
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
