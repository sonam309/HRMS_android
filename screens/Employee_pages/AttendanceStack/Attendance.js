import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import Calendar from 'react-native-calendars/src/calendar';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LeaveBalanceList from '../../../data/LeaveBalanceList';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../../constants/theme';
import {FONTS} from '../../../constants/font_size';
import Toast from 'react-native-toast-message';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {getAttendanceDailyDetails} from '../../../redux/attendaceDetailSlice';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import {API} from '../../../utility/services';
import {updatePunchTime} from '../../../redux/punchDetailSlice';
import Loader from '../../../components/Loader';
import {useFocusEffect} from '@react-navigation/native';
import DashBoardHeader from '../../../components/DashboardHeader';
import Donut_chart from '../../../assets/images/donut_chart.png';

const Attendance = props => {
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

  const [modalVisible, setModalVisible] = useState(false);
  const {userId, userName} = useSelector(state => state.auth);
  const {currentLocation, punchTime, loading} = useSelector(
    state => state.punchDetail,
  );

  const {attendanceDailyDataList, attendanceLoading, calanderloading} =
    useSelector(state => state.attendaceDetail);

  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState({});
  const [markedDate, setMarkedDate] = useState({});
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  var markedDates = {};

  const [val, setVal] = useState('');

  const isDateSelected = Object.keys(selectedDate).length > 0 ? true : false
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
      monthYear: date.month,
    };

    dispatch(getAttendanceDailyDetails(data));
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
    setLoaderVisible(true);
    axios
      .post(`${API}/api/Admin/Attendance`, {
        userId: userId,
        monthYear: `${m_names[selectedMonth?.getMonth()]}${selectedYear}`,
      })
      .then(response => {
        setLoaderVisible(false);
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
      return () => setSelectedDate({});
    }, []),
  );

  return (
    <View style={styles.container}>
      <DashBoardHeader />
      <Loader loaderVisible={loaderVisible} />

      <ScrollView>
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
        <View>
          {/* Main Content-Calendar */}
          <Calendar
            initialDate=""
            style={{
              marginBottom: 20,
              justifyContent: 'center',
              marginTop: 10,
            }}
            theme={{
              arrowColor: COLORS.black,
              monthTextColor: COLORS.black,
              textSectionTitleColor: COLORS.black,
            }}
            markedDates={markedDate}
            onMonthChange={month => {
              setSelectedYear(month.year);
              setSelectedMonth(new Date(month?.dateString));
            }}
            dayComponent={({date, state, marking}) => {
              const isSelectedDate = selectedDate.dateString == date.dateString;
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log(date.dateString);
                    setSelectedDate(date);
                  }}
                  onLongPress={() => {
                    getDailyAttenceDetails(date);
                    setModalVisible(true);
                    console.log('selected day', date.day);
                  }}
                  style={{
                    alignItems: 'center',
                    padding: 8,
                    // borderBottomWidth: 0.5,
                    borderRadius:
                      selectedDate.dateString == date.dateString ? 50 : 0,
                    width: 50,
                    backgroundColor:
                      selectedDate.dateString == date.dateString
                        ? COLORS.lightBlue
                        : '#fff',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      paddingBottom: marking ? 0 : 11,
                      color:
                        selectedDate.dateString == date.dateString && '#fff',
                    }}>
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
                        style={{
                          backgroundColor: '#DDE6ED',
                          height: 5,
                          width: 10,
                        }}
                      />
                      <View
                        style={{
                          backgroundColor: '#88C385',
                          height: 5,
                          width: 10,
                        }}
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
          />

          {/* attendance summary */}

          <View style={{marginBottom: 20, display: 'none'}}>
            <Text style={styles.txtLeaveBalance}>Attendance summary</Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: '100%',
                marginTop: 10,
              }}>
              <Image
                source={Donut_chart}
                style={{
                  width: 130,
                  height: 130,
                  alignSelf: 'center',
                  marginLeft: 20,
                }}
              />

              <View
                style={{
                  alignSelf: 'flex-end',
                  width: '60%',
                  alignContent: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  flex: 1,
                  marginRight: 10,
                }}>
                <Text
                  style={[
                    styles.attendanceBtn,
                    {backgroundColor: '#E21818', marginBottom: 10},
                  ]}>
                  Absents 20
                </Text>

                <Text
                  style={[
                    styles.attendanceBtn,
                    {backgroundColor: '#0079FF', marginBottom: 10},
                  ]}>
                  Leves 5
                </Text>

                <Text
                  style={[styles.attendanceBtn, {backgroundColor: '#FFB200'}]}>
                  HalfDay 2
                </Text>
              </View>
            </View>
          </View>

          {/* Leave Balance */}
          <View style={{display: 'none'}}>
            <Text style={styles.txtLeaveBalance}>Leave Balance</Text>

            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  marginHorizontal: 10,
                }}>
                {LeaveBalanceList.map(item => (
                  <DrawerIcons
                    icon={item.Icon}
                    header={item.Title}
                    count={item.LeaveCount}
                    color={item.Color}
                    key={item.id}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Regulization */}

          <View style={{paddingTop: 20, marginBottom: 30, }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (!Object.keys(selectedDate).length > 0) {
                    Toast.show({
                      type: 'error',
                      text1: 'Select a date to Regularize',
                    });
                  } else {
                    props.navigation.navigate('Attendance', {
                      screen: 'Regulization',
                      params: {
                        selectedDate,
                        selectedMonth: m_names[selectedMonth?.getMonth()],
                      },
                    });
                  }
                }}
                style={{
                  backgroundColor:
                    Object.keys(selectedDate).length > 0
                      ? COLORS.disableOrange1
                      : "#F1F1F1",
                  borderRadius: 10,
                  padding: 10,
                  width: responsiveWidth(90) / 3.5,
                  height: 100,
                 
                }}>
                <View
                  style={{
                    height: 60,
                    width: 60,
                    position: 'absolute',
                    top: -20,
                    backgroundColor: isDateSelected ? COLORS.disableOrange1 : COLORS.lightGray,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                  <Image
                    source={require('../../../assets/images/leave.png')}
                    style={{
                      height: 60,
                      width: 60,
                    }}
                  />
                </View>
                <Text
                  style={{
                    marginTop: 20,
                    ...FONTS.h3,
                    color: isDateSelected ? COLORS.black : COLORS.gray,
                    marginTop: 60,
                  }}>
                  Regularize
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor:
                  Object.keys(selectedDate).length > 0
                    ? COLORS.disableOrange1
                    : "#F1F1F1",                  borderRadius: 10,
                  padding: 10,
                  width: responsiveWidth(90) / 3.5,
                  height: 100,
                }}>
                <Image
                  source={require('../../../assets/images/briefcase.png')}
                  style={{
                    height: 60,
                    width: 60,
                    position: 'absolute',
                    top: -20,
                    backgroundColor: isDateSelected ? COLORS.disableOrange1 : COLORS.lightGray,
                    borderRadius: 100,
                  }}
                />
                <Text
                  style={{
                    marginTop: 20,
                    ...FONTS.h3,
                    color: isDateSelected ? COLORS.black : COLORS.gray,
                    marginTop: 60,
                  }}>
                  Outdoor
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Attendance', {
                    screen: 'Leave',
                  })
                }
                style={{
                  backgroundColor:
                  Object.keys(selectedDate).length > 0
                    ? COLORS.disableOrange1
                    : "#F1F1F1",                  borderRadius: 10,
                  padding: 10,
                  width: responsiveWidth(90) / 3.5,
                  height: 100,
                }}>
                  <View
                  style={{
                    height: 60,
                    width: 60,
                    position: 'absolute',
                    top: -20,
                    backgroundColor: isDateSelected ? COLORS.disableOrange1 : COLORS.lightGray,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                <Image
                  source={require('../../../assets/images/outdoor.png')}
                  style={{
                    height: 60,
                    width: 60,
                  }}
                />
                </View>
                <Text
                  style={{
                    marginTop: 20,
                    ...FONTS.h3,
                    color: isDateSelected ? COLORS.black : COLORS.gray,
                    marginTop: 60,
                  }}>
                  Leave
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  function DrawerIcons(props) {
    const title = props.header,
      icon = props.icon,
      count = props.count,
      color = props.color,
      id = props.id;
    return (
      <TouchableOpacity
        key={id}
        style={{width: '48%', borderRadius: 20, marginVertical: 8}}
        onPress={() =>
          Toast.show({
            type: 'success',
            text1: 'Data Save Successfully',
          })
        }>
        <LinearGradient
          colors={[COLORS.disableOrange1, COLORS.lightOrange]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={{borderRadius: 30}}>
          <View style={{height: 60}}>
            <Icon
              name={icon}
              color={COLORS.orange1}
              size={30}
              style={{
                marginLeft: 20,
                marginTop: 5,
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -30,
              }}>
              <Text
                style={{color: COLORS.white, ...FONTS.h4, textAlign: 'center'}}>
                {count}
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h4,
                  textAlign: 'center',
                  width: '100%',
                  flexDirection: 'row',
                }}>
                {title}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  txtLeaveBalance: {
    color: '#220046',
    fontSize: 15,
    fontWeight: '500',
    padding: 6,
    marginLeft: 10,
  },
  Elevation: {
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  attendanceBtn: {
    color: 'white',
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'center',
    padding: 6,
    borderRadius: 6,
    borderColor: 'white',
    borderWidth: 1,
    elevation: 8,
  },

  regilizationBtn: {
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: 'center',
    elevation: 6,
    color: 'white',
    width: responsiveWidth(30),
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14,
    fontWeight: 500,
  },
  modalWrap: {
    minWidth: 100,
    marginVertical: 10,
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
    backgroundColor: "#fff"
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
export default Attendance;
