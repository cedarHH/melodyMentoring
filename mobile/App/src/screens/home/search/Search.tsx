import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import CustomButton from '../../../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../contexts/types';
import { useApi } from '../../../contexts/apiContext';
import { GetRefImgReq, GetRefImgResp, QueryReferenceReq, QueryReferenceResp } from '../../../contexts/apiParams/mediaComponents';
import { RouteProp } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;
type SearchRouteProp = RouteProp<RootStackParamList, 'Search'>;

type Props = {
    navigation: HomeScreenNavigationProp;
    route:SearchRouteProp;
};

interface Details {
    refId: string;
    title: string;
    style: string;
    composer: string;
    instrument: string;
}

interface Img {
    imguri: string;
}

interface Item extends Details, Img {}

const Search: React.FC<Props> = ({ navigation,route }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const api = useApi();
    const [musicData, setData] = useState<Item[]>([]);
    const [form, setForm] = useState({
        title: '',
        style: '',
        composer: '',
        instrument: ''
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window: { width } }) => {
            setScreenWidth(width);
        });
        return () => subscription.remove();
    }, []);

    const handleInputChange = (name: keyof QueryReferenceReq, value: string) => {
        setForm({ ...form, [name]: value });
    };

    const handleSearch = async () => {
        try {
            const reqParams: QueryReferenceReq = form;
            const resp: QueryReferenceResp = await api.reference.queryReference(reqParams);
            if (resp.code === 0) {
                const data = resp.data;
                const music = await Promise.all(data.map(async (item) => {
                    const imgReq: GetRefImgReq = { refId: item.refId };
                    const imgResp: GetRefImgResp = await api.reference.getRefImg(imgReq);
                    if (imgResp.code === 0) {
                        return { ...item, imguri: imgResp.presignedurl };
                    } else {
                        return { ...item, imguri: '' };
                    }
                }));
                setData(music)
            }
        } catch (error) {
            console.error('Error creating ref:', error);
        }
    };

    const onPressHandler = useCallback(({ item, index }: { item: typeof musicData[0], index: number }) => {
        if (selectedIndex === index) {
            navigation.navigate('Music', { title: item.title, refId: item.refId, image: item.imguri, profileName: route.params.profileName});
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
                <Image source={{uri:item.imguri}} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
        );
    }, [selectedIndex, onPressHandler]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Search</Text>
            <TextInput
                style={styles.input}
                placeholder="title"
                placeholderTextColor="#888"
                value={form.title}
                onChangeText={(text) => handleInputChange('title', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="style"
                placeholderTextColor="#888"
                value={form.style}
                onChangeText={(text) => handleInputChange('style', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="composer"
                placeholderTextColor="#888"
                value={form.composer}
                onChangeText={(text) => handleInputChange('composer', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="instrument"
                placeholderTextColor="#888"
                value={form.instrument}
                onChangeText={(text) => handleInputChange('instrument', text)}
            />
            <CustomButton onPress={handleSearch} text="search" />
            <View style={styles.searchResult}>
                <FlatList
                    data={musicData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.refId}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    style={styles.list}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
    },
    text: {
        color: 'white',
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 5,
        color: 'white',
        marginBottom: 20,
    },
    searchResult: {
        marginTop: 20,
        width: '80%',
        
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

export default Search;
