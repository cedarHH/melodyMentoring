import React, { useState,useEffect } from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';
import { StackNavigationProp,createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../contexts/types';
import Sidebar from './Sidebar';
import Content from './Content';
import ContentContext from './Context';
import { RouteProp } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp;
};


const HomeScreen: React.FC<Props> = ({ navigation,route }) => {
    
    const [activeContent, setActiveContent] = useState('null');
    useEffect(() => {
        if (route.params && route.params.profileName) {
            setActiveContent('main');
            navigation.navigate('Main', { profileName: route.params.profileName });
        }
    }, [navigation, route.params, setActiveContent]);
    
    return (
        <ContentContext.Provider value={{ activeContent, setActiveContent }}>
            <View style={styles.container}>
                <Sidebar
                    navigation={navigation}
                    setActiveContent={setActiveContent}
                    activeContent={activeContent} 
                    route={route}
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
