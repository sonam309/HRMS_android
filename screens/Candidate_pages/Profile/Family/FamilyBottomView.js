import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DocumentPicker from 'react-native-document-picker'
import COLORS from '../../../../constants/theme'

const FamilyBottomView = ({ members, setMembers }) => {
    const [fillForm, setFillForm] = useState(false)

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
                    <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.FirstName} </Text>
                    <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.LastName} - </Text>
                    <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.Member}</Text>
                    <Icon position='absolute' onPress={() => DeleteMember({ contact: item.Contact })} right={0} name='trash-can-outline' color={COLORS.green} size={20} />
                    <Icon position='absolute' onPress={() => UpdateMember(item)} right={20} name='square-edit-outline' color={COLORS.green} size={20} />
                </View>
                <Text style={{ fontWeight: 600 }}>Date of Birth:- <Text style={{ fontWeight: 400 }}>{item.BirthDate}</Text></Text>
                <Text style={{ fontWeight: 600 }}>Contact:- <Text style={{ fontWeight: 400 }}>{item.Contact}</Text></Text>
                <Text style={{ fontWeight: 600 }}>Address:- <Text style={{ fontWeight: 400 }}>{item.BloodGroup}</Text></Text>
            </View>
        )
    }

    const MemberDetails = () => {
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
                    members.map((item) => <DisplayMember item={item} key={item.Contact} />)
                    // console.warn(members)
                }

            </View>
        )
    }

    const MemberForm = () => {
        let newMember = { Member: null, FirstName: null, MiddleName: null, LastName: null, Gender: null, BirthDate: null, Contact: null, Address: null, BloodGroup: null }

        return (
            <View>

                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Family Member</Text>
                <TextInput onChangeText={(val) => newMember.Member = val} value={newMember.Member} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Member First Name</Text>
                <TextInput onChangeText={(val) => newMember.FirstName = val} value={newMember.FirstName} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />


                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Member Middle Name</Text>
                <TextInput onChangeText={(val) => newMember.MiddleName = val} value={newMember.MiddleName} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Member Last Name</Text>
                <TextInput onChangeText={(val) => newMember.LastName = val} value={newMember.LastName} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Gender</Text>
                <TextInput onChangeText={(val) => newMember.Gender = val} value={newMember.Gender} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Date of Birth</Text>
                <TextInput onChangeText={(val) => newMember.BirthDate = val} value={newMember.BirthDate} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Contact No.</Text>
                <TextInput onChangeText={(val) => newMember.Contact = val} value={newMember.Contact} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} keyboardType='numeric' />

                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Address</Text>
                <TextInput onChangeText={(val) => newMember.Address = val} value={newMember.Address} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Blood Group</Text>
                <TextInput onChangeText={(val) => newMember.BloodGroup = val} value={newMember.BloodGroup} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                <TouchableOpacity onPress={() => (setMembers(members.concat(newMember)), setFillForm(false), ToastAndroid.show("Data Successfully saved",3000))} style={{ height: 40, backgroundColor: 'orange', margin: 7, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white' }}>Save Member Details</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {
                fillForm || members.length === 0 ? <MemberForm /> : <MemberDetails />
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