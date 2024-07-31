import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet,Text,FlatList,TouchableOpacity } from 'react-native';
import { StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamList } from '../../contexts/types';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import AddForm from './AddForm';
import { useApi } from '../../contexts/apiContext';
import { CreateSubUserResp } from '../../contexts/apiParams/usercenterComponents';

type SubUserNavigationProp = StackNavigationProp<RootStackParamList, 'SubUser'>;

type Props = {
    navigation: SubUserNavigationProp;
};

interface Item {
    profileName: string;
}

const SubUser: React.FC<Props> = ({ navigation }) => {
    const [data, setData] = useState<Item[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const api = useApi()
    const fetchData = async () => {
        try {
            const tokenStr = await AsyncStorage.getItem('Token');
            if (tokenStr) {
                const tokenData = JSON.parse(tokenStr);
                const idToken = tokenData.idToken;
                api.setIdToken(idToken)
                // const resp: CreateSubUserResp = await api.user.getSubUsers()
            
                const response = await axios.get('https://mygo.bar/api/user/getSubUsers', {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                });

                if (response.data.code === 0) {
                    setData(response.data.data);
                } else {
                    console.error('Error fetching data:', response.data.msg);
                }
            } else {
                console.error('No token found');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {

        }
    };

    useEffect(() => {
        fetchData().catch(console.error);
    }, []);

    const onPressHandler = useCallback(({ item, index }: { item: typeof data[0], index: number }) => {
        if (selectedIndex === index) {
            navigation.navigate('Configure', { profileName: item.profileName });
            console.log('user login:', item.profileName)
        } else {
            setSelectedIndex(index);
        }
    }, [selectedIndex, navigation]);

    const renderItem = useCallback(({ item, index }: { item: typeof data[0], index: number }) => {
        const isSelected = selectedIndex === index;

        return (
            <TouchableOpacity
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => onPressHandler({ item, index })}
                activeOpacity={0.7}
            >
                <Text>{item.profileName}</Text>
            </TouchableOpacity>
        );
    }, [selectedIndex, onPressHandler]);

    const handleAddUserPress = () => {
        setIsModalVisible(true);
        fetchData()
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        fetchData()
    };

    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.profileName}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    style={styles.list}
                />
            </View>
            <View style={styles.adduser}>
                <Icon name='add' size={40} color={'#05fdfd'} onPress={handleAddUserPress}/>
            </View>
            <AddForm visible={isModalVisible} onClose={handleCloseModal} />
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2d2d2d'
    },
    userContainer:{
        flexDirection:'row',
        flex:0.8,
        alignItems: 'center',
        height:'50%'
    },
    adduser: {
        flex:0.2,
    },

    listContent: {
        justifyContent:'center',
        alignItems: 'center',
        width:'100%'
    },
    list :{
        height:'100%',
    },

    card: {
        height:'50%',
        aspectRatio: 1,
        backgroundColor: '#05fdfd',
        borderRadius: 50,
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

});

export default SubUser;