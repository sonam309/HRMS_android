import { TouchableOpacity, StyleSheet, Text, View, Image, Alert, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { company_logo_2, Pinlock } from '../../assets';
import CustomTextInput from '../../components/CustomTextInput';
import CustomPasswordInput from '../../components/CustomPasswordInput';
import Geolocation from '../../functions/Geolocation';
import Loader from '../../components/Loader';
import { useDispatch } from 'react-redux'
import { authActions } from '../../redux/authSlice';
import COLORS from '../../constants/theme';
import { FONTS } from '../../constants/font_size';


const Employee_Login = (props) => {

    const [showVisibility, setShowVisibility] = useState(true);
    const [userId, setUserId] = useState("10011");
    const [password, setPassword] = useState("Kapil@123");
    const [loaderVisible, setLoaderVisible] = useState(false);
    const dispatch = useDispatch();

    const userData = { loginId: userId, password: password, oprFlag: 'L' };

    const getCurrentLocation = async (val) => {
        Geolocation({ val });
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
        setLoaderVisible(true)
        axios.post('https://econnectsatya.com:7033/api/User/login', userData).then((response) => {
            const returnedData = response?.data?.Result;

            let result = returnedData.map(a => a.FLAG);
            let userId = returnedData.map(a => a.USER_ID)[0]
            let userName = returnedData.map(b => b.FIRST_NAME)[0]
            let userDeptId = returnedData.map(c => c.DEPT_ID)[0]
            let userDept = returnedData.map(d => d.DEPT_NAME)[0]

            console.log(returnedData);

            setLoaderVisible(false)

            result[0] === "S" ? ((props.navigation.navigate("Employee_page")),dispatch(authActions.logIn({ userId, userName, userDeptId, userDept, userPassword: password }))) : Alert.alert("Failure", "Please enter correct credentials")
            
        })
    }


    const clickQuickPin = () => {

        if (userId != '') {

            props.navigation.navigate("QuickPin")

        } else {

            Alert.alert("Please enter User Name")

        }

    }

    //Random Number
    const RandomNumber = (length) => {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    }

    const forgetPasswordApi = () => {
        let otp = RandomNumber("6")
        axios.get('https://econnectsatya.com:7033/api/GetMobileNo', {
            params: {
                loginId: userId, operFlag: "E", message: otp + " Is the OTP for your mobile verfication on Satya One."
            }
        }).then((response) => {

            const returnedData = response.data.Result;
            // console.warn(returnedData);
            let result = returnedData.map(a => a.FLAG);
            let contact = returnedData.map(b => b.MSG.trim());

            result[0] === "S" ? (props.navigation.navigate("Otp_Verification", { contact, otp })) : Alert.alert("Failure", "Please enter correct credentials")
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.gray} />
            <Loader loaderVisible={loaderVisible} />

            {/* Company Logo */}
            <View style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20 }}>
                <Image source={company_logo_2} style={{ marginTop: 30, width: "100%", height: '100%' }} />
            </View>

            <View style={{ justifyContent: 'center', flex: 2, borderRadius: 20, marginTop: -40, backgroundColor: 'white', paddingHorizontal: 20 }}>
                <Text style={styles.header}>Employee Login</Text>
                {/* user credentials -username */}
                <View style={[styles.textInputBox]}>
                    <FontAwesome5 name='user-alt' color='orange' size={17} style={{ marginHorizontal: 10 }} />
                    <CustomTextInput placeholder='UserId' value={userId} onChangeText={(id) => (setUserId(id), dispatch(authActions.logIn({ userId: id, userPassword:password })))} />
                </View>

                {/* Password */}
                <View style={[styles.textInputBox]}>
                    <Feather name='lock' color='orange' size={17} style={{ marginHorizontal: 10 }} />
                    <CustomPasswordInput placeholder='Password' secureTextEntry={showVisibility} value={password} onChangeText={(security) => (setPassword(security), dispatch(authActions.logIn({ userPassword: security, userId:userId })))} />
                    <AntDesign name='eye' onPress={changeVisibility} style={{ position: 'absolute', right: 9 }} size={22} />
                </View>

                {/* Quick Pin option */}
                <View style={styles.loginOption}>
                    <TouchableOpacity onPress={() => clickQuickPin()}>

                        <View style={{ alignItems: 'center' }} >
                            <Image source={Pinlock} style={{ width: 35, height: 35 }} />
                            <Text style={{  color: COLORS.darkGray2,...FONTS.h4 }}>Quick Pin</Text>
                        </View>

                    </TouchableOpacity>
                </View>

                {/* Log In Button */}
                <TouchableOpacity style={[styles.loginButton, styles.elevation]} onPress={() => submit()}>
                    <AntDesign name='poweroff' color='white' size={20} />
                    <Text style={[styles.loginButtonText, { marginHorizontal: 15 }]}>Log In</Text>
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

            <View style={{ flex: 0.5, marginBottom: 5 }}>
                <Text style={styles.bottomElement}>Version: <Text style={{ color: 'orange', fontWeight: '900' }}>2.2</Text></Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        zIndex: 0
    },
    header: {
        marginVertical: 8,
        fontWeight: 'bold',
        fontSize:16,
        color: COLORS.green,
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
        fontSize: 14,
        ...FONTS.h4,
        textAlign: 'center',
        marginVertical: 15
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
        backgroundColor: COLORS.orange,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 400,
        marginHorizontal: 5
    },
    bottomElement: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS.darkGray2,
        fontSize: 14,
    }
})

export default Employee_Login