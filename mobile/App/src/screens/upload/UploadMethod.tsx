import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, Dimensions,Image,Alert,TextInput} from 'react-native';
import { StackNavigationProp,createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { RootStackParamList } from '../../contexts/types';
import { styles } from './ui';
import {  useState, useRef, useEffect,useContext  } from 'react';
import { SelectVideo, UploadVideo,SelectAudio,UploadAudio, UploadRefVideo, UploadRefAudio } from './mediaUtils';
import CameraRecorder from './CameraRecorder';
import ChooseMethod from './methodChoose';
import { UploadContext } from './UploadContext';
import { useApi } from '../../contexts/apiContext';
import { CreateReferenceReq, CreateReferenceResp } from '../../contexts/apiParams/mediaComponents';

type UploadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UploadMethod'>;
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Upload'>;
type UploadScreenRouteProp = RouteProp<RootStackParamList, 'UploadMethod'>;

type Props = {
    navigation: UploadScreenNavigationProp;
    route: UploadScreenRouteProp;
};


const UploadMethod: React.FC<Props> = ({ navigation,route }) => {
    const [recordingUri, setRecordingUri] = useState<string|null>('');
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [audioUri, setAudioUri] = useState<string | null>(null);
    const [reference, setReference] = useState(false);
    const [refid, setrefid] = useState<string>('');
    const [aov, setaov] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const context = useContext(UploadContext);
    const [form, setForm] = useState({
        title: '',
        style: '',
        composer: '',
        instrument: ''
    });
    const api = useApi();

    if (!context) {
        throw new Error('UploadMethod must be used within an UploadProvider');
    }
    const { title,refId, profileName } = context;
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
            const recordId = await UploadVideo(videoUri, profileName,refId);
            navigation.navigate('Result',{profileName:context.profileName, recordId: recordId, referenceId: context.refId, analysisId: 0} ); //, refId: context.refId, analysisId: analysisId
            Alert.alert('Video uploaded successfully');
        }

        if (aov=='audio' && audioUri) {
            try {
                const [analysisId, recordId] = await UploadAudio(api, audioUri, context.profileName, context.refId);
                navigation.navigate('Result',{profileName:context.profileName, recordId: recordId, referenceId: context.refId, analysisId: analysisId} ); //, refId: context.refId, analysisId: analysisId
            } catch (error) {
                console.error('Upload failed:', error);
                Alert.alert('Error', 'Failed to upload audio.');
            }
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

    const handleInputChange = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value
        });
    };

    const handleRefUpload = async () => {
        try {
            const reqParams: CreateReferenceReq = form
            const resp: CreateReferenceResp = await api.reference.createReference(reqParams)
            if(resp.code === 0) {
                const refid = resp.refId;
                setrefid(refid)
            }

        } catch(error) {
            console.error('Error create ref:', error);
        }

        if (aov=='video' && videoUri) {
            await UploadRefVideo(videoUri,profileName, refid,form.title, form.style, form.composer, form.instrument);
            Alert.alert('Video uploaded successfully');
        }

        if (aov=='audio' && audioUri) {
            await UploadRefAudio(audioUri,profileName, refid,form.title, form.style, form.composer, form.instrument);
            Alert.alert('Audio uploaded successfully');
        }

        else {
            Alert.alert('No video to upload');
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

                <TouchableOpacity onPress={reference ? handleRefUpload : handleUpload}>
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

            { reference && (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={form.title}
                        onChangeText={(text) => handleInputChange('title', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Style"
                        value={form.style}
                        onChangeText={(text) => handleInputChange('style', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Composer"
                        value={form.composer}
                        onChangeText={(text) => handleInputChange('composer', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Instrument"
                        value={form.instrument}
                        onChangeText={(text) => handleInputChange('instrument', text)}
                    />
                </View>
            )}

            <ChooseMethod visible={isModalVisible} onClose={handleCloseModal} navigation={navigation} route={route} />

        </View>
    );
};



export default UploadMethod;