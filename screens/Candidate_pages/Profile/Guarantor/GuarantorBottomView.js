import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, SIZES } from '../../../../constants';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from '../../../../components/Loader';
import { API } from '../../../../utility/services';
import CustomInput from '../../../../components/CustomInput';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { showAlert, closeAlert } from "react-native-customisable-alert";



const GuarantorBottomView = (props) => {
    const userId = useSelector(state => state.candidateAuth.candidateId)
    const [firstGuarantorName, setFirstGuarantorName] = useState('')
    const [firstGrantorCareOfName, setFirstGrantorCareOfName] = useState('')
    const [firstGrantorRelation, setFirstGrantorRelation] = useState('')
    const [firstGrantorAadhaarNo, setFirstGrantorAadhaarNo] = useState('')
    const [firstGrantorAddress, setFirstGrantorAddress] = useState('')
    const [secondGrantorName, setSecondGrantorName] = useState('')
    const [secondGrantorCareOfName, setSecondGrantorCareOfName] = useState('')
    const [secondGrantorRelation, setSecondGrantorRelation] = useState('')
    const [secondGrantorAadhaarNo, setSecondGrantorAadhaarNo] = useState('')
    const [secondGrantorAddress, setSecondGrantorAddress] = useState('')
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [approvalFlag, setApprovalFlag] = useState('');
    const [approveRemark, setApproveRemarks] = useState('');
    const [isDisabled, setIsDisabled] = useState(false)
    const [filledDetails, setFilledDetails] = useState("");

    useEffect(() => {
        setTimeout(() => {
            getGuaranterDetails();
        }, 1000);
    }, []);


    const validation = (operFlag) => {


        // console.log("first", firstGuarantorName, firstGrantorCareOfName, firstGrantorRelation, firstGrantorAadhaarNo, firstGrantorAddress, secondGrantorName, secondGrantorCareOfName, secondGrantorRelation, secondGrantorAadhaarNo, secondGrantorAddress,)
        if (firstGuarantorName == null ||
            firstGrantorCareOfName == null ||
            firstGrantorRelation == null ||
            firstGrantorAadhaarNo == null ||
            firstGrantorAddress == null ||
            secondGrantorName == null ||
            secondGrantorCareOfName == null ||
            secondGrantorRelation == null ||
            secondGrantorAadhaarNo == null ||
            secondGrantorAddress == null) {
            Toast.show({
                type: 'error',
                text1: "Please fill mandatory details."
            })

        } else if( firstGrantorAadhaarNo===secondGrantorAadhaarNo){

            Toast.show({
                type: 'error',
                text1: "Both Guaranter Aadhar No. should not be same"
            })
        }
        else {

            saveGuarantorDetails(operFlag)

        }
    }
    const getGuaranterDetails= async ()=>{

        try {
            const guarantorData = {
                candidateId: userId,
                firstGrantorName: firstGuarantorName,
                firstGrantorCareOfName: firstGrantorCareOfName,
                firstGrantorRelation: firstGrantorRelation,
                firstGrantorAadhaarNo: firstGrantorAadhaarNo,
                firstGrantorAddress: firstGrantorAddress,
                secondGrantorName: secondGrantorName,
                secondGrantorCareOfName: secondGrantorCareOfName,
                secondGrantorRelation: secondGrantorRelation,
                secondGrantorAadhaarNo: secondGrantorAadhaarNo,
                secondGrantorAddress: secondGrantorAddress,
                userId: userId,
                operFlag: "V",

            }
            // console.log("GuarantoDataRequest", guarantorData)
            setLoaderVisible(true);
            axios.post(`${API}/api/hrms/saveGrantorInfo`, guarantorData).then((response) => {
                // axios.post('http://192.168.1.169:7038/api/hrms/saveGrantorInfo', guarantorData).then((response) => {

                const result = response.data.Result;
                setLoaderVisible(false);

                // if (result[0].FLAG === "S") {
                //     props.onPress();

                // }
                // console.log("getresultguarantor", result);

                (result[0].MSG !== "" ? Toast.show({
                    type: 'success',
                    text1: result[0]?.MSG
                }) : "")


                setApproveRemarks(result[0]?.DOC_REJ_REMARK);
                setApprovalFlag(result[0]?.APPROVAL_FLAG);

                setFirstGuarantorName(result[0]?.FIRST_GURANTR_NAME),
                    setFirstGrantorCareOfName(result[0]?.CAREOF_FIRST_GURANTR_NAME),
                    setFirstGrantorRelation(result[0]?.FIRST_GURANTR_RELATION),
                    setFirstGrantorAadhaarNo(result[0]?.FIRST_GURANTR_AADHAR_NO),
                    setFirstGrantorAddress(result[0]?.FIRST_GURANTR_ADDRESS),
                    setSecondGrantorName(result[0]?.SECOND_GURANTR_NAME),
                    setSecondGrantorCareOfName(result[0]?.CAREOF_SECOND_GURANTR_NAME),
                    setSecondGrantorRelation(result[0]?.SECOND_GURANTR_RELATION),
                    setSecondGrantorAadhaarNo(result[0]?.SECOND_GURANTR_AADHAR_NO),
                    setSecondGrantorAddress(result[0]?.SECOND_GURANTR_ADDRESS)
                    setFilledDetails(result[0]);

                // console.log(Object.keys(result[0])?.length);
                if (Object.keys(result[0])?.length > 0 && result[0]?.FIRST_GURANTR_AADHAR_NO != null) {
                    setIsDisabled(true)
                }


            })
        } catch (error) {

            // console.log("error", error);
            setLoaderVisible(false);

        }

    }

    const saveGuarantorDetails = async (flag) => {
        try {
            const guarantorData = {
                candidateId: userId,
                firstGrantorName: firstGuarantorName,
                firstGrantorCareOfName: firstGrantorCareOfName,
                firstGrantorRelation: firstGrantorRelation,
                firstGrantorAadhaarNo: firstGrantorAadhaarNo,
                firstGrantorAddress: firstGrantorAddress,
                secondGrantorName: secondGrantorName,
                secondGrantorCareOfName: secondGrantorCareOfName,
                secondGrantorRelation: secondGrantorRelation,
                secondGrantorAadhaarNo: secondGrantorAadhaarNo,
                secondGrantorAddress: secondGrantorAddress,
                userId: userId,
                operFlag: flag,

            }
            // console.log("GuarantoDataRequest", guarantorData)
            setLoaderVisible(true);
            axios.post(`${API}/api/hrms/saveGrantorInfo`, guarantorData).then((response) => {
                // axios.post('http://192.168.1.169:7038/api/hrms/saveGrantorInfo', guarantorData).then((response) => {

                const result = response.data.Result;
                setLoaderVisible(false);

                if (flag === "A") {
                    props.onPress();

                }
                // console.log("resultguarantor", result);

                (result[0].MSG !== "" ? Toast.show({
                    type: 'success',
                    text1: result[0]?.MSG
                }) : "")


                // setApproveRemarks(result[0]?.DOC_REJ_REMARK);
                // setApprovalFlag(result[0]?.APPROVAL_FLAG);

                // setFirstGuarantorName(result[0]?.FIRST_GURANTR_NAME),
                //     setFirstGrantorCareOfName(result[0]?.CAREOF_FIRST_GURANTR_NAME),
                //     setFirstGrantorRelation(result[0]?.FIRST_GURANTR_RELATION),
                //     setFirstGrantorAadhaarNo(result[0]?.FIRST_GURANTR_AADHAR_NO),
                //     setFirstGrantorAddress(result[0]?.FIRST_GURANTR_ADDRESS),
                //     setSecondGrantorName(result[0]?.SECOND_GURANTR_NAME),
                //     setSecondGrantorCareOfName(result[0]?.CAREOF_SECOND_GURANTR_NAME),
                //     setSecondGrantorRelation(result[0]?.SECOND_GURANTR_RELATION),
                //     setSecondGrantorAadhaarNo(result[0]?.SECOND_GURANTR_AADHAR_NO),
                //     setSecondGrantorAddress(result[0]?.SECOND_GURANTR_ADDRESS)

                // console.log(Object.keys(result[0])?.length);
                // if (Object.keys(result[0])?.length > 0 && result[0]?.FIRST_GURANTR_AADHAR_NO != null) {
                //     setIsDisabled(true)
                // }


            })
        } catch (error) {
            Toast.show({
                type:'error',
                text1:error
            })

            // console.log("error", error);
            setLoaderVisible(false);

        }
    }


    return (
        <View style={{ flex: 1 }}>
            {/* close button */}
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{...FONTS.h4, fontSize: 18, color: COLORS.orange }}>Guarantor Details</Text>
                {approvalFlag === "R" ? <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => {
                    showAlert({
                        title: approveRemark,
                        customIcon: 'none',
                        message: "",
                        alertType: 'error',
                        btnLabel: 'ok',
                        onPress: () => closeAlert(),

                    });
                }}>
                    <Icons name='alert-circle-outline' size={25} color={COLORS.red} />
                </TouchableOpacity> : ""}
                <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={props.onPress} >
                        <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
                    </TouchableOpacity>
                </View>
            </View>
            {loaderVisible ? (<View style={{ alignItems: 'center', marginTop: '30%', }}>
                <ActivityIndicator color={COLORS.orange1} />
                <Text style={{ ...FONTS.h3, fontWeight: '500', color: COLORS.orange1, marginTop: SIZES.base, }}>
                    Loading your details
                </Text>
            </View>
            ) :
                <KeyboardAwareScrollView
                    extraScrollHeight={270}
                    behavior={'padding'}
                    enableAutomaticScroll={true}
                    keyboardShouldPersistTaps={'always'}
                    style={{ flex: 1, marginBottom: 170 }}
                    contentContainerStyle={{
                        paddingBottom: 170
                    }}

                    showsVerticalScrollIndicator={false}
                >

                    {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                    {/* <Loader loaderVisible={loaderVisible} /> */}
                    <View style={{ borderWidth: 1, borderColor: COLORS.lightGray, borderRadius: 6, padding: 8, }}>
                        <Text style={{ color: COLORS.orange1, ...FONTS.h2, fontSize: 16 }}>First Guarantor</Text>
                        {/* first guarantor name */}
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>First Guarantor Name <Text style={{ color: COLORS.red, ...FONTS.h4, textAlign: 'center', fontSize: 16 }}>*</Text></Text>
                            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='Name' onChangeText={setFirstGuarantorName} value={firstGuarantorName} />

                        </View>
                        {/* guarantor S/O, D/O, W/O */}
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>First Guarantor S/O, D/O, W/O <Text style={{ color: COLORS.red, ...FONTS.h4, textAlign: 'center', fontSize: 16 }}>*</Text></Text>
                            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' onChangeText={setFirstGrantorCareOfName} value={firstGrantorCareOfName} />
                        </View>
                        {/* guarantor realtion */}
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>First Guarantor Relation <Text style={{ color: COLORS.red, ...FONTS.h4, textAlign: 'center', fontSize: 16 }}>*</Text></Text>
                            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' onChangeText={setFirstGrantorRelation} value={firstGrantorRelation} />
                        </View>
                        {/* guarantor Aadhar */}
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>First Guarantor Aadhar Number <Text style={{ color: COLORS.red, ...FONTS.h4, textAlign: 'center', fontSize: 16 }}>*</Text></Text>
                            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' keyboardType='number-pad' onChangeText={setFirstGrantorAadhaarNo} value={firstGrantorAadhaarNo} maxLength={12} />
                        </View>
                        {/* guarantor address */}
                        <View style={{ marginTop: 10, marginBottom: 15, }}>
                            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>First Guarantor Address <Text style={{ color: COLORS.red, ...FONTS.h4, textAlign: 'center', fontSize: 16 }}>*</Text></Text>
                            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' onChangeText={setFirstGrantorAddress} value={firstGrantorAddress} />
                        </View>
                    </View>

                    <View style={{ borderWidth: 1, borderColor: COLORS.lightGray, borderRadius: 6, padding: 8, marginTop: 20 }}>
                        <Text style={{ color: COLORS.orange1, ...FONTS.h2, fontSize: 16 }}>Second Guarantor</Text>
                        {/* second guarantor name */}
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Second Guarantor Name <Text style={{ color: COLORS.red, ...FONTS.h4, textAlign: 'center', fontSize: 16 }}>*</Text></Text>
                            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='Name' onChangeText={setSecondGrantorName} value={secondGrantorName} />
                        </View>
                        {/* guarantor S/O, D/O, W/O */}
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Second Guarantor S/O, D/O, W/O <Text style={{ color: COLORS.red, ...FONTS.h4, textAlign: 'center', fontSize: 16 }}>*</Text></Text>
                            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' onChangeText={setSecondGrantorCareOfName} value={secondGrantorCareOfName} />
                        </View>
                        {/* guarantor realtion */}
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Second Guarantor Relation <Text style={{ color: COLORS.red, ...FONTS.h4, textAlign: 'center', fontSize: 16 }}>*</Text></Text>
                            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' onChangeText={setSecondGrantorRelation} value={secondGrantorRelation} />
                        </View>
                        {/* guarantor Aadhar */}
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Second Guarantor Aadhar Number <Text style={{ color: COLORS.red, ...FONTS.h4, textAlign: 'center', fontSize: 16 }}>*</Text></Text>
                            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' keyboardType='number-pad' onChangeText={setSecondGrantorAadhaarNo} value={secondGrantorAadhaarNo} maxLength={12} />
                        </View>
                        {/* <Text style={{ color: "#000"}}>{JSON.stringify(filledDetails.FIRST_GURANTR_AADHAR_NO == null)}</Text> */}
                        {/* guarantor address */}
                        <View style={{ marginTop: 10, marginBottom: 15, }}>
                            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Second Guarantor Address <Text style={{ color: COLORS.red, ...FONTS.h4, textAlign: 'center', fontSize: 16 }}>*</Text></Text>
                            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' onChangeText={setSecondGrantorAddress} value={secondGrantorAddress} />
                        </View>
                    </View>
                   
                    {approvalFlag !== "A" ?
                    <TouchableOpacity onPress={() =>filledDetails.FIRST_GURANTR_AADHAR_NO==null? validation("A"):validation("E")} >
                        <LinearGradient colors={[COLORS.orange1, COLORS.disableOrange1]} start={{ x: 0, y: 0 }} end={{ x: 2, y: 0 }} style={{ borderRadius: 8, padding: 8, marginTop: 20 }}>
                            <Text
                                style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }}>{filledDetails.FIRST_GURANTR_AADHAR_NO==null?"Save":"Update"}</Text>
                        </LinearGradient>
                    </TouchableOpacity>:""}
                    {/* <View style={{ marginBottom: 270 }}></View> */}
                    {/* </ScrollView> */}
                </KeyboardAwareScrollView>
            }
        </View>
    )
}

export default GuarantorBottomView