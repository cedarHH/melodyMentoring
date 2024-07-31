// ui.ts
import { StyleSheet, Dimensions } from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
