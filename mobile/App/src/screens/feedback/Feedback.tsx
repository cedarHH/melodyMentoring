import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../contexts/types';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

type FeedbackScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Feedback'>;
type FeedbackScreenRouteProp = RouteProp<RootStackParamList, 'Feedback'>;

type Props = {
    navigation: FeedbackScreenNavigationProp;
    route: FeedbackScreenRouteProp;
};

const Feedback: React.FC<Props> = ({ navigation, route }) => {
    const { comment, Errors, feedback, recommendations } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>AI Feedback</Text>
            <Text style={styles.text}>Comment: {comment}</Text>
            <Text style={styles.text}>Errors: {Errors}</Text>
            <Text style={styles.text}>Feedback: {feedback}</Text>
            <Text style={styles.text}>Recommendations: {recommendations}</Text>

            <CustomButton
                text="Go Home"
                onPress={() => navigation.navigate('Home', { profileName: route.params.profileName })}
                style={styles.button}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: responsiveWidth(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B1C1E',
    },
    header: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(2),
        color: 'white',
    },
    text: {
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(1),
        color: 'white',
    },
    button: {

    },
});

export default Feedback;
