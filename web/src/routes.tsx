import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome'
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const WelcomePage = () => {
    React.useEffect(() => {
        window.location.href = '/welcome.html';
    }, []);

    return null;
};

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/v1" element={<Welcome />} />
                <Route path={"/home"} element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes> .
        </Router>
    );
}

export default AppRoutes;
