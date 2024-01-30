import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import Header from '../../components/Header';
import {COLORS, FONTS, SIZES} from '../../constants';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../components/Loader';
import {API} from '../../utility/services';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import DateButton from '../../components/DateButton';
import TextDropdown from '../../components/TextDropdown';
import {showAlert, closeAlert} from 'react-native-customisable-alert';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import SelectDropdown from 'react-native-select-dropdown';
import {getCandidateBasicDetails} from '../../redux/candidatSlice';
import axios from 'axios';

const Candidate_basic_info = ({route}) => {
  const {candidateId} = route.params;
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);

  const {candidateBasicDetailsResult, cbdloading} = useSelector(
    state => state.candidateInfo,
  );

  const [filledDetails, setFilledDetails] = useState('');

  const [experience, setExperience] = useState('NO');

  const [marital, setMarital] = useState([]);
  const [selectedMarital, setSelectedMarital] = useState();
  const [selectedMaritalValue, setSelectedMaritalValue] = useState();

  const [bloodGroup, setBloodGroup] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [selectedBloodGroupValue, setSelectedBloodGroupValue] = useState('');

  const [caste, setCaste] = useState([]);
  const [selectedCaste, setSelectedCaste] = useState();
  const [selectedCasteValue, setSelectedCasteValue] = useState();

  const [gender, setGender] = useState([]);
  const [selectedGender, setSelectedGender] = useState();
  const [selectedGenderValue, setSelectedGenderValue] = useState('s');

  const [refAddressHeight, setRefAddressHeight] = useState(40);
  const [refAddressHeight1, setRefAddressHeight1] = useState(40);
  const [pLocationHeight, setPLocationHeight] = useState(40);
  const [cLocationHeight, setCLocationHeight] = useState(40);

  const [salutation, setSalutation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');

  // const [actualBirthDate, setActualBirthDate] = useState(new Date());
  const [actualBirthDate, setActualBirthDate] = useState('');
  const [selectedActualBirthDate, setSelectedActualBirthDate] = useState('');
  const [actualOpen, setActualOpen] = useState(false);

  const [recordBirthDate, setRecordBirthDate] = useState(new Date());
  const [selectedRecordBirthDate, setSelectedRecordBirthDate] = useState('');
  const [recordOpen, setRecordOpen] = useState(false);

  const [marriageDate, setMarriageDate] = useState('');

  const [department, setDepartment] = useState('');

  const [phone, setPhone] = useState('');

  const [aadharNo, setAadharNo] = useState('');

  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');

  const [desiredPay, setDesiredPay] = useState('');
  const [highestEducationObtained, setHighestEducationObtained] = useState('');
  const [college, setCollege] = useState('');

  const [currentEmployer, setCurrentEmployer] = useState('');
  const [lastEmployer, setLastEmployer] = useState('');
  const [currentCtc, setCurrentCtc] = useState('');

  const [countryBirth, setCountryBirth] = useState('');
  const [placeBirth, setPlaceBirth] = useState('');
  const [identityMarks, setIdentityMarks] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [resumeSource, setResumeSource] = useState('');
  const [refEmail, setRefEmail] = useState('');
  const [refEmail1, setRefEmail1] = useState('');
  const [refName, setRefName] = useState('');
  const [refName1, setRefName1] = useState('');
  const [refOccupation, setRefOccupation] = useState('');
  const [refOccupation1, setRefOccupation1] = useState('');
  const [refAddress, setRefAddress] = useState('');
  const [refAddress1, setRefAddress1] = useState('');
  const [refContact, setRefContact] = useState('');
  const [refContact1, setRefContact1] = useState('');
  const [TXNID, setTXNID] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [operFlag, setOperFlag] = useState('P');
  const [approvalFlag, setApprovalFlag] = useState('');
  const [approveRemark, setApproveRemark] = useState('');
  const [refEmpCode1, setRefEmpCode1] = useState('');
  const [refEmpCode2, setRefEmpCode2] = useState('');
  const [canMotherName, setCanMotherName] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [email, setEmail] = useState('');

  const salutationList = ['Miss', 'Mr.', 'Mrs.'];

  const getDropdownData = async P => {
    let response = await fetch(`${API}/api/User/getParam?getClaim=${P}`);
    response = await response.json();
    const returnedData = response;
    if (P === 18) {
      setGender(returnedData);
    } else if (P === 30) {
      setMarital(returnedData);
    } else if (P === 31) {
      setBloodGroup(returnedData);
    } else {
      setCaste(returnedData);
    }
  };

  const DisplayPreviousDetails = () => {
    filledDetails &&
      (filledDetails.FLAG === 'S' ? setOperFlag('E') : setOperFlag('P'),
      console.log('firstNam13333333333333333', filledDetails?.Table[0]),
      setExperience(filledDetails?.Table[0]?.EXPERIENCE_TYPE),
      setSalutation(filledDetails?.Table[0]?.SALUTATION),
      setFirstName(filledDetails?.Table[0]?.FIRST_NAME),
      setMiddleName(filledDetails?.Table[0]?.MIDDLE_NAME),
      setPostTitle(filledDetails?.Table[0]?.JOB_TITLE),
      setLastName(filledDetails?.Table[0]?.LAST_NAME),
      setFatherName(filledDetails?.Table[0]?.FATHER_NAME),
      setDepartment(filledDetails?.Table[0]?.DEPARTMENT_NAME),
      setCurrentEmployer(filledDetails?.Table[0]?.CURRENT_EMPLOYEEMENT),
      setLastEmployer(filledDetails?.Table[0]?.LATEST_EMPLOYEEMENT),
      setCurrentCtc(filledDetails?.Table[0]?.CTC),
      setPhone(filledDetails?.Table[0]?.PHONE),
      setAadharNo(filledDetails?.Table[0]?.AADHAR),
      setAddress(filledDetails?.Table[0]?.ADRESS),
      setCountry(filledDetails?.Table[0]?.COUNTRY_NAME),
      setCity(filledDetails?.Table[0]?.CITY),
      setState(filledDetails?.Table[0]?.STATE_NAME),
      setPostalCode(filledDetails?.Table[0]?.POSTAL_CODE),
      setDesiredPay(filledDetails?.Table[0]?.DESIREDPAY),
      setHighestEducationObtained(filledDetails?.Table[0]?.HIGHEST_EDUCATION),
      setCollege(filledDetails?.Table[0]?.BORAD_UNIVERSITY),
      setSelectedActualBirthDate(filledDetails?.Table[0]?.ACTUAL_BIRTH_DATE),
      setSelectedRecordBirthDate(filledDetails?.Table[0]?.RECORD_BIRTH_DATE),
      setCountryBirth(filledDetails?.Table[0]?.BIRTH_COUNTRY),
      setPlaceBirth(filledDetails?.Table[0]?.BIRTH_PLACE),
      setIdentityMarks(filledDetails?.Table[0]?.IDENTIFICATION_MARKS),
      setCurrentLocation(filledDetails?.Table[0]?.CURRENT_LOCATION),
      setMarriageDate(filledDetails?.Table[0]?.MARRIAGE_DATE),
      setPreferredLocation(filledDetails?.Table[0]?.PREFERRED_LOCATION),
      setRefAddress(filledDetails?.Table[0]?.REF_ADDRESS),
      setRefAddress1(filledDetails?.Table[0]?.REF_ADDRESS1),
      setRefContact(filledDetails?.Table[0]?.REF_CONTACT_NO),
      setRefContact1(filledDetails?.Table[0]?.REF_CONTACT_NO1),
      setRefEmail(filledDetails?.Table[0]?.REF_EMAIL_ID),
      setRefEmail1(filledDetails?.Table[0]?.REF_EMAIL_ID1),
      setRefName(filledDetails?.Table[0]?.REF_NAME),
      setRefName1(filledDetails?.Table[0]?.REF_NAME1),
      setRecordBirthDate(filledDetails?.Table[0]?.DOB),
      setEmail(filledDetails?.Table[0]?.EMAIL),
      setRefOccupation(filledDetails?.Table[0]?.REF_OCCUPATION),
      setRefOccupation1(filledDetails?.Table[0]?.REF_OCCUPATION1),
      setResumeSource(filledDetails?.Table[0]?.RESUME_SOURCE),
      setSelectedMarital(filledDetails?.Table[0]?.MARITAL_STATUS),
      setSelectedMaritalValue(filledDetails?.Table[0]?.MARITAL_STATUS_ID),
      setSelectedCasteValue(filledDetails?.Table[0]?.CATEGORY_ID),
      setSelectedCaste(filledDetails?.Table[0]?.CATEGORY_NAME),
      setSelectedBloodGroup(filledDetails?.Table[0]?.BLOOD_GROUP),
      setSelectedBloodGroupValue(filledDetails?.Table[0]?.BLOOD_GROUP_ID),
      setSelectedGender(filledDetails?.Table[0]?.GENDER),
      setSelectedGenderValue(filledDetails?.Table[0]?.GENDER_ID),
      setTXNID(filledDetails?.Table[0]?.TXN_ID),
      setCanMotherName(filledDetails?.Table[0]?.MOTHER_NAME),
      setRefEmpCode1(filledDetails?.Table[0]?.REF_EMP_CODE_1),
      setRefEmpCode2(filledDetails?.Table[0]?.REF_EMP_CODE_2),
      setLoaderVisible(false));
  };

  const fetchPersonalData = async () => {
    try {
      let reqdata = {userId: userId, candiateId: candidateId, oper: 'V'};
      var formDatanew = new FormData();
      console.log(reqdata);
      formDatanew.append('data', JSON.stringify(reqdata));
      let res = await fetch(`${API}/api/addCandidate`, {
        method: 'POST',
        body: formDatanew,
      });
      res = await res.json();
      // res = await res?.Result[0];
      setFilledDetails(res);
      // console.log('resposneseeee207777777', res);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
  };

  useEffect(() => {
    fetchPersonalData();
    getDropdownData(18);
    getDropdownData(30);
    getDropdownData(31);
    getDropdownData(32);
  }, []);

  useEffect(() => {
    DisplayPreviousDetails();
  }, [filledDetails]);

  const recordDateSelector = date => {
    setRecordOpen(false);
    let newDate = date.toDateString().split(' ');
    newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3];
    setSelectedRecordBirthDate(newDate);
    setRecordBirthDate(date);
  };

  return (
    <View style={{flex: 1}}>
      <Header title={'Candidate Infromation'} />
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
        <ScrollView>
          <View style={{flex: 1, padding: 10}}>
            <View>
              <Text style={{color: COLORS.green, ...FONTS.h5}}>Experience</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 20,
                }}>
                <View
                  style={{
                    height: 40,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    borderRadius: SIZES.base,
                    borderColor:
                      experience !== 'Yes' ? COLORS.orange1 : COLORS.lightGray1,
                    borderWidth: 1,
                  }}>
                  <Text>Fresher</Text>
                </View>

                <View
                  style={{
                    height: 40,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    borderRadius: SIZES.base,
                    borderColor:
                      experience === 'Yes' ? COLORS.orange1 : COLORS.lightGray1,
                    borderWidth: 1,
                  }}>
                  <Text>Experience</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                margin: 3,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Post Title
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 500,
                    }}>
                    *
                  </Text>
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={postTitle}
                  onChangeText={val => setPostTitle(val)}
                  editable={false}
                />
              </View>
              <View
                style={{
                  width: '48%',
                  paddingHorizontal: 3,
                }}>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h5,
                  }}>
                  First Name{' '}
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: 500,
                    }}>
                    *
                  </Text>
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={firstName}
                  onChangeText={val => setFirstName(val)}
                  editable={false}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                margin: 3,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '100%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Last Name
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={lastName}
                  onChangeText={val => setLastName(val)}
                  editable={false}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                margin: 3,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Father Name{' '}
                  <Text style={{color: 'red', fontWeight: 500}}>*</Text>
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={fatherName}
                  onChangeText={val => setFatherName(val)}
                  editable={false}
                />
              </View>

              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Mother's Name{' '}
                  <Text style={{color: 'red', fontWeight: 500}}>*</Text>
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={canMotherName}
                  onChangeText={val => setCanMotherName(val)}
                  editable={false}
                />
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Date of Birth
                  <Text style={{color: 'red', fontWeight: 500}}>*</Text>
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={recordBirthDate}
                  onChangeText={val => setRecordBirthDate(val)}
                  editable={false}
                />
              </View>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Email
                  <Text style={{color: 'red', fontWeight: 500}}>*</Text>
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={email}
                  onChangeText={val => setEmail(val)}
                  editable={false}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h5,
                    marginTop: 10,
                    marginBottom: 4,
                  }}>
                  Gender
                </Text>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                    borderWidth: 1,
                  }}>
                  <Text>{selectedGender}</Text>
                </View>
              </View>
              {/* <View style={{ width: '48%', paddingHorizontal: 3 }}>
                            <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Country of Birth</Text>
                            <TextInput style={styles.inputHolder} value={countryBirth} onChangeText={(val) => setCountryBirth(val)} />
                        </View> */}
              {/* <View style={{width: '98%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Place of Birth
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={placeBirth}
                  onChangeText={val => setPlaceBirth(val)}
                />
              </View> */}

              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h5,
                    marginTop: 10,
                    marginBottom: 4,
                  }}>
                  Phone
                </Text>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                    borderWidth: 1,
                  }}>
                  <Text>{phone}</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                margin: 3,
                justifyContent: 'space-between',
              }}>
              {/* <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Identification Marks
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={identityMarks}
                  onChangeText={val => setIdentityMarks(val)}
                />
              </View> */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 3,
                marginRight: 3,
                marginTop: -10,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h5,
                    marginTop: 10,
                    marginBottom: 4,
                  }}>
                  Maritial Status
                </Text>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                    borderWidth: 1,
                  }}>
                  <Text>{selectedMarital}</Text>
                </View>
              </View>

              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h5,
                    marginTop: 10,
                    marginBottom: 4,
                  }}>
                  Department
                </Text>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                    borderWidth: 1,
                  }}>
                  <Text>{department}</Text>
                </View>
              </View>
            </View>

            {experience === 'Yes' && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: '48%', paddingHorizontal: 3}}>
                    <Text
                      style={{
                        color: COLORS.green,
                        ...FONTS.h5,
                        marginTop: 10,
                        marginBottom: 4,
                      }}>
                      Current Employer
                    </Text>
                    <View
                      style={{
                        height: 40,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: SIZES.base,
                        borderWidth: 1,
                      }}>
                      <Text>{currentEmployer}</Text>
                    </View>
                  </View>

                  <View style={{width: '48%', paddingHorizontal: 3}}>
                    <Text
                      style={{
                        color: COLORS.green,
                        ...FONTS.h5,
                        marginTop: 10,
                        marginBottom: 4,
                      }}>
                      Last Employer
                    </Text>
                    <View
                      style={{
                        height: 40,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: SIZES.base,
                        borderWidth: 1,
                      }}>
                      <Text>{lastEmployer}</Text>
                    </View>
                  </View>
                </View>

                <View style={{width: '99%', paddingHorizontal: 3}}>
                  <Text
                    style={{
                      color: COLORS.green,
                      ...FONTS.h5,
                      marginTop: 10,
                      marginBottom: 4,
                    }}>
                    Current CTC(monthly)
                  </Text>
                  <View
                    style={{
                      height: 40,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: SIZES.base,
                      borderWidth: 1,
                    }}>
                    <Text>{currentCtc}</Text>
                  </View>
                </View>
              </>
            )}

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 5,
                  justifyContent: 'space-between',
                }}></View>

              <Text
                style={{
                  color: COLORS.green,
                  ...FONTS.h5,
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                  marginTop: -5,
                }}>
                Interview Location
              </Text>

              <TextInput
                style={[
                  styles.inputHolder,
                  {
                    marginVertical: 3,
                    marginHorizontal: 7,
                    height: cLocationHeight,
                  },
                ]}
                multiline={true}
                onContentSizeChange={event => {
                  setCLocationHeight(event.nativeEvent.contentSize.height);
                }}
                value={currentLocation}
                onChangeText={val => setCurrentLocation(val)}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '99%', paddingHorizontal: 3}}>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h5,
                    marginTop: 10,
                    marginBottom: 4,
                  }}>
                  Aadhar No.
                </Text>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                    borderWidth: 1,
                  }}>
                  <Text>{aadharNo}</Text>
                </View>
              </View>
              {/* <View style={{ width: '48%', paddingHorizontal: 3 }}>
                            <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Country of Birth</Text>
                            <TextInput style={styles.inputHolder} value={countryBirth} onChangeText={(val) => setCountryBirth(val)} />
                        </View> */}
              {/* <View style={{width: '98%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Place of Birth
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={placeBirth}
                  onChangeText={val => setPlaceBirth(val)}
                />
              </View> */}
            </View>

            <View style={{width: '99%', paddingHorizontal: 3}}>
              <Text
                style={{
                  color: COLORS.green,
                  ...FONTS.h5,
                  marginTop: 10,
                  marginBottom: 4,
                }}>
                Address
              </Text>
              <View
                style={{
                  height: 40,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: SIZES.base,
                  borderWidth: 1,
                }}>
                <Text>{address}</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h5,
                    marginTop: 10,
                    marginBottom: 4,
                  }}>
                  Country
                </Text>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                    borderWidth: 1,
                  }}>
                  <Text>{country}</Text>
                </View>
              </View>

              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h5,
                    marginTop: 10,
                    marginBottom: 4,
                  }}>
                  City
                </Text>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                    borderWidth: 1,
                  }}>
                  <Text>{city}</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h5,
                    marginTop: 10,
                    marginBottom: 4,
                  }}>
                  State
                </Text>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                    borderWidth: 1,
                  }}>
                  <Text>{state}</Text>
                </View>
              </View>

              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h5,
                    marginTop: 10,
                    marginBottom: 4,
                  }}>
                  Postal Code
                </Text>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                    borderWidth: 1,
                  }}>
                  <Text>{postalCode}</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h5,
                    marginTop: 10,
                    marginBottom: 4,
                  }}>
                  Desired pay
                </Text>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                    borderWidth: 1,
                  }}>
                  <Text>{desiredPay}</Text>
                </View>
              </View>

              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h5,
                    marginTop: 10,
                    marginBottom: 4,
                  }}>
                  Highest Education Obtained
                </Text>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                    borderWidth: 1,
                  }}>
                  <Text>{highestEducationObtained}</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '100%', paddingHorizontal: 3}}>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h5,
                    marginTop: 10,
                    marginBottom: 4,
                  }}>
                  Collge/University
                </Text>
                <View
                  style={{
                    height: 40,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                    borderWidth: 1,
                  }}>
                  <Text>{college}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputHolder: {
    borderWidth: 1,
    height: 40,
    borderColor: COLORS.black,
    color: COLORS.darkGray,
    borderRadius: 8,
  },
});

export default Candidate_basic_info;
