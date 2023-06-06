import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomTextInput from '../../components/CustomTextInput';
import CustomPasswordInput from '../../components/CustomPasswordInput';
import { create_mpin } from '../../assets';

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

            result[0] === "S" ? (props.navigation.navigate("Otp_Verification", { contact, otp, userName, type }))
                : Alert.alert("Failure", "Please enter correct credentials")

        })

    }


    return (
        <View>
            <View style={styles.Header}>
                <Text style={styles.HeaderText} > {type === 'N' ? "Set New Quick Pin" : "Forgot Quick Pin"}</Text>
            </View>

            <View style={{ height: '100%', width: '100%', justifyContent: 'center' }} >

                <Image source={create_mpin} style={{ width: '50%', height: '30%', alignSelf: 'center', marginTop: -100, marginBottom: 10, }} />

                {/* Username */}
                <View style={styles.textInputBox}>
                    <FontAwesome5 name='user-alt' color='orange' size={17} style={{ marginRight: 10, marginLeft: 10 }} />
                    <CustomTextInput placeholder='Username' value={userName} onChangeText={(name) => setUserName(name)} />
                </View>

                {/* Password */}
                <View style={styles.textInputBox}>
                    <Feather name='lock' color='orange' size={17} style={{ marginRight: 10, marginLeft: 10 }} />

                    <CustomPasswordInput placeholder='Password' secureTextEntry={showVisibility} value={password} onChangeText={(security) => setPassword(security)} />

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
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: 500 }}> Get OTP</Text>

                </TouchableOpacity>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    Header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#220046',
    },
    HeaderText: {
        padding: 4,
        backgroundColor: '#220046',
        color: 'white',
        fontWeight: '400',
        fontSize: 20,
        height: 38
    }, textInputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
        marginHorizontal: 20,
        borderRadius: 8,
    }, quickLoginBtn: {
        marginHorizontal: 40,
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