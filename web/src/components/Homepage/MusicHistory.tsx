import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import { MusicItem, getMusicDataByKid } from '../../constants/musicData';
import {GetPerformanceReportReq, GetRecordReq, GetReferenceReq} from "../../contexts/api/mediaComponents";
import apiContext, {ApiContext} from "../../contexts/ApiContext";

const MusicHistoryContainer = styled.div`
    background-color: #1B1C1E;
    padding: 20px;
    border-radius: 10px;
    overflow-y: auto;
    margin-top: 20px;
    font-family: 'Arial', serif;
    border: 2px solid #4B4B4B;
`;

const Table = styled.div`
    display: grid;
    grid-template-columns: 1fr 20% 20%;
    width: 100%;
`;

const TableHeader = styled.div`
    font-size: 18px;
    padding: 5px 8px;
    border-bottom: 1px solid #3a3a3a;
    line-height: 1.5;
    font-weight: bold;
    &:nth-child(1) {
        text-align: left;
    }
    &:nth-child(2) {
        text-align: center;
    }
    &:nth-child(3) {
        text-align: right;
    }
`;

const TableRow = styled.div`
    display: contents;
`;

const TableData = styled.div`
    font-size: 16px;
    padding: 4px 8px;
    border-bottom: 1px solid #3a3a3a;
    line-height: 1.6;
    word-wrap: break-word;
    overflow: hidden;
    &:nth-child(1) {
        text-align: left;
    }
    &:nth-child(2) {
        text-align: center;
    }
    &:nth-child(3) {
        text-align: right;
    }

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

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const PaginationButton = styled.button`
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    margin: 0 10px;

    &:hover {
        color: #aaaaaa;
    }

    &:disabled {
        color: #555555;
        cursor: not-allowed;
    }
`;

interface MusicHistoryProps {
    activeKid: string | null;
    onClick: () => void;
}

const MusicHistory: React.FC<MusicHistoryProps> = ({ activeKid, onClick }) => {
    const [musicData, setMusicData] = useState<MusicItem[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const apiContext = useContext(ApiContext);
    const itemsPerPage = 11;

    useEffect(() => {
        const fetchData = async () => {
            if (activeKid && apiContext) {
                const recordsReq: GetRecordReq = {
                    profileName: activeKid,
                    limit: itemsPerPage,
                    offset: currentPage*itemsPerPage,
                    start: -1,
                    end: -1,
                }
                const recordsResp = await apiContext.record.getRecord(recordsReq);
                if(recordsResp.code === 0) {
                    if(recordsResp.data.length != 0) {
                        console.log(recordsResp.data[0].RecordId)
                        console.log(recordsResp.data[0].composition)
                        console.log(recordsResp.data[0].reference)

                        const refReq: GetReferenceReq = {
                            refId: recordsResp.data[0].reference,
                        }
                        const refResp = await apiContext.record.getReference(refReq)
                        if(refResp.code === 0) {
                            console.log(refResp.data.title)
                            console.log(refResp.data.composer)
                            console.log(refResp.data.style)
                            console.log(refResp.data.instrument)
                        }

                        const recordReq: GetPerformanceReportReq = {
                            profileName: activeKid,
                            recordId: recordsResp.data[0].RecordId,
                        }
                        const recordResp = await apiContext.record.getPerformanceReport(recordReq)
                        if(recordResp.code === 0 ) {
                            const response = await fetch(recordResp.presignedurl)
                            if (response.ok) {
                                const report = await response.json();
                                console.log(report["Note accuracy"])
                                console.log(report["Comment"])
                                console.log(report["Detailed_Feedback"])
                                console.log(report["Errors"])
                                console.log(report["raw_diff"])
                                console.log(report["Recommendations"])
                                console.log(report["Detailed_Feedback"])
                            }
                        }
                    }
                }

                // const data = getMusicDataByKid(activeKid);
                // setMusicData(data);
                // setCurrentPage(1); // Reset to first page when activeKid changes
            }
        }

        fetchData().then(r => {});
    }, [activeKid]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = musicData.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(musicData.length / itemsPerPage)));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    return (
        <MusicHistoryContainer>
            <TitleContainer>
                <Title>Music History</Title>
                <ChartButton onClick={onClick}>Show Levels</ChartButton>
            </TitleContainer>
            <Table>
                <TableHeader>Name</TableHeader>
                <TableHeader>Level</TableHeader>
                <TableHeader>Date</TableHeader>
                {currentItems.map((item, index) => (
                    <TableRow key={index}>
                        <TableData>{item.name}</TableData>
                        <TableData>{item.level}</TableData>
                        <TableData>{item.date}</TableData>
                    </TableRow>
                ))}
            </Table>
            <PaginationContainer>
                <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
                    &lt;
                </PaginationButton>
                <span>{currentPage} / {Math.ceil(musicData.length / itemsPerPage)}</span>
                <PaginationButton onClick={nextPage} disabled={currentPage === Math.ceil(musicData.length / itemsPerPage)}>
                    &gt;
                </PaginationButton>
            </PaginationContainer>
        </MusicHistoryContainer>
    );
};

export default MusicHistory;
