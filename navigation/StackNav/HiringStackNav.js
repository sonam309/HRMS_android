import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import New_hiring from '../../screens/Employee_pages/Hiring_screens/New_hiring';
import CreateNewJobOpening from '../../screens/Employee_pages/Hiring_screens/CreateNewJobOpening';
import CreateHiringTab from '../TabNav/CreateHiringTab';

const Stack = createNativeStackNavigator();

const HiringStackNav = () => {
    return (
        <Stack.Navigator initialRouteName='Hiring_page' >

            <Stack.Screen name='Hiring_page' options={{ orientation: 'portrait', gestureEnabled: false, headerShown: false, headerLeft: () => <></>, }} component={CreateHiringTab} />
            <Stack.Screen name='CreateNewJobOpening' options={{ orientation: 'portrait', gestureEnabled: false, headerShown: false, headerLeft: () => <></>, }} component={CreateNewJobOpening} />
        </Stack.Navigator>
    )

}

export default HiringStackNav