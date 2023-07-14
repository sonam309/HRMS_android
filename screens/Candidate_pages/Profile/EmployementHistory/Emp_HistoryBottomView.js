import { View, Text, ScrollView, TouchableOpacity, TextInput, editable, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FONTS, SIZES } from '../../../../constants/font_size';
import COLORS from '../../../../constants/theme';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker'
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux'

const Emp_HistoryBottomView = (props) => {
  const userId = useSelector(state => state.candidateAuth.candidateId)

  const [fromDate, setFromDate] = useState(new Date());
  const [selcetedFromDate, setSelectedFromDate] = useState('');
  const [fromDateOpen, setFromDateOpen] = useState(false)

  const [toDate, setToDate] = useState(new Date());
  const [selcetedToDate, setSelectedToDate] = useState('');
  const [toDateOpen, setToDateOpen] = useState(false)

  const [currentlyWorking, setCurrentlyWorking] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [role, setRole] = useState('');
  const [lastSalary, setLastSalary] = useState('');
  const [manager, setManager] = useState('');
  const [reason, setReason] = useState('');
  const [aboutCompany, setAboutCompany] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyLink, setCompanyLink] = useState('');

  const [operFlag, setOperFlag] = useState("A");

  const [fillForm, setFillForm] = useState(false);

  const [TXNID, setTXNID] = useState()


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

  const SaveEmploymentData = async () => {
    console.warn("outisde");
    try {
      console.warn("inside");
      let employeeData = {
        txnId: TXNID, operFlag: operFlag, candidateId: userId, userId: userId, companyName: companyName, designation: designation, fDate: selcetedFromDate, tDate: selcetedToDate, role: role, lastDrawnSalary: lastSalary, reportingManager: manager, reasonForChange: reason, aboutCompany: aboutCompany, companyAddress: companyAddress, webLink: companyLink, currentlyWorking: currentlyWorking
      }
      console.warn("saving/updating", employeeData);

      let res = await fetch("https://econnectsatya.com:7033/api/hrms/candidateEmployementInfo", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employeeData)
      })
      res = await res.json();
      res = await res?.Result[0]?.MSG
      ToastAndroid.show(res, 3000);
      setFillForm(false)
    }
    catch (error) {
      ToastAndroid.show(error, 3000)
    }
  }

  const DeleteEmployment = async ({ txnId }) => {
    try {
      let employmentData = {
        txnId: txnId, operFlag: "D", userId: userId
      }
      console.warn(employmentData);
      let res = await fetch("https://econnectsatya.com:7033/api/hrms/candidateEmployementInfo", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employmentData)
      })
      res = await res.json();
      res = await res?.Result[0]?.MSG
      ToastAndroid.show(res, 3000);
      setFillForm(false)
    }
    catch (error) {
      ToastAndroid.show(error, 3000)
    }
  }

  const UpdateEmployment = (item) => {
    console.warn(item.TXN_ID);

    setOperFlag("E")
    setSelectedFromDate(item.FROM_DATE)
    setSelectedToDate(item.TO_DATE)
    setCurrentlyWorking(item.CURRENTLY_WORKING)
    setCompanyName(item.COMPANY_NAME)
    setDesignation(item.DESIGNATION)
    setRole(item.ROLE)
    setLastSalary(item.LAST_DRAWN_SALARY)
    setManager(item.REPORTING_MANAGER)
    setReason(item.REASON_FOR_CHANGE)
    setAboutCompany(item.ABOUT_COMPANY)
    setCompanyAddress(item.COMPANY_ADDRESS)
    setCompanyLink(item.WEB_LINK)

    setFillForm(true)
    setTXNID(item.TXN_ID)

  }


  const EmployementHistory = ({ item }) => {
    return (
      <View style={{ backgroundColor: COLORS.disableOrange1, padding: 6, borderRadius: 12, marginVertical: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.COMPANY_NAME} </Text>

          <Icons position='absolute' onPress={() => DeleteEmployment({ txnId: item.TXN_ID })} right={0} name='trash-can-outline' color={COLORS.green} size={20} />
          <Icons position='absolute' onPress={() => UpdateEmployment(item)} right={20} name='square-edit-outline' color={COLORS.green} size={20} />
        </View>

        <Text style={{ fontWeight: 600 }}>Designation:- <Text style={{ fontWeight: 400 }}>{item.DESIGNATION}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Date:- <Text style={{ fontWeight: 400 }}>{item.FROM_DATE} - {item.TO_DATE}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Candidate Role:- <Text style={{ fontWeight: 400 }}>{item.ROLE}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Last Drawn Salary:- <Text style={{ fontWeight: 400 }}>{item.LAST_DRAWN_SALARY}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Reporting Manager:- <Text style={{ fontWeight: 400 }}>{item.REPORTING_MANAGER}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Reason For Change:- <Text style={{ fontWeight: 400 }}>{item.REASON_FOR_CHANGE}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Company Link:- <Text style={{ fontWeight: 400 }}>{item.WEB_LINK}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Company Address:- <Text style={{ fontWeight: 400 }}>{item.COMPANY_ADDRESS}</Text></Text>
        <Text style={{ fontWeight: 600 }}>About Company:- <Text style={{ fontWeight: 400 }}>{item.ABOUT_COMPANY > 5 ? `${item.ABOUT_COMPANY.slice(0, 5)}...` : item.ABOUT_COMPANY}</Text></Text>
      </View>
    )
  }

  const DisplayHistory = () => {
    return (
      <View style={{ padding: 4 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 700, color: 'black', marginVertical: 10 }}>Past Employment: </Text>
          <TouchableOpacity onPress={() => setFillForm(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>ADD</Text>
            <Icons name='plus' size={16} />
          </TouchableOpacity>
        </View>

        {
          props.employment.map((item) => <EmployementHistory item={item} />)
        }

      </View>
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>

      {/* close button */}
      <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ flex: 1, ...FONTS.h3, fontSize: 20, color: COLORS.orange }}>Employment Details</Text>
        <TouchableOpacity onPress={props.onPress}>
          <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
        </TouchableOpacity>
      </View>

      {props.employment.length && props.employment[0]?.COMPANY_NAME && !fillForm > 0 ? <DisplayHistory /> :
        <View >

          {/* company name */}

          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Company Name <Text style={{ color: COLORS.red, ...FONTS.body3 }}>*</Text></Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='Eg. Satya Microcapitam Ltd.' onChangeText={(val) => setCompanyName(val)} value={companyName} />
          </View>

          {/* designation */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Designation <Text style={{ color: COLORS.red, ...FONTS.body3 }}>*</Text></Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='Eg. Software engineer' onChangeText={(val) => setDesignation(val)} value={designation} />
          </View>

          {/* from Date */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>From Date</Text>

            <View style={{ flexDirection: 'row', flex: 1 }}>
              <TextInput style={{ width: '70%', borderWidth: 1, borderColor: COLORS.black, color: editable ? COLORS.black : COLORS.black, borderRadius: 10, height: 40, paddingLeft: 5 }} placeholder='dd/mm/yyyy' value={selcetedFromDate} editable={false} />
              <TouchableOpacity onPress={() => setFromDateOpen(true)} style={{ marginLeft: 20 }}>
                <Icons name='calendar-month' size={35} color={COLORS.orange} />
                <DatePicker modal open={fromDateOpen} mode="date" date={fromDate} onConfirm={(date) => actualFromDate(date)} onCancel={() => { setFromDateOpen(false) }} />
              </TouchableOpacity>
            </View>

          </View>

          {/* to Date */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>To Date</Text>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <TextInput style={{ width: '70%', borderWidth: 1, borderColor: COLORS.black, color: editable ? COLORS.black : COLORS.black, borderRadius: 10, height: 40, paddingLeft: 5 }} placeholder='dd/mm/yyyy' value={selcetedToDate} editable={false} />
              <TouchableOpacity onPress={() => setToDateOpen(true)} style={{ marginLeft: 20 }}>
                <Icons name='calendar-month' size={35} color={COLORS.orange} />
                <DatePicker modal open={toDateOpen} mode="date" date={toDate} onConfirm={(date) => actualToDate(date)} onCancel={() => { setToDateOpen(false) }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Role */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Role <Text style={{ color: COLORS.red, ...FONTS.body3 }}>*</Text></Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='Role' onChangeText={(val) => setRole(val)} value={role}
            />
          </View>

          {/* Last Drawn Salary */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Last Drawn Salary <Text style={{ color: COLORS.red, ...FONTS.body3 }}>*</Text></Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='10,000' keyboardType='numeric' onChangeText={(val) => setLastSalary(val)} value={lastSalary} />

          </View>

          {/* Reporting Manager */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Reporting Manager</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='Mr. Ashutosh Shivastva' onChangeText={(val) => setManager(val)} value={manager} />

          </View>

          {/* Reason for change */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Reason for Change</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} onChangeText={(val) => setReason(val)} value={reason} />
          </View>

          {/* About Company  */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>About Company</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} onChangeText={(val) => setAboutCompany(val)} value={aboutCompany} />
          </View>

          {/* Company address  */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Company Address</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} onChangeText={(val) => setCompanyAddress(val)} value={companyAddress} />
          </View>

          {/*web link*/}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Web Link</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5, }} placeholder='https://satyamicrocapital.com/' onChangeText={(val) => setCompanyLink(val)} value={companyLink} />
          </View>

          {/* currently Working */}
          <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
            <TouchableOpacity onPress={() => setCurrentlyWorking(!currentlyWorking)} style={{ alignItems: "center", width: "100%", flexDirection: "row", justifyContent: "space-between", }} >
              <Text style={{ color: COLORS.green, ...FONTS.body3, textAlign: 'center' }}>Currently Working</Text>
              {currentlyWorking ? <Icons name='checkbox-marked-circle-outline' size={25} color={COLORS.orange} /> : <Icons name='checkbox-blank-circle-outline' size={25} color={COLORS.orange} />}
            </TouchableOpacity>

          </View>


          {/* save button */}
          <TouchableOpacity onPress={() => SaveEmploymentData()}>
            <LinearGradient colors={[COLORS.orange1, COLORS.disableOrange1]} start={{ x: 0, y: 0 }} end={{ x: 2, y: 0 }} style={{ borderRadius: 8, padding: 8, marginTop: 20 }} >
              <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }} > Save </Text>
            </LinearGradient>

          </TouchableOpacity>


        </View>
      }
      <View style={{ marginBottom: 320 }}></View>
    </ScrollView>
  )
}
  ;
export default Emp_HistoryBottomView