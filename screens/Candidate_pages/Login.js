import { TouchableOpacity, StyleSheet, Text, View, Image, StatusBar, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { Pinlock, company_logo_2, loginIcon, company_logo } from '../../assets';
import { useDispatch } from 'react-redux'
import Loader from '../../components/Loader';
import { candidateAuthActions } from '../../redux/candidateAuthSlice';
import COLORS from '../../constants/theme';
import { FONTS, SIZES } from '../../constants/font_size';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../../utility/services';
import { loginBanner } from '../../assets';
import CustomInput from '../../components/CustomInput';
import TextButton from '../../components/TextButton';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';

const Login = (props) => {
    let page = null
    const [showVisibility, setShowVisibility] = useState(true);
    const [userId, setUserId] = useState('532');
    const [password, setPassword] = useState('Test@123');
    const [loaderVisible, setLoaderVisible] = useState(false);
    const dispatch = useDispatch();
    const [operFlag, setOperFlag] = useState('');

    const getType = async () => {
        page = await AsyncStorage.getItem("type")
        {
            page ? (page === 'employee' ? setOperFlag('E') : setOperFlag('A')) : null
        }
    }
    const userData = { loginId: userId, password: password, oprFlag: 'L', oldPassword: "" };
    //Random Number
    const RandomNumber = (length) => {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    }

    // preventing going to entry page
    const navigation = useNavigation();
    useEffect(() => {
        getType();
        const preventBack = navigation.addListener('beforeRemove', event => {
            event.preventDefault();
        })
        return preventBack
    }, [navigation])

    // displaying password
    const changeVisibility = () => {
        setShowVisibility(!showVisibility)
    }

    // forgetpassword
    const forgetPasswordApi = () => {
        setLoaderVisible(true);
        let otp = RandomNumber("6")
        console.log("msg", otp + " $ " + userId + operFlag);
        axios.get(`${API}/api/GetMobileNo`, { params: { loginId: userId, operFlag: operFlag, message: otp + " Is the OTP for your mobile verfication on Satya One." } })
            .then((response) => {
                const returnedData = response.data.Result;
                setLoaderVisible(false);
                console.log(returnedData);
                let result = returnedData.map(a => a.FLAG);
                let contact = returnedData.map(b => b.MSG);
                console.log("login", userId);
                result[0] === "S" ? (props.navigation.navigate("Otp_Verification", { contact, otp, userId })) : Toast.show({
                    type: 'error',
                    text1: contact
                })
            })
    }

    // logging in function
    const submit = () => {
        if (userId === "" || password === "") {
            Toast.show(
                {
                    type: 'error',
                    text1: "UserId and Password is Mandatory !"
                }
            )
        } else {

            setLoaderVisible(true)
            console.log(`${API}/api/User/candidateLogin`)
            axios.post(`${API}/api/User/candidateLogin`, userData).then((response) => {
                const returnedData = response.data.Result[0];
                let candidateName = returnedData.CANDIDATE_NAME
                let candidateStatus = returnedData.CANDIDATE_STATUS
                let candidateRole = returnedData.JOB_TITLE
                let candidatePhone = returnedData.PHONE
                let candidateRoleId = returnedData.ROLE_ID
                let candidateStatusId = returnedData.STATUS_ID
                let offerAcceptFlag = returnedData.OFER_ACPT_FLAG
                let daysToJoin = returnedData.DAY_TO_JOIN
                let candidateOfferLetter = returnedData.OFFER_LETTER
                let growingDays = returnedData.GROWING_DAY
                let totalDay = returnedData.TOTAL_DAY
                let hiringLeadMail = returnedData.HIRING_LEAD_EMAIL

                console.log("response", returnedData, hiringLeadMail);
                setLoaderVisible(false)
                returnedData.FLAG === "S" ? ((props.navigation.navigate("Candidate_page")), dispatch(candidateAuthActions.logIn({
                    candidateId: userId,
                    candidateName,
                    candidateRole,
                    candidateStatus,
                    candidatePhone,
                    candidateRoleId,
                    candidateStatusId,
                    offerAcceptFlag,
                    daysToJoin,
                    candidateOfferLetter,
                    growingDays,
                    totalDay,
                    hiringLeadMail,

                }))) :
                    Toast.show({
                        type: "error",
                        text1: "Failure Please enter correct credentials"
                    })

            }).catch((error) => {
                console.log(error)
                setLoaderVisible(false)
                Toast.show({
                    type: 'error',
                    text1: error
                })
            })
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

            <View style={{width: responsiveWidth(100),height: 100,marginTop: -170,flex: 1,alignItems: "center",justifyContent: "center"}}>
                <Image source={loginIcon} style={{height: '100%',width: '100%',}} resizeMode='stretch' />
            </View>
            {/* candidate Login titlte */}
            <View style={{ justifyContent: 'center', flex: 1.5, borderRadius: 20, backgroundColor: COLORS.white, paddingHorizontal: 25 }}>
                <Text style={styles.header}>Candidate Login</Text>
                {/* user credentials - userId */}
                <View style={styles.textInputBox}>
                    <CustomInput placeholder={'Candidate Id'} caption={'Candidate ID'} value={userId} onChangeText={name => setUserId(name)}
                        required />

                </View>
                {/* Password */}
                <View style={styles.textInputBox}>
                    <CustomInput placeholder={'Password'} caption={'Password'} value={password} onChangeText={security => setPassword(security)} required secureTextEntry={showVisibility} isPasswordInput style={{ width: '100%' }}
                        icon={<Pressable onPress={changeVisibility}><AntDesign name="eye" size={22} />
                        </Pressable>}
                    />
                </View>

                {/* Quick Pin Option */}
                {/* <View style={styles.loginOption}>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image source={Pinlock} style={{ width: 30, height: 30, }} />
                        <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>Quick Pin</Text>
                    </TouchableOpacity>
                </View> */}

                <TextButton color1={COLORS.green} color2={'#9ADD00'} linearGradientStyle={{ marginTop: SIZES.base, marginBottom: SIZES.radius, borderRadius: SIZES.base, }}
                    buttonContainerStyle={{ width: responsiveWidth(90), height: 50, }} label={'Log In'} labelStyle={{ color: COLORS.white, }}
                    onPress={() => submit()} />

                {/* Forgot Password */}
                <TouchableOpacity>
                    <Text style={styles.forgotPassword} onPress={() => {
                        userId !== '' ? forgetPasswordApi() : Toast.show({
                            type: 'error',
                            text1: "Please enter User Id"
                        })
                    }}>Forgot Password? </Text>
                </TouchableOpacity>

            </View>

            {/* Bottom element */}
            <View style={{backgroundColor:COLORS.white,height:30}}>
                <Text style={{ textAlign: 'center',color: COLORS.gray,...FONTS.h5,fontWeight: '400',padding:5}}>Version:2.2</Text>
            </View>
            {/* <View style={{ flex: 0.5, marginBottom: 5, backgroundColor:COLORS.red}}>
                <Text style={styles.bottomElement}>Version: <Text style={styles.bottomElement}>2.2</Text></Text>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        marginTop: 60,
        color: COLORS.black,
        ...FONTS.h3,
        fontSize: 20,
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
        marginVertical: 12
    },
    textInputBox: {
       
    },
    forgotPassword: {
        color: COLORS.orange1,
        ...FONTS.h4,
        fontSize: 14,
        marginBottom:100,
        textAlign: 'center',
    },
    loginButton: {
        marginHorizontal: 25,
        flexDirection: 'row',
        marginVertical: 12,
        height: 45,
        backgroundColor: COLORS.green,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        ...FONTS.h3,
        marginHorizontal: 15
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

export default Login