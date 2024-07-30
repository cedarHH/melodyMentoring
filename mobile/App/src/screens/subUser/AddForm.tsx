import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Image, Alert, useAnimatedValue } from 'react-native';
import CustomButton from '../../components/MISC/Button';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApi } from '../../contexts/apiContext';
import { 
    CreateSubUserReq, 
    CreateSubUserResp
} from '../../contexts/apiParams/usercenterComponents';

const logo = require('../../assets/img/logo/mygo1.png');

interface AddFormProps {
    visible: boolean;
    onClose: () => void;
}

const AddForm: React.FC<AddFormProps> = ({ visible, onClose }) => {
    const [profileName, setProfileName] = useState('');
    const [pin, setPin] = useState('');
    const api = useApi();

    const handleCreate = async () => {
        try {
            const reqParams: CreateSubUserReq = {
                profileName: profileName,
                pin: pin
            }
            const resp = await api.user.createSubUser(reqParams)
            if(resp.code === 0) {
                Alert.alert('Success', 'Sub User created successfully');
                onClose();
            }

            // const tokenStr = await AsyncStorage.getItem('Token');
            // if (tokenStr) {
            //     const tokenData = JSON.parse(tokenStr);
            //     const response = await fetch('https://mygo.bar/api/user/createSubUser', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Authorization': `Bearer ${tokenData.idToken}`
            //         },
            //         body: JSON.stringify({
            //             profileName,
            //             pin
            //         })
            //     });

            //     const textResponse = await response.text(); // 捕获响应内容
            //     console.log('Response Text:', textResponse);

            //     if (response.ok) {
            //         Alert.alert('Success', 'Sub User created successfully');
            //         onClose();
            //     } else {
            //         const errorData = await response.json();
            //         Alert.alert('Error', errorData.message || 'Failed to create Sub User');
            //     }
            // } else {
            //     Alert.alert('Error', 'Token not found');
            // }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            Alert.alert('Error', errorMessage);
        }
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
                    <Image source={logo} style={styles.logo} />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={profileName}
                        onChangeText={setProfileName}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="PIN"
                        value={pin}
                        onChangeText={setPin}
                        keyboardType="numeric"
                        secureTextEntry
                    />
                    <CustomButton
                        text="Create"
                        onPress={handleCreate}
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

export default AddForm;