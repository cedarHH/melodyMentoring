import React, { useState }from 'react';
import { View, Text, StyleSheet} from 'react-native';
import CustomButton from '../../../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { RootStackParamList } from '../../../../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const Search: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Search</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color:'white'    
    }
});

export default Search;