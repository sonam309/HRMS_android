import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../../../constants/theme'

const MedicalBottomView = ({ medicalPolicy, setMedicalPolicy }) => {
    const [fillForm, setFillForm] = useState(false)

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
        let newPolicy = { PolicyName: null, PolicyNumber: null, MembershipNumber: null, PolicyCategory: null, PolicyExpiry: null }

        return (
            <View>

                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Medical Policy Name</Text>
                <TextInput value={newPolicy.PolicyName} onChangeText={(val) => newPolicy.PolicyName = val} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />


                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Medical Policy Number</Text>
                <TextInput value={newPolicy.PolicyNumber} onChangeText={(val) => newPolicy.PolicyNumber = val} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Medical Membership Number</Text>
                <TextInput value={newPolicy.MembershipNumber} onChangeText={(val) => newPolicy.MembershipNumber = val} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} keyboardType='numeric' />


                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Medical Policy Category</Text>
                <TextInput value={newPolicy.PolicyCategory} onChangeText={(val) => newPolicy.PolicyCategory = val} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} keyboardType='numeric' />

                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Medical Policy Expiry</Text>
                <TextInput value={newPolicy.PolicyExpiry} onChangeText={(val) => newPolicy.PolicyExpiry = val} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} keyboardType='numeric' />

                <TouchableOpacity onPress={() => (setMedicalPolicy(medicalPolicy.concat(newPolicy)), setFillForm(false))} style={{ height: 40, backgroundColor: 'orange', margin: 7, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
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