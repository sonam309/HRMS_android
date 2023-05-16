import React from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './src/component/pages/Login';
const App = () => {

  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    // backgroundColor: 'white'
  }
})

export default App;