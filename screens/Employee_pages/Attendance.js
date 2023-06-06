import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import Calendar from 'react-native-calendars/src/calendar';
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LeaveBalanceList from '../../data/LeaveBalanceList';

const Attendance = (props) => {

  let newDate = new Date().toLocaleString();


  return (

    <ScrollView>
      <View>
        {/* calender for attendence */}
        <Calendar style={{ marginBottom: 20, elevation: 4, backgroundColor: 'white' }} headerStyle={{ backgroundColor: '#220046' }} theme={{ arrowColor: 'white', monthTextColor: 'white', textSectionTitleColor: 'white' }}
          markedDates={{

            newDate: { selected: true, marked: true, selectedColor: 'blue' },

          }} />


        {/* Leave Balance */}
        <View >

          <Text style={styles.txtLeaveBalance}>
            Leave Balance
          </Text>

          <View >

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginHorizontal: 10 }}>
              {LeaveBalanceList.map((item) => <DrawerIcons icon={item.Icon} header={item.Title} count={item.LeaveCount} color={item.Color}/>)}

            </View>

          </View>

        </View>

      </View>
    </ScrollView>
  )





  function DrawerIcons(props) {
    const title = props.header, icon = props.icon, count = props.count,color=props.color
    return (
      <TouchableOpacity key={title} style={{ backgroundColor: 'white', width: '48%', height: 90, alignItems: 'center', marginVertical: 8, justifyContent: 'center', paddingVertical: 4, elevation: 6 }} >
       <View style={{flex:1,justifyContent:'center',flexDirection:'row',}}>
        <View style={{ flex: .4, flexDirection: 'column', justifyContent: 'center',}}>
          <Icon name={icon} color={color} size={40} style={{ marginVertical: 4 , marginLeft:10}} />
          </View>
          <View style={{ flex: .75, flexDirection: 'column', justifyContent: 'center' }}>
            <Text style={{ color: 'black',fontSize:15, fontWeight:'600'}}>{title}</Text>
            <Text style={{ color: 'black',fontSize:25, fontWeight:'600', marginLeft:2}}>{count}</Text>
          </View>

          </View>
      
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