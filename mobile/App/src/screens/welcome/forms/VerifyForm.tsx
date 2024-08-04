// VerifyForm.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../../../components/MISC/Button';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Notification from '../../../components/MISC/Notification';
import { useAppDispatch, useAppSelector, RootState, showNotificationWithTimeout, hideNotification } from '../../../store';

interface VerifyFormProps {
    onVerify: (email: string, verificationCode: string) => void;
    email: string;
    onBack: () => void;
}

const VerifyForm: React.FC<VerifyFormProps> = ({ onVerify, email, onBack }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const dispatch = useAppDispatch();

    const handleVerify = () => {
        if (!verificationCode) {
            dispatch(showNotificationWithTimeout("Verification code is required"));
            return;
        }
        onVerify(email, verificationCode);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Verification Code"
                    placeholderTextColor={'white'}
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                    keyboardType="number-pad"
                />
            </View>

            <Notification width="50%" />

            <View style={styles.buttonContainer}>
                <CustomButton
                    text="Verify Code"
                    onPress={handleVerify}
                    style={styles.button}
                />
                <CustomButton
                    text="Back"
                    onPress={onBack}
                    style={styles.button}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        marginTop: responsiveHeight(-40),
    },
    inputContainer: {
        display: 'flex',
        marginBottom: responsiveHeight(1),
    },
    input: {
        width: responsiveWidth(45),
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'white',
    },
    buttonContainer: {
        display: 'flex',
    },
    button: {
        marginVertical: responsiveHeight(5),
        width: responsiveWidth(45),
        height: responsiveHeight(6),
    },
});

export default VerifyForm;