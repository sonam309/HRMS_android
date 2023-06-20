import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../constants/theme'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { candidateIcon } from '../../../assets'
import BottomUpModal from '../../../components/BottomUpModal'

const Candidate_details = (props) => {
    const { resume, name, designation, interviewStartTime, interviewEndTime, date } = props.route.params
    const [isVisible, setIsVisible] = useState(false)

    const renderFeedbackModal = () => {
        return (
            <View>
                <View>
                    <Text>Hello</Text>
                </View>
                <View style={styles.footerDesign}>

                    <TouchableOpacity onPress={() => approveDetail()} style={[{ backgroundColor: COLORS.green }, styles.buttonStyle]}>
                        <Text style={{ color: COLORS.white, fontWeight: '600', }}> Approve </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => rejectDetail()} style={[{ backgroundColor: COLORS.red }, styles.buttonStyle]}>
                        <Text style={{ color: COLORS.white, fontWeight: '600', }}> Reject </Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    return (

        <View style={{ flex: 1, margin: 10, paddingHorizontal: 10, justifyContent: 'center' }}>

            <View style={[{ backgroundColor: COLORS.skyBlue, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', width: 80, height: 80, borderRadius: 40, marginVertical: 5 }]}>

                <View style={[{ backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30 }]}>
                    <Icons name='phone-in-talk-outline' color={COLORS.white} size={40} />
                </View>

            </View>
            <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 5 }}>Interview Schedule</Text>

            <View style={{ borderBottomWidth: 2, borderTopWidth: 2, borderColor: COLORS.skyBlue, paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Image source={candidateIcon} style={{ height: 60, width: 60, borderRadius: 30 }} />
                    </View>
                    <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                        <Text style={{ color: 'black' }}>{name}</Text>
                        <Text>{designation}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }}>
                    <Icons name='calendar-month-outline' color={COLORS.orange} size={30} />
                    <Text style={{ marginHorizontal: 10 }}>{date}</Text>
                    <Icons name='timetable' color={COLORS.orange} size={30} />
                    <Text style={{ marginHorizontal: 10 }}>{interviewStartTime} - {interviewEndTime}</Text>
                </View>

                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.lightGray, padding: 20, height: 100, borderRadius: 20 }} onPress={() => props.navigation.navigate('Candidate_Resume', { resume })}>
                    <Icons name='file-document-outline' color={COLORS.orange} size={40} />
                    <Text>{resume}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setIsVisible(true)}>
                <Text style={styles.ButtonStyle}>Feedback</Text>
            </TouchableOpacity>

            {isVisible && (
                <BottomUpModal
                    isVisible={isVisible}
                    onClose={() => {
                        setIsVisible(false);
                    }}
                    visibleHieght={250}>
                    {renderFeedbackModal()}
                </BottomUpModal>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    ButtonStyle: {
        textAlign: 'center',
        backgroundColor: COLORS.voilet,
        color: COLORS.white,
        padding: 6,
        marginHorizontal: 60,
        marginTop: 15,
        fontSize: 15,
        borderRadius: 20,
    },
    acceptanceButton: {
        flex: 1,
        borderRadius: 20,
        marginHorizontal: 5
    },
    footerDesign: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        height: 80,
        backgroundColor: COLORS.white,
        justifyContent: 'center'
    },
    buttonStyle: {
        padding: 12,
        marginLeft: 24,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})
export default Candidate_details