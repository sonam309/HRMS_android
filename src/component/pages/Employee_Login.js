import { TouchableOpacity, StyleSheet, Text, TextInput, View, Image, Alert, PermissionsAndroid, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { RadioButton } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import GetLocation from 'react-native-get-location'
import company_logo from '../images/company_logo.jpg'

const Employee_Login = (props) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [showVisibility, setShowVisibility] = useState(true);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180)
    }

    // distance from longitude and latitutde in KM
    const getDistInKm = (lat1, lon1, lat2, lon2) => {
        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2 - lat1);  // deg2rad above
        let dLon = deg2rad(lon2 - lon1);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        return d;
    }

    const getCurrentLocation = async (val) => {
        let inOut = (val === 'I' ? "In" : "Out")
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
        );
        granted === PermissionsAndroid.RESULTS.GRANTED ? (GetLocation.getCurrentPosition({
            enableHighAccuracy: false,
            timeout: 30000,
        })
            .then(location => {
                console.log(location);
                let dist = getDistInKm(location.latitude, location.longitude, 28.54054054054054, 77.34496209068595)
                if (dist < 0.5) {
                    punchInClick(val);
                } else { Alert.alert(`Punch ${inOut} from your office`) }
            })
            .catch(error => {
                const { code, message } = error;
                Alert.alert(code, message);
            })) : (Alert.alert("Location permission not granted"))
    }

    // preventing going to entry page
    const navigation = useNavigation();
    useEffect(() => {
        const preventBack = navigation.addListener('beforeRemove', event => {
            event.preventDefault();
        })
        return preventBack
    }, [navigation])

    // checking 'remember me' box
    const handleValueChange = (value) => {
        setSelectedValue(value);
    };

    // displaying password
    const changeVisibility = () => {
        setShowVisibility(!showVisibility)
    }

    // logging in function
    const submit = () => {
        const userData = {
            loginId: userName,
            password: password,
            oprFlag: 'L',
        };
        axios.post('https://econnectsatya.com:7033/api/User/login', userData).then((response) => {
            const returnedData = response.data.Result;
            let result = returnedData.map(a => a.FLAG);
            let full_name = returnedData.map(b => b.FIRST_NAME)
            result[0] === "S" ? (props.navigation.navigate("Employee_page", { full_name, userName })) : Alert.alert("Failure", "Please enter correct credentials")
        })
    }

    // Punching In and Out from login page
    const punchInClick = (val) => {
        const userData = {
            loginId: userName,
            password: password,
            oprFlag: 'L',
        };
        let action = (val === 'I' ? "In" : "Out")
        axios.post('https://econnectsatya.com:7033/api/User/login', userData).then((response) => {
            const returnedData = response.data.Result;
            let result = returnedData.map(a => a.FLAG);
            result[0] === "S" ? (fetch("https://econnectsatya.com:7033/api/Admin/punchinOut", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    operFlag: val,
                    userId: userName,
                }),
            })
                .then((response) => response.json())
                .then((responseData) => {
                    Alert.alert("Success", `Punched ${action} Successfully`)
                })) : Alert.alert("Failure", "Please enter correct credentials")
        })
    }



    //Random Number
    const RandomNumber = (length) => {

        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 *
            Math.pow(10, length - 1));

    }




    //forgetPassword api Call
    const forgetPasswordApi = () => {


        // Simple_If_Else=()=>{

        //     if(userName.trim.length!=0){

        let otp = RandomNumber("6")
        axios.get('https://econnectsatya.com:7033/api/GetMobileNo', {
            params: {
                loginId: userName, operFlag: "E", message: otp +
                    " Is the OTP for your mobile verfication on Satya One."

            }
        }).then((response) => {



            const returnedData = response.data.Result;

            // console.warn(returnedData);
            let result = returnedData.map(a => a.FLAG);
            let contact = returnedData.map(b => b.MSG.trim());

            result[0] === "S" ? (props.navigation.navigate("Otp_Verification", { contact, otp, userName }))
                : Alert.alert("Failure", "Please enter correct credentials")

            // result[0] === "S" ? (Alert.alert("Sucess", "Contcat "+contact))
            //  : Alert.alert("Failure", "Please enter correct credentials")



        })



    }

    return (
        <View style={styles.container}>

            <StatusBar backgroundColor="#220046" />
            {/* Company Logo */}
            <Image source={company_logo} style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 250 }} />

            {/* user credentials */}
            <Text style={{ marginHorizontal: 25, marginVertical: 8, fontWeight: 'bold', color: 'grey' }}>Employee Login</Text>

            {/* Username */}
            <View style={styles.textInputBox}>
                <FontAwesome5 name='user-alt' color='orange' size={17} style={{ marginRight: 10, marginLeft: 10 }} />
                <TextInput placeholder='Username' placeholderTextColor='#999384' value={userName} onChangeText={(name) => setUserName(name)} />
            </View>

            {/* Password */}
            <View style={styles.textInputBox}>
                <Feather name='lock' color='orange' size={17} style={{ marginRight: 10, marginLeft: 10 }} />

                <TextInput placeholder='Password' secureTextEntry={showVisibility} autoCapitalize='none' autoCorrect={false} placeholderTextColor='#999384' value={password} onChangeText={(security) => setPassword(security)} />

                <AntDesign name='eye' onPress={changeVisibility} style={{ position: 'absolute', right: 0, marginRight: 9 }} size={22} />
            </View>

            {/* Login Options */}
            <View style={styles.loginOption}>

                {/* Quick Pin option */}
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../images/Pinlock.png')} style={{ width: 40, height: 40 }} />
                    <Text style={{ color: 'darkblue' }}>Quick Pin</Text>
                </View>

            </View>

            {/* Log In Button */}
            <TouchableOpacity style={styles.loginButton}>
                <AntDesign name='poweroff' color='white' size={20} />
                <Text style={styles.loginButtonText} onPress={() => submit()}>Log In</Text>
            </TouchableOpacity>

            {/* Punching Option */}
            <View style={{ flexDirection: 'row', marginHorizontal: 25, marginVertical: 15, justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => getCurrentLocation("I")} style={[styles.punchButton, { backgroundColor: 'blue' }]}>
                    <Text style={styles.loginButtonText}>Punch In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getCurrentLocation("O")} style={[styles.punchButton, { backgroundColor: 'red' }]}>
                    <Text style={[styles.loginButtonText]}>Punch Out</Text>
                </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity >

                <Text style={styles.forgotPassword} onPress={() => forgetPasswordApi()}>Forgot Password?</Text>

            </TouchableOpacity>

            {/* Bottom element */}
            <View style={{flex:1}}>
                <Text style={styles.bottomElement}>Version: <Text style={{ color: 'orange', fontWeight: '900' }}>2.2</Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 25
    },
    loginOption: {
        marginHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 12
    },
    textInputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 7
    },
    forgotPassword: {
        color: 'orange',
        fontSize: 15,
        textAlign: 'center',
        margin: 20
    },
    punchButton: {
        width: 150,
        height: 50,
        borderRadius: 35,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        elevation: 7,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    loginButton: {
        marginHorizontal: 25,
        flexDirection: 'row',
        marginVertical: 20,
        height: 50,
        backgroundColor: '#300161',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 7,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4
    },
    loginButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 300,
        marginHorizontal: 15
    },
    bottomElement: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'grey',
        fontSize: 15,
    }
})

export default Employee_Login