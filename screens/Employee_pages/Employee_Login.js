import { TouchableOpacity, StyleSheet, Text, View, Image, StatusBar, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { Pinlock, company_logo, employeeLoginBanner } from '../../assets';
import Geolocation from '../../functions/Geolocation';
import Loader from '../../components/Loader';
import { useDispatch } from 'react-redux'
import { authActions } from '../../redux/authSlice';
import COLORS from '../../constants/theme';
import { FONTS, SIZES } from '../../constants/font_size';
import { API } from '../../utility/services';
import CustomInput from '../../components/CustomInput';
import TextButton from '../../components/TextButton';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Employee_Login = (props) => {
    const [showVisibility, setShowVisibility] = useState(true);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loaderVisible, setLoaderVisible] = useState(false);
    const dispatch = useDispatch();


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
        try {
            const userData = { loginId: userId, password: password, oprFlag: 'L' };
            setLoaderVisible(true)
            // console.log(userData);
            axios.post(`${API}/api/User/login`, userData).then((response) => {
                const returnedData = response?.data?.Result[0];
                // console.log("resposne", returnedData,response?.data?.Result);

                let result = response?.data?.Result.map(a => a.FLAG);
                let userId = returnedData.USER_ID
                let userName = returnedData.FIRST_NAME
                let userDeptId = returnedData.DEPT_ID
                let userDept = returnedData.DEPT_NAME
                let userEmail = returnedData.EMAIL_ID
                // console.log("returnedData", returnedData);
                setLoaderVisible(false)
                result[0] === "S" ? ((props.navigation.navigate("Employee_page")), dispatch(authActions.logIn({ userId, userName, userDeptId, userDept, userEmail, userPassword: password }))) : Toast.show({
                    type: 'error',
                    text1: "Please enter correct credentials"
                })
                setUserId("");
                setPassword("")
            })
        } catch (error) {
            setLoaderVisible(false);
        }
    }

    const clickQuickPin = () => {
        if (userId != '') {
            props.navigation.navigate("QuickPin")
        } else {

            Toast.show({
                type: 'error',
                text1: "Please enter User Name"
            })
        }
    }

    //Random Number
    const RandomNumber = (length) => {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    }

    const forgetPasswordApi = () => {
        try {
            setLoaderVisible(true);
            let otp = RandomNumber("6")
            // console.log("emplogin", userId + "  " + otp);
            axios.get(`${API}/api/GetMobileNo`, {
                params: {
                    loginId: userId, operFlag: "E", message: otp + " Is the OTP for your mobile verfication on Satya One."
                }
            }).then((response) => {
                const returnedData = response.data.Result;
                setLoaderVisible(false);
                // console.log(returnedData);
                let result = returnedData.map(a => a.FLAG);
                let contact = returnedData.map(b => b.MSG.trim());

                result[0] === "S" ? (props.navigation.navigate("Otp_Verification", { contact, otp, userId })) : Toast.show({
                    type: 'error',
                    text1: contact
                })
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error
            })
            setLoaderVisible(false);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.white}
                barStyle="dark-content" />
            <Loader loaderVisible={loaderVisible} />

            {/* Company Logo */}
            <View style={{ flex: 1, alignItems: 'flex-start', }}>
                <Image source={company_logo} style={{ width: "40%", height: '40%', }} />
            </View>

            <View style={{
                width: responsiveWidth(100),
                height: 100,
                marginTop: -220,
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Image source={employeeLoginBanner} style={{
                    height: '90%',
                    width: '100%',
                }} resizeMode='stretch' />
            </View>
            <View style={{ justifyContent: 'center', flex: 1.5, borderRadius: 20, backgroundColor: COLORS.white, paddingHorizontal: 25 }}>
                <Text style={styles.header}>Employee Login</Text>
                {/* user credentials -username */}
                <View style={[styles.textInputBox]}  >
                    <CustomInput placeholder={'User Id'} caption={'User ID'} value={userId} required onChangeText={(id) => (setUserId(id), dispatch(authActions.logIn({ userId: id, userPassword: password })))} />
                </View>
                {/* Password */}
                <View style={[styles.textInputBox]} >
                    <CustomInput placeholder={'Password'} caption={'Password'} value={password} onChangeText={security => setPassword(security)} required secureTextEntry={showVisibility} isPasswordInput textInputStyle={{
                        width: responsiveWidth(70)
                    }}

                        icon={<Pressable onPress={changeVisibility}><AntDesign name="eye" size={22} />
                        </Pressable>} />
                </View>
                {/* Quick Pin Option */}
                {/* <View style={styles.loginOption}>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image source={Pinlock} style={{ width: 28, height: 28, }} />
                        <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>Quick Pin</Text>
                    </TouchableOpacity>
                </View> */}
                <TextButton color1={COLORS.green} color2={'#9ADD00'} linearGradientStyle={{ marginTop: SIZES.font, marginBottom: SIZES.radius, borderRadius: SIZES.base, }}
                    buttonContainerStyle={{ width: responsiveWidth(90), height: 45, }} label={'Log In'} labelStyle={{ color: COLORS.white, }}
                    onPress={() => submit()} />
                {/* Punching Option */}
                <View style={styles.punchArea}>
                    <TouchableOpacity onPress={() => getCurrentLocation("I")} style={[styles.punchButton, styles.elevation, { backgroundColor: '#D5F5E3' }]}>
                        <Text style={[styles.loginButtonText, { color: COLORS.darkGreen }]}>Punch In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => getCurrentLocation("O")} style={[styles.punchButton, styles.elevation, { backgroundColor: '#FAE5D3' }]}>
                        <Text style={[styles.loginButtonText, { color: COLORS.orange1 }]}>Punch Out</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>

                    {/* signIn for Employee */}
                    <TouchableOpacity onPress={async() => {
                        props.navigation.push("Candidate_Login")
                        await AsyncStorage.setItem("type", "candidate")
                        
                    }}>
                        <Text style={{
                            color: COLORS.hyperlinkBlue,
                            ...FONTS.h5,
                            fontSize: 14,
                            marginBottom: 100,
                            verticalAlign: 'middle',
                            textDecorationLine: 'underline',
                        }}>Sign In as Candidate</Text>
                    </TouchableOpacity>
                    {/* Forgot Password */}
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword} onPress={() => (userId !== '' ? forgetPasswordApi() : Toast.show({
                            type: 'error',
                            text1: "Please enter User id"
                        }))}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Bottom element */}
            <View style={{ height: 30 }}>
                <Text style={{ textAlign: 'center', color: COLORS.gray, ...FONTS.h5, fontWeight: '400', padding: 5 }}>Version:1.1</Text>
            </View>
            {/* <View style={{ flex: 0.5, marginBottom: 5 }}>
                <Text style={styles.bottomElement}>Version: <Text style={styles.bottomElement}>2.2</Text></Text>
            </View> */}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    header: {
        marginTop: 140,
        color: COLORS.black,
        ...FONTS.h3,
        fontSize: 18,
        fontFamily: 'Ubuntu-Bold',
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
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginVertical: 5
    },
    textInputBox: {
    },
    forgotPassword: {
        color: COLORS.orange1,
        ...FONTS.h4,
        fontSize: 14,
        marginBottom: 150,


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
        ...FONTS.h4,
        marginHorizontal: 5,

    },
    bottomElement: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        color: COLORS.gray,
        ...FONTS.h5,
        fontWeight: '400',

    }
})

export default Employee_Login