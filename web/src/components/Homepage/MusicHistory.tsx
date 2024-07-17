import React from 'react';
import styled from 'styled-components';
import { musicData } from '../../constants/musicData';

const MusicHistoryContainer = styled.div`
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  overflow-y: auto;
  margin-top: 20px;
  cursor: pointer;
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
  line-height: 1.5;
`;

const Title = styled.h3`
  margin-top: -5px;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  font-family: 'Cambria', serif;
`;

const MusicHistory: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <MusicHistoryContainer onClick={onClick}>
            <Title>Music History</Title>
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
