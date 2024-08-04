import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../contexts/types';
import { RouteProp } from '@react-navigation/native';
import { useApi } from '../../contexts/apiContext';
import { styles } from './ui';
import {
    GetPerformanceReportReq,
    GetPerformanceReportResp
} from "../../contexts/apiParams/mediaComponents";
import { GetReferenceReq, GetReferenceResp } from "../../contexts/apiParams/mediaComponents";

type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

type Props = {
    navigation: ResultScreenNavigationProp;
    route: ResultScreenRouteProp;
};

const ResultScreen: React.FC<Props> = ({ navigation, route }) => {
    const { profileName, recordId, referenceId } = route.params;
    const [noteAccuracy, setNoteAccuracy] = useState<string>('Loading...');
    const [velocityAccuracy, setVelocityAccuracy] = useState<string>('Loading...');
    const [durationAccuracy, setDurationAccuracy] = useState<string>('Loading...');
    const [comment, setComment] = useState<string>('Loading...');
    const [Errors, setErrors] = useState<string>('Loading...');
    const [feedback, setFeedback] = useState<string>('Loading...');
    const [recommendations, setRecommendations] = useState<string>('Loading...');
    const [loading, setLoading] = useState<boolean>(true);
    const [songName, setSongName] = useState<string>('Loading...'); // 新增状态

    const api = useApi();

    useEffect(() => {
        const fetchPerformanceReport = async () => {
            try {
                setLoading(true);

                const performanceParams: GetPerformanceReportReq = {
                    profileName,
                    recordId
                };
                const performanceResponse: GetPerformanceReportResp = await api.record.getPerformanceReport(performanceParams);

                if (performanceResponse.code === 0) {
                    const response = await fetch(performanceResponse.presignedurl);
                    const data = await response.json();

                    setNoteAccuracy(data['Note accuracy']);
                    setVelocityAccuracy(data['Velocity accuracy']);
                    setDurationAccuracy(data['Duration accuracy']);
                    setComment(data['Comment']);
                    setErrors(data['Errors']);
                    setFeedback(data['Detailed_Feedback']);
                    setRecommendations(data['Recommendations']);
                } else {
                    console.error('Error fetching performance report:', performanceResponse.msg);
                    setNoteAccuracy('Error');
                    setVelocityAccuracy('Error');
                    setDurationAccuracy('Error');
                    setComment('Error');
                    setErrors('Error');
                    setFeedback('Error');
                    setRecommendations('Error');
                }

                // 获取Reference信息
                const referenceParams: GetReferenceReq = {
                    refId: referenceId
                };
                const referenceResponse: GetReferenceResp = await api.reference.getReference(referenceParams);

                if (referenceResponse.code === 0) {
                    setSongName(referenceResponse.data.title);
                } else {
                    console.error('Error fetching reference:', referenceResponse.msg);
                    setSongName('Error');
                }
            } catch (error) {
                console.error('Error:', error);
                setNoteAccuracy('Error');
                setVelocityAccuracy('Error');
                setDurationAccuracy('Error');
                setComment('Error');
                setErrors('Error');
                setFeedback('Error');
                setRecommendations('Error');
                setSongName('Error');
            } finally {
                setLoading(false); // 请求完成时设置为false
            }
        };

        fetchPerformanceReport();
    }, [recordId, referenceId]);

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#05fdfd" />
                <Text style={styles.loadingText}>Loading performance report...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.headerText}>AI Support</Text>
                <TouchableOpacity
                    style={styles.aiSupportButton}
                    onPress={() => navigation.navigate('Feedback', {
                        profileName,
                        comment,
                        Errors,
                        feedback,
                        recommendations,
                    })}
                >
                    <Text style={styles.aiSupportButtonText}>Get your AI feedback</Text>
                    <Text style={styles.aiSupportButtonSubText}>＾▽＾</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.scoreSection}>
                <View style={styles.scoreWrapper}>
                    <View style={styles.scoreContainer}>
                        <View style={styles.scoreInnerContainer}>
                            {/*<Text style={styles.scoreText}>SCORE</Text>*/}
                            {/*<Text style={styles.scoreValue}>114514</Text>*/}
                        </View>
                    </View>
                    <View style={styles.circleContainer}>
                        <View style={styles.circleInnerContainer}>
                            <View style={styles.upperContainer}>
                                <Image
                                    style={styles.profileImage}
                                    source={require('../../assets/img/logo/mygo.png')}
                                />
                                <Text style={styles.songName}>{songName}</Text>
                            </View>
                            <View style={styles.lowerContainer}>
                                <Text style={styles.tp}>TP {noteAccuracy}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.scoreContainer}>
                        <View style={styles.scoreInnerContainer}>
                            <Text style={styles.notesText}>Velocity Accuracy: {velocityAccuracy}</Text>
                            <Text style={styles.notesText}>Duration Accuracy: {durationAccuracy}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.playAgainButton}
                        onPress={() => navigation.navigate('Home', {profileName: profileName})}
                    >
                        <Text style={styles.playAgainButtonText}>Play again</Text>
                    </TouchableOpacity>
                    <View style={styles.detailsContainer}>
                        {/*<Text style={styles.detailsText}>Pitch SSS</Text>*/}
                        {/*<Text style={styles.detailsText}>Rhythm SSS</Text>*/}
                        {/*<Text style={styles.detailsText}>Volume SSS</Text>*/}
                        {/*<Text style={styles.detailsText}>Timbre SSS</Text>*/}
                    </View>
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() => navigation.navigate('Home', {profileName: profileName})}
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ResultScreen;