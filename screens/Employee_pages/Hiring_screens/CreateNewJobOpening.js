import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import COLORS from '../../../constants/theme'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Alert } from 'react-native'




const CreateNewJobOpening = () => {

    const gender = ["Male", "Female", "Other"]
    const [selectedGender, setSelectedGender] = useState("Select Gender")
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            {/* header text */}
            <View style={styles.newJobOpeneingTxt}>
                <Icon name='book-plus-outline' color={COLORS.green} size={24} style={{ verticalAlign: 'center', padding: 2 }} />
                <Text style={{ color: COLORS.green, fontSize: 14, fontWeight: '500', verticalAlign: 'center', padding: 5 }}>New Job Opening</Text>
            </View>
            {/* Posting Title dropdown */}
            <View style={{ marginLeft: 10, marginRight: 10, }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Posting Title</Text>
                <SelectDropdown data={gender} buttonStyle={[styles.dropDownStyle]} onSelect={(value) => { setSelectedGender(value) }} defaultButtonText={selectedGender} buttonTextStyle={{ fontSize: 15 }} />
            </View>

            {/* number of position */}

            <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Number of position</Text>
                <TextInput
                    style={{ borderColor: COLORS.skyBlue, height: 40, borderWidth: 1, marginTop: 5, backgroundColor: COLORS.white, elevation: 7, paddingLeft: 5 }} placeholder='Number of position' keyboardType="number-pad"
                >
                </TextInput>

            </View>

            {/* compensation */}

            <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Compensation</Text>
                <TextInput
                    style={{ borderColor: COLORS.skyBlue, height: 40, borderWidth: 1, marginTop: 5, backgroundColor: COLORS.white, elevation: 7, paddingLeft: 5 }} placeholder='Compensation'
                >
                </TextInput>

            </View>

            {/* experience */}

            <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Minimium Experience/Years  </Text>
                <TextInput
                    style={{ borderColor: COLORS.skyBlue, height: 40, borderWidth: 1, marginTop: 5, backgroundColor: COLORS.white, elevation: 7, paddingLeft: 5 }} placeholder='Eg:2-4 years'
                >
                </TextInput>

            </View>

            {/* state dropdown */}


            <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Select State</Text>
                <SelectDropdown data={gender} buttonStyle={[styles.dropDownStyle]} onSelect={(value) => { setSelectedGender(value) }} defaultButtonText={selectedGender} buttonTextStyle={{ fontSize: 15 }} />
            </View>

            {/* job description */}
            <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}> Job Description  </Text>
                <TextInput
                    style={{ borderColor: COLORS.skyBlue, height: 40, borderWidth: 1, marginTop: 5, backgroundColor: COLORS.white, elevation: 7, paddingLeft: 5 }} placeholder='Job Description '
                >
                </TextInput>

            </View>
            <TouchableOpacity >
                <View style={{ height: 100, borderColor: COLORS.skyBlue, borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 20, elevation: 7, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }} >
                    <Icon name='cloud-upload-outline' color={COLORS.green} size={40} style={{ padding: 2, }} />
                    <Text style={{ color: COLORS.black, fontWeight: '500' }}> Job Description  </Text>
                </View>
            </TouchableOpacity>

        </ScrollView>


    )

}

const selectDoc = async () => {
    try {
        const doc = await DocumentPicker.pick();
        setSelectedDoc({
            name: doc[0].name,
            type: doc[0].type,
            uri: doc[0].uri,
        });
    } catch (error) {
        // Alert.alert('Error in picking doc', error);
        // Toast.show({
        //     type: 'error',
        //     text1: error,
        // });
        Alert.alert(type+"&&"+text1);
    }
};

const styles = StyleSheet.create({
    newJobOpeneingTxt: {
        padding: 10,
        fontSize: 14,
        fontWeight: '500',
        flexDirection: 'row'
    },
    dropDownStyle: {
        width: '100%',
        backgroundColor: 'white',
        borderColor: COLORS.skyBlue,
        height: 40,
        elevation: 5,
        color: COLORS.voilet,
        marginTop: 5,
        borderWidth: 1,
    }
})


export default CreateNewJobOpening