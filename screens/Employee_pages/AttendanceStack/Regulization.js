import {
  View,
  Text,
  BackHandler,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../constants/theme';
import {FONTS} from '../../../constants/font_size';
import {useDispatch, useSelector} from 'react-redux';
import {
  emptyRegularizationRes,
  getAttendanceDailyDetails,
  saveRegulization,
} from '../../../redux/attendaceDetailSlice';
import {API} from '../../../utility/services';
import TextDropdown from '../../../components/TextDropdown';
import {TextInput} from 'react-native-gesture-handler';
import {user_profile} from '../../../assets';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CustomIconInput from '../../../components/CustomIconInput';
import Loader from '../../../components/Loader';

const Regulization = ({navigation, route}) => {
  const selectDate = route.params.selectedDate;
  const dispatch = useDispatch();
  const {userId, userName} = useSelector(state => state.auth);
  const {
    attendanceDailyDataList,
    attendanceLoading,
    calanderloading,
    regulizationLoding,
    regularizationRes,
  } = useSelector(state => state.attendaceDetail);

  const [reason, setReason] = useState([]);
  const [selectReason, setSelectReason] = useState('');
  const [selectedReasonValue, setSelectedReasonValue] = useState('');

  const [reguInTime, setReguInTime] = useState('');
  const [reguOutTime, setReguOutTime] = useState('');

  const [inTimeTimerOpen, setInTimeTimerOpen] = useState(false);
  const [outTImeTimerOpen, setOutTimeTimerOpen] = useState(false);
  const [descriptionStr, setDescriptionStr] = useState('');

  const getDropdownData = async P => {
    let response = await fetch(`${API}/api/User/getParam?getClaim=${P}`);
    response = await response.json();
    const returnedData = response;

    setReason(returnedData);
    setSelectReason(returnedData.PARAM_NAME);
    setSelectedReasonValue(returnedData.PARAM_ID);

    console.log('pramName', returnedData);
  };

  useEffect(() => {
    getDropdownData(48);
    getDailyAttenceDetails();
  }, []);

  const saveRegulizationDetails = async => {
    if (!selectReason) {
      Toast.show({
        type: 'error',
        text1: 'Please enter Valid Reason',
      });
    } else if (!selectDate) {
      Toast.show({
        type: 'error',
        text1: 'Please select valid date',
      });
    } else if (reguInTime === '') {
      Toast.show({
        type: 'error',
        text1: 'Please select valid In time',
      });
    } else if (reguOutTime === '') {
      Toast.show({
        type: 'error',
        text1: 'Please select valid Out time',
      });
    } else if (descriptionStr === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter valid description',
      });
    } else {
      const data = {
        txnId: '',
        userId: userId,
        action: '',
        reason: selectReason,
        regulizeDate: selectDate,
        inTime: reguInTime,
        outTime: reguOutTime,
        description: descriptionStr,
        operFlag: 'A',
      };

      dispatch(saveRegulization(data));
    }
  };

  const getDailyAttenceDetails = async => {
    console.log('selectedDateApi', selectDate.day, selectDate.month);
    const data = {
      userId: userId,
      day: selectDate.day,
      monthYear: selectDate.month,
    };

    dispatch(getAttendanceDailyDetails(data));
  };

  useEffect(() => {
    // for handling back button in android
    const backAction = () => {
      if (navigation.isFocused()) {
        navigation.goBack();
        return true;
      }
    };

    const backPressHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backPressHandler.remove();
    };
  }, []);

  const onChangeInTime = (event, selectedDate) => {
    setInTimeTimerOpen(false);
    console.log(selectedDate);
    const {
      type,
      nativeEvent: {timestamp, utcOffset},
    } = event;
    console.log('timestamp', timestamp);
    console.log(moment(timestamp).format('hh:mm a'));
    setReguInTime(moment(timestamp).format('hh:mm a'));
  };

  const onChangeOutTime = (event, selectedDate) => {
    setOutTimeTimerOpen(false);
    console.log(selectedDate);
    const {
      type,
      nativeEvent: {timestamp, utcOffset},
    } = event;
    console.log('timestamp', timestamp);
    console.log(moment(timestamp).format('hh:mm a'));
    setReguOutTime(moment(timestamp).format('hh:mm a'));
  };

  useMemo(() => {
    if (regularizationRes?.FLAG === 'S') {
      Toast.show({
        type: 'success',
        text1: regularizationRes?.MSG,
      });
      dispatch(emptyRegularizationRes());
      navigation.goBack();
    }
  }, [regularizationRes]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      {/* header text */}
      <View style={styles.newJobOpeneingTxt}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons
            name="arrow-left-thin"
            color={COLORS.black}
            size={30}
            style={{alignItems: 'center', padding: 2}}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.black,
            textAlignVertical: 'center',
            ...FONTS.body3,
            marginLeft: 10,
            padding: 5,
          }}>
          Regularization for {selectDate.day} {route.params.selectedMonth},{' '}
          {selectDate.year}
        </Text>
      </View>
      <Loader loaderVisible={regulizationLoding} />
      {/* shift Information details for regularization */}

      <View
        style={{
          padding: 20,
          backgroundColor: COLORS.white,
          margin: 10,
          borderRadius: 8,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              alignItems: 'center',
            }}>
            <View>
              <Text style={[styles.titleText, {color: COLORS.darkGray2}]}>
                Scheduled 
              </Text>
              <Text style={[styles.titleText, {marginTop: -5}]}>
                {attendanceDailyDataList.SHIFTTIME}
              </Text>
            </View>

            <View>
              <Text style={[styles.titleText, {color: COLORS.darkGray2}]}>
                Actual
              </Text>
              <Text style={[styles.titleText, {marginTop: -5}]}>
                09:57:41 to 19:11:59
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View>
              <Text style={[styles.titleText, {color: COLORS.darkGray2}]}>
                Pre-post time
              </Text>
              <Text style={[styles.titleText, {marginTop: -5}]}>
                08:00 to 23:50
              </Text>
            </View>

            <View>
              <Text style={[styles.titleText, {color: COLORS.darkGray2}]}>
                Shift Name
              </Text>
              <Text style={[styles.titleText, {marginTop: -5}]}>HO Flexi</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View>
              <Text style={[styles.titleText, {color: COLORS.darkGray2}]}>
                Total Hours
              </Text>
              <Text style={[styles.titleText, {marginTop: -5}]}>554 mins.</Text>
            </View>
          </View>

          <TextDropdown
            caption={'Select Reason'}
            data={reason}
            style={{marginLeft: 10}}
            setData={setSelectReason}
            setIdvalue={setSelectedReasonValue}
            defaultButtonText={selectReason}
            captionStyle={{color: COLORS.green, ...FONTS.h4}}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 8,
              alignItems: 'center',
              marginTop: -5,
            }}>
            <View>
              <TouchableOpacity onPress={() => setInTimeTimerOpen(true)}>
                {/* <Text style={{color: COLORS.black, ...FONTS.h5}}>
                  Regularize In Time
                </Text> */}
                <CustomIconInput
                  caption={'Regularize In Time'}
                  textInputStyle={{
                    color: COLORS.black,
                    ...FONTS.body5,
                    fontSize: 12,
                  }}
                  value={reguInTime}
                  editable={false}
                  placeholder={'In Time'}
                  icon={
                    <Icons
                      name={'clock-time-eight-outline'}
                      size={20}
                      color={COLORS.darkGray2}
                    />
                  }
                />
              </TouchableOpacity>

              {inTimeTimerOpen && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={'time'}
                  is24Hour={false}
                  onChange={onChangeInTime}
                  display="spinner"
                  locale="in-IN"
                  // {...rest}
                />
              )}
            </View>

            <View>
              <TouchableOpacity onPress={() => setOutTimeTimerOpen(true)}>
                <CustomIconInput
                  caption={'Regularize Out Time'}
                  textInputStyle={{
                    color: COLORS.black,
                    ...FONTS.body5,
                    fontSize: 12,
                  }}
                  value={reguOutTime}
                  editable={false}
                  placeholder={'Out Time'}
                  icon={
                    <Icons
                      name={'clock-time-eight-outline'}
                      size={20}
                      color={COLORS.darkGray2}
                    />
                  }
                />
              </TouchableOpacity>

              {outTImeTimerOpen && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={'time'}
                  is24Hour={false}
                  display="spinner"
                  onChange={onChangeOutTime}
                  locale="in-IN"
                  // {...rest}
                />
              )}
            </View>
          </View>
          <View>
            <Text style={styles.titleText}>Description</Text>
            <TextInput
              style={{
                borderColor: COLORS.lightGray,
                borderRadius: 8,
                borderWidth: 0.5,
                ...FONTS.body5,
                height: responsiveHeight(10),
                alignItems: 'flex-start',
              }}
              placeholder="Enter your message here"
              value={descriptionStr}
              onChangeText={setDescriptionStr}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          padding: 20,
          backgroundColor: COLORS.white,
          margin: 10,
          borderRadius: 8,
        }}>
        <Text style={{color: COLORS.black, ...FONTS.h4}}>Approver</Text>
        <View
          style={{
            borderBottomColor: COLORS.lightGray,
            borderBottomWidth: 0.5,
            height: 1,
            width: '110%',
            alignSelf: 'center',
            marginTop: 15,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Image
            source={user_profile}
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
            }}
          />

          <View style={{justifyContent: 'center', marginLeft: 10}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: COLORS.black}}>Mr. ASHUTOSH KUMAR</Text>
              <Text style={{color: COLORS.green}}>Approver-1</Text>
            </View>
            <Text style={{color: COLORS.black}}>
              ashutosh.srivastava@satyamicrocapital.com
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          padding: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: COLORS.red,
            width: '45%',
            height: 40,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{color: COLORS.white, ...FONTS.body4, textAlign: 'center'}}>
            CANCEL
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => saveRegulizationDetails()}
          style={{
            backgroundColor: COLORS.green,
            width: '45%',
            height: 40,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{color: COLORS.white, ...FONTS.body4, textAlign: 'center'}}>
            {regulizationLoding ? 'Loading...' : 'APPLY'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  newJobOpeneingTxt: {
    padding: 8,
    fontSize: 14,
    marginTop: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
  },
  regilizationBtn: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 14,
    fontWeight: 500,
    height: 45,
    borderColor: COLORS.white,
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
  inputHolder: {
    borderWidth: 1,
    borderColor: 'white',
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 0,
    marginVertical: 5,
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titleText: {
    color: COLORS.black,
    ...FONTS.body5,
  },
});

export default Regulization;
