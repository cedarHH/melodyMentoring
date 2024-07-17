import React from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import Sidebar from './home/Sidebar';
import Content from './home/Content';
import ContentContext from './home/Context';

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
        width:Dimensions.get('window').width,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    }
});

export default UploadScreen;
