import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data (replace this with your actual data fetching logic)
        const loadData = async () => {
            setLoading(true);
            // Here you would normally fetch your data
            await new Promise(resolve => setTimeout(resolve, 2)); // Simulate a 2 second load
            setLoading(false);
        };

        loadData();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#05fdfd" />
            ) : (
                <>
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
                </>
            )}
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
        marginTop: responsiveHeight(2),
    },
});

export default Feedback;
