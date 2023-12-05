import 'react-native-gesture-handler';
import React from 'react';
import Entry_page from '../../screens/Common/Entry_Page';
import Otp_Verification from '../../screens/Common/Otp_Verification';
import ForgetPassword from '../../screens/Common/ForgetPassword';
import QuickPin from '../../screens/Common/QuickPin';
import CreateMpin from '../../screens/Common/CreateMpin';
import {createStackNavigator} from '@react-navigation/stack';
import EmployeeStackNav from './EmployeeStackNav/EmployeeStackNav';
import CandidateStackNav from './CandidateStackNav/CandidateStackNav';
const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Entry_page} />
      <Stack.Screen name="Otp_Verification" component={Otp_Verification} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="QuickPin" component={QuickPin} />
      <Stack.Screen name="CreateMpin" component={CreateMpin} />
      <Stack.Screen name="EmployeeTab" component={EmployeeStackNav} />
      <Stack.Screen name="CandidateTab" component={CandidateStackNav} />


    </Stack.Navigator>
  );
};

export default AuthNavigator;
