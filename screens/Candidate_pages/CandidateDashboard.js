import React, { useEffect } from 'react'
import COLORS from '../../constants/theme'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, Text, TouchableOpacity, ScrollView, Linking, ToastAndroid, Image, BackHandler, Alert } from 'react-native'
import { FONTS, SIZES } from '../../constants/font_size';
import LinearGradient from 'react-native-linear-gradient';
import { company_logo_2, expernallinkImage } from '../../assets';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useSelector } from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import ReverseGeocoding from '../../functions/ReverseGeocoding';

const CandidateDashboard = (props) => {
    const current_Status = useSelector(state => state.candidateAuth.candidateStatus)
    const Job_Title = useSelector(state => state.candidateAuth.candidateRole)

    useEffect(() => {
        
        // for handling back button in android
        const backAction = () => {
            Alert.alert('Wait', 'Are you sure, you want to exit the App?', [
                {
                    text: 'No',
                    onPress: () => null,
                },
                {
                    text: 'Yes',
                    onPress: () => BackHandler.exitApp(),
                },
            ]);
            return true;
        };

        const backPressHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => {
            backPressHandler.remove();
        };
    }, []);


    const loadInBrowser = () => {
        Linking.openURL('https://satyamicrocapital.com/').catch(err => ToastAndroid("Couldn't load page" + err, 4000));
    };
    return (
        <ScrollView>
            {/* header view */}
            <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 12, paddingBottom: 8, shadowColor: COLORS.orange1, elevation: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Text style={{ ...FONTS.h1, color: COLORS.orange1, textAlignVertical: 'center', marginTop: 10 }}>Welcome</Text>
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10, marginRight: 10 }}>
                        <FontAwesomeIcon name="user-circle-o" size={28} color={COLORS.black} />
                        <Text style={{ ...FONTS.h3, color: COLORS.black, }}>Ashutosh Kumar</Text>

                    </View>
                </View>
            </View>
            {/* Status view */}
            <View style={{ marginHorizontal: 12, }}>
                <View style={{ backgroundColor: COLORS.disableGreen, borderColor: COLORS.green, borderWidth: 0.5, paddingVertical: 8, borderRadius: 12, marginVertical: 8, marginTop: 30 }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.black, marginHorizontal: 15 }}>You are applied for {Job_Title}</Text>
                    <Text style={{ color: COLORS.black, fontSize: 15, marginHorizontal: 15, marginTop: -5 }}>Job Status Pending at <Text style={{ ...FONTS.body1, fontSize: 16, color: COLORS.green, textAlign: 'center', }}> {current_Status}</Text></Text>
                    <TouchableOpacity style={{ width: '40%', marginTop: -15, marginHorizontal: 15 }} onPress={() => props.navigation.navigate("Status_view_page")}>
                        <LinearGradient
                            colors={[COLORS.orange1, COLORS.disableOrange1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 2, y: 0 }}
                            style={{ borderRadius: 8, padding: 8, marginTop: 20 }} >
                            <Text style={{ color: COLORS.white, ...FONTS.h4, textAlign: 'center' }}>Track job Status</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>

            {/* offer Letter view */}
            <View style={{ marginHorizontal: 12, marginVertical: 12 }}>
                <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black }}> Offer Letter</Text>
                <TouchableOpacity style={{ backgroundColor: COLORS.disableOrange1, paddingVertical: 20, borderRadius: 12, width: "100%", marginVertical: 12, borderColor: COLORS.orange1, borderWidth: 0.5, }} onPress={() => props.navigation.navigate("Offer_Letter")}>
                    <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-between' }}>
                        <SimpleLineIcons name="envelope-letter" size={30} color={COLORS.orange} style={{ marginHorizontal: 30 }} />
                        <Text style={{ fontWeight: 500, fontSize: 14, color: COLORS.orange, marginRight: 30, textAlignVertical: 'center' }}>View Offer Letter{">"}</Text>
                    </View>

                </TouchableOpacity>
            </View>


            {/* task view */}
            <View style={{ marginHorizontal: 12, marginVertical: 6 }}>
                <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black }}> Task  </Text>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'space-between', marginVertical: 6, elevation: 5 }}>
                    {/* profile view */}
                    <TouchableOpacity style={{ height: 160, width: "45%", borderColor: COLORS.orange, borderWidth: 0.5, backgroundColor: COLORS.disableOrange1, padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 12 }} onPress={() => props.navigation.navigate("Candidate_profile")}>
                        <FontAwesome5 name="user" size={44} color={COLORS.orange1} />
                        <Text style={{ color: COLORS.orange1, fontWeight: 500, fontSize: 16, marginTop: 12 }}>  Your profile     </Text>
                    </TouchableOpacity>
                    {/* document view */}
                    <TouchableOpacity onPress={() => props.navigation.navigate("Candidate_Document")} style={{ borderColor: COLORS.green, borderWidth: 0.5, height: 160, backgroundColor: COLORS.disableGreen, padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 12, width: "45%", }}>
                        <Icons name="file-document-outline" size={44} color={COLORS.green} />
                        <Text style={{ color: COLORS.green, fontWeight: 500, fontSize: 16, marginTop: 12 }}>  Documents </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* about satya */}
            <View style={{ marginHorizontal: SIZES.radius, }}>
                <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black, }}>About Satya </Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://satyamicrocapital.com/')}
                    style={{  marginTop: 10,marginBottom:10, backgroundColor: COLORS.white, height: 110, borderRadius: SIZES.radius, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: COLORS.lightGray, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', zIndex: 1000, top: 5, right: 5, borderWidth: 1, borderColor: COLORS.lightGray, borderRadius: SIZES.base / 2, padding: SIZES.base / 4, }}>
                        <Image source={expernallinkImage}
                            style={{ height: 20, width: 20, }} />
                        {/* <Text style={{ marginLeft: SIZES.base, ...FONTS.body5}}>satyamicrocapital.com</Text>  */}
                    </View>
                    <View style={{ height: 100, width: 200, }}>
                        <Image source={company_logo_2} style={{ height: '100%', width: '100%', }} />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}


const data = [
    {
        id: 0,
        status: 'On-Progress',
        date: '03-03-2023'
    },
    {
        id: 1,
        status: 'Paid',
        date: '04-03-2023'
    },
    {
        id: 3,
        status: 'Finish',
        date: '05-03-2023'
    },
    {
        id: 3,
        status: 'Finish',
        date: '05-03-2023'
    },
    {
        id: 3,
        status: 'Finish',
        date: '05-03-2023'
    },
]
export default CandidateDashboard