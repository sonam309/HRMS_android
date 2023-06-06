import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import EntryStackNav from './navigation/StackNav/EntryStackNav';

const App = () => {

  return (
    <NavigationContainer>
      <EntryStackNav />
    </NavigationContainer>
  );
}

export default App;