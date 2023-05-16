import { TouchableOpacity, StyleSheet, Text, TextInput, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";

const Employee_Login = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [showVisibility, setShowVisibility] = useState(true);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleValueChange = (value) => {
        setSelectedValue(value);
    };
    const changeVisibility = () => {
        setShowVisibility(!showVisibility)
    }

    const submit = () => {
        const userData = {
            loginId: userName,
            password: password,
            oprFlag: 'L',
        };
        axios.post('http://192.168.1.169:7038/api/User/login', userData).then((response) => {
            const returnedData = response.data.Result;
            let result = returnedData.map(a => a.FLAG);
            result[0] === "S" ? Alert.alert("Congratulations", "Succesfully logged in") : Alert.alert("Failure", "Please enter correct credentials")
        })
    }
    return (
        <View>

            {/* Company Logo */}
            <Image source={require('../images/company_logo.jpg')} style={{ marginTop: 60, width: '100%', height: 120 }} />

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
            <View style={{flexDirection:'row',marginLeft:25,marginRight:25, marginTop:15,justifyContent:'space-between'}}>
                <TouchableOpacity style={[styles.punchButton,{backgroundColor:'blue'}]}>
                    <Text style={styles.loginButtonText}>Punch In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.punchButton,{backgroundColor:'red'}]}>
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
    punchButton:{
        width:'50%',
        height: 50,
        borderRadius: 35,
        justifyContent: 'center',
        textAlign:'center', 
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
        bottom: -40,
        width: '100%',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'grey',
        fontSize: 15
    }
})

export default Employee_Login