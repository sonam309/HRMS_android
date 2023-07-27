import { TouchableOpacity, StyleSheet, Text, View, Image, Alert, StatusBar, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { company_logo_2, Pinlock } from '../../assets';
import Geolocation from '../../functions/Geolocation';
import Loader from '../../components/Loader';
import { useDispatch } from 'react-redux'
import { authActions } from '../../redux/authSlice';
import COLORS from '../../constants/theme';
import { FONTS, SIZES } from '../../constants/font_size';
import { API } from '../../utility/services';
import { loginBanner } from '../../assets';
import CustomInput from '../../components/CustomInput';
import TextButton from '../../components/TextButton';
import { responsiveWidth } from 'react-native-responsive-dimensions';

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
            console.log(userData);
            axios.post(`${API}/api/User/login`, userData).then((response) => {
                const returnedData = response?.data?.Result[0];
                // console.log("resposne", returnedData,response?.data?.Result);

                let result = response?.data?.Result.map(a => a.FLAG);
                let userId = returnedData.USER_ID
                let userName = returnedData.FIRST_NAME
                let userDeptId = returnedData.DEPT_ID
                let userDept = returnedData.DEPT_NAME
                // console.log("returnedData", result,userId,userName,userDeptId,userDept);
                setLoaderVisible(false)
                result[0] === "S" ? ((props.navigation.navigate("Employee_page")), dispatch(authActions.logIn({ userId, userName, userDeptId, userDept, userPassword: password }))) : Alert.alert("Failure", "Please enter correct credentials")
            })
        } catch (error) {
            setLoaderVisible(false);
        }
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
                console.log(returnedData);
                let result = returnedData.map(a => a.FLAG);
                let contact = returnedData.map(b => b.MSG.trim());

                result[0] === "S" ? (props.navigation.navigate("Otp_Verification", { contact, otp, userId })) : Alert.alert("Failure", "Please enter correct credentials")
            })
        } catch (error) {

            Alert.alert(error);
            setLoaderVisible(false);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.white}
                barStyle="dark-content" />
            <Loader loaderVisible={loaderVisible} />

            {/* top right coner view design */}
            <View
                style={{ height: 300, width: 300, backgroundColor: COLORS.orange1, position: 'absolute', top: -200, right: -140, zIndex: 500, borderRadius: 250, transform: [{ scaleX: -1 }, { scaleY: -1 }], }} />

            {/* Company Logo */}
            <View style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 20 }}>
                <Image source={company_logo_2} style={{ marginTop: 30, width: "100%", height: '100%' }} />
            </View>

            <View style={{ justifyContent: 'center', flex: 2, borderRadius: 20, marginTop: -40, backgroundColor: 'white', paddingHorizontal: 20 }}>
                <Text style={styles.header}>Employee Login</Text>
                {/* user credentials -username */}
                <View style={[styles.textInputBox]}  >
                    {/* <FontAwesome5 name='user-alt' color='orange' size={17} style={{ marginHorizontal: 10 }} />
                    <CustomTextInput placeholder='UserId' value={userId} onChangeText={(id) => (setUserId(id), dispatch(authActions.logIn({ userId: id, userPassword: password })))} /> */}

                    <CustomInput placeholder={'User Id'} caption={'User ID'} value={userId} onChangeText={(id) => (setUserId(id), dispatch(authActions.logIn({ userId: id, userPassword: password })))}/>
                </View>

                {/* Password */}
                <View style={[styles.textInputBox]} >
                    {/* <Feather name='lock' color='orange' size={17} style={{ marginHorizontal: 10 }} />
                    <CustomPasswordInput placeholder='Password' secureTextEntry={showVisibility} value={password} onChangeText={(security) => (setPassword(security), dispatch(authActions.logIn({ userPassword: security, userId: userId })))} />
                    <AntDesign name='eye' onPress={changeVisibility} style={{ position: 'absolute', right: 9 }} size={22} /> */}


                    <CustomInput placeholder={'Password'} caption={'Password'} value={password} onChangeText={security => setPassword(security)} required secureTextEntry={showVisibility} isPasswordInput
                        icon={<Pressable onPress={changeVisibility}><AntDesign name="eye" size={22} />
                        </Pressable>}
                    />
                </View>

                {/* Quick Pin option */}
                <View style={styles.loginOption}>
                    <TouchableOpacity >

                        {/* onPress={() => clickQuickPin()} */}
                        <View style={{ alignItems: 'center' }} >
                            <Image source={Pinlock} style={{ width: 35, height: 35 }} />
                            <Text style={{ color: COLORS.darkGray2, ...FONTS.h4 }}>Quick Pin</Text>
                        </View>

                    </TouchableOpacity>
                </View>

                {/* Log In Button */}
                {/* <TouchableOpacity style={[styles.loginButton, styles.elevation]} onPress={() => submit()}>
                    <AntDesign name='poweroff' color='white' size={20} />
                    <Text style={[styles.loginButtonText, { marginHorizontal: 15 }]}>Log In</Text>
                </TouchableOpacity> */}

                <TextButton color1={COLORS.green} color2={'#9ADD00'} linearGradientStyle={{ marginTop: SIZES.base, marginBottom: SIZES.radius, borderRadius: SIZES.base, }}
                    buttonContainerStyle={{ width: responsiveWidth(90), height: 50, }} label={'Log In'} labelStyle={{ color: COLORS.white, }}
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

                {/* Forgot Password */}
                <TouchableOpacity>
                    <Text style={styles.forgotPassword} onPress={() => (userId !== '' ? forgetPasswordApi() : Alert.alert("Please enter User id"))}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom element */}

            <View style={{ flex: 0.5, marginBottom: 5 }}>
                <Text style={styles.bottomElement}>Version: <Text style={{ color: COLORS.white, fontWeight: '900' }}>2.2</Text></Text>
            </View>

            <Image source={loginBanner} style={{ width: '100%', height: '20%', bottom: -40, position: 'absolute', zIndex: -1000 }} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    header: {
        marginVertical: 8,
        // fontWeight: 'bold',

        color: COLORS.black,
        ...FONTS.h4,
        fontSize: 16,
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
        marginHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 12
    },
    textInputBox: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // marginVertical: 6,
        // backgroundColor: 'white',
        // borderRadius: 8,
    },
    forgotPassword: {
        color: COLORS.orange1,
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
        ...FONTS.h4,
        marginHorizontal: 5,

    },
    bottomElement: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS.white,
        fontSize: 14,
    }
})

export default Employee_Login