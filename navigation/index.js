import {View, Text} from 'react-native';
import React, {createRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './StackNav/AuthNavigator';

const Navigation = () => {
  return (
    <NavigationContainer ref={createRef()}>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
