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
    uploadRefVideoImg: {
        height:'60%',
        aspectRatio:1,
        alignSelf:'center',
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
    },
    inputContainer: {
        marginTop:'5%',
        flexDirection:'row',
        justifyContent:'space-between',
        padding: 10,
    },
    input: {
        width: '15%',
        backgroundColor:'white',
        borderColor: 'gray',
        borderWidth: 1,
        marginHorizontal: 10,
        padding: 10,
        color: 'black'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        maxWidth: 300,
        height: '30%',
        maxHeight: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(240, 240, 240)',
        borderRadius: 10,
        padding: 20,
    },
    modalLogo: {
        width: '30%',
        height: '30%',
        marginBottom: 20,
    },
    modalText: {
        color: 'rgb(90, 90, 90)',
        fontSize: 18,
        marginTop: 20,
    },
});
