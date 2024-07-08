import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './conmponents/HomeScreen.js';
import HomeScreen from './conmponents/HomeScreen';
import UserScreen from './conmponents/UserScreen';
import UploadScreen from './conmponents/UploadScreen';
import * as ScreenOrientation from 'expo-screen-orientation';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Upload" component={UploadScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
