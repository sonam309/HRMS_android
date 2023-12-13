import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  SafeAreaView,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Calendar from 'react-native-calendars/src/calendar';
import axios from 'axios';
import moment from 'moment';
import Geolocation from '../../../functions/Geolocation';
import {DrawerActions, useFocusEffect} from '@react-navigation/native';
import Loader from '../../../components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from '../../../utility/services';
import Toast from 'react-native-toast-message';
import {showDevelopmetMode} from '../../../functions/utils';
import {updatePunchTime} from '../../../redux/punchDetailSlice';
import {getAttendanceDailyDetails} from '../../../redux/attendaceDetailSlice';
import {COLORS} from '../../../constants';
import {StatusBar} from 'react-native';
import {authActions} from '../../../redux/authSlice';


const Home = props => {
  var m_names = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let currentDate = new Date().toDateString().split(' ');
  const {userId, userName} = useSelector(state => state.auth);
  const {currentLocation, punchTime, loading} = useSelector(
    state => state.punchDetail,
  );

  const {attendanceDailyDataList} = useSelector(state => state.attendaceDetail);

  const dispatch = useDispatch();

  const [address, setAddress] = useState(null);
  const [punchInTime, setPunchInTime] = useState('--:--');
  const [punchOutTime, setPunchOutTime] = useState('--:--');
  const [duration, setDuration] = useState('');
  let inTime = '',
    outTime = '',
    timeSpent = '',
    presentDays = 0,
    absentDays = 0,
    count = 0;

  // Calendar
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [markedDate, setMarkedDate] = useState({});
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  var markedDates = {};

  const [val, setVal] = useState('');

  const modalData = [
    {
      heading: 'Shift',
      caption: attendanceDailyDataList?.SHIFTTIME,
    },
    {
      heading: 'Actual',
      caption: attendanceDailyDataList?.ACTUAL,
    },
    {
      heading: 'Regularised',
      caption: attendanceDailyDataList?.Regularised,
    },
    {
      heading: 'Hours',
      caption: attendanceDailyDataList?.DURATION,
    },
    {
      heading: 'Deficit',
      caption: '9:00',
    },
    {
      heading: 'Leave status',
      caption: 'none',
    },
    {
      heading: 'Reason',
      caption: attendanceDailyDataList?.Reason,
    },
    {
      heading: 'Application',
      caption: attendanceDailyDataList?.Application,
    },
    {
      heading: 'Raw Swipes',
      caption: attendanceDailyDataList?.Rawwipe,
    },
  ];

  const getDailyAttenceDetails = async date => {
    console.log('datettette', val);
    const data = {
      userId: userId,
      day: date.day,
      monthYear: `${m_names[selectedMonth?.getMonth()]}${selectedYear}`,
    };

    dispatch(getAttendanceDailyDetails(data));
  };

  const getCurrentLocation = async val => {
    setLoaderVisible(true);
    Geolocation({val, type: 'dashboard'});
    setVal(val);
    // let loginPlace = await AsyncStorage.getItem('Address');
    // setAddress(loginPlace);
    setLoaderVisible(false);
    // console.warn("punch in address", address)
  };

  useEffect(() => {
    if (val === ' I' || val === 'O') {
      loadingData('V');
    }
  }, [val]);

  const loadingData = async val => {
    // fetching data
    setLoaderVisible(true);

    let punchData = {operFlag: val, userId: userId};

    (data = await fetch(`${API}/api/Admin/punchinOut`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(punchData),
    })),
      // data to json form
      (data = await data.json()),
      (data = data.Result[0]),
      dispatch(updatePunchTime({punchTime: data}));
    // console.log("data", data),
    setLoaderVisible(false);
  };

  useEffect(() => {
    userId && getAttendance();
    loadingData('V');
  }, []);

  useEffect(() => {
    userId && getAttendance();
    loadingData('V');
  }, [userId]);

  useEffect(() => {
    count = 0;
    presentDays = 0;
    absentDays = 0;
    getAttendance();
  }, [selectedMonth]);

  const getAttendance = () => {
    axios
      .post(`${API}/api/Admin/Attendance`, {
        userId: userId,
        monthYear: `${m_names[selectedMonth?.getMonth()]}${selectedYear}`,
      })
      .then(response => {
        const returnedData = response?.data?.Result;

        // Create the final object
        returnedData.map(obj => {
          // Extract the date from the DATED field
          const date = moment(obj.DATED, 'MMM DD YYYY hh:mmA').format(
            'YYYY-MM-DD',
          );

          // Determine markedDotColor based on ATTENDANCE_FLAG
          let markedDotColor = '';
          if (obj.ATTENDANCE_FLAG === 'A') {
            markedDotColor = 'red';
          } else if (obj.ATTENDANCE_FLAG === 'P') {
            markedDotColor = '#33AA54';
          } else if (obj.ATTENDANCE_FLAG === 'S') {
            markedDotColor = 'orange';
          } else if (obj.ATTENDANCE_FLAG === 'H') {
            markedDotColor = 'grey';
          } else {
            markedDotColor = '#fff';
          }
          // Add the date as a key to the final object
          markedDates[date] = {marked: true, dotColor: markedDotColor};
          if (count < 1) {
            markedDates[date].dotColor === 'red' && (absentDays += 1);
            markedDates[date].dotColor === ('orange' || '#33AA54') &&
              (presentDays += 1);
          }
        });
        setMarkedDate(markedDates);
        count = 1;
        setPresent(presentDays);
        setAbsent(absentDays);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => {
              BackHandler.exitApp()
              dispatch(authActions.logOut())
            }},
          ]);
          return true;
        },
      );
      return () => backHandler.remove();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Loader loaderVisible={loaderVisible} />

      <ScrollView
        style={{
          flex: 1,
        }}>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                  }}>
                  {modalData.map((data, index) => {
                    return (
                      <View style={styles.modalWrap} key={index}>
                        <Text style={styles.modalTextHeading}>
                          {data.heading}
                        </Text>
                        <Text style={styles.modalTextCaption}>
                          {data.caption}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Okay</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>

        {/* header */}
        <View
          style={{
            height: 60,
            flexDirection: 'row',
            backgroundColor: COLORS.white,
            alignItems: 'center',
            width: '100%',
            elevation: 7,
            shadowColor: COLORS.green,
          }}>
          <TouchableOpacity
            style={{paddingHorizontal: 14}}
            onPress={() =>
              props.navigation.dispatch(DrawerActions.openDrawer())
            }>
            <Icons name="reorder-horizontal" color={COLORS.green} size={25} />
          </TouchableOpacity>

          <View>
            <Text style={{fontWeight: '500', fontSize: 11}}>Welcome</Text>
            <Text style={{color: COLORS.orange, fontSize: 15}}>
              {userName?.length < 15
                ? `${userName}`
                : `${userName?.substring(0, 15)}...`}{' '}
            </Text>
            {currentLocation && (
              <Text
                style={{fontSize: 11, color: COLORS.black, fontWeight: '400'}}>
                {currentLocation?.length < 15
                  ? `${currentLocation}`
                  : `${currentLocation?.substring(0, 40)}...`}{' '}
              </Text>
            )}
          </View>

          <TouchableOpacity style={{position: 'absolute', right: 10}}>
            {/* <Icons name="bell-ring-outline" color={COLORS.green} size={30} /> */}
          </TouchableOpacity>
        </View>

        {/* Main Content-Calendar */}
        <Calendar
          initialDate=""
          style={{
            marginBottom: 20,
            backgroundColor: '#fff',
            justifyContent: 'center',
            marginTop: 10,
          }}
          theme={{
            arrowColor: 'black',
            monthTextColor: 'black',
            textSectionTitleColor: 'black',
          }}
          markedDates={markedDate}
          onMonthChange={month => {
            setSelectedYear(month.year);
            setSelectedMonth(new Date(month?.dateString));
          }}
          dayComponent={({date, state, marking}) => {
            return (
              <TouchableOpacity
                onLongPress={() => {
                  getDailyAttenceDetails(date);
                  setModalVisible(true);
                  console.log('selected day', date.day);
                }}
                style={{
                  alignItems: 'center',
                  borderColor: COLORS.lightGray,
                  paddingBottom: 8,
                  borderBottomWidth: 0.5,
                  width: '100%',
                }}>
                <Text style={{fontSize: 16, paddingBottom: marking ? 0 : 11}}>
                  {' '}
                  {date.day}{' '}
                </Text>
                {marking && marking.dotColor === 'orange' ? (
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      overflow: 'hidden',
                      transform: [{rotate: '90deg'}],
                      elevation: 2,
                      marginTop: 1,
                    }}>
                    <View
                      style={{backgroundColor: '#DDE6ED', height: 5, width: 10}}
                    />
                    <View
                      style={{backgroundColor: '#88C385', height: 5, width: 10}}
                    />
                  </View>
                ) : (
                  marking && (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        backgroundColor: marking?.dotColor
                          ? marking.dotColor
                          : '#87CEEB',
                        borderRadius: 5,
                        marginTop: 1,
                      }}
                    />
                  )
                )}
              </TouchableOpacity>
            );
          }}
          // dayComponent={({ date, state, marking }) => {
          //   return (
          //     <TouchableOpacity onLongPress={() => { setModalVisible(true); console.log('selected day', date.day); }} style={{ padding: 5, alignItems: 'center', }}>
          //       <Text style={{ fontSize: 16, }}> {date.day} </Text>
          //       {marking && marking.dotColor === 'orange' ? (
          //         <View style={{ height: 10, width: 10, borderRadius: 5, overflow: 'hidden', transform: [{ rotate: '90deg' }], elevation: 2, }}>
          //           <View style={{ backgroundColor: '#DDE6ED', height: 5, width: 10, }} />
          //           <View style={{ backgroundColor: '#88C385', height: 5, width: 10, }} />
          //         </View>) :
          //         (marking && (<View style={{ height: 10, width: 10, backgroundColor: marking?.dotColor ? marking.dotColor : '#87CEEB', borderRadius: 5, }} />))}
          //     </TouchableOpacity>
          //   );
          // }}
        />

        {/* Punch In Button */}
        {/* <View style={styles.attendance}> */}

        {/* <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => { getCurrentLocation(punchInToken) }} style={[styles.punchButton, { borderColor: `${punchButtonColor}` }]} >
              <Icons name='gesture-double-tap' size={35} color={`${punchButtonColor}`} />
              <Text style={[styles.punchButtonText, { color: `${punchButtonColor}` }]}>Punch {inOut}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.otherOptions, { flexDirection: 'row', backgroundColor: COLORS.transparent }]} >
            <Icons name='clock-outline' size={35} color={COLORS.gray} />
            <View>
              <Text style={{ color: 'gray', fontWeight: '500', textAlign: 'center' }}>{duration != "" ? duration : '--:--'} hrs</Text>
              <Text style={{ color: 'gray', fontWeight: '500' }}>Spent Today</Text>
              <Text style={{ color: 'gray', fontWeight: '500' }}>Punch In Time: </Text>
              <Text style={{ color: 'gray', fontWeight: '500' }}>{punchInTime != "" ? punchInTime : '--:--'} </Text>
            </View>
          </TouchableOpacity> */}

        {/* Punch In/Out Buttons */}
        {/* <Text>{JSON.stringify(punchInTime)}</Text> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 12,
            marginVertical: 10,
          }}>
          <View style={[styles.Elevation, styles.punchButton]}>
            <View
              style={[
                styles.Elevation,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 12,
                },
              ]}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: COLORS.darkGray2,
                }}>
                {' '}
                Punch in{' '}
              </Text>
              <MaterialIcons name="verified" size={24} color={COLORS.green} />
            </View>
            <View
              style={{
                borderTopWidth: 0.5,
                borderColor: COLORS.lightGray,
                paddingTop: 12,
              }}>
              <Text
                style={{
                  color: COLORS.darkGray,
                  fontSize: 24,
                  fontWeight: '500',
                }}>
                {!punchTime?.IN ? '--:--' : punchTime?.IN.trim()}{' '}
              </Text>
              <Text style={{color: COLORS.darkGray}}>
                {' '}
                {currentDate[2]} {currentDate[1]}, {currentDate[3]}
              </Text>
            </View>

            <TouchableOpacity
              disabled={punchTime?.IN ? true : false}
              style={{
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: punchTime?.IN
                  ? COLORS.lightGray
                  : COLORS.lightGreen,
                marginTop: 12,
                borderRadius: 12,
              }}
              onPress={() => {
                getCurrentLocation('I');
              }}>
              <Text style={{color: COLORS.voilet}}>
                {loading ? 'loading' : 'Punch in'}{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.Elevation, styles.punchButton]}>
            <View
              style={[
                styles.Elevation,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 12,
                },
              ]}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: COLORS.darkGray2,
                }}>
                {' '}
                Punch out
              </Text>
              <MaterialIcons name="verified" size={24} color={COLORS.green} />
            </View>
            <View
              style={{
                borderTopWidth: 0.5,
                borderColor: COLORS.lightGray,
                paddingTop: 12,
              }}>
              <Text
                style={{
                  color: COLORS.darkGray,
                  fontSize: 24,
                  fontWeight: '500',
                }}>
                {!punchTime?.OUT ? '--:--' : punchTime?.OUT.trim()}{' '}
              </Text>
              <Text style={{color: COLORS.darkGray}}>
                {' '}
                {currentDate[2]} {currentDate[1]}, {currentDate[3]}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.orange,
                marginTop: 12,
                borderRadius: 12,
              }}
              onPress={() => {
                getCurrentLocation('O');
              }}>
              <Text style={{color: COLORS.white}}>
                {loading ? 'loading' : 'Punch out'}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <TouchableOpacity onPress={showDevelopmetMode} style={[styles.attendanceButton, styles.Elevation, { backgroundColor: COLORS.green }]}>
            <Text style={styles.actionText}>Leave apply</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={showDevelopmetMode} style={[styles.attendanceButton, styles.Elevation, { backgroundColor: '#E41B17' },]}>
            <Text style={[styles.actionText]}>Regularize</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={showDevelopmetMode} style={[styles.attendanceButton, styles.Elevation, { backgroundColor: COLORS.lightBlue },]}>
            <Text style={styles.actionText}>Outdoor</Text>
          </TouchableOpacity>
        </View> */}

        <Text style={styles.headerText}>Others</Text>

        {/* Other options */}
        <View style={styles.others}>
          <TouchableOpacity
            style={[
              styles.otherOptions,
              styles.Elevation,
              {width: 120, marginHorizontal: 10},
            ]}
            onPress={() => props.navigation.navigate('Pending Approval')}>
            <Icons name="timetable" size={30} color={COLORS.orange} />
            <Text
              style={{
                color: COLORS.voilet,
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '500',
                padding: 3,
              }}>
              Pending Approval
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={showDevelopmetMode} style={[styles.otherOptions, styles.Elevation]}>
            <Foundation name="megaphone" size={30} color={COLORS.orange} />
            <Text style={{ color: COLORS.voilet, textAlign: 'center', fontSize: 12, fontWeight: '500', padding: 3, }}>Company Announcement</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={showDevelopmetMode} style={[styles.otherOptions, styles.Elevation]}>
            <FontAwesome5 name="birthday-cake" size={30} color={COLORS.orange} />
            <Text style={{ color: COLORS.voilet, textAlign: 'center', fontSize: 12, fontWeight: '500', padding: 3, }}>Birthday & Anniversary</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Elevation: {
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 15,
    color: 'black',
    marginHorizontal: 16,
  },
  attendance: {
    flex: 1,
    flexDirection: 'row',
  },
  recordButton: {
    flex: 1,
    height: 60,
    width: '50%',
    marginVertical: 12,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceButton: {
    flex: 1,
    marginVertical: 4,
    height: 37,
    elevation: 6,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  punchButton: {
    borderColor: COLORS.lightGray,
    padding: 12,
    width: '48%',
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  others: {
    flexDirection: 'row',
    flex: 1,
  },
  otherOptions: {
    height: 100,
    // flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 12,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 0,
    backgroundColor: COLORS.white,
  },
  actionText: {
    color: 'white',
    fontSize: 15,
  },
  punchButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
    paddingHorizontal: 5,
    fontWeight: '500',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
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
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#220046',
    width: 100,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalWrap: {
    minWidth: 100,
    marginVertical: 10,
  },
  modalTextHeading: {
    fontSize: 16,
    fontWeight: '600',
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
  dropDownStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
  },
});

export default Home;
