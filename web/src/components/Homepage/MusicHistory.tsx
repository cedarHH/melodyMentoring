import React from 'react';
import styled from 'styled-components';
import { musicData } from '../../constants/musicData';

const MusicHistoryContainer = styled.div`
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  overflow-y: auto;
  margin-top: 20px;
  font-family: 'Arial', serif;
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
  text-align: left;
  padding: 4px 8px;
  border-bottom: 1px solid #3a3a3a;
  line-height: 1.6;
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
`;

const ChartButton = styled.button`
    background-color: #555;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
    position: absolute; 
    top: 1px;
    right: 20px;
    &:hover {
        background-color: #777;
    }
`;

const MusicHistory: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <MusicHistoryContainer>
            <TitleContainer>
                <Title>Music History</Title>
                <ChartButton onClick={onClick}>Open Modal</ChartButton>
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
