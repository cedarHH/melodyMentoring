import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type UploadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Upload'>;

type Props = {
    navigation: UploadScreenNavigationProp;
};

const Upload: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Upload Screen</Text>
            <CustomButton
                text="upload"
                onPress={() => {}}
            />
            <CustomButton
                text="record"
                onPress={() => {}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    }
});

export default Upload;
