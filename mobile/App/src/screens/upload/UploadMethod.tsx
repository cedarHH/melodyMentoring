import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, Dimensions, Image, Alert, TextInput} from 'react-native';
import {StackNavigationProp, createStackNavigator} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import {RootStackParamList} from '../../contexts/types';
import {styles} from './ui';
import {useState, useRef, useEffect, useContext} from 'react';
import {SelectVideo, UploadVideo, SelectAudio, UploadAudio, UploadRefVideo, UploadRefAudio} from './mediaUtils';
import * as ImagePicker from 'expo-image-picker';
import ChooseMethod from './methodChoose';
import {Modal, ActivityIndicator} from 'react-native';
import {UploadContext} from './UploadContext';
import {useApi} from '../../contexts/apiContext';
import {
    CreateReferenceReq,
    CreateReferenceResp,
    GetAnalysisResultReqParams,
    GetAnalysisResultResp,
    GetRefImgUrlReq,
    GetRefImgUrlResp, PerformanceAnalysisReq, PerformanceAnalysisResp,
    UploadRefImgSuccessReq,
    UploadRefImgSuccessResp
} from '../../contexts/apiParams/mediaComponents';

type UploadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UploadMethod'>;
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Upload'>;
type UploadScreenRouteProp = RouteProp<RootStackParamList, 'UploadMethod'>;

type Props = {
    navigation: UploadScreenNavigationProp;
    route: UploadScreenRouteProp;
};


