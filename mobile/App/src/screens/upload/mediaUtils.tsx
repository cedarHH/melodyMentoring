import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';


const [videoUri, setVideoUri] = useState<string | null>(null);
export const SelectVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        quality: 1,
    });4

    if (!result.canceled) {
        setVideoUri(result.assets[0].uri);
        console.log('Video selected:', result.assets[0].uri);
    }
};

export const UploadVideo= async (title:string) => {
    
    if (videoUri) {
        const formData = new FormData();
        formData.append('video', {
            uri: videoUri,
            name: title + '.mp4',
            type: 'video/mp4'
        } as any);

        try {
            const response = await fetch('SERVER', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'title',
                },
            });

            const responseBody = await response.json();
            console.log('Upload successful:', responseBody);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    } else {
        console.log('No video to upload');
    }
};