import React, { useState, useEffect } from 'react'
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Pressable } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Approved from '../../screens/Employee_pages/Approval_screens/Approved/Approved';
import Pending from '../../screens/Employee_pages/Approval_screens/Pending/Pending';
import Rejected from '../../screens/Employee_pages/Approval_screens/Rejected/Rejected';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomUpModal from '../../components/BottomUpModal';
import COLORS from '../../constants/theme';

const Tab = createMaterialTopTabNavigator();

const EmployeeActionsTab = (props) => {
    const { flag } = props.route.params
    const [isVisible, setIsVisible] = useState(false)
    const [notificationCat, setNotificationCat] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    // console.warn("Inside employee actions tab "+flag);

    const applyFilter = () => {
        setIsVisible(false);
        setNotificationCat(selectedOption);
    }

    const renderFilterModal = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                    <Text style={{ fontSize: 22 }}> Filters </Text>
                    <TouchableOpacity onPress={() => setIsVisible(false)}>
                        <Icons name="close" size={34} color="black" />
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.gray }}>
                        <Text style={{ fontSize: 16, color: COLORS.darkerGrey }}> Categories </Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6, flexWrap: 'wrap' }}>
                            <Pressable onPress={() => setSelectedOption('')} style={[styles.filterCatBtn, { width: '48%', borderColor: selectedOption === '' ? COLORS.voilet : 'gray', borderWidth: selectedOption === '' ? 2 : 1.2, },]}>
                                <Text style={[styles.filterCatTxt, { color: selectedOption === '' ? COLORS.darkerGrey : COLORS.darkGray2, fontWeight: selectedOption === '' ? '600' : '500', },]}> All </Text>
                            </Pressable>

                            <Pressable onPress={() => setSelectedOption('New Job Opening')} style={[styles.filterCatBtn, { width: '48%', borderColor: selectedOption === 'New Job Opening' ? COLORS.voilet : 'gray', borderWidth: selectedOption === 'New Job Opening' ? 2 : 1.2, },]}>
                                <Text style={[styles.filterCatTxt, { color: selectedOption === 'New Job Opening' ? COLORS.darkGray : COLORS.darkGray2, fontWeight: selectedOption === 'New Job Opening' ? '600' : '500', },]}> New Job Opening </Text>
                            </Pressable>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6, flexWrap: 'wrap' }}>
                            <Pressable onPress={() => setSelectedOption('Salary Allocation')} style={[styles.filterCatBtn, { width: '48%', borderColor: selectedOption === 'Salary Allocation' ? COLORS.voilet : 'gray', borderWidth: selectedOption === 'Salary Allocation' ? 2 : 1.2, },
                            ]}>
                                <Text style={[styles.filterCatTxt, { color: selectedOption === 'Salary Allocation' ? COLORS.darkGray : COLORS.darkGray2, fontWeight: selectedOption === 'Salary Allocation' ? '600' : '500', },]}> Salary Allocation </Text>
                            </Pressable>

                            <Pressable onPress={() => setSelectedOption('New Job Request')} style={[styles.filterCatBtn, { width: '48%', borderColor: selectedOption === 'New Job Request' ? COLORS.voilet : 'gray', borderWidth: selectedOption === 'New Job Request' ? 2 : 1.2, }]}>
                                <Text style={[styles.filterCatTxt, { color: selectedOption === 'New Job Request' ? COLORS.darkGray : COLORS.darkGray2, fontWeight: selectedOption === 'New Job Request' ? '600' : '500', },]}> New Job Request </Text>
                            </Pressable>
                        </View>

                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => setNotificationCat('')} style={[styles.submitBtn, { backgroundColor: COLORS.transparentViolet }]}>
                        <Text style={{ color: COLORS.voilet, fontSize: 16, }}> RESET </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => applyFilter()} style={[styles.Elevation, styles.submitBtn, { backgroundColor: COLORS.voilet }]}>
                        <Text style={{ color: COLORS.white, fontSize: 16, }}> APPLY </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    let heading;

    switch (flag) {
        case 'H':
            heading = "Hiring Approval"
            break;
        case 'A':
            heading = "Attendance Approval"
            break;
        case 'C':
            heading = "Claim Approval"
            break;
        default:
            heading = "EResign Approval"
            break;
    }

    return (
        <>
            {/* Header */}
            <SafeAreaView style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ paddingHorizontal: 14 }} onPress={() => props.navigation.navigate("Approval_actions")}>
                    <Icons name='arrow-left' color="black" size={25} />
                </TouchableOpacity>
                <View>
                    <Text style={{ color: 'black', fontSize: 18 }}> {heading} </Text>
                </View>
                <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => setIsVisible(true)}>
                    <Icons name='filter-outline' color="black" size={30} />
                </TouchableOpacity>
            </SafeAreaView>

            <Tab.Navigator initialRouteName='Pending' screenOptions={{
                tabBarActiveTintColor: COLORS.white,
                tabBarIndicatorStyle: { backgroundColor: COLORS.voilet, width: '33.34%', height: '100%' },
                tabBarIndicatorContainerStyle: { backgroundColor: COLORS.voilet, opacity: 0.8 },
                tabBarAndroidRipple: { borderless: false },
            }}>
                <Tab.Screen name="Approved" children={() => <Approved flag={flag} notificationCat={notificationCat} navigation={props.navigation} />} />
                <Tab.Screen name="Pending" children={() => <Pending flag={flag} notificationCat={notificationCat} navigation={props.navigation} />} />
                <Tab.Screen name="Rejected" children={() => <Rejected flag={flag} notificationCat={notificationCat} navigation={props.navigation} />} />
            </Tab.Navigator>

            {/* Bottom Up Modal to display filter options */}
            {isVisible && (
                <BottomUpModal
                    isVisible={isVisible}
                    onClose={() => {
                        setSelectedOption('')
                        setIsVisible(false);
                    }}
                    visibleHeight={270}>
                    {renderFilterModal()}
                </BottomUpModal>
            )}
            {/* {console.warn(notificationCat)} */}
        </>
    )
}

const styles = StyleSheet.create({
    filterCatBtn: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 12,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    filterCatTxt: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.darkGray,
        textAlign: 'center',
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
    submitBtn: {
        backgroundColor: COLORS.voilet,
        height: 50,
        width: '48%',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
    }
})

export default EmployeeActionsTab