import React, {useContext, useState} from 'react';
import Sidebar from '../components/Homepage/Sidebar';
import UserInfo from '../components/Homepage/UserInfo';
import MusicHistory from '../components/Homepage/MusicHistory';
import MusicPracticeChart from '../components/Homepage/MusicPracticeChart';
import AccuracyRateChart from '../components/Homepage/AccuracyRateChart';
import {AuthContext} from "../contexts/AuthContext";
import { practiceData, accuracyData, options } from '../constants/chartData';
import userAvatar from '../assets/img/home/kid-avatar.jpg';
import '../styles/Home.css'


const Home: React.FC = () => {
    const authContext = useContext(AuthContext)
    const [activeKid, setActiveKid] = useState('Kid1');
    const [modalContent, setModalContent] = useState(null);

    return (
        <div className="main-container">
            <header className="main-header">
                <div className="main-logo">MyGO!!!</div>
                <div className="user-avatar" onClick={() => {
                }}>
                    <img src={userAvatar} alt="User Avatar"/>
                </div>
            </header>
            <div className="content">
                <Sidebar activeKid={activeKid} setActiveKid={setActiveKid}/>
                <div className="main-view">
                    <UserInfo activeKid={activeKid}/>
                    <MusicHistory/>
                    <div className="charts">
                        <MusicPracticeChart data={practiceData} options={options}/>
                        <AccuracyRateChart data={accuracyData} options={options}/>
                    </div>
                </div>
            </div>
            { modalContent && (
                <div className="modal-overlay" onClick={() => setModalContent(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        {modalContent}
                        <button onClick={() => setModalContent(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
