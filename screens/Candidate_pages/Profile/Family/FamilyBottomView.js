import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../../constants/theme';
import {FONTS, SIZES} from '../../../../constants/font_size';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import {API} from '../../../../utility/services';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import TextDropdown from '../../../../components/TextDropdown';
import Loader from '../../../../components/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {showAlert, closeAlert} from 'react-native-customisable-alert';

const FamilyBottomView = ({members, setMembers, onPress, fetchFamilyData}) => {
  const [showMembers, setShowMembers] = useState(true);
  // console.warn("The members", members);
  const userId = useSelector(state => state.candidateAuth.candidateId);
  // getting family member & bloodgroup
  const [familyMemberDropDown, setFamilyMemberDropDown] = useState([]);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState('');
  const [selectedFamilyMemberValue, setSelectedFamilyMemberValue] =
    useState('');
  const [bloodGroup, setBloodGroup] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [selectedBloodGroupValue, setSelectedBloodGroupValue] = useState('');
  const [gender, setGender] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedGenderValue, setSelectedGenderValue] = useState('');
  const [operFlag, setOperFlag] = useState('A');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [txnID, setTxnID] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedBirthDate, setSelectedBirthDate] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [approvalFlag, setApprovalFlag] = useState('');
  const [appRemark, setAppRemark] = useState('');

  // let newMember = { Member: null, FirstName: null, MiddleName: null, LastName: null, Gender: null, BirthDate: null, Contact: null, Address: null, BloodGroup: null }

  useEffect(() => {
    getDropdownData(31);
    getDropdownData(38);
    getDropdownData(18);
    getFamilyData();
  }, []);

  // family member, blood group & Gender data
  const getDropdownData = async P => {
    let response = await fetch(`${API}/api/User/getParam?getClaim=${P}`);
    response = await response.json();
    const returnedData = response;
    // console.warn(returnedData);
    if (P === 38) {
      setFamilyMemberDropDown(returnedData);
    } else if (P === 31) {
      setBloodGroup(returnedData);
    } else if (P === 18) {
      setGender(returnedData);
    }
  };

  // for deleting one family member data
  const DeleteMember = async ({txnID}) => {
    try {
      let familyData = {
        txnId: txnID,
        operFlag: 'D',
        userId: userId,
      };
      // console.warn(familyData);

      let res = await fetch(`${API}/api/hrms/saveFamilyInfo`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(familyData),
      });
      res = await res.json();
      res = await res?.Result[0]?.MSG;
      fetchFamilyData();
      Toast.show({
        type: 'success',
        text1: res,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
  };

  // for updating family member data
  const UpdateMember = item => {
    // console.log("family data", item);
    setOperFlag('E');
    setSelectedFamilyMember(item.FAMILY_MEMBER);
    setSelectedFamilyMemberValue(item.FAMILY_MEMBER_ID);
    setSelectedBloodGroup(item.BLOOD_GROUP);
    setSelectedBloodGroupValue(item.BLOOD_GROUP_ID);
    setSelectedGender(item.GENDER);
    setSelectedGenderValue(item.GENDER_ID);
    setFirstName(item.MEMBER_FIRST_NAME);
    setMiddleName(item.MEMBER_MIDDLE_NAME);
    setLastName(item.MEMBER_LAST_NAME);
    setContact(item.CONTACT_NO);
    setAddress(item.ADDRESS);
    setSelectedBirthDate(item.DATE_OF_BIRTH);
    setTxnID(item.TXN_ID);
    setShowMembers(false);
  };
  // For fetching details of Family dropdown -> Personal
  const getFamilyData = async () => {
    let FamilyData = {operFlag: 'V', candidateId: userId};
    let res = await fetch(`${API}/api/hrms/saveFamilyInfo`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(FamilyData),
    });
    res = await res.json();
    res = await res?.Result;
    // console.log("familydata", res);
    setMembers(res);
    // console.log("familyappFlag", res[0].APPROVAL_FLAG)
    setApprovalFlag(res[0].APPROVAL_FLAG);
    setAppRemark(res[0].DOC_REJ_REMARK);
  };

  // selecting ID of selected family member in dropdown
  const checkFamilyMemberValue = value => {
    for (let index = 0; index < familyMemberDropDown.length; index++) {
      const element = familyMemberDropDown[index];
      if (element.PARAM_NAME === value)
        setSelectedFamilyMemberValue(element.PARAM_ID);
    }
  };

  // selecting ID of selected blood group in dropdown
  const checkSelectedBloodGroup = value => {
    for (let index = 0; index < bloodGroup.length; index++) {
      const element = bloodGroup[index];
      if (element.PARAM_NAME === value)
        setSelectedBloodGroupValue(element.PARAM_ID);
    }
  };

  // selecting ID of selected gender in dropdown
  const checkSelectedGender = value => {
    for (let index = 0; index < gender.length; index++) {
      const element = gender[index];
      if (element.PARAM_NAME === value)
        setSelectedGenderValue(element.PARAM_ID);
    }
  };

  // for selecting ID of default selected value in dropdown
  const selectDropDownValue = id => {
    if (id === 'familyMember') {
      return selectedFamilyMemberValue
        ? selectedFamilyMemberValue
        : familyMemberDropDown?.map(a => a.PARAM_ID)[0];
    } else if (id === 'bloodGroup') {
      return selectedBloodGroupValue
        ? selectedBloodGroupValue
        : bloodGroup?.map(a => a.PARAM_ID)[0];
    } else if (id === 'gender') {
      return selectedGenderValue
        ? selectedGenderValue
        : gender?.map(a => a.PARAM_ID)[0];
    }
  };

  // for selecting text of default selected value in dropdown
  const selectDropDownText = id => {
    if (id === 'familyMember') {
      return selectedFamilyMember
        ? selectedFamilyMember
        : familyMemberDropDown?.map(a => a.PARAM_NAME)[0];
    } else if (id === 'bloodGroup') {
      return selectedBloodGroup
        ? selectedBloodGroup
        : bloodGroup?.map(a => a.PARAM_NAME)[0];
    } else if (id === 'gender') {
      return selectedGender
        ? selectedGender
        : gender?.map(a => a.PARAM_NAME)[0];
    }
  };

  // setting date of birth
  const setDateofBirth = date => {
    setCalendarOpen(false);
    let newDate = date.toDateString().split(' ');
    newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3];

    setSelectedBirthDate(newDate);
    setBirthDate(date);
  };

  // displaying data of all members
  const MemberDetails = () => {
    return (
      <View style={{padding: 4}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 700, color: 'black'}}>
            Member Details:{' '}
          </Text>
          <TouchableOpacity
            onPress={() => setShowMembers(false)}
            style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            <Text>ADD</Text>
            <Icon name="plus" size={16} />
          </TouchableOpacity>
        </View>

        {
          members[0]?.MEMBER_FIRST_NAME &&
            members.map(item => (
              <DisplayMember item={item} key={item.FAMILY_MEMBER} />
            ))
          // console.warn(members)
        }
      </View>
    );
  };

  // displaying data of one family member
  const DisplayMember = ({item}) => {
    return (
      <View
        key={item.TXN_ID}
        style={{
          backgroundColor: COLORS.disableOrange1,
          padding: 6,
          borderRadius: 12,
          marginVertical: 4,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: COLORS.orange1, fontWeight: 500}}>
            {item.MEMBER_FIRST_NAME}{' '}
          </Text>
          <Text style={{color: COLORS.orange1, fontWeight: 500}}>
            {item.MEMBER_LAST_NAME} -{' '}
          </Text>
          <Text style={{color: COLORS.orange1, fontWeight: 500}}>
            {item.FAMILY_MEMBER}
          </Text>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              padding: 5,
            }}
            onPress={() => DeleteMember({txnID: item.TXN_ID})}>
            <Icon name="trash-can-outline" color={COLORS.green} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 30,
              padding: 5,
            }}
            onPress={() => UpdateMember(item)}>
            <Icon name="square-edit-outline" color={COLORS.green} size={20} />
          </TouchableOpacity>
        </View>
        <Text style={{fontWeight: 600}}>
          Date of Birth:-{' '}
          <Text style={{fontWeight: 400}}>{item.DATE_OF_BIRTH}</Text>
        </Text>
        <Text style={{fontWeight: 600}}>
          Contact:- <Text style={{fontWeight: 400}}>{item.CONTACT_NO}</Text>
        </Text>
        <Text style={{fontWeight: 600}}>
          Address:- <Text style={{fontWeight: 400}}>{item.ADDRESS}</Text>
        </Text>
        <Text style={{fontWeight: 600}}>
          Blood Group:-{' '}
          <Text style={{fontWeight: 400}}>{item.BLOOD_GROUP}</Text>
        </Text>
      </View>
    );
  };

  const ValidateForm = () => {
    if (
      selectedFamilyMemberValue === '' ||
      firstName === '' ||
      lastName === '' ||
      selectedGenderValue === '' ||
      selectedBirthDate === '' ||
      contact === '' ||
      address === '' ||
      selectedBloodGroupValue === ''
    ) {
      return false;
    } else return true;
  };

  // saving data to backend
  const saveMemberDetails = async () => {
    // console.warn("Saving data");
    try {
      if (ValidateForm()) {
        let familyData = {
          txnId: txnID,
          operFlag: operFlag,
          candidateId: userId,
          userId: userId,
          familyMember: selectedFamilyMemberValue,
          memberFirstName: firstName,
          memberMiddleName: middleName,
          memberLastName: lastName,
          gender: selectedGenderValue,
          dateOfBirth: selectedBirthDate,
          contactNo: contact,
          address: address,
          bloodGroup: selectedBloodGroupValue,
        };
        // console.warn("familydata", familyData);
        setLoaderVisible(true);
        let res = await fetch(`${API}/api/hrms/saveFamilyInfo`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(familyData),
        });
        res = await res.json();
        res = await res?.Result[0]?.MSG;
        setLoaderVisible(false);
        onPress();
        Toast.show({
          type: 'success',
          text1: res,
        });
      } else {
        setLoaderVisible(false);

        Toast.show({
          type: 'error',
          text1: 'Fill all the Required Fields',
        });
      }
    } catch (error) {
      setLoaderVisible(false);
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
  };

  return (
    <View>
      {/* close header */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{...FONTS.h3, fontSize: 20, color: COLORS.orange}}>
          Family Details
        </Text>
        {approvalFlag === 'R' ? (
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => {
              showAlert({
                title: appRemark,
                customIcon: 'none',
                message: '',
                alertType: 'error',
                btnLabel: 'ok',
                onPress: () => closeAlert(),
              });
            }}>
            <Icon name="alert-circle-outline" size={25} color={COLORS.red} />
          </TouchableOpacity>
        ) : (
          ''
        )}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
          }}
          onPress={onPress}>
          <Icon name="close-circle-outline" size={30} color={COLORS.orange} />
        </TouchableOpacity>
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
        <KeyboardAwareScrollView
          extraScrollHeight={270}
          behavior={'padding'}
          enableAutomaticScroll={true}
          keyboardShouldPersistTaps={'always'}
          style={{marginBottom: 180}}
          contentContainerStyle={{
            paddingBottom: 180,
          }}
          showsVerticalScrollIndicator={false}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          {showMembers &&
          members[0]?.MEMBER_FIRST_NAME &&
          members?.length >= 0 ? (
            <MemberDetails />
          ) : (
            <View>
              {/* dropdown for family member */}
              {
                <Text>
                  {/* {console.log("familydata",members[0]?.MEMBER_FIRST_NAME)} */}
                  {members[0]?.MEMBER_FIRST_NAME}
                </Text>
              }

              <TextDropdown
                caption={'Family Member'}
                data={familyMemberDropDown}
                setData={setSelectedFamilyMember}
                setIdvalue={setSelectedFamilyMemberValue}
                defaultButtonText={selectedFamilyMember}
                captionStyle={{color: COLORS.green, ...FONTS.h4}}
              />

              {/* <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Family Member</Text> */}
              {/* <TextInput onChangeText={(val) => newMember.Member = val} value={newMember.Member} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} /> */}
              {/* <SelectDropdown data={familyMemberDropDown?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedFamilyMember(value), checkFamilyMemberValue(value) }} defaultButtonText={selectDropDownText("familyMember")} defaultValueByIndex={(selectDropDownValue("familyMember"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} /> */}

              {/* first name */}
              <Text
                style={{
                  color: 'green',
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                }}>
                Member First Name
                <Text style={{color: 'red', fontWeight: 500}}>*</Text>
              </Text>
              <TextInput
                onChangeText={val => setFirstName(val)}
                value={firstName}
                style={[
                  styles.inputHolder,
                  {marginVertical: 3, marginHorizontal: 7},
                ]}
              />

              {/* middle name */}
              {/* <Text
                style={{
                  color: 'green',
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                }}>
                Member Middle Name
              </Text>
              <TextInput
                onChangeText={val => setMiddleName(val)}
                value={middleName}
                style={[
                  styles.inputHolder,
                  {marginVertical: 3, marginHorizontal: 7},
                ]}
              /> */}

              {/* last name */}
              <Text
                style={{
                  color: 'green',
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                }}>
                Member Last Name
                <Text style={{color: 'red', fontWeight: 500}}>*</Text>
              </Text>
              <TextInput
                onChangeText={val => setLastName(val)}
                value={lastName}
                style={[
                  styles.inputHolder,
                  {marginVertical: 3, marginHorizontal: 7},
                ]}
              />

              {/* dropdown for gender */}

              <TextDropdown
                caption={'Gender'}
                data={gender}
                setData={setSelectedGender}
                setIdvalue={setSelectedGenderValue}
                defaultButtonText={selectedGender}
                captionStyle={{color: COLORS.green, ...FONTS.h4}}
              />

              {/* <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Gender<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                            <SelectDropdown data={gender?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3 }]} onSelect={(value) => { setSelectedGender(value), checkSelectedGender(value) }} defaultButtonText={selectDropDownText("gender")} defaultValueByIndex={(selectDropDownValue("gender"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} /> */}

              {/* for date of birth */}
              <Text
                style={{
                  color: 'green',
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                }}>
                Date of Birth
                <Text style={{color: 'red', fontWeight: 500}}>*</Text>
              </Text>

              <View style={{flexDirection: 'row', margin: 3}}>
                <TextInput
                  style={[styles.inputHolder, {width: '48%', margin: 3}]}
                  placeholder="dd/mm/yyyy"
                  editable={false}
                  value={selectedBirthDate}
                />
                <DatePicker
                  modal
                  theme="light"
                  open={calendarOpen}
                  mode="date"
                  date={birthDate}
                  onConfirm={date => setDateofBirth(date)}
                  onCancel={() => {
                    setCalendarOpen(false);
                  }}
                />
                <TouchableOpacity
                  onPress={() => setCalendarOpen(true)}
                  style={{
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="calendar-month" color={COLORS.orange} size={24} />
                </TouchableOpacity>
              </View>
              {/* for contact info */}
              <Text
                style={{
                  color: 'green',
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                }}>
                Contact No.
                <Text style={{color: 'red', fontWeight: 500}}>*</Text>
              </Text>
              <TextInput
                onChangeText={val => setContact(val)}
                value={contact}
                style={[
                  styles.inputHolder,
                  {marginVertical: 3, marginHorizontal: 7},
                ]}
                keyboardType="numeric"
                maxLength={10}
              />
              {/* for address */}
              <Text
                style={{
                  color: 'green',
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                }}>
                Address<Text style={{color: 'red', fontWeight: 500}}>*</Text>
              </Text>
              <TextInput
                onChangeText={val => setAddress(val)}
                value={address}
                style={[
                  styles.inputHolder,
                  {marginVertical: 3, marginHorizontal: 7},
                ]}
              />
              {/* for blood group */}

              <TextDropdown
                caption={'Blood Group'}
                data={bloodGroup}
                setData={setSelectedBloodGroup}
                setIdvalue={setSelectedBloodGroupValue}
                defaultButtonText={selectedBloodGroup}
                captionStyle={{color: COLORS.green, ...FONTS.h4}}
              />

              {/* <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Blood Group<Text style={{ color: 'red', fontWeight: 500 }}>*</Text></Text>
                            <SelectDropdown data={bloodGroup?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedBloodGroup(value), checkSelectedBloodGroup(value) }} defaultButtonText={selectDropDownText("bloodGroup")} defaultValueByIndex={(selectDropDownValue("bloodGroup"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} /> */}
              {approvalFlag !== 'A' ? (
                <TouchableOpacity onPress={() => saveMemberDetails()}>
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
                      {'Save Member Details'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                ''
              )}
            </View>
          )}
          <View style={{marginBottom: 300}}></View>
          {/* </ScrollView> */}
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputHolder: {
    borderWidth: 1,
    height: 40,
    borderColor: 'black',
    borderRadius: 12,
  },
});

export default FamilyBottomView;
