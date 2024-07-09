import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import axios from "axios";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AuthProvider from "./contexts/AuthContext";

axios.defaults.baseURL = 'http://localhost:9838';

const App: React.FC = () =>(
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path={"/home"} element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes> .
        </Router>
    </AuthProvider>
);

export default App;
