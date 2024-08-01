 import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    leanBox: {
        display: 'flex',
        height: '120%',
        transform:
            [{ rotate: '-5deg' },
            { translateX: -responsiveWidth(10) }],
    },

    topSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(1),
    },
    logo: {
        width: responsiveWidth(20),
        height: responsiveHeight(10),
    },

    middleSection: {
        alignItems: 'center',
        marginBottom: responsiveHeight(3),
    },
    subtitle: {
        fontSize: responsiveFontSize(3.3),
        fontWeight: '300',
        color: '#fff',
    },

    bottomSection: {
        alignItems: 'center',
        marginBottom: responsiveHeight(10),
    },
    buttonText: {
        fontSize: responsiveFontSize(1.8),
    },
    button_1: {
        width: responsiveWidth(40),
    },
    button_2: {
        width: responsiveWidth(30),
        backgroundColor: '#666666',
    },
});

export default styles;