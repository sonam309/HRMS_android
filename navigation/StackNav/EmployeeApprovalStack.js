import React from 'react'
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Approval_actions from '../../screens/Employee_pages/Approval_screens/Approval_actions';
import EmployeeActionsTab from '../TabNav/EmployeeActionsTab';
import Details from '../../screens/Employee_pages/Approval_screens/Details/Details';
import Description_Job from '../../screens/Employee_pages/Approval_screens/Description_Job';

const Stack = createNativeStackNavigator();

const EmployeeApprovalNav = (props) => {
  // const {flag} = props.route.params
  return (
    <Stack.Navigator initialRouteName='Approval_actions' >

      <Stack.Screen name='Approval_actions' options={{ orientation: 'portrait', gestureEnabled: false, headerShown: false, headerLeft: () => <></>, }} component={Approval_actions} />
      <Stack.Screen name='EmployeeActionsTab' options={{ orientation: 'portrait', gestureEnabled: false, headerShown: false, headerLeft: () => <></> }} component={EmployeeActionsTab}  />
      <Stack.Screen name='Details' options={{ orientation: 'portrait' }} component={Details} />
      <Stack.Screen name='Job Desc' options={{ orientation: 'portrait' }} component={Description_Job} />

    </Stack.Navigator>
  )
}

export default EmployeeApprovalNav