import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ScrollView, StatusBar } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import BoldText from '../Utility/BoldText';


const QuickPin = (props) => {

    const { userName } = props.route.params;

    const et1 = useRef();
    const et2 = useRef();
    const et3 = useRef();
    const et4 = useRef();


    const [f1, setF1] = useState('');
    const [f2, setF2] = useState('');
    const [f3, setF3] = useState('');
    const [f4, setF4] = useState('');

    return (
        <View>
            {/* sk */}
            {/* <StatusBar backgroundColor="#220046" /> */}

            <View style={styles.container}>


                <Text style={styles.HeaderText}>Quick Pin</Text>



                {/* Top Image */}
                <Image source={require('../images/security_pin_icon.png')}
                    style={{ width: 150, height: 150, alignSelf: 'center', marginBottom: -10 , marginTop:20}} />

                <Text style={styles.QuickPinTxt} >
                    Enter Your Quick Pin
                </Text>

                {/* Quick pin input box sk */}
                <View style={{
                    backgroundColor: 'white',
                    flexDirection: 'row', justifyContent: 'center'
                }}>

                    <TextInput ref={et1} style={[styles.txtbox, { borderColor: f1.length >= 1 ? '#F99417' : '#220046' }]}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={f1}
                        onChangeText={txt => {
                            setF1(txt);
                            if (txt.length >= 1) {
                                et2.current.focus();
                            }
                        }} />
                    <TextInput ref={et2} style={[styles.txtbox, { borderColor: f2.length >= 1 ? '#F99417' : '#220046' }]}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={f2}
                        onChangeText={txt => {
                            setF2(txt)
                            if (txt.length >= 1) {
                                et3.current.focus();
                            } else if (txt.length < 1) {

                                et1.current.focus();
                            }
                        }} />
                    <TextInput ref={et3} style={[styles.txtbox, { borderColor: f3.length >= 1 ? '#F99417' : '#220046' }]}
                        keyboardType="number-pad"
                        maxLength={1} value={f3}
                        onChangeText={txt => {
                            setF3(txt)
                            if (txt.length >= 1) {
                                et4.current.focus();
                            } else if (txt.length < 1) {

                                et2.current.focus();
                            }
                        }} />
                    <TextInput ref={et4} style={[styles.txtbox, { borderColor: f4.length >= 1 ? '#F99417' : '#220046' }]}
                        keyboardType="number-pad"
                        maxLength={1} value={f4}
                        onChangeText={txt => {
                            setF4(txt)
                            if (txt.length >= 1) {

                            } else if (txt.length < 1) {

                                et3.current.focus();
                            }
                        }} />

                </View>



                {/* Done Button sk */}

                <TouchableOpacity
                    disabled={
                        f1 !== '' && f2 !== '' &&
                            f3 !== '' && f4 !== '' ?
                            false : true
                    }
                    style={[styles.quickLoginBtn, {
                        backgroundColor: f1 !== '' && f2 !== '' &&
                            f3 !== '' && f4 !== '' ?
                            '#220046' : "#9D9D9D"
                    }]}

                >

                    {/* onPress={() => {validateOtp()}} */}
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: 500 }}>
                        Quick Login
                    </Text>

                </TouchableOpacity>

                {/* botton options sk */}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                    <TouchableOpacity >
                        <Text style={styles.QuickPinBottomBtn}>Create Quick Pin?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={[styles.QuickPinBottomBtn]}>Forgot Quick Pin?</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )

}



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
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
    },
    QuickPinTxt: {

        color: '#220046',
        padding: 6,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 500,
        marginTop: 10
    },
    txtbox: {
        width: 45,
        height: 45,
        borderWidth: 1,
        marginTop: 20,
        textAlign: 'center',
        fontWeight: '500',
        borderRadius: 10,
        marginBottom: 20,
        marginLeft: 10,
        fontSize: 18
    },
    quickLoginBtn: {
        marginLeft: 60,
        marginRight: 60,
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
    },
    QuickPinBottomBtn: {

        marginTop: 200,
        height: 35,
        width: '100%',
        fontSize: 15,
        backgroundColor: '#220046',
        borderRadius: 35,
        color: 'white',
        elevation: 7,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,

        },
        shadowOpacity: 0.3,
        shadowRadius: 4
    },





})


export default QuickPin