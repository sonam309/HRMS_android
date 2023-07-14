import { View, Text, ScrollView, TextInput, StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-native-date-picker'
import COLORS from '../../../../constants/theme'
import { useSelector } from 'react-redux'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Loader from '../../../../components/Loader'
import { FONTS } from '../../../../constants/font_size'


const PersonalBottomView = ({ filledDetails, onPress }) => {
    const userId = useSelector(state => state.candidateAuth.candidateId)

    const [marital, setMarital] = useState();
    const [selectedMarital, setSelectedMarital] = useState();
    const [selectedMaritalValue, setSelectedMaritalValue] = useState();

    const [bloodGroup, setBloodGroup] = useState();
    const [selectedBloodGroup, setSelectedBloodGroup] = useState();
    const [selectedBloodGroupValue, setSelectedBloodGroupValue] = useState();

    const [caste, setCaste] = useState();
    const [selectedCaste, setSelectedCaste] = useState();
    const [selectedCasteValue, setSelectedCasteValue] = useState();

    const [gender, setGender] = useState();
    const [selectedGender, setSelectedGender] = useState();
    const [selectedGenderValue, setSelectedGenderValue] = useState();


    const getDropdownData = async (P) => {
        let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
        response = await response.json();
        const returnedData = response;
        // console.warn(returnedData);
        if (P === 18) { setGender(returnedData) }
        else if (P === 30) { setMarital(returnedData) }
        else if (P === 31) { setBloodGroup(returnedData) }
        else { setCaste(returnedData) }
    }

    useEffect(() => {
        DisplayPreviousDetails();
        getDropdownData(18);
        getDropdownData(30);
        getDropdownData(31);
        getDropdownData(32);
    }, [])

    const [refAddressHeight, setRefAddressHeight] = useState(40)
    const [refAddressHeight1, setRefAddressHeight1] = useState(40)
    const [pLocationHeight, setPLocationHeight] = useState(40)
    const [cLocationHeight, setCLocationHeight] = useState(40)

    const [salutation, setSalutation] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fatherName, setFatherName] = useState('');

    const [actualBirthDate, setActualBirthDate] = useState(new Date());
    const [selectedActualBirthDate, setSelectedActualBirthDate] = useState('');
    const [actualOpen, setActualOpen] = useState(false)

    const [recordBirthDate, setRecordBirthDate] = useState(new Date());
    const [selectedRecordBirthDate, setSelectedRecordBirthDate] = useState('');
    const [recordOpen, setRecordOpen] = useState(false)

    const [countryBirth, setCountryBirth] = useState('');
    const [placeBirth, setPlaceBirth] = useState('');
    const [identityMarks, setIdentityMarks] = useState('');
    const [marriageDate, setMarriageDate] = useState('');
    const [preferredLocation, setPreferredLocation] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [resumeSource, setResumeSource] = useState('');

    const [refEmail, setRefEmail] = useState('');
    const [refEmail1, setRefEmail1] = useState('');

    const [refName, setRefName] = useState('');
    const [refName1, setRefName1] = useState('');

    const [refOccupation, setRefOccupation] = useState('');
    const [refOccupation1, setRefOccupation1] = useState('');

    const [refAddress, setRefAddress] = useState('');
    const [refAddress1, setRefAddress1] = useState('');

    const [refContact, setRefContact] = useState('');
    const [refContact1, setRefContact1] = useState('');

    const [TXNID, setTXNID] = useState('');

    const [loaderVisible, setLoaderVisible] = useState(true);
    const [operFlag, setOperFlag] = useState("P");

    // fetching previously filled Data
    const DisplayPreviousDetails = () => {
        // console.warn("Inside details", filledDetails);
        filledDetails && (
            // console.warn(filledDetails.FLAG),
            (filledDetails.FLAG === "S" ? setOperFlag("E") : setOperFlag("P")),
            setSalutation(filledDetails?.SALUTATION),
            setFirstName(filledDetails?.FIRST_NAME),
            setMiddleName(filledDetails?.MIDDLE_NAME),
            setLastName(filledDetails?.LAST_NAME),
            setFatherName(filledDetails?.FATHER_NAME),
            setSelectedActualBirthDate(filledDetails?.ACTUAL_BIRTH_DATE),
            setSelectedRecordBirthDate(filledDetails.RECORD_BIRTH_DATE),
            setCountryBirth(filledDetails?.BIRTH_COUNTRY),
            setPlaceBirth(filledDetails?.BIRTH_PLACE),
            setIdentityMarks(filledDetails?.IDENTIFICATION_MARKS),
            setCurrentLocation(filledDetails?.CURRENT_LOCATION),
            setMarriageDate(filledDetails?.MARRIAGE_DATE),
            setPreferredLocation(filledDetails?.PREFERRED_LOCATION),
            setRefAddress(filledDetails?.REF_ADDRESS),
            setRefAddress1(filledDetails?.REF_ADDRESS1),
            setRefContact(filledDetails?.REF_CONTACT_NO),
            setRefContact1(filledDetails?.REF_CONTACT_NO1),
            setRefEmail(filledDetails?.REF_EMAIL_ID),
            setRefEmail1(filledDetails?.REF_EMAIL_ID1),
            setRefName(filledDetails?.REF_NAME),
            setRefName1(filledDetails?.REF_NAME1),
            setRefOccupation(filledDetails?.REF_OCCUPATION),
            setRefOccupation1(filledDetails?.REF_OCCUPATION1),
            setResumeSource(filledDetails?.RESUME_SOURCE),

            setSelectedMarital(filledDetails?.MARITAL_STATUS),
            setSelectedMaritalValue(filledDetails?.MARITAL_STATUS_ID),

            setSelectedCasteValue(filledDetails?.CATEGORY_ID),
            setSelectedCaste(filledDetails?.CATEGORY_NAME),

            setSelectedBloodGroup(filledDetails?.BLOOD_GROUP),
            setSelectedBloodGroupValue(filledDetails?.BLOOD_GROUP_ID),

            setSelectedGender(filledDetails?.GENDER),
            setSelectedGenderValue(filledDetails?.GENDER_ID),

            setTXNID(filledDetails?.TXN_ID),
            setLoaderVisible(false)

        )
    }

    const actualDateSelector = (date) => {
        setActualOpen(false)
        let newDate = date.toDateString().split(' ')
        newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3]

        setSelectedActualBirthDate(newDate);
        setActualBirthDate(date)
    }

    const recordDateSelector = (date) => {
        setRecordOpen(false)
        let newDate = date.toDateString().split(' ')
        newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3]
        // console.warn(newDate)
        setSelectedRecordBirthDate(newDate)
        setRecordBirthDate(date)
    }

    const ValidateForm = () => {

        if (
            firstName === '' ||
            fatherName === '' ||
            selectedRecordBirthDate === ''
        ) { return false }
        else return true

    }

    const savePersonalDetails = async () => {

        try {
            // console.warn(operFlag);
            let PersonalData = { txnId: TXNID, salutation: salutation, firstName: firstName, middleName: middleName, lastName: lastName, fatherName: fatherName, caste: selectedCasteValue, actualBirthDate: selectedActualBirthDate, recordBirthDate: selectedRecordBirthDate, birthCountry: countryBirth, birthPlace: placeBirth, identificationMarks: identityMarks, gender: selectedGenderValue, maritalStatus: selectedMaritalValue, marriageDate: marriageDate, bloodGroup: selectedBloodGroupValue, preferredLocation: preferredLocation, currentLocation: currentLocation, resumeSource: resumeSource, refEmailId: refEmail, refContactNo: refContact, refName: refName, refOccupation: refOccupation, refAddress: refAddress, refEmailId1: refEmail1, refContactNo1: refContact1, refName1: refName1, refOccupation1: refOccupation1, refAddress1: refAddress1, operFlag: operFlag, candidateId: userId, userId: userId }

            var formData = new FormData();
            formData.append('data', JSON.stringify(PersonalData))
            console.log(formData._parts)

            if (ValidateForm()) {

                let res = await fetch("http://192.168.1.169:7038/api/hrms/savePersonalDetails", {
                    method: "POST",
                    body: formData
                })
                res = await res.json();
                // console.warn(res);
                res = await res?.Result[0]?.MSG
                ToastAndroid.show(res, 5000);
            }
            else {
                ToastAndroid.show("Fill all the Marked Fields", 5000)
            }

        } catch (error) {
            ToastAndroid.show(error, 3000)
        }

    }

    const checkSelectedBloodGroup = (value) => {
        for (let index = 0; index < bloodGroup.length; index++) {
            const element = bloodGroup[index];
            if (element.PARAM_NAME === value) setSelectedBloodGroupValue(element.PARAM_ID);
        }
    }

    const checkSelectedGender = (value) => {
        for (let index = 0; index < gender.length; index++) {
            const element = gender[index];
            if (element.PARAM_NAME === value) setSelectedGenderValue(element.PARAM_ID);
        }
    }

    const checkSelectedCaste = (value) => {
        for (let index = 0; index < caste.length; index++) {
            const element = caste[index];
            if (element.PARAM_NAME === value) setSelectedCasteValue(element.PARAM_ID);
        }
    }

    const checkSelectedMarital = (value) => {
        for (let index = 0; index < marital.length; index++) {
            const element = marital[index];
            if (element.PARAM_NAME === value) setSelectedMaritalValue(element.PARAM_ID);
        }
    }

    const selectDropDownValue = (id) => {
        if (id === "caste") {
            return selectedCasteValue ? selectedCasteValue : caste?.map(a => a.PARAM_ID)[0];
        }
        else if (id === "gender") {
            return selectedGenderValue ? selectedGenderValue : gender?.map(a => a.PARAM_ID)[0];
        }
        else if (id === "bloodGroup") {
            return selectedBloodGroupValue ? selectedBloodGroupValue : bloodGroup?.map(a => a.PARAM_ID)[0];
        }
        return selectedMaritalValue ? selectedMaritalValue : marital?.map(a => a.PARAM_ID)[0];
    }

    const selectDropDownText = (id) => {
        if (id === "caste") {
            return selectedCaste ? selectedCaste : caste?.map(a => a.PARAM_NAME)[0];
        }
        else if (id === "gender") {
            return selectedGender ? selectedGender : gender?.map(a => a.PARAM_NAME)[0];
        }
        else if (id === "bloodGroup") {
            return selectedBloodGroup ? selectedBloodGroup : bloodGroup?.map(a => a.PARAM_NAME)[0];
        }
        return selectedMarital ? selectedMarital : marital?.map(a => a.PARAM_NAME)[0]
    }


    return (
        <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
            <Loader loaderVisible={loaderVisible} />
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, alignItems:'center' }}>
                <Text style={{ ...FONTS.h3, fontSize: 20, color: COLORS.orange }}>Personal</Text>
                <TouchableOpacity style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }} onPress={onPress}>
                    <Icon name='close-circle-outline' size={30} color={COLORS.orange} />
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Salutation</Text>
                    <TextInput style={styles.inputHolder} value={salutation} onChangeText={(val) => setSalutation(val)} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>First Name <Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                    <TextInput style={styles.inputHolder} value={firstName} onChangeText={(val) => setFirstName(val)} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Middle Name</Text>
                    <TextInput style={styles.inputHolder} value={middleName} onChangeText={(val) => setMiddleName(val)} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Last Name</Text>
                    <TextInput style={styles.inputHolder} value={lastName} onChangeText={(val) => setLastName(val)} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Father Name <Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                    <TextInput style={styles.inputHolder} value={fatherName} onChangeText={(val) => setFatherName(val)} />
                </View>
                <View style={{ width: '50%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Caste</Text>
                    <SelectDropdown data={caste?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedCaste(value), checkSelectedCaste(value) }} defaultButtonText={selectDropDownText("caste")} defaultValueByIndex={(selectDropDownValue("caste"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />
                </View>
            </View>

            <View style={{ margin: 3 }}>
                <Text style={{ color: 'green' }}> Actual Date of Birth  </Text>
            </View>

            <View style={{ flexDirection: 'row', margin: 3 }}>
                <TextInput style={[styles.inputHolder, { width: '48%', margin: 3 }]} placeholder='dd/mm/yyyy' editable={false} value={selectedActualBirthDate} />
                <DatePicker modal theme='light' open={actualOpen} mode="date" date={actualBirthDate} onConfirm={(date) => actualDateSelector(date)} onCancel={() => { setActualOpen(false) }} />
                <TouchableOpacity onPress={() => setActualOpen(true)} style={{ paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='calendar-month' color={COLORS.orange} size={24} />
                </TouchableOpacity>
            </View>

            <View style={{ margin: 3 }}>
                <Text style={{ color: 'green' }}> Record Date of Birth <Text style={{ color: 'red', fontWeight: 500 }}>*</Text> </Text>
            </View>

            <View style={{ flexDirection: 'row', margin: 3 }}>
                <TextInput style={[styles.inputHolder, { width: '48%', margin: 3 }]} placeholder='dd/mm/yyyy' editable={false} value={selectedRecordBirthDate} />
                <DatePicker modal open={recordOpen} mode="date" date={recordBirthDate} onConfirm={(date) => recordDateSelector(date)} onCancel={() => { setRecordOpen(false) }} />
                <TouchableOpacity onPress={() => setRecordOpen(true)} style={{ paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='calendar-month' color={COLORS.orange} size={24} />
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Country of Birth</Text>
                    <TextInput style={styles.inputHolder} value={countryBirth} onChangeText={(val) => setCountryBirth(val)} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Place of Birth</Text>
                    <TextInput style={styles.inputHolder} value={placeBirth} onChangeText={(val) => setPlaceBirth(val)} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Identification Marks</Text>
                    <TextInput style={styles.inputHolder} value={identityMarks} onChangeText={(val) => setIdentityMarks(val)} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Gender</Text>
                    <SelectDropdown data={gender?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3 }]} onSelect={(value) => { setSelectedGender(value), checkSelectedGender(value) }} defaultButtonText={selectDropDownText("gender")} defaultValueByIndex={(selectDropDownValue("gender"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '50%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Marital Status</Text>
                    <SelectDropdown data={marital?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3 }]} onSelect={(value) => { setSelectedMarital(value), checkSelectedMarital(value) }} defaultButtonText={selectDropDownText("marital")} defaultValueByIndex={(selectDropDownValue("marital"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Date of Marriage</Text>
                    <TextInput style={styles.inputHolder} value={marriageDate} onChangeText={(val) => setMarriageDate(val)} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '100%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Blood Group</Text>
                    <SelectDropdown data={bloodGroup?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedBloodGroup(value), checkSelectedBloodGroup(value) }} defaultButtonText={selectDropDownText("bloodGroup")} defaultValueByIndex={(selectDropDownValue("bloodGroup"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />
                </View>
            </View>

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Preferred Location</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: pLocationHeight }]} multiline={true} onContentSizeChange={event => { setPLocationHeight(event.nativeEvent.contentSize.height) }} value={preferredLocation} onChangeText={(val) => setPreferredLocation(val)} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Current Location</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: cLocationHeight }]} multiline={true} onContentSizeChange={event => { setCLocationHeight(event.nativeEvent.contentSize.height) }} value={currentLocation} onChangeText={(val) => setCurrentLocation(val)} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Resume Source</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={resumeSource} onChangeText={(val) => setResumeSource(val)} />

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>

                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Reference Name</Text>
                    <TextInput style={styles.inputHolder} value={refName} onChangeText={(val) => setRefName(val)} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Reference Occupation</Text>
                    <TextInput style={styles.inputHolder} value={refOccupation} onChangeText={(val) => setRefOccupation(val)} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Reference Contact No.</Text>
                    <TextInput style={styles.inputHolder} value={refContact} onChangeText={(val) => setRefContact(val)} keyboardType='numeric' />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Ref Email ID</Text>
                    <TextInput style={styles.inputHolder} value={refEmail} onChangeText={(val) => setRefEmail(val)} />
                </View>

            </View>

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Reference Address</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: refAddressHeight }]} multiline={true} onContentSizeChange={event => { setRefAddressHeight(event.nativeEvent.contentSize.height) }} value={refAddress} onChangeText={(val) => setRefAddress(val)} />

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Reference Name 1</Text>
                    <TextInput style={styles.inputHolder} value={refName1} onChangeText={(val) => setRefName1(val)} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 2 }}>
                    <Text style={{ color: 'green' }}>Reference Occupation 1</Text>
                    <TextInput style={styles.inputHolder} value={refOccupation1} onChangeText={(val) => setRefOccupation1(val)} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Ref Email ID 1</Text>
                    <TextInput style={styles.inputHolder} value={refEmail1} onChangeText={(val) => setRefEmail1(val)} />
                </View>
                <View style={{ width: '48%', paddingHorizontal: 3 }}>
                    <Text style={{ color: 'green' }}>Reference Contact No.1</Text>
                    <TextInput style={styles.inputHolder} value={refContact1} onChangeText={(val) => setRefContact1(val)} keyboardType='numeric' />
                </View>
            </View>

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Reference Address 1</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: refAddressHeight1 }]} multiline={true} onContentSizeChange={event => { setRefAddressHeight1(event.nativeEvent.contentSize.height) }} value={refAddress1} onChangeText={(val) => setRefAddress1(val)} />

            <TouchableOpacity onPress={() => savePersonalDetails()} style={{ height: 40, backgroundColor: 'orange', margin: 7, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white' }}>Save Personal Details</Text>
            </TouchableOpacity>

            <View style={{ paddingBottom: 320 }}></View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    inputHolder: {
        borderWidth: 1, height: 40, borderColor: COLORS.lightGray, color: COLORS.gray, borderRadius: 12
    },
})

export default PersonalBottomView