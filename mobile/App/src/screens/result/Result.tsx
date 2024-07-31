import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../contexts/types';
import { RouteProp } from '@react-navigation/native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

const { width } = Dimensions.get('window');
type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

type Props = {
    navigation: ResultScreenNavigationProp;
    route: ResultScreenRouteProp;
};

const ResultScreen: React.FC<Props> = ({ navigation, route }) => {
    const { recordId } = route.params;

    return (
        <View style={styles.container}>
            {/* 第一部分：AI Support */}
            <View style={styles.section}>
                <Text style={styles.headerText}>AI Support</Text>
                <TouchableOpacity
                    style={styles.aiSupportButton}
                    onPress={() => navigation.navigate('Feedback')}
                >
                    <Text style={styles.aiSupportButtonText}>Waiting for AI...</Text>
                    <Text style={styles.aiSupportButtonSubText}>{'>.<'}</Text>
                </TouchableOpacity>
            </View>

            {/* 第二部分：Score和Notes */}
            <View style={styles.scoreSection}>
                <View style={styles.scoreWrapper}>
                    <View style={styles.scoreContainer}>
                        <View style={styles.scoreInnerContainer}>
                            <Text style={styles.scoreText}>SCORE</Text>
                            <Text style={styles.scoreValue}>114514</Text>
                        </View>
                    </View>
                    <View style={styles.circleContainer}>
                        <View style={styles.circleInnerContainer}>
                            <View style={styles.upperContainer}>
                                <Image
                                    style={styles.profileImage}
                                    source={require('../../assets/img/logo/mygo.png')}
                                />
                                <Text style={styles.songName}>青春コンプレックス</Text>
                            </View>
                            <View style={styles.lowerContainer}>
                                <Text style={styles.tp}>TP 100%</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.scoreContainer}>
                        <View style={styles.scoreInnerContainer}>
                            <Text style={styles.notesText}>Wrong notes 0</Text>
                            <Text style={styles.notesText}>Missed notes 0</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* 第三部分：Play Again, Details和Continue */}
            <View style={styles.section}>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.playAgainButton}
                        onPress={() => navigation.navigate('User')}
                    >
                        <Text style={styles.playAgainButtonText}>Play again</Text>
                    </TouchableOpacity>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsText}>Pitch SSS</Text>
                        <Text style={styles.detailsText}>Rhythm SSS</Text>
                        <Text style={styles.detailsText}>Volume SSS</Text>
                        <Text style={styles.detailsText}>Timbre SSS</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() => navigation.navigate('User')}
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1C1E',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    section: {
        width: '90%',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: responsiveFontSize(3),
    },
    aiSupportButton: {
        backgroundColor: '#000',
        padding: responsiveWidth(2),
        borderRadius: responsiveWidth(2),
        alignItems: 'center',
        marginTop: responsiveHeight(2),
    },
    aiSupportButtonText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.2),
    },
    aiSupportButtonSubText: {
        color: '#fff',
        fontSize: responsiveFontSize(1.8),
    },
    scoreSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
    },
    scoreWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    scoreContainer: {
        alignItems: 'center',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingHorizontal: responsiveWidth(2),
    },
    scoreInnerContainer: {
        alignItems: 'center',
    },
    scoreText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.2),
    },
    scoreValue: {
        color: '#FFD700',
        fontSize: responsiveFontSize(6),
    },
    circleContainer: {
        width: responsiveWidth(25),
        height: responsiveWidth(25),
        borderRadius: responsiveWidth(12.5),
        borderWidth: 1,
        borderColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleInnerContainer: {
        width: '90%',
        height: '90%',
        borderRadius: (responsiveWidth(25) * 0.9) / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    upperContainer: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#00BFFF',
        paddingBottom: responsiveHeight(1),
    },
    profileImage: {
        width: responsiveWidth(5),
        height: responsiveWidth(5),
        borderRadius: responsiveWidth(2.5),
    },
    songName: {
        color: '#00BFFF',
        fontSize: responsiveFontSize(2.2),
    },
    lowerContainer: {
        marginTop: responsiveHeight(1),
    },
    tp: {
        color: '#00BFFF',
        fontSize: responsiveFontSize(2.2),
    },
    notesContainer: {
        alignItems: 'center',
        marginTop: responsiveHeight(2),
    },
    notesText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.2),
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    playAgainButton: {
        backgroundColor: '#444',
        padding: responsiveWidth(2),
        borderRadius: responsiveWidth(2),
    },
    playAgainButtonText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.2),
    },
    continueButton: {
        backgroundColor: '#00BFFF',
        padding: responsiveWidth(2),
        borderRadius: responsiveWidth(2),
    },
    continueButtonText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.2),
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
    },
    detailsText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.2),
        textAlign: 'center',
        marginHorizontal: responsiveWidth(2),
    },
});

export default ResultScreen;
