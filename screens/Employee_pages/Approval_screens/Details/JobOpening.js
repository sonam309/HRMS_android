import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import Loader from '../../../../components/Loader'
import COLORS from '../../../../constants/theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from 'react-native-vector-icons/FontAwesome'

const JobOpening = (props) => {
    const { jobId, navigation, action } = props
    const [loaderVisible, setLoaderVisible] = useState(true);
    const [jobOpeningData, setJobOpeningData] = useState(null);
    const [disableBtn, setDisableBtn] = useState(false);

    useEffect(() => {
        getJobOpeningData()
    }, [])


    // Fetching data for new job opening
    const getJobOpeningData = async () => {
        let res = await fetch(`https://econnectsatya.com:7033/api/getJobs?jobStatus=0&jobId=${jobId}&leadId&userId`)
        // console.warn(jobId);
        res = await res?.json();
        res = await res?.Table[0];
        setJobOpeningData(res);
        setLoaderVisible(false)
        // console.warn(res);
    }

    const jobOpeningAction = async (opr) => {

        let jobInfodata = { oper: opr, jobId: jobId };
        jobInfodata = JSON.stringify(jobInfodata)
        console.log(jobInfodata)
        try {
            let res = await fetch("https://econnectsatya.com:7033/api/createNewJob", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: jobInfodata
            })

            res = await res.json();
            res = res?.Result;
            console.log("this is response from backend", res)

            ToastAndroid.show(res[0].MSG, 3000)
            setDisableBtn(true);

        } catch (error) {
            console.log("error", error)
        }
    };

    return (
        <>

            <ScrollView style={{ backgroundColor: COLORS.white, padding: 10, flex: 1 }}>
                <Loader loaderVisible={loaderVisible} />
                {/* Top Icon */}
                <View style={styles.topIcon}>

                    <View style={[{ backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30 }]}>
                        <Icons name='building-o' color={COLORS.white} size={35} />
                    </View>

                </View>

                {/* Position */}
                <Text style={{ paddingVertical: 10, textAlign: 'center', fontWeight: 500, fontSize: 20, color: COLORS.voilet }}>{jobOpeningData?.JOB_TITLE}</Text>

                {/* Location & Job type */}
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ paddingHorizontal: 2, textAlignVertical: 'center', fontSize: 16 }}> <MaterialIcons name='location-pin' size={20} color={COLORS.lightBlue} /> {jobOpeningData?.CITY}<Text style={{ fontWeight: 700 }}>  ∙</Text></Text>

                    <Text style={{ paddingHorizontal: 2, textAlignVertical: 'center', fontSize: 16 }}> <MaterialCommunityIcons name='office-building-outline' size={20} color={COLORS.red} /> {jobOpeningData?.DEPARTMENT_NAME}<Text style={{ fontWeight: 700 }}>  ∙</Text></Text>

                    <Text style={{ paddingHorizontal: 2, textAlignVertical: 'center', fontSize: 16 }}> <MaterialIcons name='pending-actions' color={COLORS.pink} size={20} /> {jobOpeningData?.JOB_STATUS}</Text>

                </View>


                {/* Basic Info -> No. of position, Job type, Compensation */}
                <View style={{ borderWidth: 1, borderColor: COLORS.lightGray, marginVertical: 5, paddingVertical: 15, paddingHorizontal: 10, borderRadius: 12 }}>

                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Icons name='briefcase' size={25} color={COLORS.purple} />
                            <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Opening</Text>
                            <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>{jobOpeningData?.NO_OF_POSITIONS}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <MaterialCommunityIcons name='clock' size={25} color={COLORS.lightOrange} />
                            <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Job Type</Text>
                            <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>{jobOpeningData?.E_TYPE}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={{ backgroundColor: COLORS.lightGreen, width: 25, borderRadius: 12.5, height: 25, padding: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Icons name='rupee' size={25} />
                            </View>
                            <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Compensation</Text>
                            <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>Rs. {jobOpeningData?.COMPENSATION}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <MaterialCommunityIcons name='cash-check' color={COLORS.red} size={30} />
                            <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Budget</Text>
                            <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>{jobOpeningData?.BUDGET}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <MaterialIcons name='pending-actions' color={COLORS.pink} size={30} />
                            <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Job Status</Text>
                            <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>{jobOpeningData?.JOB_STATUS1}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={{ backgroundColor: COLORS.lightGreen, width: 30, borderRadius: 15, height: 30, padding: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons name='apache-kafka' size={28} />
                            </View>
                            <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Experience</Text>
                            <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}> {jobOpeningData?.EXPERIENCE} years</Text>
                        </View>
                    </View>

                </View>

                {/* More details -> Posted by, Location, experience, Date Posted */}
                <View style={{ paddingVertical: 15, paddingHorizontal: 10, marginVertical: 15, borderRadius: 12, borderWidth: 1, borderColor: COLORS.lightGray }}>

                    <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Hiring Lead</Text>
                    <Text style={{ color: COLORS.black, fontWeight: 500, paddingVertical: 5, borderBottomWidth: 1, borderColor: COLORS.lightGray }}>{jobOpeningData?.HIRING_LEAD_NAME}</Text>


                    <Text style={{ marginTop: 10, paddingVertical: 5, fontWeight: 500 }}>Address</Text>
                    <Text style={{ color: COLORS.black, fontWeight: 500, paddingVertical: 5, borderBottomWidth: 1, borderColor: COLORS.lightGray }}>{jobOpeningData?.CITY}, {jobOpeningData?.PROVINCE_NAME}, {jobOpeningData?.COUNTRY_NAME}</Text>

                    <Text style={{ marginTop: 10, paddingVertical: 5, fontWeight: 500 }}>Job Remarks</Text>
                    <Text style={{ color: COLORS.black, fontWeight: 500 }}>{jobOpeningData?.JOB_DESC}</Text>
                </View>
            </ScrollView>

            {action === 'P' && <View style={styles.footerDesign}>
                <TouchableOpacity disabled={disableBtn} onPress={() => jobOpeningAction('C')} style={[{ backgroundColor: disableBtn ? COLORS.disableGreen : COLORS.green }, styles.buttonStyle]}>

                    <MaterialCommunityIcons name="check-circle-outline" size={20} color={COLORS.white} />
                    <Text style={{ color: COLORS.white, fontWeight: '600', }}> Approve </Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => jobOpeningAction('R')} disabled={disableBtn} style={[{ backgroundColor: disableBtn ? COLORS.disableRed : COLORS.red }, styles.buttonStyle]}>
                    <MaterialCommunityIcons name="close-circle-outline" size={20} color={COLORS.white} />
                    <Text style={{ color: COLORS.white, fontWeight: '600', }}> Reject </Text>
                </TouchableOpacity>
            </View>}

        </>
    )

}

const styles = StyleSheet.create({
    topIcon: {
        backgroundColor: COLORS.skyBlue,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        marginVertical: 5
    },
    footerDesign: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        height: 80,
        backgroundColor: COLORS.white,
        justifyContent: 'flex-end',
        borderTopColor: COLORS.orange,
        borderTopWidth: 1
    },
    buttonStyle: {
        padding: 12,
        marginLeft: 24,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})

export default JobOpening