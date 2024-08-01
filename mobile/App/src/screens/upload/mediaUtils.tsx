import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { CreateRecordReq, CreateRecordResp, CreateReferenceReq, CreateReferenceResp, GetAudioUrlReq, GetAudioUrlResp, GetRefAudioUrlReq, GetRefAudioUrlResp, GetRefVideoUrlReq, GetRefVideoUrlResp, GetVideoUrlReq, GetVideoUrlResp } from '../../contexts/apiParams/mediaComponents';
import { useApi } from '../../contexts/apiContext';
import { Alert } from 'react-native';
import { useState } from 'react';


export const SelectVideo = async (): Promise<string | null> => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        quality: 1,
    });

    if (!result.canceled) {
        console.log('Video selected:', result);
        return result.assets[0].uri;
    } else {
        return null;
    }
};

export const UploadVideo = async (videoUri: string, profileName: string, refId:string): Promise<void> => {
    const api = useApi();
    try {
        const reqRecord: CreateRecordReq = {
            profileName: profileName,
            reference: refId
        }
        const respRecord: CreateRecordResp = await api.record.createRecord(reqRecord)

        if(respRecord.code === 0) {
            const id = respRecord.recordId;
            const reqUri: GetVideoUrlReq = {
                profileName: profileName,
	            recordId: id
            }
            const respUri: GetVideoUrlResp = await api.record.getVideoUrl(reqUri);
            if (respUri.code === 0) {
                const videoFile = await fetch(videoUri);
                const videoBlob = await videoFile.blob();
                const response = await fetch(respUri.data.presignedurl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'video/mp4',
                    },
                    body: videoBlob,
                });
                if (response.ok) {
                    Alert.alert('Success', 'Video uploaded successfully!');
                } else {
                    Alert.alert('Error', 'Failed to upload video.');
                }
            }
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        Alert.alert('Error', errorMessage);
    }
};

export const SelectAudio = async (): Promise<string | null> => {
    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'audio/*',
        });
        
        if (!result.canceled) {
            console.log('Audio selected:', result);
            return result.assets[0].uri;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error selecting audio:', error);
        return null;
    }
};

export const UploadAudio = async (audioUri: string, profileName: string, refId:string): Promise<void> => {
    const api = useApi();
    try {
        const reqRecord: CreateRecordReq = {
            profileName: profileName,
            reference: refId
        }
        const respRecord: CreateRecordResp = await api.record.createRecord(reqRecord)

        if(respRecord.code === 0) {
            const id = respRecord.recordId;
            const reqUri: GetAudioUrlReq = {
                profileName: profileName,
	            recordId: id
            }
            const respUri: GetAudioUrlResp = await api.record.getAudioUrl(reqUri);
            if (respUri.code === 0) {
                const audioFile = await fetch(audioUri);
                const audioBlob = await audioFile.blob();
                const response = await fetch(respUri.data.presignedurl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'audio/mp3',
                    },
                    body: audioBlob,
                });
                if (response.ok) {
                    Alert.alert('Success', 'audio uploaded successfully!');
                } else {
                    Alert.alert('Error', 'Failed to upload audio.');
                }
            }
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        Alert.alert('Error', errorMessage);
    }
};

export const UploadRefVideo = async (videoUri: string, profileName: string, recId: string, title: string, style: string, composer: string, instrument: string): Promise<void> => {
    const api = useApi();
    try {
        const reqRef: CreateReferenceReq = {
            title: title,
            style: style,
            composer: composer,
            instrument: instrument,
        }
        const respRef: CreateReferenceResp = await api.reference.createReference(reqRef)

        if(respRef.code === 0) {
            const id = respRef.refId;
            const reqUri: GetRefVideoUrlReq = {
	            refId: id
            }
            const respUri: GetRefVideoUrlResp = await api.reference.getRefVideoUrl(reqUri);
            if (respUri.code === 0) {
                const videoFile = await fetch(videoUri);
                const videoBlob = await videoFile.blob();
                const response = await fetch(respUri.data.presignedurl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'video/mp4',
                    },
                    body: videoBlob,
                });
                if (response.ok) {
                    Alert.alert('Success', 'Video uploaded successfully!');
                } else {
                    Alert.alert('Error', 'Failed to upload video.');
                }
            }
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        Alert.alert('Error', errorMessage);
    }
};

export const UploadRefAudio = async (audioUri: string, profileName: string, recId: string, title: string, style: string, composer: string, instrument: string): Promise<void> => {
    const api = useApi();
    try {
        const reqRef: CreateReferenceReq = {
            title: title,
            style: style,
            composer: composer,
            instrument: instrument,
        }
        const respRef: CreateReferenceResp = await api.reference.createReference(reqRef)

        if(respRef.code === 0) {
            const id = respRef.refId;
            const reqUri: GetRefAudioUrlReq = {
	            refId: id
            }
            const respUri: GetRefAudioUrlResp = await api.reference.getRefAudioUrl(reqUri);
            if (respUri.code === 0) {
                const audioFile = await fetch(audioUri);
                const audioBlob = await audioFile.blob();
                const response = await fetch(respUri.data.presignedurl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'audio/mp3',
                    },
                    body: audioBlob,
                });
                if (response.ok) {
                    Alert.alert('Success', 'audio uploaded successfully!');
                } else {
                    Alert.alert('Error', 'Failed to upload audio.');
                }
            }
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        Alert.alert('Error', errorMessage);
    }
};