import 'react-native-gesture-handler';
import React from 'react';
import Login from './src/component/pages/Login';
import Employee_Login from './src/component/pages/Employee_Login';
import Employee_page from './src/component/pages/Employee_page';
import Entry_page from './src/component/pages/Entry_Page';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Otp_Verification from './src/component/pages/Otp_Verification'
import ForgetPassword from './src/component/pages/ForgetPassword';
import QuickPin from './src/component/pages/QuickPin';
import CreateMpin from './src/component/pages/CreateMpin';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>

        <Stack.Screen name='Home' options={{ orientation: 'portrait', gestureEnabled: false, headerShown: false, headerLeft: () => <></>,}} component={Entry_page} />
        <Stack.Screen name='Employee' options={{ orientation: 'portrait',gestureEnabled: false, headerShown: false, headerLeft: () => <></>,
        }} component={Employee_Login} />
        <Stack.Screen name='Candidate' options={{orientation: 'portrait', gestureEnabled: false, headerShown: false, headerLeft: () => <></>,}} component={Login} />
        <Stack.Screen name='Employee_page' options={{orientation: 'portrait', gestureEnabled: false, headerLeft: () => <></>,  headerShown: false }} component={Employee_page} />
         <Stack.Screen name='Otp_Verification' options={{ orientation: 'portrait', gestureEnabled: false, headerLeft: () => <></>, headerShown: false
        }} component={Otp_Verification} />
        <Stack.Screen name='ForgetPassword' options={{ orientation: 'portrait', gestureEnabled: false, headerLeft: () => <></>, headerShown: false }} component={ForgetPassword} />
        <Stack.Screen name='QuickPin' options={{ orientation: 'portrait', gestureEnabled: false, headerLeft: () => <></>, headerShown: false }} component={QuickPin} />
        <Stack.Screen name='CreateMpin' options={{ orientation: 'portrait', gestureEnabled: false, headerLeft: () => <></>, headerShown: false }} component={CreateMpin} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;