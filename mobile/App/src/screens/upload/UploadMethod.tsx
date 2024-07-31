import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, Dimensions,Image,Alert} from 'react-native';
import { StackNavigationProp,createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { RootStackParamList } from '../../contexts/types';
import { styles } from './ui';
import {  useState, useRef, useEffect,useContext  } from 'react';
import { SelectVideo, UploadVideo,SelectAudio,UploadAudio } from './mediaUtils'; 
import CameraRecorder from './CameraRecorder';
import ChooseMethod from './methodChoose';
import { UploadContext } from './UploadContext';
import { useApi } from '../../contexts/apiContext';

type UploadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UploadMethod'>;
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Upload'>;
type UploadScreenRouteProp = RouteProp<RootStackParamList, 'UploadMethod'>;

type Props = {
    navigation: UploadScreenNavigationProp;
    route: UploadScreenRouteProp;
};


const UploadMethod: React.FC<Props> = ({ navigation,route }) => {
    
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [audioUri, setAudioUri] = useState<string | null>(null);
    const [reference, setReference] = useState(false);
    const [aov, setaov] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const context = useContext(UploadContext);
    const api = useApi();

    if (!context) {
        throw new Error('UploadMethod must be used within an UploadProvider');
    }
    const { title, profileName } = context;
    const handleChoose = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleSelectVideo = async () => {
        const uri = await SelectVideo();
        if (uri) {
            setVideoUri(uri);
            setaov('video');
            Alert.alert(
                "Video Selected",
                "A video has been selected: " + uri,
                [
                    { text: "OK"}
                ]
            );
        }
    };

    const handleUpload = async () => {
        if (aov=='video' && videoUri) {
            await UploadVideo(videoUri, title);
            Alert.alert('Video uploaded successfully');
        } 

        if (aov=='audio' && audioUri) {
            await UploadAudio(audioUri, title);
            Alert.alert('Audio uploaded successfully');
        }

        else {
            Alert.alert('No video to upload');
        }
    };

    const handleSelectAudeo = async () => {
        const uri = await SelectAudio();
        if (uri) {
            setAudioUri(uri);
            setaov('audio');
            Alert.alert(
                "Audio Selected",
                "A audio has been selected: " + uri,
                [
                    { text: "OK"}
                ]
            );
        }
    };

    useEffect(() => {
        if (title === 'default') {
            setReference(true);
            
        } else {
            setReference(false);
        }
    }, [title]);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name='chevron-back-outline' size={30} color={'white'} onPress={navigation.goBack}/>
            </View>
            <View style={styles.uploadSection}>
                <TouchableOpacity onPress={handleSelectVideo}>
                    <Image source={require('../../assets/icon/gallery.png')}
                        style={styles.uploadButton}
                        />
                    <Text style={styles.buttonText}>Select Video</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleUpload}>
                    <Image source={videoUri || audioUri ? require('../../assets/img/logo/mygo1.png') : require('../../assets/icon/music-playlist.png')}
                    style={styles.uploadButton}
                    />
                    <Text style={styles.buttonText}>Upload Practice</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSelectAudeo}>
                    <Image source={require('../../assets/icon/music-playlist.png')}
                        style={styles.uploadButton}
                    />
                    <Text style={styles.buttonText}>Select Audio</Text>
                </TouchableOpacity>


                
            </View>
            { !reference && (
                <TouchableOpacity onPress={handleChoose} style={styles.recordSection}>
                    <Image source={require('../../assets/icon/music-circle.png')} style={styles.recordButton}/>
                    <Text style={styles.recordButtonText}>Record Now!</Text>
                </TouchableOpacity>
            )}
            
            <ChooseMethod visible={isModalVisible} onClose={handleCloseModal} navigation={navigation} route={route} />
            
        </View>
    );
};



export default UploadMethod;
