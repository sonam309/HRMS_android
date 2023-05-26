import { TouchableOpacity, StyleSheet, Text, TextInput, View, Image, Alert, PermissionsAndroid } from 'react-native'
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

    return (
        <View style={styles.container}>

            {/* Company Logo */}
            <Image source={company_logo} style={{ marginTop: 30, width: '100%', height: 120 }} />

            {/* user credentials */}
            <Text style={{ marginRight: 25, marginLeft: 25, marginBottom: 8, fontWeight: 'bold', color: 'grey' }}>Employee Login</Text>

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
                    <Image source={require('../images/Pinlock.png')} style={{ width: 60, height: 60 }} />
                    <Text style={{ color: 'darkblue' }}>Quick Pin</Text>
                </View>

                {/* Remember me option */}
                <View>
                    <RadioButton.Group onValueChange={handleValueChange}
                        value={selectedValue}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value='rememberMe' /><Text>Remember Me</Text>
                        </View>
                    </RadioButton.Group>
                </View>

            </View>

            {/* Log In Button */}
            <TouchableOpacity style={styles.loginButton}>
                <AntDesign name='poweroff' color='white' size={20} />
                <Text style={styles.loginButtonText} onPress={() => submit()}>Log In</Text>
            </TouchableOpacity>

            {/* Punching Option */}
            <View style={{ flexDirection: 'row', marginLeft: 25, marginRight: 25, marginTop: 15, justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => getCurrentLocation("I")} style={[styles.punchButton, { backgroundColor: 'blue' }]}>
                    <Text style={styles.loginButtonText}>Punch In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getCurrentLocation("O")} style={[styles.punchButton, { backgroundColor: 'red' }]}>
                    <Text style={[styles.loginButtonText]}>Punch Out</Text>
                </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <Text style={styles.forgotPassword}>Forgot Password?</Text>

            {/* Bottom element */}
            <Text style={styles.bottomElement}>Version: <Text style={{ color: 'orange', fontWeight: '900' }}>2.2</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    },
    loginOption: {
        marginLeft: 25,
        marginRight: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16
    },
    textInputBox: {
        marginLeft: 21,
        marginRight: 25,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'white',
        marginTop: 4,
        marginBottom: 4,
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
        marginLeft: 25,
        marginRight: 25,
        color: 'orange',
        fontSize: 15,
        textAlign: 'center',
        margin: 20
    },
    punchButton: {
        width: '50%',
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
        marginLeft: 25,
        marginRight: 25,
        flexDirection: 'row',
        marginTop: 40,
        height: 60,
        backgroundColor: '#72c26b',
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
        marginLeft: 25,
        marginRight: 25,
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 11
    },
    bottomElement: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'grey',
        fontSize: 15
    }
})

export default Employee_Login