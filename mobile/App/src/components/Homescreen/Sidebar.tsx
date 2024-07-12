import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import CustomButton from '../../components/MISC/Button';
import Icon from 'react-native-vector-icons/Ionicons';
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
            <Image source={require('../../assets/img/welcome/anime7.png')} style={styles.Avatarimage}/>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.button, activeContent === 'home' && styles.activeButton]} 
            onPress={() => setActiveContent('home')}
        >
          <Icon 
            name={activeContent === 'home' ? 'home' : 'home-outline'} 
            size={30} 
            color={activeContent === 'home' ? '#05fdfd' : 'white'} 
          />
          <Text style={[styles.link, activeContent === 'home' && styles.activelink]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.button, activeContent === 'search' && styles.activeButton]} 
            onPress={() => setActiveContent('search')}
        >
          <Icon 
            name={activeContent === 'search' ? 'search' : 'search-outline'} 
            size={30} 
            color={activeContent === 'search' ? '#05fdfd' : 'white'} 
          />
          <Text style={[styles.link, activeContent === 'search' && styles.activelink]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.button, activeContent === 'history' && styles.activeButton]} 
            onPress={() => setActiveContent('history')}
        >
          <Icon 
            name={activeContent === 'history' ? 'time' : 'time-outline'} 
            size={30} 
            color={activeContent === 'history' ? '#05fdfd' : 'white'} 
          />
          <Text style={[styles.link, activeContent === 'history' && styles.activelink]}>History</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    sidebar: {
      width: '10%',
      height: '100%',
      paddingTop: "4%",
      alignItems:'center',
      marginStart:"-4%",
    },
    link: {
      fontSize: 8,
      color:'white'
    },
    activelink: {
      fontSize: 8,
      color:'#05fdfd'
    },
    avatar: {
        width: '70%',
        aspectRatio: 1, 
        borderRadius: 50, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: "30%",
    },
    button: {
        width: '60%',
        aspectRatio: 1, 
        borderRadius:10,
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: '20%',
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