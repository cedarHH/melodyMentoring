import React from 'react';
import { View, Text, Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import CustomButton from '../../../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../types';
import {
  useAppDispatch,
  useAppSelector,
  AuthMode,
  setAuthMode,
  setEmailForVerification,
  goBack,
  RootState,
  register, verifyEmailCode, login
} from '../../../store';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import VerifyForm from '../forms/VerifyForm';
import ResetPasswordForm from '../forms/ResetPasswordForm';
import ImageGrid from '../../../components/ImageGrid';
import welcomeStyles from '../ui';
import styles from './ui';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const Welcome: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { authMode, emailForVerification } = useAppSelector((state: RootState) => state.auth);

  const handleLogin = async (email: string, password: string, navigation: WelcomeScreenNavigationProp) => {
    dispatch(login(email, password, navigation));
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
              colors={['transparent', 'transparent', '#1B1C1E']}
              style={welcomeStyles.radialGradient}
              start={{ x: 0.5, y: 0.5 }}
              end={{ x: 1, y: 1 }}
          />
          <View style={styles.leanBox}>
            <ImageGrid />
          </View>
        </View>

        <View style={welcomeStyles.rightContainer}>
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
          {authMode === AuthMode.WELCOME &&(
              <>
                <Text style={styles.title}>Welcome</Text>
                <CustomButton
                    text="Login"
                    onPress={() => dispatch(setAuthMode(AuthMode.LOGIN))}
                    style={styles.button}
                />
                <CustomButton
                    text="I am new here"
                    onPress={() => dispatch(setAuthMode(AuthMode.REGISTER))}
                    style={styles.button}
                />
              </>
          )}
        </View>
      </View>
  );
};

export default Welcome;
