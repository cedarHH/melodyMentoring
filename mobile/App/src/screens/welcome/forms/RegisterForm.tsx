import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../../../components/MISC/Button';
import {responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import {useAppDispatch, showNotificationWithTimeout } from '../../../store';
import Notification from '../../../components/MISC/Notification';

interface SignUpFormProps {
    onSignUp: (email: string, username: string, password: string, confirmPassword: string) => void;
    onBack: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp, onBack }) => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        try {
            onSignUp(email, username, password, confirmPassword);
        } catch (error: any) {
            const errorMessage = error.message;
            dispatch(showNotificationWithTimeout(errorMessage));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#AAAAAA"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#AAAAAA"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#AAAAAA"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#AAAAAA"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
            </View>
            <Notification width="50%" />
            <View style={styles.buttonContainer}>
                <CustomButton
                    text="Sign Up"
                    onPress={handleSignUp}
                    style={styles.button_1}
                />
                <View style={{ width: responsiveWidth(2) }} />
                <CustomButton
                    text="Back"
                    onPress={onBack}
                    style={styles.button_2}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop: -responsiveHeight(15),
        width: '100%',
        padding: 20,
    },
    inputContainer: {
        display: 'flex',
    },
    input: {
        width: responsiveWidth(45),
        height: responsiveHeight(4.5),
        padding: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'white',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 0,
        justifyContent: "space-between",
    },
    button_1: {
        display: 'flex',
        width: responsiveWidth(20),
        height: responsiveHeight(4),
        padding: 0,
    },
    button_2: {
        display: 'flex',
        width: responsiveWidth(20),
        height: responsiveHeight(4),
        padding: 0,
        backgroundColor: '#666666',
    },
});

export default SignUpForm;