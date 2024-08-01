import { StackNavigationProp } from "@react-navigation/stack";
import React ,{ useState, useRef,useContext } from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { Audio } from 'expo-av';
import { RootStackParamList } from "../../contexts/types";
import { RouteProp } from "@react-navigation/native";
import { UploadContext } from './UploadContext';
import { UploadAudio, UploadRefAudio } from "./mediaUtils";

type UploadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Practice'>;
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Upload'>;
type UploadScreenRouteProp = RouteProp<RootStackParamList, 'Practice'>;

type Props = {
    navigation: UploadScreenNavigationProp;
    route: UploadScreenRouteProp;
};

const Practice: React.FC<Props> = ({ navigation }) => {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [recordingUri, setRecordingUri] = useState<string|null>('');
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const context = useContext(UploadContext);
    if (!context) {
        throw new Error('UploadMethod must be used within an UploadProvider');
    }
    console.log(context)

    const handleStartRecording = async () => {
        try {
            if (permissionResponse?.status !== 'granted') {
              console.log('Requesting permission..');
              await requestPermission();
            }
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            });
      
            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
          } catch (err) {
            console.error('Failed to start recording', err);
          }
    };
    const handleStopRecording = async () => {
        if (recording) {
            try {
                await recording.stopAndUnloadAsync();
                const uri = recording.getURI();
                setRecordingUri(uri);
                console.log("Recording stopped and stored at", uri);
            } catch (error) {
                console.error("Failed to stop recording", error);
            } finally {
                setRecording(null);
            }
        }
    };

    const handleUpAudio = async () => {
        if (recordingUri){
            try {
                const [analysisId, recordId] = await UploadAudio(recordingUri, context.profileName, context.refId);
                navigation.navigate('Result',{profileName:context.profileName, recordId: recordId, refId: context.refId, analysisId: analysisId} );
            } catch (error) {
                console.error('Upload failed:', error);
                Alert.alert('Error', 'Failed to upload audio.');
            }
        }

       
    };
    const handleBack = async () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'UploadMethod' }],
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.musicContainer}>

            </View>
            <View style={styles.buttonContainer}>
                
                <TouchableOpacity onPress={recording ? handleStopRecording : handleStartRecording} style={styles.recordButton}>
                    <Text style={styles.recordButtonText}>
                        {recording ? 'Stop Recording' : 'Start Recording'}
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>         
                    <Text style={styles.recordButtonText}>Back</Text>
                </TouchableOpacity>

                {recordingUri && (
                    <TouchableOpacity onPress={handleUpAudio} style={styles.playButton}>
                        <Text style={styles.playButtonText}>upload</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
        )
        
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    musicContainer: {
        flex:0.7
    },
    
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        flex:0.3,
        justifyContent: 'space-around',
        alignItems: 'center',
        width:'80%'
    },
    recordButton: {
        backgroundColor: '#1E90FF',
        
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        justifyContent:'flex-end'
    },
    recordButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    playButton: {
        backgroundColor: '#32CD32',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    playButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Practice;

