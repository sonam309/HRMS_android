import React, {useEffect, useMemo, useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../constants';
import {useFocusEffect} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
  BackHandler,
  Modal,
  StyleSheet,
  PermissionsAndroid,
  RefreshControl,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  EsignD,
  circleFill,
  circleTranceparent,
  company_logo_2,
  profileIC,
  test,
  user_profile,
} from '../../assets';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {candidateAuthActions} from '../../redux/candidateAuthSlice';
import Loader from '../../components/Loader';
import PieChart from 'react-native-pie-chart';
import {API} from '../../utility/services';
import Toast from 'react-native-toast-message';
import CustomAlert from '../../components/CustomAlert/index';
import axios from 'axios';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {launchCamera} from 'react-native-image-picker';
import {getCandidateOfferCheck} from '../../redux/candidatSlice';

const CandidateDashboard = props => {
  const dispatch = useDispatch();
  const current_Status = useSelector(
    state => state.candidateAuth.candidateStatus,
  );

  const {candidateOfferCheckResult, loading} = useSelector(
    state => state.candidateInfo,
  );

  
  const Job_Title = useSelector(state => state.candidateAuth.candidateRole);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const {
    candidateId,
    candidateName,
    candidateStatusId,
    offerAcceptFlag,
    daysToJoin,
    candidateOfferLetter,
    growingDays,
    totalDay,
  } = useSelector(state => state.candidateAuth);

  const [showAlert, setShowAlert] = useState(false);
  const [profileAlert, setProfileAlert] = useState(false);
  const [offerLetterAlert, setOfferLetterAlert] = useState(false);
  const [employeeCreateFlag, setEmployeeCreateFlag] = useState('');
  const [esignCount, setEsignCount] = useState();
  const [todoList, setTodoList] = useState('');
  const [pendingTest, setPendingTest] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [showPicModal, setShowPicModal] = useState(false);

  const isFocused = true;



  // useFocusEffect(() => {
  //     console.log('testttttttttttttttttttttttttttttttttt');
  //     getCandidateOfferDetails();

  // });

  useEffect(() => {
    if (employeeCreateFlag === 'Y') {
      getEsignData();
    }
  }, [employeeCreateFlag]);

  const onRefreshData = React.useCallback(() => {
    if (candidateId) {
      if (!profilePic) {
        getCandidateOfferDetails();
      }
    }

    if (employeeCreateFlag === 'Y') {
      getEsignData();
    }
  }, []);

  const getEsignData = async () => {
    // setLoaderVisible(true);
    const data = {
      user: candidateId,
      candidateId: candidateId,
      flag: 'V',
    };

    // console.log("esigncanid", data);

    axios.post(`${API}/api/saveEsignDataNew`, data).then(response => {
      const result = response.data.Result;
      // console.log('esignDatasssss', result[0]);
      setEsignCount(result[0]?.ESSIGN_CNT);
      // setLoaderVisible(false);
    });
  };

  const getProfilePic = () => {
    let profilePicData = {
      candidateId: `${userId}`,
      operFlag: 'V',
    };

    var formData = new FormData();

    formData.append('data', JSON.stringify(profilePicData));

    axios
      .post(`${API}api/hrms/profilePic`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        setProfilePic(res?.data?.Result[0]?.PROFILE_PIC);
      })
      .catch(error => {
        // console.log('profilepic', JSON.stringify(error));
      });
  };

  const getCandidateOfferDetails = async type => {
    const userData = {loginId: candidateId};
    // setLoaderVisible(true);

    axios
      .post(`${API}/api/hrms/candidateOfferCheck`, userData)
      .then(response => {
        const resultData = response?.data;

        console.log('candidateOfferCheck', resultData);
        // setLoaderVisible(false);
        dispatch(
          candidateAuthActions.updateLogin({
            candidateStatusId: resultData?.Result[0]?.STATUS,
            candidateStatus: resultData?.Result[0]?.CANDIDATE_STATUS,
          }),
        );

        setEmployeeCreateFlag(resultData?.Result[0]?.EMP_CREATION_FLAG);
        setTodoList(resultData?.Result[0]?.DOC_REQ);
        setPendingTest(resultData?.Result[0]?.PENDING_TEST);
        setProfilePic(resultData?.Result[0]?.PROFILE_PIC);
        if (!resultData?.Result[0]?.PROFILE_PIC && showPicModal === false) {
          setShowPicModal(true);
        }

        if (type !== '' && type === 'offer') {
          resultData?.Result[0]?.OFFER_LETTER !== null &&
          resultData?.Result[0]?.OFFER_LETTER !== ''
            ? props.navigation.navigate('Offer Letter')
            : setOfferLetterAlert(true);
        }

        if (type !== '' && type === 'Document') {
          resultData?.Result[0]?.DOC_REQ !== 0 &&
          resultData?.Result[0]?.DOC_REQ !== ''
            ? props.navigation.navigate('Candidate_Document')
            : setShowAlert(true);
        }
        if (type !== '' && type === 'profile') {
          resultData?.Result[0]?.OFER_ACPT_FLAG == 'A'
            ? props.navigation.navigate('Candidate profile')
            : setProfileAlert(true);
        }
        if (type !== '' && type === 'track') {
          resultData?.Result[0]?.CANDIDATE_STATUS &&
            props.navigation.navigate('Status view page');
        }
      })
      .catch(error => {
        // console.log(error)
        // setLoaderVisible(false)

        Toast.show({
          type: 'error',
          text1: error,
        });
      });
  };

  useMemo(() => {
    // if (isFocused) {
    if (candidateId) {
      console.log('testttttttttttttt');

      getCandidateOfferDetails();
    }
    // }
  }, [candidateId]);

  // for submitting file

  function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
  }

  // for submitting file

  function getFormattedTimestamp() {
    var date = new Date();

    var day = addLeadingZero(date.getDate());

    var month = addLeadingZero(date.getMonth() + 1); // Months are zero-based

    var year = date.getFullYear();

    var hours = addLeadingZero(date.getHours());

    var minutes = addLeadingZero(date.getMinutes());

    var seconds = addLeadingZero(date.getSeconds());

    return day + month + year + hours + minutes + seconds;
  }

  const selectProfilePic = async () => {
    const grantedcamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,

      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (
      grantedcamera === PermissionsAndroid.RESULTS.GRANTED

      // grantedstorage === PermissionsAndroid.RESULTS.GRANTED
    ) {
      var options = {
        mediaType: 'photo', //to allow only photo to select ...no video
        saveToPhotos: false, //to store captured photo via camera to photos or else it will be stored in temp folders and will get deleted on temp clear
        includeBase64: false,
        cameraType: 'front',
      };

      launchCamera(options, res => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res?.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res?.customButton);
        } else {
          // let source = res;
          // var resourcePath1 = source.assets[0].uri;

          console.log('Response = ', res);

          let profilePicData = {
            candidateId: candidateId,
            profillePic: res.assets[0]?.fileName,
            operFlag: 'A',
          };

          var formData = new FormData();

          formData.append('data', JSON.stringify(profilePicData));

          formData.append('fileUpload', {
            name: `profilePicDoc_${candidateId}_${getFormattedTimestamp()}.${
              res?.assets[0]?.type?.split('/')[1]
            }`,

            type: res.assets[0]?.type,
            uri: res.assets[0]?.uri,
          });

          setLoaderVisible(true);

          fetch(`${API}/api/hrms/profilePic`, {
            method: 'POST',
            body: formData,
          })
            .then(res => {
              // console.log(res);
              setLoaderVisible(false);

              if (res?.status === 200) {
                Toast.show({
                  type: 'success',
                  text1: 'Profile Picture Updated Successfully',
                });

                setShowPicModal(false);
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Something went wrong, Please try again...',
                });
              }
            })

            .catch(error => {
              // console.log(error);
              setLoaderVisible(false);
              Toast.show({
                type: 'error',
                text1: error,
              });
            });
        }
      });
    } else {
      // console.log('Camera permission denied');
      Toast.show({
        type: 'error',
        text1: 'Camera permission denied',
      });
    }
  };

  const finalSubmit = async () => {
    const userData = {candidateId: candidateId};
    axios
      .post(`${API}/api/User/completeCanProfile`, userData)
      .then(response => {
        const resultData = response.data;
        // console.log('finalSubmit', resultData);

        if (resultData.FLAG === 'S') {
          Toast.show({
            type: 'success',
            text1: resultData.MSG,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: resultData.MSG,
          });
        }
      })
      .catch(error => {
        // console.log(error)
        setLoaderVisible(false);

        Toast.show({
          type: 'error',
          text1: error,
        });
      });
  };

  useFocusEffect(
   
    React.useCallback(() => {
      if(candidateId){
        getCandidateOfferDetails();
  
      }
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: () => {
                BackHandler.exitApp();
                dispatch(candidateAuthActions.logOut());
              },
            },
          ]);
          return true;
        },
      );
      return () => backHandler.remove();
    }, []),
  );

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: COLORS.white,
          paddingHorizontal: 12,
          paddingBottom: 8,
          shadowColor: COLORS.orange1,
          elevation: 5,
        }}>
        <CustomAlert
          messageStyle={{color: COLORS.black, ...FONTS.h3}}
          showCancel={false}
          showConfirm={true}
          confirmButtonColor={COLORS.green}
          confirmTxt="Ok"
          show={offerLetterAlert}
          setShow={setOfferLetterAlert}
          message={'Offer Letter not generated Yet'}
        />
        <CustomAlert
          messageStyle={{color: COLORS.black, ...FONTS.h3}}
          showCancel={false}
          showConfirm={true}
          confirmButtonColor={COLORS.green}
          confirmTxt="Ok"
          show={profileAlert}
          setShow={setProfileAlert}
          message={
            'Before accepting offer letter You can not fill perosnal Details'
          }
        />
        <CustomAlert
          messageStyle={{color: COLORS.black, ...FONTS.h3}}
          showCancel={false}
          showConfirm={true}
          confirmButtonColor={COLORS.green}
          confirmTxt="Ok"
          show={showAlert}
          setShow={setShowAlert}
          message={'Document need to be submit after offer letter acceptance'}
        />
        {/* <CustomAlert
          show={exitAlert}
          setShow={setExitAlert}
          title={'Wait'}
          message={'Are you sure, you want to exit the App?'}
          onConfirmPressed={() => BackHandler.exitApp()}
        /> */}

        {/* <Text style={{ ...FONTS.h2, color: COLORS.orange1, textAlignVertical: 'center', marginTop: 10 }}>Welcome</Text> */}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '45%',
              paddingHorizontal: 4,
              alignItems: 'center',
              flex: 1,
            }}>
            {/* <FontAwesomeIcon
              name="user-circle-o"
              size={25}
              color={COLORS.black}
            /> */}
            {/* {console.log('ProflileImage', `${API}/ProfilePic/${profilePic}`)} */}

            <Image
              source={
                profilePic
                  ? {uri: `${API}/ProfilePic/${profilePic}`}
                  : user_profile
              }
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.5,
                borderColor: COLORS.green,
                borderRadius: 50,
              }}
            />

            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.black,
                marginLeft: 8,
                justifyContent: 'center',
              }}>
              {candidateName}
            </Text>
          </View>

          <TouchableOpacity
            style={{justifyContent: 'flex-end', backgroundColor: COLORS.white}}
            onPress={() => {
              // props.navigation.navigate('Candidate_Login'),
              dispatch(candidateAuthActions.logOut());
            }}>
            <Icons
              name="logout"
              size={30}
              style={{color: COLORS.black, padding: 8}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={loaderVisible}
            onRefresh={onRefreshData}
          />
        }>
        <Loader loaderVisible={loaderVisible} />
        {employeeCreateFlag !== '' &&
        employeeCreateFlag !== null &&
        employeeCreateFlag === 'Y' ? (
          <>
            <View
              style={{
                flex: 1,
                marginHorizontal: 10,
                marginTop: 20,
                borderRadius: 12,
                padding: 15,
              }}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View>
                  <View style={{flexDirection: 'row', marginLeft: 12}}>
                    {esignCount >= 0 ? (
                      <Image
                        source={circleFill}
                        style={{
                          width: 40,
                          height: 40,
                          justifyContent: 'center',
                        }}
                      />
                    ) : (
                      <Image
                        source={circleTranceparent}
                        style={{
                          width: 40,
                          height: 40,
                          justifyContent: 'center',
                        }}
                      />
                    )}
                    <Text
                      style={{
                        marginTop: 7,
                        color: COLORS.orange1,
                        justifyContent: 'center',
                        ...FONTS.h5,
                        marginLeft: -8,
                      }}>
                      -----------
                    </Text>
                  </View>
                  <Text style={{color: COLORS.black, ...FONTS.h5}}>
                    Candidate
                  </Text>
                </View>

                <View>
                  <View style={{flexDirection: 'row', marginLeft: -5}}>
                    {esignCount == 1 || esignCount >= 1 ? (
                      <Image
                        source={circleFill}
                        style={{
                          width: 40,
                          height: 40,
                          justifyContent: 'center',
                        }}
                      />
                    ) : (
                      <Image
                        source={circleTranceparent}
                        style={{
                          width: 40,
                          height: 40,
                          justifyContent: 'center',
                        }}
                      />
                    )}
                    <Text
                      style={{
                        marginTop: 7,
                        color: COLORS.orange1,
                        justifyContent: 'center',
                        ...FONTS.h5,
                        marginLeft: -8,
                      }}>
                      --------------
                    </Text>
                  </View>
                  <Text style={{color: COLORS.black, ...FONTS.h5}}>
                    1st Guarantor
                  </Text>
                </View>
                <View>
                  <View style={{flexDirection: 'row', marginLeft: -5}}>
                    {esignCount == 2 || esignCount >= 2 ? (
                      <Image
                        source={circleFill}
                        style={{
                          width: 40,
                          height: 40,
                          justifyContent: 'center',
                        }}
                      />
                    ) : (
                      <Image
                        source={circleTranceparent}
                        style={{
                          width: 40,
                          height: 40,
                          justifyContent: 'center',
                        }}
                      />
                    )}
                    <Text
                      style={{
                        marginTop: 7,
                        color: COLORS.orange1,
                        justifyContent: 'center',
                        ...FONTS.h5,
                        marginLeft: -8,
                      }}>
                      ---------------
                    </Text>
                  </View>
                  <Text style={{color: COLORS.black, ...FONTS.h5}}>
                    2nd Guarantor
                  </Text>
                </View>

                <View>
                  <View style={{flexDirection: 'row', marginLeft: -5}}>
                    {esignCount !== null && esignCount > 2 ? (
                      <Image
                        source={circleFill}
                        style={{
                          width: 40,
                          height: 40,
                          justifyContent: 'center',
                        }}
                      />
                    ) : (
                      <Image
                        source={circleTranceparent}
                        style={{
                          width: 40,
                          height: 40,
                          justifyContent: 'center',
                        }}
                      />
                    )}
                  </View>
                  <Text style={{color: COLORS.black, ...FONTS.h5}}>
                    Complete
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              // disabled={esignCount <= 2 ? false : true}
              onPress={() => props.navigation.navigate('Pending_Esign_list')}>
              <View
                style={{
                  borderRadius: 12,
                  backgroundColor: COLORS.white,
                  width: '35%',
                  justifyContent: 'center',
                  padding: 15,
                  marginLeft: 20,
                  elevation: 2,
                }}>
                <Image
                  // source={
                  //   profilePic
                  //     ? {uri: `${API}/ProfilePic/${profilePic}`}
                  //     : EsignD
                  // }
                  source={EsignD}
                  style={{
                    width: 60,
                    height: 60,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 30,
                  }}
                />

                <Text
                  style={{
                    ...FONTS.h5,
                    color: COLORS.black,
                    alignSelf: 'center',
                    marginTop: 5,
                  }}>
                  My Esign
                </Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          // header view
          //  Status view
          <View style={{marginHorizontal: 10}}>
            {/* <Text style={{ ...FONTS.h1, padding: 10, flex: 1, width: '100%', alignSelf: 'center', flexDirection: 'row',textAlign:'center',margin:20 ,color:COLORS.orange1}}>Welcome {candidateName}</Text> */}

            <View
              style={{
                backgroundColor: COLORS.disableOrange1,
                borderColor: COLORS.green,
                paddingVertical: 8,
                borderRadius: 12,
                marginVertical: 8,
                marginTop: 30,
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.black,
                  marginHorizontal: 15,
                }}>
                You are applied for {Job_Title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  gap: 20,
                  marginTop: 15,
                }}>
                <View>
                  {growingDays ? (
                    <PieChart
                      widthAndHeight={100}
                      series={[growingDays, totalDay - growingDays]}
                      sliceColor={[COLORS.green, COLORS.white]}
                      coverRadius={0.85}>
                      {/* {console.log("joining days", daysToJoin, totalDay, growingDays, (totalDay - growingDays))} */}
                    </PieChart>
                  ) : (
                    <PieChart
                      widthAndHeight={100}
                      series={[0, 1]}
                      sliceColor={[COLORS.green, COLORS.white]}
                      coverRadius={0.85}>
                      {/* {console.log("joining days", daysToJoin, totalDay, growingDays, (totalDay - growingDays))} */}
                    </PieChart>
                  )}

                  {/* series={[daysToJoin === null ? "1" : daysToJoin, totalDay === null ? "2" : totalDay - daysToJoin === null ? "1" : daysToJoin]} */}

                  {growingDays ? (
                    <View
                      style={{
                        position: 'absolute',
                        height: 80,
                        width: 80,
                        borderRadius: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        top: 10,
                        padding: 10,
                      }}>
                      <Text
                        style={{
                          ...FONTS.h2,
                          color: COLORS.black,
                          alignSelf: 'center',
                          fontWeight: 'bold',
                        }}>
                        {daysToJoin === null ? '1' : daysToJoin}
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body5,
                          color: COLORS.orange1,
                          alignSelf: 'center',
                          fontWeight: '700',
                        }}>
                        Days to
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body5,
                          color: COLORS.orange1,
                          alignSelf: 'center',
                          fontWeight: '700',
                          lineHeight: 12,
                        }}>
                        Join
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={{
                        position: 'absolute',
                        height: 80,
                        width: 80,
                        borderRadius: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        top: 18,
                        padding: 5,
                        left: 30,
                        ...FONTS.h1,
                        color: COLORS.black,
                      }}>
                      ...
                    </Text>
                  )}
                </View>
                <View>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontSize: 15,
                      flexWrap: 'wrap',
                      textAlign: 'left',
                    }}>
                    Job Status Pending at{' '}
                  </Text>

                  <Text
                    style={{
                      ...FONTS.body1,
                      fontSize: 16,
                      color: COLORS.green,
                      textAlign: 'left',
                      lineHeight: 22,
                    }}>
                    {' '}
                    {current_Status}
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginTop: 12,
                    }}
                    onPress={() => getCandidateOfferDetails('track')}>
                    <LinearGradient
                      colors={[COLORS.orange1, COLORS.disableOrange1]}
                      start={{x: 0, y: 0}}
                      end={{x: 2, y: 0}}
                      style={{borderRadius: 8, padding: 8}}>
                      <Text
                        style={{
                          color: COLORS.white,
                          ...FONTS.h4,
                          textAlign: 'center',
                        }}>
                        Track job Status
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}

        {pendingTest && (
          <View style={{marginHorizontal: 12, marginVertical: 12}}>
            <Text style={{fontWeight: 500, fontSize: 16, color: COLORS.black}}>
              {' '}
              {pendingTest === 'C' ? 'Complete Task' : "To Do's"}
            </Text>

            <TouchableOpacity
              onPress={() => {
                pendingTest === 'C'
                  ? props.navigation.navigate('TestResult')
                  : props.navigation.navigate('TestScreen');
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  height: responsiveHeight(10),
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.disableOrange1,
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    textAlignVertical: 'center',
                    padding: 10,
                    ...FONTS.h5,
                    fontSize: 16,
                    color: COLORS.orange1,
                    marginLeft: 10,
                  }}>
                  {pendingTest === 'C' ? 'Test Result' : 'Proceed for Test...'}
                </Text>
                <Image
                  source={test}
                  style={{
                    height: 50,
                    width: 50,
                    alignSelf: 'center',
                    marginEnd: 20,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* offer Letter view */}

        {candidateOfferLetter && (
          <View style={{marginHorizontal: 12, marginVertical: 12}}>
            <Text style={{fontWeight: 500, fontSize: 16, color: COLORS.black}}>
              {' '}
              Offer Letter
              {/* {JSON.stringify(tkenRes)} */}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.disableOrange1,
                paddingVertical: 20,
                borderRadius: 12,
                width: '100%',
                marginVertical: 12,
                borderColor: COLORS.orange1,
                borderWidth: 0.5,
              }}
              onPress={() => {
                getCandidateOfferDetails('offer');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <SimpleLineIcons
                  name="envelope-letter"
                  size={30}
                  color={COLORS.orange}
                  style={{marginHorizontal: 30}}
                />
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 14,
                    color: COLORS.orange,
                    marginRight: 30,
                    textAlignVertical: 'center',
                  }}>
                  View Offer Letter{'>'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* task view */}

        {todoList !== '' && todoList !== 0 && (
          <View style={{marginHorizontal: 12, marginVertical: 6}}>
            <Text style={{fontWeight: 500, fontSize: 16, color: COLORS.black}}>
              {' '}
              Task1
              {/* {JSON.stringify(count,"ggvbg")}  */}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 6,
                elevation: 5,
              }}>
              {/* profile view */}
              <TouchableOpacity
                style={{
                  height: 160,
                  width: '45%',
                  borderColor: COLORS.orange,
                  borderWidth: 0.5,
                  backgroundColor: COLORS.disableOrange1,
                  padding: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 12,
                }}
                onPress={() => {
                  getCandidateOfferDetails('profile');
                }}>
                <FontAwesome5 name="user" size={44} color={COLORS.orange1} />
                <Text
                  style={{
                    color: COLORS.orange1,
                    fontWeight: 500,
                    fontSize: 16,
                    marginTop: 12,
                  }}>
                  {' '}
                  Your profile{' '}
                </Text>
              </TouchableOpacity>
              {/* document view */}

              <TouchableOpacity
                onPress={() => {
                  getCandidateOfferDetails('Document');
                }}
                style={{
                  borderColor: COLORS.green,
                  borderWidth: 0.5,
                  height: 160,
                  backgroundColor: COLORS.disableGreen,
                  padding: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 12,
                  width: '45%',
                }}>
                <Icons
                  name="file-document-outline"
                  size={44}
                  color={COLORS.green}
                />
                <Text
                  style={{
                    color: COLORS.green,
                    fontWeight: 500,
                    fontSize: 16,
                    marginTop: 12,
                  }}>
                  {' '}
                  Documents{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {/* final submittion view */}

        {todoList !== '' && todoList !== 0 && (
          <View
            style={{marginHorizontal: 12, marginVertical: 6, width: '100%'}}>
            {candidateStatusId <= '166' && (
              <TouchableOpacity
                style={{
                  marginTop: 12,
                  justifyContent: 'flex-end',
                  width: responsiveWidth(35),
                  alignSelf: 'flex-end',
                  marginRight: 25,
                  marginTop: -5,
                }}
                onPress={() => finalSubmit()}>
                <LinearGradient
                  colors={[COLORS.orange1, COLORS.disableOrange1]}
                  start={{x: 0, y: 0}}
                  end={{x: 2, y: 0}}
                  style={{borderRadius: 8, padding: 8}}>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h4,
                      textAlign: 'center',
                    }}>
                    Final submission
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* about satya */}
        <View
          style={{
            marginHorizontal: SIZES.radius,
            marginBottom: 100,
            marginTop: 20,
          }}>
          <Text style={{fontWeight: 500, fontSize: 16, color: COLORS.black}}>
            About Satya{' '}
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://satyamicrocapital.com/')}
            style={{
              marginTop: 10,
              marginBottom: 10,
              backgroundColor: COLORS.white,
              height: responsiveHeight(25),
              borderRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 0.5,
              borderColor: COLORS.lightGray,
            }}>
            <View style={{width: '95%', justifyContent: 'center'}}>
              <Image
                source={company_logo_2}
                style={{height: '100%', width: '100%'}}
              />

              {/* <WebView source={{ uri: 'https://satyamicrocapital.com/' }} style={{opacity:0.99}} /> */}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {!profilePic && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showPicModal}
          onRequestClose={() => {
            // setShowPicModal(!showPicModal);
            // console.log('closeee');

            props.navigation.navigate('Candidate_Login'),
              dispatch(candidateAuthActions.logOut());
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setShowPicModal(!showPicModal)}>
                            <Text style={styles.textStyle}>Upload Profile</Text>
                        </Pressable> */}
              <View style={{flexDirection: 'column', height: '100%'}}>
                <Text
                  style={{color: COLORS.black, ...FONTS.h3, lineHeight: 20}}>
                  Attach Profile Image
                </Text>

                <Text
                  style={{color: COLORS.gray, ...FONTS.body5, lineHeight: 15}}>
                  Please Upload Profile Picture!
                </Text>

                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.gray,
                    height: 150,
                    width: 250,
                    borderRadius: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderStyle: 'dashed',
                    marginTop: 25,
                  }}
                  onPress={selectProfilePic}>
                  <Image source={profileIC} style={{height: 50, width: 50}} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default CandidateDashboard;

const styles = StyleSheet.create({
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
