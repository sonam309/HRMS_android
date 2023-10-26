import React, { useEffect, useState, useCallback, ActivityIndicator } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import COLORS from '../../../constants/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import candidateIcon from '../../../assets/images/candidateIcon.png'
import { useSelector } from 'react-redux'
import { FONTS } from '../../../constants/font_size'
import { useFocusEffect } from '@react-navigation/native';
import { API } from '../../../utility/services'
import Toast from 'react-native-toast-message';
import Loader from '../../../components/Loader'


const Interview_status = (props) => {
    const { navigation } = props;
    const [interViewDetail, setInterViewDetail] = useState([]);
    const [status, setStatus] = useState('P')
    const userId = useSelector(state => state.auth.userId)
    const [interviewType, setInterviewType] = useState('');
    const [loaderVisibility, setLoaderVisibility] = useState(false);

    // fetching interviewer's list data
    const fetchInterviewData = async () => {
        try {

            setLoaderVisibility(true);
            let res = await fetch(`${API}/api/User/InterviewList`, {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ operFlag: "V", userId: userId }),
            })
            res = await res.json()
            res = res.Result;
            setLoaderVisibility(false);
            // console.log("responseIStatus", res)
            setInterViewDetail(res)
            // setInterviewType(res.INTERVIEW_TYPE);
            // {console.log("InterviewTypesss",res.INTERVIEW_TYPE)}
        } catch (error) {
            setLoaderVisibility(false)
            Toast.show({
                type: 'error',
                text1: error
            })
        }
    };



    // useEffect(() => {
    //     fetchInterviewData();
    // }, [status])

    useFocusEffect(
        useCallback(() => {
            fetchInterviewData()
        }, [status])
    );
    // candidate icons 
    function CandidateList(props) {

        const interviewId = props.id, name = props.name, designation = props.designation, interviewStartTime = props.startTime, interviewEndTime = props.endTime, date = props.date, resume = props.resume, candidateId = props.cand_Id, interviewMail = props.mail, interviewType = props.interviewType,profilePic=props.profilePic



        return (
            <TouchableOpacity key={interviewId} style={{ padding: 4 }} onPress={() => navigation.navigate('Candidate_details', { resume, name, designation, date, interviewEndTime, interviewStartTime, status, candidateId, interviewId, interviewType, interviewMail,profilePic })}>
                {/* {console.log("TYpe", interviewType)} */}

                <View style={{ borderRadius: 15, backgroundColor: COLORS.white, flexDirection: 'row', height: 80, alignItems: 'center', elevation: 6, paddingHorizontal: 5, marginTop: 15, borderWidth: 0.5, borderColor: COLORS.gray }}>
                    <View>
                        <Image source={candidateIcon} style={{ width: 50, height: 50, }} />
                    </View>

                    <View style={{ paddingHorizontal: 10 }}>

                        <Text style={{ color: COLORS.green, ...FONTS.h3, }}>{name?.length < 15 ? `${name}` : `${name?.substring(0, 15)}...`}{' '}</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ flexDirection: 'row', }}>
                                {/* <Icon name="briefcase-variant-outline" color={COLORS.gray} size={20} /> */}
                                <Text style={{ color: COLORS.gray, fontSize: 13, ...FONTS.h5, }}>ID:</Text>
                                <Text style={{ color: COLORS.gray, fontSize: 13, ...FONTS.h5, }}> {candidateId}</Text>

                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                <Icon name="briefcase-variant-outline" color={COLORS.gray} size={20} />
                                <Text style={{ color: COLORS.gray, fontSize: 13, ...FONTS.h5, marginHorizontal: 1 }}> {designation.slice(0, 16)}</Text>
                            </View>
                        </View>
                        {date ? <Text style={{ color: COLORS.gray, ...FONTS.h5, marginTop: -5 }}>Scheduled:{date}</Text> : null}

                    </View>

                    <View style={{ position: 'absolute', right: 8 }}>
                        {interviewStartTime ? <Text style={{ backgroundColor: COLORS.disableGreen, borderColor: COLORS.green, borderWidth: 0.5, borderRadius: 10, textAlign: 'center', alignSelf: 'center', padding: 5, color: COLORS.green, ...FONTS.h5 }}>
                            {interviewStartTime} - {interviewEndTime}
                        </Text> : null}
                    </View>

                </View>

            </TouchableOpacity>
        )
    }

    return (
        <ScrollView>
            <Loader loaderVisible={loaderVisibility} />
            <View style={[{ backgroundColor: COLORS.white, flex: 1, margin: 10, padding: 4, borderRadius: 10, height: '100%' }, styles.Elevation]}>
                {/* top buttons */}
                <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10, }}>
                        <TouchableOpacity onPress={() => setStatus("P")}>
                            <Text style={[styles.Elevation, styles.regilizationBtn, { color: (status === 'P' ? COLORS.white : COLORS.orange), borderColor: (status === 'P' ? COLORS.white : COLORS.orange), backgroundColor: (status === 'P' ? COLORS.orange : COLORS.white) }]} >
                                Schedule Interview </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStatus("C")}>
                            <Text style={[styles.Elevation, styles.regilizationBtn, { color: (status === 'C' ? COLORS.white : COLORS.orange), borderColor: (status === 'C' ? COLORS.white : COLORS.orange), backgroundColor: (status === 'C' ? COLORS.orange : COLORS.white) }]}>
                                Complete Interview </Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {/* ListView  */}
                <View style={{ flex: 1, flexDirection: 'row', padding: 8, justifyContent: 'space-between' }}>
                    {interViewDetail[0]?.TXN_ID!==undefined&& interViewDetail[0]?.TXN_ID!==null?<ScrollView >
                       
                        {/* {console.log("sonnammmmmm",interViewDetail[0]?.TXN_ID)} */}
                        {interViewDetail?.filter((item) => item.STATUS === status).map((item) => <CandidateList key={item.TXN_ID} id={item.INTERVIEW_ID} cand_Id={item.CANDIDATE_ID} name={item.CANDIDATE_NAME} designation={item.JOB_TITLE} resume={item.RESUME} mail={item.INTERVIEW_MAIL} interviewType={item.INTERVIEW_TYPE} startTime={item.SCHEDULE_TIME_FROM} endTime={item.SCHEDULE_TIME_TO} date={item.SCHEDULED_DATE} image={item.image} profilePic={item.PROFILE_PIC} />)}
                    </ScrollView>:
                    <View style={{justifyContent:'center',alignItems:'center',width:'100%'}} >
                        <Text style={{color:COLORS.black,textAlign:'center',...FONTS.h2,marginTop:240,marginBottom:240}}>
                            No data Found!
                        </Text>
                        </View>}
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