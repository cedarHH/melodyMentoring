import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, Dimensions,Image,Alert} from 'react-native';
import { StackNavigationProp,createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../contexts/types';
import UploadMethod from './UploadMethod';
import Practice from './Practice';
import CameraRecorder from './CameraRecorder';
import { UploadProvider } from './UploadContext';

const UploadStack = createStackNavigator<RootStackParamList>();
type UploadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Upload'>;
type UploadScreenRouteProp = RouteProp<RootStackParamList, 'Upload'>;

type Props = {
    navigation: UploadScreenNavigationProp;
    route: UploadScreenRouteProp;
};


const UploadScreen: React.FC<Props> = ({ navigation,route }) => {
    const {title, refId, profileName }= route.params
    return (
        <View style={styles.container}>
            <UploadProvider title={title} refId={refId} profileName={profileName} >
                <UploadStack.Navigator initialRouteName='UploadMethod'
                    screenOptions={{
                        headerShown: false, 
                        headerTintColor:'white',
                        headerStyle: {
                            height: 0,
                        },
                        cardStyle: { backgroundColor: '#2d2d2d' },
                        }} >
                    <UploadStack.Screen name="UploadMethod" component={UploadMethod}/>
                    <UploadStack.Screen name="CameraRecorder" component={CameraRecorder}/>
                    <UploadStack.Screen name="Practice" component={Practice}/>
                </UploadStack.Navigator>
            </UploadProvider>

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height:'100%',
        flex: 1,
    },
});

export default UploadScreen;