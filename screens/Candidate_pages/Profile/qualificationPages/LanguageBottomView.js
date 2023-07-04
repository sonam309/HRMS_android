import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,ToastAndroid, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const LanguageBottomView = (props) => {

    const [operFlag, setOperFlag] = useState("A");
    const [edit, setEdit] = useState({});

    const [selectedLanguage, setSelectedLanguage] = useState();
    const [selectedLanguageValue, setSelectedLanguageValue] = useState();
    const [language, setLanguage] = useState();

    const [isMothertongue, setIsMothertongue] = useState(false);
    const [isCanRead, setIsCanRead] = useState(false);
    const [isCanWrite, setIsCanWrite] = useState(false);
    const [isCanSpeak, setIsCanSpeak] = useState(false);

    const [error, setError] = useState('');


    useEffect(() => {
        getData();
        getDropdownData(29);

    }, []);

    const getData = () => {
        axios
            .post(`http://192.168.1.169:7038/api/hrms/candidateLanguage`, {
                candidateId: "333",
                userId: "333",
                operFlag: 'V'
            })
            .then(response => {
                const returnedData = response?.data?.Result;
                console.log("getDataLAnguage", returnedData);
                const LanguageDetailsRes = returnedData[0];
                const msg = returnedData[0].MSG
                ToastAndroid.show(msg, 5000);

                selectedLanguageValue(LanguageDetailsRes?.LANGUAGES);
                setLanguage(LanguageDetailsRes?.LANGUAGE_NAME);
                
                setIsMothertongue(LanguageDetailsRes?.MOTHER_TONGUE);
                setIsCanRead(LanguageDetailsRes?.CAN_READ);
                setIsCanSpeak(LanguageDetailsRes?.CAN_SPEAK);
                setIsCanWrite(LanguageDetailsRes?.CAN_WRITE);

                console.log(selectedLanguageValue,language,isMothertongue,isCanRead,isCanSpeak,isCanWrite);
                
                (LanguageDetailsRes.FLAG === "S" ? setOperFlag("E") : setOperFlag("A"))
                setEdit(returnedData[0]);
                console.log("editdata", edit);
            })
            .catch(err => {
                console.log(err);
            });
    };


    const saveLanguageDetails = () => {
        const body = {
            candidateId: "333",
            languages: selectedLanguageValue,
            motherTougue: isMothertongue,
            canRead: isCanRead,
            canWrite: isCanWrite,
            canSpeak: isCanSpeak,
            userId: "333",
            operFlag: operFlag,
        }
        console.log("request", body);
        axios
            .post(`http://192.168.1.169:7038/api/hrms/candidateLanguage`, body)
            .then(response => {
                const returnedData = response?.data?.Result;
                console.log("result..", returnedData);
                const msg = returnedData[0].MSG
                ToastAndroid.show(msg, 5000);
                { props.onPress }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getDropdownData = async (P) => {
        let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
        response = await response.json();
        const returnedData = response;
        if (P === 29) { setLanguage(returnedData)}
    }

    const selectedDropDownText = (id) => {
        if (id === "Language") {
            return selectedLanguageValue ? selectedLanguageValue : language?.map(a => a.PARAM_NAME)[0]
        } 
    }

    const selectDropDownValue = (id) => {
        if (id === "Language") {
            return selectedLanguage ? selectedLanguage : language?.map(a => a.PARAM_ID)[0];
        } 

    }

    // getting state value
    const checkLanguageValue = (value) => {
        {
            for (let index = 0; index < language.length; index++) {
                const element = language[index];
                if (element.PARAM_NAME === value) setSelectedLanguageValue(element.PARAM_ID);
            }
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 150 }} >
                {/* close button */}
                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ flex: 1, ...FONTS.h3, fontSize: 20, color: COLORS.black }}>Languages</Text>
                    <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={props.onPress}>
                            <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Language dropdown */}
                <View style={{ height: 75, }}>
                    <Text style={{ color: COLORS.green, ...FONTS.body3 }}>Languages</Text>
                    <SelectDropdown data={language?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedLanguage(value), checkLanguageValue(value) }} defaultButtonText={selectedDropDownText("Language")} defaultValueByIndex={selectDropDownValue("Language")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
                </View>

                {/* mother tongue checkbox */}
                <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => setIsMothertongue(!isMothertongue)}
                        style={{ alignItems: "center", width: "42%", padding: SIZES.base, flexDirection: "row", justifyContent: "space-between", }}>
                        {isMothertongue ? <Icons name='checkbox-marked-circle-outline' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
                        <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign: 'center' }}>Mother Tongue</Text>
                    </TouchableOpacity>
                </View>

                {/* can read checkbox */}
                <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => setIsCanRead(!isCanRead)}
                        style={{ alignItems: "center", width: "32%", padding: SIZES.base, flexDirection: "row", justifyContent: "space-between", }} >
                        {isCanRead ? <Icons name='checkbox-marked-circle-outline' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
                        <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign: 'center' }}>Can Read</Text>
                    </TouchableOpacity>
                </View>

                {/* can Write checkbox */}
                <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => setIsCanWrite(!isCanWrite)}
                        style={{ alignItems: "center", width: "32%", padding: SIZES.base, flexDirection: "row", justifyContent: "space-between", }}>
                        {isCanWrite ? <Icons name='checkbox-marked-circle-outline' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
                        <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign: 'center' }}>Can Write</Text>
                    </TouchableOpacity>
                </View>

                {/* can Speak checkbox */}
                <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => setIsCanSpeak(!isCanSpeak)}
                        style={{ alignItems: "center", width: "34%", padding: SIZES.base, flexDirection: "row", justifyContent: "space-between", }} >
                        {isCanSpeak ? <Icons name='checkbox-marked-circle-outline' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
                        <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign: 'center' }}>Can Speak</Text>
                    </TouchableOpacity>
                </View>

                {/* save button */}
                <TouchableOpacity onPress={() => Alert.alert("Data Save Successfully")}>
                    <LinearGradient colors={[COLORS.orange1, COLORS.disableOrange1]} start={{ x: 0, y: 0 }} end={{ x: 2, y: 0 }} style={{ borderRadius: 8, padding: 8, marginTop: 80 }}>
                        <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }} onPress={() => saveLanguageDetails()}> Save</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputHolder: {
        borderWidth: 1,
        borderColor: COLORS.black,
        flex: 1,
        borderRadius: 10,
        marginHorizontal: 0,
        marginVertical: 5,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
})

export default LanguageBottomView