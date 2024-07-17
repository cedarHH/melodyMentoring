import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';


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

export const UploadVideo = async (videoUri: string, title: string): Promise<void> => {
    const formData = new FormData();
    formData.append('video', {
        uri: videoUri,
        name: `${title}.mp4`,
        type: 'video/mp4',
    } as any);

    try {
        const response = await fetch('serverUrl', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const responseBody = await response.json();
        console.log('Upload successful:', responseBody);
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
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

export const UploadAudio = async (audioUri: string, title: string): Promise<void> => {
    const formData = new FormData();
    formData.append('audio', {
        uri: audioUri,
        name: `${title}.mp3`,
        type: 'audio/mp3', 
    } as any);

    try {
        const response = await fetch('serverUrl', {
            method: 'POST',
            body: formData,
            
            headers: {
            },
        });

        const responseBody = await response.json();
        console.log('Upload successful:', responseBody);
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
};
