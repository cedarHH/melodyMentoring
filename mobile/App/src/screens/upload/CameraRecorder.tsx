// CameraRecorder.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert, StyleSheet, Image, Platform } from 'react-native';
import { Camera,CameraView } from 'expo-camera';
import { Audio,ResizeMode,Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import Button from '../../components/MISC/Button';
import { StackNavigationProp,createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../contexts/types';
import { RouteProp } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import { PermissionsAndroid } from 'react-native';
import UploadMethod from './UploadMethod';

type UploadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CameraRecorder'>;
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Upload'>;
type UploadScreenRouteProp = RouteProp<RootStackParamList, 'CameraRecorder'>;

type Props = {
    navigation: UploadScreenNavigationProp;
    route: UploadScreenRouteProp;
};

const CameraRecorder: React.FC<Props> = ({ navigation,route }) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [showCamera, setShowCamera] = useState(true);
    const [videoUri, setVideoUri] = useState<string | null>(null);
    // @ts-ignore
    const cameraRef = useRef<Camera>(null);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            const audioStatus = await Camera.requestMicrophonePermissionsAsync();
            const status = await Audio.requestPermissionsAsync();
            const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
            setHasPermission(cameraStatus.status === 'granted' && audioStatus.status === 'granted' && mediaLibraryStatus.status === 'granted');

            })();
          }, []);

    const handleStartRecording = async () => {
        if (cameraRef.current) {
            if (isRecording) {
                // Ensure there is enough time for recording to have started
                await cameraRef.current.stopRecording();
                setIsRecording(false);
                setShowCamera(false);
                console.log('Recording stopped');
            } else {
                setIsRecording(true);
                try {
                    const video = await cameraRef.current.recordAsync();
                    console.log('Video saved:', video.uri);
                    setVideoUri(video.uri);
                    setTimeout(() => {
                        Alert.alert('Recording finished', `Video saved: ${video.uri}`);
                    }, 50);
                } catch (error) {
                    console.error('Recording failed', error);
                    setIsRecording(false);
                    Alert.alert('Recording Error', 'Failed to record video.');
                }
            }
        }
    };

    const handleUploadVideo = () => {
        console.log(videoUri)
        // 处理视频上传逻辑
        Alert.alert('Upload', 'Uploading video...');
        // 假设上传函数在此处
    };
    
    const handleBackToCamera = () => {
        setShowCamera(true);
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handleSaveVideo = async () => {
        if (videoUri) {
          try {
            await MediaLibrary.createAssetAsync(videoUri);
            console.log('Save ');
            Alert.alert('Saved')
          } catch (error) {
            console.error('Save failed', error);
          }
        }
    };

    const handleBack = async () => {
        navigation.navigate('UploadMethod')
    }

    return (
        <View style={styles.container}>
            
            {showCamera && (
                <CameraView mode="video" style={styles.camera} ref={cameraRef}>
                    <View style={styles.bottom}>
                        <TouchableOpacity onPress={handleBack}>
                            <Image source={require('../../assets/icon/music-circle.png')} style={styles.recordButton}/>
                            <Text style={styles.recordButtonText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleStartRecording} style={styles.recordSection}>
                            <Image source={require('../../assets/icon/music-circle.png')} style={styles.recordButton}/>
                            <Text style={styles.recordButtonText}>{isRecording ? 'Recording...' : 'Record Now!'}</Text>
                        </TouchableOpacity>
                    </View>
                    
                </CameraView>
            )}
            
            
        
            {!isRecording && !showCamera && videoUri && (
                <View style={styles.uploadContainer}>
                    <Video
                        source={{ uri: videoUri }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode={ResizeMode.CONTAIN}
                        shouldPlay
                        style={styles.video}
                    />
                    <View style={styles.buttonContainer}>
                        <Button text="Upload Video" onPress={handleUploadVideo} style={styles.button}/>
                        <Button text="Save Video" onPress={handleSaveVideo} style={styles.button}/>
                        <Button text="Back" onPress={handleBackToCamera} style={styles.button}/>
                    </View>
                    
                </View>
            )} 
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bottom: {
        alignItems:'center',
        justifyContent: 'center',
        width:'60%',
        flexDirection: 'row'
    },
    recordSection: {
        padding: 20,
        backgroundColor: 'transparent',
    },
    recordButton: {
        alignSelf:'center',
        width: 50,
        height: 50,
    },
    recordButtonText: {
        alignSelf:'center',
        fontSize: 18,
        color: 'white',
    },
    uploadContainer: {
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
    video: {
        width: '70%',
        height: '70%',
    },
    buttonContainer: {
        width:'60%',
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    button: {
        width: '20%',
    }
});

export default CameraRecorder;
