import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import {responsiveHeight} from "react-native-responsive-dimensions";

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'User'>;

type Props = {
    navigation: UserScreenNavigationProp;
};

const User: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>User Screen</Text>
            <Text>User details</Text>
            <CustomButton
                text="Go Home"
                onPress={() => navigation.navigate('Home')}
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
});

export default User;
