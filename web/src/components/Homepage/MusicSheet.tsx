import React, { useEffect, useRef } from 'react';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

interface MusicSheetProps {
    fileUrl: string;
}

const MusicSheet: React.FC<MusicSheetProps> = ({ fileUrl }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const osmdRef = useRef<OpenSheetMusicDisplay | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            if (osmdRef.current) {
                osmdRef.current.clear();
            } else {
                osmdRef.current = new OpenSheetMusicDisplay(containerRef.current, {
                    autoResize: true,
                    backend: "svg",
                    drawTitle: false,
                });
            }

            osmdRef.current
                .load(fileUrl)
                .then(() => {
                    osmdRef.current!.render();
                })
                .catch((error) => {
                    console.error("Error loading MusicXML file:", error);
                });
        }

        return () => {
            osmdRef.current?.clear();
        };
    }, [fileUrl]);

    return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};


export default MusicSheet;
