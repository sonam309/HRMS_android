import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../../../constants/theme'
import SelectDropdown from 'react-native-select-dropdown'

const EmergencyAddressBottomView = () => {
    const [states, setStates] = useState()
    const [selectedState, setSelectedState] = useState()
    const [country, setCountry] = useState()
    const [selectedCountry, setSelectedCountry] = useState()
    const [addressHeight, setAddressHeight] = useState(40)

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

    return (
        <ScrollView style={{ height: '100%' }}>
            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Contact Person</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Family Relation</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Contact No.</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Country</Text>
            <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedCountry(value) }} defaultButtonText={country?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>State</Text>
            <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedState(value) }} defaultButtonText={states?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>City</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Pin Code</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Address</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height: addressHeight }]} multiline={true} onContentSizeChange={event => { setAddressHeight(event.nativeEvent.contentSize.height) }} />

            <View style={{ paddingBottom: 320 }}></View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputHolder: {
        borderWidth: 1, height: 40, borderColor: 'black', borderRadius: 12
    },
})

export default EmergencyAddressBottomView