import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Homepage/Sidebar';
import UserInfo from '../components/Homepage/UserInfo';
import MusicHistory from '../components/Homepage/MusicHistory';
import MusicPracticeChart from '../components/Homepage/MusicPracticeChart';
import AccuracyRateChart from '../components/Homepage/AccuracyRateChart';
import { AuthContext } from "../contexts/AuthContext";
import { practiceData, accuracyData, options } from '../constants/chartData';
import { childrenData } from '../constants/childrenData';
import userAvatar from '../assets/img/home/kid-avatar.jpg';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #252525;
  padding: 10px 20px;
  color: white;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  gap: 10px;
`;

const SidebarContainer = styled.div`
  width: 10%;
  background-color: #252525;
`;

const MainView = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 20px;
  overflow-y: auto;
`;

const ChartTitleH3 = styled.h3`
    font-family: 'Cambria', serif;
    color: white;
    margin-bottom: 6px;
    align-self: flex-start;
`;

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 20px;
  gap: 10px;
`;

const ChartWrapper = styled.div`
  cursor: pointer;
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

const ChartTitle = styled.h2`
    text-align: center;
    color: white;
    margin-bottom: 20px;
    height: 10%;
`;

const ChartContainer = styled.div`
    flex-grow: 1;
    width: 100%;
    height: 100%;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 40px;
    height: 10%;
`;

const Button = styled.button`
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

const Home: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [activeKid, setActiveKid] = useState(Object.keys(childrenData)[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeChartData, setActiveChartData] = useState<'practice' | 'accuracy'>('practice');
    const [chartType, setChartType] = useState<'line' | 'bar'>('line');

    useEffect(() => {
        setActiveKid(Object.keys(childrenData)[0]);
    }, []);

    const toggleChartType = () => {
        setChartType(prev => prev === 'line' ? 'bar' : 'line');
    };

    const handleChartClick = (type: 'practice' | 'accuracy') => {
        setActiveChartData(type);
        setChartType('line'); // 默认显示为折线图
        setIsModalOpen(true);
    };

    const renderChart = () => {
        const data = activeChartData === 'practice' ? practiceData : accuracyData;
        const ChartComponent = chartType === 'line' ? MusicPracticeChart : AccuracyRateChart;
        return <ChartComponent data={data} options={{...options, maintainAspectRatio: false}} />;
    };

    const getChartTitle = () => {
        return activeChartData === 'practice' ? 'Daily Music Practice Duration' : 'Daily Practice Accuracy Rate';
    };

    return (
        <MainContainer>
            <Header>
                <div className="main-logo">MyGO!!!</div>
                <div className="user-avatar" onClick={() => {}}>
                    <img src={userAvatar} alt="User Avatar" style={{ width: "50px", height: "50px" }} />
                </div>
            </Header>
            <Content>
                <SidebarContainer>
                    <Sidebar activeKid={activeKid} setActiveKid={setActiveKid} />
                </SidebarContainer>
                <MainView>
                    <UserInfo activeKid={activeKid} />
                    <MusicHistory />
                </MainView>
                <ChartsContainer>
                    <ChartWrapper onClick={() => handleChartClick('practice')}>
                        <ChartTitleH3>Daily Music Practice Duration</ChartTitleH3>
                        <MusicPracticeChart data={practiceData} options={options}/>
                    </ChartWrapper>
                    <ChartWrapper onClick={() => handleChartClick('accuracy')}>
                        <ChartTitleH3>Daily Practice Accuracy Rate</ChartTitleH3>
                        <AccuracyRateChart data={accuracyData} options={options}/>
                    </ChartWrapper>
                </ChartsContainer>
            </Content>
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent onClick={e => e.stopPropagation()}>
                        <ChartTitle>{getChartTitle()}</ChartTitle>
                        <ChartContainer>
                            {renderChart()}
                        </ChartContainer>
                        <ButtonsContainer>
                            <Button onClick={toggleChartType}>
                                Toggle to {chartType === 'line' ? 'Bar' : 'Line'} Chart
                            </Button>
                            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                        </ButtonsContainer>
                    </ModalContent>
                </ModalOverlay>
            )}
        </MainContainer>
    );
}

export default Home;