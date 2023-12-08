import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS, FONTS, SIZES } from '../../../../constants';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient'
import { API } from '../../../../utility/services'
import { showAlert, closeAlert } from "react-native-customisable-alert";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ContactBottomView = ({ onPress }) => {
    const userId = useSelector(state => state.candidateAuth.candidateId)

    const [filledDetails, setFilledDetails] = useState('');
    const [personalMail, setPersonalMail] = useState('');
    const [alternateMail, setAlternateMail] = useState('');
    const [phone, setPhone] = useState('');
    const [alternatePhone, setAlternatePhone] = useState('');
    const [TXNID, setTXNID] = useState('');
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [approvalFlag, setApprovalFlag] = useState('');
    const [conatcatRemark, setContactRemark] = useState('');


    const ValidateForm = () => {
        if (
            personalMail === '' ||
            phone === ''
        ) { return false }
        else return true
    }

    useEffect(() => {
        fetchPersonalData();
    }, [])

    useEffect(() => {
        DisplayPreviousDetails();
    }, [filledDetails]);

    const DisplayPreviousDetails = () => {
        filledDetails && (
            // console.log("filledDetails", filledDetails),
            // (filledDetails.PHONE_NO ? setOperFlag("I") : setOperFlag("C")),
            setAlternateMail(filledDetails?.ALTERNATE_EMAIL_ID),
            setAlternatePhone(filledDetails?.ALTERNATE_PHONE_NO),
            setPhone(filledDetails?.PHONE_NO),
            setPersonalMail(filledDetails?.PERSONAL_EMAIL_ID),
            setTXNID(filledDetails?.TXN_ID)
        )
    }

    // For fetching details of AboutMe dropdown -> Personal, Contact and Bank details
    const fetchPersonalData = async () => {
        try {
            setLoaderVisible(true);
            let PersonalData = { operFlag: 'V', candidateId: userId };
            var formData = new FormData();
            // console.log(PersonalData);
            formData.append('data', JSON.stringify(PersonalData));
            let res = await fetch(`${API}/api/hrms/savePersonalDetails`,
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
            setApprovalFlag(res.CONTACT_APP_FLAG);
            setContactRemark(res.CONTACT_APP_RMK);
        } catch (error) {
            setLoaderVisible(false);
            Toast.show({
                type: 'error',
                text1: error,
            });
        }
    };

    const saveContactDetails = async (operFlag) => {
        if (ValidateForm()) {
            setLoaderVisible(true)
            try {
                let contactData = {
                    txnId: userId,
                    operFlag: operFlag,
                    candidateId: userId,
                    userId: userId,
                    personalEmailId: personalMail,
                    alternateEmailId: alternateMail,
                    phoneNo: phone,
                    alternatePhoneNo: alternatePhone,
                };

                var formData = new FormData();
                formData.append('data', JSON.stringify(contactData));
                // console.log(formData._parts);

                let res = await fetch(`${API}/api/hrms/savePersonalDetails`,
                    {
                        method: 'POST',
                        body: formData,
                    },
                );
                res = await res.json();
                res = await res?.Result[0]?.MSG;
                setLoaderVisible(false);
                // ToastAndroid.show(res, 3000);
                Toast.show({
                    type: 'success',
                    text1: res,
                });
            } catch (error) {
                // ToastAndroid.show(error, 3000);
                setLoaderVisible(false);
                Toast.show({
                    type: 'error',
                    text1: error,
                });
            }
        } else {
            // ToastAndroid.show('Fill all the Required Fields', 5000);
            setLoaderVisible(false)
            Toast.show({
                type: 'error',
                text1: 'Fill all the Required Fields',
            });
        }
    };

    return (

        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ ...FONTS.h3, fontSize: 20, color: COLORS.orange }}>Contact</Text>
                    {approvalFlag === "R" ? <TouchableOpacity onPress={() => {

                        showAlert({
                            customIcon: 'none',
                            title: conatcatRemark,
                            message: "",
                            alertType: 'error',
                            btnLabel: "ok",
                            onPress: () => closeAlert(),
                        });

                    }}>
                        <Icon name='alert-circle-outline' size={25} color={COLORS.red} style={{ marginLeft: 10 }} />
                    </TouchableOpacity> : ""}
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }} onPress={onPress}>
                    <Icon name='close-circle-outline' size={30} color={COLORS.orange} />
                </TouchableOpacity>
            </View>
            {loaderVisible ? (<View style={{ alignItems: 'center', marginTop: '30%', }}>
                <ActivityIndicator color={COLORS.orange1} />
                <Text
                    style={{
                        ...FONTS.h3,
                        fontWeight: '500',
                        color: COLORS.orange1,
                        marginTop: SIZES.base,
                    }}>
                    Loading your details
                </Text>
            </View>
            ) :<KeyboardAwareScrollView
          
            behavior={'padding'}
            enableAutomaticScroll={true}
            keyboardShouldPersistTaps={'always'}
            style={{ flex: 1, marginBottom: 120 }}
            contentContainerStyle={{
                paddingBottom: 120
            }}

            showsVerticalScrollIndicator={false}
        >
             {/* <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}> */}
                <Text style={{ color: COLORS.green, ...FONTS.h4, paddingHorizontal: 6, paddingVertical: 3 }}>Personal Email Id<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, color: COLORS.black }]} value={personalMail} onChangeText={(val) => setPersonalMail(val)} keyboardType='email-address' maxLength={100} editable={false} />
                <Text style={{ color: COLORS.green, ...FONTS.h4, paddingHorizontal: 6, paddingVertical: 3 }}>Alternate Email Id</Text>
                <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, color: COLORS.black }]} value={alternateMail} onChangeText={(val) => setAlternateMail(val)} keyboardType='email-address' maxLength={100} />
                <Text style={{ color: COLORS.green, ...FONTS.h4, paddingHorizontal: 6, paddingVertical: 3 }}>Phone No.<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, color: COLORS.black }]} keyboardType='phone-pad' value={phone} onChangeText={(val) => setPhone(val)} maxLength={10} editable={false} />
                <Text style={{ color: COLORS.green, ...FONTS.h4, paddingHorizontal: 6, paddingVertical: 3 }}>Alternate Phone No.</Text>
                <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, color: COLORS.black }]} keyboardType='phone-pad' value={alternatePhone} onChangeText={(val) => setAlternatePhone(val)} maxLength={10} />
                {approvalFlag !== "A" ? <TouchableOpacity onPress={() => (filledDetails?.PHONE_NO ? saveContactDetails('I') : saveContactDetails('C'))} >
                    <LinearGradient
                        colors={[COLORS.orange1, COLORS.disableOrange1]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 2, y: 0 }}
                        style={{ borderRadius: 8, padding: 10, marginTop: 80 }} >
                        <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }}>
                            {filledDetails?.PHONE_NO ? 'Update Contact Details' : 'Save Contact Details'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity> : ""}
            {/* </ScrollView> */}
            </KeyboardAwareScrollView>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    inputHolder: {
        borderWidth: 1, height: 40, borderColor: 'black', borderRadius: 12

    },
})

export default ContactBottomView