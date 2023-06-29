import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const LanguageBottomView = (props) => {

   

    const[selectedLanguage,setSelectedLanguage]=useState();
    const[selectedLanguageValue,setSelectedLanguageValue]=useState();
    const[language,setLanguage]=useState();

    const [isMothertongue, setIsMothertongue] = useState(false);
    const[isCanRead,setIsCanRead]=useState(false);
    const[isCanWrite,setIsCanWrite]=useState(false);
    const[isCanSpeak,setIsCanSpeak]=useState(false);


    useEffect(() => {
        // getDropdownData(4);
        getDropdownData(29);

    }, []);


    
    const getDropdownData = async (P) => {
        let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
        response = await response.json();
        const returnedData = response;

         if (P === 29) {

            setLanguage(returnedData)
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
                    <SelectDropdown data={language?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedLanguage(value), checkLanguageValue(value) }} defaultButtonText={language?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
                </View>

                {/* mother tongue checkbox */}
                <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => setIsMothertongue(!isMothertongue)}
                        style={{
                            alignItems: "center",
                            width: "42%",
                            padding: SIZES.base,
                            flexDirection: "row",
                            justifyContent: "space-between",

                        }} >
                        {isMothertongue ? <Icons name='checkbox-marked-circle-outline' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
                        <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign: 'center' }}>Mother Tongue</Text>
                    </TouchableOpacity>

                </View>


                {/* can read checkbox */}
                <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => setIsCanRead(!isCanRead)}
                        style={{
                            alignItems: "center",
                            width: "32%",
                            padding: SIZES.base,
                            flexDirection: "row",
                            justifyContent: "space-between",

                        }} >
                        {isCanRead ? <Icons name='checkbox-marked-circle-outline' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
                        <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign: 'center' }}>Can Read</Text>
                    </TouchableOpacity>

                </View>

                 {/* can Write checkbox */}
                 <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => setIsCanWrite(!isCanWrite)}
                        style={{
                            alignItems: "center",
                            width: "32%",
                            padding: SIZES.base,
                            flexDirection: "row",
                            justifyContent: "space-between",

                        }} >
                        {isCanWrite ? <Icons name='checkbox-marked-circle-outline' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
                        <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign: 'center' }}>Can Write</Text>
                    </TouchableOpacity>

                </View>

                 {/* can Speak checkbox */}
                 <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => setIsCanSpeak(!isCanSpeak)}
                        style={{
                            alignItems: "center",
                            width: "34%",
                            padding: SIZES.base,
                            flexDirection: "row",
                            justifyContent: "space-between",

                        }} >
                        {isCanSpeak ? <Icons name='checkbox-marked-circle-outline' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
                        <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign: 'center' }}>Can Speak</Text>
                    </TouchableOpacity>

                </View>

                {/* save button */}
                <TouchableOpacity onPress={()=>Alert.alert("Data Save Successfully")}>
                  
                   <LinearGradient
                    colors={[COLORS.orange1, COLORS.disableOrange1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 2, y: 0 }}

                    style={{ borderRadius: 8, padding: 8, marginTop: 80 }}

                >
                    <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }} onPress={() => Alert.alert("Data Save Successfull")}>
                        Save
                    </Text>
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