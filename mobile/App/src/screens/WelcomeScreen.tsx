import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView,Modal, Image, Dimensions } from 'react-native';
import CustomButton from '../components/MISC/Button';
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

  const storeToken = async (Token: any) => {
    try {
      const TokenStr = JSON.stringify(Token);
      await AsyncStorage.setItem('Token', TokenStr);
      const tokens = JSON.parse(TokenStr);

      const accessToken = tokens.accessToken.jwtToken;
      const idToken = tokens.idToken.jwtToken;
      console.log('access Token:', accessToken);
      console.log('id Token:', idToken);
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
      <View style={styles.screen}>
        <View style={styles.leftContainer}>
          <View style={styles.imagesContainer}>
              <Image style={styles.image1} source={require('../assets/img/welcome/1.jpg')} />
              <Image style={styles.image1} source={require('../assets/img/welcome/2.png')} />
              <Image style={styles.image2} source={require('../assets/img/welcome/3.jpg')} />
              <Image style={styles.image2} source={require('../assets/img/welcome/4.png')} />
              <Image style={styles.image1} source={require('../assets/img/welcome/8.jpg')} />
              <Image style={styles.image1} source={require('../assets/img/welcome/5.jpg')} />
              <Image style={styles.image2} source={require('../assets/img/welcome/6.jpg')} />
              <Image style={styles.image2} source={require('../assets/img/welcome/7.jpg')} />
              <Image style={styles.image1} source={require('../assets/img/welcome/7.jpg')} />
          </View>
        </View>

        <View style={styles.rightContainer}>
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

          <CustomButton
              text={loading ? (isSignUp ? "Registering..." : "Logging in...") : (isSignUp ? "Register" : "Login")}
              onPress={isSignUp ? handleSignUp : handleLogin}
              style={styles.button}
          />

          <CustomButton
              text={isSignUp ? "Already have an account" : "New User"}
              onPress={toggleForm}
              style={styles.button}
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
                <CustomButton
                    text="Verify Code"
                    onPress={handleVerifyCode}
                    style={styles.button}
                />
              </>
          )}
        </View>

      </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2d2d2d',
    width:Dimensions.get('window').width
  },

  leftContainer:{
    flex:1.3,
  },
  imagesContainer: {
    flexWrap:'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopRightRadius: Dimensions.get('window').width/3.3,
    borderBottomRightRadius: Dimensions.get('window').width/2.7,
    backgroundColor:'#2d2d2d',
    overflow: 'hidden',
    transform:[{rotate:'350deg'}],
    width:Dimensions.get('window').width/1.9,
    height:Dimensions.get('window').height*1.5,
    position: 'relative',
    top: -Dimensions.get('window').height*0.2, 
    left: -Dimensions.get('window').height*0.1
  },
  image1: {
    width:180,
    height: 120,
    margin: 10,
    borderRadius: 20,
    position: 'relative',
    left: 0, 
  },

  image2: {
    width:180,
    height: 120,
    margin: 10,
    borderRadius: 20,
    position: 'relative',
    left: 40, 
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor:'#2d2d2d',
    alignItems:'center'
    },
  input: {
    width: '60%',
    color:'white',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  button: {
    marginVertical: 10,
  },
});

export default WelcomeScreen;
