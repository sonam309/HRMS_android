import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Loader from '../../../../components/Loader'
import { FONTS } from '../../../../constants/font_size'
import COLORS from '../../../../constants/theme'
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient'
import { API } from '../../../../utility/services'

const ContactBottomView = ({ filledDetails, onPress, candidateInfo }) => {
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
        // if(Object.keys(candidateInfo.Table[0]).length > 0){
        DisplayPreviousDetails()
        // }
        // console.log("bank details", filledDetails?.FLAG === "F");
        // if(filledDetails?.FLAG === "F" && candidateInfo.Table[0]  ){
        //     setPersonalMail(candidateInfo?.Table[0]?.EMAIL),
        //     //setAlternatePhone(filledDetails?.ALTERNATE_PHONE_NO),
        //     setPhone(candidateInfo?.Table[0]?.PHONE),
        //     // setPersonalMail(filledDetails?.PERSONAL_EMAIL_ID),
        //     setTXNID(candidateInfo?.Table[0]?.TXN_ID)
        // }

    }, [])



    const DisplayPreviousDetails = () => {
        filledDetails && (
            console.log("filledDetails", filledDetails),
            (filledDetails.PHONE_NO ? setOperFlag("I") : setOperFlag("C")),
            setAlternateMail(filledDetails?.ALTERNATE_EMAIL_ID),
            setAlternatePhone(filledDetails?.ALTERNATE_PHONE_NO),
            setPhone(filledDetails?.PHONE_NO),
            setPersonalMail(filledDetails?.PERSONAL_EMAIL_ID),
            setTXNID(filledDetails?.TXN_ID)
        )
    }

    const saveContactDetails = async () => {

        if (ValidateForm()) {
            try {
                // console.warn(TXNID);
                let contactData = { txnId: userId, operFlag: operFlag, candidateId: userId, userId: userId, personalEmailId: personalMail, alternateEmailId: alternateMail, phoneNo: phone, alternatePhoneNo: alternatePhone }

                var formData = new FormData();
                formData.append('data', JSON.stringify(contactData))
                console.log(formData._parts)

                let res = await fetch(`${API}/api/hrms/savePersonalDetails`, {

                    method: "POST",
                    body: formData
                })
                res = await res.json();
                // console.log(res?.Result[0]);
                console.log("resmsg", res?.Result[0].MSG)
                res = await res?.Result[0]?.MSG
                Toast.show({
                    type: 'success',
                    text1: res
                })
                onPress
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: error
                })
            }
        } else {

            Toast.show({
                type: 'error',
                text1: "Fill all the Required Fields"
            })
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


            <TouchableOpacity onPress={() => saveContactDetails()} >

                <LinearGradient
                    colors={[COLORS.orange1, COLORS.disableOrange1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 2, y: 0 }}
                    style={{ borderRadius: 8, padding: 10, marginTop: 80 }} >
                    <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }}>Save Contact Details</Text>

                </LinearGradient>
            </TouchableOpacity>



        </ScrollView>
    )
}


const styles = StyleSheet.create({
    inputHolder: {
        borderWidth: 1, height: 40, borderColor: 'black', borderRadius: 12
    },
})

export default ContactBottomView