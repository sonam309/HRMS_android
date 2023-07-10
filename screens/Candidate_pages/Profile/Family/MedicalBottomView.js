import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../../../constants/theme'
import DatePicker from 'react-native-date-picker'
import { FONTS } from '../../../../constants/font_size'
import { useSelector } from 'react-redux'


const MedicalBottomView = ({ medicalPolicy, onPress }) => {
    const [showForm, setShowForm] = useState(false)

    // for getting candidate Id from redux
    const userId = useSelector(state => state.candidateAuth.candidateId)

    const [calendarOpen, setCalendarOpen] = useState(false);
    const [selectedExpiryDate, setSelectedExpiryDate] = useState('');
    const [expiryDate, setExpiryDate] = useState(new Date());

    const [operFlag, setOperFlag] = useState("A");
    const [txnId, setTxnId] = useState('');

    const [policyName, setPolicyName] = useState('');
    const [policyNumber, setPolicyNumber] = useState('');
    const [membershipNumber, setMembershipNumber] = useState('');
    const [policyCategory, setPolicyCategory] = useState('');


    // deleting a policy
    const DeletePolicy = async ({ txnID }) => {

        try {
            let policyData = {
                txnId: txnID, operFlag: "D", userId: userId
            }
            console.warn(policyData);

            let res = await fetch("http://192.168.1.169:7038/api/hrms/candidateMedicalPolicy", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(policyData)
            })
            res = await res.json();
            res = await res?.Result[0]?.MSG
            ToastAndroid.show(res, 3000);

        }
        catch (error) {
            ToastAndroid.show(error, 3000)
        }

    }

    // updating data of one policy
    const UpdatePolicy = (item) => {

        setOperFlag("E")

        setTxnId(item.TXN_ID)
        setPolicyName(item.MEDICAL_POLICY_NAME)
        setPolicyNumber(item.MEDICAL_POLICY_NUMBER)
        setMembershipNumber(item.MEDICAL_MEMBERSHIP_NUMBER)
        setPolicyCategory(item.MEDICAL_POLICY_CATEGORY)
        setSelectedExpiryDate(item.MEDICAL_POLICY_EXPIRY)

        setShowForm(true)
    }

    const ValidateForm = () => {
        if (
            policyName === '' ||
            policyNumber === '' ||
            membershipNumber === '' ||
            policyCategory === '' ||
            selectedExpiryDate === ''
        ) { return false }
        else return true
    }


    // saving data to backend
    const saveMedicalPolicyDetails = async () => {
        // console.warn("Saving data");
        try {
            if (ValidateForm()) {


                let medicalData = {
                    txnId: txnId, operFlag: operFlag, candidateId: userId, userId: userId, medicalPolicyName: policyName, medicalPolicynumber: policyNumber, medicalMembershipNumber: membershipNumber, medicalPolicyCategory: policyCategory, policyExpiry: selectedExpiryDate
                }
                console.warn(medicalData);

                let res = await fetch("http://192.168.1.169:7038/api/hrms/candidateMedicalPolicy", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(medicalData)
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

    // selecting expiry date
    const SelectExpiryDate = (date) => {
        setCalendarOpen(false)
        let newDate = date.toDateString().split(' ')
        newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3]

        setSelectedExpiryDate(newDate);
        setExpiryDate(date)
    }

    // for displaying all medical policies
    const PolicyDetails = () => {
        return (
            <View style={{ padding: 4 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 700, color: 'black' }}>Member Details: </Text>
                    <TouchableOpacity onPress={() => setShowForm(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>ADD</Text>
                        <Icon name='plus' size={16} />
                    </TouchableOpacity>
                </View>

                {
                    medicalPolicy.map((item) => <DisplayPolicy item={item} key={item.PolicyNumber} />)
                }

            </View>
        )
    }

    // for displaying data in one policy
    const DisplayPolicy = ({ item }) => {
        return (
            <View style={{ backgroundColor: COLORS.disableOrange1, padding: 6, borderRadius: 12, marginVertical: 4 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.MEDICAL_POLICY_NAME} </Text>
                    <Icon position='absolute' onPress={() => DeletePolicy({ txnID: item.TXN_ID })} right={0} name='trash-can-outline' color={COLORS.green} size={20} />
                    <Icon position='absolute' onPress={() => UpdatePolicy(item)} right={20} name='square-edit-outline' color={COLORS.green} size={20} />
                </View>

                <Text style={{ fontWeight: 600 }}>Medical Policy Number:- <Text style={{ fontWeight: 400 }}>{item.MEDICAL_POLICY_NUMBER}</Text></Text>
                <Text style={{ fontWeight: 600 }}>Medical Membership Number:- <Text style={{ fontWeight: 400 }}>{item.MEDICAL_MEMBERSHIP_NUMBER}</Text></Text>
                <Text style={{ fontWeight: 600 }}>Medical Policy Category:- <Text style={{ fontWeight: 400 }}>{item.MEDICAL_POLICY_CATEGORY}</Text></Text>
                <Text style={{ fontWeight: 600 }}>Medical Policy Expiry:- <Text style={{ fontWeight: 400 }}>{item.MEDICAL_POLICY_EXPIRY}</Text></Text>
            </View>
        )
    }

    return (
        <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>

            {/* close button */}
            <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ flex: 1, ...FONTS.h3, fontSize: 20, color: COLORS.orange }}>Medical Policy</Text>
                <TouchableOpacity onPress={onPress}>
                    <Icon name='close-circle-outline' size={30} color={COLORS.orange} />
                </TouchableOpacity>
            </View>

            {
                // Display form or Fill form
                !showForm && medicalPolicy[0].MEDICAL_POLICY_NUMBER && medicalPolicy.length >= 0 ? <PolicyDetails /> : (
                    <View>

                        {/* Policy Name */}
                        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Medical Policy Name<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                        <TextInput value={policyName} onChangeText={(val) => setPolicyName(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                        {/* Policy Number */}
                        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Medical Policy Number<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                        <TextInput value={policyNumber} onChangeText={(val) => setPolicyNumber(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                        {/* Membership Number */}
                        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Medical Membership Number<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                        <TextInput value={membershipNumber} onChangeText={(val) => setMembershipNumber(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                        {/* Policy Category */}
                        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Medical Policy Category<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                        <TextInput value={policyCategory} onChangeText={(val) => setPolicyCategory(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                        {/* Expiry Date */}
                        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Medical Policy Expiry<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>

                        <View style={{ flexDirection: 'row', margin: 3 }}>
                            <TextInput style={[styles.inputHolder, { width: '48%', margin: 3 }]} placeholder='dd/mm/yyyy' editable={false} value={selectedExpiryDate} />
                            <DatePicker modal theme='light' open={calendarOpen} mode="date" date={expiryDate} onConfirm={(date) => SelectExpiryDate(date)} onCancel={() => { setCalendarOpen(false) }} />
                            <TouchableOpacity onPress={() => setCalendarOpen(true)} style={{ paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name='calendar-month' color={COLORS.orange} size={24} />
                            </TouchableOpacity>
                        </View>

                        {/* for saving the data */}
                        <TouchableOpacity onPress={() => saveMedicalPolicyDetails()} style={{ height: 40, backgroundColor: 'orange', margin: 7, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white' }}>Save Member Details</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

            <View style={{ marginBottom: 320 }}></View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputHolder: {
        borderWidth: 1, height: 40, borderColor: 'black', borderRadius: 12
    },
})

export default MedicalBottomView