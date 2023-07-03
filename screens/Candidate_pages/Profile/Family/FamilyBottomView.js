import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../../../constants/theme'
import { FONTS } from '../../../../constants/font_size'
import SelectDropdown from 'react-native-select-dropdown'
import DatePicker from 'react-native-date-picker'
import { useSelector } from 'react-redux'

const FamilyBottomView = ({ members, setMembers, onPress }) => {
    const [showMembers, setShowMembers] = useState(true)
    // console.warn("The members", members);
    const userId = useSelector(state => state.auth.userId)

    // getting family member & bloodgroup
    const [familyMemberDropDown, setFamilyMemberDropDown] = useState()
    const [selectedFamilyMember, setSelectedFamilyMember] = useState()
    const [selectedFamilyMemberValue, setSelectedFamilyMemberValue] = useState('')

    const [bloodGroup, setBloodGroup] = useState();
    const [selectedBloodGroup, setSelectedBloodGroup] = useState();
    const [selectedBloodGroupValue, setSelectedBloodGroupValue] = useState('');

    const [gender, setGender] = useState();
    const [selectedGender, setSelectedGender] = useState();
    const [selectedGenderValue, setSelectedGenderValue] = useState('');

    const [operFlag, setOperFlag] = useState("A");

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');

    const [calendarOpen, setCalendarOpen] = useState(false);
    const [selectedBirthDate, setSelectedBirthDate] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());

    // let newMember = { Member: null, FirstName: null, MiddleName: null, LastName: null, Gender: null, BirthDate: null, Contact: null, Address: null, BloodGroup: null }

    useEffect(() => {
        getDropdownData(31);
        getDropdownData(38);
        getDropdownData(18);
    }, [])

    // Country and States data 
    const getDropdownData = async (P) => {
        let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
        response = await response.json();
        const returnedData = response;
        // console.warn(returnedData);
        if (P === 38) { setFamilyMemberDropDown(returnedData) }
        else if (P === 31) { setBloodGroup(returnedData) }
        else if (P === 18) { setGender(returnedData) }
    }

    const DeleteMember = ({ contact }) => {
        // console.warn(contact);
        setMembers(members.filter((item) => item.Contact !== contact))
    }

    const UpdateMember = ({ item }) => {

        // setMembers(members.filter((item) => item.Contact !== contact))
        newMember = item;
    }

    const DisplayMember = ({ item }) => {
        return (
            <View style={{ backgroundColor: COLORS.disableOrange1, padding: 6, borderRadius: 12, marginVertical: 4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.MEMBER_FIRST_NAME} </Text>
                    <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.MEMBER_LAST_NAME} - </Text>
                    <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.FAMILY_MEMBER}</Text>
                    <Icon position='absolute' onPress={() => DeleteMember({ contact: item.CONTACT_NO })} right={0} name='trash-can-outline' color={COLORS.green} size={20} />
                    <Icon position='absolute' onPress={() => UpdateMember(item)} right={20} name='square-edit-outline' color={COLORS.green} size={20} />
                </View>
                <Text style={{ fontWeight: 600 }}>Date of Birth:- <Text style={{ fontWeight: 400 }}>{item.DATE_OF_BIRTH}</Text></Text>
                <Text style={{ fontWeight: 600 }}>Contact:- <Text style={{ fontWeight: 400 }}>{item.CONTACT_NO}</Text></Text>
                <Text style={{ fontWeight: 600 }}>Address:- <Text style={{ fontWeight: 400 }}>{item.ADDRESS}</Text></Text>
                <Text style={{ fontWeight: 600 }}>Blood Group:- <Text style={{ fontWeight: 400 }}>{item.BLOOD_GROUP}</Text></Text>
            </View>
        )
    }

    const checkFamilyMemberValue = (value) => {
        for (let index = 0; index < familyMemberDropDown.length; index++) {
            const element = familyMemberDropDown[index];
            if (element.PARAM_NAME === value) setSelectedFamilyMemberValue(element.PARAM_ID);
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

    const selectDropDownValue = (id) => {
        if (id === "familyMember") {
            return selectedFamilyMemberValue ? selectedFamilyMemberValue : familyMemberDropDown?.map(a => a.PARAM_NAME)[0];
        }
        else if (id === "bloodGroup") {
            return selectedBloodGroupValue ? selectedBloodGroupValue : bloodGroup?.map(a => a.PARAM_ID)[0];
        }
        else if (id === "gender") {
            return selectedGenderValue ? selectedGenderValue : gender?.map(a => a.PARAM_ID)[0];
        }
    }

    const selectDropDownText = (id) => {
        if (id === "familyMember") {
            return selectedFamilyMember ? selectedFamilyMember : familyMemberDropDown?.map(a => a.PARAM_NAME)[0];
        }
        else if (id === "bloodGroup") {
            return selectedBloodGroup ? selectedBloodGroup : bloodGroup?.map(a => a.PARAM_NAME)[0];
        }
        else if (id === "gender") {
            return selectedGender ? selectedGender : gender?.map(a => a.PARAM_NAME)[0];
        }
    }

    const setDateofBirth = (date) => {
        setCalendarOpen(false)
        let newDate = date.toDateString().split(' ')
        newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3]

        setSelectedBirthDate(newDate);
        setBirthDate(date)
    }

    const MemberDetails = () => {
        return (
            <View style={{ padding: 4 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 700, color: 'black' }}>Member Details: </Text>
                    <TouchableOpacity onPress={() => setShowMembers(false)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>ADD</Text>
                        <Icon name='plus' size={16} />
                    </TouchableOpacity>
                </View>

                {
                    members.map((item) => <DisplayMember item={item} key={item.Contact} />)
                    // console.warn(members)
                }

            </View>
        )
    }

    const ValidateForm = () => {
        if (
            selectedFamilyMemberValue === '' ||
            firstName === '' ||
            lastName === '' ||
            selectedGenderValue === '' ||
            selectedBirthDate === '' ||
            contact === '' ||
            address === '' ||
            bloodGroup === ''
        ) { return false }
        else return true
    }


    // saving data to backend
    const saveMemberDetails = async () => {
        // console.warn("Saving data");
        try {
            if (ValidateForm()) {


                let familyData = {
                    txnId: userId, operFlag: operFlag, candidateId: userId, userId: userId, familyMember: selectedFamilyMemberValue, memberFirstName: firstName, memberMiddleName: middleName, memberLastName: lastName, gender: selectedGenderValue, dateOfBirth: selectedBirthDate, contactNo: contact, address: address, bloodGroup: selectedBloodGroupValue,
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

    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            {/* close header */}
            <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ flex: 1, ...FONTS.h3, fontSize: 20, color: COLORS.black }}>Family</Text>
                <TouchableOpacity onPress={onPress}>
                    <Icon name='close-circle-outline' size={30} color={COLORS.orange} />
                </TouchableOpacity>
            </View>

            {
                showMembers && members.length >= 0 ? <MemberDetails /> :

                    <View>

                        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Family Member</Text>
                        {/* <TextInput onChangeText={(val) => newMember.Member = val} value={newMember.Member} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} /> */}
                        <SelectDropdown data={familyMemberDropDown?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedFamilyMember(value), checkFamilyMemberValue(value) }} defaultButtonText={selectDropDownText("familyMember")} defaultValueByIndex={(selectDropDownValue("familyMember"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />

                        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Member First Name</Text>
                        <TextInput onChangeText={(val) => setFirstName(val)} value={firstName} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Member Middle Name</Text>
                        <TextInput onChangeText={(val) => setMiddleName(val)} value={middleName} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Member Last Name</Text>
                        <TextInput onChangeText={(val) => setLastName(val)} value={lastName} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Gender</Text>
                        <SelectDropdown data={gender?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3 }]} onSelect={(value) => { setSelectedGender(value), checkSelectedGender(value) }} defaultButtonText={selectDropDownText("gender")} defaultValueByIndex={(selectDropDownValue("gender"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />

                        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Date of Birth</Text>

                        <View style={{ flexDirection: 'row', margin: 3 }}>
                            <TextInput style={[styles.inputHolder, { width: '48%', margin: 3 }]} placeholder='dd/mm/yyyy' editable={false} value={selectedBirthDate} />
                            <DatePicker modal theme='light' open={calendarOpen} mode="date" date={birthDate} onConfirm={(date) => setDateofBirth(date)} onCancel={() => { setCalendarOpen(false) }} />
                            <TouchableOpacity onPress={() => setCalendarOpen(true)} style={{ paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name='calendar-month' color={COLORS.orange} size={24} />
                            </TouchableOpacity>
                        </View>

                        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Contact No.</Text>
                        <TextInput onChangeText={(val) => setContact(val)} value={contact} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} keyboardType='numeric' />

                        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Address</Text>
                        <TextInput onChangeText={(val) => setAddress(val)} value={address} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Blood Group</Text>
                        <SelectDropdown data={bloodGroup?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedBloodGroup(value), checkSelectedBloodGroup(value) }} defaultButtonText={selectDropDownText("bloodGroup")} defaultValueByIndex={(selectDropDownValue("bloodGroup"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />

                        <TouchableOpacity onPress={() => saveMemberDetails()} style={{ height: 40, backgroundColor: 'orange', margin: 7, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white' }}>Save Member Details</Text>
                        </TouchableOpacity>
                    </View>
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

export default FamilyBottomView