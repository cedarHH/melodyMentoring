import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../../components/MISC/Button';
import AddForm from './AddForm';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import { responsiveHeight } from 'react-native-responsive-dimensions';

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SubUser'>;

type Props = {
    navigation: UserScreenNavigationProp;
};

const User: React.FC<Props> = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCreatePress = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text>User Screen</Text>
            <Text>User details</Text>
            <CustomButton
                text="Create"
                onPress={handleCreatePress}
                style={styles.button}
            />
            <CustomButton
                text="Continue"
                onPress={() => navigation.navigate('Home')}
                style={styles.button}
            />
            <AddForm visible={isModalVisible} onClose={handleCloseModal} />
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