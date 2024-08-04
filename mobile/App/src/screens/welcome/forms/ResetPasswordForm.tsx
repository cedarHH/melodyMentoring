import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../../../components/MISC/Button';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useAppDispatch, useAppSelector, sendResetCode, resetPassword } from '../../../store';
import { RootState, showNotification, hideNotification } from '../../../store';
import Notification from '../../../components/MISC/Notification';

interface ResetPasswordFormProps {
    onBack: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state: RootState) => state.auth.loading);
    const notification = useAppSelector((state: RootState) => state.notification.message);

    const handleReset = async () => {
        try {
            await dispatch(resetPassword(email, verificationCode, newPassword) as any);
            dispatch(showNotification("Password Reset Successful: You can now log in with your new password."));
        } catch (err: any) {
            console.error(err);
            dispatch(showNotification(err.message || 'Error resetting password'));
        }
    };

    const handleSendCode = async () => {
        try {
            await dispatch(sendResetCode(email) as any);
            dispatch(showNotification("Verification Code Sent: Please check your email for the verification code."));
        } catch (err: any) {
            dispatch(showNotification(err.message || 'Error sending verification code'));
        }
    };

    return (
        <View style={styles.container}>
            {notification && <Notification width="50%" />}
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
                <View style={styles.verificationContainer}>
                    <TextInput
                        style={styles.verificationInput}
                        placeholder="Verification Code"
                        placeholderTextColor="#AAAAAA"
                        value={verificationCode}
                        onChangeText={setVerificationCode}
                        keyboardType="number-pad"
                    />
                    <CustomButton
                        text="Send"
                        onPress={handleSendCode}
                        style={styles.sendButton}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    placeholderTextColor="#AAAAAA"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    text={loading ? "Resetting..." : "Reset"}
                    onPress={handleReset}
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
        marginTop: -responsiveHeight(40),
        width: '100%',
    },
    inputContainer: {
        display: 'flex',
    },
    input: {
        width: responsiveWidth(45),
        height: responsiveHeight(5),
        margin: 20,
        padding: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'white',
    },
    verificationContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        width: responsiveWidth(45),
        marginLeft: responsiveWidth(5.2),
        marginVertical: 5,
    },
    verificationInput: {
        width: responsiveWidth(45),
        height: responsiveHeight(5),
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'white',
    },
    sendButton: {
        marginLeft: 10,
        width: responsiveWidth(18),
        height: responsiveHeight(5),
        padding: 0,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: "row",
    },
    button_1: {
        width: responsiveWidth(20),
        height: responsiveHeight(5),
        padding: 0,
    },
    button_2: {
        width: responsiveWidth(20),
        height: responsiveHeight(5),
        padding: 0,
        backgroundColor: '#666666',
    },
});

export default ResetPasswordForm;
