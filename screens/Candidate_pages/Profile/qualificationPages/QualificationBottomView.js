import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';




const QualificationBottomView = (props) => {


    const [operFlag, setOperFlag] = useState("A");
    const [edit, setEdit] = useState({});

    const [selectedState, setSelectedState] = useState();
    const [selectedStateValue, setSelectedStateValue] = useState('');
    const [states, setStates] = useState();

    const [selectCountry, setselectCountry] = useState();
    const [selectedCountryValue, setSelecetCountryValue] = useState('');
    const [country, setCountry] = useState();

    const [selectQualifications, setSelectQualifications] = useState();
    const [selectedQualificationsValue, setSelectedQualificationsValue] = useState('');
    const [Qualifications, setQualifications] = useState();

    const [selectedQualiMode, setSelectedQualiMode] = useState();
    const [selectedQualiModeValue, setSelectedQualiModeValue] = useState('');
    const [qualificationMode, setQualificationMode] = useState();

    const [selectedStream, setSelectedStream] = useState();
    const [selectedStreamValue, setSelectedStreamValue] = useState('');
    const [stream, setStream] = useState();

    const [specilization, setSpecilization] = useState();
    const [University, setUniversity] = useState();
    const [institute, setInstitute] = useState();
    const [city, setCity] = useState();
    const [fromYear, setFromYear] = useState();
    const [toYear, setToYear] = useState();
    const [passYear, setPassingYear] = useState();

    const [isHighestQualification, setIsHighestQualification] = useState(false);
    const [error, setError] = useState('');
    const [TXNID, setTXNID] = useState('');
    



    useEffect(() => {
        getDropdownData(7);
        getDropdownData(4);
        getDropdownData(33);
        getDropdownData(34);
        getDropdownData(35);
        getData();

    }, []);

    const getData = () => {
        axios
            .post(`http://192.168.1.169:7038/api/hrms/candidateQualification`, {
                candidateId: 333,
                userId: 333,
                operFlag: 'V',
            })
            .then(response => {
                const returnedData = response?.data?.Result;
                console.log("getData", returnedData);
                const QualificationsDetailsRes = returnedData[0];
                const msg = returnedData[0].MSG
                ToastAndroid.show(msg, 5000);


                (QualificationsDetailsRes.FLAG === "S" ? setOperFlag("E") : setOperFlag("A"))
                setSpecilization(QualificationsDetailsRes?.SPECIALIZATION);
                setUniversity(QualificationsDetailsRes?.UNIVERSITY);
                setInstitute(QualificationsDetailsRes?.INSTITUTE);
                setCity(QualificationsDetailsRes?.CITY);
                setFromYear(QualificationsDetailsRes?.FROM_YEAR);
                setToYear(QualificationsDetailsRes?.TO_YEAR);
                setPassingYear(QualificationsDetailsRes?.PASS_YEAR);
                
                setIsHighestQualification(QualificationsDetailsRes?.IS_HIGHEST_QUALIFICATION);

                setSelectQualifications(QualificationsDetailsRes?.QUALIFICATIONS_NAME);
                setSelectedQualificationsValue(QualificationsDetailsRes?.QUALIFICATIONS_ID);

                setSelectedStream(QualificationsDetailsRes?.STREAM);
                setSelectedStreamValue(QualificationsDetailsRes?.STREAM_ID);

                setSelectedQualiMode(QualificationsDetailsRes?.QUALIFICATION_MODE);
                setSelectedQualiModeValue(QualificationsDetailsRes?.QUALIFICATION_MODE_ID);

                setselectCountry(QualificationsDetailsRes?.COUNTRY);
                setSelecetCountryValue(QualificationsDetailsRes?.COUNTRY_ID);

                setSelectedState(QualificationsDetailsRes?.STATE_NAME);
                setSelectedStateValue(QualificationsDetailsRes?.STATE_ID);
                setTXNID(QualificationsDetailsRes?.TXN_ID);

                setEdit(returnedData[0]);
                console.log("editdata", edit);
            })
            .catch(err => {
                console.log(err);
            });
    };


    const saveQualificationDetails = () => {

        const body = {
            txnId:TXNID,
            candidateId: 333,
            qualifications: selectedQualificationsValue,
            stream: selectedStreamValue,
            specilization: specilization,
            university: University,
            institute: institute,
            qualificatinMode: selectedQualiModeValue,
            country: selectedCountryValue,
            state: selectedStateValue,
            city: city,
            fromYear: fromYear,
            toYear: toYear,
            // fromMonth:,
            // toMonth:,
            passYear: passYear,
            isHighestQualification: isHighestQualification,
            // percentage:,
            userId: 333,
            operFlag: operFlag,

        }

        console.log("request", body);
        axios
            .post(`http://192.168.1.169:7038/api/hrms/candidateQualification`, body)
            .then(response => {
                const returnedData = response?.data?.Result;
                console.log("result..", returnedData);
                const msg = returnedData[0].MSG
                ToastAndroid.show(msg, 5000);
                { props.onPress }

            })
            .catch(err => {
                console.log(err);
            });

    };


    // Title, States and Employment Data
    const getDropdownData = async (P) => {
        let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
        response = await response.json();
        const returnedData = response;

        if (P === 7) {

            setStates(returnedData)

        } else if (P === 4) {

            setCountry(returnedData)

        } else if (P === 33) {

            setQualifications(returnedData)

        } else if (P === 34) {

            setQualificationMode(returnedData)

        } else if (P === 35) {

            setStream(returnedData)
        }

    }


    const selectedDropDownText = (id) => {
        if (id === "qualification") {
            return selectQualifications ? selectQualifications : Qualifications?.map(a => a.PARAM_NAME)[0]
        } else if (id === "Stream") {
            return selectedStream ? selectedStream : stream?.map(a => a.PARAM_NAME)[0]
        } else if (id === "QualificationMode") {
            return selectedQualiMode ? selectedQualiMode : qualificationMode?.map(a => a.PARAM_NAME)[0]
        } else if (id === "country") {
            return selectCountry ? selectCountry : country?.map(a => a.PARAM_NAME)[0]
        } else if (id === "state") {
            return selectedState ? selectedState : states ?. map(a => a.PARAM_NAME)[0]
        }

    }

    const selectDropDownValue = (id) => {
        if (id === "qualification") {
            return selectedQualificationsValue ? selectedQualificationsValue : Qualifications?.map(a => a.PARAM_ID)[0];
        } else if (id === "Stream") {
            return selectedStreamValue ? selectedStreamValue : stream?.map(a => a.PARAM_ID)[0]
        } else if (id === "QualificationMode") {
            return selectedQualiModeValue ? selectedQualiModeValue : qualificationMode?.map(a => a.PARAM_ID)[0]
        } else if (id === "country") {
            return selectedCountryValue ? selectedCountryValue : country?.map(a => a.PARAM_ID)[0]
        } else if (id === "state") {

            return selectedStateValue ? selectedStateValue : states ?. map(a => a.PARAM_ID)[0]
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
                if (element.PARAM_NAME === value) setSelectedQualificationsValue(element.PARAM_ID);
            }
        }
    }

    // getting QualificationsMode  value
    const checkQualificationsModeValue = (value) => {
        {
            for (let index = 0; index < qualificationMode.length; index++) {
                const element = qualificationMode[index];
                if (element.PARAM_NAME === value) setSelectedQualiModeValue(element.PARAM_ID);
            }
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
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
                    <SelectDropdown data={Qualifications?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectQualifications(value), checkQualificationsValue(value) }} defaultButtonText={selectedDropDownText("qualification")} defaultValueByIndex={selectDropDownValue("qualification")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
                </View>

                {/* Stream dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Stream</Text>
                    <SelectDropdown data={stream?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedStream(value), checkStreamValue(value) }} defaultButtonText={selectedDropDownText("Stream")} defaultValueByIndex={selectDropDownValue("Stream")}buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
                </View>
                {/* Specialization dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Specialization</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='' onChangeText={setSpecilization} value={specilization} />
                </View>
                {/* University dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>University</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='' onChangeText={setUniversity} value={University} />
                </View>
                {/* Institute dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Institute</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='Institute Name' onChangeText={setInstitute} value={institute} />
                </View>
                {/* Qualifications mode dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Qualifications Mode</Text>
                    <SelectDropdown data={qualificationMode?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedQualiMode(value), checkQualificationsModeValue(value) }} defaultButtonText={selectedDropDownText("QualificationMode")} defaultValueByIndex={selectDropDownValue("QualificationMode")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
                </View>
                {/* Country dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Country</Text>
                    <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setselectCountry(value), checkCountryValue(value) }} defaultButtonText={selectedDropDownText("country")} defaultValueByIndex={selectDropDownValue("country")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
                </View>
                {/* State dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>State</Text>
                    <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText={selectedDropDownText("state")} defaultValueByIndex={selectDropDownValue("state")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
                </View>
                {/* City dropdown */}
                <View style={{ height: 75, marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>City</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='City' onChangeText={setCity} value={city} />
                </View>
                {/* From year */}
                <View style={{ height: 75, marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>From Year</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='yyyy' onChangeText={setFromYear} value={fromYear} />
                </View>
                {/* to year */}
                <View style={{ height: 75, marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>To Year</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='yyyy' onChangeText={setToYear} value={toYear} />
                </View>
                {/* Passing year */}
                <View style={{ height: 75, marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Passing Year</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='yyyy' onChangeText={setPassingYear} value={passYear} />
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
                        style={{ borderRadius: 8, padding: 8, marginTop: 20 }}>
                        <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }} onPress={() => saveQualificationDetails()}> Save </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 350 }}></View>
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