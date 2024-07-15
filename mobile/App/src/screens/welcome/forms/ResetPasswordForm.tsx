import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../../../components/MISC/Button';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useAppDispatch, useAppSelector, sendResetCode, resetPassword } from '../../../store';
import { RootState, showNotification } from '../../../store';
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

    const handleReset = async () => {
        try {
            await dispatch(resetPassword(email, verificationCode, newPassword) as any);
            dispatch(showNotification("Password Reset Successful: You can now log in with your new password."));
        } catch (err: any) {
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
        <View style={styles.authContainer}>
            <Notification width="100%" />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <View style={styles.verificationContainer}>
                <TextInput
                    style={styles.verificationInput}
                    placeholder="Verification Code"
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
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
            />
            <CustomButton
                text={loading ? "Resetting..." : "Reset Password"}
                onPress={handleReset}
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
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        height: '15%',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'white',
    },
    verificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 5,
    },
    verificationInput: {
        flex: 1,
        height: '40%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'white',
    },
    sendButton: {
        marginLeft: 10,
        width: '30%',
        height: '50%',
    },
    button: {
        marginVertical: responsiveHeight(5),
        width: responsiveWidth(25),
    },
});

export default ResetPasswordForm;
