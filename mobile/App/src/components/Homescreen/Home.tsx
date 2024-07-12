import React, { useState }from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Dimensions} from 'react-native';
import CustomButton from '../../components/MISC/Button';
import { Video,ResizeMode } from 'expo-av';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};



const Home: React.FC<Props> = ({ navigation }) => {
    const [paused, setPaused] = useState(true);
    const videoRef = React.useRef<Video>(null);

    const togglePlayback = () => {
        if (videoRef.current) {
        if (paused) {
            videoRef.current.playAsync();
        } else {
            videoRef.current.pauseAsync();
        }
        setPaused(!paused);
        }
    };
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <CustomButton
                text="Upload and Record"
                onPress={() => navigation.navigate('Upload')}
            />
            <TouchableOpacity onPress={togglePlayback} style={styles.videoContainer}>
                <Video
                    ref={videoRef}
                    source={require('../../assets/audio/op.mp4') }
                    style={styles.video}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={!paused}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoContainer: {
        marginTop: 20,
        width: Dimensions.get('window').width/2,
        aspectRatio: 16 / 9,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      },
      video: {
        width: '100%',
        height: '100%',
      },
});

export default Home;