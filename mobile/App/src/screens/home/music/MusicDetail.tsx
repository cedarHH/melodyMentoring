import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../contexts/types';
import { RouteProp } from '@react-navigation/native';
import CustomButton from '../../../components/MISC/Button';

type MusicDetailNavigationProp = StackNavigationProp<RootStackParamList, 'Music'>;
type MusicDetailRouteProp = RouteProp<RootStackParamList, 'Music'>;
type Props = {
    navigation: MusicDetailNavigationProp;
    route: MusicDetailRouteProp;
};

const MusicDetail: React.FC<Props> = ({ route, navigation }) => {
    const { title, refId, image, profileName } = route.params;
    if (!title || !image) return null;

    return (
        <View style={styles.container}>
            <Image source={{uri:image}} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <CustomButton
                text="Practice"
                onPress={() => navigation.navigate('Upload', { title, refId, profileName})}
            />            
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
    },
    image: {
        marginTop:'8%',
        width:'30%',
        height: '40%',
        borderRadius: 10,
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        textAlign: 'center',
    },
});

export default MusicDetail;