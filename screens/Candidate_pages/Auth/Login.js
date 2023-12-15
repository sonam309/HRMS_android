import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Pressable,
  Modal,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {
  Pinlock,
  company_logo_2,
  loginIcon,
  company_logo,
  company_icon,
  profileIC,
} from '../../../assets';
import {useDispatch} from 'react-redux';
import Loader from '../../../components/Loader';
import {candidateAuthActions} from '../../../redux/candidateAuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API, VERSIONS} from '../../../utility/services';
import {loginBanner} from '../../../assets';
import CustomInput from '../../../components/CustomInput';
import TextButton from '../../../components/TextButton';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../../../components/FormInput';

const Login = props => {
  let page = null;
  const [showVisibility, setShowVisibility] = useState(true);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);
  const dispatch = useDispatch();
  const [operFlag, setOperFlag] = useState('');
  const [loginResponse, setLoginResponse] = useState('');
  const [greaterVersion, setGreaterVersion] = useState(false);
  const [openVersionModal, setOpenVersionModal] = useState(true);
  const [newApkVersion, setNewApkVersion] = useState('');

  const userInfo = {
    userId: '',
    password: '',
  };

  const validationSchema = Yup.object({
    userId: Yup.string()
      .trim()
      .required('CandidateId is required')
      .matches(/^[a-zA-Z0-9]+$/, 'Invalid candidate id'),

    password: Yup.string().trim().required('Password is required'),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    // ),
  });

  const getType = async () => {
    page = await AsyncStorage.getItem('type');
    {
      page ? (page === 'employee' ? setOperFlag('E') : setOperFlag('A')) : null;
    }
  };

  const userData = {
    loginId: userId,
    password: password,
    oprFlag: 'L',
    oldPassword: '',
  };

  //Random Number
  const RandomNumber = length => {
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1),
    );
  };

  // preventing going to entry page
  const navigation = useNavigation();
  useEffect(() => {
    getType();
    const preventBack = navigation.addListener('beforeRemove', event => {
      event.preventDefault();
    });
    return preventBack;
  }, [navigation]);

  // displaying password
  const changeVisibility = () => {
    setShowVisibility(!showVisibility);
  };

  // forgetpassword
  const forgetPasswordApi = userId => {
    setLoaderVisible(true);
    let otp = RandomNumber('6');
    console.log('msg', otp + ' $ ' + userId + operFlag);
    axios
      .get(`${API}/api/GetMobileNo`, {
        params: {
          loginId: userId,
          operFlag: operFlag,
          message:
            otp + ' Is the OTP for your mobile verfication on Satya Sathi.',
        },
      })
      .then(response => {
        const returnedData = response.data.Result;
        setLoaderVisible(false);
        // console.log(returnedData);
        let result = returnedData.map(a => a.FLAG);
        let contact = returnedData.map(b => b.MSG);
        // console.log("login", userId);
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
  };

  // logging in function
  const submit = values => {
    const userData = {
      loginId: values.userId,
      password: values.password,
      oprFlag: 'L',
      oldPassword: '',
    };
    console.log('userLogReq', userData);
    setLoaderVisible(true);
    axios
      .post(`${API}/api/User/candidateLogin`, userData)
      .then(response => {
        const returnedData = response.data.Result[0];
        let candidateName = returnedData.CANDIDATE_NAME;
        let candidateStatus = returnedData.CANDIDATE_STATUS;
        let candidateRole = returnedData.JOB_TITLE;
        let candidatePhone = returnedData.PHONE;
        let candidateRoleId = returnedData.ROLE_ID;
        let candidateStatusId = returnedData.STATUS_ID;
        let offerAcceptFlag = returnedData.OFER_ACPT_FLAG;
        let daysToJoin = returnedData.DAY_TO_JOIN;
        let candidateOfferLetter = returnedData.OFFER_LETTER;
        let growingDays = returnedData.GROWING_DAY;
        let totalDay = returnedData.TOTAL_DAY;
        let hiringLeadMail = returnedData.HIRING_LEAD_EMAIL;
        let candidateId = returnedData.USER_ID;
        let satyaSathiVersion = returnedData.SATHI_VERSION;

        setLoaderVisible(false);
        setLoginResponse(returnedData);

        console.log('loginresp', returnedData);

        if (returnedData.FLAG === 'S') {
          if (returnedData?.SATHI_VERSION > VERSIONS?.android) {
            setGreaterVersion(true);
            console.log(returnedData?.SATHI_VERSION);
            setNewApkVersion(returnedData?.SATHI_VERSION);
          } else {
            dispatch(
              candidateAuthActions.logIn({
                candidateId: returnedData.USER_ID,
                candidateName,
                candidateRole,
                candidateStatus,
                candidatePhone,
                candidateRoleId,
                candidateStatusId,
                offerAcceptFlag,
                daysToJoin,
                candidateOfferLetter,
                growingDays,
                totalDay,
                hiringLeadMail,
                satyaSathiVersion,
                candidateAuthenticated: true,
              }),
            );
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'Failure Please enter correct credentials',
          });
        }

        // setUserId('');
        // setPassword('');
      })
      .catch(error => {
        setLoaderVisible(false);
        Toast.show({
          type: 'error',
          text1: error,
        });
      });
  };

  return (
    <View style={styles.container}>
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
                marginTop: 20,
                marginLeft: -10,
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
              source={loginIcon}
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
                // {/* candidate Login titlte */}
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 25,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.header}>Candidate Login</Text>

                  {/* user credentials - userId */}
                  <View style={styles.textInputBox}>
                    {/* <CustomInput
                  placeholder={'Candidate Id'}
                  caption={'Candidate ID'}
                  value={userId}
                  onChangeText={name => setUserId(name)}
                  required
                /> */}
                    <FormInput
                      label="Candidate Id"
                      placeholder={'Candidate Id'}
                      // keyboardType="email-address"
                      // autoCompleteType="email"
                      onChange={handleChange('userId')}
                      errorMsg={errors.userId}
                      onBlur={handleBlur('userId')}
                      maxLengthinput={8}
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
                  <View style={styles.textInputBox}>
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
                      // onBlur={handleBlur('password')}
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
                        <Image source={Pinlock} style={{ width: 30, height: 30, }} />
                        <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>Quick Pin</Text>
                    </TouchableOpacity>
                </View> */}

                  <TextButton
                    color1={COLORS.green}
                    color2={'#9ADD00'}
                    linearGradientStyle={{
                      marginTop: SIZES.padding * 1.2,
                      marginBottom: SIZES.radius,
                      borderRadius: SIZES.base,
                    }}
                    buttonContainerStyle={{
                      width: responsiveWidth(90),
                      height: 50,
                    }}
                    label={'Log In'}
                    labelStyle={{color: COLORS.white}}
                    onPress={handleSubmit}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {/* signIn for Employee */}
                    <TouchableOpacity
                      onPress={async () => {
                        props.navigation.push('EmployeeTab', {
                          screen: 'EmployeeLogin',
                        });
                        await AsyncStorage.setItem('type', 'employee');
                      }}>
                      <Text
                        style={{
                          color: COLORS.hyperlinkBlue,
                          ...FONTS.h5,
                          fontSize: 14,
                          textDecorationLine: 'underline',
                        }}>
                        Sign In as Employee
                      </Text>
                    </TouchableOpacity>

                    {/* Forgot Password */}
                    <TouchableOpacity>
                      <Text
                        style={styles.forgotPassword}
                        onPress={() => {
                          values.userId !== ''
                            ? forgetPasswordApi(values.userId)
                            : Toast.show({
                                type: 'error',
                                text1: 'Please enter User Id',
                              });
                        }}>
                        Forgot Password?{' '}
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
      </KeyboardAvoidingView>
      {greaterVersion && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={openVersionModal}
          onRequestClose={() => {
            setOpenVersionModal(!openVersionModal);

            // props.navigation.navigate('Candidate_Login'),
            //     dispatch(candidateAuthActions.logOut());
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
                  You are currently using older version of this APK, update now
                  and continue.
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    marginVertical: 12,
  },
  textInputBox: {},
  forgotPassword: {
    color: COLORS.orange1,
    ...FONTS.h4,
    fontSize: 14,
  },
  loginButton: {
    marginHorizontal: 25,
    flexDirection: 'row',
    marginVertical: 12,
    height: 45,
    backgroundColor: COLORS.green,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    ...FONTS.h3,
    marginHorizontal: 15,
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

export default Login;
