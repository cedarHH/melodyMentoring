import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import Sidebar from '../components/Homescreen/Sidebar';
import Content from '../components/Homescreen/Content';
import ContentContext from '../components/Homescreen/Context';

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
