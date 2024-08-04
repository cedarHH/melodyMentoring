import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity, Modal, TextInput, Image, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../contexts/types';
import Icon from 'react-native-vector-icons/Ionicons';
import AddForm from './AddForm';
import {useApi} from '../../contexts/apiContext';
import {VerifypinReq, VerifypinResp} from '../../contexts/apiParams/usercenterComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SubUserNavigationProp = StackNavigationProp<RootStackParamList, 'SubUser'>;

type Props = {
    navigation: SubUserNavigationProp;
};

interface Item {
    profileName: string;
}

const SubUser: React.FC<Props> = ({navigation}) => {
    const [data, setData] = useState<Item[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pinModalVisible, setPinModalVisible] = useState(false);
    const [pin, setPin] = useState<string>('');
    const [selectedProfileName, setSelectedProfileName] = useState<string>('');
    const [isFirstLogin, setIsFirstLogin] = useState<boolean | null>(null);
    const api = useApi();
    const logo = require('../../assets/img/logo/mygo1.png');

    const fetchData = async () => {
        try {
            const response = await api.user.getSubUsers();
            if (response.code === 0) {
                setData(response.data);
            } else {
                console.error('Error fetching data:', response.msg);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const checkFirstLogin = async (profileName: string) => {
        try {
            const storedValue = await AsyncStorage.getItem(`isFirstLogin_${profileName}`);
            if (storedValue === null) {
                await AsyncStorage.setItem(`isFirstLogin_${profileName}`, 'false');
                setIsFirstLogin(true);
            } else {
                setIsFirstLogin(storedValue === 'true');
            }
        } catch (error) {
            console.error('Error checking first login:', error);
        }
    };

    useEffect(() => {
        fetchData().catch(console.error);
    }, []);

    const onPressHandler = useCallback(({item, index}: { item: typeof data[0], index: number }) => {
        setSelectedProfileName(item.profileName);
        setSelectedIndex(index);
        setPinModalVisible(true);
    }, [selectedIndex]);

    const renderItem = useCallback(({item, index}: { item: typeof data[0], index: number }) => {
        const isSelected = selectedIndex === index;

        return (
            <TouchableOpacity
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => onPressHandler({item, index})}
                activeOpacity={0.7}
            >
                <Text>{item.profileName}</Text>
            </TouchableOpacity>
        );
    }, [selectedIndex, onPressHandler]);

    const handleAddUserPress = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        fetchData();
    };

    const handlePinSubmit = async () => {
        if (pin) {
            try {
                const reqParams: VerifypinReq = {profileName: selectedProfileName, pin: pin};
                const response: VerifypinResp = await api.user.verifyPin(reqParams);

                if (response.code === 0) {
                    await checkFirstLogin(selectedProfileName);
                    setPinModalVisible(false);

                    if (isFirstLogin !== null && isFirstLogin) {
                        navigation.navigate('Configure', {profileName: selectedProfileName});
                    } else {
                        navigation.navigate('Home', {profileName: selectedProfileName});
                    }
                } else {
                    Alert.alert('Error', 'Invalid PIN');
                }
            } catch (error) {
                Alert.alert('Error', 'Error verifying PIN');
            }
        } else {
            Alert.alert('Error', 'Please enter a PIN');
        }
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
            <AddForm visible={isModalVisible} onClose={handleCloseModal}/>

            {/* PIN Modal */}
            <Modal
                visible={pinModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setPinModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={logo} style={styles.logo}/>
                        <Text style={styles.modalTitle}>Enter PIN</Text>
                        <TextInput
                            style={styles.pinInput}
                            placeholder="PIN"
                            value={pin}
                            onChangeText={setPin}
                            secureTextEntry
                            keyboardType="numeric"
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setPinModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={handlePinSubmit}>
                                <Text style={styles.modalButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2d2d2d'
    },
    userContainer: {
        flexDirection: 'row',
        flex: 0.8,
        alignItems: 'center',
        height: '50%'
    },
    adduser: {
        flex: 0.2,
    },
    listContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    list: {
        height: '100%',
    },
    card: {
        height: '50%',
        aspectRatio: 1,
        backgroundColor: '#05fdfd',
        borderRadius: 50,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'white',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.8,
        elevation: 8,
    },
    cardSelected: {
        shadowColor: '#05fdfd',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.8,
        elevation: 12,
        transform: [{scale: 1.2}]
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '60%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    pinInput: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    modalButtonText: {
        fontSize: 16,
        color: '#007BFF',
    },
});

export default SubUser;
