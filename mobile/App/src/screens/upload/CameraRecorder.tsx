// CameraRecorder.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert, StyleSheet, Image } from 'react-native';
import { Camera,CameraView } from 'expo-camera';

const CameraRecorder: React.FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [cameraOn, setCameraOn] = useState(true);
    const cameraRef = useRef<Camera | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleStartRecording = async () => {
        if (cameraRef.current) {
            if (isRecording) {
                // If recording, stop recording
                cameraRef.current.stopRecording();
                setIsRecording(false);
                setCameraOn(false);
                Alert.alert('Recording finished', 'Video has been saved.');
            } else {
                // If not recording, start recording
                setIsRecording(true);
                setCameraOn(true);
                const video = await cameraRef.current.recordAsync();
                console.log('Recording started', video);
                Alert.alert('Recording finished', `Video path: ${video.uri}`);
            }
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <CameraView style={styles.camera} ref={cameraRef}>
            <TouchableOpacity onPress={handleStartRecording} style={styles.recordSection}>
                <Image source={require('../../assets/icon/music-circle.png')} style={styles.recordButton}/>
                <Text style={styles.recordButtonText}>{isRecording ? 'Recording...' : 'Record Now!'}</Text>
            </TouchableOpacity>
        </CameraView>
    );
};

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    recordSection: {
        padding: 20,
        backgroundColor: 'transparent',
    },
    recordButton: {
        width: 50,
        height: 50,
    },
    recordButtonText: {
        fontSize: 18,
        color: 'white',
    },
});

export default CameraRecorder;
