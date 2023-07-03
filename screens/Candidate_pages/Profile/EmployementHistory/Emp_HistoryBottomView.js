import { View, Text, ScrollView, TouchableOpacity, TextInput, editable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FONTS, SIZES } from '../../../../constants/font_size';
import COLORS from '../../../../constants/theme';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker'
import LinearGradient from 'react-native-linear-gradient';


const Emp_HistoryBottomView = (props) => {

  const [fromDate, setFromDate] = useState(new Date());
  const [selcetedFromDate, setSelectedFromDate] = useState('');
  const [fromDateOpen, setFromDateOpen] = useState(false)
  const [toDate, setToDate] = useState(new Date());
  const [selcetedToDate, setSelectedToDate] = useState('');
  const [toDateOpen, setToDateOpen] = useState(false)
  const [currentlyWorking, setCurrentlyWorking] = useState(false);


  const actualFromDate = (date) => {
    setFromDateOpen(false)
    let newDate = date.toDateString().split(' ')
    newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3]
    setSelectedFromDate(newDate);
    setFromDate(date)
  }

  const actualToDate = (date) => {
    setToDateOpen(false)
    let newDate = date.toDateString().split(' ')
    newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3]
    setSelectedToDate(newDate);
    setToDate(date)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginBottom: 150 }} >
        {/* close button */}
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
          <Text style={{ flex: 1, ...FONTS.h3, color: COLORS.orange1 }}>ESIC Details</Text>
          <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={props.onPress}>
              <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
            </TouchableOpacity>
          </View>
        </View>

        {/* note view */}
        <View>
          <Text style={{ color: COLORS.black, fontSize: 15, fontWeight: '500' }}>Note: Please choose the Company Name from the list of Suggestion. In case you cannot find Your com in the list, you can manually enter it as well. </Text>
        </View>
        {/* company name */}

        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Company Name <Text style={{ color: COLORS.red, ...FONTS.body3 }}>*</Text></Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='Satya Microcapitam Ltd.'
          />
        </View>

        {/* designation */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Designation <Text style={{ color: COLORS.red, ...FONTS.body3 }}>*</Text></Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='Software engineer'
          />
        </View>

        {/* from Date */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>From Date</Text>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <TextInput style={{ width: '70%', borderWidth: 1, borderColor: COLORS.black, color: editable ? COLORS.black : COLORS.black, borderRadius: 10, height: 40, paddingLeft: 5 }} placeholder='dd/mm/yyyy' value={selcetedFromDate} editable={false} />
            <TouchableOpacity onPress={() => setFromDateOpen(true)} style={{ marginLeft: 20 }}>
              {/* <Text style={{ color: 'green' }}> Date of issue</Text> */}
              <Icons name='calendar-month' size={35} color={COLORS.orange} />
              <DatePicker modal open={fromDateOpen} mode="date" date={fromDate} onConfirm={(date) => actualFromDate(date)} onCancel={() => { setFromDateOpen(false) }} />
              {/* {console.log("selectedDate",pasportIssuedDate)} */}
            </TouchableOpacity>
          </View>
        </View>

        {/* to Date */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>To Date</Text>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <TextInput style={{ width: '70%', borderWidth: 1, borderColor: COLORS.black, color: editable ? COLORS.black : COLORS.black, borderRadius: 10, height: 40, paddingLeft: 5 }} placeholder='dd/mm/yyyy' value={selcetedToDate} editable={false} />
            <TouchableOpacity onPress={() => setToDateOpen(true)} style={{ marginLeft: 20 }}>
              {/* <Text style={{ color: 'green' }}> Date of issue</Text> */}
              <Icons name='calendar-month' size={35} color={COLORS.orange} />
              <DatePicker modal open={toDateOpen} mode="date" date={fromDate} onConfirm={(date) => actualToDate(date)} onCancel={() => { setToDateOpen(false) }} />
              {/* {console.log("selectedDate",pasportIssuedDate)} */}
            </TouchableOpacity>
          </View>
        </View>

        {/* Role */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Role <Text style={{ color: COLORS.red, ...FONTS.body3 }}>*</Text></Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='Role'
          />
        </View>

        {/* Last Drawn Salary */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Last Drawn Salary <Text style={{ color: COLORS.red, ...FONTS.body3 }}>*</Text></Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='10,000'
          />
        </View>

        {/* Reporting Manager */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Reporting Manager</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='Mr. Ashutosh Shivastva'
          />
        </View>

        {/* Reason for change */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Reason for Change</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
          />
        </View>

        {/* About Company  */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>About Company</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
          />
        </View>

        {/* Company address  */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Company Addr  ess</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
          />
        </View>

        {/*web link*/}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Web Link</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5, }} placeholder='https://satyamicrocapital.com/'
          />
        </View>

        {/* currently Working */}
        <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
          <TouchableOpacity onPress={() => setCurrentlyWorking(!currentlyWorking)}
            style={{
              alignItems: "center",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }} >
            <Text style={{ color: COLORS.green, ...FONTS.body3, textAlign: 'center' }}>Currently Working</Text>
            {currentlyWorking ? <Icons name='checkbox-marked-circle-outline' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
            {/* </View> */}
          </TouchableOpacity>

        </View>


        {/* save button */}
        <TouchableOpacity onPress={() => Alert.alert("Data Save Successfully")}>
          <LinearGradient
            colors={[COLORS.orange1, COLORS.disableOrange1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 2, y: 0 }}

            style={{ borderRadius: 8, padding: 8, marginTop: 20 }}

          >
            <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }} onPress={() => Alert.alert("Data Save Successfull")}>
              Save
            </Text>
          </LinearGradient>

        </TouchableOpacity>


      </View>
    </ScrollView>
  )
}
  ;
export default Emp_HistoryBottomView