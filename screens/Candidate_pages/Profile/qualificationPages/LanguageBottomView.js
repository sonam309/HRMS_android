import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

const LanguageBottomView = ({ languages, onPress }) => {
    const userId = useSelector(state => state.candidateAuth.candidateId)
    const [showForm, setShowForm] = useState(false)

    const [operFlag, setOperFlag] = useState("A");
    const [TXNID, setTXNID] = useState('');

    const [selectedLanguage, setSelectedLanguage] = useState();
    const [selectedLanguageValue, setSelectedLanguageValue] = useState();
    const [language, setLanguage] = useState();

    const [isMothertongue, setIsMothertongue] = useState("false");
    const [isCanRead, setIsCanRead] = useState("false");
    const [isCanWrite, setIsCanWrite] = useState("false");
    const [isCanSpeak, setIsCanSpeak] = useState("false");

    // for getting dropdown language data
    useEffect(() => {
        getDropdownData(29);
    }, []);


    const getDropdownData = async (P) => {
        let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
        response = await response.json();
        const returnedData = response;
        if (P === 29) { setLanguage(returnedData) }
    }

    // for deleting language
    const DeleteLanguage = async ({ txnID }) => {

        try {
            let languageData = {
                txnId: txnID, operFlag: "D", userId: userId
            }
            console.warn(languageData);

            let res = await fetch("http://192.168.1.169:7038/api/hrms/candidateLanguage", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(languageData)
            })
            res = await res.json();
            res = await res?.Result[0]?.MSG
            ToastAndroid.show(res, 3000);

        }
        catch (error) {
            ToastAndroid.show(error, 3000)
        }

    }

    // for updating language
    const UpdateLanguage = async (item) => {
        setOperFlag("E")
        { console.warn("updating", item) }
        setTXNID(item.TXN_ID)

        setIsMothertongue(item.MOTHER_TONGUE)
        setIsCanRead(item.CAN_READ)
        setIsCanWrite(item.CAN_WRITE)
        setIsCanSpeak(item.CAN_SPEAK)
        setSelectedLanguage(item.LANGUAGE_NAME)
        setSelectedLanguageValue(item.LANGUAGES_ID)

        setShowForm(true)
    }

    // for saving language
    const saveLanguageDetails = async () => {

        try {
            const languageData = {
                candidateId: userId, languages: selectedLanguageValue, motherTougue: isMothertongue, canRead: isCanRead, canWrite: isCanWrite, canSpeak: isCanSpeak, userId: userId, operFlag: operFlag, txnId: TXNID
            }

            console.log("request", languageData);
            let res = await fetch("http://192.168.1.169:7038/api/hrms/candidateLanguage", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(languageData)
            })

            res = await res.json();
            res = await res?.Result[0]?.MSG
            ToastAndroid.show(res, 3000);
        } catch (error) {
            ToastAndroid.show(error, 3000)
        }


    }

    // selecting droopdown default text 
    const selectedDropDownText = (id) => {
        if (id === "Language") {
            return selectedLanguage ? selectedLanguage : language?.map(a => a.PARAM_NAME)[0]
        }
    }

    // selecting droopdown default value 
    const selectDropDownValue = (id) => {
        if (id === "Language") {
            return selectedLanguageValue ? selectedLanguageValue : language?.map(a => a.PARAM_ID)[0];
        }
    }

    // for setting selected language value
    const checkLanguageValue = (value) => {
        {
            for (let index = 0; index < language.length; index++) {
                const element = language[index];
                if (element.PARAM_NAME === value) setSelectedLanguageValue(element.PARAM_ID);
            }
        }
    }

    // for displaying all language details
    const LanguageDetails = () => {
        return (
            <View style={{ padding: 4 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 700, color: 'black' }}>Language Details: </Text>
                    <TouchableOpacity onPress={() => setShowForm(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>ADD</Text>
                        <Icons name='plus' size={16} />
                    </TouchableOpacity>
                </View>

                {
                    languages.map((item) => <DisplayLanguage item={item} key={item.LANGUAGE_NAME} />)
                }

            </View>
        )
    }

    // for displaying single language details
    const DisplayLanguage = ({ item }) => {
        return (
            <View style={{ backgroundColor: COLORS.disableOrange1, padding: 6, borderRadius: 12, marginVertical: 4 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.LANGUAGE_NAME} </Text>
                    <Icons position='absolute' onPress={() => DeleteLanguage({ txnID: item.TXN_ID })} right={0} name='trash-can-outline' color={COLORS.green} size={20} />
                    <Icons position='absolute' onPress={() => UpdateLanguage(item)} right={20} name='square-edit-outline' color={COLORS.green} size={20} />
                </View>
                <Text style={{ fontWeight: 600 }}>Can Read:- <Text style={{ fontWeight: 400 }}>{item.CAN_READ === "true" ? 'Yes' : 'No'}</Text></Text>
                <Text style={{ fontWeight: 600 }}>Can Speak:- <Text style={{ fontWeight: 400 }}>{item.CAN_SPEAK === "true" ? 'Yes' : 'No'}</Text></Text>
                <Text style={{ fontWeight: 600 }}>Can Write:- <Text style={{ fontWeight: 400 }}>{item.CAN_WRITE === "true" ? 'Yes' : 'No'}</Text></Text>
                <Text style={{ fontWeight: 600 }}>Mother Tongue:- <Text style={{ fontWeight: 400 }}>{item.MOTHER_TONGUE === "true" ? 'Yes' : 'No'}</Text></Text>
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* close button */}
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ flex: 1, ...FONTS.h3, fontSize: 20, color: COLORS.orange }}>Languages</Text>
                <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={onPress}>
                        <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
                    </TouchableOpacity>
                </View>
            </View>
            {!showForm && languages[0].LANGUAGE_NAME && languages.length > 0 ? <LanguageDetails /> :
                <View >

                    {/* Language dropdown */}
                    <View style={{ height: 75, }}>
                        <Text style={{ color: COLORS.green, ...FONTS.body3 }}>Languages</Text>
                        <SelectDropdown data={language?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedLanguage(value), checkLanguageValue(value) }} defaultButtonText={selectedDropDownText("Language")} defaultValueByIndex={selectDropDownValue("Language")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
                    </View>

                    {/* mother tongue checkbox */}
                    <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => setIsMothertongue(isMothertongue === "true" ? "false" : "true")}
                            style={{ alignItems: "center", width: "42%", padding: SIZES.base, flexDirection: "row", justifyContent: "space-between", }}>
                            {isMothertongue === "true" ? <Icons name='checkbox-marked-circle-outline' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
                            <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign: 'center' }}>Mother Tongue</Text>
                        </TouchableOpacity>
                    </View>

                    {/* can read checkbox */}
                    <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => setIsCanRead(isCanRead === "true" ? "false" : "true")}
                            style={{ alignItems: "center", width: "32%", padding: SIZES.base, flexDirection: "row", justifyContent: "space-between", }} >
                            {isCanRead === "true" ? <Icons name='checkbox-marked-circle-outline' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
                            <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign: 'center' }}>Can Read</Text>
                        </TouchableOpacity>
                    </View>

                    {/* can Write checkbox */}
                    <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => setIsCanWrite(isCanWrite === "true" ? "false" : "true")}
                            style={{ alignItems: "center", width: "32%", padding: SIZES.base, flexDirection: "row", justifyContent: "space-between", }}>
                            {isCanWrite === "true" ? <Icons name='checkbox-marked-circle-outline' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
                            <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign: 'center' }}>Can Write</Text>
                        </TouchableOpacity>
                    </View>

                    {/* can Speak checkbox */}
                    <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setIsCanSpeak(isCanSpeak === "true" ? "false" : "true")}
                            style={{ alignItems: "center", width: "34%", padding: SIZES.base, flexDirection: "row", justifyContent: "space-between", }} >
                            {isCanSpeak === "true" ? <Icons name='checkbox-marked-circle-outline' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
                            <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign: 'center' }}>Can Speak</Text>
                        </TouchableOpacity>
                    </View>

                    {/* save button */}
                    <TouchableOpacity onPress={() => Alert.alert("Data Save Successfully")}>
                        <LinearGradient colors={[COLORS.orange1, COLORS.disableOrange1]} start={{ x: 0, y: 0 }} end={{ x: 2, y: 0 }} style={{ borderRadius: 8, padding: 8, marginTop: 30 }}>
                            <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }} onPress={() => saveLanguageDetails()}> Save</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>}
            <View style={{ marginBottom: 370 }}></View>
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