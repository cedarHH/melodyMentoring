import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import NotFound from './pages/NotFound';
import AuthProvider from './contexts/AuthContext';
import ApiProvider from './contexts/ApiContext';
import Main from './pages/Main';

axios.defaults.baseURL = 'http://localhost:8888';

const App: React.FC = () => (
    <AuthProvider>
        <ApiProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </ApiProvider>
    </AuthProvider>
);

export default App;
