import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import axios from "axios";
import BoldText from '../../utility/BoldText';
import { mobile_otp } from '../../assets';
import { useSelector } from 'react-redux';

const Otp_Verification = (props) => {
    const { contact, otp, type } = props.route.params;
    const userId = useSelector(state => state.auth.userId)

    const et1 = useRef(); et2 = useRef(); et3 = useRef(); et4 = useRef(); et5 = useRef(); et6 = useRef();

    const [f1, setF1] = useState('');
    const [f2, setF2] = useState('');
    const [f3, setF3] = useState('');
    const [f4, setF4] = useState('');
    const [f5, setF5] = useState('');
    const [f6, setF6] = useState('');

    const [sendOtp, setsendOtp] = useState(otp);
    const [count, setCount] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            if (count == 0) {
                clearInterval(interval)
            } else setCount(count - 1);
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [count]);

    //Random Number
    const RandomNumber = (length) => {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    }

    //forgetPassword api Call
    const forgetPasswordApi = () => {
        let otp = RandomNumber("6")
        axios.get('https://econnectsatya.com:7033/api/GetMobileNo', { params: { loginId: userId, operFlag: "E", message: otp + " Is the OTP for your mobile verfication on Satya One." } })
            .then((response) => {
                const returnedData = response.data.Result;

                let result = returnedData.map(a => a.FLAG);
                let contact = returnedData.map(b => b.MSG.trim());
                setsendOtp(otp);

                if (result[0] == "S") { Alert.alert("Success"); }
                else { Alert.alert("fail") }
            })
    }

    //otp Validation
    const validateOtp = () => {
        let inputOtp = f1 + f2 + f3 + f4 + f5 + f6;
        if (sendOtp == inputOtp) {
            (props.navigation.navigate("ForgetPassword", { type }))
        } else console.warn("Wrong OTP");
    }

    return (

        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>

            {/* Top Image */}
            <Image source={mobile_otp} style={{ width: 150, height: 150, alignSelf: 'center' }} />

            {/* OTP Verificataion text */}
            <Text style={BoldText.BoldText} > OTP Verification {/* {contact} */} </Text>

            {/* enter otp msg */}
            <View style={{ backgroundColor: 'white', height: 30, flexDirection: 'row', justifyContent: 'center', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: '#474E68', fontWeight: 300, fontSize: 12 }}>  Please enter 6 digit code has been send to </Text>
                <Text style={{ color: '#000000', fontSize: 12, fontWeight: 600 }}>&nbsp;+91-{contact}</Text>
            </View>

            {/* otp input boxes */}
            <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center' }}>
                <TextInput ref={et1} style={[style.inputView, { borderColor: f1.length >= 1 ? '#F99417' : '#000' }]} keyboardType="number-pad" maxLength={1} value={f1}
                    onChangeText={txt => {
                        setF1(txt);
                        if (txt.length >= 1) {
                            et2.current.focus();
                        }
                    }} />
                <TextInput ref={et2} style={[style.inputView, { borderColor: f2.length >= 1 ? '#F99417' : '#000' }]} keyboardType="number-pad" maxLength={1} value={f2} onChangeText={txt => {
                    setF2(txt)
                    if (txt.length >= 1) {
                        et3.current.focus();
                    } else if (txt.length < 1) {

                        et1.current.focus();
                    }
                }} />
                <TextInput ref={et3} style={[style.inputView, { borderColor: f3.length >= 1 ? '#F99417' : '#000' }]} keyboardType="number-pad" maxLength={1} value={f3} onChangeText={txt => {
                    setF3(txt)
                    if (txt.length >= 1) {
                        et4.current.focus();
                    } else if (txt.length < 1) {
                        et2.current.focus();
                    }
                }} />
                <TextInput ref={et4} style={[style.inputView, { borderColor: f4.length >= 1 ? '#F99417' : '#000' }]} keyboardType="number-pad" maxLength={1} value={f4} onChangeText={txt => {
                    setF4(txt)
                    if (txt.length >= 1) {
                        et5.current.focus();
                    } else if (txt.length < 1) {

                        et3.current.focus();
                    }
                }} />
                <TextInput ref={et5} style={[style.inputView, { borderColor: f5.length >= 1 ? '#F99417' : '#000' }]} keyboardType="number-pad" maxLength={1} value={f5} onChangeText={txt => {
                    setF5(txt)
                    if (txt.length >= 1) {
                        et6.current.focus();
                    } else if (txt.length < 1) {
                        et4.current.focus();
                    }
                }} />
                <TextInput ref={et6} style={[style.inputView, { borderColor: f6.length >= 1 ? '#F99417' : '#000' }]} keyboardType="number-pad" maxLength={1} value={f6} onChangeText={txt => {
                    setF6(txt)
                    if (txt.length >= 1) {
                    } else if (txt.length < 1) { et5.current.focus(); }
                }} />
            </View>

            {/* resend otp text */}
            <View style={style.resendView}>
                <Text style={{ fontSize: 15, fontWeight: '400', color: count == 0 ? '#03a157' : "#9D9D9D" }} onPress={() => {
                    setCount(30); forgetPasswordApi()
                }}>Resend</Text>
                {count !== 0 && (<Text style={{ marginLeft: 5, fontSize: 15 }}> {count + ' seconds'} </Text>)}
            </View>

            {/* verify otp button */}

            <TouchableOpacity disabled={f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' && f5 !== '' && f6 !== '' ? false : true} style={[style.otpVerifyBtn,
            { backgroundColor: f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' && f5 !== '' && f6 !== '' ? '#220046' : "#9D9D9D" }]} onPress={() => { validateOtp() }} >
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: 500 }}>
                    Verify OTP
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    inputView: {
        width: 50,
        height: 50,
        borderWidth: 1,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '500',
        borderRadius: 10,
        marginLeft: 10,
        fontSize: 18
    },
    otpVerifyBtn: {
        marginLeft: 25,
        marginRight: 25,
        flexDirection: 'row',
        marginTop: 10,
        height: 45,
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
    },
    resendView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 30
    }
});

export default Otp_Verification