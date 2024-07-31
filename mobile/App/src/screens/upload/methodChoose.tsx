import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Image, Alert, useAnimatedValue } from 'react-native';
import CustomButton from '../../components/MISC/Button';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { StackNavigationProp,createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../contexts/types';


interface ChooseMethodProps {
    visible: boolean;
    onClose: () => void;
    navigation: StackNavigationProp<RootStackParamList, 'UploadMethod'>;
    route: RouteProp<RootStackParamList, 'UploadMethod'>;
}

const ChooseMethod: React.FC<ChooseMethodProps> = ({ visible, onClose,navigation }) => {


    const handleRecording = async () => {
        navigation.navigate('CameraRecorder')
    };

    const handlePractice = async () => {
        navigation.navigate('Practice')
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    <CustomButton
                        text="Record Video"
                        onPress={handleRecording}
                        style={styles.button}
                    />
                    <CustomButton
                        text="Record Audio"
                        onPress={handlePractice}
                        style={styles.button}
                    />
                    <CustomButton
                        text="Cancel"
                        onPress={onClose}
                        style={styles.button}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: responsiveWidth(80),
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    logo: {
        width: responsiveWidth(40),
        height: responsiveHeight(10),
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: responsiveHeight(6),
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button: {
        marginVertical: responsiveHeight(1),
        width: responsiveWidth(40),
    },
});

export default ChooseMethod;