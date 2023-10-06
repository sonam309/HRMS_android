import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-native-date-picker'
import COLORS from '../../../../constants/theme'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Loader from '../../../../components/Loader'
import { FONTS, SIZES } from '../../../../constants/font_size'
import { API } from '../../../../utility/services'
import LinearGradient from 'react-native-linear-gradient'
import Toast from 'react-native-toast-message';
import DateButton from '../../../../components/DateButton'
import TextDropdown from '../../../../components/TextDropdown'
import { showAlert, closeAlert } from "react-native-customisable-alert";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const PersonalBottomView = ({ onPress }) => {

    const userId = useSelector(state => state.candidateAuth.candidateId)
    const [filledDetails, setFilledDetails] = useState('');

    const [marital, setMarital] = useState([]);
    const [selectedMarital, setSelectedMarital] = useState();
    const [selectedMaritalValue, setSelectedMaritalValue] = useState();

    const [bloodGroup, setBloodGroup] = useState([]);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
    const [selectedBloodGroupValue, setSelectedBloodGroupValue] = useState('');

    const [caste, setCaste] = useState([]);
    const [selectedCaste, setSelectedCaste] = useState();
    const [selectedCasteValue, setSelectedCasteValue] = useState();

    const [gender, setGender] = useState([]);
    const [selectedGender, setSelectedGender] = useState();
    const [selectedGenderValue, setSelectedGenderValue] = useState('s');
    

    const getDropdownData = async (P) => {
        let response = await fetch(`${API}/api/User/getParam?getClaim=${P}`)
        response = await response.json();
        const returnedData = response;
        // console.warn(returnedData);
        if (P === 18) { setGender(returnedData) }
        else if (P === 30) { setMarital(returnedData) }
        else if (P === 31) { setBloodGroup(returnedData) }
        else { setCaste(returnedData) }
    }

    useEffect(() => {
        // DisplayPreviousDetails();
        fetchPersonalData();
        getDropdownData(18);
        getDropdownData(30);
        getDropdownData(31);
        getDropdownData(32);

    }, [])

    useEffect(() => {
        DisplayPreviousDetails();
    }, [filledDetails]);

    const [refAddressHeight, setRefAddressHeight] = useState(40)
    const [refAddressHeight1, setRefAddressHeight1] = useState(40)
    const [pLocationHeight, setPLocationHeight] = useState(40)
    const [cLocationHeight, setCLocationHeight] = useState(40)

    const [salutation, setSalutation] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fatherName, setFatherName] = useState('');

    // const [actualBirthDate, setActualBirthDate] = useState(new Date());
    const [actualBirthDate, setActualBirthDate] = useState('');
    const [selectedActualBirthDate, setSelectedActualBirthDate] = useState('');
    const [actualOpen, setActualOpen] = useState(false)

    const [recordBirthDate, setRecordBirthDate] = useState(new Date());
    const [selectedRecordBirthDate, setSelectedRecordBirthDate] = useState('');
    const [recordOpen, setRecordOpen] = useState(false)

    const [marriageDate, setMarriageDate] = useState('');

    const [countryBirth, setCountryBirth] = useState('');
    const [placeBirth, setPlaceBirth] = useState('');
    const [identityMarks, setIdentityMarks] = useState('');
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
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [operFlag, setOperFlag] = useState("P");
    const [approvalFlag, setApprovalFlag] = useState('');
    const [approveRemark, setApproveRemark] = useState('');


    const handleTextChange = (newText) => {
        // Filter out numeric characters using regex
        const nonNumericText = newText.replace(/[0-9]/g, '');
        setSalutation(nonNumericText);
      };

    // For fetching details of AboutMe dropdown -> Personal, Contact and Bank details
    const fetchPersonalData = async () => {
        try {
            setLoaderVisible(true);
            let PersonalData = { operFlag: 'V', candidateId: userId };
            var formData = new FormData();
            // console.log(PersonalData);
            formData.append('data', JSON.stringify(PersonalData));
            let res = await fetch(
                `${API}/api/hrms/savePersonalDetails`,
                {
                    method: 'POST',
                    body: formData,
                },
            );
            res = await res.json();
            res = await res?.Result[0];
            // console.log('candidate profile', res);
            setLoaderVisible(false);
            setFilledDetails(res);
            setApprovalFlag(res.PERSON_APP_FLAG);
            setApproveRemark(res.PERSON_APP_RMK);
        } catch (error) {
            setLoaderVisible(false);
            Toast.show({
                type: 'error',
                text1: error,
            });
        }
    };

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
        if (ValidateForm()) {
            setLoaderVisible(true)
            try {
                // console.warn(operFlag);
                let PersonalData = { txnId: TXNID, salutation: salutation, firstName: firstName, middleName: middleName, lastName: lastName, fatherName: fatherName, caste: selectedCasteValue, actualBirthDate: selectedActualBirthDate, recordBirthDate: selectedRecordBirthDate, birthCountry: countryBirth, birthPlace: placeBirth, identificationMarks: identityMarks, gender: selectedGenderValue, maritalStatus: selectedMaritalValue, marriageDate: marriageDate, bloodGroup: selectedBloodGroupValue, preferredLocation: preferredLocation, currentLocation: currentLocation, resumeSource: resumeSource, refEmailId: refEmail, refContactNo: refContact, refName: refName, refOccupation: refOccupation, refAddress: refAddress, refEmailId1: refEmail1, refContactNo1: refContact1, refName1: refName1, refOccupation1: refOccupation1, refAddress1: refAddress1, operFlag: operFlag, candidateId: userId, userId: userId }

                var formData = new FormData();
                formData.append('data', JSON.stringify(PersonalData))
                // console.log(formData._parts)
                let res = await fetch(`${API}/api/hrms/savePersonalDetails`, {
                    method: "POST",
                    body: formData
                })
                res = await res.json();
                // console.warn(res);
                res = await res?.Result[0]?.MSG
                setLoaderVisible(false)
                Toast.show({
                    type: 'success',
                    text1: res
                })

            } catch (error) {
                setLoaderVisible(false)
                Toast.show({
                    type: 'error',
                    text1: error
                })
            }
        }
        else {
            setLoaderVisible(false)
            Toast.show({
                type: 'error',
                text1: "Fill all the Marked Fields"
            })
        }

    }
    
    return (
        <View style={{ flex: 1 }} >
            <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ ...FONTS.h3, fontSize: 20, color: COLORS.orange }}>Personal</Text>
                    {approvalFlag === "R" ? <TouchableOpacity onPress={() => {
                        showAlert({
                            title: approveRemark,
                            customIcon: 'none',
                            message: "",
                            alertType: 'error',
                            onPress: () => closeAlert(),
                        });
                    }}>
                        <Icon name='alert-circle-outline' size={25} color={COLORS.red} style={{ marginLeft: 10 }} />
                    </TouchableOpacity> : ""}
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }} onPress={onPress}>
                    <Icon name='close-circle-outline' size={30} color={COLORS.orange} />
                </TouchableOpacity>
            </View>
            {loaderVisible ? (<View style={{ alignItems: 'center', marginTop: '30%', }}>
                <ActivityIndicator color={COLORS.orange1} />
                <Text style={{ ...FONTS.h3, fontWeight: '500', color: COLORS.orange1, marginTop: SIZES.base, }}>
                    Loading your details
                </Text>
            </View>
            ) : <KeyboardAwareScrollView
                extraScrollHeight={270}
                behavior={'padding'}
                enableAutomaticScroll={true}
                keyboardShouldPersistTaps={'always'}
                style={{ flex: 1, marginBottom: 170 }}
                contentContainerStyle={{
                    paddingBottom: 170
                }}

                showsVerticalScrollIndicator={false}
            >
                {/* <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}> */}
                {/* <Loader loaderVisible={loaderVisible} /> */}
                <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                    <View style={{ width: '48%', paddingHorizontal: 3 }}>
                        <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Salutation</Text>
                        <TextInput style={styles.inputHolder} value={salutation} onChangeText={(val) => {handleTextChange(val)}} maxLength={4}
                        />
                    </View>
                    <View style={{ width: '48%', paddingHorizontal: 3 }}>
                        <Text style={{ color: COLORS.green, ...FONTS.h5 }}>First Name <Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                        <TextInput style={styles.inputHolder} value={firstName} onChangeText={(val) => setFirstName(val)} editable={false} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                    <View style={{ width: '48%', paddingHorizontal: 3 }}>
                        <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Middle Name</Text>
                        <TextInput style={styles.inputHolder} value={middleName} onChangeText={(val) => setMiddleName(val)} />
                    </View>
                    <View style={{ width: '48%', paddingHorizontal: 3 }}>
                        <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Last Name</Text>
                        <TextInput style={styles.inputHolder} value={lastName} onChangeText={(val) => setLastName(val)} editable={false} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                    <View style={{ width: '48%', paddingHorizontal: 3 }}>
                        <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Father Name <Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                        <TextInput style={styles.inputHolder} value={fatherName} onChangeText={(val) => setFatherName(val)} editable={false} />
                    </View>
                    <View style={{ width: '50%', paddingHorizontal: 3, marginTop: -15, marginLeft: 5 }}>

                        <TextDropdown
                            caption={'Caste'}
                            data={caste}
                            setData={setSelectedCaste}
                            setIdvalue={setSelectedCasteValue}
                            defaultButtonText={selectedCaste}
                            captionStyle={{ color: COLORS.green, ...FONTS.h5 }}
                        />

                    </View>
                </View>
                <View style={{ margin: 3 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Date of Birth <Text style={{ color: 'red', fontWeight: 500 }}>*</Text> </Text>
                </View>

                <View style={{ flexDirection: 'row', margin: 3 }}>
                    <TextInput style={[styles.inputHolder, { width: '48%', margin: 3 }]} placeholder='dd/mm/yyyy' editable={false} value={selectedRecordBirthDate} />
                    <DatePicker modal open={recordOpen} mode="date" date={recordBirthDate} onConfirm={(date) => recordDateSelector(date)} onCancel={() => { setRecordOpen(false) }} />
                    <TouchableOpacity disabled onPress={() => setRecordOpen(true)} style={{ paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='calendar-month' color={COLORS.orange} size={24} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                    {/* <View style={{ width: '48%', paddingHorizontal: 3 }}>
                            <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Country of Birth</Text>
                            <TextInput style={styles.inputHolder} value={countryBirth} onChangeText={(val) => setCountryBirth(val)} />
                        </View> */}
                    <View style={{ width: '98%', paddingHorizontal: 3 }}>
                        <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Place of Birth</Text>
                        <TextInput style={styles.inputHolder} value={placeBirth} onChangeText={(val) => setPlaceBirth(val)} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                    <View style={{ width: '48%', paddingHorizontal: 3 }}>
                        <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Identification Marks</Text>
                        <TextInput style={styles.inputHolder} value={identityMarks} onChangeText={(val) => setIdentityMarks(val)} />
                    </View>
                    <View style={{ width: '48%', paddingHorizontal: 3, marginTop: -15 }}>

                        <TextDropdown
                            caption={'Gender'}
                            data={gender}
                            setData={setSelectedGender}
                            setIdvalue={setSelectedGenderValue}
                            defaultButtonText={selectedGender}
                            captionStyle={{ color: COLORS.green, ...FONTS.h5 }}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                    <View style={{ width: '50%', paddingHorizontal: 3 }}>

                        <TextDropdown
                            caption={'Marital Status'}
                            data={marital}
                            setData={setSelectedMarital}
                            setIdvalue={setSelectedMaritalValue}
                            defaultButtonText={selectedMarital}
                            captionStyle={{ color: COLORS.green, ...FONTS.h5 }}
                        />

                    </View>

                    <View style={{ width: '48%', paddingHorizontal: 3 }}>
                        <DateButton
                            caption={'Date of Marriage'}
                            date={marriageDate}
                            setDate={setMarriageDate}
                        // isShow={false}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                    <View style={{ width: '100%', paddingHorizontal: 3 }}>

                        <TextDropdown
                            caption={'Blood Group'}
                            data={bloodGroup}
                            setData={setSelectedBloodGroup}
                            setIdvalue={setSelectedBloodGroupValue}
                            defaultButtonText={selectedBloodGroup}
                            captionStyle={{ color: COLORS.green, ...FONTS.h5 }}
                        />
                    </View>
                </View>

                {/* <Text style={{ color: COLORS.green, ...FONTS.h5, paddingHorizontal: 6, paddingVertical: 3 }}>Preferred Location</Text>
                    <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: pLocationHeight }]} multiline={true} onContentSizeChange={event => { setPLocationHeight(event.nativeEvent.contentSize.height) }} value={preferredLocation} onChangeText={(val) => setPreferredLocation(val)} /> */}

                <Text style={{ color: COLORS.green, ...FONTS.h5, paddingHorizontal: 6, paddingVertical: 3 }}>Current Location</Text>
                <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: cLocationHeight }]} multiline={true} onContentSizeChange={event => { setCLocationHeight(event.nativeEvent.contentSize.height) }} value={currentLocation} onChangeText={(val) => setCurrentLocation(val)} />

                {/* / */}

                <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>

                    <View style={{ width: '48%', paddingHorizontal: 3 }}>
                        <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Reference Name 1</Text>
                        <TextInput style={styles.inputHolder} value={refName} onChangeText={(val) => setRefName(val)} />
                    </View>
                    <View style={{ width: '48%', paddingHorizontal: 3 }}>
                        <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Reference Occupation 1</Text>
                        <TextInput style={styles.inputHolder} value={refOccupation} onChangeText={(val) => setRefOccupation(val)} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                    <View style={{ width: '48%', paddingHorizontal: 3 }}>
                        <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Reference Contact No. 1</Text>
                        <TextInput style={styles.inputHolder} value={refContact} onChangeText={(val) => setRefContact(val)} keyboardType='numeric' maxLength={10} />
                    </View>
                    <View style={{ width: '48%', paddingHorizontal: 3 }}>
                        <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Ref Email ID 1</Text>
                        <TextInput style={styles.inputHolder} value={refEmail} onChangeText={(val) => setRefEmail(val)}
                            keyboardType='email-address' maxLength={50} />
                    </View>

                </View>

                <Text style={{ color: COLORS.green, ...FONTS.h5, paddingHorizontal: 6, paddingVertical: 3 }}>Reference Address 1</Text>
                <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: refAddressHeight }]} multiline={true} onContentSizeChange={event => { setRefAddressHeight(event.nativeEvent.contentSize.height) }} value={refAddress} onChangeText={(val) => setRefAddress(val)} />

                <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                    <View style={{ width: '48%', paddingHorizontal: 3 }}>
                        <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Reference Name 2</Text>
                        <TextInput style={styles.inputHolder} value={refName1} onChangeText={(val) => setRefName1(val)} />
                    </View>
                    <View style={{ width: '48%', paddingHorizontal: 2 }}>
                        <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Reference Occupation 2</Text>
                        <TextInput style={styles.inputHolder} value={refOccupation1} onChangeText={(val) => setRefOccupation1(val)} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                    <View style={{ width: '48%', paddingHorizontal: 3 }}>
                        <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Ref Email ID 2</Text>
                        <TextInput style={styles.inputHolder} value={refEmail1} onChangeText={(val) => setRefEmail1(val)}
                            keyboardType='email-address' maxLength={50} />
                    </View>
                    <View style={{ width: '48%', paddingHorizontal: 3 }}>
                        <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Reference Contact No.2</Text>
                        <TextInput style={styles.inputHolder} value={refContact1} onChangeText={(val) => setRefContact1(val)} keyboardType='numeric' maxLength={10} />
                    </View>
                </View>

                <Text style={{ color: COLORS.green, ...FONTS.h5, paddingHorizontal: 6, paddingVertical: 3 }}>Reference Address 2</Text>
                <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: refAddressHeight1 }]} multiline={true} onContentSizeChange={event => { setRefAddressHeight1(event.nativeEvent.contentSize.height) }} value={refAddress1} onChangeText={(val) => setRefAddress1(val)} />

                {approvalFlag !== "A" ?
                    <TouchableOpacity onPress={() => savePersonalDetails()} >
                        <LinearGradient
                            colors={[COLORS.orange1, COLORS.disableOrange1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 2, y: 0 }}
                            style={{ borderRadius: 8, padding: 10, marginTop: 20 }} >
                            <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }}>
                                {firstName !== null ? 'Update Personal Details' : 'Save Personal Details'}</Text>
                        </LinearGradient>
                    </TouchableOpacity> : ""}
                {/* <View style={{ paddingBottom: 270 }}></View> */}
                {/* </ScrollView> */}
            </KeyboardAwareScrollView>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    inputHolder: {
        borderWidth: 1, height: 40, borderColor: COLORS.black, color: COLORS.darkGray, borderRadius: 8
    },
})

export default PersonalBottomView