import React, { useState }from 'react';
import { View, Text, StyleSheet} from 'react-native';
import CustomButton from '../../components/MISC/Button';
import { StackNavigationProp,createStackNavigator,CardStyleInterpolators, Header } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import Search from './search/Search';
import Main from './main/Main';
import History from './history/History';
import Music from './music/MusicDetail';

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
                    headerStyle: {
                        height: 0,
                      },
                    cardStyle: { backgroundColor: '#2d2d2d' },
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter
                    }} >
                <ContentStack.Screen name="Main" component={Main}/>
                <ContentStack.Screen name="Search" component={Search}/>
                <ContentStack.Screen name="History" component={History} />
                <ContentStack.Screen name="Music" component={Music} 
                    initialParams={{ title: 'default', image: 'default' }}
                    options={{ headerShown: true }}/>
            </ContentStack.Navigator>
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