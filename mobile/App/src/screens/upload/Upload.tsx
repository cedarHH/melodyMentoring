import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, Dimensions,Image} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { RootStackParamList } from '../../../types';
import { styles } from './ui';
// import { SelectVideo, UploadVideo } from './mediaUtils'; 

type UploadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Upload'>;
type UploadScreenRouteProp = RouteProp<RootStackParamList, 'Upload'>;

type Props = {
    navigation: UploadScreenNavigationProp;
    route: UploadScreenRouteProp;
};


const UploadScreen: React.FC<Props> = ({ navigation,route }) => {
    const {title} = route.params;

    // const handleUpload = async () => {
    //     await UploadVideo(title);
    // };
    
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
            <TouchableOpacity style={styles.recordSection} >
                <Image source={require('../../assets/icon/music-circle.png')} style={styles.recordButton}/>
                <Text style={styles.recordButtonText}>Record Now!</Text>
            </TouchableOpacity>
            
        </View>
    );
};



export default UploadScreen;
