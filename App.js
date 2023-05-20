import React from 'react';
import Login from './src/component/pages/Login';
import Employee_Login from './src/component/pages/Employee_Login';
import Entry_page from './src/component/pages/Entry_Page';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>

        <Stack.Screen name='Home' options={{
          gestureEnabled: false, headerShown: false, headerLeft: () => <></>,
        }} component={Entry_page} />
        <Stack.Screen name='Employee' options={{ orientation: 'portrait',
          gestureEnabled: false, headerShown: false, headerLeft: () => <></>,
        }} component={Employee_Login} />
        <Stack.Screen name='Candidate' options={{orientation: 'portrait',
          gestureEnabled: false, headerShown: false, headerLeft: () => <></>,
        }} component={Login} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;