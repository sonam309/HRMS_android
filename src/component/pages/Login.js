import { TouchableOpacity, StyleSheet, Text, TextInput, View, Image, Alert, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const Login = (props) => {
    const [showVisibility, setShowVisibility] = useState(true);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    //Random Number
    const RandomNumber = (length) => {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    }

    // forgetpassword
    const forgetPasswordApi = () => {

        let otp = RandomNumber("6")
        axios.get('https://econnectsatya.com:7033/api/GetMobileNo', {
            params: {
                loginId: userName, operFlag: "E", message: otp +
                    " Is the OTP for your mobile verfication on Satya One."
            }
        }).then((response) => {
            const returnedData = response.data.Result;
            let result = returnedData.map(a => a.FLAG);
            let contact = returnedData.map(b => b.MSG.trim());

            result[0] === "S" ? (props.navigation.navigate("Otp_Verification", { contact, otp, userName })) : Alert.alert("Failure", "Please enter correct credentials")
        })
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
        const userData = { loginId: userName, password: password, oprFlag: 'L' };
        axios.post('https://econnectsatya.com:7033/api/User/login', userData).then((response) => {
            const returnedData = response.data.Result;
            let result = returnedData.map(a => a.FLAG);
            result[0] === "S" ? Alert.alert("Congratulations", "Succesfully logged in") : Alert.alert("Failure", "Please enter correct credentials")
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#220046" />

            {/* Company Logo */}
            <View style={{ flex: 0.8 }}>
                <Image source={require('../images/company_logo.jpg')} style={{ marginTop: 30, width: '100%', height: '100%' }} />
            </View>

            <View style={{ justifyContent: 'center', flex: 2.6 }}>
                <Text style={styles.header}>Candidate Login</Text>
                {/* user credentials - Username */}
                <View style={[styles.textInputBox, styles.elevation]}>
                    <FontAwesome5 name='user-alt' color='orange' size={17} style={{ marginHorizontal: 10 }} />
                    <TextInput style={{ flex: 1 }} placeholder='Username' placeholderTextColor='#999384' value={userName} onChangeText={(name) => setUserName(name)} />
                </View>

                {/* Password */}
                <View style={[styles.textInputBox, styles.elevation]}>
                    <Feather name='lock' color='orange' size={17} style={{ marginHorizontal: 10 }} />
                    <TextInput style={{ flex: 1 }} placeholder='Password' secureTextEntry={showVisibility} autoCapitalize='none' autoCorrect={false} placeholderTextColor='#999384' value={password} onChangeText={(security) => setPassword(security)} />
                    <AntDesign name='eye' onPress={changeVisibility} style={{ position: 'absolute', right: 0, marginRight: 9 }} size={22} />
                </View>

                {/* Quick Pin Option */}
                <View style={styles.loginOption}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("QuickPin")} style={{ alignItems: 'center' }}>
                        <Image source={require('../images/Pinlock.png')} style={{ width: 35, height: 35 }} />
                        <Text style={{ color: 'darkblue' }}>Quick Pin</Text>
                    </TouchableOpacity>
                </View>

                {/* Log In Button */}
                <TouchableOpacity style={[styles.loginButton, styles.elevation]}>
                    <AntDesign name='poweroff' color='white' size={20} />
                    <Text style={styles.loginButtonText} onPress={() => submit()}>Log In</Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <TouchableOpacity>
                    <Text style={styles.forgotPassword} onPress={() => forgetPasswordApi()}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Sign up */}
                <TouchableOpacity onPress={()=>props.navigation.navigate("Candidate_SignUp")}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }} >Don't Have an account <Text style={{ color: 'orange', fontWeight: 'bold' }}>Sign Up?</Text> </Text>
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
        borderRadius: 8
    },
    forgotPassword: {
        color: 'orange',
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 15
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

export default Login