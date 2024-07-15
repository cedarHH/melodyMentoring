import { StyleSheet, Dimensions } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#1B1C1E',
    },
    leftContainer: {
        flex: 1.5,
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
        borderRadius: Dimensions.get('window').width / 2,
        zIndex: 10,
        pointerEvents: 'none',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: responsiveWidth(3),
        zIndex: 20,
    },
});

export default styles;
