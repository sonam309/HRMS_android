import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import COLORS from '../../../constants/theme'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DocumentPicker from 'react-native-document-picker'
import CustomTextInput from '../../../components/CustomTextInput'

const CreateNewJobOpening = () => {
    // for getting and setting data from API  
    const [titleOption, setTitleOption] = useState();
    const [titleName, setTitleName] = useState();
    const [states, setStates] = useState()
    const [statesName, setStatesName] = useState()

    // for setting and posting Data to API
    const [selectedTitle, setSelectedTitle] = useState();
    const [selectedTitleValue, setSelectedTitleValue] = useState('');
    const [selectedState, setSelectedState] = useState();
    const [selectedStateValue, setSelectedStateValue] = useState('');

    const [openPosition, setOpenPosition] = useState('');
    const [compensation, setCompensation] = useState('');
    const [experience, setExperience] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [selectedDoc, setSelectedDoc] = useState({});

    useEffect(() => {
        getDropdownData(28);
        getDropdownData(7);
    }, []);

    // Title and States Data
    const getDropdownData = async (P) => {
        let response = await fetch(`http://192.168.1.169:7038/api/User/getParam?getClaim=${P}`)
        response = await response.json();
        const returnedData = response;
        if (P === 28) { setTitleOption(returnedData), setTitleName(returnedData.map(a => a.PARAM_NAME)) }
        else { setStates(returnedData), setStatesName(returnedData.map(a => a.PARAM_NAME)) }
    }


    function addLeadingZero(number) {
        return number < 10 ? '0' + number : number;
    }

    function getFormattedTimestamp() {
        var date = new Date();

        var day = addLeadingZero(date.getDate());
        var month = addLeadingZero(date.getMonth() + 1); // Months are zero-based
        var year = date.getFullYear();
        var hours = addLeadingZero(date.getHours());
        var minutes = addLeadingZero(date.getMinutes());
        var seconds = addLeadingZero(date.getSeconds());

        return day + month + year + hours + minutes + seconds;
    }

    const generateRandomString = () => {
        const charset =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';

        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            randomString += charset.charAt(randomIndex);
        }

        return randomString;
    };

    // selecting doc from phone
    const selectDoc = async () => {

        try {
            const doc = await DocumentPicker.pick({
                allowMultiSelection: false,
                type: [DocumentPicker.types.doc, DocumentPicker.types.pdf, DocumentPicker.types.docx]
            });
            console.warn(doc);
            setSelectedDoc({
                name: "newJob" + getFormattedTimestamp() + generateRandomString() + doc[0].name,
                type: doc[0].type,
                uri: doc[0].uri,

            });
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                ToastAndroid.show("Please select a file to upload", 3000)
            }
            else ToastAndroid.show(error)
        }

        // console.warn(selectedDoc.name);
    };
    // validating form data
    const validateForm = () => {
        if (
            selectedTitleValue === '' ||
            selectedStateValue === '' ||
            openPosition === '' ||
            compensation === '' ||
            experience === '' ||
            Object.keys(selectedDoc).length === 0
        ) {
            ToastAndroid.show('All fields are required', 3000);
            return false;
        } else {
            return true;
        }
    };

    // saving form data in a variable
    var jobOpeningdata = {
        designation: selectedTitleValue,
        noOfPostion: openPosition,
        compensation: compensation,
        minExp: experience,
        state: selectedStateValue,
        jobDesc: jobDescription,
        jdDoc: selectedDoc?.name,
        operFlag: 'A',
        userId: '10011',
    };

    // sending formdata to backend
    const ApplyJob = async () => {
        if (validateForm()) {
            try {
                var formData = new FormData();
                formData.append('data', JSON.stringify(jobOpeningdata))

                formData.append('fileUpload', selectedDoc)
                // console.log(formData._parts)
                const res = await fetch("http://192.168.1.169:7038/api/hrms/jobOpeningRequest", {
                    method: "POST",
                    body: formData
                })
                // console.log(res)
            } catch (error) {
                console.log(error?.response)
            }
        }
    }

    // getting title value
    const checkTitleValue = (value) => {
        {
            for (let index = 0; index < titleOption.length; index++) {
                const element = titleOption[index];
                if (element.PARAM_NAME === value) setSelectedTitleValue(element.PARAM_ID);
            }
        }
    }

    // getting state value
    const checkStateValue = (value) => {
        {
            for (let index = 0; index < states.length; index++) {
                const element = states[index];
                if (element.PARAM_NAME === value) setSelectedStateValue(element.PARAM_ID);
            }
        }
    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>

            {/* header text */}
            <View style={styles.newJobOpeneingTxt}>
                <Icon name='book-plus-outline' color={COLORS.green} size={24} style={{ alignItems: 'center', padding: 2 }} />
                <Text style={{ color: COLORS.green, fontSize: 14, fontWeight: '500', textAlignVertical: 'center', padding: 5 }}>New Job Opening</Text>
            </View>

            {/* Posting Title dropdown */}
            <View style={{ margin: 7 }}>
                {/* {console.warn(titleName)} */}
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Posting Title</Text>
                <SelectDropdown data={titleName} buttonStyle={[styles.elevation, styles.inputHolder, { borderColor: COLORS.skyBlue }]} onSelect={(value) => { setSelectedTitle(value), checkTitleValue(value) }} defaultButtonText="Select Title" buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />
            </View>

            {/* number of position */}
            <View style={{ margin: 7 }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Number of position</Text>
                <CustomTextInput placeholder='Number of position' style={{ borderColor: COLORS.skyBlue, marginHorizontal: 0 }} keyboardType='numeric' value={openPosition} onChangeText={(value) => setOpenPosition(value)} />
            </View>

            {/* compensation */}
            <View style={{ margin: 7 }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Compensation</Text>
                <CustomTextInput placeholder='Compensation' style={{ borderColor: COLORS.skyBlue, marginHorizontal: 0 }} value={compensation} onChangeText={(value) => setCompensation(value)} keyboardType='numeric' />
            </View>

            {/* experience */}
            <View style={{ margin: 7 }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Minimium Experience(Years)  </Text>
                <CustomTextInput placeholder='Eg:2-4 years' style={{ borderColor: COLORS.skyBlue, marginHorizontal: 0 }} value={experience} onChangeText={(value) => setExperience(value)} keyboardType='numeric' />
            </View>


            {/* state dropdown */}
            <View style={{ margin: 7 }}>
                {/* {console.warn(statesName)} */}
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Select State</Text>
                <SelectDropdown data={statesName} buttonStyle={[styles.inputHolder, styles.elevation, { borderColor: COLORS.skyBlue }]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText="Select State" buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />
            </View>

            {/* job description */}
            <View style={{ margin: 7 }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}> Job Description  </Text>
                <CustomTextInput placeholder='Job Description' style={{ borderColor: COLORS.skyBlue, marginHorizontal: 0 }} value={jobDescription} onChangeText={(value) => setJobDescription(value)} />
            </View>

            <View style={[{ height: 100, margin: 7 }]}>
                <TouchableOpacity onPress={() => selectDoc()} style={[styles.elevation, styles.inputHolder, { borderColor: COLORS.skyBlue, width: '100%', backgroundColor: 'white' }]}>
                    <Icon name={Object.keys(selectedDoc).length > 0 ? 'file' : 'cloud-upload-outline'} color={Object.keys(selectedDoc).length > 0 ? COLORS.orange : COLORS.green} size={40} style={{ padding: 2 }} />
                    <Text style={{ color: COLORS.black, fontWeight: '500' }}> {Object.keys(selectedDoc).length > 0 ? selectedDoc.name : 'Job Description'} </Text>
                </TouchableOpacity>
            </View>

            {/* bottom Buttons */}
            <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                <TouchableOpacity style={[styles.regilizationBtn, styles.elevation, { backgroundColor: COLORS.voilet }]} onPress={() => ApplyJob()}>
                    <Text style={{ color: 'white' }}>Save Job Opening</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.regilizationBtn, styles.elevation, { backgroundColor: COLORS.red }]}>
                    <Text style={{ color: 'white' }}> Cancel </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    )

}

const styles = StyleSheet.create({
    newJobOpeneingTxt: {
        padding: 10,
        fontSize: 14,
        fontWeight: '500',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    regilizationBtn: {
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 20,
        borderWidth: 1,
        fontSize: 14,
        fontWeight: 500,
        height: 45,
        borderColor: COLORS.white
    },
    elevation: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 7
    },
    inputHolder: {
        borderWidth: 1,
        borderColor: 'white',
        flex: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        marginHorizontal: 0,
        marginVertical: 5,
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
})


export default CreateNewJobOpening