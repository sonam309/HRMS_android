import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert, BackHandler, Modal, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Calendar from 'react-native-calendars/src/calendar';
import axios from 'axios';
import moment from 'moment';
import COLORS from '../../constants/theme';
import Geolocation from '../../functions/Geolocation';

const Home = (props) => {
  var m_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const { userName, password } = props.route.params;
  const [punchButtonColor, setPunchButtonColor] = useState(COLORS.green)
  const [inOut, setInOut] = useState("In")
  const [punchInToken, setPunchInToken] = useState("I")
  const [punchInTime, setPunchInTime] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [markedDate, setMarkedDate] = useState({});
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [year, setYear] = useState(new Date());
  const userData = { loginId: userName, password: password, oprFlag: 'L' };
  var markedDates = {};
  let loginId = userName
  let inTime = "";
  let timeIn = "";

  const getCurrentLocation = async (val) => {
    Geolocation({ val, userName, userData });
  }
  const loadingData = async (val) => {
    // fetching data 
    let data = await fetch("https://econnectsatya.com:7033/api/Admin/punchinOut", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operFlag: val,
        userId: loginId,
      }),
    })
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
    loadingData("O");
    getAttendance();
    // for handling back button in android
    const backAction = () => {
      Alert.alert("Wait", "Are you sure, you want to exit the App?", [{
        text: "No",
        onPress: () => null
      }, {
        text: "Yes",
        onPress: () => BackHandler.exitApp()
      }]);
      return true;
    }
    const backPressHandler = BackHandler.addEventListener(
      "hardwareBackPress", backAction
    );
    return () => {
      backPressHandler.remove();
    }
  }, [])

  useEffect(() => {
    getAttendance()
  }, [selectedMonth])
  const getAttendance = () => {
    axios
      .post(`https://econnectsatya.com:7033/api/Admin/Attendance`, {
        userId: '10011',
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
            markedDotColor = 'gray';
          } else {
            markedDotColor = '#fff';
          }
          // Add the date as a key to the final object
          markedDates[date] = { marked: true, dotColor: markedDotColor };
        });
        setMarkedDate(markedDates)
      });
  };

  return (
    <View style={styles.container}>
      {loaderVisible ? <View style={{ width: '100%', height: '100%', position: 'absolute', opacity: 0.5, backgroundColor: 'black', zIndex: 1 }}>
        <Modal transparent={true} animationType='slide' visible={loaderVisible}>
          <View style={styles.wrapper}>
            <View style={styles.boxer}>
              <ActivityIndicator color='#ec672f' size={70} />
            </View>
          </View>
        </Modal>
      </View > : null}
      <ScrollView>
        {/* Main Content-Calendar */}
        <Calendar
          initialDate={year}
          style={{ marginBottom: 20, elevation: 4, backgroundColor: '#fff' }}
          headerStyle={{ backgroundColor: '#220046' }}
          theme={{
            arrowColor: 'white',
            monthTextColor: 'white',
            textSectionTitleColor: 'white',
          }}
          markedDates={markedDate}
          onMonthChange={month => {
            setSelectedYear(month.year);
            setSelectedMonth(new Date(month?.dateString));
          }}
          dayComponent={({ date, state, marking }) => {
            return (
              <TouchableOpacity
                onLongPress={() => {
                  setModalVisible(true);
                  console.log('selected day', date.day);
                }}
                style={{
                  padding: 5,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
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
                      transform: [{ rotate: '90deg' }],
                      elevation: 2,
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
                      }}
                    />
                  )
                )}
              </TouchableOpacity>
            );
          }}
        />
        {/* Punch In Button */}


        <View style={styles.attendance}>

          <View style={{ width: '50%' }}>
            {/* <View style={{backgroundColor:'red'}}> */}
            <TouchableOpacity onPress={() => { getCurrentLocation(punchInToken) }} style={[styles.punchButton, { borderColor: `${punchButtonColor}` }]} >
              <MaterialCommunityIcons name='gesture-double-tap' size={35} color={`${punchButtonColor}`} />
              <Text style={[styles.punchButtonText, { color: `${punchButtonColor}` }]}>Punch {inOut}</Text>
            </TouchableOpacity>
            {/* </View> */}
            <View style={[{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }]}>

              <MaterialCommunityIcons name='clock-outline' size={45} color={COLORS.voilet} />

              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: 'blue', fontWeight: '500', textAlign: 'center' }}>{duration != "" ? duration : '--:--'} hrs</Text>
                <Text style={{ color: 'black', fontWeight: '500' }}>Spent Today</Text>
              </View>

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'black', fontWeight: '500' }}>Punch In Time: <Text style={{ color: 'blue', fontWeight: '500' }}>{punchInTime != "" ? punchInTime : '--:--'} </Text>  </Text>
            </View>

          </View>

          <View style={{ width: '50%' }}>

            <TouchableOpacity style={[styles.attendanceButton, { backgroundColor: '#379237' }]} >
              <Text style={styles.actionText}>Leave apply</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.attendanceButton, styles.Elevation, { backgroundColor: '#D21312' }]} >
              <Text style={[styles.actionText]}>Regularize</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.attendanceButton, styles.Elevation, { backgroundColor: '#EB984E' }]} >
              <Text style={styles.actionText}>Outdoor</Text>
            </TouchableOpacity>

          </View>

        </View>

        {/* Other */}
        <Text style={styles.headerText}>Others</Text>

        {/* Other options */}
        <View style={styles.others}>
          <TouchableOpacity style={[styles.otherOptions, styles.Elevation]}
          onPress={()=>(props.navigation.navigate("Pending Approval"))}
          >
            <MaterialCommunityIcons name='timetable' size={30} color={COLORS.pink} />
            <Text style={{ color: COLORS.voilet, textAlign: 'center', fontSize: 12, fontWeight: '500', padding: 3 }}>Pending Approval</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.otherOptions, styles.Elevation]}>
            <Foundation name='megaphone' size={30} color={COLORS.pink} />
            <Text style={{ color: COLORS.voilet, textAlign: 'center', fontSize: 12, fontWeight: '500', padding: 3 }}>Company Announcement</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.otherOptions, styles.Elevation]}>
            <FontAwesome5 name='birthday-cake' size={30} color={COLORS.pink} />
            <Text style={{ color: COLORS.voilet, textAlign: 'center', fontSize: 12, fontWeight: '500', padding: 3 }}>Birthday & Anniversary</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  )
}

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
    marginHorizontal: 16
  },
  attendance: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'white',
    // paddingHorizontal: 10,
    borderRadius: 8,
    // marginHorizontal: 5,
    // marginVertical: 8
  },
  attendanceButton: {
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
    margin: 8,
    height: 45,
    borderRadius: 35,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 8,
    borderWidth: 1.5,
    justifyContent: 'center',
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
    borderRadius: 0
  },
  actionText: {
    color: 'white',
    fontSize: 15
  },
  punchButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
    paddingLeft: 10,
    color: 'red',
    fontWeight: '500',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxer: {
    padding: 30,
    borderRadius: 20
  }
})

export default Home