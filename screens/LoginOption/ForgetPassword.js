import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
import CustomPasswordInput from '../../components/CustomPasswordInput';
import { new_mpin } from '../../assets';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/theme';
import Loader from '../../components/Loader';
import { API } from '../../utility/services';
import Toast from 'react-native-toast-message';

const ForgetPassword = (props) => {

  let page = null

  const { type, userId } = props.route.params;
  // const (userId) = useSelector(state => state.auth.userId)

  const et1 = useRef(); et2 = useRef(); et3 = useRef(); et4 = useRef();
  const cet1 = useRef(); cet2 = useRef(); cet3 = useRef(); cet4 = useRef();

  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');

  const [f5, setF5] = useState('');
  const [f6, setF6] = useState('');
  const [f7, setF7] = useState('');
  const [f8, setF8] = useState('');
  const [oper, setOper] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mpin, setmpin] = useState('');
  const [URL, setURL] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);


  // displaying password
  const changeVisibilitynew = () => {
    setShowNewPassword(!showNewPassword)
  }

  // displaying password
  const changeVisibilityConfirm = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const getType = async () => {
    page = await AsyncStorage.getItem("type")
    {
      page ? (page === 'employee' ? [setURL(`${API}/api/User/login`), setOper('R')] : [setURL(`${API}/api/User/candidateLogin`), setOper('F')]) : null
      // page ? (page === 'employee' ? [setURL('https://econnectsatya.com:7033//api/User/login'), setOper('R')] : [setURL('https://econnectsatya.com:7033//api/User/candidateLogin'), setOper('F')]) : null
    }
  }

  {/* match password */ }

  const MatchPasswordValidation = () => {

    if (newPassword == "") {

      // console.warn("Plaese Enter New Password");
      Toast.show({
        type:'error',
        text1:"Plaese Enter New Password"
      })

    } else if (confirmPassword == "") {
      Toast.show({
        type:'error',
        text1:"Plaese Enter Confirm Password"
      })


      // console.warn("Plaese Enter Confirm Password");

    } else if (newPassword == confirmPassword) {

      ChangePasswordApi()

    } else {

      Toast.show({
        type:'error',
        text1:"Missmatch Passwords"
      })
      // console.warn("Missmatch Passwords");
    }
  }

  const newMpinMatchValidation = () => {
    let mpin1 = f1 + f2 + f3 + f4;
    let mpin2 = f5 + f6 + f7 + f8;
    // setmpin(mpin1);
    if (mpin1 == mpin2 && mpin1 != '1234') {

      // console.warn("hit api");
      // ChangePasswordApi()
      // reset flag=R, create mpin flag=M
      props.navigation.navigate("Employee_Login")
    } else {
      console.warn("Quick Pin and Confirm Quick Pin should be same")
    }
  }

  // Change PAssword in function
  const ChangePasswordApi = () => {
    setLoaderVisible(true);
    // console.log("forgetpass", userId)
    const userData = {
      loginId: userId,
      password: newPassword,
      oldPassword: '',
      oprFlag: oper,
    };
    // console.warn(userId);
    // console.log("requestparam", userData);
    // console.log("Url", URL);
    axios.post(URL, userData).then((response) => {
      const returnedData = response.data.Result;
      setLoaderVisible(false);
      let result = returnedData.map(a => a.FLAG);

      result[0] === "S" ? (oper === "R" ? props.navigation.navigate("Employee_Login") : props.navigation.navigate("Candidate_Login")) :
        Toast.show({
          type: 'error',
          text1: "error"
        })
    })
  }

  useEffect(() => {
    getType()
  }, [])

  return (

    <View style={styles.container}>
      <Loader loaderVisible={loaderVisible} />
      <View style={styles.Header}>
        <Text style={styles.HeaderText}> {type === "N" ? ("New Quick Pin") : (type === "F" ? "Forgot Quick Pin" : "Forgot Password")} </Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'center' }}>

        <Image source={new_mpin} style={{ width: '50%', height: '30%', marginTop: -30, alignSelf: 'center' }} />

        {
          type === "N" || type === "F" ?
            <View>

              {/* Enter Quick Pin Text */}
              <Text style={styles.enterMpinTxt}>
                Enter Quick Pin
              </Text>

              {/* Enter Quick Pin input box sk */}
              <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center' }}>

                <TextInput ref={et1} style={[styles.txtbox, { borderColor: f1.length >= 1 ? '#F99417' : '#220046' }]} keyboardType="number-pad" maxLength={1} value={f1} onChangeText={txt => {
                  setF1(txt);
                  if (txt.length >= 1) {
                    et2.current.focus();
                  }
                }} />
                <TextInput ref={et2} style={[styles.txtbox, { borderColor: f2.length >= 1 ? '#F99417' : '#220046' }]} keyboardType="number-pad" maxLength={1} value={f2} onChangeText={txt => {
                  setF2(txt)
                  if (txt.length >= 1) {
                    et3.current.focus();
                  } else if (txt.length < 1) {
                    et1.current.focus();
                  }
                }} />
                <TextInput ref={et3} style={[styles.txtbox, { borderColor: f3.length >= 1 ? '#F99417' : '#220046' }]} keyboardType="number-pad" maxLength={1} value={f3} onChangeText={txt => {
                  setF3(txt)
                  if (txt.length >= 1) {
                    et4.current.focus();
                  } else if (txt.length < 1) {

                    et2.current.focus();
                  }
                }} />
                <TextInput ref={et4} style={[styles.txtbox, { borderColor: f4.length >= 1 ? '#F99417' : '#220046' }]} keyboardType="number-pad" maxLength={1} value={f4} onChangeText={txt => {
                  setF4(txt)
                  if (txt.length >= 1) {

                  } else if (txt.length < 1) et3.current.focus();
                }} />
              </View>

              {/* Confirm Quick Pin Text */}
              <Text style={styles.confirmMpintxt}>
                Confirm Quick Pin
              </Text>

              {/* Confirm Quick Pin input box sk */}
              <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center' }}>

                <TextInput ref={cet1} style={[styles.txtbox, { borderColor: f5.length >= 1 ? '#F99417' : '#220046' }]} keyboardType="number-pad" maxLength={1} value={f5} onChangeText={txt => {
                  setF5(txt);
                  if (txt.length >= 1) {
                    cet2.current.focus();
                  }
                }} />
                <TextInput ref={cet2} style={[styles.txtbox, { borderColor: f6.length >= 1 ? '#F99417' : '#220046' }]} keyboardType="number-pad" maxLength={1} value={f6} onChangeText={txt => {
                  setF6(txt)
                  if (txt.length >= 1) {
                    cet3.current.focus();
                  } else if (txt.length < 1) {

                    cet1.current.focus();
                  }
                }} />
                <TextInput ref={cet3} style={[styles.txtbox, { borderColor: f7.length >= 1 ? '#F99417' : '#220046' }]} keyboardType="number-pad" maxLength={1} value={f7} onChangeText={txt => {
                  setF7(txt)
                  if (txt.length >= 1) {
                    cet4.current.focus();
                  } else if (txt.length < 1) {

                    cet2.current.focus();
                  }
                }} />
                <TextInput ref={cet4} style={[styles.txtbox, { borderColor: f8.length >= 1 ? '#F99417' : '#220046' }]} keyboardType="number-pad" maxLength={1} value={f8} onChangeText={txt => {
                  setF8(txt)
                  setmpin(f1 + f2 + f3 + f4);
                  if (txt.length >= 1) {

                  } else if (txt.length < 1) cet3.current.focus();
                }} />
              </View>

              {/* Submit Button sk */}
              <View style={{ marginHorizontal: 25 }}>
                <TouchableOpacity disabled={f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' && f5 !== '' && f6 !== '' && f7 !== '' && f8 !== ''
                  ? false : true} style={[styles.quickLoginBtn, styles.elevation, { backgroundColor: f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' && f5 !== '' && f6 !== '' && f7 !== '' && f8 !== '' ? '#220046' : "#9D9D9D" }]} onPress={() => { newMpinMatchValidation() }}>
                  {/* onPress={() => {validateOtp()}} */}
                  <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: 500 }}>
                    Set Quick Pin
                  </Text>
                </TouchableOpacity>
              </View>

              {/*   msg */}
              <View style={styles.Message}>
                <Text style={{ color: '#474E68', fontWeight: 300, fontSize: 15, textAlign: 'center', marginTop: 20 }}>
                  Once the Quick Pin is successfully changed, you will need to login again
                </Text>
              </View>

            </View> : <View>


              {/* new Password */}
              <View style={styles.textInputBox}>
                <Feather name='lock' color='orange' size={17} style={{ marginRight: 10, marginLeft: 10 }} />
                <CustomPasswordInput placeholder='New Password' secureTextEntry={showNewPassword} value={newPassword} onChangeText={(security) => setnewPassword(security)} />
                <AntDesign name='eye' onPress={changeVisibilitynew} style={{ position: 'absolute', right: 9 }} size={22} />
              </View>

              {/* Confirm Password */}
              <View style={[styles.textInputBox]}>
                <Feather name='unlock' color='orange' size={17} style={{ marginRight: 10, marginLeft: 10 }} />
                <CustomPasswordInput placeholder='Confirm Password' secureTextEntry={showConfirmPassword} value={confirmPassword} onChangeText={(security) => setConfirmPassword(security)} />
                <AntDesign name='eye' onPress={changeVisibilityConfirm} style={{ position: 'absolute', right: 9 }} size={22} />
              </View>

              {/* chnage password button */}

              <TouchableOpacity
                disabled={newPassword !== '' && confirmPassword !== '' ? false : true}
                style={[styles.changePasswordBtn, styles.elevation, { backgroundColor: newPassword !== '' && confirmPassword !== '' ? COLORS.green : "#9D9D9D" }]} onPress={() => { MatchPasswordValidation() }} >
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: 500 }}> Change Password </Text>
              </TouchableOpacity>

              {/*   msg */}
              <View style={styles.Message}>
                <Text style={{ color: COLORS.darkGray2, fontWeight: 400, fontSize: 15, textAlign: 'center' }}>
                  Once the password successfully changed, you will need to login again
                </Text>
              </View>

            </View>
        }

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
  elevation: {
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
    marginTop: 10,
    marginBottom: 4,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  changePasswordBtn: {
    marginHorizontal: 40,
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
  Header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.orange1,
  },
  HeaderText: {
    padding: 4,
    color: 'white',
    fontWeight: '400',
    fontSize: 20,
    height: 38
  },
  Message: {
    backgroundColor: 'white',
    marginTop: 20,
    flexDirection: 'row', justifyContent: 'center',
    marginHorizontal: 20
  },
  enterMpinTxt: {
    marginLeft: 80,
    color: "#220046",
    fontSize: 20,
    fontWeight: '450',
    width: '100%',
  },
  confirmMpintxt: {
    marginLeft: 80,
    color: "#220046",
    fontSize: 20,
    fontWeight: '450',
    width: '100%',
  },
  txtbox: {
    width: 45,
    height: 45,
    borderWidth: 1,
    marginVertical: 15,
    textAlign: 'center',
    fontWeight: '500',
    borderRadius: 10,
    marginHorizontal: 10,
    fontSize: 18
  },
  quickLoginBtn: {
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
    height: 40,
    fontSize: 15,
    backgroundColor: '#220046',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ForgetPassword