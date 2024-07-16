import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import { RouteProp } from '@react-navigation/native';
import CustomButton from '../../components/MISC/Button';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
type MusicDetailRouteProp = RouteProp<RootStackParamList, 'Music'>;
type Props = {
    navigation: HomeScreenNavigationProp;
    route: MusicDetailRouteProp;
};

const MusicDetail: React.FC<Props> = ({ route, navigation }) => {
    const { title, image } = route.params;
    if (!title || !image) return null;

    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <CustomButton
                text="Practice"
                onPress={() => navigation.navigate('Upload')}
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