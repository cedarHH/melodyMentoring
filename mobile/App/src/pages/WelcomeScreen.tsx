import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { signInWithEmail, signUpUserWithEmail, verifyCode } from '../libs/cognito';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const storeToken = async (accessToken: any) => {
    try {
      const accessTokenStr = JSON.stringify(accessToken);
      await AsyncStorage.setItem('accessToken', accessTokenStr);
      const accessTokenObj = JSON.parse(accessTokenStr);

      // Access the jwtToken from the accessToken object
      const jwtToken = accessTokenObj.jwtToken;

      console.log('JWT Token:', jwtToken);
      console.log('Tokens are saved successfully!');
    } catch (e) {
      console.log('Failed to save the tokens.', e);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const session = await signInWithEmail(email, password);
      console.log('Login successful:', session);
      setLoading(false);
      navigation.navigate('Home');
      storeToken(session.accessToken);
    } catch (err: any) {
      setLoading(false);
      Alert.alert("Login Failed", err.message || "Failed to login");
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "The passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      const response = await signUpUserWithEmail(email, email, password, username);
      console.log('Registration successful:', response);
      setLoading(false);
      setShowVerification(true);
      Alert.alert("Registration Successful", "Please verify your email before logging in.");
    } catch (error: any) {
      setLoading(false);
      Alert.alert("Registration Failed", error.message);
    }
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    try {
      await verifyCode(email, verificationCode);
      setLoading(false);
      Alert.alert("Verification Successful", "Your email has been verified.");
      navigation.navigate('Home');
    } catch (error: any) {
      setLoading(false);
      Alert.alert("Verification Failed", error.message);
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text>{isSignUp ? "Sign Up" : "Login"}</Text>

        {isSignUp && (
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
        )}
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
        />
        {isSignUp && (
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
            />
        )}

        <Button
            title={loading ? (isSignUp ? "Registering..." : "Logging in...") : (isSignUp ? "Register" : "Login")}
            onPress={isSignUp ? handleSignUp : handleLogin}
            disabled={loading}
        />

        <Button
            title={isSignUp ? "Already have an account" : "New User"}
            onPress={toggleForm}
        />

        {showVerification && (
            <>
              <TextInput
                  style={styles.input}
                  placeholder="Verification Code"
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  keyboardType="number-pad"
              />
              <Button
                  title="Verify Code"
                  onPress={handleVerifyCode}
                  disabled={loading}
              />
            </>
        )}

      </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '60%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default WelcomeScreen;
