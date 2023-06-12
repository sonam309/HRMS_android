import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Approved from '../../screens/Employee_pages/Approval_screens/Approved/Approved';
import Pending from '../../screens/Employee_pages/Approval_screens/Pending/Pending';
import Rejected from '../../screens/Employee_pages/Approval_screens/Rejected/Rejected';

const Tab = createMaterialTopTabNavigator();

const EmployeeActionsTab = (props) => {
    const { flag } = props.route.params
    console.warn("Inside employee actions tab "+flag);
    return (
        <Tab.Navigator initialRouteName='Pending'>
            <Tab.Screen name="Approved" component={Approved}  initialParams={{ flag: flag }} />
            <Tab.Screen name="Pending" component={Pending} initialParams={{ flag: flag }} />
            <Tab.Screen name="Rejected" component={Rejected} initialParams={{ flag: flag }} />
        </Tab.Navigator>
    )
}

export default EmployeeActionsTab