import React from 'react'
import COLORS from '../../constants/theme'
import Timeline from 'react-native-simple-timeline';
import { GestureObjects } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gestureObjects';
import Feather from 'react-native-vector-icons/Feather';
import { View, Text, TouchableOpacity } from 'react-native'


const CandidateDashboard = (props) => {
    return (

        <View>
            {/* header view */}
            <View style={{
                backgroundColor: COLORS.white, paddingHorizontal: 12, paddingBottom: 8, shadowColor: COLORS.orange1, elevation: 5
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <View style={{ paddingLeft: 8, marginTop: 8, }}>
                        <Text style={{ fontSize: 14, fontFamily: 'Ubuntu-Bold', fontWeight: 600, color: COLORS.orange1, }}>
                            Welcome
                        </Text>
                        <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 22, fontWeight: 600, color: COLORS.darkGray2, }}>
                            Ashutosh kumar
                        </Text>
                    </View>
                </View>
            </View>

            {/* step view */}
            <View style={{ marginTop: 20, marginHorizontal: '3%' }}>
                <Text style={{ marginBottom: 20, fontWeight: 500, fontSize: 16, color: COLORS.black }}>Candidate Job staus </Text>
                <Timeline data={data} direction='horizontal' />
            </View>

            {/* task view */}
            <View style={{ marginHorizontal: 12, }}>
                <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black, marginTop: 25 }}> Task
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 24, }}>

                    {/* profile view */}
                    <TouchableOpacity style={{ height: 160, width: "45%", backgroundColor: COLORS.disableOrange1, padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 12, }} onPress={()=>props.navigation.navigate("Candidate_profile")}>
                        <Feather name="user" size={44} color={COLORS.orange1} />
                        <Text style={{ color: COLORS.orange1, fontWeight: 500, fontSize: 16, marginTop: 12 }}>
                            Your profile
                        </Text>
                    </TouchableOpacity>

                    {/* document view */}
                    <TouchableOpacity onPress={()=>props.navigation.navigate("Candidate_Document")} style={{ height: 160, backgroundColor: COLORS.disableGreen, padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 12, width: "45%", }}>
                        <Feather name="user" size={44} color={COLORS.green} />
                        <Text
                            style={{ color: COLORS.green, fontWeight: 500, fontSize: 16, marginTop: 12 }}>
                            Documents
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>


            {/* about satya */}
            <View style={{ marginHorizontal: 12, }}>
                <Text style={{ fontWeight: 500, fontSize: 16, color: COLORS.black, marginTop: 25 }}> About Satya
                </Text>
                <TouchableOpacity style={{ height: 180, backgroundColor: COLORS.transparentBlack1, padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 12, width: "100%", marginTop: 10 }}>
                    <Text
                        style={{ color: COLORS.darkGray2, fontSize: 14, fontFamily: 'Ubuntu-Bold', marginTop: 12 }}>
                        About Satya
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
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