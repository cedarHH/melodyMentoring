import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type UploadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Upload'>;

type Props = {
    navigation: UploadScreenNavigationProp;
};

const UploadScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Upload Screen</Text>
            <Button
                title="upload"
                onPress={() => {}}
            />
            <Button
                title="record"
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

export default UploadScreen;
