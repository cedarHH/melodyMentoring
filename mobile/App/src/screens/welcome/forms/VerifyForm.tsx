// VerifyForm.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../../../components/MISC/Button';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

interface VerifyFormProps {
    onVerify: (email: string, verificationCode: string) => void;
    email: string;
    onBack: () => void;
}

const VerifyForm: React.FC<VerifyFormProps> = ({ onVerify, email, onBack }) => {
    const [verificationCode, setVerificationCode] = useState('');

    const handleVerify = () => {
        onVerify(email, verificationCode);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Verification Code"
                placeholderTextColor={'white'}
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
            />
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
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
    },
    input: {
        width: '100%',
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
    },
});

export default VerifyForm;