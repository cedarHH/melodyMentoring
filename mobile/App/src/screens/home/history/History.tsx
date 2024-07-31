import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import CustomButton from '../../../components/MISC/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../contexts/types';
import {RouteProp} from '@react-navigation/native';
import {responsiveHeight, responsiveFontSize} from 'react-native-responsive-dimensions';
import {useApi} from '../../../contexts/apiContext';
import {
    GetPerformanceReportReq,
    GetPerformanceReportResp,
    GetRecordReq, RecordInfo
} from '../../../contexts/apiParams/mediaComponents';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp;
};

const History: React.FC<Props> = ({ navigation,route }) => {
    const api = useApi();
    const {profileName} = route.params;
    const [records, setRecords] = useState<Array<RecordInfo>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const params: GetRecordReq = {
                    profileName: profileName,
                    limit: 10,
                    start: 0,
                    end: Date.now(),
                };
                const response = await api.record.getRecord(params);
                if (response.code === 0) {
                    console.log(response);
                    setRecords(response.data);
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

        fetchRecords();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Loading...</Text>
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
        <ScrollView style={styles.container}>
            <Text style={styles.text}>History</Text>
            {/*{records.map((record) => (*/}
            {/*    <TouchableOpacity*/}
            {/*        key={record.id}*/}
            {/*        style={styles.recordContainer}*/}
            {/*        onPress={() => navigation.navigate('Result', { recordId: record.id })}*/}
            {/*    >*/}
            {/*        <Text style={styles.recordText}>ID: {record.id}</Text>*/}
            {/*        /!* 这里假设RecordInfo有一个timestamp属性来表示记录时间 *!/*/}
            {/*        <Text style={styles.recordText}>Time: {new Date(record.timestamp).toLocaleString()}</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*))}*/}
            <CustomButton
                text="Go Home"
                onPress={() => navigation.navigate('Home', { profileName: 'DefaultProfile' })}
                style={styles.button}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#1B1C1E',
    },
    text: {
        color: 'white',
        fontSize: responsiveFontSize(2.5),
        marginBottom: responsiveHeight(2),
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: responsiveFontSize(2),
        textAlign: 'center',
    },
    recordContainer: {
        backgroundColor: '#2A2A2A',
        padding: 16,
        marginVertical: responsiveHeight(1),
        borderRadius: 8,
    },
    recordText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
    },
    button: {
        marginVertical: responsiveHeight(2),
    },
});

export default History;