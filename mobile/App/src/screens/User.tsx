import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import CustomButton from '../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { responsiveHeight } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppDispatch } from '../store';
import { userLogout } from '../store';

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'User'>;

type Props = {
    navigation: UserScreenNavigationProp;
};

const User: React.FC<Props> = ({ navigation }) => {
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        dispatch(userLogout(() => navigation.navigate('Welcome')));
    };

    return (
        <View style={styles.container}>
            <Text>User Screen</Text>
            <Text>User details</Text>
            <CustomButton
                text="Go Home"
                onPress={() => navigation.navigate('Home', { profileName: 'DefaultProfile' })}
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
    }
});

export default User;
