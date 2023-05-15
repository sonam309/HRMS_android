import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View, Image
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

const App = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [showVisibility, setShowVisibility] = useState(null);

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };
  const changeVisibility = () => {
    setShowVisibility(!showVisibility)
  }

  return (
    <View style={styles.container}>

      {/* Company Logo */}
      <Image source={require('./src/component/images/company_logo.jpg')} style={{ marginTop: 60, width: '100%', height: 120 }} />

      {/* user credentials */}
      <Text style={{ marginRight: 25, marginLeft: 25, marginBottom: 8, fontWeight: 'bold', color: 'grey' }}>Candidate Login</Text>

      {/* Username */}
      <View style={styles.textInputBox}>
        <FontAwesome5 name='user-alt' color='orange' size={17} style={{ marginRight: 10, marginLeft: 10 }} />
        <TextInput placeholder='Username' placeholderTextColor='#999384' />
      </View>

      {/* Password */}
      <View style={styles.textInputBox}>
        <Feather name='lock' color='orange' size={17} style={{ marginRight: 10, marginLeft: 10 }} />
        <TextInput placeholder='Password' secureTextEntry={showVisibility} placeholderTextColor='#999384' />
        <AntDesign name='eye' onPress={changeVisibility} style={{ position: 'absolute', right: 0, marginRight: 9 }} size={22} />
      </View>

      {/* Login Options */}
      <View style={styles.loginOption}>

      {/* Quick Pin option */}
        <View style={{ alignItems: 'center' }}>
          <Image source={require('./src/component/images/Pinlock.png')} style={{ width: 60, height: 60 }} />
          <Text style={{ color: 'darkblue' }}>Quick Pin</Text>
        </View>

        {/* Remember me option */}
        <View>
          <RadioButton.Group onValueChange={handleValueChange}
            value={selectedValue}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value='rememberMe' /><Text>Remember Me</Text>
            </View>
          </RadioButton.Group>
        </View>

      </View>

      {/* Log In Button */}
      <TouchableOpacity style={styles.loginButton}>
        <AntDesign name='poweroff' color='white' size={20} />
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <Text style={styles.forgotPassword}>Forgot Password?</Text>

      {/* Sign up */}
      <Text style={{ fontWeight: 'bold', textAlign: 'center' }} >Don't Have an account <Text style={{ color: 'orange', fontWeight: 'bold' }}>Sign Up?</Text> </Text>

      {/* Bottom element */}
      <Text style={styles.bottomElement}>Version: <Text style={{ color: 'orange', fontWeight: '900' }}>2.2</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  loginOption: {
    marginLeft: 25,
    marginRight: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16
  },
  textInputBox: {
    marginLeft: 25,
    marginRight: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7
  },
  forgotPassword: {
    marginLeft: 25,
    marginRight: 25,
    color: 'orange',
    fontSize: 15,
    textAlign: 'center',
    margin: 20
  },
  loginButton: {
    marginLeft: 25,
    marginRight: 25,
    flexDirection: 'row',
    marginTop: 40,
    height: 60,
    backgroundColor: '#72c26b',
    borderRadius: 35,
    justifyContent: 'center', // Aligns content vertically
    alignItems: 'center',
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  loginButtonText: {
    marginLeft: 25,
    marginRight: 25,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 11
  },
  bottomElement: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'grey',
    fontSize: 15
  }
})

export default App;