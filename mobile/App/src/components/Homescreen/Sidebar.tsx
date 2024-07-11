import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import CustomButton from '../../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
    setActiveContent: (content: string) => void;
    activeContent: string;
}

const Sidebar: React.FC<Props> = ({ navigation, setActiveContent, activeContent }) => {

    return (
      <View style={styles.sidebar}>
        <TouchableOpacity style={styles.avatar} onPress={() => navigation.navigate('User')}>
            <Image source={require('../../assets/img/welcome/8.jpg')} style={styles.Avatarimage}/>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.button, activeContent === 'home' && styles.activeButton]} 
            onPress={() => setActiveContent('home')}
        >
          <Text style={styles.link}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.button, activeContent === 'search' && styles.activeButton]} 
            onPress={() => setActiveContent('search')}
        >
          <Text style={styles.link}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.button, activeContent === 'history' && styles.activeButton]} 
            onPress={() => setActiveContent('history')}
        >
          <Text style={styles.link}>History</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    sidebar: {
      width: '12%',
      height: '100%',
      padding: 20,
      paddingTop: 50,
      alignItems:'center'
    },
    link: {
      fontSize: 8,
    },
    avatar: {
        width: '120%',
        aspectRatio: 1, 
        borderRadius: 50, 
        backgroundColor: '#007bff', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop:-10,
        marginBottom: 30,
    },
    button: {
        width: '90%',
        aspectRatio: 1, 
        borderRadius: 50, 
        backgroundColor: 'transparent', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 20,
    },
    activeButton: {
        backgroundColor: 'white',
    },
    Avatarimage: {
        width: '100%', 
        height: '100%', 
        borderRadius: 50,
    }
  });

export default Sidebar;