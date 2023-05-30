import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ScrollView, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
import AntDesign from 'react-native-vector-icons/AntDesign';

const CreateMpin = (props) => {

    const { type } = props.route.params;

    const [showVisibility, setShowVisibility] = useState(true);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");



    // displaying password
    const changeVisibility = () => {
        setShowVisibility(!showVisibility)
    }

    //Random Number
    const RandomNumber = (length) => {

        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 *
            Math.pow(10, length - 1));

    }

    //forgetPassword api Call
    const getOTPMethod = () => {


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

            result[0] === "S" ? (props.navigation.navigate("Otp_Verification", { contact, otp, userName,type }))
                : Alert.alert("Failure", "Please enter correct credentials")

            // result[0] === "S" ? (Alert.alert("Sucess", "Contcat "+contact))
            //  : Alert.alert("Failure", "Please enter correct credentials")



        })



    }


    return (
        <View>

            <Text style={styles.HeaderText} > {type === 'N' ? "Set New Quick Pin" : "Forgot Quick Pin"}</Text>

           <View style={{ height:'100%',width:'100%',justifyContent:'center'}} >

           <Image source={require('../images/create_mpin.png')} style={{ width: '50%', height: '30%', alignSelf: 'center', marginTop:-100, marginBottom:10,}} />

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
            <TouchableOpacity disabled={
                userName !== '' && password !== '' ?
                    false : true
            }
                style={[styles.quickLoginBtn, {
                    backgroundColor: userName !== '' && password !== '' ?
                        '#220046' : "#9D9D9D"
                }]} onPress={() => getOTPMethod()}
            >
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: 500 }}>
                    Get OTP
                </Text>

            </TouchableOpacity>
           </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',

    },
    HeaderText: {
        padding: 4,
        backgroundColor: '#220046',
        textAlign: 'center',
        color: 'white',
        fontWeight: '400',
        textAlignVertical: 'center',
        fontSize: 18,
        height: 38
    }, textInputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
        marginLeft: 20,
         marginRight: 20,
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
    }, quickLoginBtn: {
        marginLeft: 40,
        marginRight: 40,
        flexDirection: 'row',
        marginTop: 60,
        height: 40,
        fontSize: 15,
        backgroundColor: '#220046',
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
    }
})

export default CreateMpin