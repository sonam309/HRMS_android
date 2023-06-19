import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import New_hiring from '../../screens/Employee_pages/Hiring_screens/New_hiring';
import Interview_status from '../../screens/Employee_pages/Hiring_screens/Interview_status';
import COLORS from '../../constants/theme';
import { DrawerActions } from '@react-navigation/native';
import { Text,SafeAreaView, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createMaterialTopTabNavigator();

const CreateHiringTab = (props) => {
    const {navigation} = props
    return (
        <>
            <SafeAreaView style={{ height: 50, flexDirection: 'row', alignItems: 'center' }}>

                <TouchableOpacity style={{ paddingHorizontal: 14 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Icons name='reorder-horizontal' color="black" size={25} />
                </TouchableOpacity>

                <Text style={{ color: 'black', fontSize: 18, fontWeight:500 }}>Hiring</Text>

            </SafeAreaView>

            <Tab.Navigator initialRouteName='New_hiring'
                screenOptions={{
                    tabBarActiveTintColor: COLORS.white,
                    tabBarIndicatorStyle: { backgroundColor: COLORS.voilet, width: '50%', height: '100%' }, // styling of selected indicator
                    tabBarIndicatorContainerStyle: { backgroundColor: COLORS.voilet, opacity: 0.8 },
                    tabBarAndroidRipple: { borderless: false }, // ripple effect on pressing the button
                }}>
                <Tab.Screen name="New_hiring" component={New_hiring} options={{ tabBarLabel: 'Job Openings' }} />
                <Tab.Screen name="Interview_status" component={Interview_status} options={{ tabBarLabel: 'Interviews' }}
                />
            </Tab.Navigator>
        </>
    )

}

export default CreateHiringTab