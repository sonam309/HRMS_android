import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid, Alert, BackHandler } from 'react-native'
import COLORS from '../../../constants/theme'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DocumentPicker from 'react-native-document-picker'
import CustomTextInput from '../../../components/CustomTextInput'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateNewJobOpening = (props) => {

    let departmentID = null
    let Id;
    let NAME;
    // for getting and setting data from API  
    const [titleOption, setTitleOption] = useState();
    const [titleName, setTitleName] = useState();
    const [states, setStates] = useState()
    const [statesName, setStatesName] = useState()
    const [depIdStr, setdepIdStr] = useState();


    // for setting and posting Data to API
    const [selectedTitle, setSelectedTitle] = useState();
    const [selectedTitleValue, setSelectedTitleValue] = useState('');
    const [selectedState, setSelectedState] = useState();
    const [selectedStateValue, setSelectedStateValue] = useState('');
    const [cityValue, setcityValue] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [approverName, setApprovername] = useState('');
    const [approverId, setApproverId] = useState('');


    const [openPosition, setOpenPosition] = useState('');
    const [compensation, setCompensation] = useState('');
    const [experience, setExperience] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [selectedDoc, setSelectedDoc] = useState({});


    const getdepId = async () => {

        const res = await AsyncStorage.getItem('loggedUser');
        // console.log("2222222222",JSON.parse(res))
        // const user = await JSON.parse(res)
        // console.log("41",user.DEPT_ID.toString());


        axios
            .post(`http://192.168.1.169:7038/api/hrms/saveApprovel`, {
                userId: '10011',
                operFlag: 'V',
                departmentId: '7',
                approvelType: 'Hire',
            })
            .then(response => {
                const returnedData = response?.data?.Result;
                console.log('85', response.data.Result);
                //   setApproverData(returnedData[0]);
                Id = returnedData[0].EMPLOYEE_ID
                NAME = returnedData[0].FIRST_NAME


                { console.log("59", Id + "$$$$" + NAME); }

            })
            .catch(error => {
                console.log(error)
            });


        // setApproverId(Id);
        // setApprovername(NAME);

    }


    useEffect(() => {
        getdepId();
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

    // const getApproverInfo = () => {
    //     ( console.log("45678",depIdStr))

    //     axios
    //         .post(`http://192.168.1.169:7038/api/hrms/saveApprovel`, {
    //             userId: '10011',
    //             operFlag: 'V',
    //             departmentId:depIdStr,
    //             approvelType: 'Hire',


    //         })
    //         .then(response => {
    //             const returnedData = response?.data?.Result;
    //             console.log('85', returnedData);
    //             //   setApproverData(returnedData[0]);
    //             setApproverId(returnedData.EMPLOYEE_ID);
    //             setApprovername(returnedData.FIRST_NAME);
    //         })
    //         .catch(error => {
    //             Toast.show({
    //                 type: 'error',
    //                 text1: JSON.stringify(error),
    //             });
    //         });

    // }

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
        city: cityValue,
        postalCode: postalCode,
        operFlag: 'A',
        userId: '10011',
    };

    // sending formdata to backend
    const ApplyJob = async () => {
        if (validateForm()) {

            // sending notif to Kamal sir 
            let notifData = {
                "registration_ids": ["ctSkLjX1RG6tYuIOps4yl6:APA91bGyKsjY1uYEo7QssRkrY-Txq_3ILcSju41m6yOOhLiYZdTaFT3Dz8M3avSvR1RllH7hb9Out0Mdss6aNOxZlXyRqKVtGPYh-EPrInR8lZeL8HCdp-mLqkf0aLSF1xH8p8em-q7l"],
                "notification": {
                    "body": "Hello Kamal Sir, How are you?",
                    "title": "Hello",
                    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFfx54zcQWgeMidABqIECRCAEZZ_Oj-rOeQg&usqp=CAU"
                }
            }

            try {
                var formData = new FormData();
                formData.append('data', JSON.stringify(jobOpeningdata))

                formData.append('fileUpload', selectedDoc)
                // console.log(formData._parts)
                // Posting new job opening 
                let res = await fetch("http://192.168.1.169:7038/api/hrms/jobOpeningRequest", {
                    method: "POST",
                    body: formData

                })
                res = await res.json();

                // console.log((res.Result[0].MSG))

                // ToastAndroid.show(res.Result.MSG,3000);

                Alert.alert(res.Result[0].MSG);



                // API used for sending message
                const notif = await fetch("https://fcm.googleapis.com/fcm/send", {
                    method: "POST",
                    headers: {
                        "Authorization": "key=AAAASJkPezE:APA91bHR6OqAkU-hhIOTivMtnZZY7-ggAf014Ead-cRop75IwAygkpnZ8JPaD9UfcU3B7IOLacBpVZMzLsKXofWLlrGwbXR-MC8FyxwS6Thotu9brtBj0yTQZXQuvjt-oLR_PJ9WwbF0",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(notifData)
                })

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
                <Text style={{ color: COLORS.green, fontSize: 14, fontWeight: '500', textAlignVertical: 'center', padding: 5 }}>
                    New Job Opening</Text>
            </View>

            {/* Posting Title dropdown */}
            <View style={{ margin: 7 }}>
                {/* {console.warn(titleName)} */}
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Posting Title <Text style={{ color: COLORS.red }}>* </Text></Text>
                <SelectDropdown data={titleName} buttonStyle={[styles.elevation, styles.inputHolder, { borderColor: COLORS.skyBlue }]} onSelect={(value) => { setSelectedTitle(value), checkTitleValue(value) }} defaultButtonText="Select Title" buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />
            </View>

            {/* number of position */}
            <View style={{ margin: 7 }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Number of position <Text style={{ color: COLORS.red }}>* </Text> </Text>
                <CustomTextInput placeholder='Number of position' style={{ borderColor: COLORS.skyBlue, marginHorizontal: 0 }} keyboardType='numeric' value={openPosition} onChangeText={(value) => setOpenPosition(value)} />
            </View>

            {/* compensation */}
            <View style={{ margin: 7 }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Compensation <Text style={{ color: COLORS.red }}>* </Text> </Text>
                <CustomTextInput placeholder='Compensation' style={{ borderColor: COLORS.skyBlue, marginHorizontal: 0 }} value={compensation} onChangeText={(value) => setCompensation(value)} keyboardType='numeric' />
            </View>

            {/* experience */}
            <View style={{ margin: 7 }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Minimium Experience(Years) <Text style={{ color: COLORS.red }}>* </Text> </Text>
                <CustomTextInput placeholder='Eg:2-4 years' style={{ borderColor: COLORS.skyBlue, marginHorizontal: 0 }} value={experience} onChangeText={(value) => setExperience(value)} keyboardType='numeric' />
            </View>


            {/* state dropdown */}
            <View style={{ margin: 7 }}>
                {/* {console.warn(statesName)} */}
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Select State <Text style={{ color: COLORS.red }}>* </Text> </Text>
                <SelectDropdown data={statesName} buttonStyle={[styles.inputHolder, styles.elevation, { borderColor: COLORS.skyBlue }]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText="Select State" buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />
            </View>


            {/* city */}
            <View style={{ margin: 7 }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>City</Text>
                <CustomTextInput placeholder='City' style={{ borderColor: COLORS.skyBlue, marginHorizontal: 0 }} value={compensation} onChangeText={(value) => setcityValue(value)} />
            </View>

            {/* Postal Code */}
            <View style={{ margin: 7 }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}>Postal Code</Text>
                <CustomTextInput placeholder='Postal Code' style={{ borderColor: COLORS.skyBlue, marginHorizontal: 0 }} value={compensation} onChangeText={(value) => setpostalCode(value)} keyboardType='numeric' />
            </View>

            {/* job description */}
            <View style={{ margin: 7 }}>
                <Text style={{ color: COLORS.black, fontWeight: '500' }}> Job Remarks <Text style={{ color: COLORS.red }}>* </Text> </Text>
                <CustomTextInput placeholder='Job Remarks' style={{ borderColor: COLORS.skyBlue, marginHorizontal: 0 }} value={jobDescription} onChangeText={(value) => setJobDescription(value)} />
            </View>

            <View style={[{ height: 100, margin: 7 }]}>
                <TouchableOpacity onPress={() => selectDoc()} style={[styles.elevation, styles.inputHolder, { borderColor: COLORS.skyBlue, width: '100%', backgroundColor: 'white' }]}>
                    <Icon name={Object.keys(selectedDoc).length > 0 ? 'file' : 'cloud-upload-outline'} color={Object.keys(selectedDoc).length > 0 ? COLORS.orange : COLORS.green} size={40} style={{ padding: 2 }} />
                    <Text style={{ color: COLORS.black, fontWeight: '500' }}> {Object.keys(selectedDoc).length > 0 ? selectedDoc.name : 'Job Description'} </Text>
                </TouchableOpacity>
            </View>

            {/* approver view */}
            <View style={[{ margin: 10 }]}>
                <View>
                    <Text style={{ color: COLORS.black, fontSize: 15, fontWeight: '500', marginLeft: 5 }}>Approver</Text>
                    <View style={{
                        borderWidth: 1, borderColor: COLORS.skyBlue, flex: 1, borderRadius: 10, backgroundColor: 'white', marginHorizontal: 0, marginVertical: 5, height: 100, width: '100%', alignItems: 'center', paddingHorizontal: 10, flexDirection: 'row',
                    }}>
                        <Icon name='account-circle' color={COLORS.gray} size={55} />
                        <View>
                            {console.log(Id + "&&&&" + NAME)}
                            <Text style={{ color: COLORS.gray }}>{NAME}</Text>
                            <Text style={{ color: COLORS.gray }}>{Id}</Text>
                        </View>
                    </View>
                </View>
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