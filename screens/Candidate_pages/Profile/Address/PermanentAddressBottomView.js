import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../../../constants/theme'
import SelectDropdown from 'react-native-select-dropdown'

const PermanentAddressBottomView = () => {
    const [states, setStates] = useState()
    const [selectedState, setSelectedState] = useState()
    const [country, setCountry] = useState()
    const [selectedCountry, setSelectedCountry] = useState()
    const [addressHeight, setAddressHeight] = useState(40)
    const [postOfficeHeight, setPostOfficeHeight] = useState(40)
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [pinCode, setPinCode] = useState();
    const [district, setDistrict] = useState();
    const [subDivision, setSubDivision] = useState();
    const [thana, setThana] = useState();
    const [postOffice, setPostOffice] = useState();

    useEffect(() => {
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

    // console.warn(selectedCountry);

    return (
        <ScrollView style={{ height: '100%' }}>
            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Address</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: addressHeight }]} value={address} onChangeText={(val) => setAddress(val)} multiline={true} onContentSizeChange={event => { setAddressHeight(event.nativeEvent.contentSize.height) }} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Country</Text>
            <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedCountry(value) }} defaultButtonText={country?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>State</Text>
            <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedState(value) }} defaultButtonText={states?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>City</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={city} onChangeText={(val) => setCity(val)} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Pin Code</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={pinCode} onChangeText={(val) => setPinCode(val)} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Permanent District</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={district} onChangeText={(val) => setDistrict(val)} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Permanent Post Office</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: postOfficeHeight }]} value={postOffice} onChangeText={(val) => setPostOffice(val)} multiline={true} onContentSizeChange={event => { setPostOfficeHeight(event.nativeEvent.contentSize.height) }} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Permanent Sub Division</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={subDivision} onChangeText={(val) => setSubDivision(val)} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Permanent Thana</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={thana} onChangeText={(val) => setThana(val)} />

            <View style={{ paddingBottom: 320 }}></View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputHolder: {
        borderWidth: 1, height: 40, borderColor: 'black', borderRadius: 12
    },
})

export default PermanentAddressBottomView