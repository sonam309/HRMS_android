import React from 'react'
import COLORS from '../../constants/theme'
import Timeline from 'react-native-simple-timeline';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, Text, TouchableOpacity, ScrollView, Linking, ToastAndroid, Image } from 'react-native'
import { FONTS } from '../../constants/font_size';
import LinearGradient from 'react-native-linear-gradient';
import { company_icon } from '../../assets';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'


const CandidateDashboard = (props) => {
    const loadInBrowser = () => {
        Linking.openURL('https://satyamicrocapital.com/').catch(err => ToastAndroid("Couldn't load page" + err, 4000));
    };
    return (
        <ScrollView>
            {/* header view */}
            <View style={{ backgroundColor: COLORS.white, paddingHorizontal: 12, paddingBottom: 8, shadowColor: COLORS.orange1, elevation: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <View style={{ paddingLeft: 8, marginTop: 8, }}>
                        <Text style={{ ...FONTS.h4, color: COLORS.orange1, }}>Welcome</Text>
                        <Text style={{ ...FONTS.body2, color: COLORS.darkGray2, }}>Ashutosh Kumar</Text>
                    </View>
                </View>
            </View>
            {/* Status view */}
            <View style={{ marginHorizontal: 12, marginVertical: 12 }}>
                <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black }}>Job Status</Text>
                <TouchableOpacity style={{ backgroundColor: COLORS.disableGreen, paddingVertical: 20, borderRadius: 12, width: "60%", marginVertical: 12, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }} onPress={() => props.navigation.navigate("Status_view_page")}>
                    <Text style={{ fontSize: 18, fontWeight: 500, color: COLORS.green }}>Status</Text>
                </TouchableOpacity>
            </View>
            {/* offer Letter view */}
            <View style={{ marginHorizontal: 12, marginVertical: 12 }}>
                <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black }}> Offer Letter</Text>
                <TouchableOpacity style={{ backgroundColor: COLORS.disableOrange1, paddingVertical: 20, borderRadius: 12, width: "50%", marginVertical: 12, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} onPress={() => props.navigation.navigate("Offer_Letter")}>
                    <SimpleLineIcons name="envelope-letter" size={40} color={COLORS.orange} />
                </TouchableOpacity>
            </View>
            {/* task view */}
            <View style={{ marginHorizontal: 12, marginVertical: 6 }}>
                <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black }}> Task  </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6, elevation: 5 }}>
                    {/* profile view */}
                    <TouchableOpacity style={{ height: 160, width: "45%", backgroundColor: COLORS.disableOrange1, padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 12 }} onPress={() => props.navigation.navigate("Candidate_profile")}>
                        <FontAwesome5 name="user" size={44} color={COLORS.orange1} />
                        <Text style={{ color: COLORS.orange1, fontWeight: 500, fontSize: 16, marginTop: 12 }}>  Your profile     </Text>
                    </TouchableOpacity>
                    {/* document view */}
                    <TouchableOpacity onPress={() => props.navigation.navigate("Candidate_Document")} style={{ height: 160, backgroundColor: COLORS.disableGreen, padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 12, width: "45%", }}>
                        <Icons name="file-document-outline" size={44} color={COLORS.green} />
                        <Text style={{ color: COLORS.green, fontWeight: 500, fontSize: 16, marginTop: 12 }}>  Documents </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* about satya */}
            <View style={{ marginVertical: 6, marginHorizontal: 12 }}>
                <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black, marginVertical: 5 }}> Others </Text>
                <TouchableOpacity style={{ backgroundColor: COLORS.transparentBlack1, padding: 8, alignItems: 'center', justifyContent: 'center', borderRadius: 12, width: "45%", marginVertical: 5 }} onPress={loadInBrowser}>
                    <Image source={company_icon} style={{ borderRadius: 12, height: 70, width: 70 }} resizeMode='cover' />
                    <Text style={{ fontWeight: 500 }}>About Satya/Policies</Text>
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