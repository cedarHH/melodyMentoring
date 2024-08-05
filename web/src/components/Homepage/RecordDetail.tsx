import React from 'react';
import ReactPlayer from 'react-player';
import {IApiContext} from "../../contexts/ApiContext";
import {GetPerformanceAudioReq, GetPerformanceVideoReq} from "../../contexts/api/mediaComponents";

interface RecordDetailProps {
    profileName: string;
    recordId: number;
    apiContext: IApiContext;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const RecordDetail = async ({
                                profileName,
                                recordId,
                                apiContext,
                                setIsModalOpen,
                                setModalContent,
                            }: RecordDetailProps) => {
    setIsModalOpen(true);

    let videoUrl, audioUrl;

    try {
        const getVideoUrl: GetPerformanceVideoReq = {
            profileName: profileName,
            recordId: recordId,
        };

        videoUrl = await apiContext.record.getPerformanceVideo(getVideoUrl);
    } catch (videoError) {
        console.error("Error fetching video:", videoError);

        try {
            const getAudioUrl: GetPerformanceAudioReq = {
                profileName: profileName,
                recordId: recordId,
            };

            audioUrl = await apiContext.record.getPerformanceAudio(getAudioUrl);
        } catch (audioError) {
            console.error("Error fetching audio:", audioError);
            setModalContent(<div>Error loading media</div>);
            return;
        }
    }

    // Check if the video URL was successfully fetched
    if (videoUrl && videoUrl.code === 0) {
        const presignedUrl = videoUrl.presignedurl;

        setModalContent(
            <div>
                <ReactPlayer url={presignedUrl} controls={true} />
                <button onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
        );
    }
    // Check if the audio URL was successfully fetched
    else if (audioUrl && audioUrl.code === 0) {
        const presignedUrl = audioUrl.presignedurl;

        setModalContent(
            <div>
                <ReactPlayer url={presignedUrl} controls={true} />
                <button onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
        );
    }
    // Handle case where neither video nor audio could be loaded
    else {
        setModalContent(<div>Error loading media</div>);
    }
};

export default RecordDetail;
