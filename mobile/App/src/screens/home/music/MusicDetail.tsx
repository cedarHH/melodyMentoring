import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../contexts/types';
import { RouteProp } from '@react-navigation/native';
import CustomButton from '../../../components/MISC/Button';
import { Video , ResizeMode} from 'expo-av';
import { GetRefVideoReq, GetRefVideoResp, QueryReferenceReq, QueryReferenceResp } from 'src/contexts/apiParams/mediaComponents';
import { useApi } from '../../../contexts/apiContext';


type MusicDetailNavigationProp = StackNavigationProp<RootStackParamList, 'Music'>;
type MusicDetailRouteProp = RouteProp<RootStackParamList, 'Music'>;
type Props = {
    navigation: MusicDetailNavigationProp;
    route: MusicDetailRouteProp;
};

const MusicDetail: React.FC<Props> = ({ route, navigation }) => {
    const { title, refId, image, profileName } = route.params;
    const [videourl, setvideo] = useState('');
    if (!title || !image) return null;
    const api = useApi();

    const fetchVideo = async () => {
        const reqParams: GetRefVideoReq = {
            refId: refId,
        }
        const resp: GetRefVideoResp = await api.reference.getRefVideo(reqParams)
        if (resp.code ===0){
            setvideo(resp.presignedurl)
        }
    }

    useEffect(()=> {
        fetchVideo()
    }, [])

    return (
        <View style={styles.container}>
            {/* <Image source={{uri:image}} style={styles.image} /> */}
            <Video
                source={{ uri: videourl }}
                style={styles.video}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN} 
                isLooping
            />
            <Text style={styles.title}>{title}</Text>
            <CustomButton
                text="Practice"
                onPress={() => navigation.navigate('Upload', { title, refId, profileName})}
            />            
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
    },
    image: {
        marginTop:'8%',
        width:'30%',
        height: '40%',
        borderRadius: 10,
    },
    video: {
        marginTop:'5%',
        width:'50%',
        height: '50%',
        borderRadius: 10,
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        textAlign: 'center',
    },
});

export default MusicDetail;