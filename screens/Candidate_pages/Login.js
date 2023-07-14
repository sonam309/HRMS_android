import { TouchableOpacity, StyleSheet, Text, View, Image, Alert, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomPasswordInput from '../../components/CustomPasswordInput';
import { Pinlock, company_logo_2 } from '../../assets';
import { useDispatch } from 'react-redux'
import Loader from '../../components/Loader';
import { candidateAuthActions } from '../../redux/candidateAuthSlice';
import COLORS from '../../constants/theme';
import { FONTS } from '../../constants/font_size';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) => {

    let page = null

    const [showVisibility, setShowVisibility] = useState(true);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState();
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
        axios.get('https://econnectsatya.com:7033/api/GetMobileNo', { params: { loginId: userId, operFlag: operFlag, message: otp + " Is the OTP for your mobile verfication on Satya One." } })
            .then((response) => {
                const returnedData = response.data.Result;
                setLoaderVisible(false);

                console.log(returnedData);
                let result = returnedData.map(a => a.FLAG);
                let contact = returnedData.map(b => b.MSG);


                console.log("login", userId);

                result[0] === "S" ? (props.navigation.navigate("Otp_Verification", { contact, otp, userId })) : console.log(contact)
            })
    }

    // logging in function
    const submit = () => {
        setLoaderVisible(true)
        axios.post('https://econnectsatya.com:7033/api/User/candidateLogin', userData).then((response) => {
            const returnedData = response.data.Result[0];
            let result = returnedData.FLAG;
            let candidateName = returnedData.CANDIDATE_NAME
            let candidateStatus = returnedData.CANDIDATE_STATUS
            let candidateRole = returnedData.JOB_TITLE
            let candidatePhone = returnedData.PHONE
            let candidateRoleId = returnedData.ROLE_ID
            let candidateStatusId = returnedData.STATUS_ID

            console.log(returnedData);
            setLoaderVisible(false)
            result === "S" ? ((props.navigation.navigate("Candidate_page")), dispatch(candidateAuthActions.logIn({ candidateId: userId, candidateName, candidateRole, candidateStatus, candidatePhone, candidateRoleId, candidateStatusId }))) : Alert.alert("Failure", "Please enter correct credentials")

        })
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.white}
                barStyle="dark-content" />
            <Loader loaderVisible={loaderVisible} />

            {/* Company Logo */}
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <Image source={company_logo_2} style={{ marginTop: 30, width: "100%", height: '100%' }} />
            </View>

            <View style={{ justifyContent: 'center', flex: 2, borderRadius: 20, marginTop: -40, backgroundColor: 'white', paddingHorizontal: 20 }}>
                <Text style={styles.header}>Candidate Login</Text>
                {/* user credentials - userId */}
                <View style={styles.textInputBox}>
                    <FontAwesome5 name='user-alt' color='orange' size={17} style={{ marginHorizontal: 10 }} />
                    <CustomTextInput placeholder='User Id' value={userId} onChangeText={(name) => setUserId(name)} />
                </View>

                {/* Password */}
                <View style={styles.textInputBox}>
                    <Feather name='lock' color='orange' size={17} style={{ marginHorizontal: 10 }} />
                    <CustomPasswordInput placeholder='Password' secureTextEntry={showVisibility} value={password} onChangeText={(security) => setPassword(security)} />
                    <AntDesign name='eye' onPress={changeVisibility} style={{ position: 'absolute', right: 9 }} size={22} />
                </View>

                {/* Quick Pin Option */}
                <View style={styles.loginOption}>
                    {/* onPress={() => props.navigation.navigate("QuickPin", { userId })}  */}
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image source={Pinlock} style={{ width: 35, height: 35 }} />
                        <Text style={{ color: COLORS.darkGray2, ...FONTS.h4 }}>Quick Pin</Text>
                    </TouchableOpacity>
                </View>

                {/* Log In Button */}
                <TouchableOpacity style={[styles.loginButton, styles.elevation]} onPress={() => submit()}>
                    <AntDesign name='poweroff' color='white' size={20} />
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <TouchableOpacity>
                    <Text style={styles.forgotPassword} onPress={() => {userId!==''?forgetPasswordApi():Alert.alert("Please enter User Id")}}>Forgot Password?</Text>
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
    },
    header: {
        marginVertical: 8,
        fontWeight: 'bold',
        fontSize: 16,
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
        borderRadius: 8
    },
    forgotPassword: {
        color: 'orange',
        fontSize: 14,
        ...FONTS.h4,
        textAlign: 'center',
        marginVertical: 15
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
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS.darkGray2,
        fontSize: 14,
    }
})

export default Login