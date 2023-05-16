import React from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './src/component/pages/Login';
import Employee_Login from './src/component/pages/Employee_Login';
const App = () => {

  return (
    <View style={styles.container}>
      {/* <Login /> */}
      <Employee_Login/>
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