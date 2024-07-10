import React from 'react';
import styled from 'styled-components';

const MusicHistoryContainer = styled.div`
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  overflow-y: auto;
  margin-top: 20px;
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
                    { name: "Für Elise", level: 1, date: "02/05" },
                    { name: "Moonlight Sonata", level: 2, date: "02/06" },
                    { name: "Clair de Lune", level: 2, date: "02/06" },
                    { name: "Prelude in C Major", level: 1, date: "02/06" },
                    { name: "Gymnopédie No.1", level: 1, date: "02/06" },
                    { name: "Nocturne in E-flat Major", level: 2, date: "02/06" },
                    { name: "The Entertainer", level: 1, date: "02/06" },
                    { name: "Canon in D", level: 1, date: "02/06" },
                    { name: "Minuet in G Major", level: 1, date: "02/05" },
                    { name: "Ave Maria", level: 1, date: "02/05" },
                    { name: "Arabesque No. 1", level: 1, date: "02/05" },
                    { name: "River Flows in You", level: 1, date: "02/05" },
                    { name: "Rondo Alla Turca", level: 3, date: "02/05" },
                    { name: "Liebestraum No. 3", level: 2, date: "02/05" }
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
