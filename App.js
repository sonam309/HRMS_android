import React from 'react';
import { View, StyleSheet } from 'react-native';
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

          <Stack.Screen name='Home' component={Entry_page} />
          <Stack.Screen name='Employee' component={Employee_Login} />
          <Stack.Screen name='Candidate' component={Login} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    width: '100%'
  }
})

export default App;