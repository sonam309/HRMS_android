import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import COLORS from '../../../constants/theme'
import InterviewStatusList from '../../../data/InterviewStatusList'
import LeaveBalanceList from '../../../data/LeaveBalanceList'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import candidateIcon from '../../../assets/images/candidateIcon.png'


const Interview_status = () => {

    function CandidateList(props) {

        const id = props.id, name = props.name, designation = props.designation, timing = props.timing, date = props.date

        return (
            <TouchableOpacity key={id} style={{ width: '100%' }}>
                <View style={{ borderRadius: 60, backgroundColor: COLORS.bg_tile_Colo, flexDirection: 'row', height: 80, alignItems: 'center', elevation: 6, justifyContent: 'space-evenly', marginTop: 15 }}>
                    <View>
                        <Image source={candidateIcon} style={{ width: 50, height: 50, }} />
                    </View>

                    <View >
                        <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: '500' }}>
                            {name}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="briefcase-variant-outline" color='white' size={30} style={{
                                marginLeft: 20,
                                marginTop: 5
                            }} />
                            <Text style={{ color: COLORS.gray, fontSize: 12, fontWeight: '500', marginTop: -5 }}>
                                {designation}
                            </Text>

                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <Text style={{ backgroundColor: '#8467D7', borderRadius: 20, textAlign: 'center', alignSelf: 'center', padding: 8, color: COLORS.white, fontWeight: '500' }}>
                            {timing}
                        </Text>
                    </View>

                </View>

            </TouchableOpacity>
        )
    }

    return (
        <View>
            <View style={{ backgroundColor: COLORS.white, margin: 10, elevation: 6, padding: 8, borderRadius: 10, height: '100%', }}>


                {/* top buttons */}
                <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginHorizontal: 10, }}>
                        <Text style={[styles.regilizationBtn, { backgroundColor: COLORS.voilet, borderColor: COLORS.white, elevation: 6 }]}
                            onPress={() => props.navigation.navigate("Apply_Leave")}>
                            Schedule Interview </Text>
                        <Text style={[styles.regilizationBtn, { backgroundColor: COLORS.white, borderColor: COLORS.voilet, color: COLORS.voilet, elevation: 6 }]}>
                            Complete Interview </Text>
                    </View>

                </View>
                {/* ListView */}

                <ScrollView>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginHorizontal: 10 }}>
                        {InterviewStatusList.map((item) => <CandidateList id={item.id} name={item.name} designation={item.designation} timing={item.timing} date={item.date} image={item.image} />)}
                    </View>

                </ScrollView>

            </View>
        </View>
    )
}





const styles = StyleSheet.create({
    newJobOpeneingTxt: {
        padding: 10,
        fontSize: 14,
        fontWeight: '500',
        flexDirection: 'row'
    },
    dropDownStyle: {
        width: '100%',
        backgroundColor: 'white',
        borderColor: COLORS.skyBlue,
        height: 40,
        elevation: 5,
        color: COLORS.voilet,
        marginTop: 5,
        borderWidth: 1,
    },
    regilizationBtn: {
        paddingLeft: 8,
        paddingRight: 8,
        textAlign: 'center',
        elevation: 6,
        color: 'white',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 5,
        borderRadius: 20,
        borderWidth: 1,
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 12,
        fontWeight: 500
    },
    Elevation: {
        elevation: 7,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
})

export default Interview_status