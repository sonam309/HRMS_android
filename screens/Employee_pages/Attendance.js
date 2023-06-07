import { View, Text, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import Calendar from 'react-native-calendars/src/calendar';
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LeaveBalanceList from '../../data/LeaveBalanceList';
import LinearGradient from 'react-native-linear-gradient';

const Attendance = (props) => {

  return (

    <ScrollView>
      <View>
        {/* calender for attendence */}
        {/* <Calendar style={{ marginBottom: 20, elevation: 4, backgroundColor: 'white' }} headerStyle={{ backgroundColor: '#220046' }} theme={{ arrowColor: 'white', monthTextColor: 'white', textSectionTitleColor: 'white' }}
          markedDates={{

            newDate: { selected: true, marked: true, selectedColor: 'blue' },

          }} /> */}


        {/* Leave Balance */}
        <View >

          <Text style={styles.txtLeaveBalance}>
            Leave Balance
          </Text>

          <View >

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginHorizontal: 10, marginTop: 30 }}>
              {LeaveBalanceList.map((item) => <DrawerIcons icon={item.Icon} header={item.Title} count={item.LeaveCount} color={item.Color} id={item.id} />)}

            </View>

          </View>

        </View>

      </View>
    </ScrollView>
  )





  function DrawerIcons(props) {
    const title = props.header, icon = props.icon, count = props.count, color = props.color, id = props.id
    return (
      <TouchableOpacity key={id} style={{ width: '48%', borderRadius: 20, marginVertical: 8, elevation: 6 }} onPress={() =>
        Alert.alert("click" + id)} >
        <LinearGradient
          colors={['#8B1874', '#432C7A', '#432C7A']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{ borderRadius: 20 }}
        >

          <View  style={{height:100}} > 
            <Icon name={icon} color='white' size={35} style={{marginLeft:20,
            marginTop:10}}/>
            <View style={{ justifyContent: 'center', paddingBottom:10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',marginTop:-20 }}>
              <Text style={{ color: 'white', fontSize: 25, fontWeight: '500', textAlign: 'center' }}>{count}</Text>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '500', textAlign: 'center', width: '100%', flexDirection: 'row' }}>{title}</Text>




            </View>
          </View>
        </LinearGradient>

      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    width: '100%'
  },
  txtLeaveBalance: {
    color: "#220046",
    fontSize: 18,
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
  others: {
    flexDirection: 'row',
    flex: 1,
  },

})
export default Attendance