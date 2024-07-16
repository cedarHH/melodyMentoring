import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Homepage/Sidebar';
import UserInfo from '../components/Homepage/UserInfo';
import MusicHistory from '../components/Homepage/MusicHistory';
import MusicPracticeChart from '../components/Homepage/MusicPracticeChart';
import AccuracyRateChart from '../components/Homepage/AccuracyRateChart';
import { AuthContext } from "../contexts/AuthContext";
import { practiceData, accuracyData, options } from '../constants/chartData';
import { musicData, MusicItem } from '../constants/musicData';
import { childrenData } from '../constants/childrenData';
import userAvatar from '../assets/img/home/kid-avatar.jpg';
import '../styles/Home.css';
import Button from "../components/MISC/Button";
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import axios from "axios";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #252525;
    padding: 10px 20px;
    color: white;
    position: sticky;
    top: 0;
    z-index: 10;
`;

const Logo = styled.div`
    font-family: 'Cambria', serif;
    font-weight: bold;
    font-size: 5vw;
    
    @media (min-width: 768px) {
        font-size: 3vw;
    }
    
    @media (min-width: 1200px) {
        font-size: 30px;
    }
`;

const Content = styled.div`
    display: flex;
    flex: 1;
    overflow: hidden;
    gap: 10px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        overflow-y: auto;
    }
`;

const SidebarContainer = styled.div`
    width: 10%;
    text-align: left;
    background-color: #252525;
    
    @media (max-width: 768px) {
        width: 100%;
        text-align: center;
    }
`;

const MainView = styled.div`
    display: flex;
    flex-direction: column;
    width: 35%;
    padding: 20px;
    
    @media (max-width: 768px) {
        width: 100%;
        overflow: visible;
    }
`;

const ChartsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 55%;
    padding: 10px;
    gap: 10px;
    
    @media (max-width: 768px) {
        width: 100%;
        overflow: visible;
    }
    
    @media (min-width: 768px) {
        height: calc(100vh - 50px);
        overflow: auto;
    }
`;

const ChartWrapper = styled.div`
    cursor: pointer;
    flex-grow: 1;
    width: 100%;
    min-height: 50px;
    max-height: 380px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    
    @media (min-width: 768px) {
        flex-grow: 0;
        flex-shrink: 0;
        height: 50%;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: #333;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    max-width: 800px;
    height: 50vh;
`;

const ChartContainer = styled.div`
    flex-grow: 1;
    width: 100%;
    height: 70%;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 20px;
`;

const Button1 = styled.button`
    padding: 10px 20px;
    background-color: #555;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #777;
    }
`;

const ModalTitle = styled.h2`
    color: #fff;
    font-family: 'Cambria', serif;
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
`;

interface LevelCounts {
    [key: number]: number;
}

const Home = () => {
    const authContext = useContext(AuthContext);
    const [activeKid, setActiveKid] = useState(Object.keys(childrenData)[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeChartData, setActiveChartData] = useState<'practice' | 'accuracy' | 'musicHistory'>('practice');
    const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');
    const [resizeKey, setResizeKey] = useState(0); // State to manage the resize key

    useEffect(() => {
        setActiveKid(Object.keys(childrenData)[0]); // Set the first child as active

        const handleResize = () => {
            setResizeKey(prevKey => prevKey + 1); // Increment key to force re-render
            window.scrollTo(0, 0); // Scroll to the top on resize
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleChartType = () => {
        if (activeChartData === 'musicHistory') {
            setChartType(prev => prev === 'pie' ? 'bar' : 'pie');
        } else {
            setChartType(prev => prev === 'line' ? 'bar' : 'line');
        }
    };

    const handleChartClick = (type: 'practice' | 'accuracy' | 'musicHistory') => {
        setActiveChartData(type);
        if (type === 'musicHistory') {
            setChartType('pie');
        } else {
            setChartType('line');
        }
        setIsModalOpen(true);
    };

    const renderChart = () => {
        if (activeChartData === 'musicHistory') {
            const levelCounts: LevelCounts = musicData.reduce((acc: LevelCounts, curr: MusicItem) => {
                acc[curr.level] = (acc[curr.level] || 0) + 1;
                return acc;
            }, {});
            const chartData = {
                labels: Object.keys(levelCounts).map(level => `Level ${level}`),
                datasets: [
                    {
                        label: '',
                        data: Object.values(levelCounts),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                    }
                ]
            };
            const options = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            };
            return chartType === 'pie' ? (
                <Pie data={chartData} options={options} />
            ) : (
                <Bar data={chartData} options={options} />
            );
        } else {
            const data = activeChartData === 'practice' ? practiceData : accuracyData;
            const ChartComponent = activeChartData === 'practice' ? MusicPracticeChart : AccuracyRateChart;
            const chartOptions = {
                ...options,
                maintainAspectRatio: false,
                responsive: true,
            };
            const validChartType = chartType === 'line' || chartType === 'bar' ? chartType : 'line';
            return <ChartComponent data={data} options={chartOptions} chartType={validChartType} />;
        }
    };

    const sign_out_button = async () => {
        if (authContext.signOut){
            authContext.signOut();
        }
    }

    const debug_button = async () => {
        axios.post("api/user/verifypin", {
            "profileName":"lbr",
            "pin":123
        },{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }).then((response)=>{

        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <MainContainer>
            <Header>
                <Logo>MyGO!!!</Logo>
                <Button text="Sign out" type="button" className="debug-button" onClick={sign_out_button} />
                <Button text="Debug" type="button" className="debug-button" onClick={debug_button} />
                <div className="user-avatar" onClick={() => { }}>
                    <img src={userAvatar} alt="User Avatar" style={{ width: "50px", height: "50px" }} />
                </div>
            </Header>
            <Content key={resizeKey}>
                <SidebarContainer>
                    <Sidebar activeKid={activeKid} setActiveKid={setActiveKid} />
                </SidebarContainer>
                <MainView>
                    <UserInfo activeKid={activeKid} />
                    <MusicHistory onClick={() => handleChartClick('musicHistory')} />
                </MainView>
                <ChartsContainer>
                    <ChartWrapper onClick={() => handleChartClick('practice')}>
                        <MusicPracticeChart data={practiceData} options={{ ...options, maintainAspectRatio: false, responsive: true, title: { display: true, text: 'Daily Music Practice Duration' } }} chartType="line" />
                    </ChartWrapper>
                    <ChartWrapper onClick={() => handleChartClick('accuracy')}>
                        <AccuracyRateChart data={accuracyData} options={{ ...options, maintainAspectRatio: false, responsive: true, title: { display: true, text: 'Daily Practice Accuracy Rate' } }} chartType="bar" />
                    </ChartWrapper>
                </ChartsContainer>
            </Content>
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        {activeChartData === 'musicHistory' && <ModalTitle>Levels of History</ModalTitle>}
                        <ChartContainer>
                            {renderChart()}
                        </ChartContainer>
                        <ButtonsContainer>
                            <Button1 onClick={toggleChartType}>
                                Toggle to {chartType === 'pie' ? 'Bar' : 'Pie'} Chart
                            </Button1>
                            <Button1 onClick={() => setIsModalOpen(false)}>Close</Button1>
                        </ButtonsContainer>
                    </ModalContent>
                </ModalOverlay>
            )}
        </MainContainer>
    );
}

export default Home;
