import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../contexts/types';
import { responsiveHeight } from "react-native-responsive-dimensions";
import { RouteProp } from '@react-navigation/native';
import { useAppDispatch, useAppSelector, setFirstLogin, RootState } from '../../store';

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Configure'>;
type ConfigureScreenRouteProp = RouteProp<RootStackParamList, 'Configure'>;

type Props = {
    navigation: UserScreenNavigationProp;
    route: ConfigureScreenRouteProp;
};

const Configure: React.FC<Props> = ({ navigation, route }) => {
    const dispatch = useAppDispatch();
    const isFirstLogin = useAppSelector((state: RootState) => state.firstLogin.isFirstLogin);
    const { profileName } = route.params;

    useEffect(() => {
        if (isFirstLogin === false) {
            navigation.replace('Home', { profileName });
        }
    }, [isFirstLogin, navigation]);

    const handleCompleteSetup = () => {
        dispatch(setFirstLogin(false));
        navigation.replace('Home', { profileName });
    };

    return (
        <View style={styles.container}>
            <Text>Config Screen</Text>
            <Text>Config details</Text>
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

export default Configure;
