import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Regulization from '../../screens/Employee_pages/Regulization';
import Attendance from '../../screens/Employee_pages/Attendance';
import Apply_Leave from '../../screens/Employee_pages/Apply_Leave';
const Stack = createStackNavigator();

const AttendanceStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Attendance"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen name="Regulization" component={(props)=> <Regulization {...props} />} />
      <Stack.Screen name="Leave" component={Apply_Leave} />
    </Stack.Navigator>
  );
};

export default AttendanceStack;
