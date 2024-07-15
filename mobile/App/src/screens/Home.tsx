import React, { useState } from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';
import { StackNavigationProp,createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import Sidebar from '../components/Homescreen/Sidebar';
import Content from '../components/Homescreen/Content';
import ContentContext from '../components/Homescreen/Context';

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
        width:Dimensions.get('window').width,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2d2d2d'
    },

});

export default HomeScreen;
