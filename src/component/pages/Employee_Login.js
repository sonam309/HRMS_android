import { TouchableOpacity, StyleSheet, Text, TextInput, View, Image, Alert, PermissionsAndroid, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import GetLocation from 'react-native-get-location'
import company_logo from '../images/company_logo.jpg'


const Employee_Login = (props) => {
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
            }).catch(error => { const { code, message } = error; Alert.alert(code, message);})) : (Alert.alert("Location permission not granted"))
    }

    // preventing going to entry page
    const navigation = useNavigation();
    useEffect(() => {
        const preventBack = navigation.addListener('beforeRemove', event => {
            event.preventDefault();
        })
        return preventBack
    }, [navigation])

    // displaying password
    const changeVisibility = () => {
        setShowVisibility(!showVisibility)
    }

    // logging in function
    const submit = () => {
        const userData = {loginId: userName,password: password,oprFlag: 'L'};
        axios.post('https://econnectsatya.com:7033/api/User/login', userData).then((response) => {
            const returnedData = response.data.Result;
            let result = returnedData.map(a => a.FLAG);
            let full_name = returnedData.map(b => b.FIRST_NAME)
            result[0] === "S" ? (props.navigation.navigate("Employee_page", { full_name, userName })) : Alert.alert("Failure", "Please enter correct credentials")
        })
    }


    const clickQuickPin=()=>{

        if(userName!=''){

            props.navigation.navigate("QuickPin",{userName})

        }else{

            Alert.alert("Please enter User Name")

        }

    }

    // Punching In and Out from login page
    const punchInClick = (val) => {
        const userData = {loginId: userName,password: password,oprFlag: 'L'};

        let action = (val === 'I' ? "In" : "Out")
        axios.post('https://econnectsatya.com:7033/api/User/login', userData).then((response) => {
            const returnedData = response.data.Result;
            let result = returnedData.map(a => a.FLAG);
            result[0] === "S" ? (fetch("https://econnectsatya.com:7033/api/Admin/punchinOut", {
                method: "POST",
                headers: {Accept: "application/json", "Content-Type": "application/json"},
                body: JSON.stringify({operFlag: val,userId: userName}),
            })
                .then((response) => response.json())
                .then((responseData) => {
                    Alert.alert("Success", `Punched ${action} Successfully`)
                })) : Alert.alert("Failure", "Please enter correct credentials")
        })
    }

    //Random Number
    const RandomNumber = (length) => {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    }

    const forgetPasswordApi = () => {
        let otp = RandomNumber("6")
        axios.get('https://econnectsatya.com:7033/api/GetMobileNo', {
            params: { loginId: userName, operFlag: "E", message: otp +" Is the OTP for your mobile verfication on Satya One."
            }
        }).then((response) => {

            const returnedData = response.data.Result;
            // console.warn(returnedData);
            let result = returnedData.map(a => a.FLAG);
            let contact = returnedData.map(b => b.MSG.trim());

            result[0] === "S" ? (props.navigation.navigate("Otp_Verification", { contact, otp, userName })) : Alert.alert("Failure", "Please enter correct credentials")
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#220046" />

            {/* Company Logo */}
            <View style={{ flex: 0.8 }}>
                <Image source={company_logo} style={{ marginTop: 30,width: "100%", height: '100%' }} />
            </View>

            <View style={{ justifyContent: 'center', flex: 2.6 }}>
                <Text style={styles.header}>Employee Login</Text>
                {/* user credentials -username */}
                <View style={[styles.textInputBox, styles.elevation]}>
                    <FontAwesome5 name='user-alt' color='orange' size={17} style={{ marginHorizontal: 10 }} />
                    <TextInput style={{ flex: 1 }} placeholder='Username' placeholderTextColor='#999384' value={userName} onChangeText={(name) => setUserName(name)} />
                </View>

                {/* Password */}
                <View style={[styles.textInputBox, styles.elevation]}>
                    <Feather name='lock' color='orange' size={17} style={{ marginHorizontal: 10 }} />
                    <TextInput style={{ flex: 1 }} placeholder='Password' secureTextEntry={showVisibility} autoCapitalize='none' autoCorrect={false} placeholderTextColor='#999384' value={password} onChangeText={(security) => setPassword(security)} />
                    <AntDesign name='eye' onPress={changeVisibility} style={{ position: 'absolute', right: 9 }} size={22} />
                </View>

                {/* Quick Pin option */}  
                <View style={styles.loginOption}>
            <TouchableOpacity onPress={() => clickQuickPin()}>

                    <View style={{ alignItems: 'center' }} >
                        <Image source={require('../images/Pinlock.png')} style={{ width: 35, height: 35 }} />
                        <Text style={{ color: 'darkblue' }}>Quick Pin</Text>
                    </View>

                </TouchableOpacity>
                </View>

                {/* Log In Button */}
                <TouchableOpacity style={[styles.loginButton, styles.elevation]}>
                    <AntDesign name='poweroff' color='white' size={20} />
                    <Text style={[styles.loginButtonText, { marginHorizontal: 15 }]} onPress={() => submit()}>Log In</Text>
                </TouchableOpacity>

                {/* Punching Option */}
                <View style={styles.punchArea}>
                    <TouchableOpacity onPress={() => getCurrentLocation("I")} style={[styles.punchButton, styles.elevation, { backgroundColor: '#03A157' }]}>
                        <Text style={styles.loginButtonText}>Punch In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => getCurrentLocation("O")} style={[styles.punchButton, styles.elevation, { backgroundColor: 'red' }]}>
                        <Text style={[styles.loginButtonText]}>Punch Out</Text>
                    </TouchableOpacity>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity>
                    <Text style={styles.forgotPassword} onPress={() => forgetPasswordApi()}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom element */}

            <View style={{ flex: 0.2 }}>
                <Text style={styles.bottomElement}>Version: <Text style={{ color: 'orange', fontWeight: '900' }}>2.2</Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        marginVertical: 8,
        fontWeight: 'bold',
        color: '#220046'
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
    loginOption: {
        marginHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 12
    },
    textInputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    forgotPassword: {
        color: 'orange',
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 12
    },
    punchArea: {
        flexDirection: 'row',
        marginHorizontal: 25,
        marginVertical: 12,
        justifyContent: 'space-between'
    },
    punchButton: {
        width: '45%',
        height: 40,
        borderRadius: 35,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },
    loginButton: {
        marginHorizontal: 25,
        flexDirection: 'row',
        marginVertical: 12,
        height: 45,
        backgroundColor: '#220046',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 300,
        marginHorizontal: 5
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