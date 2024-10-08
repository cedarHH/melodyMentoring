import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Homepage/Sidebar';
import UserInfo from '../components/Homepage/UserInfo';
import MusicHistory from '../components/Homepage/MusicHistory';
import MusicPracticeChart from '../components/Homepage/MusicPracticeChart';
import AccuracyRateChart from '../components/Homepage/AccuracyRateChart';
import { AuthContext } from "../contexts/AuthContext";
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


interface LevelCounts {
    [key: number]: number;
}

const Home = () => {
    const authContext = useContext(AuthContext);
    const [activeKid, setActiveKid] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
    const [activeChartData, setActiveChartData] = useState<'practice' | 'accuracy' | 'musicHistory'>('practice');
    const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('bar');
    const [resizeKey, setResizeKey] = useState(0); // State to manage the resize key
    const [markedPracticePoints, setMarkedPracticePoints] = useState<number[]>([]);
    const [markedAccuracyPoints, setMarkedAccuracyPoints] = useState<number[]>([]);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    useEffect(() => {

        // const childrenKeys = Object.keys(childrenData);
        // setActiveKid(childrenKeys.length > 0 ? childrenKeys[0] : null);

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


    const sign_out_button = async () => {
        if (authContext.signOut){
            authContext.signOut();
        }
    }

    const handleSignOutClick = () => {
        setIsSignOutModalOpen(true);
    };

    const handleConfirmSignOut = () => {
        setIsSignOutModalOpen(false);
        sign_out_button();
    };

    const handleCancelSignOut = () => {
        setIsSignOutModalOpen(false);
    };

    return (
        <MainContainer>
            <Header>
                <Logo>MyGO!!!</Logo>
                <Button2 onClick={handleSignOutClick}>Log Out</Button2>
            </Header>
            <Content key={resizeKey}>
                <SidebarContainer>
                    <Sidebar activeKid={activeKid} setActiveKid={setActiveKid} />
                </SidebarContainer>
                <MainView>
                    <UserInfo activeKid={activeKid} setActiveKid={setActiveKid} />
                    <MusicHistory
                        activeKid={activeKid}
                        setIsModalOpen={setIsModalOpen}
                        setModalContent={setModalContent}
                    />
                </MainView>
                <ChartsContainer>

                </ChartsContainer>
            </Content>
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        {modalContent}
                    </ModalContent>
                </ModalOverlay>
            )}
            {isSignOutModalOpen && (
                <ModalOverlay>
                    <SignOutModal>
                        <SignOutModalTitle>Are you sure you want to sign out?</SignOutModalTitle>
                        <SignOutButtonContainer>
                            <SignOutButton1 onClick={handleConfirmSignOut}>Yes</SignOutButton1>
                            <SignOutButton2 onClick={handleCancelSignOut}>No</SignOutButton2>
                        </SignOutButtonContainer>
                    </SignOutModal>
                </ModalOverlay>
            )}
        </MainContainer>
    );
}

export default Home;

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
    background-color: #222222;
    padding: 10px 20px;
    color: white;
    position: sticky;
    top: 0;
    z-index: 10;
    height: 10vh;

    @media (min-width: 768px) {
        height: 10vh;
    }

    @media (min-width: 1200px) {
        height: 7vh;
    }
`;

const Logo = styled.div`
    font-family: 'Cambria', serif;
    font-style: italic;
    font-weight: bold;
    font-size: 8vw;

    @media (min-width: 768px) {
        font-size: 5vw;
    }

    @media (min-width: 1200px) {
        font-size: 2.2vw;
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
    width: 8%;
    text-align: center;
    background-color: #222222;
    
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
    max-height: 405px;
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
    background-color: #272525; /* Light gray background */
    border-radius: 15px; /* Rounded corners */
    padding: 20px; /* Add some padding */
    max-width: 90%; /* Responsive width */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional shadow for depth */
    overflow-y: auto; /* Enable scrolling for overflow content */
    max-height: 80%; /* Limit the maximum height */
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

const Button2 = styled.button`
    background-color: #292A2C;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
    position: absolute;
    font-weight: bold;
    font-style: italic;
    font-size: 18px;
    font-family: 'Cambria', serif;
    top: 20px;
    right: 20px;
    &:hover {
        background-color: #777;
    }

    @media (max-height: 824px) {
        font-size: 17px;
    }
    @media (max-width: 1380px) {
        font-size: 15px;
        padding: 4px 8px;
    }
    @media (max-width: 768px) {
        font-size: 17px;
        padding: 5px 10px;
    }
`;

const SignOutModal = styled.div`
    background: #222222;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    height: 60%;
    max-width: 600px;
    max-height: 180px;
    border: 4px solid #555555;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    @media (min-width: 768px) {
        width: 30%;
        height: 40%;
    }
`;

const SignOutModalTitle = styled.h3`
    font-family: Cambria, sans-serif;
    font-weight: bold;
    font-size: 4vw;
    @media (min-width: 768px) {
        font-size: 1.5vw;
    }
`;

const SignOutButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 60px;
    gap: 20px;

    @media (max-width: 768px) {
        margin-top: 30px;
    }
`;

const SignOutButton1 = styled.button`
    padding: 10px 5vw;
    background-color: #444;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 3vw;
    &:hover {
        background-color: #777;
    }
    @media (min-width: 768px) {
        padding: 10px 20px;
        font-size: 1vw;
    }
`;

const SignOutButton2 = styled.button`
    padding: 10px 5vw;
    background-color: #444;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 3vw;
    &:hover {
        background-color: #777;
    }
    @media (min-width: 768px) {
        padding: 10px 20px;
        font-size: 1vw;
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
