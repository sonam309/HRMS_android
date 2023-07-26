import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { security_pin_icon } from '../../assets';
import { useSelector } from 'react-redux';
import COLORS from '../../constants/theme';
import { API } from '../../utility/services';

const QuickPin = (props) => {

    const userId = useSelector(state => state.auth.userId)

    const et1 = useRef(); et2 = useRef(); et3 = useRef(); et4 = useRef();

    const [f1, setF1] = useState('');
    const [f2, setF2] = useState('');
    const [f3, setF3] = useState('');
    const [f4, setF4] = useState('');

    const [mpin, setMpin] = useState('');

    // Change PAssword in function
    const LoginWithMpin = () => {
        const userData = {
            loginId: userId,
            password: newPassword,
            oldPassword: '99999',
            oprFlag: 'L',
        };

        // console.warn(userData);

        // https://econnectsatya.com:7033/api/User/login
        axios.post(`${API}/api/User/login`, userData).then((response) => {
            const returnedData = response.data.Result;
            let result = returnedData.map(a => a.FLAG);
            // console.warn(result);
            result[0] === "S" ? (props.navigation.navigate("Employee_page",
                { full_name, userId })) :
                Alert.alert("Failure", "Please enter correct credentials")
        })

        props.navigation.navigate("Employee_page")

    }

    return (
        <View style={styles.container}>
            {/* sk */}
            {/* <StatusBar backgroundColor="#220046" /> */}
            <View style={styles.Header}>
                <Text style={styles.HeaderText}>Quick Pin</Text>
            </View>

            <View style={{flex:1,justifyContent:'center'}}>

                {/* Top Image */}
                <Image source={security_pin_icon} style={{ width: 180, height: 180, alignSelf: 'center', marginTop:-50 }} />

                <Text style={styles.QuickPinTxt} > Enter Your Quick Pin </Text>

                {/* Quick pin input box sk */}
                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center' }}>

                    <TextInput ref={et1} style={[styles.txtbox, { borderColor: f1.length >= 1 ? COLORS.green:COLORS.lightOrange }]} keyboardType="number-pad" maxLength={1} value={f1} onChangeText={txt => {
                        setF1(txt);
                        if (txt.length >= 1) {
                            et2.current.focus();
                        }
                    }} />
                    <TextInput ref={et2} style={[styles.txtbox, { borderColor: f2.length >= 1 ?COLORS.green:COLORS.lightOrange  }]} keyboardType="number-pad" maxLength={1} value={f2} onChangeText={txt => {
                        setF2(txt)
                        if (txt.length >= 1) {
                            et3.current.focus();
                        } else if (txt.length < 1) {

                            et1.current.focus();
                        }
                    }} />
                    <TextInput ref={et3} style={[styles.txtbox, { borderColor: f3.length >= 1 ? COLORS.green:COLORS.lightOrange  }]} keyboardType="number-pad" maxLength={1} value={f3} onChangeText={txt => {
                        setF3(txt)
                        if (txt.length >= 1) {
                            et4.current.focus();
                        } else if (txt.length < 1) {

                            et2.current.focus();
                        }
                    }} />
                    <TextInput ref={et4} style={[styles.txtbox, { borderColor: f4.length >= 1 ? COLORS.green:COLORS.lightOrange  }]} keyboardType="number-pad" maxLength={1} value={f4} onChangeText={txt => {
                        setF4(txt)
                        setMpin(f1 + f2 + f3 + f4);
                        if (txt.length >= 1) {

                        } else if (txt.length < 1) et3.current.focus();
                    }} />
                </View>

                {/* Done Button sk */}
                <View style={{ marginHorizontal: 25 }}>
                    <TouchableOpacity disabled={f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' ? false : true} style={[styles.quickLoginBtn, styles.elevation,
                    {
                        backgroundColor: f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' ? COLORS.orange1 : COLORS.gray
                    }]} onPress={() => { LoginWithMpin() }}>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 500 }}>
                            Quick Login
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* botton options sk */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 55, marginVertical: 20 }}>
                    <TouchableOpacity style={[styles.elevation, styles.QuickPinBottomBtn]} onPress={() => (props.navigation.navigate("CreateMpin", { type: "N" }))}>
                        <Text style={styles.QuickPinBottomBtnText}>Create Pin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.elevation, styles.QuickPinBottomBtn]} onPress={() => (props.navigation.navigate("CreateMpin", { type: "F" }))} >
                        <Text style={styles.QuickPinBottomBtnText}
                        >Forgot Pin?</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1

    },
    elevation: {
        elevation: 7,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4
    },
    Header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.orange1,
    },
    HeaderText: {
        padding: 4,
        color: 'white',
        fontWeight: '400',
        fontSize: 20,
        height: 38
    },
    QuickPinTxt: {
        color: COLORS.black,
        padding: 6,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 500,
        marginVertical: 5
    },
    txtbox: {
        width: 45,
        height: 45,
        borderWidth: 1,
        marginVertical: 15,
        textAlign: 'center',
        fontWeight: '500',
        borderRadius: 10,
        marginHorizontal: 10,
        fontSize: 18
    },
    quickLoginBtn: {
        marginHorizontal: 30,
        flexDirection: 'row',
        marginTop: 40,
        height: 40,
        fontSize: 15,
        backgroundColor: '#220046',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    QuickPinBottomBtn: {
        height: 45,
        width: '47%',
        backgroundColor: COLORS.green,
        borderRadius: 35,
        paddingHorizontal: 20,
        marginVertical:15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    QuickPinBottomBtnText: {
        fontWeight:'bold',
        color: 'white',
        fontSize: 13,
    }
})

export default QuickPin