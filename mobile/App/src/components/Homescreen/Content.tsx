import React, { useState }from 'react';
import { View, Text, StyleSheet} from 'react-native';
import CustomButton from '../../components/MISC/Button';
import { StackNavigationProp,createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import Search from './Search';
import Main from './Main';
import History from './History';
import Music from './MusicDetail';

const ContentStack = createStackNavigator<RootStackParamList>();

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};
const Content: React.FC<Props> = () => {
    return (
        <View style={styles.content}>
            <ContentStack.Navigator 
                screenOptions={{
                    headerShown: false, 
                    cardStyle: { backgroundColor: '#2d2d2d' },
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter

                    }} >
                <ContentStack.Screen name="Main" component={Main}/>
                <ContentStack.Screen name="Search" component={Search}/>
                <ContentStack.Screen name="History" component={History} />
            </ContentStack.Navigator>
            {/* <ContentStack.Navigator screenOptions={{ headerShown: false }}>
                {activeContent === 'main' && (
                    <ContentStack.Screen name="Main" component={Main} />
                )}
                {activeContent === 'search' && (
                    <ContentStack.Screen name="Search" component={Search} />
                )}
                {activeContent === 'history' && (
                    <ContentStack.Screen name="History" component={History} />
                )}
            </ContentStack.Navigator> */}
        </View>
    );
};

const styles = StyleSheet.create({
    content:{
        width:'88%',
        backgroundColor:'#2d2d2d'
    }

})
export default Content;