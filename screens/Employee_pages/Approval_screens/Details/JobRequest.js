import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import Loader from '../../../../components/Loader'
import COLORS from '../../../../constants/theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import SelectDropdown from 'react-native-select-dropdown';


const JobRequest = (props) => {
    const { jobId, navigation, action } = props
    const [loaderVisible, setLoaderVisible] = useState(true);
    const [jobRequestData, setJobRequestData] = useState(null);
    const userId = useSelector(state => state.auth.userId)
    const [disableBtn, setDisableBtn] = useState(false);

    // Title, States and Employment Data
    const getDropdownData = async (P) => {
        let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
        response = await response.json();
        const returnedData = response;

        if (P === 'L') {
            setHiringLead(returnedData)
        }
    }

    const [hirningLead, setHiringLead] = useState();
    const [selectedhirningLead, setSelectedHiringLead] = useState();
    const [selectedHiringLeadValue, setSelectedHiringLeadValue] = useState('');

    // getting state value
    const checkHiringLeadValue = (value) => {
        {
            for (let index = 0; index < hirningLead.length; index++) {
                const element = hirningLead[index];
                if (element.PARAM_NAME === value) setSelectedHiringLeadValue(element.PARAM_ID);
            }
        }
    }

    const selectedDropDownText = (id) => {
        if (id === "hiringLead") {
            return jobRequestData.HIRING_LEAD_NAME ? jobRequestData.HIRING_LEAD_NAME : hirningLead?.map(a => a.PARAM_NAME)[0]
        }
    }

    const selectDropDownValue = (id) => {
        if (id === "hiringLead") {
            return jobRequestData.HIRING_LEAD ? jobRequestData.HIRING_LEAD : hirningLead?.map(a => a.PARAM_ID)[0];
        }
    }

    const getJobRequestData = async () => {
        let formData = new FormData();
        formData.append('data', JSON.stringify({ operFlag: "V", txnId: jobId, userId: userId }))
        console.log("first", formData._parts)
        let res = await fetch("https://econnectsatya.com:7033/api/hrms/jobOpeningRequest", {
            method: "POST",
            body: formData
        })
        res = await res?.json()
        // console.log("after", res)
        res = await res?.Table[0]
        console.log("responsedataJob req",res)
        setJobRequestData(res)
        setLoaderVisible(false)
        // console.log("job request", res);
    }

    useEffect(() => {
        getDropdownData('L')
        getJobRequestData()
    }, [])

    const jobRequestAction = async (opr) => {
        // console.warn("opr flag", opr);
        var formData = new FormData();
        formData.append('data', JSON.stringify({ operFlag: opr, txnId: jobId, jobLeadId: selectedHiringLeadValue }),);

        try {
            let res = await fetch("https://econnectsatya.com:7033/api/hrms/jobOpeningRequest", {
                method: "POST",
                body: formData

            })
            res = await res.json();
            console.log("before", res);

            ToastAndroid.show(res.MSG, 3000)
            setDisableBtn(true);

            if (res.FLAG === "S") {
                props.navigation.goBack()
            }

        } catch (error) {
            console.log(error)
        }
    };


    let JD = jobRequestData?.UPLOAD_JD_DOC
    return (jobRequestData !== null ? (
        <>
            <ScrollView style={{ backgroundColor: COLORS.white, padding: 10, flex: 1 }}>
                <Loader loaderVisible={loaderVisible} />
                {/* Top Icons */}
                <View style={styles.topIcon}>

                    <View style={[{ backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30 }]}>
                        <Icons name='building-o' color={COLORS.white} size={35} />
                    </View>

                </View>

                {/* Position */}
                <Text style={{ paddingVertical: 10, textAlign: 'center', fontWeight: 500, fontSize: 20, color: COLORS.voilet }}>{jobRequestData?.DESIGNATION_NAME}</Text>

                {/* Location & Job type */}
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ paddingHorizontal: 2, textAlignVertical: 'center', fontSize: 17 }}> <MaterialIcons name='location-pin' size={20} color={COLORS.lightBlue} /> {jobRequestData?.CITY}<Text style={{ fontWeight: 700 }}>  ∙</Text></Text>

                    <Text style={{ paddingHorizontal: 2, textAlignVertical: 'center', fontSize: 17 }}> <MaterialCommunityIcons name='office-building-outline' size={20} color={COLORS.red} /> {jobRequestData?.DPET_NAME}<Text style={{ fontWeight: 700 }}>  ∙</Text></Text>

                    <Text style={{ paddingHorizontal: 2, textAlignVertical: 'center', fontSize: 17 }}> <MaterialCommunityIcons name='clock' size={20} color={COLORS.lightOrange} /> {jobRequestData?.JOB_STATUS}</Text>

                </View>


                {/* Basic Info -> No. of position, Job type, Compensation */}
                <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: COLORS.lightGray, marginVertical: 5, paddingVertical: 15, paddingHorizontal: 10, borderRadius: 12 }}>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Icons name='briefcase' size={25} color={COLORS.purple} />
                        <Text style={{ paddingVertical: 5, fontWeight: 500 }}>No. of Positions</Text>
                        <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>{jobRequestData?.NO_OF_POSITION}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <MaterialCommunityIcons name='clock' size={25} color={COLORS.lightOrange} />
                        <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Job Type</Text>
                        <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>{jobRequestData?.EMPLOYMENT_TYPE}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ backgroundColor: COLORS.lightGreen, width: 25, borderRadius: 12.5, height: 25, padding: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Icons name='rupee' size={25} />
                        </View>
                        <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Compensation</Text>
                        <Text style={{ paddingTop: 5, fontWeight: 500, color: COLORS.black }}>Rs. {jobRequestData?.COMPENSATION}</Text>
                    </View>
                </View>


                {/* More details -> Posted by, Location, experience, Date Posted */}
                <View style={{ paddingVertical: 15, paddingHorizontal: 10, marginVertical: 15, borderRadius: 12, borderWidth: 1, borderColor: COLORS.lightGray }}>

                    {/* <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Hiring Lead</Text>
                <Text style={{ color: COLORS.black, fontWeight: 500, paddingVertical: 5, borderBottomWidth: 1, borderColor: COLORS.lightGray }}>{jobRequestData?.HIRING_LEAD_NAME}</Text> */}

                    <View style={{ height: 75, }}>
                        <Text style={{ paddingVertical: 5, fontWeight: 500 }}>Hiring Lead</Text>
                        <SelectDropdown data={hirningLead?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedHiringLead(value), checkHiringLeadValue(value) }} defaultButtonText={selectedDropDownText("hiringLead")} defaultValueByIndex={selectDropDownValue("hiringLead")} buttonTextStyle={{ fontSize: 15, color: COLORS.black }} />
                    </View>


                    <Text style={{ marginTop: 10, paddingVertical: 5, fontWeight: 500 }}>Minimum Experience </Text>
                    <Text style={{ color: COLORS.black, fontWeight: 500, paddingVertical: 5, borderBottomWidth: 1, borderColor: COLORS.lightGray }}>{jobRequestData?.MIN_EXP} years</Text>

                    <Text style={{ marginTop: 10, paddingVertical: 5, fontWeight: 500 }}>Location</Text>
                    <Text style={{ color: COLORS.black, fontWeight: 500, paddingVertical: 5, borderBottomWidth: 1, borderColor: COLORS.lightGray }}>{jobRequestData?.CITY}, {jobRequestData?.STATE_NAME}, {jobRequestData?.POSTAL_CODE}</Text>

                    <Text style={{ marginTop: 10, paddingVertical: 5, fontWeight: 500 }}>Date Posted:</Text>
                    <Text style={{ color: COLORS.black, fontWeight: 500 }}>{jobRequestData?.CREATED_DATE}</Text>
                </View>

                {/* More about the job */}
                <Text style={{ fontWeight: 600, fontSize: 20, color: COLORS.black }}>Job Remarks</Text>
                <Text>{jobRequestData?.JOB_DESCRIPTION}</Text>

                {/* Job desciption */}
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black }}>Job Description</Text>
                    <TouchableOpacity style={{ backgroundColor: COLORS.lightGreen, height: 50, borderRadius: 12, padding: 10, marginVertical: 5, justifyContent: 'center' }} onPress={() => navigation.navigate('Job Desc', { JD })}>
                        <Text >{jobRequestData?.UPLOAD_JD_DOC} </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            {action === 'P' && <View style={styles.footerDesign}>
                <TouchableOpacity disabled={disableBtn} onPress={() => jobRequestAction('C')} style={[{ backgroundColor: disableBtn ? COLORS.disableGreen : COLORS.green }, styles.buttonStyle]}>

                    <MaterialCommunityIcons name="check-circle-outline" size={20} color={COLORS.white} />
                    <Text style={{ color: COLORS.white, fontWeight: '600', }}> Approve </Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => jobRequestAction('R')} disabled={disableBtn} style={[{ backgroundColor: disableBtn ? COLORS.disableRed : COLORS.red }, styles.buttonStyle]}>
                    <MaterialCommunityIcons name="close-circle-outline" size={20} color={COLORS.white} />
                    <Text style={{ color: COLORS.white, fontWeight: '600', }}> Reject </Text>
                </TouchableOpacity>
            </View>}
        </>
    ) : <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>No Data to Display</Text>)
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

    inputHolder: {
        borderWidth: 1,
        borderColor: COLORS.gray,
        flex: 1,
        borderRadius: 10,
        marginHorizontal: 0,
        marginVertical: 5,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },

    buttonStyle: {
        padding: 12,
        marginLeft: 24,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
})

export default JobRequest