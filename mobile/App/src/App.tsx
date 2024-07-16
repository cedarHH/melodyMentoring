import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store';
import Welcome from './screens/welcome/main/Welcome';
import Home from './screens/Home';
import User from './screens/User';
import Upload from './screens/Upload';
import * as ScreenOrientation from 'expo-screen-orientation';
import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
            .then(() => {
                console.log('Screen orientation locked to landscape');
            })
            .catch((error) => {
                console.error('Failed to lock screen orientation:', error);
            });
    }, []);

  return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="Upload" component={Upload}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
}