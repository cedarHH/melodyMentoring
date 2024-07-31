import React, { useState,useCallback,useEffect }from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image} from 'react-native';
import CustomButton from '../../../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../contexts/types';
import musicData from '../../../data/MusicData';
import { RouteProp } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
type MainRouteProp = RouteProp<RootStackParamList, 'Main'>;
type Props = {
    navigation: HomeScreenNavigationProp;
    route:MainRouteProp;
};



const Main: React.FC<Props> = ({ navigation,route }) => {
    const name = route.params.profileName
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window: { width } }) => {
            setScreenWidth(width);
        });
        return () => subscription.remove();
    }, []);

    const onPressHandler = useCallback(({ item, index }: { item: typeof musicData[0], index: number }) => {
        if (selectedIndex === index) {
            navigation.navigate('Music', { title: item.title, image: item.image, profileName: name});
        } else {
            setSelectedIndex(index);
        }
    }, [selectedIndex, navigation]);

    const renderItem = useCallback(({ item, index }: { item: typeof musicData[0], index: number }) => {
        const isSelected = selectedIndex === index;

        return (
            <TouchableOpacity
                style={[styles.card, isSelected && styles.cardSelected,{ width: screenWidth * 0.2 }]}
                onPress={() => onPressHandler({ item, index })}
                activeOpacity={0.7}
            >
                <Image source={item.image} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
        );
    }, [selectedIndex, onPressHandler]);

    return (

        <View style={styles.container}>
            <FlatList
                data={musicData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                style={styles.list}
            />
            <CustomButton
                text="Upload Reference"
                onPress={() => navigation.navigate('Upload',{title:'default'})}
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
    list:{
        width: '100%',
    },
    card: {
        aspectRatio: 3 / 4,
        backgroundColor: '#1a1a1a',
        borderRadius: 10,
        marginHorizontal: 15,
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