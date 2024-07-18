import React from 'react';
import { View, Text, StyleSheet,Alert,TouchableOpacity } from 'react-native';
import CustomButton from '../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import {responsiveHeight} from "react-native-responsive-dimensions";
import { signOut } from '../libs/cognito';
import Icon from 'react-native-vector-icons/Ionicons';

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'User'>;

type Props = {
    navigation: UserScreenNavigationProp;
};

const User: React.FC<Props> = ({ navigation }) => {
    const handleLogout = async () => {
        try {
          const session = await signOut();
          console.log('Log out:', session);
          navigation.navigate('Welcome')
        } catch (err: any) {
          Alert.alert("Login Failed", err.message || "Failed to login");
        }
      };
    return (
        <View style={styles.container}>
            <Text>User Screen</Text>
            <Text>User details</Text>
            <CustomButton
                text="Go Home"
                onPress={() => navigation.navigate('Home')}
                style={styles.button}
            />
            <TouchableOpacity onPress={handleLogout} 
                style={styles.avatar}>
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
