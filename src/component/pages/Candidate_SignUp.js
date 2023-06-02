import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomTextInput from '../Utility/CustomTextInput';

const Candidate_SignUp = () => {
    const marriage = ["Single", "Married", "Divorced", "Widowed"]
    const bloodGroup = ["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"]
    const gender = ["Male", "Female", "Other"]
    const [appliedView, setAppliedView] = useState(false)
    const [personalView, setPersonalView] = useState(false)
    const [educationView, setEducationView] = useState(false)
    const [referenceView, setReferenceView] = useState(false)
    const [experienceView, setExperienceView] = useState(false)
    const [selectedPosition, setSelectedPosition] = useState("Select Position")
    const [selectedGender, setSelectedGender] = useState("Select Gender")
    const [martialStatus, setMartialStatus] = useState("Select Martial Status")
    const [homeState, setHomeState] = useState("Select Home State")
    const [myBloodGroup, setMyBloodGroup] = useState("Select Blood Group")
    const [openPositions, setOpenPositions] = useState([])
    const [myState, setMyState] = useState([])
    const [showCalendar, setShowCalendar] = useState(false)
    const [selectedDate, setSelectedDate] = useState();

    let positions, states;

    // on changing the value of date
    const handleDateChange = (event, date) => {
        setShowCalendar(false)
        const {
            type,
            nativeEvent: { timestamp },
        } = event;
        let time = date.getDate() + "/" + (date.getMonth() + 1) + '/' + date.getFullYear()
        setSelectedDate(time);
    };

    //  function for getting the data for open positions and states from API
    const fetchDropDowndata = async (param) => {
        let data = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${param}`);
        data = await data.json();
        param === "C" ? (positions = data.map(a => a.PARAM_NAME), setOpenPositions(positions)) : null;
        param === "7" ? (states = data.map(b => b.PARAM_NAME), setMyState(states)) : null;
    }

    // getting the data for open positions and states from API
    useEffect(() => {
        openPositions.length === 0 ? fetchDropDowndata("C") : null;
        myState.length === 0 ? fetchDropDowndata("7") : null;
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ margin: 10 }}>

                {/* Applied For */}
                <View style={{ margin: 10 }}>
                    <TouchableOpacity onPress={() => setAppliedView(!appliedView)} style={[styles.elevation, styles.headerStyle]}>
                        <Text>Applied For</Text>
                        <Icons name={appliedView ? 'chevron-down' : 'chevron-right'} color="orange" size={25} />
                    </TouchableOpacity>
                    {
                        appliedView ? (
                            <View style={{ margin: 10 }}>
                                <SelectDropdown data={openPositions} buttonStyle={[styles.elevation, styles.dropDownStyle, { width: '100%' }]} onSelect={(value) => { setSelectedPosition(value) }} defaultButtonText={openPositions[0]} buttonTextStyle={{ fontSize: 15 }} />
                            </View>
                        ) : null
                    }
                </View>

                {/* Personal info */}
                <View style={{ margin: 10 }}>
                    <TouchableOpacity onPress={() => setPersonalView(!personalView)} style={[styles.elevation, styles.headerStyle]}>
                        <Text>Personal Details</Text>
                        <Icons name={personalView ? 'chevron-down' : 'chevron-right'} color="orange" size={25} />
                    </TouchableOpacity>
                    {
                        personalView ? (
                            <View style={{ marginHorizontal: 3, marginVertical: 10 }}>

                                <View style={styles.viewHolder}>
                                    <CustomTextInput style={styles.elevation} placeholder='First Name' />
                                    <CustomTextInput style={styles.elevation} placeholder='Middle Name' />
                                </View>

                                <View style={styles.viewHolder}>
                                    <CustomTextInput style={styles.elevation} placeholder='Last Name' />
                                    <SelectDropdown data={gender} buttonStyle={[styles.elevation, styles.dropDownStyle, styles.inputHolder]} onSelect={(value) => { setSelectedGender(value) }} defaultButtonText={selectedGender} buttonTextStyle={{ fontSize: 15 }} />
                                </View>

                                <View style={styles.viewHolder}>
                                    <CustomTextInput style={styles.elevation} placeholder='Father Name' />
                                </View>

                                <View style={styles.viewHolder}>
                                    <TouchableOpacity onPress={() => setShowCalendar(true)} style={[styles.inputHolder, styles.elevation]}>
                                        <Text>Select Date of Birth</Text>
                                        {
                                            showCalendar ? <DateTimePicker value={new Date()} onChange={handleDateChange} /> : null
                                        }
                                    </TouchableOpacity>
                                    <SelectDropdown data={marriage} buttonStyle={[styles.elevation, styles.dropDownStyle, styles.inputHolder]} onSelect={(value) => { setMartialStatus(value) }} defaultButtonText={martialStatus} buttonTextStyle={{ fontSize: 15 }} />
                                </View>

                                <View style={styles.viewHolder}>
                                    <CustomTextInput style={styles.elevation} placeholder='Permanent Address' />
                                </View>

                                <View style={styles.viewHolder}>
                                    <CustomTextInput style={styles.elevation} placeholder='Pincode' />
                                    <SelectDropdown data={myState} buttonStyle={[styles.elevation, styles.dropDownStyle, styles.inputHolder]} onSelect={(value) => { setHomeState(value) }} defaultButtonText={myState[0]} buttonTextStyle={{ fontSize: 15 }} />
                                </View>

                                <View style={styles.viewHolder}>
                                    <CustomTextInput style={styles.elevation} placeholder='Mobile No.' />
                                </View>

                                <View style={styles.viewHolder}>
                                    <CustomTextInput style={styles.elevation} placeholder='Aadhaar No.' />
                                </View>

                                <View style={styles.viewHolder}>
                                    <CustomTextInput style={styles.elevation} placeholder='Current Address' />
                                </View>

                                <View style={styles.viewHolder}>
                                    <SelectDropdown data={bloodGroup} buttonStyle={[styles.elevation, styles.dropDownStyle, styles.inputHolder]} onSelect={(value) => { setMyBloodGroup(value) }} defaultButtonText={myBloodGroup} buttonTextStyle={{ fontSize: 15 }} />
                                    <CustomTextInput style={styles.elevation} placeholder='PAN No.' />
                                </View>

                                <View style={styles.viewHolder}>
                                    <CustomTextInput style={styles.elevation} placeholder='Email' />
                                </View>

                            </View>
                        ) : null
                    }
                </View>

                {/* Education */}
                <View style={{ margin: 10 }}>
                    <TouchableOpacity onPress={() => setEducationView(!educationView)} style={[styles.elevation, styles.headerStyle]}>
                        <Text>Education</Text>
                        <Icons name={educationView ? 'chevron-down' : 'chevron-right'} color="orange" size={25} />
                    </TouchableOpacity>
                    {
                        educationView ? (
                            <View style={{ margin: 10 }}>
                                <View style={styles.viewHolder}>
                                    <CustomTextInput style={styles.elevation} placeholder='Highest Qualification' />
                                </View>
                                <View style={styles.viewHolder}>
                                    <CustomTextInput style={styles.elevation} placeholder='University' />
                                </View>
                            </View>
                        ) : null
                    }
                </View>

                {/* References */}
                <View style={{ margin: 10 }}>
                    <TouchableOpacity onPress={() => setReferenceView(!referenceView)} style={[styles.elevation, styles.headerStyle]}>
                        <Text>References</Text>
                        <Icons name={referenceView ? 'chevron-down' : 'chevron-right'} color="orange" size={25} />
                    </TouchableOpacity>
                    {
                        referenceView ? (
                            <View style={{ margin: 10 }}>
                                <View style={styles.viewHolder}>
                                    <CustomTextInput style={styles.elevation} placeholder='Please Enter Name' />
                                </View>
                            </View>
                        ) : null
                    }
                </View>

                {/* Experiences */}
                <View style={{ margin: 10 }}>
                    <TouchableOpacity onPress={() => setExperienceView(!experienceView)} style={[styles.elevation, styles.headerStyle]}>
                        <Text>Experience</Text>
                        <Icons name={experienceView ? 'chevron-down' : 'chevron-right'} color="orange" size={25} />
                    </TouchableOpacity>
                    {
                        experienceView ? (
                            <View style={{ margin: 10 }}>
                                <View style={styles.viewHolder}>
                                    <CustomTextInput style={styles.elevation} placeholder='Last Employement' />
                                </View>

                                <View style={styles.viewHolder}>
                                    <CustomTextInput style={styles.elevation} placeholder='Current Employement' />
                                </View>

                                <View style={styles.viewHolder}>
                                    <CustomTextInput style={styles.elevation} placeholder='Current CTC' />
                                </View>

                                <View style={styles.viewHolder}>
                                    <CustomTextInput placeholder='Upload Resume' />
                                </View>

                            </View>
                        ) : null
                    }
                </View>
            </ScrollView>


            {/* Submit Button */}
            <TouchableOpacity style={[styles.submitButton, styles.elevation]}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
    dropDownStyle: {
        flex: 1, backgroundColor: 'white', borderRadius: 10, height: 40
    },
    inputHolder: {
        borderWidth: 1,
        borderColor: 'white',
        flex: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        marginHorizontal: 3,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewHolder: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    headerStyle: {
        backgroundColor: 'white',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10
    },
    submitButton: {
        backgroundColor: '#220046',
        marginVertical: 5,
        padding: 10,
        borderRadius: 35,
        marginHorizontal: 25,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Candidate_SignUp