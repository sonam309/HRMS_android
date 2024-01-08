import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Pressable,
  Linking,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {
  Pinlock,
  company_icon,
  company_logo,
  company_logo_2,
  employeeLoginBanner,
} from '../../../assets';
import Geolocation from '../../../functions/Geolocation';
import Loader from '../../../components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../../../redux/authSlice';
import {API, VERSIONS} from '../../../utility/services';
import CustomInput from '../../../components/CustomInput';
import TextButton from '../../../components/TextButton';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../../../components/FormInput';
import {COLORS, FONTS, SIZES, icons} from '../../../constants';

const Employee_Login = props => {
  const [showVisibility, setShowVisibility] = useState(true);
  // const [userId, setUserId] = useState('17321');
  // const [password, setPassword] = useState('Test@123');
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [greaterVersion, setGreaterVersion] = useState(false);
  const [openVersionModal, setOpenVersionModal] = useState(true);
  const [newApkVersion, setNewApkVersion] = useState('');
  const dispatch = useDispatch();

  const userInfo = {
    userId: '17321',
    password: 'Test@123',
  };

  const validationSchema = Yup.object({
    userId: Yup.string()
      .trim()
      .required('UserId is required')
      .matches(/^[a-zA-Z0-9]+$/, 'Invalid user id'),
    password: Yup.string()
      .trim()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
  });

  const {loading} = useSelector(state => state.punchDetail);

  const getCurrentLocation = async val => {
    Geolocation({val, userId: userInfo.userId, password: userInfo.password});
  };
  // preventing going to entry page
  const navigation = useNavigation();

  useEffect(() => {
    const preventBack = navigation.addListener('beforeRemove', event => {
      event.preventDefault();
    });
    return preventBack;
  }, [navigation]);

  // displaying password
  const changeVisibility = () => {
    setShowVisibility(!showVisibility);
  };
  // logging in function
  const submit = values => {
    console.log(values);
    try {
      const userData = {
        loginId: values.userId,
        password: values.password,
        oprFlag: 'L',
      };
      setLoaderVisible(true);
      // console.log(userData);
      axios.post(`${API}/api/User/login`, userData).then(response => {
        const returnedData = response?.data?.Result[0];
        console.log('resposne', returnedData);

        let result = response?.data?.Result.map(a => a.FLAG);
        let userId = returnedData.USER_ID;
        let userName = returnedData.FIRST_NAME;
        let userDeptId = returnedData.DEPT_ID;
        let userDept = returnedData.DEPT_NAME;
        let userEmail = returnedData.EMAIL_ID;
        // console.log("returnedData", returnedData);
        setLoaderVisible(false);

        if (result[0] === 'S') {
          if (returnedData?.SATHI_VERSION > VERSIONS?.android) {
            setGreaterVersion(true);
            console.log(returnedData?.SATHI_VERSION);
            setNewApkVersion(returnedData?.SATHI_VERSION);
          } else {
            dispatch(
              authActions.logIn({
                userId,
                userName,
                userDeptId,
                userDept,
                userEmail,
                userPassword: values.password,
                authenticated: true,
              }),
            );
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'Please enter correct credentials',
          });
        }
        // setUserId('');
        // setPassword('');
      });
    } catch (error) {
      setLoaderVisible(false);
    }
  };

  const clickQuickPin = () => {
    if (userId != '') {
      props.navigation.navigate('QuickPin');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please enter User Name',
      });
    }
  };

  //Random Number
  const RandomNumber = length => {
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1),
    );
  };

  const forgetPasswordApi = userId => {
    try {
      setLoaderVisible(true);
      let otp = RandomNumber('6');
      // console.log("emplogin", userId + "  " + otp);
      axios
        .get(`${API}/api/GetMobileNo`, {
          params: {
            loginId: userId,
            operFlag: 'E',
            message:
              otp + ' Is the OTP for your mobile verfication on Satya One.',
          },
        })
        .then(response => {
          const returnedData = response.data.Result;
          setLoaderVisible(false);
          // console.log(returnedData);
          let result = returnedData.map(a => a.FLAG);
          let contact = returnedData.map(b => b.MSG.trim());

          result[0] === 'S'
            ? props.navigation.navigate('Otp_Verification', {
                contact,
                otp,
                userId,
              })
            : Toast.show({
                type: 'error',
                text1: contact,
              });
        });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });
      setLoaderVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" /> */}
      <Loader loaderVisible={loaderVisible} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'position'}
        contentContainerStyle={{
          flex: 1,
        }}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 0.5,
          }}>
          {/* Company Logo */}
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginHorizontal: SIZES.base,
              marginTop: SIZES.base,
              gap: SIZES.radius,
            }}>
            <Image
              source={company_icon}
              style={{
                width: 45,
                height: 45,
                resizeMode: 'center',
              }}
            />
            <Text
              style={{
                color: COLORS.orange1,
                ...FONTS.h3,
                fontSize: 20,
              }}>
              Satya Sathi
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={employeeLoginBanner}
              style={{
                height: 220,
                width: responsiveWidth(100),
              }}
              resizeMode="stretch"
            />
          </View>
        </View>

        <View
          style={{
            flex: 0.8,
            justifyContent: 'center',
          }}>
          <Formik
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={(values, formikActions, touched, isValid) => {
              // onLogin(values, formikActions, touched, isValid);
              submit(values, formikActions, touched, isValid);
            }}>
            {({
              values,
              errors,
              handleChange,
              touched,
              handleBlur,
              handleSubmit,
              isValid,
              dirty,
              isSubmitting,
            }) => {
              const {userId, password} = values;
              return (
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 25,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.header}>
                    Employee Login {Platform.systemName}
                  </Text>
                  {/* user credentials -username */}
                  <View style={[styles.textInputBox]}>
                    {/* <CustomInput
                  placeholder={'User Id'}
                  caption={`User ID ${JSON.stringify(errors.userId)}`}
                  // value={}
                  required
                  // onChangeText={id => (
                  //   // setUserId(id),
                  //   userInfo = {...userInfo,userId: id},
                  //   dispatch(
                  //     authActions.logIn({userId: id, userPassword: password}),
                  //   )
                  // )}
                  onChange={handleChange("userId")}
                /> */}
                    <FormInput
                      label="User Id"
                      placeholder={'User Id'}
                      // keyboardType="email-address"
                      // autoCompleteType="email"
                      onChange={handleChange('userId')}
                      errorMsg={errors.userId}
                      onBlur={handleBlur('userId')}
                      labelColor={COLORS.black}
                      appendComponent={
                        <View
                          style={{
                            justifyContent: 'center',
                          }}>
                          <Image
                            source={
                              userId == '' ||
                              (userId != '' && errors.userId == null)
                                ? icons.correct
                                : icons.cross
                            }
                            style={{
                              height: 20,
                              width: 20,
                              tintColor:
                                userId == ''
                                  ? COLORS.gray
                                  : userId != '' && errors.userId == null
                                  ? COLORS.green
                                  : COLORS.red,
                            }}
                          />
                        </View>
                      }
                      value={values.userId}
                    />
                  </View>
                  {/* Password */}
                  <View style={[styles.textInputBox]}>
                    {/* <CustomInput
                  placeholder={'Password'}
                  caption={'Password'}
                  value={password}
                  onChangeText={security => setPassword(security)}
                  required
                  secureTextEntry={showVisibility}
                  isPasswordInput
                  textInputStyle={{
                    width: responsiveWidth(70),
                  }}
                  icon={
                    <Pressable onPress={changeVisibility}>
                      <AntDesign name="eye" size={22} />
                    </Pressable>
                  }
                /> */}
                    <FormInput
                      label="Password"
                      placeholder={'Password'}
                      autoCompleteType="password"
                      secureTextEntry={showVisibility}
                      onChange={handleChange('password')}
                      errorMsg={errors.password}
                      onBlur={handleBlur('password')}
                      labelColor={COLORS.black}
                      value={values.password}
                      appendComponent={
                        <TouchableOpacity
                          style={{
                            width: 40,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                          }}
                          onPress={() => setShowVisibility(!showVisibility)}>
                          <Image
                            source={
                              showVisibility ? icons.eye_close : icons.eye
                            }
                            style={{
                              height: 20,
                              width: 20,
                              tintColor: COLORS.gray,
                            }}
                          />
                        </TouchableOpacity>
                      }
                    />
                  </View>
                  {/* Quick Pin Option */}
                  {/* <View style={styles.loginOption}>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image source={Pinlock} style={{ width: 28, height: 28, }} />
                        <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>Quick Pin</Text>
                    </TouchableOpacity>
                </View> */}
                  <TextButton
                    color1={COLORS.green}
                    color2={'#9ADD00'}
                    linearGradientStyle={{
                      marginTop: SIZES.font,
                      marginBottom: SIZES.radius,
                      borderRadius: SIZES.base,
                    }}
                    buttonContainerStyle={{
                      width: responsiveWidth(90),
                      height: 45,
                    }}
                    label={'Log In'}
                    labelStyle={{color: COLORS.white}}
                    onPress={handleSubmit}
                  />
                  {/* Punching Option */}
                  <View style={styles.punchArea}>
                    <TouchableOpacity
                      onPress={() => getCurrentLocation('I')}
                      style={[
                        styles.punchButton,
                        styles.elevation,
                        {backgroundColor: '#D5F5E3'},
                      ]}>
                      <Text
                        style={[
                          styles.loginButtonText,
                          {color: COLORS.darkGreen},
                        ]}>
                        {loading ? 'loading...' : 'Punch In'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => getCurrentLocation('O')}
                      style={[
                        styles.punchButton,
                        styles.elevation,
                        {backgroundColor: '#FAE5D3'},
                      ]}>
                      <Text
                        style={[
                          styles.loginButtonText,
                          {color: COLORS.orange1},
                        ]}>
                        {loading ? 'loading...' : 'Punch Out'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                    }}>
                    {/* signIn for Employee */}
                    <TouchableOpacity
                      onPress={async () => {
                        props.navigation.push('CandidateTab', {
                          screen: 'CandidateLogin',
                        });
                        await AsyncStorage.setItem('type', 'candidate');
                      }}>
                      <Text
                        style={{
                          color: COLORS.hyperlinkBlue,
                          ...FONTS.h5,
                          fontSize: 14,
                          textDecorationLine: 'underline',
                        }}>
                        Sign In as Candidate
                      </Text>
                    </TouchableOpacity>
                    {/* Forgot Password */}
                    <TouchableOpacity>
                      <Text
                        style={styles.forgotPassword}
                        onPress={() =>
                          values.userId !== ''
                            ? forgetPasswordApi(values.userId)
                            : Toast.show({
                                type: 'error',
                                text1: 'Please enter User id',
                              })
                        }>
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
        {/* Bottom element */}
        <View
          style={{
            flex: 0.04,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.gray,
              ...FONTS.h5,
              fontWeight: '400',
            }}>
            Version:{VERSIONS?.android}
          </Text>
        </View>

        {greaterVersion && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={openVersionModal}
            onRequestClose={() => {
              setOpenVersionModal(!openVersionModal);
              // console.log('closeee');

              // props.navigation.navigate('Employee_Login');
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    height: '100%',
                    alignSelf: 'center',
                    width: '100%',
                    marginTop: -20,
                  }}>
                  <Image
                    source={company_logo_2}
                    style={{height: 120, width: 120, marginLeft: 60}}
                  />
                  <Text
                    style={{
                      ...FONTS.body5,
                      lineHeight: 16,
                      marginTop: -30,
                      textAlign: 'center',
                    }}>
                    You are currently using older version of this APK, update
                    now and continue.
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      ...FONTS.body5,
                      textAlign: 'center',
                      color: COLORS.lighterVoilet,
                    }}>
                    Older Version: {VERSIONS?.olderVersion}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h5,
                      textAlign: 'center',
                      color: COLORS.lighterVoilet,
                    }}>
                    New Version: {newApkVersion}
                  </Text>

                  <TextButton
                    color1={COLORS.green}
                    color2={COLORS.green}
                    linearGradientStyle={{
                      marginTop: SIZES.radius,
                      marginBottom: SIZES.radius,
                      borderRadius: 25,
                    }}
                    buttonContainerStyle={{height: 50}}
                    label={'Update'}
                    labelStyle={{color: COLORS.white, alignSelf: 'center'}}
                    onPress={() =>
                      Linking.openURL(
                        'https://play.google.com/store/apps/details?id=com.koshishapp',
                      )
                    }
                  />
                </View>
              </View>
            </View>
          </Modal>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    color: COLORS.black,
    ...FONTS.h3,
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
  },
  elevation: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7,
  },
  loginOption: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  textInputBox: {},
  forgotPassword: {
    color: COLORS.orange1,
    ...FONTS.h4,
    fontSize: 14,
  },
  punchArea: {
    flexDirection: 'row',
    marginHorizontal: 25,
    marginVertical: 12,
    justifyContent: 'space-between',
  },
  punchButton: {
    width: '45%',
    height: 40,
    borderRadius: 35,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  loginButton: {
    marginHorizontal: 25,
    flexDirection: 'row',
    marginVertical: 12,
    height: 45,
    backgroundColor: COLORS.orange,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    ...FONTS.h4,
    marginHorizontal: 5,
  },
  bottomElement: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    color: COLORS.gray,
    ...FONTS.h5,
    fontWeight: '400',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 300,
    width: responsiveWidth(80),
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Employee_Login;
