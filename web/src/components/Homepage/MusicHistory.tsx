import React from 'react';
import styled from 'styled-components';
import { musicData } from '../../constants/musicData';

const MusicHistoryContainer = styled.div`
    background-color: #1B1C1E;
    padding: 20px;
    border-radius: 10px;
    overflow-y: auto;
    margin-top: 20px;
    font-family: 'Arial', serif;
    border: 2px solid #4B4B4B;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  font-size: 18px;
  text-align: left;
  padding: 5px 8px;
  border-bottom: 1px solid #3a3a3a;
  line-height: 1.5;
`;

const TableData = styled.td`
    font-size: 16px;
    text-align: left;
    padding: 4px 8px;
    border-bottom: 1px solid #3a3a3a;
    line-height: 1.6;

    @media (max-width: 1736px) {
        line-height: 1.5;
    }
    @media (max-width: 1228px) {
        font-size: 15px;
        line-height: 1.6;
    }
    @media (max-width: 768px) {
        font-size: 15px;
        line-height: 1.4;
    }
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`;

const Title = styled.h3`
    margin-top: -5px;
    margin-bottom: 20px;
    font-size: 24px;
    text-align: left;
    font-family: 'Cambria', serif;

    @media (max-height: 824px) {
        font-size: 20px;
    }
    @media (max-width: 1380px) {
        font-size: 18px;
    }
    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

const ChartButton = styled.button`
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
    top: -5px;
    right: 5px;
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

const MusicHistory: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <MusicHistoryContainer>
            <TitleContainer>
                <Title>Music History</Title>
                <ChartButton onClick={onClick}>Show Levels</ChartButton>
            </TitleContainer>
            <Table>
                <thead>
                <tr>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Level</TableHeader>
                    <TableHeader>Date</TableHeader>
                </tr>
                </thead>
                <tbody>
                {musicData.map((item, index) => (
                    <tr key={index}>
                        <TableData>{item.name}</TableData>
                        <TableData>{item.level}</TableData>
                        <TableData>{item.date}</TableData>
                    </tr>
                ))}
                </tbody>
            </Table>
        </MusicHistoryContainer>
    );
};

export default MusicHistory;
