import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './components/WelcomeScreen.js';
import HomeScreen from './components/HomeScreen';
import UserScreen from './components/UserScreen';
import UploadScreen from './components/UploadScreen';
import * as ScreenOrientation from 'expo-screen-orientation';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen}  />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
