import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/store';
import Welcome from './src/screens/welcome/main/Welcome';
import Home from './src/screens/home/Home';
import User from './src/screens/User';
import Upload from './src/screens/upload/Upload';
import * as ScreenOrientation from 'expo-screen-orientation';
import { RootStackParamList } from './types';

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
            {/* <Stack.Screen name="Subuser" component={Subuser} options={{ headerShown: false }}/> */}
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="User" component={User} options={{ headerShown: false }}/>
            <Stack.Screen name="Upload" component={Upload} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
}
