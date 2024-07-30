import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../contexts/types';
import { responsiveHeight } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppDispatch } from '../../store';


type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'User'>;

type Props = {
    navigation: UserScreenNavigationProp;
};

const User: React.FC<Props> = ({ navigation }) => {
    const dispatch = useAppDispatch();

    return (
        <View style={styles.container}>
            <Text>Feedback Screen</Text>
            <Text>Feedback details</Text>
            <CustomButton
                text="Go Home"
                onPress={() => navigation.navigate('Home', { profileName: 'DefaultProfile' })}
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
