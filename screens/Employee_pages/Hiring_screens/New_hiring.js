import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Loader from '../../../components/Loader'
import { COLORS } from '../../../constants/theme'

const New_hiring = (props) => {
    const { navigation, selectedOption } = props
    const [jobOpening, setJobOpening] = useState()
    const [loaderVisible, setLoaderVisible] = useState(true);
    const [statusColor, setStatusColor] = useState(COLORS.voilet)
    let counting = 0;

    // all job opening data
    const getJobOpening = async () => {
        try {
            var formData = new FormData();
            formData.append('data', JSON.stringify({ "operFlag": "V", "userId": "10011" }))
            let res = await fetch("https://econnectsatya.com:7033/api/hrms/jobOpeningRequest", {
                method: "POST",
                body: formData
            })
            res = await res?.json();
            res = await res?.Result
            setJobOpening(res);
            setLoaderVisible(false)
        } catch (error) {
            console.log("this is the error",error)
        }
    }

    useEffect(() => {
        getJobOpening();
    }, [])

    // Item Icon for each data item from job opening array
    function ListData(props) {
        const title = props.title, positions = props.opening, compensation = props.comp, location = props.location, upload = props.upload, experience = props.experience, Job_Desc = props.JD, job_status = props.status
        counting += 1;

        switch (job_status) {
            case 'Pending':
                setStatusColor(COLORS.orange);
                break;
            case 'Rejected':
                setStatusColor(COLORS.red);
                break;
            case 'Open':
                setStatusColor(COLORS.green);
                break;
            case 'On Hold':
                setStatusColor(COLORS.lightYellow);
                break;
            case 'Filled':
                setStatusColor(COLORS.lighterVoilet);
                break;
            case 'Draft':
                setStatusColor(COLORS.lightBlue);
                break;
            case 'Deleted':
                setStatusColor(COLORS.lightPink);
                break;
            case 'Cancelled':
                setStatusColor(COLORS.gray);
                break;
        }
        return (
            <View style={[{ margin: 10, paddingHorizontal: 20, paddingVertical: 5, borderColor: COLORS.gray, borderWidth: 1, borderRadius: 12, backgroundColor: 'white' }, styles.Elevation]}>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                    <View style={[{ justifyContent: 'center', backgroundColor: 'white', alignItems: 'center', width: 40, height: 40, borderRadius: 20 }, styles.Elevation]}>
                        <Text style={{ backgroundColor: COLORS.green, width: 36, height: 36, borderRadius: 18, textAlignVertical: 'center', textAlign: 'center' }}>{counting}</Text>
                    </View>

                    {/* major details -> Location,compensation */}
                    <View style={{ justifyContent: 'space-between' }}>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'black', marginHorizontal: 5, fontSize: 15, fontWeight: 500 }}>{title}</Text>
                            {job_status && <Text style={[{ backgroundColor: statusColor }, styles.categoryTag]}>{job_status}</Text>}
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'black', marginHorizontal: 5 }}><Icons name='map-marker-outline' color={COLORS.gray} size={20} /> {location}</Text>
                            <Text style={{ color: 'black', marginHorizontal: 5 }}><Icons name='account-outline' color={COLORS.gray} size={20} /> {positions} Opening</Text>
                            <Text style={{ color: 'black', marginHorizontal: 5 }}><Icons name='cash' color={COLORS.gray} size={20} /> {compensation}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'black', marginHorizontal: 5 }}><Icons name='briefcase-variant-outline' color={COLORS.gray} size={20} />{experience} years of experience</Text>
                        </View>
                    </View>

                </View>
                {/* Job description */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                    <Text>{upload}</Text>
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
            <View style={styles.newJobOpeneingTxt}>
                <Text style={{ color: COLORS.green, fontSize: 20, fontWeight: '500', textAlignVertical: 'center', padding: 5 }}>Post a New Job</Text>
            </View>

            <ScrollView>
                <View>
                    {selectedOption ?
                        (jobOpening?.filter((items) => items.JOB_STATUS === selectedOption).length > 0 ? (jobOpening?.filter((items) => items.JOB_STATUS === selectedOption)?.map((item) =>
                            <ListData key={item.TXN_ID} status={item.JOB_STATUS} title={item.DESIGNATION_NAME} opening={item.NO_OF_POSITION} comp={item.COMPENSATION} location={item.STATE_NAME} upload={item.CREATED_DATE} experience={item.MIN_EXP} JD={item.UPLOAD_JD_DOC} />))
                            : <Text style={{ textAlign: 'center', paddingVertical: 10 }}>No Data Entry Found</Text>) :
                        (jobOpening ? jobOpening?.map((item) =>
                            <ListData key={item.TXN_ID} status={item.JOB_STATUS} title={item.DESIGNATION_NAME} opening={item.NO_OF_POSITION} comp={item.COMPENSATION} location={item.STATE_NAME} upload={item.CREATED_DATE} experience={item.MIN_EXP} JD={item.UPLOAD_JD_DOC} />)
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
        justifyContent: 'center'
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
        paddingHorizontal: 10,
        paddingVertical: 1,
        // marginRight: -5,
        borderRadius: 10,
        // position:'absolute',
        // right:-10

    }
})

export default New_hiring

