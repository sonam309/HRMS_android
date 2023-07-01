import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';




const QualificationBottomView = (props) => {


    const [selectedState, setSelectedState] = useState();
    const [selectedStateValue, setSelectedStateValue] = useState('');

    const [states, setStates] = useState();
    const [selectCountry, setselectCountry] = useState();
    const [selecetCountryValue, setSelecetCountryValue] = useState('');
    const [country, setCountry] = useState();

    const [selectQualifications, setSelectQualifications] = useState();
    const [selecetQualificationsValue, setSelecetQualificationsValue] = useState('');
    const [Qualifications, setQualifications] = useState();

    const[selectedQualiMode,setSelectedQualiMode]=useState();
    const[selectedQualiModeValue,setSelectedQualiModeValue]=useState('');
    const[qulificationMode, setQualificationMode]=useState();

    const[selectedStream, setSelectedStream]=useState();
    const[selectedStreamValue,setSelectedStreamValue]=useState('');
    const[stream,setStream]=useState();

    const [isHighestQualification, setIsHighestQualification] = useState(false)


    useEffect(() => {
        getDropdownData(7);
        getDropdownData(4);
        getDropdownData(33);
        getDropdownData(34);
        getDropdownData(35)

    }, []);



    // Title, States and Employment Data
    const getDropdownData = async (P) => {
        let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
        response = await response.json();
        const returnedData = response;

        if (P === 7) {

            setStates(returnedData)

        } else if (P === 4) {

            setCountry(returnedData)

        }else if(P===33){

            setQualifications(returnedData)

        }else if(P===34){

            setQualificationMode(returnedData)

        }else if(P===35){

            setStream(returnedData)
        }

    }

     // getting state value
     const checkStreamValue = (value) => {
        {
            for (let index = 0; index < stream.length; index++) {
                const element = stream[index];
                if (element.PARAM_NAME === value) setSelectedStreamValue(element.PARAM_ID);
            }
        }
    }

    // getting state value
    const checkStateValue = (value) => {
        {
            for (let index = 0; index < states.length; index++) {
                const element = states[index];
                if (element.PARAM_NAME === value) setSelectedStateValue(element.PARAM_ID);
            }
        }
    }
    // getting country value
    const checkCountryValue = (value) => {
        {
            for (let index = 0; index < country.length; index++) {
                const element = country[index];
                if (element.PARAM_NAME === value) setSelecetCountryValue(element.PARAM_ID);
            }
        }
    }
    // getting Qualifications  value
    const checkQualificationsValue = (value) => {
        {
            for (let index = 0; index < Qualifications.length; index++) {
                const element = Qualifications[index];
                if (element.PARAM_NAME === value) setSelecetQualificationsValue(element.PARAM_ID);
            }
        }
    }

     // getting QualificationsMode  value
     const checkQualificationsModeValue = (value) => {
        {
            for (let index = 0; index < qulificationMode.length; index++) {
                const element = qulificationMode[index];
                if (element.PARAM_NAME === value) setSelectedQualiModeValue(element.PARAM_ID);
            }
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 150 }} >

                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ flex: 1, ...FONTS.h3, fontSize: 20, color: COLORS.black }}>Qualifications</Text>
                    <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={props.onPress}>
                            <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Qualifications dropdown */}
                <View style={{ height: 75, }}>

                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Qualifications</Text>
                    <SelectDropdown data={Qualifications?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectQualifications(value), checkQualificationsValue(value) }} defaultButtonText={Qualifications?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
                </View>

                {/* Stream dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>

                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Stream</Text>
                    <SelectDropdown data={stream?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedStream(value), checkStreamValue(value) }} defaultButtonText={stream?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
                </View>

                {/* Specialization dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>

                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Specialization</Text>
                    {/* <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText={states?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} /> */}

                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='' />
                </View>

                {/* University dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>

                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>University</Text>
                    {/* <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText={states?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} /> */}
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='' />
                </View>

                {/* Institute dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>

                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Institute</Text>
                    {/* <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText={states?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} /> */}

                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='Institute Name' />


                </View>

                {/* Qualifications mode dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>

                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Qualifications Mode</Text>
                    <SelectDropdown data={qulificationMode?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedQualiMode(value), checkQualificationsModeValue(value) }} defaultButtonText={qulificationMode?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
                </View>

                {/* Country dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>

                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Country</Text>
                    <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setselectCountry(value), checkCountryValue(value) }} defaultButtonText={country?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
                </View>

                {/* State dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>

                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>State</Text>
                    <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText={states?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
                </View>

                {/* City dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>

                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>City</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='City' />
                </View>

                {/* From year */}
                <View style={{ height: 75, marginTop: 10 }}>

                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>From Year</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='DD/mm/yyyy' />
                </View>

                {/* to year */}
                <View style={{ height: 75, marginTop: 10 }}>

                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>To Year</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='DD/mm/yyyy' />
                </View>

                {/* Passing year */}
                <View style={{ height: 75, marginTop: 10 }}>

                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Passing Year</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='DD/mm/yyyy' />
                </View>
                {/* hieghest Qualification check  */}
                <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center', }}>


                    <TouchableOpacity onPress={() => setIsHighestQualification(!isHighestQualification)}
                        style={{
                            alignItems: "center",
                            width: "90%",
                            padding: SIZES.base,
                            flexDirection: "row",
                            justifyContent: "space-between",

                        }} >
                        <Text style={{ color: COLORS.green, ...FONTS.body3, textAlign: 'center' }}>Is Highest setQualification</Text>
                        {/* <View style={{
                          
                            borderRadius: SIZES.radius*2,
                            borderWidth: isHighestQualification ? 2 : 0.5,
                            borderColor: isHighestQualification ? COLORS.orange1 : COLORS.orange1,
                            // backgroundColor: isHighestQualification ? COLORS.orange1 : COLORS.white,     
                        }} > */}
                        {isHighestQualification ? <Icons name='checkbox-marked-circle-outline' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
                        {/* </View> */}
                    </TouchableOpacity>

                </View>

                {/* save button */}
                <TouchableOpacity onPress={() => Alert.alert("Data Save Successfully")}>

                    <LinearGradient
                        colors={[COLORS.orange1, COLORS.disableOrange1]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 2, y: 0 }}

                        style={{ borderRadius: 8, padding: 8, marginTop: 20 }}

                    >
                        <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }} onPress={() => Alert.alert("Data Save Successfull")}>
                            Save
                        </Text>
                    </LinearGradient>

                </TouchableOpacity>




            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({

    inputHolder: {
        borderWidth: 1,
        borderColor: COLORS.black,
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
})

export default QualificationBottomView