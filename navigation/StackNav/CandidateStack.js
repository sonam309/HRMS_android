import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CandidateDashboard from '../../screens/Candidate_pages/CandidateDashboard';
import Candidate_profile from '../../screens/Candidate_pages/Profile/Candidate_profile';
import Candidate_Document from '../../screens/Candidate_pages/Document/Candidate_Document';
import Offer_Letter from '../../screens/Candidate_pages/Offer_Letter';
import Status_view_page from '../../screens/Candidate_pages/Status_view_page';
import View_Doc from '../../screens/Candidate_pages/Document/View_Doc';
import PendigEsignList from '../../screens/Candidate_pages/ProceedEsign/Pending_Esign_list';
import ProceedforEsign from '../../screens/Candidate_pages/ProceedEsign/Proceed_for_Esign';
import View_Esign_stamp from '../../screens/Candidate_pages/ProceedEsign/View_Esign_stamp';
import TestScreen from '../../screens/Candidate_pages/QcTestScreens/TestScreen';
import TestResult from '../../screens/Candidate_pages/QcTestScreens/TestResult';


const Stack = createNativeStackNavigator();

const CandidateStack = () => {
    return (
        <Stack.Navigator initialRouteName='CandidateDashboard' >
            <Stack.Screen name='CandidateDashboard' options={{ headerShown: false, orientation:'portrait' }} component={CandidateDashboard} />
            <Stack.Screen name='Candidate profile' options={{ orientation: 'portrait' }} component={Candidate_profile} />
            <Stack.Screen name='Candidate_Document' options={{ orientation: 'portrait', headerShown: false }} component={Candidate_Document} />
            <Stack.Screen name='Offer Letter' options={{ orientation: 'portrait' }} component={Offer_Letter} />
            <Stack.Screen name='Status view page' options={{ orientation: 'portrait' }} component={Status_view_page} />
            <Stack.Screen name='View_Doc' options={{ orientation: 'portrait' }} component={View_Doc} />
            <Stack.Screen name='Pending_Esign_list' options={{headerShown:false, orientation: 'portrait' }} component={PendigEsignList} />
            <Stack.Screen name='Proceed_for_Esign' options={{headerShown:false, orientation: 'portrait' }} component={ProceedforEsign} />
            <Stack.Screen name='viewEsignStamp' options={{headerShown:false, orientation: 'portrait' }} component={View_Esign_stamp} />
            <Stack.Screen name='TestScreen' options={{headerShown:false, orientation: 'portrait' }} component={TestScreen} />
            <Stack.Screen name='TestResult' options={{headerShown:false, orientation: 'portrait' }} component={TestResult} />
                      
        </Stack.Navigator>
    )
}

export default CandidateStack