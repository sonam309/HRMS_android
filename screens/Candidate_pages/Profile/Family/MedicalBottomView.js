import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../../../constants/theme'
import DatePicker from 'react-native-date-picker'

const MedicalBottomView = ({ medicalPolicy, setMedicalPolicy }) => {
    const [fillForm, setFillForm] = useState(false)

    const [calendarOpen, setCalendarOpen] = useState(false);
    const [selectedExpiryDate, setSelectedExpiryDate] = useState('');
    const [expiryDate, setExpiryDate] = useState(new Date());

    const [operFlag, setIOperFlag] = useState(new Date());

    const [policyName, setPolicyName] = useState('');
    const [policyNumber, setPolicyNumber] = useState('');
    const [membershipNumber, setMembershipNumber] = useState('');
    const [policyCategory, setPolicyCategory] = useState('');

    const DeletePolicy = ({ policyNumber }) => {
        console.warn(policyNumber);
        setMedicalPolicy(medicalPolicy.filter((item) => item.PolicyNumber !== policyNumber))
    }

    const DisplayPolicy = ({ item }) => {
        return (
            <View style={{ backgroundColor: COLORS.disableOrange1, padding: 6, borderRadius: 12, marginVertical: 4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.PolicyName} </Text>
                    <Icon position='absolute' onPress={() => DeletePolicy({ policyNumber: item.PolicyNumber })} right={0} name='trash-can-outline' color={COLORS.green} size={20} />
                    <Icon position='absolute' right={20} name='square-edit-outline' color={COLORS.green} size={20} />
                </View>
                <Text style={{ fontWeight: 600 }}>Medical Policy Number:- <Text style={{ fontWeight: 400 }}>{item.PolicyNumber}</Text></Text>
                <Text style={{ fontWeight: 600 }}>Medical Membership Number:- <Text style={{ fontWeight: 400 }}>{item.MembershipNumber}</Text></Text>
                <Text style={{ fontWeight: 600 }}>Medical Policy Category:- <Text style={{ fontWeight: 400 }}>{item.PolicyCategory}</Text></Text>
                <Text style={{ fontWeight: 600 }}>Medical Policy Expiry:- <Text style={{ fontWeight: 400 }}>{item.PolicyExpiry}</Text></Text>
            </View>
        )
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


                let familyData = {
                    txnId: userId, operFlag: operFlag, candidateId: userId, userId: userId, familyMember: policyName, memberFirstName: policyNumber, memberMiddleName: membershipNumber, memberLastName: policyCategory, gender: selectedExpiryDate
                }
                console.warn(familyData);

                let res = await fetch("http://192.168.1.169:7038/api/hrms/saveFamilyInfo", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(familyData)
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

    const SelectExpiryDate = (date) => {
        setCalendarOpen(false)
        let newDate = date.toDateString().split(' ')
        newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3]

        setSelectedExpiryDate(newDate);
        setExpiryDate(date)
    }

    const PolicyDetails = () => {
        return (
            <View style={{ padding: 4 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 700, color: 'black' }}>Member Details: </Text>
                    <TouchableOpacity onPress={() => setFillForm(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
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

    const PolicyForm = () => {

        return (
            <View>

                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Medical Policy Name<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                <TextInput value={policyName} onChangeText={(val) => setPolicyName(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />


                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Medical Policy Number<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                <TextInput value={policyNumber} onChangeText={(val) => setPolicyNumber(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Medical Membership Number<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                <TextInput value={membershipNumber} onChangeText={(val) => setMembershipNumber(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />


                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Medical Policy Category<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                <TextInput value={policyCategory} onChangeText={(val) => setPolicyCategory(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />


                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Medical Policy Expiry<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>

                <View style={{ flexDirection: 'row', margin: 3 }}>
                    <TextInput style={[styles.inputHolder, { width: '48%', margin: 3 }]} placeholder='dd/mm/yyyy' editable={false} value={selectedExpiryDate} />
                    <DatePicker modal theme='light' open={calendarOpen} mode="date" date={expiryDate} onConfirm={(date) => SelectExpiryDate(date)} onCancel={() => { setCalendarOpen(false) }} />
                    <TouchableOpacity onPress={() => setCalendarOpen(true)} style={{ paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='calendar-month' color={COLORS.orange} size={24} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => saveMedicalPolicyDetails()} style={{ height: 40, backgroundColor: 'orange', margin: 7, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white' }}>Save Member Details</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>

            {
                fillForm || medicalPolicy.length === 0 ? <PolicyForm /> : <PolicyDetails />
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