import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GetRecordReq, GetReferenceReq } from '../../contexts/api/mediaComponents';
import {ApiContext, IApiContext} from '../../contexts/ApiContext';
import RecordDetail from "./RecordDetail";

interface MusicHistoryProps {
    activeKid: string | null;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

interface MusicData {
    title: string;
    style: string;
    instrument: string;
    date: string;
    recordId: number;
}

const MusicHistory: React.FC<MusicHistoryProps> = ({ activeKid, setIsModalOpen, setModalContent, }) => {
    const [musicData, setMusicData] = useState<MusicData[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const apiContext: IApiContext | undefined  = useContext(ApiContext);
    const itemsPerPage = 11;

    useEffect(() => {
        const fetchData = async () => {
            if (activeKid && apiContext) {
                const recordsReq: GetRecordReq = {
                    profileName: activeKid,
                    limit: itemsPerPage,
                    offset: currentPage * itemsPerPage,
                    start: -1,
                    end: -1,
                };
                const recordsResp = await apiContext.record.getRecord(recordsReq);
                if (recordsResp.code === 0) {
                    if (recordsResp.data && recordsResp.data.length !== 0) {
                        const newMusicData = await Promise.all(
                            recordsResp.data.map(async (record: any) => {
                                const refReq: GetReferenceReq = {
                                    refId: record.reference,
                                };
                                const refResp = await apiContext.record.getReference(refReq);
                                if (refResp.code === 0) {
                                    return {
                                        title: refResp.data.title,
                                        style: refResp.data.style,
                                        instrument: refResp.data.instrument,
                                        date: new Date(record.RecordId * 1000).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false,
                                        }),
                                        recordId: record.RecordId, // Store RecordId
                                    };
                                }
                                return null;
                            })
                        );

                        // @ts-ignore
                        setMusicData(newMusicData.filter((item) => item !== null));
                    } else {
                        setMusicData([]); // Ensure musicData is empty if no records
                    }
                }
            }
        };

        fetchData();
    }, [activeKid, apiContext, currentPage]);

    const nextPage = () =>
        setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(musicData.length / itemsPerPage) - 1));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

    const handleItemClick = (recordId: number) => {
        if (activeKid && recordId && apiContext) {
            RecordDetail({
                profileName: activeKid,
                recordId: recordId,
                apiContext: apiContext,
                setIsModalOpen: setIsModalOpen,
                setModalContent: setModalContent
            });
        }
    };

    return (
        <MusicHistoryContainer>
            <TitleContainer>
                <Title>Music History</Title>
            </TitleContainer>
            {musicData.length === 0 ? (
                <div>No records found.</div>
            ) : (
                <>
                    <Table>
                        <TableHeader>Title</TableHeader>
                        <TableHeader>Style</TableHeader>
                        <TableHeader>Instrument</TableHeader>
                        <TableHeader>Date</TableHeader>
                        {musicData
                            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                            .map((item, index) => (
                                <TableRow key={index} onClick={() => handleItemClick(item.recordId)}>
                                    <TableData>{item.title}</TableData>
                                    <TableData>{item.style}</TableData>
                                    <TableData>{item.instrument}</TableData>
                                    <TableData>{item.date}</TableData>
                                </TableRow>
                            ))}
                    </Table>
                    <PaginationContainer>
                        <PaginationButton onClick={prevPage} disabled={currentPage === 0}>
                            &lt;
                        </PaginationButton>
                        <span>
                            {currentPage + 1} / {Math.ceil(musicData.length / itemsPerPage)}
                        </span>
                        <PaginationButton
                            onClick={nextPage}
                            disabled={currentPage >= Math.ceil(musicData.length / itemsPerPage) - 1}
                        >
                            &gt;
                        </PaginationButton>
                    </PaginationContainer>
                </>
            )}
        </MusicHistoryContainer>
    );
};

export default MusicHistory;

const MusicHistoryContainer = styled.div`
    background-color: #1b1c1e;
    padding: 20px;
    border-radius: 10px;
    overflow-y: auto;
    margin-top: 20px;
    font-family: 'Arial', serif;
    border: 2px solid #4b4b4b;
`;

const Table = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr; /* Adjusted column width for the date */
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
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
        text-align: center;
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
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
        text-align: center;
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
    background-color: #292a2c;
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