const UploadMethod: React.FC<Props> = ({navigation, route}) => {
    const [recordingUri, setRecordingUri] = useState<string | null>('');
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [audioUri, setAudioUri] = useState<string | null>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [reference, setReference] = useState(false);
    const [refid, setrefid] = useState<string>('');
    const [aov, setaov] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isChooseMethodVisible, setIsChooseMethodVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const context = useContext(UploadContext);
    const [form, setForm] = useState({
        title: '',
        style: '',
        composer: '',
        instrument: ''
    });
    const [analysisCompleted, setAnalysisCompleted] = useState(false);
    const api = useApi();

    if (!context) {
        throw new Error('UploadMethod must be used within an UploadProvider');
    }
    const {title, refId, profileName} = context;
    const handleChoose = () => {
        setIsModalVisible(false);
        setIsChooseMethodVisible(true);
    };

    const handleSelectImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            Alert.alert("Image Selected", "An image has been selected.");
        } else {
            setImageUri(null);
        }
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
                    {text: "OK"}
                ]
            );
        }
    };

    const handleCheckAnalysis = async (analysisId: number, recordId: number) => {
        setIsChooseMethodVisible(false);
        setIsModalVisible(true);

        const checkResult = async () => {
            try {
                const reqParams: GetAnalysisResultReqParams = {analysisId: analysisId};
                const resp: GetAnalysisResultResp = await api.analysis.getAnalysisResult(reqParams);
                // console.log(resp.code)
                // console.log(resp.data.analysisRank);
                if (resp.code === 0 && resp.data.analysisRank === 0) {
                    setAnalysisCompleted(true);
                    setIsModalVisible(false);
                    navigation.navigate('Result', {
                        profileName: context.profileName,
                        recordId: recordId,
                        referenceId: context.refId
                    });
                    Alert.alert('Analysis completed successfully');
                } else {
                    setTimeout(checkResult, 1000);
                }
            } catch (error) {
                console.error('Error checking analysis:', error);
                setIsModalVisible(false);
                Alert.alert('Error', 'Failed to check analysis result.');
            }
        };

        checkResult();
    };

    const handleUpload = async () => {
        setLoading(true);
        try {
            if (aov == 'video' && videoUri) {
                const [analysisId, recordId] = await UploadVideo(api, videoUri, profileName, refId);

                await handleCheckAnalysis(analysisId, recordId);
            } else if (aov == 'audio' && audioUri) {
                try {
                    const [analysisId, recordId] = await UploadAudio(api, audioUri, context.profileName, context.refId);

                    await handleCheckAnalysis(analysisId, recordId);
                } catch (error) {
                    console.error('Upload failed:', error);
                    Alert.alert('Error', 'Failed to upload audio.');
                }
            } else {
                Alert.alert('No video to upload');
            }
        } finally {
            setLoading(false);
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
                    {text: "OK"}
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

    const handleImageUpload = async (refId: string) => {
        if (imageUri) {
            setLoading(true);
            try {
                const getUrlReq: GetRefImgUrlReq = {refId: refId};
                const getUrlResp: GetRefImgUrlResp = await api.reference.getRefImgUrl(getUrlReq);
                if (getUrlResp.code === 0) {
                    const imgFile = await fetch(imageUri);
                    const imgBlob = await imgFile.blob();
                    const response = await fetch(getUrlResp.data.presignedurl, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'image/png',
                        },
                        body: imgBlob,
                    });
                    if (response.ok) {
                        Alert.alert('Success', 'image uploaded successfully!');
                        const fileName = getUrlResp.data.fileName;
                        const imgUploadReq: UploadRefImgSuccessReq = {
                            refId: refId,
                            fileName: fileName,
                        };
                        const imgUploadResp: UploadRefImgSuccessResp = await api.reference.uploadRefImgSuccess(imgUploadReq);

                        if (imgUploadResp.code === 0) {
                            Alert.alert('Image uploaded successfully');
                        } else {
                            Alert.alert('Error', imgUploadResp.msg || 'Failed to upload image');
                        }
                    } else {
                        Alert.alert('Error', 'Failed to upload image.');
                    }
                } else {
                    Alert.alert('Error', getUrlResp.msg || 'Failed to get image URL');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                Alert.alert('Error', 'Failed to upload image.');
            } finally {
                setLoading(false);
            }
        } else {
            Alert.alert('No image selected');
        }
    };

    const handleRefUpload = async () => {
        let refId = '';
        setLoading(true);
        try {
            const reqParams: CreateReferenceReq = {
                style: form.style ? form.style : "Classic",
                instrument: form.instrument ? form.instrument : "piano",
                composer: form.composer ? form.composer : "anonymous",
                title: form.title ? form.title : "Untitled",
            };
            const resp: CreateReferenceResp = await api.reference.createReference(reqParams);
            if (resp.code === 0) {
                refId = resp.refId;
                setrefid(refId)
            } else {
                Alert.alert('Error', resp.msg || 'Failed to create reference');
            }

            if (imageUri) {
                await handleImageUpload(refId);
            }

            if (videoUri) {
                await UploadRefVideo(api, videoUri, profileName, refId, form.title, form.style, form.composer, form.instrument);
                Alert.alert('Video uploaded successfully');
            } else if (audioUri) {
                await UploadRefAudio(api, audioUri, profileName, refId, form.title, form.style, form.composer, form.instrument);
                Alert.alert('Audio uploaded successfully');
            } else {
                Alert.alert('No media selected to upload');
            }

        } catch (error) {
            console.error('Error create ref:', error);
        } finally {
            setLoading(false);
            navigation.navigate('Main', {profileName: context.profileName});
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
                {reference && (<TouchableOpacity onPress={handleSelectImage}>
                    <Image source={require('../../assets/icon/gallery.png')} style={styles.uploadButton}/>
                    <Text style={styles.buttonText}>Select Image</Text>
                </TouchableOpacity>)}

                <TouchableOpacity onPress={handleSelectVideo}>
                    <Image source={require('../../assets/icon/film-solid.png')}
                           style={styles.uploadRefVideoImg}
                    />
                    <Text style={styles.buttonText}>Select Video</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={reference ? handleRefUpload : handleUpload}>
                    <Image
                        source={videoUri || audioUri ? require('../../assets/img/logo/mygo1.png') : require('../../assets/icon/music-playlist.png')}
                        style={styles.uploadButton}
                    />
                    <Text style={styles.buttonText}>{reference ? "Upload Reference" : "Analysis"}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSelectAudeo}>
                    <Image source={require('../../assets/icon/music-playlist.png')}
                           style={styles.uploadButton}
                    />
                    <Text style={styles.buttonText}>Select Audio</Text>
                </TouchableOpacity>

            </View>
            {!reference && (
                <TouchableOpacity onPress={handleChoose} style={styles.recordSection}>
                    <Image source={require('../../assets/icon/music-circle.png')} style={styles.recordButton}/>
                    <Text style={styles.recordButtonText}>Record Now!</Text>
                </TouchableOpacity>
            )}

            {reference && (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="*Title"
                        value={form.title}
                        onChangeText={(text) => handleInputChange('title', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="*Style"
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

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                        <Image source={require('../../assets/img/logo/mygo1.png')} style={styles.modalLogo}/>
                        <Text style={styles.modalText}>Waiting for AI</Text>
                        <Text style={styles.modalText}>T^T</Text>
                    </View>
                </View>
            </Modal>

            <ChooseMethod visible={isChooseMethodVisible} onClose={() => setIsChooseMethodVisible(false)}
                          navigation={navigation} route={route}/>

        </View>
    );
};


export default UploadMethod;