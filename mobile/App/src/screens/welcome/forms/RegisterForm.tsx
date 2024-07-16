import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../../../components/MISC/Button';
import {responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";

interface SignUpFormProps {
    onSignUp: (email: string, username: string, password: string, confirmPassword: string) => void;
    onBack: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp, onBack }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = () => {
        onSignUp(email, username, password, confirmPassword);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <CustomButton
                text="Sign Up"
                onPress={handleSignUp}
                style={styles.button}
            />
            <CustomButton
                text="Back"
                onPress={onBack}
                style={styles.button}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
    },
    input: {
        width: '100%',
        height: '12%',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'white',
    },
    button: {
        marginVertical: responsiveHeight(5),
        width: responsiveWidth(25),
        height: '15%',
    },
});

export default SignUpForm;
