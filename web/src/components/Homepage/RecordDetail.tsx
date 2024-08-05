import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { IApiContext } from "../../contexts/ApiContext";
import {
    GetPerformanceAudioReq,
    GetPerformanceAudioResp,
    GetPerformanceReportReq,
    GetPerformanceVideoReq,
    GetPerformanceVideoResp,
    GetPerformanceWaterfallReq,
    GetRefAudioReq,
    GetRefVideoReq,
    GetRefWaterfallReq
} from "../../contexts/api/mediaComponents";

interface RecordDetailProps {
    profileName: string;
    recordId: number;
    refId: string;
    apiContext: IApiContext;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecordDetail: React.FC<RecordDetailProps> = ({
                                                       profileName,
                                                       recordId,
                                                       refId,
                                                       apiContext,
                                                       setIsModalOpen,
                                                   }) => {
    const [activeContent, setActiveContent] = useState<string>('video');
    const [videoUrl, setVideoUrl] = useState<GetPerformanceVideoResp | null>(null);
    const [audioUrl, setAudioUrl] = useState<GetPerformanceAudioResp | null>(null);
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [reportData, setReportData] = useState<any | null>(null);
    const [refVideoUrl, setRefVideoUrl] = useState<GetPerformanceVideoResp | null>(null);
    const [refAudioUrl, setRefAudioUrl] = useState<GetPerformanceAudioResp | null>(null);
    const [refWaterfallUrl, setRefWaterfallUrl] = useState<string | null>(null);

    useEffect(() => {
        setIsModalOpen(true);

        const fetchData = async () => {
            // Fetch performance video URL
            try {
                const getVideoUrl: GetPerformanceVideoReq = {
                    profileName: profileName,
                    recordId: recordId,
                };
                const videoResp = await apiContext.record.getPerformanceVideo(getVideoUrl);
                setVideoUrl(videoResp);
            } catch (error) {
                console.error("Error fetching performance video:", error);
            }

            // Fetch performance audio URL
            try {
                const getAudioUrl: GetPerformanceAudioReq = {
                    profileName: profileName,
                    recordId: recordId,
                };
                const audioResp = await apiContext.record.getPerformanceAudio(getAudioUrl);
                setAudioUrl(audioResp);
            } catch (error) {
                console.error("Error fetching performance audio:", error);
            }

            // Fetch performance waterfall image URL
            try {
                const getWaterfallUrl: GetPerformanceWaterfallReq = {
                    profileName: profileName,
                    recordId: recordId,
                };
                const waterfallResp = await apiContext.record.getPerformanceWaterfall(getWaterfallUrl);
                setImgUrl(waterfallResp.presignedurl);
            } catch (error) {
                console.error("Error fetching performance waterfall:", error);
            }

            // Fetch performance report
            try {
                const getReportUrl: GetPerformanceReportReq = {
                    profileName: profileName,
                    recordId: recordId,
                };
                const reportUrl = await apiContext.record.getPerformanceReport(getReportUrl);
                if (reportUrl) {
                    const response = await fetch(reportUrl.presignedurl);
                    if (response.ok) {
                        const data = await response.json();
                        setReportData({
                            noteAccuracy: data['Note accuracy'],
                            velocityAccuracy: data['Velocity accuracy'],
                            durationAccuracy: data['Duration accuracy'],
                            comment: data['Comment'],
                            errors: data['Errors'],
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching performance report:", error);
            }

            // Fetch reference video URL
            try {
                const getRefVideoUrl: GetRefVideoReq = {
                    refId: refId
                };
                const refVideoResp = await apiContext.record.getRefVideo(getRefVideoUrl);
                setRefVideoUrl(refVideoResp);
            } catch (error) {
                console.error("Error fetching reference video:", error);
            }

            // Fetch reference audio URL
            try {
                const getRefAudioUrl: GetRefAudioReq = {
                    refId: refId
                };
                const refAudioResp = await apiContext.record.getRefAudio(getRefAudioUrl);
                setRefAudioUrl(refAudioResp);
            } catch (error) {
                console.error("Error fetching reference audio:", error);
            }

            // Fetch reference waterfall image URL
            try {
                const getRefWaterfallUrl: GetRefWaterfallReq = {
                    refId: refId
                };
                const refWaterfallResp = await apiContext.record.getRefWaterfall(getRefWaterfallUrl);
                setRefWaterfallUrl(refWaterfallResp.presignedurl);
            } catch (error) {
                console.error("Error fetching reference waterfall:", error);
            }
        };

        fetchData();
    }, [profileName, recordId, refId, apiContext, setIsModalOpen]);

    const renderContent = () => {
        switch (activeContent) {
            case 'video':
                return videoUrl && videoUrl.code === 0 ? (
                    <ReactPlayer url={videoUrl.presignedurl} controls={true} />
                ) : (
                    <div>Video content not available</div>
                );
            case 'audio':
                return audioUrl && audioUrl.code === 0 ? (
                    <ReactPlayer url={audioUrl.presignedurl} controls={true} />
                ) : (
                    <div>Audio content not available</div>
                );
            case 'waterfall':
                return imgUrl ? (
                    <img src={imgUrl} alt="Waterfall" />
                ) : (
                    <div>Waterfall content not available</div>
                );
            case 'report':
                return reportData ? (
                    <div>
                        <h3>Performance Report</h3>
                        <p><strong>Note Accuracy:</strong> {reportData.noteAccuracy}</p>
                        <p><strong>Velocity Accuracy:</strong> {reportData.velocityAccuracy}</p>
                        <p><strong>Duration Accuracy:</strong> {reportData.durationAccuracy}</p>
                        <p><strong>Comment:</strong> {reportData.comment}</p>
                        <p><strong>Errors:</strong> {reportData.errors}</p>
                    </div>
                ) : (
                    <div>Report content not available</div>
                );
            case 'refVideo':
                return refVideoUrl && refVideoUrl.code === 0 ? (
                    <ReactPlayer url={refVideoUrl.presignedurl} controls={true} />
                ) : (
                    <div>Reference video not available</div>
                );
            case 'refAudio':
                return refAudioUrl && refAudioUrl.code === 0 ? (
                    <ReactPlayer url={refAudioUrl.presignedurl} controls={true} />
                ) : (
                    <div>Reference audio not available</div>
                );
            case 'refWaterfall':
                return refWaterfallUrl ? (
                    <img src={refWaterfallUrl} alt="Reference Waterfall" />
                ) : (
                    <div>Reference waterfall not available</div>
                );
            default:
                return <div>Error loading content</div>;
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
                <button style={buttonStyle} onClick={() => setActiveContent('video')}>User Video</button>
                <button style={buttonStyle} onClick={() => setActiveContent('audio')}>User Audio</button>
                <button style={buttonStyle} onClick={() => setActiveContent('waterfall')}>User Image</button>
                <button style={buttonStyle} onClick={() => setActiveContent('report')}>User Report</button>
                <button style={buttonStyle} onClick={() => setActiveContent('refVideo')}>Ref Video</button>
                <button style={buttonStyle} onClick={() => setActiveContent('refAudio')}>Ref Audio</button>
                <button style={buttonStyle} onClick={() => setActiveContent('refWaterfall')}>Ref Image</button>
                <button style={buttonStyle} onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
            {renderContent()}
        </div>
    );
};

const buttonStyle = {
    backgroundColor: 'RGB(122,203,245)',
    borderRadius: '15px',
    color: 'black',
    padding: '10px 15px',
    border: 'none',
    cursor: 'pointer',
    margin: '5px',
    fontSize: '14px',
};

export default RecordDetail;
