import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import CustomButton from '../../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../contexts/types';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppDispatch, userLogout } from '../../store';
import { RouteProp } from '@react-navigation/native';
import { useApi } from '../../contexts/apiContext';
import * as ImagePicker from 'expo-image-picker';

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'User'>;
type UserRoute = RouteProp<RootStackParamList, 'User'>;

type Props = {
    navigation: UserScreenNavigationProp;
    route: UserRoute;
};

const User: React.FC<Props> = ({ navigation, route }) => {
    const { profileName } = route.params;
    const [avatarUri, setAvatarUri] = useState<string | undefined>(undefined);
    const [editingField, setEditingField] = useState<string | null>(null);
    const [newValue, setNewValue] = useState<string>('');
    const [userData, setUserData] = useState<{
        level?: string;
        gender?: string;
        birthday?: string;
        instrument?: string;
    }>({});
    const dispatch = useAppDispatch();
    const api = useApi();

    useEffect(() => {
        handleAvatar();
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await api.user.getSubUserByName({ profileName });
            if (response.code === 0) {
                setUserData(response.data);
            } else {
                Alert.alert('Error', 'Failed to fetch user data');
            }
        } catch (error) {
            Alert.alert('Error', error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const handleAvatar = async () => {
        try {
            const reqParams = { profileName };
            const resp = await api.user.getAvatar(reqParams);
            if (resp.code === 0) {
                setAvatarUri(resp.presignedurl);
            }
        } catch (error) {
            Alert.alert('Error', error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const handleLogout = async () => {
        dispatch(userLogout(() => navigation.navigate('Welcome')));
    };

    const handleFieldEdit = (field: string) => {
        setEditingField(field);
        setNewValue(userData[field as keyof typeof userData] || '');
    };

    const handleSave = async () => {
        try {
            const updateParams = { profileName, [editingField!]: newValue };
            const updateResp = await api.user.updateSubUserAttr(updateParams);
            if (updateResp.code === 0) {
                fetchUserData();
            } else {
                Alert.alert('Error', 'Failed to update attribute');
            }
        } catch (error) {
            Alert.alert('Error', error instanceof Error ? error.message : 'An error occurred');
        }
        setEditingField(null);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setAvatarUri(uri);
            await handleUploadAvatar(uri);
        }
    };

    const handleUploadAvatar = async (uri: string) => {
        try {
            const params = { profileName };
            const uploadUrlResp = await api.user.getAvatarUploadUrl(params);

            if (uploadUrlResp.code === 0) {
                const response = await fetch(uploadUrlResp.data.presignedurl, {
                    method: 'PUT',
                    body: await fetch(uri).then(res => res.blob()),
                });

                if (response.ok) {
                    const updateReq = { profileName, fileName: uploadUrlResp.data.fileName };
                    const updateResp = await api.user.updateAvatarSuccess(updateReq);

                    if (updateResp.code === 0) {
                    } else {
                        Alert.alert('Error', 'Failed to update avatar');
                    }
                } else {
                    Alert.alert('Error', 'Failed to upload avatar');
                }
            } else {
                Alert.alert('Error', 'Failed to get upload URL');
            }
        } catch (error) {
            Alert.alert('Error', error instanceof Error ? error.message : 'An error occurred');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topSection}>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
                </TouchableOpacity>
                <View style={styles.infoItemContainer}>
                    <TouchableOpacity onPress={() => handleFieldEdit('profileName')}>
                        <Text style={styles.nameText}>
                            {`${profileName}`}
                        </Text>
                    </TouchableOpacity>
                    {editingField === 'profileName' && (
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new profile name"
                            value={newValue}
                            onChangeText={setNewValue}
                        />
                    )}
                </View>
                <View style={styles.infoItemContainer}>
                    <TouchableOpacity onPress={() => handleFieldEdit('level')}>
                        <Text style={styles.levelText}>
                            {`Level: ${userData.level || ''}`}
                        </Text>
                    </TouchableOpacity>
                    {editingField === 'level' && (
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new level"
                            value={newValue}
                            onChangeText={setNewValue}
                        />
                    )}
                </View>
            </View>
            <View style={styles.infoSection}>
                {['gender', 'dob', 'instrument', 'badges', 'consecutivedays'].map((field) => (
                    <View style={styles.infoItemContainer} key={field}>
                        <View style={styles.infoItemLeft}>
                            <TouchableOpacity onPress={() => handleFieldEdit(field)}>
                                <Text style={styles.infoItem}>
                                    {`${field.charAt(0).toUpperCase() + field.slice(1)}: ${userData[field as keyof typeof userData] || ''}`}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {editingField === field && (
                            <View style={styles.infoItemRight}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={`Enter new ${field}`}
                                    value={newValue}
                                    onChangeText={setNewValue}
                                />
                            </View>
                        )}
                    </View>
                ))}
                {editingField && (
                    <View style={styles.editActionSection}>
                        <CustomButton text="Cancel" onPress={() => setEditingField(null)} style={styles.editButton} />
                        <CustomButton text="Save" onPress={handleSave} style={styles.editButton} />
                    </View>
                )}
            </View>
            <View style={styles.bottomSection}>
                <CustomButton
                    text="Go Home"
                    onPress={() => navigation.navigate('Home', { profileName })}
                    textStyle={styles.bottomButtonText}
                    style={styles.bottomButton}
                />
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Icon name={'log-out'} size={40} color={'blue'} style={styles.logoutIcon} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1C1E',
    },
    topSection: {
        alignItems: 'center',
        padding: responsiveHeight(2),
        backgroundColor: '#1B1C1E',
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    avatarImage: {
        width: responsiveWidth(15),
        aspectRatio: 1,
        borderRadius: 50,
        marginBottom: responsiveHeight(2),
    },
    nameText: {
        fontSize: responsiveFontSize(4),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(1),
        color: '#FFFFFF',
    },
    levelText: {
        fontSize: responsiveFontSize(2.5),
        color: '#AAAAAA',
        marginBottom: responsiveHeight(1),
    },
    infoSection: {
        padding: responsiveHeight(2),
        backgroundColor: '#1B1C1E',
        marginVertical: responsiveHeight(1),
    },
    infoItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: responsiveHeight(1),
    },
    infoItemLeft: {
        flex: 1,
    },
    infoItemRight: {
        flex: 1,
        marginLeft: responsiveWidth(2),
    },
    infoItem: {
        fontSize: 16,
        color: '#DDDDDD',
    },
    input: {
        padding: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        height: responsiveHeight(6),
    },
    editActionSection: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: responsiveHeight(2),
    },
    editButton: {
        alignItems: "center",
        margin: responsiveWidth(1),
        width: responsiveWidth(15),
        height: responsiveWidth(6),
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: responsiveHeight(2),
    },
    bottomButton: {
        alignItems: 'center',
        padding: 0,
        width: responsiveWidth(15),
        height: responsiveHeight(8),
    },
    bottomButtonText: {
        fontSize: responsiveFontSize(1.3),
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutIcon: {
        marginRight: responsiveWidth(2),
    },
    logoutText: {
        fontSize: responsiveFontSize(1.6),
        color: '#DDDDDD',
    },
});

export default User;
