import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import CustomButton from '../../components/MISC/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../contexts/types';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';
import { useApi } from '../../contexts/apiContext';
import { useAppDispatch } from '../../store';
import {GetPerformanceReportReq, GetPerformanceReportResp} from "../../contexts/apiParams/mediaComponents";

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'User'>;

type Props = {
    navigation: UserScreenNavigationProp;
};

const User: React.FC<Props> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const api = useApi();

    const [reportData, setReportData] = useState<GetPerformanceReportResp | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPerformanceReport = async () => {
            try {
                const params: GetPerformanceReportReq = {
                    profileName: 'DefaultProfile',
                    recordId: 123, // 根据实际需要设置recordId
                };
                const response = await api.record.getPerformanceReport(params);
                if (response.code === 0) {
                    setReportData(response);
                } else {
                    setError(response.msg);
                    Alert.alert('Error', response.msg);
                }
            } catch (e) {
                const errorMessage = e instanceof Error ? e.message : 'An error occurred';
                setError(errorMessage);
                Alert.alert('Error', errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchPerformanceReport();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
                <CustomButton
                    text="Go Home"
                    onPress={() => navigation.navigate('Home', { profileName: 'DefaultProfile' })}
                    style={styles.button}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Performance Report</Text>
            {reportData && (
                <View style={styles.reportContainer}>
                    <Text style={styles.reportText}>Code: {reportData.code}</Text>
                    <Text style={styles.reportText}>Presigned URL: {reportData.presignedurl}</Text>
                    <Text style={styles.reportText}>Message: {reportData.msg}</Text>
                </View>
            )}
            <CustomButton
                text="Go Home"
                onPress={() => navigation.navigate('Home', { profileName: 'DefaultProfile' })}
                style={styles.button}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginVertical: responsiveHeight(1),
    },
    reportContainer: {
        marginVertical: responsiveHeight(2),
    },
    reportText: {
        fontSize: responsiveFontSize(2),
        marginVertical: responsiveHeight(0.5),
    },
    errorText: {
        color: 'red',
        fontSize: responsiveFontSize(2),
    },
    title: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(2),
    },
});

export default User;