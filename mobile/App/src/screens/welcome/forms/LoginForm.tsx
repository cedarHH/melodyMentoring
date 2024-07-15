import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../../components/MISC/Button';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useAppDispatch, useAppSelector, RootState, setAuthMode, AuthMode } from '../../../store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../types';

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
        onLogin(email, password, navigation);
    };

    const handleForgotPassword = () => {
        dispatch(setAuthMode(AuthMode.RESET_PASSWORD));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <CustomButton
                text={loading ? "Logging in..." : "Login"}
                onPress={handleLogin}
                style={styles.button}
            />
            <CustomButton
                text="Back"
                onPress={onBack}
                style={styles.button}
            />
            <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
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
        height: '16%',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'white'
    },
    button: {
        marginVertical: responsiveHeight(5),
        width: responsiveWidth(25),
    },
    forgotPassword: {
        color: '#0000EE',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default LoginForm;
