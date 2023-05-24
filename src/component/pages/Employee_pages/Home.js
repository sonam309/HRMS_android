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
  const {userName} = props.route.params;
  // console.warn({userName});

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
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  }

  const getCurrentLocation = async (val) => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );
    granted === PermissionsAndroid.RESULTS.GRANTED ? (GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 30000,
    })
      .then(location => {
        console.log(location);
        let dist = getDistInKm(location.latitude, location.longitude, 28.54054054054054, 77.34496209068595)
        if (dist < 0.5) {
          punchInClick(val);
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
      // .then((responseData) => {
      //   console.warn(JSON.stringify(responseData.Result));
      // });
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
    inTime = data.map(a => a.IN.trim())
    timeIn = data.map(b => b.DUR.trim())
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
    <ScrollView>
      {/* Main Content-Calendar */}

      <Calendar style={{ margin: 0, marginBottom: 20, elevation: 4, backgroundColor: '#fff' }} headerStyle={{ backgroundColor: 'blue', color: 'red' }} theme={{ arrowColor: 'white', monthTextColor: 'white', textSectionTitleColor: 'white' }} />


      {/* Actions */}
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 7, marginLeft: 12 }}>

        {/* Punch In Button  */}
        <View>
          <TouchableOpacity onPress={() => { getCurrentLocation(punchInToken) }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 160, height: 160, borderRadius: 80, backgroundColor: `${punchButtonColor}` }} >
            <MaterialCommunityIcons name='gesture-double-tap' size={65} color='white' style={{ marginTop: 30, marginBottom: 0 }} />
            <Text style={[styles.actionText, { marginTop: -40 }]}>Punch {inOut}</Text>
          </TouchableOpacity>
        </View>

        {/* other actions */}
        <View>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'orange' }]} >
            <Text style={styles.actionText}>Leave apply</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'red' }]} >
            <Text style={styles.actionText}>Regularize</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#721885' }]} >
            <Text style={styles.actionText}>Outdoor</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Details */}

      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 14, marginHorizontal: 10 }}>
        <View>
          <Text>Punch In Time: <Text style={{ color: 'blue', fontWeight: '500' }}>{punchInTime != "" ? punchInTime : '--:--'} </Text>  </Text>
          <Text>Time Spent: <Text style={{ color: 'blue', fontWeight: '500' }}>{duration != "" ? duration : '--:--'}</Text> </Text>
        </View>
        <View>
          <Text>Absences this month:</Text>
          <Text>Leaves Available:</Text>
        </View>
      </View>


      {/* Other */}
      <Text style={{ fontSize: 20, fontWeight: 500, color: 'black' }}>Others</Text>

      {/* Other options */}
      <View style={styles.others}>
        <View style={styles.otherOptions}>
          <MaterialCommunityIcons name='timetable' size={30} color='blue' />
          <Text>Pending Approval</Text>
        </View>
        <View style={styles.otherOptions}>
          <Foundation name='megaphone' size={30} color='blue' />
          <Text>Company Announcement</Text>
        </View>
        <View style={styles.otherOptions}>
          <FontAwesome5 name='birthday-cake' size={30} color="blue" />
          <Text>Birthday & Anniversary</Text>
        </View>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  others: {
    flexDirection: 'row',
    flex: 1,
  },
  otherOptions: {
    height: 90,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7,
    marginTop: 12,
    marginHorizontal: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 0
  },
  buttonContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 20
  },
  actionButton: {
    width: 200,
    height: 40,
    borderRadius: 15,
    marginVertical: 6
  },
  actionText: {
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  }
})


export default Home