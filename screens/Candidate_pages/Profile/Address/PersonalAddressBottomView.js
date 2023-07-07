import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../../../constants/theme'
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS } from '../../../../constants/font_size'
import { useSelector } from 'react-redux'
import Loader from '../../../../components/Loader'

const PersonalAddressBottomView = ({ filledDetails, onPress }) => {
    const userId = useSelector(state => state.candidateAuth.candidateId)

    // for getting state and country data
    useEffect(() => {
        DisplayPreviousDetails();
        getDropdownData(4);
        getDropdownData(7);
    }, [])


    // Country and States data 
    const getDropdownData = async (P) => {
        let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
        response = await response.json();
        const returnedData = response;
        // console.warn(returnedData);
        if (P === 4) { setCountry(returnedData) }
        else if (P === 7) { setStates(returnedData) }

    }

    // getting state & country
    const [states, setStates] = useState()
    const [country, setCountry] = useState()

    // present selected state
    const [presentSelectedState, setPresentSelectedState] = useState()
    const [presentSelectedStateValue, setPresentSelectedStateValue] = useState()

    // present selected country
    const [presentSelectedCountry, setPresentSelectedCountry] = useState()
    const [presentSelectedCountryValue, setPresentSelectedCountryValue] = useState()

    // present address
    const [presentAddressHeight, setPresentAddressHeight] = useState(40)
    const [presentPostOfficeHeight, setPresentPostOfficeHeight] = useState(40)
    const [presentAddress, setPresentAddress] = useState('');
    const [presentCity, setPresentCity] = useState('');
    const [presentPinCode, setPresentPinCode] = useState();
    const [presentDistrict, setPresentDistrict] = useState('');
    const [presentSubDivision, setPresentSubDivision] = useState('');
    const [presentThana, setPresentThana] = useState('');
    const [presentPostOffice, setPresentPostOffice] = useState('');

    // permanent selected state
    const [permanentSelectedState, setPermanentSelectedState] = useState()
    const [permanentSelectedStateValue, setPermanentSelectedStateValue] = useState()

    // permanent selected country
    const [permanentSelectedCountry, setPermanentSelectedCountry] = useState()
    const [permanentSelectedCountryValue, setPermanentSelectedCountryValue] = useState()

    // permanent address
    const [permanentAddressHeight, setPermanentAddressHeight] = useState(40)
    const [permanentPostOfficeHeight, setPermanentPostOfficeHeight] = useState(40)
    const [permanentAddress, setPermanentAddress] = useState('');
    const [permanentCity, setPermanentCity] = useState('');
    const [permanentPinCode, setPermanentPinCode] = useState();
    const [permanentDistrict, setPermanentDistrict] = useState('');
    const [permanentSubDivision, setPermanentSubDivision] = useState('');
    const [permanentThana, setPermanentThana] = useState('');
    const [permanentPostOffice, setPermanentPostOffice] = useState('');


    // permanent Edit Option
    const [permanentAddressEdit, setPermanentAddressEdit] = useState(true)
    const [permanentCityEdit, setPermanentCityEdit] = useState(true)
    const [permanentPinCodeEdit, setPermanentPinCodeEdit] = useState(true)
    const [permanentDistrictEdit, setPermanentDistrictEdit] = useState(true)
    const [permanentPostOfficeEdit, setPermanentPostOfficeEdit] = useState(true)
    const [permanentSubDivisionEdit, setPermanentSubDivisionEdit] = useState(true)
    const [permanentThanaEdit, setPermanentThanaEdit] = useState(true)
    const [permanentCountryEdit, setPermanentCountryEdit] = useState(false)
    const [permanentStateEdit, setPermanentStateEdit] = useState(false)

    // same present and permanent
    const [sameAddress, setSameAddress] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState(true);
    const [TXNID, setTXNID] = useState('');
    const [operFlag, setOperFlag] = useState("A");

    const DisplayPreviousDetails = () => {

        filledDetails && (
            // present address
            (filledDetails.FLAG === "S" ? setOperFlag("E") : setOperFlag("A")),
            setPresentSelectedState(filledDetails.STATE_NAME),
            setPresentSelectedStateValue(filledDetails.STATE_ID),

            setPresentSelectedCountry(filledDetails.COUNTRY_NAME),
            setPresentSelectedCountryValue(filledDetails.COUNTRY_ID),

            setPresentAddress(filledDetails?.PRESENT_ADDRESS),
            setPresentPostOffice(filledDetails?.POST_OFFICE),

            setPresentCity(filledDetails?.CITY),
            setPresentPinCode(filledDetails?.PIN_CODE),
            setPresentDistrict(filledDetails?.DISTRICT),
            setPresentSubDivision(filledDetails?.SUB_DIVISION),
            setPresentThana(filledDetails?.THANA),

            // Permanent address
            setPermanentSelectedState(filledDetails.PERMANENT_STATE),
            setPermanentSelectedStateValue(filledDetails.PERMANENT_STATE_ID),

            setPermanentSelectedCountry(filledDetails.PERMANENT_COUNTRY),
            setPermanentSelectedCountryValue(filledDetails.PERMANENT_COUNTRY_ID),

            setPermanentAddress(filledDetails?.PERMANENT_ADDRESS),
            setPermanentPostOffice(filledDetails?.PERMANENT_POST_OFFICE),

            setPermanentCity(filledDetails?.PERMANENT_CITY),
            setPermanentPinCode(filledDetails?.PERMANENT_PIN_CODE),
            setPermanentDistrict(filledDetails?.PERMANENT_DISTRICT),
            setPermanentSubDivision(filledDetails?.PERMANENT_SUB_DIVISION),
            setPermanentThana(filledDetails?.PERMANENT_THANA),

            setTXNID(filledDetails?.TXN_ID)
            // setLoaderVisible(false)
        )
    }


    // for saving same present and permanent details
    const saveSameDetails = () => {
        setSameAddress(true);
        // console.warn("saving");
        setPermanentSelectedState(presentSelectedState);
        setPermanentSelectedCountry(presentSelectedCountry);
        setPermanentSelectedStateValue(presentSelectedStateValue);
        setPermanentSelectedCountryValue(presentSelectedCountryValue);

        setPermanentAddressHeight(presentAddressHeight);
        setPermanentPostOfficeHeight(presentPostOfficeHeight);
        setPermanentAddress(presentAddress);
        setPermanentCity(presentCity);
        setPermanentPinCode(presentPinCode);
        setPermanentDistrict(presentDistrict);
        setPermanentSubDivision(presentSubDivision);
        setPermanentThana(presentThana);
        setPermanentPostOffice(presentPostOffice);

        setPermanentAddressEdit(false)
        setPermanentCityEdit(false)
        setPermanentPinCodeEdit(false)
        setPermanentDistrictEdit(false)
        setPermanentPostOfficeEdit(false)
        setPermanentSubDivisionEdit(false)
        setPermanentThanaEdit(false)
        setPermanentCountryEdit(true)
        setPermanentStateEdit(true)

        selectDropDownValue("permanentstate")
        selectDropDownValue("permanentcountry")
        selectDropDownText("permanentstate")
        selectDropDownText("permanentcountry")

    }

    // for unchecking same present and permanent details
    const saveDifferentDetails = () => {
        setSameAddress(false);
        // console.warn("not saving");
        setPermanentSelectedState('');
        setPermanentSelectedCountry('');
        setPermanentAddressHeight('');
        setPermanentPostOfficeHeight('');
        setPermanentAddress('');
        setPermanentCity('');
        setPermanentPinCode('');
        setPermanentDistrict('');
        setPermanentSubDivision('');
        setPermanentThana('');
        setPermanentPostOffice('');

        setPermanentAddressEdit(true)
        setPermanentCityEdit(true)
        setPermanentPinCodeEdit(true)
        setPermanentDistrictEdit(true)
        setPermanentPostOfficeEdit(true)
        setPermanentSubDivisionEdit(true)
        setPermanentThanaEdit(true)

        setPermanentCountryEdit(false)
        setPermanentStateEdit(false)

    }

    const ValidateForm = () => {
        if (
            presentSelectedCountryValue === '' ||
            presentSelectedStateValue === '' ||
            presentAddress === '' ||
            presentCity === '' ||
            presentPinCode === '' ||
            presentSubDivision === '' ||
            presentThana === '' ||
            presentPostOffice === '' ||

            permanentSelectedCountryValue === '' ||
            permanentSelectedStateValue === '' ||
            permanentAddress === '' ||
            permanentCity === '' ||
            permanentPinCode === '' ||
            permanentDistrict === '' ||
            permanentSubDivision === '' ||
            permanentThana === '' ||
            permanentPostOffice === ''

        ) { return false }
        else return true
    }

    // saving data to backend
    const saveAddressDetails = async () => {
        // console.warn("Saving data");
        try {
            if (ValidateForm()) {
                console.warn(operFlag);
                let AddressData = { txnId: userId, operFlag: operFlag, candidateId: userId, userId: userId, presentAddress: presentAddress, country: presentSelectedCountryValue, state: presentSelectedStateValue, city: presentCity, pincode: presentPinCode, district: presentDistrict, postOffice: presentPostOffice, subDivison: presentSubDivision, thana: presentThana, peramanentAddress: permanentAddress, permanentCountry: permanentSelectedCountryValue, permanentState: permanentSelectedStateValue, permanentcity: permanentCity, permanentPincode: permanentPinCode, permanentDistrict: permanentDistrict, permanentPostOffice: permanentPostOffice, permanentSubdivion: permanentSubDivision, permanentThana: permanentThana }
                console.warn("address",AddressData);


                let res = await fetch("http://192.168.1.169:7038/api/hrms/saveCandidateAddress", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(AddressData)
                })
                res = await res.json();
                res = await res?.Result[0]?.MSG
                ToastAndroid.show(res, 3000);
            }
            else {
                ToastAndroid.show("Fill all the Required Fields", 3000)
            }
        }
        catch (error) {
            ToastAndroid.show(error, 3000)
        }
    }

    const checkPresentCountry = (value) => {
        for (let index = 0; index < country.length; index++) {
            const element = country[index];
            if (element.PARAM_NAME === value) setPresentSelectedCountryValue(element.PARAM_ID);
        }
    }

    const checkPresentState = (value) => {
        for (let index = 0; index < states.length; index++) {
            const element = states[index];
            if (element.PARAM_NAME === value) setPresentSelectedStateValue(element.PARAM_ID);
        }
    }

    const checkPermanentCountry = (value) => {
        for (let index = 0; index < country.length; index++) {
            const element = country[index];
            if (element.PARAM_NAME === value) setPermanentSelectedCountryValue(element.PARAM_ID);
        }
    }

    const checkPermanentState = (value) => {
        for (let index = 0; index < states.length; index++) {
            const element = states[index];
            if (element.PARAM_NAME === value) setPermanentSelectedStateValue(element.PARAM_ID);
        }
    }

    const selectDropDownValue = (id) => {
        if (id === "presentstates") {
            return presentSelectedStateValue ? presentSelectedStateValue : states?.map(a => a.PARAM_ID)[0];
        }
        else if (id === "presentcountry") {
            return presentSelectedCountryValue ? presentSelectedCountryValue : country?.map(a => a.PARAM_ID)[0];
        }
        else if (id === "permanentstate") {
            return permanentSelectedStateValue ? permanentSelectedStateValue : states?.map(a => a.PARAM_ID)[0];
        }
        return permanentSelectedCountryValue ? permanentSelectedCountryValue : country?.map(a => a.PARAM_ID)[0];
    }

    const selectDropDownText = (id) => {
        if (id === "presentstates") {
            return presentSelectedState ? presentSelectedState : states?.map(a => a.PARAM_NAME)[0];
        }
        else if (id === "presentcountry") {
            return presentSelectedCountry ? presentSelectedCountry : country?.map(a => a.PARAM_NAME)[0];
        }
        else if (id === "permanentstate") {
            return permanentSelectedState ? permanentSelectedState : states?.map(a => a.PARAM_NAME)[0];
        }
        return permanentSelectedCountry ? permanentSelectedCountry : country?.map(a => a.PARAM_NAME)[0]
    }

    return (
        <ScrollView style={{ height: '100%' }}>
            <Loader loaderVisible={loaderVisible} />

            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                <Text style={{ ...FONTS.h3, fontSize: 20, color: COLORS.orange }}>Address</Text>
                <TouchableOpacity style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }} onPress={onPress}>
                    <Icon name='close-circle-outline' size={30} color={COLORS.orange} />
                </TouchableOpacity>
            </View>

            {/* Present */}
            <Text style={FONTS.h2}>Present Address</Text>
            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Address<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: presentAddressHeight }]} multiline={true} onContentSizeChange={event => { setPresentAddressHeight(event.nativeEvent.contentSize.height) }} value={presentAddress} onChangeText={(val) => setPresentAddress(val)} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Pin Code<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={presentPinCode} onChangeText={(val) => setPresentPinCode(val)} keyboardType='numeric' />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>District</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={presentDistrict} onChangeText={(val) => setPresentDistrict(val)} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>City<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={presentCity} onChangeText={(val) => setPresentCity(val)} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>State<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
            <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setPresentSelectedState(value), checkPresentState(value) }} defaultButtonText={selectDropDownText("presentstates")} defaultValueByIndex={(selectDropDownValue("presentstates"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Country<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
            <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setPresentSelectedCountry(value), checkPresentCountry(value) }} defaultButtonText={selectDropDownText("presentcountry")} defaultValueByIndex={(selectDropDownValue("presentcountry"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Post Office</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={presentPostOffice} onChangeText={(val) => setPresentPostOffice(val)} multiline={true} onContentSizeChange={event => { setPresentPostOfficeHeight(event.nativeEvent.contentSize.height) }} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Sub Division</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={presentSubDivision} onChangeText={(val) => setPresentSubDivision(val)} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Thana</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={presentThana} onChangeText={(val) => setPresentThana(val)} />


            <Text style={FONTS.h2}>Permanent Address</Text>

            {/* For saving same address */}
            <View style={{ flexDirection: 'row', paddingHorizontal: 6 }}>
                <Text style={{ paddingHorizontal: 5 }}>Is Permanent same as Present?</Text>
                <TouchableOpacity onPress={() => { sameAddress ? saveDifferentDetails() : saveSameDetails() }}>
                    {sameAddress ? <Icon name='checkbox-marked-outline' size={22} color={COLORS.orange} /> : <Icon name='checkbox-blank-outline' size={22} color={COLORS.orange} />}
                </TouchableOpacity>
            </View>

            {/* Permanent Address */}
            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Permanent Address</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={permanentAddress} onChangeText={(val) => setPermanentAddress(val)} multiline={true} onContentSizeChange={event => { setPermanentAddressHeight(event.nativeEvent.contentSize.height) }} editable={permanentAddressEdit} />


            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Pin Code</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={permanentPinCode} onChangeText={(val) => setPermanentPinCode(val)} editable={permanentPinCodeEdit} keyboardType='numeric' />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>District</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={permanentDistrict} onChangeText={(val) => setPermanentDistrict(val)} editable={permanentDistrictEdit} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>City</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={permanentCity} onChangeText={(val) => setPermanentCity(val)} editable={permanentCityEdit} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>State</Text>
            <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setPermanentSelectedState(value), checkPermanentState(value) }} defaultButtonText={selectDropDownText("permanentstate")} defaultValueByIndex={(selectDropDownValue("permanentstate"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} disabled={permanentStateEdit} value={permanentSelectedState} index={permanentSelectedStateValue} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Country</Text>
            <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setPermanentSelectedCountry(value), checkPermanentCountry(value) }} defaultButtonText={selectDropDownText("permanentcountry")} defaultValueByIndex={(selectDropDownValue("permanentcountry"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} disabled={permanentCountryEdit} value={permanentSelectedCountry} index={permanentSelectedCountryValue} />


            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Post Office</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={permanentPostOffice} onChangeText={(val) => setPermanentPostOffice(val)} multiline={true} onContentSizeChange={event => { setPermanentPostOfficeHeight(event.nativeEvent.contentSize.height) }} editable={permanentPostOfficeEdit} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Sub Division</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={permanentSubDivision} onChangeText={(val) => setPermanentSubDivision(val)} editable={permanentSubDivisionEdit} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Thana</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={permanentThana} onChangeText={(val) => setPermanentThana(val)} editable={permanentThanaEdit} />

            <TouchableOpacity onPress={() => saveAddressDetails()} style={{ height: 40, backgroundColor: 'orange', margin: 7, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white' }}>Save Address Details</Text>
            </TouchableOpacity>

            <View style={{ paddingBottom: 320 }}></View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputHolder: {
        borderWidth: 1, height: 40, borderColor: 'black', borderRadius: 12
    },
})


export default PersonalAddressBottomView