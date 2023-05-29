import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";

const ForgetPassword = (props) => {

  const { userName, type } = props.route.params;

  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // displaying password
  const changeVisibilitynew = () => {
    setShowNewPassword(!showNewPassword)
  }

  // displaying password
  const changeVisibilityConfirm = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  {/* match password */ }

  const MatchPasswordValidation = () => {

    if (newPassword == "") {

      console.warn("Plaese Enter New Password");

    } else if (confirmPassword == "") {

      console.warn("Plaese Enter Confirm Password");

    } else if (newPassword == confirmPassword) {

      ChangePasswordApi()

    } else {

      console.warn("Missmatch Passwords");

    }

  }


  // Change PAssword in function
  const ChangePasswordApi = () => {
    const userData = {
      loginId: userName,
      password: newPassword,
      oprFlag: 'R',
    };
    axios.post('https://econnectsatya.com:7033/api/User/login', userData).then((response) => {
      const returnedData = response.data.Result;
      let result = returnedData.map(a => a.FLAG);
      result[0] === "S" ? (props.navigation.navigate("Employee")) :
        Alert.alert("Failure", "Error")
    })
  }

  return (

    <View style={styles.container}>

    
      {
        type === "N" ? 
        <Text style={styles.HeaderText}>
          New Mpin
        </Text> :
        type === "F" ? <Text style={styles.HeaderText}>Forget Mpin</Text> : <Text style={styles.HeaderText}>Forget Password</Text>
      } 

      {/* new Password */}
      <View style={[styles.textInputBox, styles.elevation]}>
        <Feather name='lock' color='orange' size={17} style={{ marginRight: 10, marginLeft: 10 }} />

        <TextInput placeholder='New Password' secureTextEntry={showNewPassword}
          autoCapitalize='none' autoCorrect={false} placeholderTextColor='#999384'
          returnKeyType="next"
          value={newPassword} onChangeText={(security) => setnewPassword(security)} />
        <AntDesign name='eye' onPress={changeVisibilitynew}
          style={{ position: 'absolute', right: 0, marginRight: 9 }} size={22} />
      </View>

      {/* Confirm Password */}
      <View style={[styles.textInputBox, styles.elevation]}>
        <Feather name='unlock' color='orange' size={17} style={{ marginRight: 10, marginLeft: 10 }} />
        <TextInput placeholder='Confirm Password' secureTextEntry={showConfirmPassword} returnKeyType="done" autoCapitalize='none' autoCorrect={false} placeholderTextColor='#999384' value={confirmPassword} onChangeText={(security) => setConfirmPassword(security)} />
        <AntDesign name='eye' onPress={changeVisibilityConfirm} style={{ position: 'absolute', right: 0, marginRight: 9 }} size={22} />
      </View>

      {/* chnage password button */}

      <TouchableOpacity
        disabled={ newPassword !== '' && confirmPassword !== '' ? false : true }
        style={[styles.changePasswordBtn, styles.elevation,
        {
          backgroundColor: newPassword !== '' && confirmPassword !== '' ? '#03a157' : "#9D9D9D"
        }
        ]} onPress={() => { MatchPasswordValidation() }} >
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: 500 }}> Change Password </Text>

      </TouchableOpacity>

      {/* enter otp msg */}
      <View style={styles.Message}>


        <Text style={{
          color: '#474E68', fontWeight: 300, fontSize: 15,
          textAlign: 'center'
        }}>
          Once the password successfully changed, you will need to login again
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    width: '100%'
  },
  elevation:{
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  textInputBox: {
    marginHorizontal: 21,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    marginTop: 30,
    marginBottom: 4,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  changePasswordBtn: {
    marginHorizontal: 25,
    flexDirection: 'row',
    marginTop: 100,
    height: 45,
    fontSize: 15,
    backgroundColor: '#03a157',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chnagePasswordBtnTxt: {
    marginHorizontal: 25,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  HeaderText: {
    width: '100%',
    fontSize: 18,
    height: 35,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#220046',
    color: 'white',
    fontWeight: '500'
  },
  Message: {
    backgroundColor: 'white',
    marginTop: 50,
    flexDirection: 'row', justifyContent: 'center',
    marginHorizontal:20
  }
})

export default ForgetPassword