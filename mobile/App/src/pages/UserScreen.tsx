import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
            <Button
                title="Go Home"
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
