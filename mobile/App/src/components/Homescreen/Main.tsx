import React, { useState }from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image} from 'react-native';
import CustomButton from '../MISC/Button';
import { Video,ResizeMode } from 'expo-av';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import Icon from 'react-native-vector-icons/Ionicons';
import musicData from '../../data/MusicData';
import MusicDetail from './MusicDetail';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};


const Main: React.FC<Props> = ({ navigation }) => {

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    

    const renderItem = ({ item, index }: { item: typeof musicData[0], index: number }) => {
        const isSelected = selectedIndex === index;
        
        return (
            <TouchableOpacity
                style={[styles.card,
                isSelected && styles.cardSelected]}
                onPress={() => setSelectedIndex(isSelected ? null : index)}
                activeOpacity={0.7}
            >
                <Image source={item.image} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        
        <View style={styles.container}>
            <Text>Main Screen</Text>
            <FlatList
                data={musicData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
            <CustomButton
                text="Upload and Record"
                onPress={() => navigation.navigate('Upload')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: Dimensions.get('window').width * 0.2,
        aspectRatio: 3 / 4,
        backgroundColor: '#1a1a1a',
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        elevation: 8,
    },
    cardSelected: {
        shadowColor: '#05fdfd',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        elevation: 12,
        transform: [{ scale: 1.2 }]
      },
    cardImage: {
        width: '100%',
        height: '80%',
        borderRadius: 10,
    },
    cardTitle: {
        marginTop: 5,
        color: '#fff',
        fontSize: 16,
    },
});

export default Main;