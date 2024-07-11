import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'User'>;

type Props = {
    navigation: UserScreenNavigationProp;
};

const UserScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>User Screen</Text>
            <Text>User details</Text>
            <CustomButton
                text="Go Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default UserScreen;
