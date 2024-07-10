import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import axios from "axios";
import NotFound from "./pages/NotFound";
import AuthProvider from "./contexts/AuthContext";
import Main from "./pages/Main";

axios.defaults.baseURL = 'http://localhost:8080';

const App: React.FC = () =>(
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="*" element={<NotFound />} />
            </Routes> .
        </Router>
    </AuthProvider>
);

export default App;
