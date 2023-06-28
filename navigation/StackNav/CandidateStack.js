import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CandidateDashboard from '../../screens/Candidate_pages/CandidateDashboard';
import Candidate_profile from '../../screens/Candidate_pages/Profile/Candidate_profile';
import Candidate_Document from '../../screens/Candidate_pages/Document/Candidate_Document';

const Stack = createNativeStackNavigator();

const CandidateStack = () => {
    return (
        <Stack.Navigator initialRouteName='Home' >
            <Stack.Screen name='CandidateDashboard' options={{ headerShown: false, orientation:'portrait' }} component={CandidateDashboard} />
            <Stack.Screen name='Candidate_profile' options={{ orientation: 'portrait' }} component={Candidate_profile} />
            <Stack.Screen name='Candidate_Document' options={{ orientation: 'portrait' }} component={Candidate_Document} />
                      
        </Stack.Navigator>
    )
}

export default CandidateStack