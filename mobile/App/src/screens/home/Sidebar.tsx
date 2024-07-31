import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import CustomButton from '../../components/MISC/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../contexts/types';
import {signOut} from '../../libs/cognito';
import {RouteProp} from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type SidebarRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
    setActiveContent: (content: string) => void;
    activeContent: string;
    route: SidebarRouteProp;
}

const Sidebar: React.FC<Props> = ({navigation, setActiveContent, activeContent, route}) => {
    const handleMain = () => {
        setActiveContent('main');
        navigation.navigate('Main', {profileName: route.params.profileName});
    };
    const handleSearch = () => {
        setActiveContent('search');
        navigation.navigate('Search', {profileName: route.params.profileName});
    };
    const handleHistory = () => {
        setActiveContent('history');
        navigation.navigate('History', {profileName: route.params.profileName});
    };

    const changeUser = async () => {
        try {
            navigation.navigate('SubUser')
        } catch (err: any) {
        }
    };

    return (
        <View style={styles.sidebar}>
            <TouchableOpacity onPress={() => navigation.navigate('User')}
                              style={styles.avatar}>
                <Image source={require('../../assets/img/welcome/anime7.png')} style={styles.Avatarimage}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleMain}
                              style={[styles.button, activeContent === 'main' && styles.activeButton]}>
                <Icon
                    name={activeContent === 'main' ? 'home' : 'home-outline'}
                    size={30}
                    color={activeContent === 'main' ? '#05fdfd' : 'white'}
                />
                <Text style={[styles.link, activeContent === 'main' && styles.activelink]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSearch}
                              style={[styles.button, activeContent === 'search' && styles.activeButton]}>
                <Icon
                    name={activeContent === 'search' ? 'search' : 'search-outline'}
                    size={30}
                    color={activeContent === 'search' ? '#05fdfd' : 'white'}
                />
                <Text style={[styles.link, activeContent === 'search' && styles.activelink]}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleHistory}
                              style={[styles.button, activeContent === 'history' && styles.activeButton]}>
                <Icon
                    name={activeContent === 'history' ? 'time' : 'time-outline'}
                    size={30}
                    color={activeContent === 'history' ? '#05fdfd' : 'white'}
                />
                <Text style={[styles.link, activeContent === 'history' && styles.activelink]}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={changeUser}
                              style={styles.avatar}>
                <Icon
                    name={'log-out'}
                    size={30}
                    color={'white'}
                    style={styles.flippedIcon}
                />
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    sidebar: {
        width: '10%',
        height: '100%',
        paddingTop: "4%",
        alignItems: 'center',
        marginStart: "-4%",
    },
    link: {
        fontSize: 8,
        color: 'white'
    },
    activelink: {
        fontSize: 8,
        color: '#05fdfd'
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
        borderRadius: 10,
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
    },
    flippedIcon: {
        transform: [{scaleX: -1}]
    }
});

export default Sidebar;