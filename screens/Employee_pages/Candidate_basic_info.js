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

  useEffect(() => {
    fetchPersonalData();
    DisplayPreviousDetails();
    getDropdownData(18);
    getDropdownData(30);
    getDropdownData(31);
    getDropdownData(32);
  }, []);

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

  const DisplayPreviousDetails = () => {
    filledDetails &&
      (filledDetails.FLAG === 'S' ? setOperFlag('E') : setOperFlag('P'),
      console.log('firstNam13333333333333333', filledDetails?.Table[0]),
      setSalutation(filledDetails?.Table[0]?.SALUTATION),
      setFirstName(filledDetails?.Table[0]?.FIRST_NAME),
      setMiddleName(filledDetails?.Table[0]?.MIDDLE_NAME),
      setPostTitle(filledDetails?.Table[0]?.JOB_TITLE),
      setLastName(filledDetails?.Table[0]?.LAST_NAME),
      setFatherName(filledDetails?.Table[0]?.FATHER_NAME),
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
                margin: 3,
                justifyContent: 'space-between',
              }}>
              {/* <View style={{ width: '48%', paddingHorizontal: 3 }}>
                            <Text style={{ color: COLORS.green, ...FONTS.h5 }}>Country of Birth</Text>
                            <TextInput style={styles.inputHolder} value={countryBirth} onChangeText={(val) => setCountryBirth(val)} />
                        </View> */}
              <View style={{width: '98%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Place of Birth
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={placeBirth}
                  onChangeText={val => setPlaceBirth(val)}
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
                  Identification Marks
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={identityMarks}
                  onChangeText={val => setIdentityMarks(val)}
                />
              </View>
              <View
                style={{width: '48%', paddingHorizontal: 3, marginTop: -15}}>
                <TextDropdown
                  caption={'Gender'}
                  data={gender}
                  setData={setSelectedGender}
                  setIdvalue={setSelectedGenderValue}
                  defaultButtonText={selectedGender}
                  captionStyle={{color: COLORS.green, ...FONTS.h5}}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 3,
                marginRight: 3,
                marginTop: -10,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '50%', paddingHorizontal: 3}}>
                <TextDropdown
                  caption={'Marital Status'}
                  data={marital}
                  setData={setSelectedMarital}
                  setIdvalue={setSelectedMaritalValue}
                  defaultButtonText={selectedMarital}
                  captionStyle={{color: COLORS.green, ...FONTS.h5}}
                />
              </View>

              <View style={{width: '48%', paddingHorizontal: 3}}>
                <DateButton
                  caption={'Date of Marriage'}
                  date={marriageDate}
                  setDate={setMarriageDate}
                  isShow={false}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 3,
                marginRight: 3,
                marginTop: -10,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '100%', paddingHorizontal: 3}}>
                <TextDropdown
                  caption={'Blood Group'}
                  data={bloodGroup}
                  setData={setSelectedBloodGroup}
                  setIdvalue={setSelectedBloodGroupValue}
                  defaultButtonText={selectedBloodGroup}
                  captionStyle={{color: COLORS.green, ...FONTS.h5}}
                />
              </View>
            </View>

            <Text
              style={{
                color: COLORS.green,
                ...FONTS.h5,
                paddingHorizontal: 6,
                paddingVertical: 3,
                marginTop: -5,
              }}>
              Current Location
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

            {/* / */}

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 3,
                marginRight: 3,
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
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
                  Reference Name 1
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={refName}
                  onChangeText={val => setRefName(val)}
                />
              </View>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Reference Occupation 1
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={refOccupation}
                  onChangeText={val => setRefOccupation(val)}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 3,
                marginRight: 3,
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Reference Contact No. 1
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={refContact}
                  onChangeText={val => setRefContact(val)}
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Ref Email ID 1
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={refEmail}
                  onChangeText={val => setRefEmail(val)}
                  keyboardType="email-address"
                  maxLength={50}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 3,
                marginRight: 3,
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Reference Emp code 1
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={refEmpCode1}
                  onChangeText={val => setRefEmpCode1(val)}
                  maxLength={50}
                  editable={true}
                />
              </View>

              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h5,
                    paddingHorizontal: 6,
                    paddingVertical: 3,
                  }}>
                  Reference Address 1
                </Text>
                <TextInput
                  style={[styles.inputHolder, {marginTop: -5}]}
                  multiline={true}
                  onContentSizeChange={event => {
                    setRefAddressHeight(event.nativeEvent.contentSize.height);
                  }}
                  value={refAddress}
                  onChangeText={val => setRefAddress(val)}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 3,
                marginRight: 3,
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Reference Name 2
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={refName1}
                  onChangeText={val => setRefName1(val)}
                />
              </View>
              <View style={{width: '48%', paddingHorizontal: 2}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Reference Occupation 2
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={refOccupation1}
                  onChangeText={val => setRefOccupation1(val)}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 3,
                marginRight: 3,
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Ref Email ID 2
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={refEmail1}
                  onChangeText={val => setRefEmail1(val)}
                  keyboardType="email-address"
                  maxLength={50}
                />
              </View>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Reference Contact No.2
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={refContact1}
                  onChangeText={val => setRefContact1(val)}
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 3,
                marginRight: 3,
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text style={{color: COLORS.green, ...FONTS.h5}}>
                  Reference Emp code 2
                </Text>
                <TextInput
                  style={styles.inputHolder}
                  value={refEmpCode2}
                  onChangeText={val => setRefEmpCode2(val)}
                  maxLength={50}
                  editable={true}
                />
              </View>

              <View style={{width: '48%', paddingHorizontal: 3}}>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h5,
                    paddingHorizontal: 6,
                    paddingVertical: 3,
                  }}>
                  Reference Address 2
                </Text>
                <TextInput
                  style={[styles.inputHolder, {marginTop: -5}]}
                  multiline={true}
                  onContentSizeChange={event => {
                    setRefAddressHeight1(event.nativeEvent.contentSize.height);
                  }}
                  value={refAddress1}
                  onChangeText={val => setRefAddress1(val)}
                />
              </View>
            </View>

            <TouchableOpacity
              style={{marginLeft: 20, marginRight: 20, marginBottom: 40, display:'none'}}
              onPress={() => savePersonalDetails()}>
              <LinearGradient
                colors={[COLORS.orange1, COLORS.disableOrange1]}
                start={{x: 0, y: 0}}
                end={{x: 2, y: 0}}
                style={{borderRadius: 8, padding: 10, marginTop: 20}}>
                <Text
                  style={{
                    color: COLORS.white,
                    textAlign: 'center',
                    ...FONTS.body3,
                  }}>
                  Update Personal Details
                </Text>
              </LinearGradient>
            </TouchableOpacity>
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
