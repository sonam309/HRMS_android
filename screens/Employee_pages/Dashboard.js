import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
  Modal,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Calendar from 'react-native-calendars/src/calendar';
import axios from 'axios';
import moment from 'moment';
import Geolocation from '../../functions/Geolocation';
import {DrawerActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../components/Loader';
// import {FONTS, COLORS, SIZES} from '../../constants/theme';
import COLORS from '../../constants/theme';

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
  const {userName, password, full_name} = props.route.params;
  let Name = full_name[0];
  const [punchButtonColor, setPunchButtonColor] = useState(COLORS.green);
  const [inOut, setInOut] = useState('In');
  const [punchInToken, setPunchInToken] = useState('I');
  const [punchInTime, setPunchInTime] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [markedDate, setMarkedDate] = useState({});
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [year, setYear] = useState(new Date());
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const userData = {loginId: userName, password: password, oprFlag: 'L'};
  var markedDates = {};
  let loginId = userName;
  let inTime = '';
  let timeIn = '';
  let presentDays = 0;
  let absentDays = 0;
  let count = 0;

  const getCurrentLocation = async val => {
    Geolocation({val, userName, userData});
  };
  const loadingData = async val => {
    // fetching data
    let data = await fetch(
      'https://econnectsatya.com:7033/api/Admin/punchinOut',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operFlag: val,
          userId: loginId,
        }),
      },
    );
    // data to json form
    data = await data.json()
    data = data.Result;
    // console.warn(data);
    data.map(a => a.IN) != "" ? (inTime = data.map(a => a.IN.trim())) : inTime = ""
    data.map(b => b.DUR) != "" ? (timeIn = data.map(b => b.DUR.trim())) : timeIn = "";
    setPunchInTime(inTime);
    setDuration(timeIn)
    inTime != "" ? (setPunchButtonColor('red'), setInOut('Out'), setPunchInToken('O')) : (setPunchButtonColor(COLORS.green), setInOut('In'), setPunchInToken('I'))
    setLoaderVisible(false)
  }

  useEffect(() => {
    loadingData('O');
    getAttendance();
    // for handling back button in android
    const backAction = () => {
      Alert.alert('Wait', 'Are you sure, you want to exit the App?', [
        {
          text: 'No',
          onPress: () => null,
        },
        {
          text: 'Yes',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };
    const backPressHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backPressHandler.remove();
    };
  }, []);

  useEffect(() => {
    count = 0;
    presentDays = 0;
    absentDays = 0;
    getAttendance();
  }, [selectedMonth]);

  const getAttendance = () => {
    axios
      .post(`https://econnectsatya.com:7033/api/Admin/Attendance`, {
        userId: userName,
        monthYear: `${m_names[selectedMonth?.getMonth()]}${selectedYear}`,
      })
      .then(response => {
        const returnedData = response?.data?.Result;
        // Create the final object
        // console.warn("Returned data is "+returnedData);
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
            markedDates[date].dotColor === 'red' ? (absentDays += 1) : null;
            markedDates[date].dotColor === ('orange' || '#33AA54')
              ? (presentDays += 1)
              : null;
          }
        });
        setMarkedDate(markedDates);
        count = 1;
        setPresent(presentDays);
        setAbsent(absentDays);
      });
  };
  return (
    <View style={styles.container}>
      <Loader loaderVisible={loaderVisible} />

      <ScrollView>
        {/* header */}
        <SafeAreaView
          style={{
            height: 50,
            flexDirection: 'row',
            backgroundColor: COLORS.voilet,
            alignItems: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            style={{paddingHorizontal: 14}}
            onPress={() =>
              props.navigation.dispatch(DrawerActions.openDrawer())
            }>
            <Icons name="reorder-horizontal" color="white" size={25} />
          </TouchableOpacity>
          <View>
            <Text style={{color: 'white'}}>
              Welcome |{' '}
              {Name.length < 15 ? `${Name}` : `${Name?.substring(0, 15)}...`}{' '}
            </Text>
          </View>
          <TouchableOpacity
            style={{position: 'absolute', right: 10}}
            onPress={() =>
              props.navigation.dispatch(DrawerActions.openDrawer())
            }>
            <Icons name="bell-ring-outline" color="white" size={30} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Main Content-Calendar */}
        <Calendar
          initialDate={year}
          style={{
            marginBottom: 20,
            elevation: 4,
            backgroundColor: '#fff',
            height: 400,
            justifyContent: 'center',
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

          dayComponent={({date, state, marking}) => {
            return (
              <TouchableOpacity
                onLongPress={() => {
                  setModalVisible(true);
                  console.log('selected day', date.day);
                }}
                style={{
                  // padding: -5,
                  alignItems: 'center',
                  borderColor: COLORS.lightGray,
                  paddingBottom: 8,
                  borderBottomWidth: 0.5,
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    paddingBottom: marking ? 0 : 11,
                  }}>
                  {date.day}
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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 12,
            marginBottom: 20,
          }}>
          <View
            style={[
              styles.Elevation,
              {
                // borderWidth: 0.5,
                borderColor: COLORS.lightGray,
                padding: 12,
                width: '45%',
                borderRadius: 12,
                backgroundColor: COLORS.white,
              },
            ]}>
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
                  fontSize:16,
                  fontWeight: '500',
                  color: COLORS.darkGray2,
                }}>
                Punch in
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
                8:35
              </Text>
              <Text
                style={{
                  color: COLORS.darkGray,
                }}>
                {currentDate[2]}
                {currentDate[1]}, {currentDate[3]}{' '}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.transparentVoilet,
                marginTop: 12,
                borderRadius: 12,
              }}>
              <Text
                style={{
                  color: COLORS.voilet,
                }}>
                Punch in
              </Text>
            </TouchableOpacity>
          </View>
          <View></View>
          <View
            style={[
              styles.Elevation,
              {
                // borderWidth: 0.5,
                borderColor: COLORS.lightGray,
                padding: 12,
                width: '45%',
                borderRadius: 12,
                backgroundColor: COLORS.white,
              },
            ]}>
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
                  fontSize:16,
                  fontWeight: '500',
                  color: COLORS.darkGray2,
                }}>
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
                8:35
              </Text>
              <Text
                style={{
                  color: COLORS.darkGray,
                }}>
                {currentDate[2]}
                {currentDate[1]}, {currentDate[3]}{' '}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.voilet,
                marginTop: 12,
                borderRadius: 12,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                }}>
                Punch out
              </Text>
            </TouchableOpacity>
          </View>
          <View></View>
        </View>

        {/* <View style={{ flexDirection: 'row', padding: 5, width: '100%' }}>

          <View style={[{ borderColor: COLORS.lightGray }, styles.punchButton, styles.Elevation]}>

            <Text style={{ color: COLORS.gray, fontSize: 12, fontWeight: '500', marginHorizontal: 5, marginVertical: 10, fontSize: 20, borderBottomColor: COLORS.gray, borderBottomWidth: 1, }}>Punch In</Text>
            <Text style={{ padding: 4 }}>{currentDate[2]} {currentDate[1]} </Text>
            <Text style={{ padding: 4, fontSize: 24 }}>{punchInTime[0]}</Text>
            <Text style={{ padding: 4 }}>Punch In Time</Text>

            <TouchableOpacity style={{ backgroundColor: COLORS.lighterVoilet, borderRadius: 12 }}>
              <Text style={{ color: COLORS.white, paddingVertical: 10, textAlign: 'center' }}>Punch In</Text>
            </TouchableOpacity>

          </View>

          <View style={[{ borderColor: COLORS.lightGray }, styles.punchButton, styles.Elevation]}>

            <Text style={{ color: COLORS.gray, fontSize: 12, fontWeight: '500', marginHorizontal: 5, marginVertical: 10, fontSize: 20, borderBottomColor: COLORS.gray, borderBottomWidth: 1, }}>Punch Out</Text>
            <Text style={{ padding: 4 }}>{currentDate[2]} {currentDate[1]} </Text>
            <Text style={{ padding: 4, fontSize: 24 }}>{duration[0]} </Text>
            <Text style={{ padding: 4 }}> hrs spent today</Text>

            <TouchableOpacity style={{ backgroundColor: COLORS.lightGray, borderRadius: 12 }}>
              <Text style={{ color: COLORS.white, paddingVertical: 10, textAlign: 'center' }}>Punch Out</Text>
            </TouchableOpacity>

          </View>


        </View> */}

        {/* <View style={{ flexDirection: 'row', padding: 5 }}>

          <TouchableOpacity style={styles.recordButton} onPress={() => { props.navigation.navigate('Attendance') }} >
            <LinearGradient colors={['#77037B', '#210062']} style={{ borderRadius: 8, padding: 5, width: '100%' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text style={{ color: COLORS.white, textAlignVertical: 'center', fontSize: 16 }}> {present} days</Text>
                <Icons name='calendar-month-outline' size={30} color={COLORS.white} />
              </View>
              <Text style={{ color: COLORS.white, textAlign: 'center' }}> Attended this month</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.recordButton} onPress={() => { props.navigation.navigate('Attendance') }} >
            <LinearGradient colors={['#77037B', '#210062']} style={{ borderRadius: 8, padding: 5, width: '100%' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text style={{ color: COLORS.white, textAlignVertical: 'center', fontSize: 16 }}> {absent} days</Text>
                <Icons name='calendar-month-outline' size={30} color={COLORS.white} />
              </View>
              <Text style={{ color: COLORS.white, textAlign: 'center' }}>Leaves this month</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View> */}

        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <TouchableOpacity
            style={[
              styles.attendanceButton,
              styles.Elevation,
              {backgroundColor: COLORS.green},
            ]}>
            <Text style={styles.actionText}>Leave apply</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.attendanceButton,
              styles.Elevation,
              {backgroundColor: '#E41B17'},
            ]}>
            <Text style={[styles.actionText]}>Regularize</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.attendanceButton,
              styles.Elevation,
              {backgroundColor: COLORS.orange},
            ]}>
            <Text style={styles.actionText}>Outdoor</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.headerText}>Others</Text>

        {/* Other options */}
        <View style={styles.others}>
          <TouchableOpacity
            style={[styles.otherOptions, styles.Elevation]}
            onPress={() => props.navigation.navigate('Pending Approval')}>
            <Icons name="timetable" size={30} color={COLORS.pink} />
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

          <TouchableOpacity style={[styles.otherOptions, styles.Elevation]}>
            <Foundation name="megaphone" size={30} color={COLORS.pink} />
            <Text
              style={{
                color: COLORS.voilet,
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '500',
                padding: 3,
              }}>
              Company Announcement
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.otherOptions, styles.Elevation]}>
            <FontAwesome5 name="birthday-cake" size={30} color={COLORS.pink} />
            <Text
              style={{
                color: COLORS.voilet,
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '500',
                padding: 3,
              }}>
              Birthday & Anniversary
            </Text>
          </TouchableOpacity>
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
    fontWeight: 500,
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
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
  },
  others: {
    flexDirection: 'row',
    flex: 1,
  },
  otherOptions: {
    height: 100,
    flex: 1,
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
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxer: {
    padding: 30,
    borderRadius: 20,
  },
});

export default Home;
