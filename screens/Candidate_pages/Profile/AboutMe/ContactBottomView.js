import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Loader from '../../../../components/Loader'
import { FONTS } from '../../../../constants/font_size'
import COLORS from '../../../../constants/theme'

const ContactBottomView = ({ filledDetails, onPress }) => {
    const userId = useSelector(state => state.candidateAuth.candidateId)

    const [personalMail, setPersonalMail] = useState('');
    const [alternateMail, setAlternateMail] = useState('');
    const [phone, setPhone] = useState('');
    const [alternatePhone, setAlternatePhone] = useState('');

    const [TXNID, setTXNID] = useState('');

    const [loaderVisible, setLoaderVisible] = useState(true);
    const [operFlag, setOperFlag] = useState("P");

    const ValidateForm = () => {

        if (
            personalMail === '' ||
            phone === ''
        ) { return false }
        else return true

    }

    useEffect(() => {
        DisplayPreviousDetails();
    }, [])

    const DisplayPreviousDetails = () => {
        filledDetails && (
            // console.warn(filledDetails.PHONE_NO),
            (filledDetails.PHONE_NO ? setOperFlag("I") : setOperFlag("C")),
            setAlternateMail(filledDetails?.ALTERNATE_EMAIL_ID),
            setAlternatePhone(filledDetails?.ALTERNATE_PHONE_NO),
            setPhone(filledDetails?.PHONE_NO),
            setPersonalMail(filledDetails?.PERSONAL_EMAIL_ID),
            setTXNID(filledDetails?.TXN_ID)
        )
    }

    const saveContactDetails = async () => {
        try {
            if (ValidateForm()) {
                // console.warn(TXNID);
                let contactData = { txnId: userId, operFlag: operFlag, candidateId: userId, userId: userId, personalEmailId: personalMail, alternateEmailId: alternateMail, phoneNo: phone, alternatePhoneNo: alternatePhone }

                var formData = new FormData();
                formData.append('data', JSON.stringify(contactData))
                console.log(formData._parts)

                let res = await fetch("http://192.168.1.169:7038/api/hrms/savePersonalDetails", {
                    method: "POST",
                    body: formData
                })
                res = await res.json();
                res = await res?.Result[0]?.MSG
                ToastAndroid.show(res, 3000);
            }
            else {
                ToastAndroid.show("Fill all the Required Fields", 5000)
            }

        } catch (error) {
            ToastAndroid.show(error, 3000)
        }
    }

    return (
        <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>

            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                <Text style={{ ...FONTS.h3, fontSize: 20, color: COLORS.orange }}>Contact</Text>
                <TouchableOpacity style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }} onPress={onPress}>
                    <Icon name='close-circle-outline' size={30} color={COLORS.orange} />
                </TouchableOpacity>
            </View>

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Personal Email Id<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={personalMail} onChangeText={(val) => setPersonalMail(val)} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Alternate Email Id</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={alternateMail} onChangeText={(val) => setAlternateMail(val)} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Phone No.<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} keyboardType='numeric' value={phone} onChangeText={(val) => setPhone(val)} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Alternate Phone No.</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} keyboardType='numeric' value={alternatePhone} onChangeText={(val) => setAlternatePhone(val)} />

            <TouchableOpacity onPress={() => saveContactDetails()} style={{ height: 40, backgroundColor: 'orange', margin: 7, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white' }}>Save Contact Details</Text>
            </TouchableOpacity>

            <View style={{ marginBottom: 320 }}></View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    inputHolder: {
        borderWidth: 1, height: 40, borderColor: 'black', borderRadius: 12
    },
})

export default ContactBottomView