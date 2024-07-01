import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App: React.FC = () =>(
    <Router>
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path={"/home"} element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Routes> .
    </Router>
);

export default App;
