import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import Employee_Login from '../../../screens/Employee_pages/Employee_Login';
import EmployeeDrawer from '../../DrawerNav/EmployeeDrawer';
import Employee_Login from '../../../screens/Employee_pages/Auth/Employee_Login';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const EmployeeStackNav = () => {

    const { authenticated } = useSelector((state)=> state.auth)

  return (
    <Stack.Navigator
      initialRouteName="EmployeeLogin"
      screenOptions={{headerShown: false}}>
      {!authenticated ? (
        <Stack.Screen
          name="EmployeeLogin"
          // options={{orientation: 'portrait'}}
          component={Employee_Login}
        />
      ) : (
        <Stack.Screen
          name="DrawerTab"
          // options={{orientation: 'portrait'}}
          component={EmployeeDrawer}
        />
      )}
    </Stack.Navigator>
  );
};

export default EmployeeStackNav;
