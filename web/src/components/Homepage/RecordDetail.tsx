import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player';
import {IApiContext} from "../../contexts/ApiContext";
import {
    GetPerformanceAudioReq,
    GetPerformanceAudioResp,
    GetPerformanceReportReq, GetPerformanceSheetReq, GetPerformanceSheetResp,
    GetPerformanceVideoReq,
    GetPerformanceVideoResp,
    GetPerformanceWaterfallReq,
    GetRefAudioReq, GetRefAudioResp, GetRefSheetReq, GetRefSheetResp,
    GetRefVideoReq, GetRefVideoResp,
    GetRefWaterfallReq
} from "../../contexts/api/mediaComponents";
import MusicSheet from "./MusicSheet";

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
    const [sheetUrl, setSheetUrl] = useState<GetPerformanceSheetResp | null>(null);
    const [reportData, setReportData] = useState<any | null>(null);
    const [refVideoUrl, setRefVideoUrl] = useState<GetRefVideoResp | null>(null);
    const [refAudioUrl, setRefAudioUrl] = useState<GetRefAudioResp | null>(null);
    const [refWaterfallUrl, setRefWaterfallUrl] = useState<string | null>(null);
    const [refSheetUrl, setRefSheetUrl] = useState<GetRefSheetResp | null>(null);

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

            // Fetch performance sheet URL
            try {
                const getPerformanceSheetUrl: GetPerformanceSheetReq = {
                    profileName: profileName,
                    recordId: recordId,
                };
                const sheetResp = await apiContext.record.getPerformanceSheet(getPerformanceSheetUrl);
                setSheetUrl(sheetResp);
            } catch (error) {
                console.error("Error fetching reference audio:", error);
            }

            const midiToNoteName = (midiNumber: number): string => {
                const noteNames: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
                const octave: number = Math.floor(midiNumber / 12) - 1;
                const note: string = noteNames[midiNumber % 12];
                return `${note}${octave}`;
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

                        const ticksPerBeat = data['ticks_per_beat'];
                        const numerator = data['numerator'];
                        const denominator = data['denominator'];
                        const tempo = data['tempo'];
                        const rawDiff = data['raw_diff'];

                        const processNote = (note: any, ticksPerBeat: number, numerator: number, denominator: number, tempo: number): {
                            duration: number,
                            note: string,
                            start_time: number,
                            velocity_on: any,
                            beat_number: number,
                            duration_time: number,
                            measure_number: number
                        } => {
                            return {
                                note: midiToNoteName(note.note),
                                velocity_on: note.velocity_on,
                                measure_number: Math.floor(note.start_time / (ticksPerBeat * numerator)) + 1,
                                beat_number: Math.round((note.start_time / (ticksPerBeat * numerator)) % 1 * denominator),
                                start_time: note.start_time / ticksPerBeat * tempo / 1000000,
                                duration_time: note.duration / ticksPerBeat * tempo / 1000000,
                                duration: Math.round(note.duration / ticksPerBeat * denominator),
                            };
                        }

                        const processedRawDiff = {
                            adds: rawDiff.adds.map((addGroup: any[]) =>
                                addGroup.map(note => processNote(note, ticksPerBeat, numerator, denominator, tempo))
                            ),
                            deletes: rawDiff.deletes.map((deleteGroup: any[]) =>
                                deleteGroup.map(note => processNote(note, ticksPerBeat, numerator, denominator, tempo))
                            ),
                            changes: rawDiff.changes.map((changeGroup: [any[], any[]]) => {
                                const [originalNoteArray, changedNoteArray] = changeGroup;
                                const originalNote = originalNoteArray[0]; // Extracting the first element from the original note array
                                const changedNote = changedNoteArray[0];  // Extracting the first element from the changed note array

                                return {
                                    original: processNote(originalNote, ticksPerBeat, numerator, denominator, tempo),
                                    changed: processNote(changedNote, ticksPerBeat, numerator, denominator, tempo),
                                };
                            })
                        };

                        const generateReport = (processedRawDiff: any): string => {
                            const report: string[] = [];

                            // Adds
                            if (processedRawDiff.adds.length > 0) {
                                report.push("Extra Notes Played:");
                                processedRawDiff.adds.forEach((addGroup: any[]) => {
                                    addGroup.forEach(note => {
                                        report.push(
                                            `    ${note.note}:`,
                                            `        Measure ${note.measure_number}, Beat ${note.beat_number}`,
                                            `        Played for ${note.duration} beat(s), approximately ${note.duration_time.toFixed(2)} seconds`,
                                            `        Velocity: ${note.velocity_on}`,
                                            ""
                                        );
                                    });
                                });
                            }

                            // Deletes
                            if (processedRawDiff.deletes.length > 0) {
                                report.push("Missed Notes:");
                                processedRawDiff.deletes.forEach((deleteGroup: any[]) => {
                                    deleteGroup.forEach(note => {
                                        report.push(
                                            `    ${note.note}:`,
                                            `        Measure ${note.measure_number}, Beat ${note.beat_number}`,
                                            `        Expected to be played for ${note.duration} beat(s), approximately ${note.duration_time.toFixed(2)} seconds`,
                                            `        Velocity: ${note.velocity_on}`,
                                            ""
                                        );
                                    });
                                });
                            }

                            // Changes
                            if (processedRawDiff.changes.length > 0) {
                                report.push("Incorrectly Played Notes:");
                                processedRawDiff.changes.forEach((changeGroup: any) => {
                                    const { original, changed } = changeGroup;
                                    report.push(
                                        `    ${changed.note}:`,
                                        `        Measure ${changed.measure_number}, Beat ${changed.beat_number}`,
                                        `        Played for ${changed.duration} beat(s), approximately ${changed.duration_time.toFixed(2)} seconds`,
                                        `        Velocity: ${changed.velocity_on}`,
                                        `        Correct note should be ${original.note}:`,
                                        `            Measure ${original.measure_number}, Beat ${original.beat_number}`,
                                        `            Should be played for ${original.duration} beat(s), approximately ${original.duration_time.toFixed(2)} seconds`,
                                        `            Velocity: ${original.velocity_on}`,
                                        ""
                                    );
                                });
                            }

                            return report.join("\n");
                        }

                        setReportData({
                            noteAccuracy: data['Note accuracy'],
                            velocityAccuracy: data['Velocity accuracy'],
                            durationAccuracy: data['Duration accuracy'],
                            comment: data['Comment'],
                            errors: data['Errors'],
                            feedback: data['Detailed_Feedback'],
                            recommendation: data['Recommendations'],
                            rawDiff: generateReport(processedRawDiff),
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

            // Fetch reference sheet URL
            try {
                const getRefSheetUrl: GetRefSheetReq = {
                    refId: refId
                };
                const refSheetResp = await apiContext.record.getRefSheet(getRefSheetUrl);
                setRefSheetUrl(refSheetResp);
            } catch (error) {
                console.error("Error fetching reference audio:", error);
            }
        };

        fetchData();
    }, [profileName, recordId, refId, apiContext, setIsModalOpen]);

    const renderContent = () => {
        switch (activeContent) {
            case 'video':
                return videoUrl && videoUrl.code === 0 ? (
                    <ReactPlayer url={videoUrl.presignedurl} controls={true}/>
                ) : (
                    <div>Video content not available</div>
                );
            case 'audio':
                return audioUrl && audioUrl.code === 0 ? (
                    <ReactPlayer url={audioUrl.presignedurl} controls={true}/>
                ) : (
                    <div>Audio content not available</div>
                );
            case 'waterfall':
                return imgUrl ? (
                    <img src={imgUrl} alt="Waterfall"/>
                ) : (
                    <div>Waterfall content not available</div>
                );
            case 'sheet':
                return sheetUrl && sheetUrl.code === 0 ? (
                    <div style={containerStyle}>
                        <MusicSheet fileUrl={sheetUrl.presignedurl}/>
                    </div>
                ) : (
                    <div>Reference sheet not available</div>
                );
            case 'report':
                return reportData ? (
                    <div style={{whiteSpace: 'pre-wrap'}}>
                        <h3>Performance Report</h3>
                        <p><strong>Note Accuracy:</strong> {reportData.noteAccuracy}</p>
                        <br/>
                        <p><strong>Velocity Accuracy:</strong> {reportData.velocityAccuracy}</p>
                        <br/>
                        <p><strong>Duration Accuracy:</strong> {reportData.durationAccuracy}</p>
                        <br/>
                        <p><strong>Comment:</strong> {reportData.comment}</p>
                        <br/>
                        <p><strong>Errors:</strong> {reportData.errors}</p>
                        <br/>
                        <p><strong>Detailed feedback:</strong> {reportData.feedback}</p>
                        <br/>
                        <p><strong>Recommendations:</strong> {reportData.recommendation}</p>
                        <br/>
                        <p><strong>Errors:</strong> {reportData.rawDiff}</p>
                    </div>
                ) : (
                    <div>Report content not available</div>
                );
            case 'refVideo':
                return refVideoUrl && refVideoUrl.code === 0 ? (
                    <ReactPlayer url={refVideoUrl.presignedurl} controls={true}/>
                ) : (
                    <div>Reference video not available</div>
                );
            case 'refAudio':
                return refAudioUrl && refAudioUrl.code === 0 ? (
                    <ReactPlayer url={refAudioUrl.presignedurl} controls={true}/>
                ) : (
                    <div>Reference audio not available</div>
                );
            case 'refWaterfall':
                return refWaterfallUrl ? (
                    <img src={refWaterfallUrl} alt="Reference Waterfall"/>
                ) : (
                    <div>Reference waterfall not available</div>
                );
            case 'refSheet':
                return refSheetUrl && refSheetUrl.code === 0 ? (
                    <div style={containerStyle}>
                        <MusicSheet fileUrl={refSheetUrl.presignedurl}/>
                    </div>
                ) : (
                    <div>Reference sheet not available</div>
                );
            default:
                return <div>Error loading content</div>;
        }
    };

    return (
        <div style={{maxWidth: '1200px'}}>
            <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '10px'}}>
                <button style={buttonStyle} onClick={() => setActiveContent('video')}>User Video</button>
                <button style={buttonStyle} onClick={() => setActiveContent('audio')}>User Audio</button>
                <button style={buttonStyle} onClick={() => setActiveContent('waterfall')}>User Image</button>
                <button style={buttonStyle} onClick={() => setActiveContent('sheet')}>User Sheet</button>
                <button style={buttonStyle} onClick={() => setActiveContent('report')}>User Report</button>
                <button style={buttonStyle} onClick={() => setActiveContent('refVideo')}>Ref Video</button>
                <button style={buttonStyle} onClick={() => setActiveContent('refAudio')}>Ref Audio</button>
                <button style={buttonStyle} onClick={() => setActiveContent('refWaterfall')}>Ref Image</button>
                <button style={buttonStyle} onClick={() => setActiveContent('refSheet')}>Ref Sheet</button>
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

const containerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};


export default RecordDetail;
