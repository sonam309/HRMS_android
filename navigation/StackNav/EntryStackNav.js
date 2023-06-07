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

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const EntryStackNav = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>

            <Stack.Screen name='Home' options={{ orientation: 'portrait', gestureEnabled: false, headerShown: false, headerLeft: () => <></>, }} component={Entry_page} />
            <Stack.Screen name='Employee' options={{ orientation: 'portrait', gestureEnabled: false, headerShown: false, headerLeft: () => <></>}} component={Employee_Login} />
            <Stack.Screen name='Candidate' options={{ orientation: 'portrait', gestureEnabled: false, headerShown: false, headerLeft: () => <></>, }} component={Login} />
            <Stack.Screen name='Employee_page' options={{ orientation: 'portrait', gestureEnabled: false, headerLeft: () => <></>, headerShown: false }} component={Employee_page} />
            <Stack.Screen name='Otp_Verification' options={{ orientation: 'portrait', gestureEnabled: false, headerLeft: () => <></>, headerShown: false }} component={Otp_Verification} />
            <Stack.Screen name='ForgetPassword' options={{ orientation: 'portrait', gestureEnabled: false, headerLeft: () => <></>, headerShown: false }} component={ForgetPassword} />
            <Stack.Screen name='QuickPin' options={{ orientation: 'portrait', gestureEnabled: false, headerLeft: () => <></>, headerShown: false }} component={QuickPin} />
            <Stack.Screen name='CreateMpin' options={{ orientation: 'portrait', gestureEnabled: false, headerLeft: () => <></>, headerShown: false }} component={CreateMpin} />

        </Stack.Navigator>
    )
}

export default EntryStackNav