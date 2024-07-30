import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../../components/MISC/Button';
import { responsiveHeight, responsiveWidth, responsiveFontSize,  } from 'react-native-responsive-dimensions';
import { useAppDispatch, useAppSelector, RootState, setAuthMode, AuthMode, showNotificationWithTimeout } from '../../../store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../contexts/types';
import Notification from '../../../components/MISC/Notification';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface LoginFormProps {
    onBack: () => void;
    onLogin: (email: string, password: string, navigation: LoginScreenNavigationProp) => void;
    navigation: LoginScreenNavigationProp;
}

const LoginForm: React.FC<LoginFormProps> = ({ onBack, onLogin, navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state: RootState) => state.auth.loading);

    const handleLogin = () => {
        if (!email || !password) {
            dispatch(showNotificationWithTimeout("Email and Password are required"));
            return;
        }
        onLogin(email, password, navigation);
    };

    const handleForgotPassword = () => {
        dispatch(setAuthMode(AuthMode.RESET_PASSWORD));
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#AAAAAA"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#AAAAAA"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <Notification width="60%" />

            <View style={styles.forgetContainer}>
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton
                    text={loading ? "Logging in..." : "Login"}
                    onPress={handleLogin}
                    style={styles.button_1}
                />
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
        marginTop: - responsiveHeight(30),
        width: '100%',
        padding: 20,
    },

    inputContainer: {
        display: 'flex',
        marginBottom: - responsiveHeight(1),
    },
    input: {
        width: responsiveWidth(45),
        height: responsiveHeight(6),
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'white'
    },

    forgetContainer: {
        marginBottom: responsiveHeight(1),
    },
    forgotPassword: {
        color: '#DDDDDD',
        marginTop: 10,
        textAlign: 'center',
    },

    buttonContainer: {
        display: 'flex',
    },
    button_1: {
        width: responsiveWidth(45),
        height: responsiveHeight(5),
        padding: 0,
    },
    button_2: {
        width: responsiveWidth(45),
        height:responsiveHeight(5),
        padding: 0,
        backgroundColor: '#666666',
    },

});

export default LoginForm;