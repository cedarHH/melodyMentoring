import React from 'react';
import styled from 'styled-components';

const MusicHistoryContainer = styled.div`
    background-color: #2c2c2c;
    padding: 30px;
    border-radius: 10px;
    overflow-y: auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #3a3a3a;
`;

const TableData = styled.td`
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #3a3a3a;
`;

const MusicHistory: React.FC = () => {
    return (
        <MusicHistoryContainer>
            <h3>Music History</h3>
            <Table>
                <thead>
                <tr>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Level</TableHeader>
                    <TableHeader>Date</TableHeader>
                </tr>
                </thead>
                <tbody>
                {[
                    { name: "Music1", level: 1, date: "02/06" },
                    { name: "Music2", level: 1, date: "02/06" },
                    { name: "Music3", level: 2, date: "03/06" },
                    { name: "Music4", level: 2, date: "03/06" },
                    { name: "Music5", level: 2, date: "03/06" },
                    { name: "Music6", level: 2, date: "03/06" },
                    { name: "Music7", level: 3, date: "03/06" }
                ].map((item, index) => (
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
