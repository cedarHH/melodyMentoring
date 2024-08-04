import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image, Alert} from 'react-native';
import CustomButton from '../../components/MISC/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../contexts/types';
import {responsiveHeight, responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions';
import {RouteProp} from '@react-navigation/native';
import {useAppDispatch, setFirstLogin} from '../../store';
import {useApi} from '../../contexts/apiContext';
import * as ImagePicker from 'expo-image-picker';
import {
    GetAvatarUploadUrlReqParams,
    UpdateAvatarSuccessReq,
    UpdateAvatarSuccessResp, UpdateSubUserAttrReq,
} from '../../contexts/apiParams/usercenterComponents';

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Configure'>;
type ConfigureScreenRouteProp = RouteProp<RootStackParamList, 'Configure'>;

type Props = {
    navigation: UserScreenNavigationProp;
    route: ConfigureScreenRouteProp;
};

const Configure: React.FC<Props> = ({navigation, route}) => {
    const dispatch = useAppDispatch();
    const {profileName} = route.params;
    const api = useApi();

    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [gender, setGender] = useState('');
    const [level, setLevel] = useState('');
    const [instrument, setInstrument] = useState('');
    const [dob, setDob] = useState('');

    const handleCompleteSetup = async() => {
        try {
            const params: UpdateSubUserAttrReq = {
                profileName: profileName,
                gender: gender,
                dob: dob,
                level: level,
                instrument: instrument
            };
            const updateResp = await api.user.updateSubUserAttr(params);

            if (updateResp.code === 0) {
                console.log('Update SubUser Attributes Success');
            } else {
                Alert.alert('Error', 'Failed to update user attributes');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            Alert.alert('Error', errorMessage);
        }

        dispatch(setFirstLogin(false));
        navigation.replace('Home', {profileName});
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
            const params: GetAvatarUploadUrlReqParams = {profileName: profileName};
            const uploadUrlResp = await api.user.getAvatarUploadUrl(params);

            if (uploadUrlResp.code === 0) {
                const response = await fetch(uploadUrlResp.data.presignedurl, {
                    method: 'PUT',
                    body: await fetch(uri).then(res => res.blob()),
                });

                if (response.ok) {
                    const updateReq: UpdateAvatarSuccessReq = {
                        profileName: profileName,
                        fileName: uploadUrlResp.data.fileName,
                    };
                    const updateResp: UpdateAvatarSuccessResp = await api.user.updateAvatarSuccess(updateReq);

                    if (updateResp.code === 0) {
                        console.log("Update Avatar Success");
                        // const getAvatarReq: GetAvatarReqParams = {
                        //     profileName: profileName
                        // }
                        // const resp1 = await api.user.getAvatar(getAvatarReq)
                        // console.log(`${resp1.presignedurl}`);
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
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            Alert.alert('Error', errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Add your configuration file</Text>
            </View>
            <View style={styles.configContainer}>
                <View style={styles.leftBox}>
                    <Image
                        style={styles.avatar}
                        source={avatarUri ? {uri: avatarUri} : require('../../assets/img/logo/mygo1.png')}
                    />
                    <CustomButton text="Upload Avatar" onPress={pickImage} style={styles.button}/>
                </View>
                <View style={styles.rightBox}>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your gender"
                            value={gender}
                            onChangeText={setGender}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your level"
                            value={level}
                            onChangeText={setLevel}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your prefer instrument"
                            value={instrument}
                            onChangeText={setInstrument}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your date of birth"
                            value={dob}
                            onChangeText={setDob}
                        />
                    </View>
                </View>
            </View>
            <CustomButton
                text="Complete Setup"
                onPress={handleCompleteSetup}
                style={styles.button}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B1C1E',
    },
    header: {
        marginBottom: responsiveHeight(2),
    },
    headerText: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        color: 'white',
    },
    configContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: responsiveHeight(2),
    },
    leftBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
    },
    avatar: {
        width: responsiveWidth(20),
        height: responsiveWidth(20),
        borderRadius: responsiveWidth(10),
        backgroundColor: '#ccc',
    },
    rightBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
    },
    inputBox: {
        width: '50%',
        marginBottom: responsiveHeight(2),
    },
    input: {
        width: '100%',
        padding: responsiveHeight(1),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        marginVertical: responsiveHeight(1),
    },
});

export default Configure;
