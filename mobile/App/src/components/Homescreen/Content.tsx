import React, { useState }from 'react';
import { View, Text, StyleSheet} from 'react-native';
import CustomButton from '../../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import Search from './Search';
import Home from './Home';
import History from './History';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
    activeContent: string;
}

const Content: React.FC<Props> = ({ navigation, activeContent }) => {
    return (
        <View style={styles.content}>
            {activeContent === 'home'  && <Home navigation={navigation} />}
            {activeContent === 'search' && <Search navigation={navigation}/>}
            {activeContent === 'history' && <History navigation={navigation}/>}
        </View>
    );
};

const styles = StyleSheet.create({
    content:{
        width:'88%'
    }

})
export default Content;