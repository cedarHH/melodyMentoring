import React, { useState }from 'react';
import { View, Text, StyleSheet} from 'react-native';
import CustomButton from '../../../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerActions, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../contexts/types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HistoryRoute = RouteProp<RootStackParamList, 'History'>;

type Props = {
    navigation: HomeScreenNavigationProp;
    route: HistoryRoute
};

const History: React.FC<Props> = ({ navigation,route }) => {
    console.log(route)
    return (
        <View style={styles.container}>
            <Text style={styles.text}>History</Text>

            <CustomButton
                text="Go result"
                onPress={() => navigation.navigate('Result')}
                // style={styles.button}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color:'white'
    },
    text: {
        color:'white'
    }

});

export default History;