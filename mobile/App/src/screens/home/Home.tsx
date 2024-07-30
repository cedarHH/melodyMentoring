import React, { useState } from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';
import { StackNavigationProp,createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../contexts/types';
import Sidebar from './Sidebar';
import Content from './Content';
import ContentContext from './Context';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};


const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [activeContent, setActiveContent] = useState('main');

    return (
        <ContentContext.Provider value={{ activeContent, setActiveContent }}>
            <View style={styles.container}>
                <Sidebar
                    navigation={navigation}
                    setActiveContent={setActiveContent}
                    activeContent={activeContent}
                />
                <Content navigation={navigation}/>
            </View>
        </ContentContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2d2d2d'
    },

});

export default HomeScreen;
