import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ToastAndroid } from 'react-native'
import COLORS from '../../../constants/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import candidateIcon from '../../../assets/images/candidateIcon.png'
import axios from 'axios'


const Interview_status = (props) => {
    const { navigation } = props;

    const [interViewDetail, setInterViewDetail] = useState();
    const [status, setStatus] = useState('P')

    // fetching interviewer's list data
    const fetchInterviewData = () => {
        axios.post(`http://192.168.1.169:7038/api/User/InterviewList`, {

            userId: '10011',
            operFlag: 'V',
        })
            .then(response => {
                const returnedData = response?.data?.Result;

                // console.log(returnedData)
                setInterViewDetail(returnedData)
            }).catch((err) => {
                ToastAndroid.show(err, 3000)
            });
    };

    useEffect(() => {
        fetchInterviewData();
    }, [])
    // candidate icons 
    function CandidateList(props) {

        const id = props.id, name = props.name, designation = props.designation, interviewStartTime = props.startTime, interviewEndTime = props.endTime, date = props.date, resume = props.resume

        return (
            <TouchableOpacity key={id} style={{ width: '100%', padding: 4 }} onPress={() => navigation.navigate('Candidate_details', { resume, name, designation, date, interviewEndTime, interviewStartTime })}>

                <View style={{ borderRadius: 60, backgroundColor: COLORS.bg_tile_Colo, flexDirection: 'row', height: 80, alignItems: 'center', elevation: 6, justifyContent: 'space-evenly', marginTop: 15 }}>
                    <View>
                        <Image source={candidateIcon} style={{ width: 50, height: 50, }} />
                    </View>

                    <View >

                        <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: '500' }}>{name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Icon name="briefcase-variant-outline" color={COLORS.gray} size={20} />
                            <Text style={{ color: COLORS.darkerGrey, fontSize: 13, fontWeight: '500', marginHorizontal: 2 }}> {designation}
                            </Text>
                        </View>
                        {date ? <Text style={{ color: COLORS.gray, fontSize: 12 }}>{date}</Text> : null}

                    </View>

                    <View style={{ justifyContent: 'flex-end' }}>
                        <Text style={{ backgroundColor: '#8467D7', borderRadius: 20, textAlign: 'center', alignSelf: 'center', padding: 8, color: COLORS.white, fontWeight: '500' }}>

                            {interviewStartTime} - {interviewEndTime}
                        </Text>
                    </View>

                </View>

            </TouchableOpacity>
        )
    }

    return (
        <ScrollView>
            <View style={[{ backgroundColor: COLORS.white, flex: 1, margin: 10, padding: 4, borderRadius: 10, height: '100%' }, styles.Elevation]}>


                {/* top buttons */}
                <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10, }}>
                        <TouchableOpacity onPress={() => setStatus("P")}>
                            <Text style={[styles.Elevation, styles.regilizationBtn, { color: (status === 'P' ? COLORS.white : COLORS.voilet), borderColor: (status === 'P' ? COLORS.white : COLORS.voilet), backgroundColor: (status === 'P' ? COLORS.voilet : COLORS.white) }]} >
                                Schedule Interview </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStatus("C")}>
                            <Text style={[styles.Elevation, styles.regilizationBtn, { color: (status === 'C' ? COLORS.white : COLORS.voilet), borderColor: (status === 'C' ? COLORS.white : COLORS.voilet), backgroundColor: (status === 'C' ? COLORS.voilet : COLORS.white) }]}>
                                Complete Interview </Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {/* ListView  */}
                <View style={{ flex: 1, flexDirection: 'row', padding: 8, justifyContent: 'space-between' }}>
                    <ScrollView >
                        {interViewDetail?.filter((item) => item.STATUS === status).map((item) => <CandidateList id={item.INTERVIEW_ID} name={item.CANDIDATE_NAME} designation={item.JOB_TITLE} resume={item.RESUME} startTime={item.SCHEDULE_TIME_FROM} endTime={item.SCHEDULE_TIME_TO} date={item.SCHEDULED_DATE} image={item.image} />)}
                    </ScrollView>
                </View>


            </View>
        </ScrollView >

    )
}

const styles = StyleSheet.create({
    regilizationBtn: {
        paddingHorizontal: 8,
        textAlign: 'center',
        color: 'white',
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 20,
        borderWidth: 1,
        paddingVertical: 8,
        fontSize: 12,
        fontWeight: 500
    },
    Elevation: {
        elevation: 7,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
})

export default Interview_status