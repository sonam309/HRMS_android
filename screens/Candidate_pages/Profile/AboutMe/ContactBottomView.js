import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DocumentPicker from 'react-native-document-picker'

const ContactBottomView = () => {

    return (
        <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Personal Email Id</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />


            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Alternate Email Id</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Phone No.</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} keyboardType='numeric' />


            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Alternate Phone No.</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} keyboardType='numeric' />

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