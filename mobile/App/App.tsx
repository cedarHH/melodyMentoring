import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store, RootState, checkFirstLogin, useAppDispatch, useAppSelector} from './src/store';
import Welcome from './src/screens/welcome/main/Welcome';
import Home from './src/screens/home/Home';
import User from './src/screens/user/User';
import SubUser from './src/screens/subUser/SubUser';
import Upload from './src/screens/upload/Upload';
import Result from './src/screens/result/Result';
import Feedback from "./src/screens/feedback/Feedback";
import Configure from './src/screens/config/Configure';
import Main from './src/screens/home/main/Main';
import * as ScreenOrientation from 'expo-screen-orientation';
import {RootStackParamList} from './src/contexts/types';
import {ApiProvider} from './src/contexts/apiContext';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const dispatch = useAppDispatch();
    const isFirstLogin = useAppSelector((state: RootState) => state.firstLogin.isFirstLogin);

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
            .then(() => {
                console.log('Screen orientation locked to landscape');
            })
            .catch((error) => {
                console.error('Failed to lock screen orientation:', error);
            });

        dispatch(checkFirstLogin());
    }, [dispatch]);

    if (isFirstLogin === null) {
        // You can return a loading screen or null until the initial route is determined
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
                <Stack.Screen name="SubUser" component={SubUser} options={{headerShown: false}}/>
                <Stack.Screen name="Configure" component={Configure} options={{ headerShown: false }}/>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="User" component={User} options={{headerShown: false}}/>
                <Stack.Screen name="Upload" component={Upload} options={{headerShown: false}}/>
                <Stack.Screen name="Result" component={Result} options={{ headerShown: false }}/>
                <Stack.Screen name="Feedback" component={Feedback} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <ApiProvider>
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        </ApiProvider>
    );
}
