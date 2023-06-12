import 'react-native-gesture-handler';
import React from 'react';
import Login from '../../screens/Candidate_pages/Login';
import Employee_Login from '../../screens/Employee_pages/Employee_Login';
import Employee_page from '../../screens/Employee_pages/Employee_page';
import Entry_page from '../../screens/LoginOption/Entry_Page';
import Otp_Verification from '../../screens/LoginOption/Otp_Verification';
import ForgetPassword from '../../screens/LoginOption/ForgetPassword';
import QuickPin from '../../screens/LoginOption/QuickPin';
import CreateMpin from '../../screens/LoginOption/CreateMpin';
import Apply_Leave from '../../screens/Employee_pages/Apply_Leave';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const EntryStackNav = () => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' options={{ orientation: 'portrait' }} component={Entry_page} />
            <Stack.Screen name='Employee' options={{ orientation: 'portrait' }} component={Employee_Login} />
            <Stack.Screen name='Candidate' options={{ orientation: 'portrait' }} component={Login} />
            <Stack.Screen name='Employee_page' options={{ orientation: 'portrait' }} component={Employee_page} />
            <Stack.Screen name='Otp_Verification' options={{ orientation: 'portrait' }} component={Otp_Verification} />
            <Stack.Screen name='ForgetPassword' options={{ orientation: 'portrait' }} component={ForgetPassword} />
            <Stack.Screen name='QuickPin' options={{ orientation: 'portrait' }} component={QuickPin} />
            <Stack.Screen name='CreateMpin' options={{ orientation: 'portrait' }} component={CreateMpin} />
        </Stack.Navigator>
    )
}

export default EntryStackNav