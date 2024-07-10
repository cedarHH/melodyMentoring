import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { signInWithEmail, signUpUserWithEmail } from './cognito';

export default function WelcomeScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');  // 新增用户名状态
  const [confirmPassword, setConfirmPassword] = useState(''); // 确认密码
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);  // 切换登录和注册

  const handleLogin = async () => {
    setLoading(true);
    try {
      const session = await signInWithEmail(email, password);
      console.log('Login successful:', session);
      setLoading(false);
      navigation.navigate('Home');
    } catch (err) {
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
      const response = await signUpUserWithEmail(username, email, password);
      console.log('Registration successful:', response);
      setLoading(false);
      Alert.alert("Registration Successful", "Please verify your email before logging in.");
    } catch (error) {
      setLoading(false);
      Alert.alert("Registration Failed", error.message);
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
        title={isSignUp ? "Already have an account? Login" : "Need an account? Register"}
        onPress={toggleForm}
      />
    </ScrollView>
  );
}

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
