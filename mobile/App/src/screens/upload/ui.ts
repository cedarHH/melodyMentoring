import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2d2d2d'
    },
    header: {
        width:'100%',
        height: '10%',
    },
    uploadSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%',
        height: '25%',
    },
    uploadButton: {
        height:'60%',
        aspectRatio:1,
        alignSelf:'center',
    },
    buttonText: {
        color: 'white',
        marginTop: 2,
    },
    recordSection: {
        alignItems: 'center',
        width: '25%',
        height: '50%',
    },
    recordButton: {
        marginTop:'10%',
        height:'60%',
        aspectRatio:1
    },
    recordButtonText: {
        color: 'white',
        marginTop: 5,
        fontSize: 18,
    }
});
