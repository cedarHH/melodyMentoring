import React, { useContext, useState, useEffect } from 'react';
import Sidebar from '../components/Homepage/Sidebar';
import UserInfo from '../components/Homepage/UserInfo';
import MusicHistory from '../components/Homepage/MusicHistory';
import MusicPracticeChart from '../components/Homepage/MusicPracticeChart';
import AccuracyRateChart from '../components/Homepage/AccuracyRateChart';
import { AuthContext } from "../contexts/AuthContext";
import { practiceData, accuracyData, options } from '../constants/chartData';
import { childrenData } from '../constants/childrenData';
import userAvatar from '../assets/img/home/kid-avatar.jpg';
import '../styles/Home.css';

const Home: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [activeKid, setActiveKid] = useState(Object.keys(childrenData)[0]);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
    const [chartType, setChartType] = useState<'line' | 'bar'>('line');

    useEffect(() => {
        setActiveKid(Object.keys(childrenData)[0]);
    }, []);

    const toggleChartType = () => {
        if (modalContent) {
            const newChartType = chartType === 'line' ? 'bar' : 'line';
            const data = modalContent.props.data;
            const options = modalContent.props.options;
            setChartType(newChartType);
            setModalContent(getChartComponent(data, options, newChartType));
        }
    };

    const getChartComponent = (data: any, options: any, type: 'line' | 'bar') => {
        return type === 'line' ? <MusicPracticeChart data={data} options={options} /> : <AccuracyRateChart data={data} options={options} />;
    };

    const modalStyles = {
        overlay: {
            position: 'fixed' as 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        content: {
            background: '#333',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '90%',
            width: '800px',
            display: 'flex',
            flexDirection: 'column' as 'column',
            alignItems: 'center',
        },
        chartContent: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '20px',
            width: '100%',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#555',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#777',
        }
    };

    return (
        <div className="main-container">
            <header className="main-header">
                <div className="main-logo">MyGO!!!</div>
                <div className="user-avatar" onClick={() => {}}>
                    <img src={userAvatar} alt="User Avatar"/>
                </div>
            </header>
            <div className="content">
                <Sidebar activeKid={activeKid} setActiveKid={setActiveKid} />
                <div className="main-view">
                    <UserInfo activeKid={activeKid} />
                    <MusicHistory />
                    <div className="charts">
                        <div className="chart" onClick={() => setModalContent(getChartComponent(practiceData, options, chartType))}>
                            <MusicPracticeChart data={practiceData} options={options} />
                        </div>
                        <div className="chart" onClick={() => setModalContent(getChartComponent(accuracyData, options, chartType))}>
                            <AccuracyRateChart data={accuracyData} options={options} />
                        </div>
                    </div>
                </div>
            </div>
            {modalContent && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.content} onClick={e => e.stopPropagation()}>
                        <div style={modalStyles.chartContent}>
                            {modalContent}
                        </div>
                        <div style={modalStyles.buttonContainer}>
                            <button style={modalStyles.button} onClick={toggleChartType}>Toggle Chart Type</button>
                            <button style={modalStyles.button} onClick={() => setModalContent(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
