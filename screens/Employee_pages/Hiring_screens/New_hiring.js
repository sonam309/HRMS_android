import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import COLORS from '../../../constants/theme'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Loader from '../../../components/Loader'

const New_hiring = (props) => {
    const { navigation } = props
    const [jobOpening, setJobOpening] = useState()
    const [loaderVisible, setLoaderVisible] = useState(true);
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
            console.log(error)
        }
    }

    useEffect(() => {
        getJobOpening();
    }, [])

    // Item Icon for each data item from job opening array
    function ListData(props) {
        const title = props.title, positions = props.opening, compensation = props.comp, location = props.location, upload = props.upload, experience = props.experience, Job_Desc = props.JD
        counting += 1;

        return (
            <View style={[{ margin: 10, paddingHorizontal: 20, paddingVertical: 5, borderColor: COLORS.gray, borderWidth: 1, borderRadius: 12, backgroundColor: 'white' }, styles.Elevation]}>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                    <View style={[{ justifyContent: 'center', backgroundColor: 'white', alignItems: 'center', width: 40, height: 40, borderRadius: 20 }, styles.Elevation]}>
                        <Text style={{ backgroundColor: COLORS.green, width: 36, height: 36, borderRadius: 18, textAlignVertical: 'center', textAlign: 'center' }}>{counting}</Text>
                    </View>

                    {/* major details -> Location,compensation */}
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: 'black', marginHorizontal: 5, fontSize: 15, fontWeight: 500 }}>{title}</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate("CreateNewJobOpening")} style={{ justifyContent: 'center' }} >
                <Text style={styles.ButtonStyle}>Create New Opening</Text>
            </TouchableOpacity>

            <ScrollView>
                <View>
                    {jobOpening ? jobOpening.map((item) => <ListData key={item.TXN_ID} title={item.DESIGNATION_NAME} opening={item.NO_OF_POSITION} comp={item.COMPENSATION} location={item.STATE_NAME} upload={item.CREATED_DATE} experience={item.MIN_EXP} JD={item.UPLOAD_JD_DOC} />) : <Text style={{ justifyContent: 'center' }}>No Data Found</Text>}
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

})

export default New_hiring

