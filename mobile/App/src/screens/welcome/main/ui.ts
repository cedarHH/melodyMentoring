import { StyleSheet, Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    leanBox: {
        display: 'flex',
        transform: [{ rotate: '-10deg' }, { translateX: -10 }],
    },

    title: {
        color: 'white',
        fontSize: responsiveFontSize(3),
        marginBottom: responsiveHeight(2),
    },
    input: {
        width: responsiveWidth(30),
        color: 'white',
        marginVertical: responsiveHeight(1),
        padding: responsiveHeight(1.5),
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    button: {
        marginVertical: responsiveHeight(5),
        width: responsiveWidth(25),
    },
});

export default styles;