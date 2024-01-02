import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
  BackHandler,
  Alert,
  NativeModules,
  NativeEventEmitter,
  PermissionsAndroid,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../../constants';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomInput from '../../../components/CustomInput';
import {useDispatch, useSelector} from 'react-redux';
import {getCandidateList} from '../../../redux/eSignSlice';
import Toast from 'react-native-toast-message';
import BottomUpModal from '../../../components/BottomUpModal';
import DocumentTypeBottomView from './DocumentTypeBottomView';
import LinearGradient from 'react-native-linear-gradient';
import {API, VERSIONS} from '../../../utility/services';
import GetLocation from 'react-native-get-location';
import Loader from '../../../components/Loader';
import axios from 'axios';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const {EsignModule} = NativeModules;
const eventEmitter = new NativeEventEmitter(EsignModule);

const Proceed_for_Esign = props => {
  const dispatch = useDispatch();
  const {index} = props.route.params;

  const {candidateList, loading, coordinatesList} = useSelector(
    state => state.eSign,
  );
  const {candidateId, satyaSathiVersion} = useSelector(
    state => state.candidateAuth,
  );

  const [isMobileOtp, setIsMobileOtp] = useState(false);
  const [isBiometric, setIsBiometric] = useState(true);
  const [candidateName, setCandidateName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [candidateMobileNo, setCandidateMobileNo] = useState('');
  const [candidateAddress, setCandidateAddress] = useState('');
  const [IstGuarantorName, setIstGuarantorName] = useState('');
  const [IstGuarantorRelation, setIstGuarantorRelation] = useState('');
  const [IIndGuarantorName, setIIndGuarantorName] = useState('');
  const [
    IIndGuarantorRelationtorRelation,
    setIIndGuarantorRelationtorRelation,
  ] = useState('');
  const [documentTypeView, setDocumentTypeView] = useState(false);
  const [docTypeView, setDocTypeView] = useState(false);
  const [fileName, setFileName] = useState('');
  const [loanType, setLoanType] = useState('');
  const [esignCount, setEsignCount] = useState('');
  const [XYAXIS, setXYAXIS] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [numberOfPages, setNumberOfPages] = useState('');

  const [error, setError] = useState(false);
  const [tkenRes, setTkenRes] = useState();
  const [input, setInput] = useState('');
  const [count, setCount] = useState('');
  const [authMode, setAuthMode] = useState(2);
  const [esignStatusCode, setEsignStatusCode] = useState('');
  const [clientId, setClientId] = useState('');
  const [name, setName] = useState('');
  const [moNum, setMoNum] = useState('');
  const [txnID, setTxnID] = useState('');
  const [aadharID, setAadharId] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [latitude, setLatitude] = useState(false);
  const [longitude, setLongitude] = useState(false);

  useEffect(() => {
    console.log('Index', index);
  }, []);

  useEffect(() => {
    setPredefinedData();
    console.log('checkDataWhatCome', candidateList);
  }, [candidateList]);

  const setPredefinedData = () => {
    if (candidateList.length > 0) {
      setCandidateName(candidateList[index]?.CANDIDATE_NAME);
      setJobTitle(candidateList[index]?.POST);
      setCandidateMobileNo(candidateList[index]?.CANDIDATE_MOB);
      setCandidateAddress(candidateList[index]?.CANDIDATE_ADD);
      setIstGuarantorRelation(candidateList[index]?.FIRST_G_RELATION);
      setIIndGuarantorName(candidateList[index]?.SECOND_G_NAME);
      setIstGuarantorName(candidateList[index]?.FIRST_G_NAME);
      setIIndGuarantorRelationtorRelation(
        candidateList[index]?.SECOND_G_RELATION,
      );
      setFileName(candidateList[index]?.FILE_NAME);
      setEsignCount(candidateList[index]?.ESSIGN_CNT);
      setTxnID(candidateList[index]?.TXN_ID);

      if (esignCount === 0) {
        setAadharId(candidateList[index]?.CAN_AADHAR);
        setName(candidateList[index]?.CANDIDATE_NAME);
        setMoNum(candidateList[index]?.CANDIDATE_MOB);
      } else if (esignCount === 1) {
        setName(candidateList[index]?.FIRST_G_NAME);
        setAadharId(candidateList[index]?.FIRST_G_AADHAR);
        setMoNum(candidateList[index]?.CANDIDATE_MOB);
      } else if (esignCount === 2) {
        setName(candidateList[index]?.SECOND_G_NAME);
        setAadharId(candidateList[index]?.SECOND_G_AADHAR);
        setMoNum(candidateList[index]?.CANDIDATE_MOB);
      }
    }
  };

  useEffect(() => {
    getEsignData();
    Geolocation();
  }, []);

  const Geolocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    granted === PermissionsAndroid.RESULTS.GRANTED
      ? GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 30000,
        })
          .then(location => {
            // console.log(location);
            setLatitude(location.latitude);
            setLongitude(location.longitude);
          })
          .catch(error => {
            const {code, message} = error;
            Alert.alert(code, message);
          })
      : Alert.alert('Location permission not granted');
  };

  const checkConfigration = () => {
    console.log('filenammememme', candidateList[index]?.DOCUMENT_TYPE);

    // if (fileName.includes('Appointment')) {
    //   setLoanType('A');
    // } else if (fileName.includes('JoiningKit')) {
    //   setLoanType('K');
    // } else {
    if (candidateList[index]?.DOCUMENT_TYPE === 'JOINING KIT') {
      console.log('1');
      setLoanType('K');
    } else if (candidateList[index]?.DOCUMENT_TYPE === 'Appointment Letter') {
      setLoanType('A');
      console.log('2');
    } else {
      console.log('3', candidateList[index]?.ESSIGN_CNT);

      if (candidateList[index]?.ESSIGN_CNT == 0) {
        console.log('4');

        setLoanType('E');
      } else if (candidateList[index]?.ESSIGN_CNT == 1) {
        setLoanType('F');
        console.log('5');
      } else if (candidateList[index]?.ESSIGN_CNT == 2) {
        setLoanType('S');
        console.log('6');
      } else {
        console.log('7');

        setLoanType('K');
      }
    }
    // }
  };

  useEffect(() => {
    if (loanType) {
      setDocTypeView(true);
    }
  }, [loanType]);

  const getEsignData = () => {
    const data = {
      user: candidateId,
      candidateId: candidateId,
      flag: 'V',
    };
    dispatch(getCandidateList(data));
  };

  const getEsignDocument = (clienid, type) => {
    // if (isMobileOtp) {
    //   setAuthMode('1');
    // } else if (isBiometric) {
    //   setAuthMode('2');
    // }

    const data = {
      preUpload: 'true',
      clientId: clienid,
      documentName: fileName,
      branchCode: '',
      appNo: '',
      name: name,
      mobNo: moNum,
      docPath: fileName,
      status: '',
      emailAddress: '',
      userId: candidateId,
      memberId: '',
      appFileNo: '',
      authMode: isMobileOtp ? '1' : '2',
      txnId: txnID,
      aadharID: aadharID,
      latitude: latitude,
      longitude: longitude,
      count: '',
      coBorrowerAdhar: '',
      coBorrowerName: '',
      eSignCount: esignCount,
    };

    // console.log('getdocRequest', data);

    let url = '';

    setLoaderVisible(true);
    if (type === 'JOINING KIT') {
      // console.log('SonamT11');
      url = `${API}api/Hrms/GetSignedDocumentJoiningkit`;
    } else if (type === 'Appointment Letter') {
      // console.log('sonamT13');
      url = `${API}api/Kyc/appointmentGetSignedDocument`;
    } else {
      // console.log('SonamT12');
      url = `${API}/api/Kyc/GetSignedDocument`;
    }

    console.log('URLLLLL', url);

    axios
      .post(url, data)
      .then(response => {
        // console.log('getDocumentResponse', response);

        setLoaderVisible(false);

        if (response && Object.keys(response)?.length > 0) {
          if (response?.data != '' && response?.data !== null) {
            // console.log('1');
            {
              response?.data && Alert.alert('E-sign alert!', response?.data);
            }
          } else if (
            response?.error &&
            response?.error !== null &&
            response?.error !== ''
          ) {
            // console.log('2');
            {
              response?.error && Alert.alert('E-sign error!', response?.error);
            }
          } else {
            // Alert.alert('E-Sign Done Succesfully');
            Toast.show({
              type: 'success',
              text1: 'E-Sign Done Succesfully',
            });
          }
          // eventEmitter.reremoveListeners
          // eventEmitter.reremoveListeners("EventCount")
          props.navigation.navigate('CandidateDashboard');

          // Toast.show({
          //     type:'success',
          //     text1:`${returnedData.data}`
          // })
        }
      })
      .catch(error => {
        setLoaderVisible(false);
        console.log('getSignedDoc', JSON.stringify(error));
      });
  };

  const generateEsignJson = () => {
    let prefillJson = {};

    if (esignCount === 0) {
      prefillJson = {
        full_name: candidateName,
        mobile_number: candidateMobileNo,
      };
    } else if (esignCount === 1) {
      prefillJson = {
        full_name: IstGuarantorName,
        mobile_number: candidateMobileNo,
      };
    } else if (esignCount === 2) {
      prefillJson = {
        full_name: IIndGuarantorName,
        mobile_number: candidateMobileNo,
      };
    }

    prefillJson.user_email = 'systemadministrator@satyamicrocapital.com';

    return prefillJson;
  };

  const EsignEvent = type => {
    console.log('tytyppee', type);
    setLoaderVisible(true);

    // if (type === 'Appointment Letter') {
    //   setIsMobileOtp(true);
    // } else if (type === 'JOINING KIT') {
    //   setIsMobileOtp(true);
    // } else {
    //   setIsMobileOtp(false);
    // }

    const prefillOption = generateEsignJson();

    const data = {
      documentName: documentName,
      noOfPages: numberOfPages,
      userId: candidateId,
      docPath: fileName,
      status: 'A',
      eSignCount: esignCount,
      appVersion: VERSIONS?.android,
      rawData: JSON.stringify({
        pdf_pre_uploaded: true,
        config: {
          auth_mode: isMobileOtp ? '1' : '2',
          reason: documentName,
          positions: JSON.parse(XYAXIS),
          skip_email: true,
          name_match: {
            match: true,
            score: 55,
          },
        },
        prefill_options: prefillOption,
      }),
    };

    if (type === 'JOINING KIT') {
      axios
        .post(`${API}api/Kyc/JoiningKitProceedForEsign`, data)
        .then(response => {
          const returnedData = response.data;
          // console.log('joiningKitResponse', returnedData);
          setTkenRes(returnedData?.data?.token);
          setClientId(returnedData?.data?.client_id);
          var tokenRes = EsignModule.GetToken(returnedData?.data?.token);

          let esignResponseData = {};
          setLoaderVisible(false);

          //get Esign data from nsdl
          let eventListener = eventEmitter.addListener(
            'EventCount',
            eventCount => {
              setCount(eventCount);

              // esignResponseData=eventCount;
              const esignRes = JSON.parse(eventCount);
              // console.log("esignResponseData", esignRes);
              // console.log("esignResponseData1", esignRes["status_code"]);
              eventListener.remove();

              // console.log('listnercount', eventCount);

              // console.log(
              //   'esignResponstatus',
              //   eventCount,
              //   esignRes,
              //   esignRes?.status_code,
              // );

              if (
                esignRes?.status_code == '200' ||
                esignRes?.status_code === '200'
              ) {
                getEsignDocument(
                  returnedData?.data?.client_id,
                  candidateList[index]?.DOCUMENT_TYPE,
                );
              } else if (
                esignRes?.status_code == '433' ||
                esignRes?.status_code === '433'
              ) {
                // console.log('errrrr1', JSON.stringify(esignRes?.message));
                {
                  Toast.show({
                    type: 'error',
                    text1: JSON.stringify(esignRes?.message),
                  });
                }
                props.navigation.goBack();
              } else {
                // console.log('errrrr', JSON.stringify(esignRes?.message));
                {
                  Toast.show({
                    type: 'success',
                    text1: JSON.stringify(esignRes?.message),
                  });
                }
                props.navigation.goBack();
              }
            },
          );
          return () => {
            eventEmitter.removeAllListeners();
          };
        })
        .catch(error => {
          setLoaderVisible(false);
          Alert.alert('Alert Title', error, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        });
    } else if (candidateList[index]?.DOCUMENT_TYPE == 'Appointment Letter') {
      axios
        .post(`${API}api/Kyc/appointmentProceedForEsign`, data)
        .then(response => {
          const returnedData = response.data;
          console.log('joiningKitResponse', returnedData);
          setTkenRes(returnedData?.data?.token);
          setClientId(returnedData?.data?.client_id);
          var tokenRes = EsignModule.GetToken(returnedData?.data?.token);

          let esignResponseData = {};
          setLoaderVisible(false);

          //get Esign data from nsdl
          let eventListener = eventEmitter.addListener(
            'EventCount',
            eventCount => {
              setCount(eventCount);

              // esignResponseData=eventCount;
              const esignRes = JSON.parse(eventCount);
              // console.log("esignResponseData", esignRes);
              // console.log("esignResponseData1", esignRes["status_code"]);
              eventListener.remove();

              console.log('listnercount', eventCount);

              console.log(
                'esignResponstatus',
                eventCount,
                esignRes,
                esignRes?.status_code,
              );

              if (
                esignRes?.status_code == '200' ||
                esignRes?.status_code === '200'
              ) {
                getEsignDocument(
                  returnedData?.data?.client_id,
                  candidateList[index]?.DOCUMENT_TYPE,
                );
              } else if (
                esignRes?.status_code == '433' ||
                esignRes?.status_code === '433'
              ) {
                console.log('errrrr1', JSON.stringify(esignRes?.message));
                {
                  Toast.show({
                    type: 'error',
                    text1: JSON.stringify(esignRes?.message),
                  });
                }
                props.navigation.goBack();
              } else {
                console.log('errrrr', JSON.stringify(esignRes?.message));
                {
                  Toast.show({
                    type: 'success',
                    text1: JSON.stringify(esignRes?.message),
                  });
                }
                props.navigation.goBack();
              }
            },
          );
          return () => {
            eventEmitter.removeAllListeners();
          };
        })
        .catch(error => {
          setLoaderVisible(false);
          Alert.alert('Alert Title', error, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        });
    } else {
      console.log('hitTehereeee');
      axios
        .post(`${API}/api/Kyc/ProceedForEsign`, data)
        .then(response => {
          const returnedData = response.data;
          console.log('proceesEsignResponse', returnedData);
          setTkenRes(returnedData?.data?.token);
          setClientId(returnedData?.data?.client_id);
          var tokenRes = EsignModule.GetToken(returnedData?.data?.token);

          let esignResponseData = {};
          setLoaderVisible(false);

          //get Esign data from nsdl
          let eventListener = eventEmitter.addListener(
            'EventCount',
            eventCount => {
              setCount(eventCount);

              // esignResponseData=eventCount;
              const esignRes = JSON.parse(eventCount);
              // console.log("esignResponseData", esignRes);
              // console.log("esignResponseData1", esignRes["status_code"]);
              eventListener.remove();

              console.log('listnercount', eventCount);

              console.log(
                'esignResponstatus',
                eventCount,
                esignRes,
                esignRes?.status_code,
              );

              if (
                esignRes?.status_code == '200' ||
                esignRes?.status_code === '200'
              ) {
                getEsignDocument(
                  returnedData?.data?.client_id,
                  candidateList[index]?.DOCUMENT_TYPE,
                );
              } else if (
                esignRes?.status_code == '433' ||
                esignRes?.status_code === '433'
              ) {
                console.log('errrrr1', JSON.stringify(esignRes?.message));
                {
                  Toast.show({
                    type: 'error',
                    text1: JSON.stringify(esignRes?.message),
                  });
                }
                props.navigation.goBack();
              } else {
                console.log('errrrr', JSON.stringify(esignRes?.message));
                {
                  Toast.show({
                    type: 'success',
                    text1: JSON.stringify(esignRes?.message),
                  });
                }
                props.navigation.goBack();
              }
            },
          );
          return () => {
            eventEmitter.removeAllListeners();
          };
        })
        .catch(error => {
          setLoaderVisible(false);
          Alert.alert('Alert Title', error, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        });
    }
  };

  const getAxisData = () => {
    console.log('getCoordinateDat', coordinatesList.XYAXIS);
    setXYAXIS(coordinatesList?.XYAXIS);
    // setXYAXIS('{"1":[{"x":435 ,"y":130}],"2":[{"x":435,"y":125}],"3":[{"x":435,"y":70}],"4":[{"x":435,"y":320}]}');
    setDocumentName(coordinatesList?.Document_name);
    setNumberOfPages(coordinatesList?.NUMBER_OF_PAGES);
    setDocTypeView(false);
  };

  return (
    <View>
      {/* Top headerView */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          elevation: 6,
          backgroundColor: COLORS.white,
          padding: 15,
        }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icons
            name="arrow-left"
            size={28}
            color={COLORS.black}
            style={{alignSelf: 'center'}}
            verticalAlign={'center'}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...FONTS.body3,
            fontSize: 17,
            color: COLORS.black,
            verticalAlign: 'middle',
            marginLeft: 20,
          }}>
          Esign
        </Text>
      </View>
      {loaderVisible ? (
        <View style={{alignItems: 'center', marginTop: '30%'}}>
          <ActivityIndicator color={COLORS.orange1} />
          <Text
            style={{
              ...FONTS.h3,
              fontWeight: '500',
              color: COLORS.orange1,
              marginTop: SIZES.base,
            }}>
            Loading your details
          </Text>
        </View>
      ) : (
        <View>
          {/* radio button group */}
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 15,
              width: '100%',
            }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                disabled={
                  candidateList[index]?.DOCUMENT_TYPE ===
                    'Appointment Letter' ||
                  candidateList[index]?.DOCUMENT_TYPE === 'JOINING KIT'
                    ? false
                    : true
                }
                onPress={() => {
                  setIsMobileOtp(true);
                  setIsBiometric(false);
                }}
                style={{
                  alignItems: 'center',
                  padding: SIZES.base,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {/* <Text>{JSON.stringify(isMobileOtp)}</Text> */}
                {isMobileOtp ? (
                  <Icons
                    name="radiobox-marked"
                    size={25}
                    color={COLORS.orange}
                  />
                ) : (
                  <Icons
                    name="checkbox-blank-circle-outline"
                    size={25}
                    color={COLORS.orange}
                  />
                )}
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.body4,
                    textAlign: 'center',
                    marginLeft: 5,
                  }}>
                  Mobile OTP
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setIsBiometric(true);
                  setIsMobileOtp(false);
                }}
                style={{
                  alignItems: 'center',
                  padding: SIZES.base,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {isBiometric ? (
                  <Icons
                    name="radiobox-marked"
                    size={25}
                    color={COLORS.orange}
                  />
                ) : (
                  <Icons
                    name="checkbox-blank-circle-outline"
                    size={25}
                    color={COLORS.orange}
                  />
                  // <Icons
                  //   name="radiobox-marked"
                  //   size={25}
                  //   color={COLORS.orange}
                  // />
                )}
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.body4,
                    textAlign: 'center',
                    marginLeft: 5,
                  }}>
                  Biometric
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* candidate information view */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 10,
            }}>
            <View style={{width: '45%'}}>
              <CustomInput
                caption={'Candidate Name'}
                value={candidateName}
                onChangeText={setCandidateName}
                editable={false}
                textInputStyle={{
                  color: COLORS.black,
                }}
              />
              <CustomInput
                caption={'Candidate Mobile No.'}
                value={candidateMobileNo}
                onChangeText={setCandidateMobileNo}
                editable={false}
                textInputStyle={{
                  color: COLORS.black,
                }}
              />
              <CustomInput
                caption={'1st Guarantor Name'}
                value={IstGuarantorName}
                onChangeText={setIstGuarantorName}
                editable={false}
                textInputStyle={{
                  color: COLORS.black,
                }}
              />

              <CustomInput
                caption={'2nd Guarantor Name'}
                value={IIndGuarantorName}
                onChangeText={setIIndGuarantorName}
                editable={false}
                textInputStyle={{
                  color: COLORS.black,
                }}
              />
            </View>
            <View style={{width: '45%'}}>
              <CustomInput
                caption={'Job Title'}
                value={jobTitle}
                onChangeText={setJobTitle}
                editable={false}
                textInputStyle={{
                  color: COLORS.black,
                }}
              />
              <CustomInput
                caption={'Candidate Address'}
                value={candidateAddress}
                onChangeText={setCandidateAddress}
                editable={false}
                textInputStyle={{
                  color: COLORS.black,
                }}
              />
              <CustomInput
                caption={'1st Guarantor Relation'}
                value={IstGuarantorRelation}
                onChangeText={setIstGuarantorRelation}
                editable={false}
                textInputStyle={{
                  color: COLORS.black,
                }}
              />
              <CustomInput
                caption={'2nd Guarantor Relation'}
                value={IIndGuarantorRelationtorRelation}
                onChangeText={setIIndGuarantorRelationtorRelation}
                editable={false}
                textInputStyle={{
                  color: COLORS.black,
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginHorizontal: 25,
              marginTop: 10,
            }}>
            <View style={{width: responsiveWidth(35)}}>
              <Text style={{color: COLORS.gray, fontSize: 11}}>
                Document Type
              </Text>
              <Text style={{color: COLORS.black, ...FONTS.h4}}>
                {documentName !== null && documentName !== ''
                  ? documentName
                  : 'Select Configure'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => checkConfigration()}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.white,
                  borderRadius: 6,
                  marginLeft: 120,
                  borderColor: COLORS.lightGray,
                  borderWidth: 0.5,
                  height: 40,
                  width: 140,
                  alignItems: 'center',
                }}>
                <Icons
                  name="cogs"
                  size={25}
                  color={COLORS.orange}
                  style={{margin: 6, transform: [{rotateY: '180deg'}]}}
                />
                <Text style={{...FONTS.h4, color: COLORS.black}}>
                  Configration
                </Text>
              </View>
            </TouchableOpacity>
            {docTypeView && (
              <BottomUpModal
                isVisible={docTypeView}
                onClose={() => {
                  setDocTypeView(false);
                }}>
                {
                  <DocumentTypeBottomView
                    loanType={loanType}
                    jobTitle={jobTitle}
                    getAxisData={getAxisData}
                    onPress={() => setDocTypeView(false)}
                  />
                }
              </BottomUpModal>
            )}
          </View>

          {/* submit button */}
          <View
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 150,
            }}>
            {loaderVisible ? (
              <Text>Loading...</Text>
            ) : (
              <Pressable
                style={{
                  backgroundColor:
                    XYAXIS !== '' && XYAXIS != null
                      ? COLORS.orange1
                      : COLORS.lightGray,
                  width: responsiveWidth(90),
                  borderRadius: 8,
                  padding: 10,
                  position: 'absolute',
                  bottom: 0,
                  marginBottom: 10,
                  alignSelf: 'center',
                }}
                disabled={XYAXIS !== '' && XYAXIS != null ? false : true}
                onPress={() => EsignEvent(candidateList[index]?.DOCUMENT_TYPE)}>
                {/* <LinearGradient
                                    colors={XYAXIS !== '' && XYAXIS != null ? [COLORS.orange1, COLORS.disableOrange1] : [COLORS.gray, COLORS.lightGray]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 2, y: 0 }}
                                    style={{ borderRadius: 8, padding: 10, position: 'absolute', bottom: 0, marginBottom: 10, justifyContent: 'center', flex: 1, width: responsiveWidth(90), justifyContent: 'space-evenly' }} > */}
                <Text
                  style={{
                    color: COLORS.white,
                    textAlign: 'center',
                    ...FONTS.body3,
                    marginLeft: 20,
                    marginRight: 20,
                  }}>
                  {XYAXIS !== '' && XYAXIS != null
                    ? 'Submit'
                    : 'Select Configration...'}
                </Text>
                {/* </LinearGradient> */}
              </Pressable>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Proceed_for_Esign;
