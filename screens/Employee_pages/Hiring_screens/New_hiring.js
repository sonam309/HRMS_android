import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ToastAndroid, Image } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Loader from '../../../components/Loader'
import { COLORS } from '../../../constants/theme'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { API } from '../../../utility/services'
import { tag } from '../../../assets'
import { FONTS, SIZES } from '../../../constants/font_size'

const New_hiring = (props) => {
    const { navigation, selectedOption, setFilterVisible } = props
    const [jobOpening, setJobOpening] = useState()
    const [loaderVisible, setLoaderVisible] = useState(true);
    let bannerColor;
    let counting = 0;
    const userId = useSelector(state => state.auth.userId)
    const route = useRoute();

    console.log("route", route.name)

    if (route.name === "New_hiring") { setFilterVisible(true), console.log("object") }


    // useEffect(() => {
    //     getJobOpening();
    // }, [])

    useFocusEffect(
        useCallback(() => {
            setLoaderVisible(true)
            getJobOpening()
        }, [])
    );

    // all job opening data
    const getJobOpening = async () => {
        try {
            var formData = new FormData();
            formData.append('data', JSON.stringify({ "operFlag": "V", "userId": userId }))
            let res = await fetch(`${API}/api/hrms/jobOpeningRequest`, {
                method: "POST",
                body: formData
            })
            res = await res?.json();

            console.log("jobinfo", res)
            res = await res?.Table
            setJobOpening(res);
            setLoaderVisible(false)
        } catch (error) {
            console.log("this is the error", error)
        }
    }

    // Item Icon for each data item from job opening array
    function ListData(props) {
        const title = props.title, positions = props.opening, compensation = props.comp, location = props.location, upload = props.upload, experience = props.experience, Job_Desc = props.JD, job_status = props.status,HIRING_LEAD=props.hiringLeadId,HIRING_LEAD_NAME=props.hiringLeadName
        counting += 1;

        switch (job_status) {
            case 'Pending':
                bannerColor = (COLORS.orange);
                break;
            case 'Rejected':
                bannerColor = (COLORS.red);
                break;
            case 'Open':
                bannerColor = (COLORS.green);
                break;
            case 'On Hold':
                bannerColor = (COLORS.lightYellow);
                break;
            case 'Filled':
                bannerColor = (COLORS.lighterVoilet);
                break;
            case 'Draft':
                bannerColor = (COLORS.lightBlue);
                break;
            case 'Deleted':
                bannerColor = (COLORS.lightPink);
                break;
            case 'Cancelled':
                bannerColor = (COLORS.gray);
                break;
            case 'Closed':
                bannerColor = (COLORS.red);
                break
        }
        return (
            <View style={[{ margin: 10, paddingLeft: 10, paddingVertical: 5, borderColor: COLORS.lightGray, borderWidth: 1, borderRadius: 12, backgroundColor: 'white', overflow: 'hidden' }, styles.Elevation]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                    <View style={[{ justifyContent: 'center', backgroundColor: 'white', alignItems: 'center', width: 40, height: 40, borderRadius: 20, marginHorizontal: 5 }, styles.Elevation]}>
                        <Text style={{ backgroundColor: COLORS.green, width: 36, height: 36, borderRadius: 18, textAlignVertical: 'center', textAlign: 'center' }}>{counting}</Text>
                    </View>
                    {/* {job_status && <Text style={[{ backgroundColor: bannerColor }, styles.categoryTag]}>{job_status}</Text>} */}
                    {job_status && (
                        <>
                            <Image
                                source={tag}
                                style={{
                                    position: 'absolute',
                                    height: 25,
                                    top: -4,
                                    tintColor: bannerColor,
                                    transform: [{ scaleX: -1 }],
                                    right: SIZES.padding,
                                }}
                            />
                            <View
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: -4,
                                    backgroundColor: bannerColor,
                                    padding: SIZES.base / 5,
                                    height: 25,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                <Text
                                    style={{
                                        paddingRight: SIZES.base,
                                        ...FONTS.body4,
                                        color: COLORS.white,
                                    }}>
                                    {job_status}
                                </Text>
                            </View>
                        </>
                    )}

                    {/* major details -> Location,compensation */}
                    <View style={{ justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'black', marginHorizontal: 5, fontSize: 14, fontWeight: 500 }}>{title}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                            <Text style={{ color: 'black', marginHorizontal: 2, fontSize: 14 }}><Icons name='map-marker-outline' color={COLORS.gray} size={16} />{location}</Text>
                            <Text style={{ color: 'black', marginHorizontal: 2, fontSize: 14 }}><Icons name='account-outline' color={COLORS.gray} size={16} />{positions} Opening</Text>
                            <Text style={{ color: 'black', marginHorizontal: 2, fontSize: 14 }}><Icons name='cash' color={COLORS.gray} size={16} />{compensation}</Text>
                            <Text style={{ color: 'black', marginHorizontal: 2, fontSize: 14 }}><Icons name='briefcase-variant-outline' color={COLORS.gray} size={16} />{experience} years of experience</Text>
                        </View>
                        {/* hiring Lead */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                            <Text style={{ color: 'black', marginHorizontal: 2, fontSize: 14 }}><Icons name='account-outline' color={COLORS.gray} size={16} />{HIRING_LEAD!==null?HIRING_LEAD_NAME+"("+HIRING_LEAD+")":"-"}</Text>
                        </View>
                    </View>

                </View>
                {/* Job description */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',  paddingHorizontal: 10 }}>
                    <Text style={{color:COLORS.darkGray2,...FONTS.h5}}>
                        {upload}
                        {/* {console.log("sendData",Job_Desc)} */}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Job_Description", { Job_Desc })}>
                        <Text style={{ color: COLORS.green, fontWeight: 500 }}>View JD {'>'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Loader loaderVisible={loaderVisible} />

            {/* Posting a new Job */}
            <TouchableOpacity style={styles.newJobOpeneingTxt} onPress={() => navigation.navigate('CreateNewJobOpening')}>
                <Text style={{ color: COLORS.green, fontSize: 16, borderRadius: 12, marginTop: 10, fontWeight: '500', borderColor: COLORS.green, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8 }}>
                    <Icons name='book-plus-outline' color={COLORS.green} size={20} />
                    Post a New Job</Text>
            </TouchableOpacity>

            <ScrollView>
                <View>
                    {selectedOption ?
                        (jobOpening?.filter((items) => items.JOB_STATUS === selectedOption).length > 0 ? (jobOpening?.filter((items) => items.JOB_STATUS === selectedOption)?.map((item) =>
                            <ListData key={item.TXN_ID} status={item.JOB_STATUS} title={item.DESIGNATION_NAME} opening={item.NO_OF_POSITION} comp={item.COMPENSATION} location={item.STATE_NAME} upload={item.CREATED_DATE} experience={item.MIN_EXP} JD={item.UPLOAD_JD_DOC} hiringLeadId={item.HIRING_LEAD} />))
                            : <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No Data Entry Found</Text>) :
                        (jobOpening ? jobOpening?.map((item) =>
                            <ListData key={item.TXN_ID} status={item.JOB_STATUS} title={item.DESIGNATION_NAME} opening={item.NO_OF_POSITION} comp={item.COMPENSATION} location={item.STATE_NAME} upload={item.CREATED_DATE} experience={item.MIN_EXP} JD={item.UPLOAD_JD_DOC} hiringLeadId={item.HIRING_LEAD} hiringLeadName={item.HIRING_LEAD_NAME}/>)
                            : <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No Data Entry Found</Text>)
                    }
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({

    ButtonStyle: {
        textAlign: 'center',
        backgroundColor: COLORS.voilet,
        color: COLORS.white,
        padding: 6,
        marginHorizontal: 60,
        marginTop: 15,
        fontSize: 15,
        borderRadius: 20,
    },
    newJobOpeneingTxt: {
        padding: 10,
        fontSize: 14,
        fontWeight: '500',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 0
    },
    Elevation: {
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    categoryTag: {
        color: 'white',
        paddingHorizontal: 12,
        paddingVertical: 1,
        marginRight: -8,
        borderRadius: 10,
        position: 'absolute',
        right: 0,
        top: -2

    }
})

export default New_hiring