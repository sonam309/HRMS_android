import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import New_hiring from '../../screens/Employee_pages/Hiring_screens/New_hiring';
import Interview_status from '../../screens/Employee_pages/Hiring_screens/Interview_status';
import COLORS from '../../constants/theme';
import { DrawerActions } from '@react-navigation/native';
import { Text, SafeAreaView, TouchableOpacity, StyleSheet, View, Pressable } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomUpModal from '../../components/BottomUpModal';

const Tab = createMaterialTopTabNavigator();

const CreateHiringTab = (props) => {
    const { navigation } = props
    const [isVisible, setIsVisible] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
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

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 12, flexWrap: 'wrap' }}>

                            <Pressable onPress={() => setSelectedOption('Pending')} style={[styles.filterCatBtn, { borderColor: selectedOption === 'Pending' ? COLORS.voilet : 'gray', borderWidth: selectedOption === 'Pending' ? 2 : 1.2, },]}>
                                <Text style={[styles.filterCatTxt, { color: selectedOption === 'Pending' ? COLORS.darkerGrey : COLORS.darkGray2, fontWeight: selectedOption === 'Pending' ? '600' : '500', },]}> Pending </Text>
                            </Pressable>

                            <Pressable onPress={() => setSelectedOption('Cancelled')} style={[styles.filterCatBtn, { borderColor: selectedOption === 'Cancelled' ? COLORS.voilet : 'gray', borderWidth: selectedOption === 'Cancelled' ? 2 : 1.2, },]}>
                                <Text style={[styles.filterCatTxt, { color: selectedOption === 'Cancelled' ? COLORS.darkGray : COLORS.darkGray2, fontWeight: selectedOption === 'Cancelled' ? '600' : '500', },]}> Cancelled </Text>
                            </Pressable>

                            <Pressable onPress={() => setSelectedOption('Draft')} style={[styles.filterCatBtn, { borderColor: selectedOption === 'Draft' ? COLORS.voilet : 'gray', borderWidth: selectedOption === 'Draft' ? 2 : 1.2, },
                            ]}>
                                <Text style={[styles.filterCatTxt, { color: selectedOption === 'Draft' ? COLORS.darkGray : COLORS.darkGray2, fontWeight: selectedOption === 'Draft' ? '600' : '500', },]}> Draft </Text>
                            </Pressable>

                            <Pressable onPress={() => setSelectedOption('Filled')} style={[styles.filterCatBtn, { borderColor: selectedOption === 'Filled' ? COLORS.voilet : 'gray', borderWidth: selectedOption === 'Filled' ? 2 : 1.2, },
                            ]}>
                                <Text style={[styles.filterCatTxt, { color: selectedOption === 'Filled' ? COLORS.darkGray : COLORS.darkGray2, fontWeight: selectedOption === 'Filled' ? '600' : '500', },]}> Filled </Text>
                            </Pressable>

                            <Pressable onPress={() => setSelectedOption('On Hold')} style={[styles.filterCatBtn, { borderColor: selectedOption === 'On Hold' ? COLORS.voilet : 'gray', borderWidth: selectedOption === 'On Hold' ? 2 : 1.2, },
                            ]}>
                                <Text style={[styles.filterCatTxt, { color: selectedOption === 'On Hold' ? COLORS.darkGray : COLORS.darkGray2, fontWeight: selectedOption === 'On Hold' ? '600' : '500', },]}> On Hold </Text>
                            </Pressable>

                            <Pressable onPress={() => setSelectedOption('Open')} style={[styles.filterCatBtn, { borderColor: selectedOption === 'Open' ? COLORS.voilet : 'gray', borderWidth: selectedOption === 'Open' ? 2 : 1.2, },
                            ]}>
                                <Text style={[styles.filterCatTxt, { color: selectedOption === 'On Hold' ? COLORS.darkGray : COLORS.darkGray2, fontWeight: selectedOption === 'Open' ? '600' : '500', },]}> Open </Text>
                            </Pressable>

                            <Pressable onPress={() => setSelectedOption('Rejected')} style={[styles.filterCatBtn, { borderColor: selectedOption === 'Rejected' ? COLORS.voilet : 'gray', borderWidth: selectedOption === 'Rejected' ? 2 : 1.2, },
                            ]}>
                                <Text style={[styles.filterCatTxt, { color: selectedOption === 'On Hold' ? COLORS.darkGray : COLORS.darkGray2, fontWeight: selectedOption === 'Rejected' ? '600' : '500', },]}> Rejected </Text>
                            </Pressable>

                        </View>

                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => setSelectedOption(null)} style={[styles.submitBtn, { backgroundColor: COLORS.transparentViolet }]}>
                        <Text style={{ color: COLORS.voilet, fontSize: 16, }}> RESET </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsVisible(false)} style={[styles.Elevation, styles.submitBtn, { backgroundColor: COLORS.voilet }]}>
                        <Text style={{ color: COLORS.white, fontSize: 16, }}> APPLY </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    return (
        <>
            <SafeAreaView style={{ height: 50, flexDirection: 'row', alignItems: 'center' }}>

                <TouchableOpacity style={{ paddingHorizontal: 14 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Icons name='reorder-horizontal' color="black" size={25} />
                </TouchableOpacity>

                <Text style={{ color: 'black', fontSize: 18, fontWeight: 500 }}>Hiring</Text>

                <TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={() => setIsVisible(true)}>
                    <Icons name='filter-outline' color="black" size={30} />
                </TouchableOpacity>

            </SafeAreaView>

            <Tab.Navigator initialRouteName='New_hiring'
                screenOptions={{
                    tabBarActiveTintColor: COLORS.orange1,
                    tabBarIndicatorStyle: { backgroundColor: COLORS.green,height:3  }, // styling of selected indicator
                    // tabBarIndicatorContainerStyle: { backgroundColor: COLORS.voilet, opacity: 0.8 },
                    // tabBarAndroidRipple: { borderless: false }, // ripple effect on pressing the button
                }}
                >

                <Tab.Screen name="New_hiring" children={() => <New_hiring selectedOption={selectedOption} navigation={props.navigation} />} />
                <Tab.Screen name="Interview_status" children={() => <Interview_status selectedOption={null} navigation={props.navigation} />} />

            </Tab.Navigator>
            {isVisible && (
                <BottomUpModal
                    isVisible={isVisible}
                    onClose={() => {
                        setSelectedOption('')
                        setIsVisible(false);
                    }}
                    visibleHeight={350}>
                    {renderFilterModal()}
                </BottomUpModal>
            )}
        </>
    )

}

const styles = StyleSheet.create({
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
    filterCatTxt: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.darkGray,
        textAlign: 'center',
    },
    submitBtn: {
        backgroundColor: COLORS.voilet,
        height: 50,
        width: '48%',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
    },
    filterCatBtn: {
        width: '30%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 12,
        margin: 5,
        alignItems: 'center',
    },
})

export default CreateHiringTab