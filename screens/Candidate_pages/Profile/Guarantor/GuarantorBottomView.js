import { View, Text, ScrollView, TouchableOpacity, TextInput, ToastAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTS } from '../../../../constants/font_size'
import COLORS from '../../../../constants/theme'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from '../../../../components/Loader';

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
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        saveGuarantorDetails("V");
    }, [])

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
            console.log("GuarantoDataRequest", guarantorData)
            setLoaderVisible(true);
            // axios.post('https://econnectsatya.com:7033/api/hrms/saveGrantorInfo', guarantorData).then((response) => {
            axios.post('http://192.168.1.169:7038/api/hrms/saveGrantorInfo', guarantorData).then((response) => {

                const result = response.data.Result;
                setLoaderVisible(false);
                // ToastAndroid.show(result.MSG, 3000);
                // Alert.alert(result.MSG);
                //  props.onPress;
                // console.log("resultguarantor", response.data);

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
            })
        } catch (error){

            console.log("error",error);
            setLoaderVisible(false);

        }

    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Loader loaderVisible={loaderVisible} />
            {/* close button */}
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ flex: 1, ...FONTS.h4, fontSize: 18, color: COLORS.orange }}>Guarantor Details</Text>
                <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={props.onPress} >
                        <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ borderWidth: 1, borderColor: COLORS.lightGray, borderRadius: 6, padding: 8, }}>
                <Text style={{ color: COLORS.orange1, ...FONTS.h2, fontSize: 16 }}>First Guarantor</Text>
                {/* first guarantor name */}
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>First Guarantor Name</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='Name' onChangeText={setFirstGuarantorName} value={firstGuarantorName} />
                </View>
                {/* guarantor S/O, D/O, W/O */}
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>First Guarantor S/O, D/O, W/O</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' onChangeText={setFirstGrantorCareOfName} value={firstGrantorCareOfName} />
                </View>
                {/* guarantor realtion */}
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>First Guarantor Relation</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' onChangeText={setFirstGrantorRelation} value={firstGrantorRelation} />
                </View>
                {/* guarantor Aadhar */}
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>First Guarantor Aadhar Number</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' keyboardType='number-pad' onChangeText={setFirstGrantorAadhaarNo} value={firstGrantorAadhaarNo} />
                </View>
                {/* guarantor address */}
                <View style={{ marginTop: 10, marginBottom: 15, }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>First Guarantor Address</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' onChangeText={setFirstGrantorAddress} value={firstGrantorAddress} />
                </View>
            </View>

            <View style={{ borderWidth: 1, borderColor: COLORS.lightGray, borderRadius: 6, padding: 8, marginTop: 20 }}>
                <Text style={{ color: COLORS.orange1, ...FONTS.h2, fontSize: 16 }}>Second Guarantor</Text>
                {/* second guarantor name */}
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>second Guarantor Name</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='Name' onChangeText={setSecondGrantorName} value={secondGrantorName} />
                </View>
                {/* guarantor S/O, D/O, W/O */}
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>second Guarantor S/O, D/O, W/O</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' onChangeText={setSecondGrantorCareOfName} value={secondGrantorCareOfName} />
                </View>
                {/* guarantor realtion */}
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>second Guarantor Relation</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' onChangeText={setSecondGrantorRelation} value={secondGrantorRelation} />
                </View>
                {/* guarantor Aadhar */}
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>second Guarantor Aadhar Number</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' keyboardType='number-pad' onChangeText={setSecondGrantorAadhaarNo} value={secondGrantorAadhaarNo} />
                </View>
                {/* guarantor address */}
                <View style={{ marginTop: 10, marginBottom: 15, }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body4 }}>second Guarantor Address</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 8, height: 40, paddingLeft: 8, marginTop: 5 }} placeholder='' onChangeText={setSecondGrantorAddress} value={secondGrantorAddress} />
                </View>
            </View>

            <TouchableOpacity opacity={!isHidden ? 1 : 0.5}
                onPress={() => { setIsHidden(!isHidden) }}>
                <LinearGradient colors={[COLORS.orange1, COLORS.disableOrange1]} start={{ x: 0, y: 0 }} end={{ x: 2, y: 0 }} style={{ borderRadius: 8, padding: 8, marginTop: 20 }}>
                    <Text onPress={() => { isHidden ? Alert.alert("Data already exist") : saveGuarantorDetails("A") }} style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }}>{isHidden ? "Updated" : "Save"}</Text>
                </LinearGradient>
            </TouchableOpacity>
            <View style={{ marginBottom: 300 }}></View>
        </ScrollView>
    )
}

export default GuarantorBottomView