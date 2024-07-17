import { StyleSheet, Dimensions } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#1B1C1E',
    },
    leftContainer: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radialGradient: {
        position: 'absolute',
        top: '-50%',
        left: '-100%',
        width: '200%',
        height: '200%',
        borderRadius: width / 2,
        zIndex: 10,
        pointerEvents: 'none',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: responsiveWidth(3),
        zIndex: 20,
    },
});

export default styles;
