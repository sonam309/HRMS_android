import { View, Text, ScrollView, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Calendar from 'react-native-calendars/src/calendar';
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LeaveBalanceList from '../../data/LeaveBalanceList';
import LinearGradient from 'react-native-linear-gradient';
import donut_chart from '../../assets/images/donut_chart.png'
import COLORS from '../../constants/theme';
import { FONTS } from '../../constants/font_size';

const Attendance = (props) => {

  return (

    <ScrollView>
      <View>
        {/* calender for attendence */}
        <Calendar style={{ marginBottom: 20, elevation: 4, backgroundColor: 'white' }} headerStyle={{ backgroundColor: COLORS.green }} theme={{ arrowColor: 'white', monthTextColor: 'white', textSectionTitleColor: 'white' }}
          markedDates={{

            newDate: { selected: true, marked: true, selectedColor: 'blue' },

          }} />


        {/* attendance summary */}

        <View style={{ marginBottom: 20 }}>
          <Text style={styles.txtLeaveBalance}>
            Attendance summary
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', width: '100%', marginTop: 10 }}>


            <Image source={donut_chart} style={{ width: 130, height: 130, alignSelf: 'center', marginLeft: 20 }} />

            <View style={{
              alignSelf: 'flex-end', width: '60%', alignContent: 'center', justifyContent: 'center', flexDirection: 'column',
              flex: 1, marginRight: 10
            }}>

              <Text style={[styles.attendanceBtn, { backgroundColor: '#E21818', marginBottom: 10 }]}>
                Absents 20</Text>

              <Text style={[styles.attendanceBtn, { backgroundColor: '#0079FF', marginBottom: 10 }]}>
                Leves 5</Text>

              <Text style={[styles.attendanceBtn, { backgroundColor: '#FFB200' }]}>
                HalfDay 2</Text>
            </View>

          </View>
        </View>


        {/* Leave Balance */}
        <View >

          <Text style={styles.txtLeaveBalance}>
            Leave Balance
          </Text>

          <View >

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginHorizontal: 10 }}>
              {LeaveBalanceList.map((item) => <DrawerIcons icon={item.Icon} header={item.Title} count={item.LeaveCount} color={item.Color} key={item.id} />)}

            </View>

          </View>

        </View>


        {/* Regulization */}

        <View style={{ marginTop: 20, marginBottom: 30 }}>

          <View style={{
            flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: 5,
          }}>

            <Text style={[styles.regilizationBtn, { backgroundColor: '#28B463', borderColor: '#239B56' }]}
              onPress={() => props.navigation.navigate("Apply_Leave")}>

              Regulization

            </Text>
            <Text style={[styles.regilizationBtn, { backgroundColor: '#EB984E', borderColor: '#E67E22' }]}>

              Outdoor

            </Text>
            <Text style={[styles.regilizationBtn, { backgroundColor: '#5DADE2', borderColor: '#3498DB' }]}>

              Leave

            </Text>

          </View>

        </View>




      </View>
    </ScrollView>
  )





  function DrawerIcons(props) {
    const title = props.header, icon = props.icon, count = props.count, color = props.color, id = props.id
    return (
      <TouchableOpacity key={id} style={{ width: '48%', borderRadius: 20, marginVertical: 8, }} onPress={() =>
        Alert.alert("click" + id)} >
        <LinearGradient
          colors={[COLORS.disableOrange1, COLORS.lightOrange]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{ borderRadius: 30 }}
        >

          <View style={{ height: 60, }} >
            <Icon name={icon} color={COLORS.orange1} size={30} style={{
              marginLeft: 20,
              marginTop: 5
            }} />
            <View style={{ justifyContent: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: -30 }}>
              <Text style={{ color: COLORS.white, ...FONTS.h4, textAlign: 'center' }}>{count}</Text>
              <Text style={{ color: COLORS.white, ...FONTS.h4, textAlign: 'center', width: '100%', flexDirection: 'row' }}>{title}</Text>




            </View>
          </View>
        </LinearGradient>

      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  txtLeaveBalance: {
    color: "#220046",
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
    elevation: 8
  },
  regilizationBtn: {
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: 'center',
    elevation: 6,
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14,
    fontWeight: 500
  }

})
export default Attendance