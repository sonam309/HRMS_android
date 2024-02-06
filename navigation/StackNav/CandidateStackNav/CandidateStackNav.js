import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CandidateDashboard from '../../../screens/Candidate_pages/CandidateDashboard';
import Login from '../../../screens/Candidate_pages/Auth/Login';
import {useSelector} from 'react-redux';
import Candidate_profile from '../../../screens/Candidate_pages/Profile/Candidate_profile';
import Candidate_Document from '../../../screens/Candidate_pages/Document/Candidate_Document';
import Offer_Letter from '../../../screens/Candidate_pages/Offer_Letter';
import Status_view_page from '../../../screens/Candidate_pages/Status_view_page';
import View_Doc from '../../../screens/Candidate_pages/Document/View_Doc';
import Proceed_for_Esign from '../../../screens/Candidate_pages/ProceedEsign/Proceed_for_Esign';
import View_Esign_stamp from '../../../screens/Candidate_pages/ProceedEsign/View_Esign_stamp';
import TestScreen from '../../../screens/Candidate_pages/QcTestScreens/TestScreen';
import TestResult from '../../../screens/Candidate_pages/QcTestScreens/TestResult';
import PendigEsignList from '../../../screens/Candidate_pages/ProceedEsign/Pending_Esign_list';
import Signup from '../../../screens/Candidate_pages/Auth/Signup';
import QRScanner from '../../../screens/Candidate_pages/Auth/QRScanner';
const Stack = createStackNavigator();

const CandidateStackNav = () => {
  const {candidateAuthenticated} = useSelector(state => state.candidateAuth);

  return (
    <Stack.Navigator
      initialRouteName="CandidateLogin"
      screenOptions={{headerShown: false}}>
      {!candidateAuthenticated ? (
          <Stack.Group
          initialRouteName="CandidateLogin"
          screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="CandidateLogin"
          // options={{orientation: 'portrait'}}
          component={Login}
        />
           <Stack.Screen
          name="QRScanner"
          // options={{orientation: 'portrait'}}
          component={QRScanner}
        />
         <Stack.Screen
          name="CanidateSignup"
          // options={{orientation: 'portrait'}}
          component={Signup}
        />
        </Stack.Group>
      ) : (
        <Stack.Group
          initialRouteName="CandidateDashboard"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="CandidateDashboard"
            // options={{orientation: 'portrait'}}
            component={CandidateDashboard}
          />
          <Stack.Screen
            name="Candidate profile"
            component={Candidate_profile}
          />
          <Stack.Screen
            name="Candidate_Document"
            component={Candidate_Document}
          />
          <Stack.Screen name="Offer Letter" component={Offer_Letter} />
          <Stack.Screen name="Status view page" component={Status_view_page} />
          <Stack.Screen name="View_Doc" component={View_Doc} />
          <Stack.Screen name="Pending_Esign_list" component={PendigEsignList} />
          <Stack.Screen
            name="Proceed_for_Esign"
            component={Proceed_for_Esign}
          />
          <Stack.Screen name="viewEsignStamp" component={View_Esign_stamp} />
          <Stack.Screen name="TestScreen" component={TestScreen} />
          <Stack.Screen name="TestResult" component={TestResult} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default CandidateStackNav;
