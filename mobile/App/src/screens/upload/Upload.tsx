import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, Dimensions,Image} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { RootStackParamList } from '../../../types';


type UploadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Upload'>;
type UploadScreenRouteProp = RouteProp<RootStackParamList, 'Upload'>;

type Props = {
    navigation: UploadScreenNavigationProp;
    route: UploadScreenRouteProp;
};

const UploadScreen: React.FC<Props> = ({ navigation,route }) => {
    const { title} = route.params;

    const handleUpdateVideo = () => {
        console.log('Update Video');
        // Add your logic for updating video
    };

    const handleExtractAudio = () => {
        console.log('Extract Audio');
        // Add your logic for extracting audio from video
    };

    const handleUpdateAudio = () => {
        console.log('Update Audio');
        // Add your logic for updating audio
    };

    const handleRecord = () => {
        console.log('Record');
        // Add your logic for recording
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name='chevron-back-outline' size={30} color={'white'} onPress={navigation.goBack}/>
            </View>
            <View style={styles.uploadSection}>
                <TouchableOpacity>
                    <Image source={require('../../assets/icon/gallery.png')}
                        style={styles.uploadButton}
                        />
                    <Text style={styles.buttonText}>Update Video</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/icon/trans.png')}
                    style={styles.uploadButton}
                    />
                    <Text style={styles.buttonText}>Extract Audio From Video</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/icon/music-playlist.png')}
                        style={styles.uploadButton}
                    />
                    <Text style={styles.buttonText}>Update Audio</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.recordSection}>
                <Image source={require('../../assets/icon/music-circle.png')} style={styles.recordButton}/>
                <Text style={styles.recordButtonText}>Record Now!</Text>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:Dimensions.get('window').width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2d2d2d'
    },
    header: {
        width:Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.1,
    },
    uploadSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.25,
    },
    uploadButton: {
        height:'60%',
        aspectRatio:1,
        alignSelf:'center'
    },
    buttonText: {
        color: 'white',
        marginTop: 2,
    },
    recordSection: {
        
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.25,
        height: Dimensions.get('window').height * 0.5,
    },
    recordButton: {
        marginTop:'10%',
        height:'60%',
        aspectRatio:1
    },
    recordButtonText: {
        color: 'white',
        marginTop: 5,
        fontSize: 18,
    }
});

export default UploadScreen;
