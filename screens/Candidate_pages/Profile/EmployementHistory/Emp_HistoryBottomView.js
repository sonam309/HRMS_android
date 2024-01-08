import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  editable,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {API} from '../../../../utility/services';
import Toast from 'react-native-toast-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../../../components/Loader';
import {showAlert, closeAlert} from 'react-native-customisable-alert';
import DateButton from '../../../../components/DateButton';

const Emp_HistoryBottomView = props => {
  const userId = useSelector(state => state.candidateAuth.candidateId);

  const [fromDate, setFromDate] = useState(new Date());
  const [selcetedFromDate, setSelectedFromDate] = useState('');
  const [fromDateOpen, setFromDateOpen] = useState(false);

  const [toDate, setToDate] = useState(new Date());
  const [selcetedToDate, setSelectedToDate] = useState('');
  const [toDateOpen, setToDateOpen] = useState(false);

  const [currentlyWorking, setCurrentlyWorking] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [role, setRole] = useState('');
  const [lastSalary, setLastSalary] = useState('');
  const [manager, setManager] = useState('');
  const [reason, setReason] = useState('');
  const [aboutCompany, setAboutCompany] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyLink, setCompanyLink] = useState('');
  const [approvalFlag, setApprovalFlag] = useState('');
  const [approveRemark, setApproveRemarks] = useState('');

  const [operFlag, setOperFlag] = useState('A');

  const [fillForm, setFillForm] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);

  const [TXNID, setTXNID] = useState('');

  useEffect(() => {
    setTimeout(() => {
      getEmploymentData();
    }, 1000);
  }, []);

  const actualFromDate = date => {
    setFromDateOpen(false);
    let newDate = date.toDateString().split(' ');
    newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3];
    setSelectedFromDate(newDate);
    setFromDate(date);
  };

  const actualToDate = date => {
    setToDateOpen(false);
    let newDate = date.toDateString().split(' ');
    newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3];
    setSelectedToDate(newDate);
    setToDate(date);
  };
  const ValidateForm = () => {
    if (
      companyName === '' ||
      designation === '' ||
      role === '' ||
      lastSalary === ''
    ) {
      return false;
    } else return true;
  };

  const SaveEmploymentData = async () => {
    // console.log("outisde");
    if (ValidateForm()) {
      try {
        let employeeData = {
          txnId: TXNID,
          operFlag: operFlag,
          candidateId: userId,
          userId: userId,
          companyName: companyName,
          designation: designation,
          fDate: selcetedFromDate,
          tDate: selcetedToDate,
          role: role,
          lastDrawnSalary: lastSalary,
          reportingManager: manager,
          reasonForChange: reason,
          aboutCompany: aboutCompany,
          companyAddress: companyAddress,
          webLink: companyLink,
          currentlyWorking: currentlyWorking,
        };
        // console.warn("saving/updating", employeeData);
        // console.log("inside", employeeData);
        setLoaderVisible(true);
        let res = await fetch(`${API}/api/hrms/candidateEmployementInfo`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employeeData),
        });
        res = await res.json();
        res = await res?.Result[0]?.MSG;
        setLoaderVisible(false);
        // console.log("empDetails", res);
        Toast.show({
          type: 'success',
          text1: res,
        });
        props.fetchEmploymentData();
        setFillForm(false);
      } catch (error) {
        setLoaderVisible(false);
        Toast.show({
          type: 'error',
          text1: error,
        });
      }
    } else {
      setLoaderVisible(false);
      Toast.show({
        type: 'error',
        text1: 'Please fill all Mandatory feilds',
      });
    }
  };

  const getEmploymentData = async () => {
    let employmentData = {operFlag: 'V', candidateId: userId};
    let res = await fetch(`${API}/api/hrms/candidateEmployementInfo`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employmentData),
    });
    res = await res.json();
    res = await res?.Result;
    // console.log("employmentdata", res);
    setApproveRemarks(res[0]?.DOC_REJ_REMARK);
    setApprovalFlag(res[0]?.APPROVAL_FLAG);
  };

  const DeleteEmployment = async ({txnId}) => {
    try {
      let employmentData = {
        txnId: txnId,
        operFlag: 'D',
        userId: userId,
      };
      // console.log(employmentData);
      // console.log(employmentData);
      setLoaderVisible(true);
      let res = await fetch(`${API}/api/hrms/candidateEmployementInfo`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employmentData),
      });
      res = await res.json();
      res = await res?.Result[0]?.MSG;
      setLoaderVisible(false);
      props?.fetchEmploymentData();
      Toast.show({
        type: 'success',
        text1: res,
      });

      setFillForm(false);
    } catch (error) {
      setLoaderVisible(false);
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
  };

  const UpdateEmployment = item => {
    // console.warn(item.TXN_ID);
    // console.log("updatedData", item)
    setOperFlag('E');
    setSelectedFromDate(item.FROM_DATE);
    setSelectedToDate(item.TO_DATE);
    setCurrentlyWorking(item.CURRENTLY_WORKING);
    setCompanyName(item.COMPANY_NAME);
    setDesignation(item.DESIGNATION);
    setRole(item.ROLE);
    setLastSalary(item.LAST_DRAWN_SALARY);
    setManager(item.REPORTING_MANAGER);
    setReason(item.REASON_FOR_CHANGE);
    setAboutCompany(item.ABOUT_COMPANY);
    setCompanyAddress(item.COMPANY_ADDRESS);
    setCompanyLink(item.WEB_LINK);

    setFillForm(true);
    setTXNID(item.TXN_ID);
  };

  const EmployementHistory = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: COLORS.disableOrange1,
          padding: 6,
          borderRadius: 12,
          marginVertical: 8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: COLORS.orange1, fontWeight: 500}}>
            {item.COMPANY_NAME}{' '}
          </Text>

          <Icons
            position="absolute"
            onPress={() => DeleteEmployment({txnId: item.TXN_ID})}
            right={0}
            name="trash-can-outline"
            color={COLORS.green}
            size={20}
          />
          <Icons
            position="absolute"
            onPress={() => UpdateEmployment(item)}
            right={40}
            name="square-edit-outline"
            color={COLORS.green}
            size={20}
          />
        </View>

        <Text style={{fontWeight: 600}}>
          Designation:-{' '}
          <Text style={{fontWeight: 400}}>{item.DESIGNATION}</Text>
        </Text>
        <Text style={{fontWeight: 600}}>
          Date:-{' '}
          <Text style={{fontWeight: 400}}>
            {item.FROM_DATE} - {item.TO_DATE}
          </Text>
        </Text>
        <Text style={{fontWeight: 600}}>
          Candidate Role:- <Text style={{fontWeight: 400}}>{item.ROLE}</Text>
        </Text>
        <Text style={{fontWeight: 600}}>
          Last Drawn Salary:-{' '}
          <Text style={{fontWeight: 400}}>{item.LAST_DRAWN_SALARY}</Text>
        </Text>
        <Text style={{fontWeight: 600}}>
          Reporting Manager:-{' '}
          <Text style={{fontWeight: 400}}>{item.REPORTING_MANAGER}</Text>
        </Text>
        <Text style={{fontWeight: 600}}>
          Reason For Change:-{' '}
          <Text style={{fontWeight: 400}}>{item.REASON_FOR_CHANGE}</Text>
        </Text>
        {/* <Text style={{ fontWeight: 600 }}>Company Link:- <Text style={{ fontWeight: 400 }}>{item.WEB_LINK}</Text></Text> */}
        {/* <Text style={{ fontWeight: 600 }}>Company Address:- <Text style={{ fontWeight: 400 }}>{item.COMPANY_ADDRESS}</Text></Text> */}
        {/* <Text style={{ fontWeight: 600 }}>About Company:- <Text style={{ fontWeight: 400 }}>{item.ABOUT_COMPANY > 5 ? `${item.ABOUT_COMPANY.slice(0, 5)}...` : item.ABOUT_COMPANY}</Text></Text> */}
      </View>
    );
  };

  const DisplayHistory = () => {
    return (
      <View style={{padding: 4}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 700, color: 'black', marginVertical: 10}}>
            Past Employment:{' '}
          </Text>
          <TouchableOpacity
            onPress={() => setFillForm(true)}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>ADD</Text>
            <Icons name="plus" size={16} />
          </TouchableOpacity>
        </View>

        {props.employment.map(item => (
          <EmployementHistory item={item} />
        ))}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* close button */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{...FONTS.h3, fontSize: 20, color: COLORS.orange}}>
          Employment Details
        </Text>
        {approvalFlag === 'R' ? (
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => {
              showAlert({
                title: approveRemark,
                customIcon: 'none',
                message: '',
                alertType: 'error',
                btnLabel: 'ok',
                onPress: () => closeAlert(),
              });
            }}>
            <Icons name="alert-circle-outline" size={25} color={COLORS.red} />
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
          onPress={props.onPress}>
          <Icons name="close-circle-outline" size={30} color={COLORS.orange} />
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
          style={{flex: 1, marginBottom: 170}}
          contentContainerStyle={{
            paddingBottom: 170,
          }}
          showsVerticalScrollIndicator={false}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          {props.employment.length &&
          props.employment[0]?.COMPANY_NAME &&
          !fillForm > 0 ? (
            <DisplayHistory />
          ) : (
            <View>
              {/* company name */}
              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>
                  Company Name{' '}
                  <Text style={{color: COLORS.red, ...FONTS.body3}}>*</Text>
                </Text>
                <TextInput
                  style={{
                    color: COLORS.black,
                    borderWidth: 1,
                    borderColor: COLORS.black,
                    borderRadius: 12,
                    height: 45,
                    paddingLeft: 5,
                  }}
                  onChangeText={val => setCompanyName(val)}
                  value={companyName}
                />
              </View>
              {/* designation */}
              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>
                  Designation{' '}
                  <Text style={{color: COLORS.red, ...FONTS.body3}}>*</Text>
                </Text>
                <TextInput
                  style={{
                    color: COLORS.black,
                    borderWidth: 1,
                    borderColor: COLORS.black,
                    borderRadius: 12,
                    height: 45,
                    paddingLeft: 5,
                  }}
                  onChangeText={val => setDesignation(val)}
                  value={designation}
                />
              </View>
              {/* from Date */}
              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>
                  From Date
                </Text>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <TextInput
                    style={{
                      color: COLORS.black,
                      width: '70%',
                      borderWidth: 1,
                      borderColor: COLORS.black,
                      color: editable ? COLORS.black : COLORS.black,
                      borderRadius: 10,
                      height: 40,
                      paddingLeft: 5,
                    }}
                    placeholder="dd/mm/yyyy"
                    value={selcetedFromDate}
                    editable={false}
                  />
                  <TouchableOpacity
                    onPress={() => setFromDateOpen(true)}
                    style={{marginLeft: 20}}>
                    <Icons
                      name="calendar-month"
                      size={35}
                      color={COLORS.orange}
                    />
                    <DatePicker
                      modal
                      open={fromDateOpen}
                      mode="date"
                      theme='auto'
                      date={fromDate}
                      onConfirm={date => actualFromDate(date)}
                      onCancel={() => {
                        setFromDateOpen(false);
                      }}
                    />


                  </TouchableOpacity>
                </View>
              </View>
              {/* to Date */}
              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>
                  To Date
                </Text>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <TextInput
                    style={{
                      color: COLORS.black,
                      width: '70%',
                      borderWidth: 1,
                      borderColor: COLORS.black,
                      color: editable ? COLORS.black : COLORS.black,
                      borderRadius: 10,
                      height: 40,
                      paddingLeft: 5,
                    }}
                    placeholder="dd/mm/yyyy"
                    value={selcetedToDate}
                    editable={false}
                  />
                  <TouchableOpacity
                    onPress={() => setToDateOpen(true)}
                    style={{marginLeft: 20}}>
                    <Icons
                      name="calendar-month"
                      size={35}
                      color={COLORS.orange}
                    />
                    <DatePicker
                      modal
                      open={toDateOpen}
                      mode="date"
                      theme='auto'
                      date={toDate}
                      onConfirm={date => actualToDate(date)}
                      onCancel={() => {
                        setToDateOpen(false);
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* Role */}
              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>
                  Role{' '}
                  <Text style={{color: COLORS.red, ...FONTS.body3}}>*</Text>
                </Text>
                <TextInput
                  style={{
                    color: COLORS.black,
                    borderWidth: 1,
                    borderColor: COLORS.black,
                    borderRadius: 12,
                    height: 45,
                    paddingLeft: 5,
                  }}
                  onChangeText={val => setRole(val)}
                  value={role}
                />
              </View>
              {/* Last Drawn Salary */}
              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>
                  Last Drawn Salary{' '}
                  <Text style={{color: COLORS.red, ...FONTS.body3}}>*</Text>
                </Text>
                <TextInput
                  style={{
                    color: COLORS.black,
                    borderWidth: 1,
                    borderColor: COLORS.black,
                    borderRadius: 12,
                    height: 45,
                    paddingLeft: 5,
                  }}
                  keyboardType="numeric"
                  onChangeText={val => setLastSalary(val)}
                  value={lastSalary}
                  maxLength={8}
                />
              </View>
              {/* Reporting Manager */}
              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>
                  Reporting Manager
                </Text>
                <TextInput
                  style={{
                    color: COLORS.black,
                    borderWidth: 1,
                    borderColor: COLORS.black,
                    borderRadius: 12,
                    height: 45,
                    paddingLeft: 5,
                  }}
                  onChangeText={val => setManager(val)}
                  value={manager}
                />
              </View>
              {/* Reason for change */}
              <View style={{height: 75, marginTop: 10}}>
                <Text style={{color: COLORS.green, ...FONTS.body4}}>
                  Reason for Change
                </Text>
                <TextInput
                  style={{
                    color: COLORS.black,
                    borderWidth: 1,
                    borderColor: COLORS.black,
                    borderRadius: 12,
                    height: 45,
                    paddingLeft: 5,
                  }}
                  onChangeText={val => setReason(val)}
                  value={reason}
                />
              </View>
              {/* About Company  */}
              {/* <View style={{ height: 75, marginTop: 10 }}>
              <Text style={{ color: COLORS.green, ...FONTS.body4 }}>About Company</Text>
              <TextInput style={{ color: COLORS.black, borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} onChangeText={(val) => setAboutCompany(val)} value={aboutCompany} />
            </View> */}
              {/* Company address  */}
              {/* <View style={{ height: 75, marginTop: 10 }}>
              <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Company Address</Text>
              <TextInput style={{ color: COLORS.black, borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} onChangeText={(val) => setCompanyAddress(val)} value={companyAddress} />
            </View> */}
              {/*web link*/}
              {/* <View style={{ height: 75, marginTop: 10 }}>
              <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Web Link</Text>
              <TextInput style={{ color: COLORS.black, borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5, }} placeholder='https://satyamicrocapital.com/' onChangeText={(val) => setCompanyLink(val)} value={companyLink} />
            </View> */}
              {/* currently Working */}
              <View
                style={{
                  height: 55,
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => setCurrentlyWorking(!currentlyWorking)}
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: COLORS.green,
                      ...FONTS.body3,
                      textAlign: 'center',
                    }}>
                    Currently Working
                  </Text>
                  {currentlyWorking ? (
                    <Icons
                      name="checkbox-marked-circle-outline"
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
                </TouchableOpacity>
              </View>
              {/* save button */}
              {approvalFlag !== 'A' ? (
                <TouchableOpacity onPress={() => SaveEmploymentData()}>
                  <LinearGradient
                    colors={[COLORS.orange1, COLORS.disableOrange1]}
                    start={{x: 0, y: 0}}
                    end={{x: 2, y: 0}}
                    style={{borderRadius: 8, padding: 8, marginTop: 20}}>
                    <Text
                      style={{
                        color: COLORS.white,
                        textAlign: 'center',
                        ...FONTS.body3,
                      }}>
                      {' '}
                      Save{' '}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                ''
              )}
            </View>
          )}
          {/* <View style={{ marginBottom: 270 }}></View> */}
          {/* </ScrollView> */}
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};
export default Emp_HistoryBottomView;
