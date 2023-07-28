import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, editable } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker'
import axios from 'axios';
import { API } from '../../../../utility/services';
import Toast from 'react-native-toast-message';

const Identifications = (props) => {

  useEffect(() => {
    setTimeout(() => {
      getData()
    }, 1000);

  }, []);

  const [edit, setEdit] = useState({});

  const [pasportIssuedDate, setPassportIssuedDate] = useState(new Date());
  const [selectedIssuedDate, setSelectedIssuedDate] = useState('');
  const [passportIssuedDateOpen, setPassportIssuedDateOpen] = useState(false)

  const [expiryDate, setExpiryDate] = useState(new Date());
  const [selectedExpiryDate, setSelectedExpiryDate] = useState('');
  const [expiryDateOpen, setExpiryDateOpen] = useState(false);

  const [dlIssuedDate, setDlIssuedDate] = useState(new Date());
  const [selectedDlIssuedDate, setSelectedDlIssuedDate] = useState('');
  const [dlIssuedDateOpen, setDlIssuedDateOpen] = useState(false)

  const [dlExpiryDate, setDlExpiryDate] = useState(new Date());
  const [selectedDlExpiryDate, setSelectedDlExpiryDate] = useState('');
  const [dlExpiryDateOpen, setDlExpiryDateOpen] = useState(false);

  const [passportnumber, setPassportNumber] = useState('');
  const [passportissuePlace, setPassportIssuePlace] = useState('');

  const [panNumber, setPanNumber] = useState('');
  const [nameInPan, setNameInPan] = useState('');

  const [aadharNumber, setAadharNumber] = useState('');
  const [nameInAadhar, setNameInAadhar] = useState('');

  const [votersNumber, setVotersNumber] = useState('');
  const [votersIssuePlace, setVotersIssuePlace] = useState('');

  const [driverNumber, setDriverNumber] = useState('');
  const [driverIssuePlace, setDriverIssuePlace] = useState('');

  const [error, setError] = useState('');
  const [operFlag, setOperFlag] = useState("A");

  const actualDateSelector = (date) => {
    setPassportIssuedDateOpen(false)
    let newDate = date.toDateString().split(' ')
    newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3]

    setSelectedIssuedDate(newDate);
    setPassportIssuedDate(date)

    console.log(newDate)

  }

  const ExpiryDateSelector = (date) => {
    setExpiryDateOpen(false)
    let newDate = date.toDateString().split(' ')
    newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3]
    setSelectedExpiryDate(newDate);
    setExpiryDate(date)

  }


  const DlExpiryDateSelector = (date) => {
    setDlExpiryDateOpen(false)
    let newDate = date.toDateString().split(' ')
    newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3]
    setSelectedDlExpiryDate(newDate);
    setDlExpiryDate(date)

  }

  const DlIssuedDateSelector = (date) => {
    setDlIssuedDateOpen(false)
    let newDate = date.toDateString().split(' ')
    newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3]
    setSelectedDlIssuedDate(newDate);
    setDlIssuedDate(date)

  }

  const isFormValidated = () => {
    if (
      passportnumber === '' ||
      selectedIssuedDate === '' ||
      selectedExpiryDate === '' ||
      passportissuePlace === '' ||
      panNumber === '' ||
      nameInPan === '' ||
      aadharNumber === '' ||
      nameInAadhar === '' ||
      votersNumber === '' ||
      votersIssuePlace === '' ||
      driverNumber === '' ||
      selectedDlIssuedDate === '' ||
      selectedDlExpiryDate === '' ||
      driverIssuePlace === ''
    ) {
      setError('All field are required!');
      setTimeout(function () {
        setError('');
      }, 2000);

      return false;
    } else {
      setError('');
      return true;
    }
  };


  const handleSubmit = () => {
    if (isFormValidated()) {
      const body = {
        aadhaarNo: aadharNumber,
        aadhaarName: nameInAadhar,
        panNo: panNumber,
        panName: nameInPan,
        voterNo: votersNumber,
        voterPlaceIssue: votersIssuePlace,

        passportNo: passportnumber,
        passportIssueDate: selectedIssuedDate,
        passportExpiryDate: selectedExpiryDate,
        passportIssuePlace: passportissuePlace,

        dlNo: driverNumber,
        dlIssueDate: selectedDlIssuedDate,
        dlExpiryDate: selectedDlExpiryDate,
        dlIssuePlace: driverIssuePlace,
        operFlag: operFlag,
        candidateId: 333,
        userId: 333,
        // txnId: Object.keys(edit).length > 0 ? edit?.TXN_ID : '',
        txnID: Object.keys(edit).length > 0 ? edit?.TXN_ID : '',
      };
      console.log("request", body);
      axios
        .post(`${API}/api/hrms/indentityProof`, body)
        .then(response => {
          const returnedData = response?.data?.Result;
          console.log("result..", returnedData);
          const msg = returnedData[0].MSG
          Toast.show({
            type: 'success',
            text1: msg,
          });
          { props.onPress }

        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const getData = () => {
    axios
      .post(`${API}/api/hrms/indentityProof`, {
        candidateId: 333,
        userId: 333,
        operFlag: 'V',
      })
      .then(response => {
        const returnedData = response?.data?.Result;
        console.log("getData", returnedData);
        const preFilledData = returnedData[0];
        const msg = returnedData[0].MSG

        setPassportNumber(preFilledData?.PASSPORT_NO);
        setSelectedIssuedDate(preFilledData?.PASSPORT_DATE_OF_ISSUE);
        setSelectedExpiryDate(preFilledData?.PASSPORT_DATE_OF_EXPIRY);
        setPassportIssuePlace(preFilledData?.PASSPORT_PLACE_OF_ISSUE);
        setPanNumber(preFilledData?.PAN_NO);
        setNameInPan(preFilledData?.PAN_NAME);
        setAadharNumber(preFilledData?.AADHAR_NO);
        setNameInAadhar(preFilledData?.AADHAR_NAME);
        setVotersNumber(preFilledData?.VOTER_NO);
        setVotersIssuePlace(preFilledData?.VOTER_PLACE_ISSUE);
        setDriverNumber(preFilledData?.DL_NO);
        setSelectedDlIssuedDate(preFilledData?.DL_DATE_OF_ISSUE);
        setSelectedDlExpiryDate(preFilledData?.DL_DATE_OF_EXPIRY);
        setDriverIssuePlace(preFilledData?.DL_PLACE_OF_ISSUE);
        setEdit(returnedData[0]);
        (preFilledData.FLAG === "S" ? setOperFlag("E") : setOperFlag("A"))
        console.log("editdata", edit);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (

    <View style={{flex:1}}>

      <View style={{  flexDirection: 'row', marginBottom: 10 }}>
        <Text style={{ flex: 1, ...FONTS.h3, color: COLORS.orange }}>Identifications</Text>
        <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={props.onPress}>
            <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
          </TouchableOpacity>
        </View>
      </View>


      <ScrollView  showsVerticalScrollIndicator={false} style={{height:'100%'}}>
      <View>
        {/* close button */}
        {/* <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
          <Text style={{ flex: 1, ...FONTS.h3, color: COLORS.orange }}>Identifications</Text>
          <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={props.onPress}>
              <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
            </TouchableOpacity>
          </View>
        </View> */}
        {/* passportView */}
        <View style={{ borderRadius: 10, borderColor: COLORS.lightGray, borderWidth: 1, padding: 10, elevation: 4, backgroundColor: COLORS.white }}>
          <Text style={{ color: COLORS.black, ...FONTS.h4 }}> Passport Details</Text>
          {/* Pan number input */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Passport Number</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Number'
              keyboardType="number-pad" onChangeText={setPassportNumber} value={passportnumber} />
          </View>

          {/* Date Of issue */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Date of Issue</Text>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <TextInput style={{ width: '70%', borderWidth: 1, borderColor: COLORS.black, color: editable ? COLORS.black : COLORS.black, borderRadius: 10, height: 40, paddingLeft: 5 }} placeholder='dd/mm/yyyy' value={selectedIssuedDate} editable={false} />
              <TouchableOpacity onPress={() => setPassportIssuedDateOpen(true)} style={{ marginLeft: 20 }}>
                {/* <Text style={{ color: 'green' }}> Date of issue</Text> */}
                <Icons name='calendar-month' size={35} color={COLORS.orange} />
                <DatePicker modal open={passportIssuedDateOpen} mode="date" date={pasportIssuedDate} onConfirm={(date) => actualDateSelector(date)} onCancel={() => { setPassportIssuedDateOpen(false) }} />
                {/* {console.log("selectedDate",pasportIssuedDate)} */}
              </TouchableOpacity>
            </View>
          </View>

          {/* Date Of expiry */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Date of Expiry</Text>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <TextInput style={{ width: '70%', borderWidth: 1, borderColor: COLORS.black, color: editable ? COLORS.black : COLORS.black, borderRadius: 10, height: 40, paddingLeft: 5 }} placeholder='dd/mm/yyyy' value={selectedExpiryDate} editable={false} />
              <TouchableOpacity onPress={() => setExpiryDateOpen(true)} style={{ marginLeft: 20 }}>
                {/* <Text style={{ color: 'green' }}> Date of issue</Text> */}
                <View >
                  <Icons name='calendar-month' size={35} color={COLORS.orange} />
                </View>
                <DatePicker modal open={expiryDateOpen} mode="date" date={expiryDate} onConfirm={(date) => ExpiryDateSelector(date)} onCancel={() => { setExpiryDateOpen(false) }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* place of issue */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Place of Issue</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Delhi'
              onChangeText={setPassportIssuePlace} value={passportissuePlace} />
          </View>
        </View>

        {/* pan View */}
        <View style={{ borderRadius: 10, borderColor: COLORS.lightGray, borderWidth: 1, padding: 10, elevation: 4, backgroundColor: COLORS.white, marginTop: 20 }}>

          {/* pan details */}
          <Text style={{ color: COLORS.black, ...FONTS.h4 }}> Pan Details</Text>
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Pan Number</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Number'
              onChangeText={setPanNumber} value={panNumber} />
          </View>
          {/* name as per pan */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Name As Per PAN</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name'
              onChangeText={setNameInPan} value={nameInPan} />
          </View>
        </View>

        {/* Aadhar View */}
        <View style={{ borderRadius: 10, borderColor: COLORS.lightGray, borderWidth: 1, padding: 10, elevation: 4, backgroundColor: COLORS.white, marginTop: 20 }}>
          <Text style={{ color: COLORS.black, ...FONTS.h4 }}> Aadhar Details</Text>
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Aadhar Number<Text style={{ color: COLORS.red, ...FONTS.body4 }}>*</Text></Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Number'
              keyboardType="number-pad" onChangeText={setAadharNumber} value={aadharNumber} />
          </View>
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Name As Per Aadhar<Text style={{ color: COLORS.red, ...FONTS.body4 }}>*</Text></Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name'
              onChangeText={setNameInAadhar} value={nameInAadhar} />
          </View>
        </View>

        {/* Voters View */}
        <View style={{ borderRadius: 10, borderColor: COLORS.lightGray, borderWidth: 1, padding: 10, elevation: 4, backgroundColor: COLORS.white, marginTop: 20 }}>
          <Text style={{ color: COLORS.black, ...FONTS.h4 }}> Voter's Details</Text>
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Number</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Number'
              keyboardType="number-pad" onChangeText={setVotersNumber} value={votersNumber} />
          </View>
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Place of Issue</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Delhi'
              onChangeText={setVotersIssuePlace} value={votersIssuePlace} />
          </View>
        </View>
        {/* Driver's view */}
        <View style={{ borderRadius: 10, borderColor: COLORS.lightGray, borderWidth: 1, padding: 10, elevation: 4, backgroundColor: COLORS.white, marginTop: 20 }}>
          <Text style={{ color: COLORS.black, ...FONTS.h4 }}> Driver's Details</Text>

          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}> Number</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Number'
              keyboardType="number-pad" onChangeText={setDriverNumber} value={driverNumber} />
          </View>
          {/* Date Of issue */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Date of Issue</Text>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <TextInput style={{ width: '70%', borderWidth: 1, color: editable ? COLORS.black : COLORS.black, borderColor: COLORS.black, borderRadius: 10, height: 40, paddingLeft: 5 }} placeholder='dd/mm/yyyy' value={selectedDlIssuedDate} editable={false} />
              <TouchableOpacity onPress={() => setDlIssuedDateOpen(true)} style={{ marginLeft: 20 }}>
                {/* <Text style={{ color: 'green' }}> Date of issue</Text> */}
                <View >
                  <Icons name='calendar-month' size={35} color={COLORS.orange} />
                </View>
                <DatePicker modal open={dlIssuedDateOpen} mode="date" date={dlIssuedDate} onConfirm={(date) => DlIssuedDateSelector(date)} onCancel={() => { setDlIssuedDateOpen(false) }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Date Of expiry */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Date of Expiry</Text>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <TextInput style={{ width: '70%', borderWidth: 1, borderColor: COLORS.black, color: editable ? COLORS.black : COLORS.black, borderRadius: 10, height: 40, paddingLeft: 5 }} placeholder='dd/mm/yyyy' value={selectedDlExpiryDate} editable={false} />
              <TouchableOpacity onPress={() => setDlExpiryDateOpen(true)} style={{ marginLeft: 20 }}>
                {/* <Text style={{ color: 'green' }}> Date of issue</Text> */}
                <View >
                  <Icons name='calendar-month' size={35} color={COLORS.orange} />
                </View>
                <DatePicker modal open={dlExpiryDateOpen} mode="date" date={dlExpiryDate} onConfirm={(date) => DlExpiryDateSelector(date)} onCancel={() => { setDlExpiryDateOpen(false) }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Place of Issue</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Delhi'
              onChangeText={setDriverIssuePlace} value={driverIssuePlace} />
          </View>
        </View>

        {/* save button */}
        <TouchableOpacity onPress={() => handleSubmit()} >

          <LinearGradient
            colors={[COLORS.orange1, COLORS.disableOrange1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 2, y: 0 }}
            style={{ borderRadius: 8, padding: 8, marginTop: 20 }} >

            <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>
      <View style={{ marginBottom: 270 }} />
    </ScrollView>





    </View>


    
  )
}

export default Identifications