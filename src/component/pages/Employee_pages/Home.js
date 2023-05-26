import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, PermissionsAndroid, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Calendar from 'react-native-calendars/src/calendar';
import GetLocation from 'react-native-get-location'
import { useNavigation } from '@react-navigation/native';

const Home = (props) => {
  const { userName } = props.route.params;

  // preventing going to entry page
  const navigation = useNavigation();
  useEffect(() => {
    const preventBack = navigation.addListener('beforeRemove', event => {
      event.preventDefault();
    })
    return preventBack
  }, [navigation])

  let loginId = userName
  const [punchButtonColor, setPunchButtonColor] = useState("blue")
  const [inOut, setInOut] = useState("In")
  const [punchInToken, setPunchInToken] = useState("I")
  const [punchInTime, setPunchInTime] = useState("");
  const [duration, setDuration] = useState("");
  let inTime = "";
  let timeIn = "";

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }

  // distance from longitude and latitutde in KM
  const getDistInKm = (lat1, lon1, lat2, lon2) => {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1);  // deg2rad above
    let dLon = deg2rad(lon2 - lon1);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  }

  const getCurrentLocation = async (val) => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );
    granted === PermissionsAndroid.RESULTS.GRANTED ? (GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
    })
      .then(location => {
        console.log(location);
        let dist = getDistInKm(location.latitude, location.longitude, 28.5443907, 77.3310235)
        if (dist < 0.5) {
          punchInClick(val);
          Alert.alert("Punched Out Succesfully")
        } else { Alert.alert(`Punch ${inOut} from your office`) }
      })
      .catch(error => {
        const { code, message } = error;
        Alert.alert(code, message);
      })) : (Alert.alert("Location permission not granted"))
  }

  // Punch In, Out function on clicking
  const punchInClick = (val) => {
    fetch("https://econnectsatya.com:7033/api/Admin/punchinOut", {
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
      .then((response) => response.json())
    loadingData(val);
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
    inTime != "" ? setPunchButtonColor('red') : setPunchButtonColor('blue')
    inTime != "" ? setInOut('Out') : setInOut('In')
    inTime != "" ? setPunchInToken('O') : setPunchInToken('I')
  }

  useEffect(() => {
    loadingData("O");
  }, [])

  return (
    <View style={{ flex: 1, padding: 0, margin: 0 }}>
      <ScrollView>
        {/* Main Content-Calendar */}

        <Calendar style={{ marginBottom: 20, elevation: 4, backgroundColor: '#fff' }} headerStyle={{ backgroundColor: 'blue' }} theme={{ arrowColor: 'white', monthTextColor: 'white', textSectionTitleColor: 'white' }} />

        {/* Punch In Button */}

        <View style={styles.attendance}>
          <TouchableOpacity onPress={() => { getCurrentLocation(punchInToken) }} style={[styles.punchInOutButton, { backgroundColor: `${punchButtonColor}` }, styles.Elevation]} >
            <MaterialCommunityIcons name='gesture-double-tap' size={37} color='white' />
            <Text style={[styles.punchInOutButtonText]}>Punch {inOut}</Text>
          </TouchableOpacity>

          <View>

            <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }]}>
              <MaterialCommunityIcons name='clock-outline' size={50} color="black" />
              <View>
                <Text style={{ color: 'blue', fontWeight: '500' }}>{duration != "" ? duration : '--:--'} hrs</Text>
                <Text style={{ color: 'black' }}>Spent Today</Text>
              </View>
            </View>
            <View style={{ flex: 1, paddingLeft: 8 }}>
              <Text style={{ color: 'black' }}>Punch In Time: <Text style={{ color: 'blue', fontWeight: '500' }}>{punchInTime != "" ? punchInTime : '--:--'} </Text>  </Text>
            </View>
          </View>

        </View>

        {/* Attendance and Time Options */}

        <Text style={styles.headerText}>Your Time & Attendance </Text>

        <View style={[styles.attendance]}>

          <View>

            <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }]}>
              <MaterialCommunityIcons name='clock-outline' size={50} color="black" />
              <View>
                <Text style={{ color: 'blue', fontWeight: '500' }}>{duration != "" ? duration : '--:--'} hrs</Text>
                <Text style={{ color: 'black' }}>Spent Today</Text>
              </View>
            </View>

            <View style={{ flex: 1, paddingLeft: 8 }}>
              <Text style={{ color: 'black' }}>Punch In Time: <Text style={{ color: 'blue', fontWeight: '500' }}>{punchInTime != "" ? punchInTime : '--:--'} </Text>  </Text>
            </View>

          </View>

          <View>
            <TouchableOpacity style={[styles.attendanceButton, styles.Elevation, { backgroundColor: '#0ce83f' }]} >
              <Text style={styles.actionText}>Leave apply</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.attendanceButton, styles.Elevation, { backgroundColor: 'red' }]} >
              <Text style={[styles.actionText, { color: 'white' }]}>Regularize</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.attendanceButton, styles.Elevation, { backgroundColor: 'orange' }]} >
              <Text style={styles.actionText}>Outdoor</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Other */}
        <Text style={styles.headerText}>Others</Text>

        {/* Other options */}
        <View style={styles.others}>
          <View style={[styles.otherOptions, styles.Elevation]}>
            <MaterialCommunityIcons name='timetable' size={30} color='blue' />
            <Text style={{ color: 'black' }}>Pending Approval</Text>
          </View>
          <View style={[styles.otherOptions, styles.Elevation]}>
            <Foundation name='megaphone' size={30} color='blue' />
            <Text style={{ color: 'black' }}>Company Announcement</Text>
          </View>
          <View style={[styles.otherOptions, styles.Elevation]}>
            <FontAwesome5 name='birthday-cake' size={30} color="blue" />
            <Text style={{ color: 'black' }}>Birthday & Anniversary</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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
  headerText: {
    fontSize: 20,
    fontWeight: 500,
    color: 'black',
    marginHorizontal: 16
  },
  attendance: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 8,
    elevation: 4,
    marginHorizontal: 2,
    marginVertical: 8
  },
  attendanceButton: {
    height: 40,
    paddingHorizontal: 10,
    width: 160,
    borderRadius: 35,
    marginVertical: 4
  },
  others: {
    flexDirection: 'row',
    flex: 1,
  },
  otherOptions: {
    height: 100,
    flex: 1,
    backgroundColor: 'beige',
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
  actionButton: {
    width: 180,
    height: 40,
    borderRadius: 15,
    marginVertical: 6
  },
  actionText: {
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'black',
    fontSize: 15
  },
  leaveButton: {
    marginBottom: 12,
    marginHorizontal: 25,
    height: 40,
    borderRadius: 35,
  },
  punchInOutButton: {
    flex: 1,
    marginVertical: 12,
    marginHorizontal: 25,
    height: 75,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  punchInOutButtonText: {
    marginHorizontal: 15,
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    paddingBottom:4
  },
})

export default Home