import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateNewJobOpening from '../../screens/Employee_pages/Hiring_screens/CreateNewJobOpening';
import CreateHiringTab from '../TabNav/CreateHiringTab';
import Job_Description from '../../screens/Employee_pages/Hiring_screens/Job_Description';
import Candidate_details from '../../screens/Employee_pages/Hiring_screens/Candidate_details';
import Candidate_Resume from '../../screens/Employee_pages/Hiring_screens/Candidate_Resume';

const Stack = createNativeStackNavigator();

const HiringStackNav = () => {
    return (
        <Stack.Navigator initialRouteName='Hiring_page' >

            <Stack.Screen name='Hiring_page' options={{ orientation: 'portrait', gestureEnabled: false, headerShown: false, headerLeft: () => <></>, }} component={CreateHiringTab} />
            <Stack.Screen name='CreateNewJobOpening' options={{title:'Job Opening'}} component={CreateNewJobOpening} />
            <Stack.Screen name='Job_Description' options={{title:'Job Opening'}} component={Job_Description} />
            <Stack.Screen name='Candidate_details' options={{title:'Candidate Feedback'}} component={Candidate_details} />
            <Stack.Screen name='Candidate_Resume' options={{title:'Job Opening'}} component={Candidate_Resume} />
        </Stack.Navigator>
    )

}

export default HiringStackNav