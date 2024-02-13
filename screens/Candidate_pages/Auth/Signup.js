import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../../constants';
import Header from '../../../components/Header';
import TextDropdown from '../../../components/TextDropdown';
import FormInput from '../../../components/FormInput';
import DateButton from '../../../components/DateButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import WebView from 'react-native-webview';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import {esignIcon} from '../../../assets';
import {icons} from '../../../constants';
import axios from 'axios';
import {API} from '../../../utility/services';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useNavigation} from '@react-navigation/native';
import {color} from 'react-native-reanimated';
import {getAadharValidation} from '../../../redux/aadharValidationSlice';
import {getLocationList} from '../../../redux/locationSlice';
import {useDispatch, useSelector} from 'react-redux';
import BottomUpModal from '../../../components/BottomUpModal';
import OtpBottomUpModal from './OtpBottomUpModal';
import LocationBottomUpModal from './LocationBottomUpModal';
import Loader from '../../../components/Loader';
import Micons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showAlert, closeAlert} from 'react-native-customisable-alert';

const Signup = ({route, params}) => {
  const typeInterview = route.params.interviewType;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {aadharValidationResult, loading, verifyOtpResult} = useSelector(
    state => state.aadharValidation,
  );

  const {locationListData, locationLoading} = useSelector(
    state => state.location,
  );

  // dropdown data ends

  //    state variable start
  const [experience, setExperience] = useState(true);

  const [selectedPostTitle, setSelectedPostTitle] = useState('');
  const [selectedPostTitleValue, setSelectedPostTitleValue] = useState('');

  const [firstname, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);
  const [posttitleLoading, setPosttitleLoading] = useState(false);

  const [gender, setGender] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [genderValue, setGenderValue] = useState(0);

  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDepValue, setSelectedDepValue] = useState(0);

  const [maritalStatus, setmaritalStatus] = useState([]);
  const [selectedMaritalstatus, setSelectedMaritalstatus] = useState('');
  const [maritialStatusValue, setMaritialStatusValue] = useState(0);

  const [currentEmployer, setCurrentEmployer] = useState('');
  const [lastEmployer, setlastEmployer] = useState('');
  const [currentCtc, setCurrentCtc] = useState('');

  const [address, setAddress] = useState('');
  const [desiredPay, setDesiredPay] = useState('');

  const [country, setCountry] = useState('India');
  const [countryValue, setCountryValue] = useState('');
  const [selectLocation, setSelectLocation] = useState(0);

  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [stateValue, setStateValue] = useState(0);

  const [city, setCity] = useState('');

  const [postalCode, setPostalCode] = useState('');
  const [loactaionBottomView, setLocationBottomView] = useState(false);

  const [resume, setResume] = useState({});
  const [postTitle, setPostTitle] = useState([]);

  const [heigherEdu, setHeigherEdu] = useState([]);
  const [higherEducationObtained, setHigherEducationObtained] = useState('');
  const [higherEducationObtainedValue, setHigherEducationObtainedValue] =
    useState(0);
  const [bypass6month, setBypass6month] = useState(false);

  const [reference1, setReference1] = useState('');
  const [ref1EmpCode, setRef1EmpCode] = useState('');
  const [ref1MobileNo, setRef1MobileNo] = useState('');
  const [ref1Email, setRef1Email] = useState('');

  const [reference2, setReference2] = useState('');
  const [ref2EmpCode, setRef2EmpCode] = useState('');
  const [ref2MobileNo, setRef2MobileNo] = useState('');
  const [ref2Email, setRef2Email] = useState('');

  const [college, setCollege] = useState('');
  const [aadharNum, setaadharNum] = useState('');
  const [optBottomView, setOtpBottomView] = useState(false);

  //   state variable ends
  function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
  }

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

  const selectResume = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.images,
        ],
      });

      setResume({
        name: `Resume_${getFormattedTimestamp()}.${doc[0].type.split('/')[1]}`,
        type: doc[0].type,
        uri: doc[0].uri,
      });
    } catch (error) {
      // console.log(error);
    }
  };

  // function generateRandom12DigitNumber() {
  //   // Generate a random number between 1,000,000,000,000 and 9,999,999,999,999
  //   const randomNumber =
  //     Math.floor(Math.random() * 9000000000000) + 1000000000000;
  //   return randomNumber.toString(); // Convert to string to preserve leading zeros
  // }

  const isFormValidated = () => {
    console.log(
      '1778888',
      aadharNum,
      firstname,
      lastName,
      fatherName,
      motherName,
      dob,
      email,
      genderValue,
      phone,
      maritialStatusValue,
      selectedDepValue,
      address,
      country,
      city,
      stateValue,
      resume?.name,
      higherEducationObtainedValue,
      college,
      selectLocation,
      // bypass6month,
    );

    if (aadharNum === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter Aadhar Number',
      });
      return false;
    } else if (firstname === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter First Name',
      });
      return false;
    } else if (lastName === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter Last Name',
      });
      return false;
    } else if (fatherName === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter Father Name',
      });
      return false;
    } else if (motherName === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter Mother Name',
      });
      return false;
    } else if (dob === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter Date of Birth',
      });
      return false;
    } else if (email === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter Email',
      });
      return false;
    } else if (genderValue == 0) {
      Toast.show({
        type: 'error',
        text1: 'Please enter Gender',
      });
      return false;
    } else if (phone === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter Phone Number',
      });
      return false;
    } else if (maritialStatusValue == 0) {
      Toast.show({
        type: 'error',
        text1: 'Please enter Marital Status',
      });
      return false;
    } else if (selectedDepValue == 0) {
      Toast.show({
        type: 'error',
        text1: 'Please enter Department',
      });
      return false;
    } else if (address === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter Address',
      });
      return false;
    } else if (country === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter Country',
      });
      return false;
    } else if (city === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter City',
      });
      return false;
    } else if (stateValue == 0) {
      Toast.show({
        type: 'error',
        text1: 'Please Select State',
      });
      return false;
    } else if (resume?.name === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Upload Resume',
      });
      return false;
    } else if (higherEducationObtainedValue == 0) {
      Toast.show({
        type: 'error',
        text1: 'Please Select Heigher education',
      });
      return false;
    } else if (college === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter College/University',
      });
      return false;
    } else if (typeInterview == 366 && selectLocation == 0) {
      Toast.show({
        type: 'error',
        text1: 'Please Select Location',
      });
      return false;
    } else if (experience && currentEmployer === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter Current Epmloyer',
      });
    } else if (experience && lastEmployer === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter Last Employer',
      });
    } else if (experience && currentCtc === '') {
      Toast.show({
        type: 'error',
        text1: 'Plaese enter Current CTC',
      });
    } else {
      return true;
    }
  };

  const interviewLocataionClick = () => {
    console.log('stateValue', stateValue);
    if (stateValue === 0) {
      Toast.show({
        type: 'error',
        text1: 'Please select state',
      });
    } else {
      const loactionData = {
        txnId: '',
        jobId: route.params.jobId,
        location: '',
        userId: '',
        operFlag: 'V',
      };

      dispatch(getLocationList(loactionData));
    }
  };

  useEffect(() => {
    // console.log('locationResult', locationListData);[]
    if (locationListData.length > 0) {
      setLocationBottomView(true);
    }
  }, [locationListData]);

  const onSubmit = async () => {
    if (isFormValidated()) {
      var formData = new FormData();
      formData.append('fileUpload', resume);
      formData.append(
        'data',
        JSON.stringify({
          fname: firstname,
          lname: lastName,
          email: email,
          phone: phone,
          add: address,
          country: countryValue,
          city: city,
          state: stateValue,
          pCode: postalCode,
          resumeName: resume?.name,
          dPay: desiredPay,
          education: higherEducationObtainedValue,
          clgName: college,
          refName: reference1,
          userId: '',
          oper: 'A',
          candiateId: '',
          status: 'A',
          martialStatus: selectedMaritalstatus,
          dept: route.params.depId,
          gender: genderValue,
          fatherName: fatherName,
          currentEmplyeement: currentEmployer,
          latestEmplyeement: lastEmployer,
          ctc: currentCtc,
          aadhaar: aadharNum,
          dob: dob,
          jobId: route.params.jobId,
          grade: '',
          referMobileNo: ref1MobileNo,
          referEmailId: ref1Email,
          preferedLocation: selectLocation,
          refEmpCode: ref1EmpCode,
          exprienceType: experience ? 'Yes' : 'No',
          refEmployeeName2: reference2,
          refEmployeeCode2: ref2MobileNo,
          refMobileNo2: ref2MobileNo,
          refEmailId2: ref2Email,
          refEmployeeName3: '',
          refEmployeeCode3: '',
          refMobileNo3: '',
          refEmailId3: '',
          refEmployeeName4: '',
          refEmployeeCode4: '',
          refMobileNo4: '',
          refEmailId4: '',
          motherName: motherName,
          passMonth: bypass6month,
        }),
      );

      setSubmitLoader(true);
      try {
        let res = await fetch(`${API}/api/addCandidate`, {
          method: 'POST',
          body: formData,
        });

        const finalRes = await res?.json();
        console.log(finalRes);
        setSubmitLoader(false);
        if (finalRes) {
          Toast.show({
            type: finalRes?.Result[0]?.FLAG === 'S' ? 'success' : 'error',
            text1: finalRes?.Result[0]?.MSG,
          });
          // navigation.goBack();
        }
        {
          finalRes?.Result[0]?.CANDIDATE_ID &&
            showAlert({
              title: `Candidate ID- ${finalRes?.Result[0]?.CANDIDATE_ID}`,
              customIcon: 'none',
              message: 'Use this ID, Reset your password & Login to proceed.',
              alertType: 'error',
              btnLabel: 'ok',
              onPress: () => closeAlert(),
            });
        }
        setaadharNum('');
        setFirstname('');
        setLastName('');
        setFatherName('');
        setMotherName('');
        setDob('');
        setEmail('');
        setPhone('');
        setMaritialStatusValue(0);
        setCurrentEmployer('');
        setlastEmployer('');
        setCurrentCtc('');
        setAddress('');
        setGenderValue(0);
        setDesiredPay('');
        setCity('');
        setStateValue(0);
        setPostalCode('');
        setCollege('');
        setSelectLocation(0);
        loactaionBottomView(false);

        navigation.navigate('CandidateLogin');
      } catch (error) {
        // console.log(error);
        setSubmitLoader(false);
        Toast.show({
          type: 'error',
          text1: JSON.stringify(error),
          // text1: 'error',
        });
      }
    }
    // else {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Plesae fill all Mandatory feilds.',
    //   });
    // }
  };

  useEffect(() => {
    if (postTitle.length > 0 && route.params.jobId) {
      console.log('testttt');
      const filteredJob = postTitle?.filter(
        post => Number(post.PARAM_ID) === Number(route.params.jobId),
      );
      console.log('filteredJob', filteredJob);
      setSelectedPostTitle(filteredJob[0].PARAM_NAME);
      setSelectedPostTitleValue(filteredJob[0].PARAM_ID);
    }
  }, [route.params?.jobId, postTitle]);

  useEffect(() => {
    if (department.length > 0 && route.params.depId) {
      const filtereddept = department?.filter(
        post => Number(post.PARAM_ID) === Number(route.params.depId),
      );
      setSelectedDepartment(filtereddept[0].PARAM_NAME);
      setSelectedDepValue(filtereddept[0].PARAM_ID);
    }
  }, [route.params?.depId, department]);

  const getDropdownData = async P => {
    setPosttitleLoading(true);
    let response = await fetch(`${API}/api/User/getParam?getClaim=${P}`);
    response = await response.json();
    const returnedData = response;

    // console.log('Paramdeata', returnedData);

    if (P === 'C') {
      setPostTitle(returnedData);
      setPosttitleLoading(false);
    } else if (P === 18) {
      setGender(returnedData);
    } else if (P === 30) {
      setmaritalStatus(returnedData);
    } else if (P === 'A') {
      // console.log('Department', returnedData);
      setDepartment(returnedData);
    } else if (P === 7) {
      // console.log('ParamDatatattatat', returnedData);
      setState(returnedData);
    } else if (P === 33) {
      // console.log('ParamDatatattatat', returnedData);
      setHeigherEdu(returnedData);
    }
  };

  useEffect(() => {
    getDropdownData('C');
    getDropdownData(18);
    getDropdownData(30);
    getDropdownData('A');
    getDropdownData(7);
    getDropdownData(33);
  }, []);

  useEffect(() => {
    if (aadharNum.length === 12) {
      const data = {
        id_number: aadharNum,
      };

      dispatch(getAadharValidation(data));
    }
  }, [aadharNum]);

  useEffect(() => {
    if (aadharValidationResult?.status_code === 200) {
      console.log('aadahrresult', aadharValidationResult);
      setOtpBottomView(true);
    } else {
      {
        aadharValidationResult?.message &&
          Toast.show({
            type: 'error',
            text1: aadharValidationResult?.message,
          });
      }
    }
  }, [aadharValidationResult]);

  useEffect(() => {
    if (verifyOtpResult.success) {
      setFirstname(verifyOtpResult?.name?.split(' ')[0]?.trim());
      setLastName(verifyOtpResult?.name?.split(' ')[1]?.trim());
      setFatherName(verifyOtpResult?.careOff);
      setDob(verifyOtpResult?.dob);
      setAddress(verifyOtpResult?.address);
      setPostalCode(verifyOtpResult?.zip);

      if (gender?.length > 0 && verifyOtpResult?.gender) {
        const filteredgender = gender?.filter(
          post => post?.LOCAL_LANG === verifyOtpResult?.gender,
        );

        console.log('first', filteredgender);

        setSelectedGender(filteredgender[0]?.PARAM_NAME);
        setGenderValue(filteredgender[0]?.PARAM_ID);
      }
    } else {
      setaadharNum('');
    }
  }, [verifyOtpResult]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Header title={'Add Candidate'} />

      {submitLoader ? (
        // <View style={{alignItems: 'center', marginTop: '30%'}}>
        //   <ActivityIndicator color={COLORS.orange1} size={'large'} />
        //   <Text
        //     style={{
        //       ...FONTS.h3,
        //       fontWeight: '500',
        //       color: COLORS.orange1,
        //       marginTop: SIZES.base,
        //     }}>
        //     Loading your details
        //   </Text>
        // </View>

        <Loader loaderVisible={submitLoader} />
      ) : (
        <>
          <Loader loaderVisible={loading} />

          <KeyboardAwareScrollView
            // bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flex: 1,
              paddingHorizontal: SIZES.radius,
            }}>
            <ScrollView>
              <View>
                <Text style={[styles.caption, {color: COLORS.red}]}>
                  * Mandatory fields
                </Text>
                <FormInput
                  label="Aadhar No."
                  // placeholder={'xxxx-xxxx-xxxx'}
                  labelColor={COLORS.black}
                  value={aadharNum}
                  onChange={setaadharNum}
                  keyboardType={'numeric'}
                />

                {optBottomView && (
                  <BottomUpModal
                    isVisible={optBottomView}
                    onClose={() => {
                      setOtpBottomView(false);
                    }}>
                    <OtpBottomUpModal onPress={() => setOtpBottomView(false)} />
                  </BottomUpModal>
                )}
              </View>

              <View>
                <Text style={styles.caption}>Choose your experience</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: SIZES.base,
                    gap: SIZES.radius,
                  }}>
                  <TouchableOpacity
                    onPress={() => setExperience(!experience)}
                    style={{
                      borderWidth: 1,
                      borderColor: experience
                        ? COLORS.lightGray1
                        : COLORS.orange1,
                      padding: SIZES.base,
                      borderRadius: SIZES.base,
                    }}>
                    <Text
                      style={{
                        color: experience ? COLORS.gray : COLORS.black,
                      }}>
                      Fresher
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setExperience(!experience)}
                    style={{
                      borderWidth: 1,
                      borderColor: !experience
                        ? COLORS.lightGray1
                        : COLORS.orange1,
                      padding: SIZES.base,
                      borderRadius: SIZES.base,
                    }}>
                    <Text
                      style={{
                        color: !experience ? COLORS.gray : COLORS.black,
                      }}>
                      Experience
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TextDropdown
                caption={'Post Title'}
                data={postTitle}
                setData={setSelectedPostTitle}
                setIdvalue={setSelectedPostTitleValue}
                defaultButtonText={
                  posttitleLoading ? 'Loading...' : selectedPostTitle
                }
                captionStyle={styles.caption}
                disabled
                required
              />
              <FormInput
                label="First Name"
                placeholder={'First Name'}
                labelColor={COLORS.black}
                value={firstname}
                onChange={setFirstname}
                editable={false}
              />

              <FormInput
                label="Last Name"
                placeholder={'Last Name'}
                labelColor={COLORS.black}
                value={lastName}
                onChange={setLastName}
                editable={false}
              />

              <FormInput
                label="Father Name"
                placeholder={'Father Name'}
                labelColor={COLORS.black}
                value={fatherName}
                onChange={setFatherName}
                editable={false}
              />

              <FormInput
                label="Mother Name"
                placeholder={'Mother Name'}
                labelColor={COLORS.black}
                value={motherName}
                inputStyle={{color: COLORS.black}}
                onChange={setMotherName}
                editable={true}
              />

              {/* <DateButton
                caption={'Date of Birth'}
                date={dob}
                setDate={setDob}
                captionStyle={styles.caption}
                required={true}
              /> */}

              <FormInput
                label="Date of Birth"
                placeholder={'Email'}
                labelColor={COLORS.black}
                value={dob}
                onChange={setDob}
                editable={false}
              />

              <FormInput
                label="Email"
                placeholder={'Email'}
                labelColor={COLORS.black}
                value={email}
                onChange={setEmail}
              />

              <TextDropdown
                caption={'Gender'}
                data={gender}
                setData={setSelectedGender}
                setIdvalue={setGenderValue}
                defaultButtonText={selectedGender}
                captionStyle={styles.caption}
                required
                disabled
              />

              <FormInput
                label="Phone"
                placeholder={'Phone'}
                labelColor={COLORS.black}
                value={phone}
                onChange={setPhone}
                keyboardType={'numeric'}
              />

              <TextDropdown
                caption={'Marital Status'}
                data={maritalStatus}
                setData={setSelectedMaritalstatus}
                setIdvalue={setMaritialStatusValue}
                defaultButtonText={selectedMaritalstatus}
                captionStyle={styles.caption}
                required
              />

              {/* <FormInput
      label="Department"
      placeholder={'Depatment'}
      labelColor={COLORS.black}
      value={'IT'}
      editable={false}
    /> */}

              <TextDropdown
                caption={'Department'}
                data={department}
                setData={setSelectedDepartment}
                setIdvalue={setSelectedDepValue}
                defaultButtonText={selectedDepartment}
                captionStyle={styles.caption}
                disabled
                required
              />

              {experience && (
                <>
                  <FormInput
                    label="Current Employer"
                    placeholder={'Current Employer'}
                    labelColor={COLORS.black}
                    value={currentEmployer}
                    onChange={setCurrentEmployer}
                  />

                  <FormInput
                    label="Last Employer"
                    placeholder={'Last Employer'}
                    labelColor={COLORS.black}
                    value={lastEmployer}
                    onChange={setlastEmployer}
                  />

                  <FormInput
                    label="Current CTC(Monthly)"
                    placeholder={'Current CTC(Monthly)'}
                    labelColor={COLORS.black}
                    value={currentCtc}
                    onChange={setCurrentCtc}
                    keyboardType={'numeric'}
                  />
                </>
              )}

              <FormInput
                label="Address"
                placeholder={'Address'}
                labelColor={COLORS.black}
                value={address}
                onChange={setAddress}
                multiline
                inputStyle={{height: 120}}
              />
              <FormInput
                label="Desired Pay (Monthly)"
                placeholder={''}
                labelColor={COLORS.black}
                value={desiredPay}
                onChange={setDesiredPay}
                required={false}
                keyboardType={'numeric'}
              />

              {/* <TextDropdown
      caption={'Country'}
      data={countryData}
      setData={setCountry}
      setIdvalue={setCountryValue}
      defaultButtonText={country}
      captionStyle={styles.caption}
    /> */}

              <FormInput
                label="Country"
                placeholder={'Country'}
                labelColor={COLORS.black}
                value={'India'}
                onChange={setCountry}
                editable={false}
              />

              <FormInput
                label="City"
                placeholder={'City'}
                labelColor={COLORS.black}
                value={city}
                onChange={setCity}
              />

              <TextDropdown
                caption={'State'}
                data={state}
                search={true}
                setData={setSelectedState}
                setIdvalue={setStateValue}
                defaultButtonText={selectedState}
                captionStyle={styles.caption}
                required
                // searchPlaceholder={'Search state...'}
              />

              <FormInput
                label="Postal Code"
                placeholder={'Postal Code'}
                labelColor={COLORS.black}
                value={postalCode}
                onChange={setPostalCode}
                editable={false}
                keyboardType={'numeric'}
              />

              <View
                style={{
                  marginVertical: SIZES.base,
                }}>
                <Text style={styles.caption}>
                  Resume <Text style={{color: COLORS.red, ...FONTS.h3}}>*</Text>
                </Text>
                {resume?.name ? (
                  <View
                    style={{
                      paddingVertical: SIZES.radius * 1.3,
                      borderWidth: 1,
                      borderRadius: SIZES.radius,
                      borderColor: COLORS.lightGray1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: SIZES.radius,
                    }}>
                    <Text
                      style={{
                        color: COLORS.darkGray2,
                      }}>
                      {resume.name.slice(0, 12)}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: SIZES.padding,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setResume({});
                        }}>
                        <Image
                          source={icons.cross}
                          style={{
                            height: 25,
                            width: 25,
                            tintColor: COLORS.red,
                          }}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          backgroundColor: COLORS.disableOrange1,
                          padding: SIZES.base,
                          borderRadius: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={esignIcon}
                          style={{
                            height: 44,
                            width: 44,
                            tintColor: COLORS.orange,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => selectResume()}
                    style={{
                      paddingVertical: SIZES.radius * 1.3,
                      borderWidth: 1,
                      borderRadius: SIZES.radius,
                      borderColor: COLORS.lightGray1,
                    }}>
                    <Text
                      style={{
                        marginLeft: SIZES.padding,
                        color: COLORS.gray,
                      }}>
                      Upload Resume
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <TextDropdown
                caption={'Higher education obtained'}
                data={heigherEdu}
                setData={setHigherEducationObtained}
                setIdvalue={setHigherEducationObtainedValue}
                defaultButtonText={higherEducationObtained}
                captionStyle={styles.caption}
                required
              />

              <FormInput
                label="College/University"
                placeholder={'College/University'}
                labelColor={COLORS.black}
                value={college}
                onChange={setCollege}
              />
              {/* <Text>{typeInterview}</Text> */}
              {typeInterview == 366 ? (
                <View>
                  <TouchableOpacity onPress={() => interviewLocataionClick()}>
                    <LinearGradient
                      angle={45}
                      useAngle={true}
                      style={{
                        height: 55,
                        marginTop: 20,
                        justifyContent: 'center',

                        borderRadius: SIZES.base,
                      }}
                      colors={[COLORS.green, COLORS.lightGreen]}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingHorizontal: 10,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              color: COLORS.white,
                              ...FONTS.body4,
                              fontSize: 16,
                            }}>
                            Interview Location
                          </Text>
                          <Text
                            style={{
                              color: COLORS.red,
                              ...FONTS.h4,
                              fontSize: 16,
                              padding: 4,
                            }}>
                            *
                          </Text>

                          {locationLoading ? (
                            <ActivityIndicator
                              size={'small'}
                              color={COLORS.white}
                            />
                          ) : (
                            ''
                          )}
                        </View>

                        <Micons
                          name="map-marker-radius-outline"
                          size={25}
                          color={COLORS.white}
                        />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>

                  {loactaionBottomView && (
                    <BottomUpModal
                      isVisible={loactaionBottomView}
                      onClose={() => {
                        setLocationBottomView(false);
                      }}>
                      <LocationBottomUpModal
                        onPress={() => setLocationBottomView(false)}
                        locationData={locationListData}
                        selectLocation={selectLocation}
                        setSelectLocation={setSelectLocation}
                      />
                    </BottomUpModal>
                  )}
                </View>
              ) : (
                ''
              )}
              <View>
                <FormInput
                  label="Reference 1"
                  // placeholder={'Postal Code'}
                  labelColor={COLORS.black}
                  value={reference1}
                  onChange={setReference1}
                  required={false}
                />

                <FormInput
                  label="Reference 1 Satya Employee Code"
                  // placeholder={'Postal Code'}
                  labelColor={COLORS.black}
                  value={ref1EmpCode}
                  onChange={setRef1EmpCode}
                  required={false}
                />
                <FormInput
                  label="Reference 1 Mobile Number"
                  // placeholder={'Postal Code'}
                  labelColor={COLORS.black}
                  value={ref1MobileNo}
                  onChange={setRef1MobileNo}
                  required={false}
                />
                <FormInput
                  label="Reference 1 Email Id"
                  // placeholder={'Postal Code'}
                  labelColor={COLORS.black}
                  value={ref1Email}
                  onChange={setRef1Email}
                  required={false}
                />

                <FormInput
                  label="Reference 2"
                  // placeholder={'Postal Code'}
                  labelColor={COLORS.black}
                  value={reference2}
                  onChange={setReference2}
                  required={false}
                />

                <FormInput
                  label="Reference 2 Satya Employee Code"
                  // placeholder={'Postal Code'}
                  labelColor={COLORS.black}
                  value={ref2EmpCode}
                  onChange={setRef2EmpCode}
                  required={false}
                />
                <FormInput
                  label="Reference 2 Mobile Number"
                  // placeholder={'Postal Code'}
                  labelColor={COLORS.black}
                  value={ref2MobileNo}
                  onChange={setRef2MobileNo}
                  required={false}
                />
                <FormInput
                  label="Reference 2 Email Id"
                  // placeholder={'Postal Code'}
                  labelColor={COLORS.black}
                  value={ref2Email}
                  onChange={setRef2Email}
                  required={false}
                />

                {/* <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() =>
            setBypass6month(bypass6month == 'true' ? 'false' : 'true')
          }
          style={{
            alignItems: 'center',
            width: responsiveWidth(96),
            padding: SIZES.font,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: COLORS.green,
              ...FONTS.body3,
              textAlign: 'center',
            }}>
            Bypass 6 month
          </Text>
          {bypass6month === 'true' ? (
            <Micons
              name="checkbox-marked-circle-outline"
              size={25}
              color={COLORS.orange}
            />
          ) : (
            <Micons
              name="checkbox-blank-circle-outline"
              size={25}
              color={COLORS.orange}
            />
          )}
         
        </TouchableOpacity>
      </View> */}
              </View>
            </ScrollView>

            <View
              style={{
                backgroundColor: COLORS.white,
                width: responsiveWidth(100),
                alignSelf: 'center',
                paddingVertical: SIZES.base,
              }}>
              <TouchableOpacity
                onPress={onSubmit}
                disabled={
                  typeInterview == 366 && selectLocation == 0 ? true : false
                }>
                <LinearGradient
                  style={{
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.radius,
                    marginHorizontal: SIZES.radius,
                  }}
                  colors={
                    typeInterview == 366 && selectLocation == 0
                      ? [COLORS.gray, COLORS.gray]
                      : [COLORS.orange1, COLORS.lightOrange]
                  }>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}>
                    Submit
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </>
      )}
    </View>
  );
};
export default Signup;

const styles = StyleSheet.create({
  caption: {color: COLORS.black, ...FONTS.h4},
});
