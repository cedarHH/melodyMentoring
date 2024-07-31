import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity,Image } from 'react-native';
import CustomButton from '../../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../contexts/types';
import { responsiveHeight } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppDispatch, userLogout  } from '../../store';
import { RouteProp } from '@react-navigation/native';
import { GetAvatarReqParams, GetAvatarResp } from '../../contexts/apiParams/usercenterComponents';
import { useApi } from '../../contexts/apiContext';

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'User'>;
type UserRoute = RouteProp<RootStackParamList, 'User'>;

type Props = {
    navigation: UserScreenNavigationProp;
    route: UserRoute
};

const User: React.FC<Props> = ({ navigation,route }) => {
    
    const name = route.params.profileName
    const [avatarUri, setAvatarUri] = useState<string | undefined>(undefined);
    console.log(name)
    const dispatch = useAppDispatch();
    const api = useApi();
    
    const handleAvatar = async () => {
        try {
            const reqParams: GetAvatarReqParams = {
            profileName: name,
            }
        const resp: GetAvatarResp = await api.user.getAvatar(reqParams)
        
        if(resp.code === 0) {
            setAvatarUri(resp.presignedurl);
        }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            Alert.alert('Error', errorMessage);
        }
    };

    useEffect(() => {
        handleAvatar()
    }, []);
    
    const handleLogout = async () => {
        dispatch(userLogout(() => navigation.navigate('Welcome')));
    };

    return (
        <View style={styles.container}>
            <Text>{name} Screen</Text>
            <Text>User details</Text>
            <Image source={ {uri: avatarUri}} style={styles.avatarImage}/>
            <CustomButton
                text="Go Home"
                onPress={() => navigation.navigate('Home', { profileName: route.params.profileName })}
                style={styles.button}
            />
            <TouchableOpacity onPress={handleLogout} style={styles.avatar}>
                <Icon
                    name={'log-out'}
                    size={40}
                    color={'blue'}
                    style={styles.flippedIcon}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginVertical: responsiveHeight(1),
    },
    avatar: {
        aspectRatio: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flippedIcon: {
        transform: [{ scaleX: -1 }]
    },
    avatarImage: {
        width: '10%',
        aspectRatio:1,
        borderRadius: 50,
        marginBottom: 24,
    },
});

export default User;
