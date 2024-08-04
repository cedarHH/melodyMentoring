import React from 'react';
import { View, Text, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import CustomButton from '../../../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../contexts/types';
import {
  useAppDispatch,
  useAppSelector,
  AuthMode,
  setAuthMode,
  goBack,
  RootState,
  register, verifyEmailCode, login
} from '../../../store';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import VerifyForm from '../forms/VerifyForm';
import ResetPasswordForm from '../forms/ResetPasswordForm';
import ImageGrid from '../../../components/ImageGrid';
import {useApi} from "../../../contexts/apiContext";
import welcomeStyles from '../ui';
import styles from './ui';

const logo = require('../../../assets/img/logo/mygo1.png');

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const Welcome: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { authMode, emailForVerification } = useAppSelector((state: RootState) => state.auth);
  const api = useApi();

  const handleLogin = async (email: string, password: string, navigation: WelcomeScreenNavigationProp) => {
    dispatch(login(email, password, navigation, api));
  };

  const handleSignUp = async (email: string, username: string, password: string, confirmPassword: string) => {
    dispatch(register(email, username, password, confirmPassword));
  };

  const handleVerifyCode = async (email: string, verificationCode: string) => {
    dispatch(verifyEmailCode(email, verificationCode));
  };

  return (
      <View style={welcomeStyles.screen}>
        <View style={welcomeStyles.leftContainer}>
          <LinearGradient
              colors={['#1B1C1E', 'transparent', 'transparent']}
              style={welcomeStyles.radialGradient}
              start={{ x: 1, y: 0.5 }}
              end={{ x: 0.5, y: 0.5 }}
          />
          <View style={styles.leanBox}>
            <ImageGrid />
          </View>
        </View>

        <View style={welcomeStyles.rightContainer}>
          <View style={styles.topSection}>
            <Image source={logo} style={styles.logo} />
          </View>

          {authMode === AuthMode.WELCOME && (
              <View style={styles.middleSection}>
                <Text style={styles.subtitle}>Discover Your Sound</Text>
              </View>
          )}

          <View style={styles.bottomSection}>
            {authMode === AuthMode.WELCOME && (
                <>
                  <CustomButton
                      text="I am new here"
                      onPress={() => dispatch(setAuthMode(AuthMode.REGISTER))}
                      style={styles.button_1}
                      textStyle={styles.buttonText}
                  />
                  <CustomButton
                      text="Sign In"
                      onPress={() => dispatch(setAuthMode(AuthMode.LOGIN))}
                      style={styles.button_2}
                      textStyle={styles.buttonText}
                  />
                </>
            )}
          </View>

          {authMode === AuthMode.LOGIN && (
              <LoginForm
                  onLogin={handleLogin}
                  onBack={() => dispatch(goBack())}
                  navigation={navigation}
              />
          )}
          {authMode === AuthMode.REGISTER && (
              <RegisterForm
                  onSignUp={handleSignUp}
                  onBack={() => dispatch(goBack())}
              />
          )}
          {authMode === AuthMode.VERIFY_CODE && (
              <VerifyForm
                  onVerify={handleVerifyCode}
                  email={emailForVerification}
                  onBack={() => dispatch(goBack())}
              />
          )}
          {authMode === AuthMode.RESET_PASSWORD && (
              <ResetPasswordForm
                  onBack={() => dispatch(goBack())}
              />
          )}
        </View>
      </View>
  );
};

export default Welcome;
