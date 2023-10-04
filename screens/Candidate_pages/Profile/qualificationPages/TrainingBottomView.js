import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { API } from '../../../../utility/services';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux'

const TrainingBottomView = (props) => {

  const userId = useSelector(state => state.candidateAuth.candidateId)

  const [selectedState, setSelectedState] = useState('');
  const [selectedStateValue, setSelectedStateValue] = useState('');
  const [states, setStates] = useState('');

  const [selectCountry, setselectCountry] = useState('');
  const [selectedCountryValue, setSelecetCountryValue] = useState('');
  const [country, setCountry] = useState('');

  const [selectQualifications, setSelectQualifications] = useState('');
  const [selectedQualificationsValue, setSelectedQualificationsValue] = useState('');
  const [Qualifications, setQualifications] = useState('');

  const [selectedQualiMode, setSelectedQualiMode] = useState('');
  const [selectedQualiModeValue, setSelectedQualiModeValue] = useState('');
  const [qualificationMode, setQualificationMode] = useState('');

  const [selectedStream, setSelectedStream] = useState('');
  const [selectedStreamValue, setSelectedStreamValue] = useState('');
  const [stream, setStream] = useState('');

  const [txnID, setTxnID] = useState('');
  const [error, setError] = useState('');
  const [operFlag, setOperFlag] = useState("A");
  const [edit, setEdit] = useState({});

  const [specilization, setSpecilization] = useState('');
  const [University, setUniversity] = useState('');
  const [institute, setInstitute] = useState('');
  const [city, setCity] = useState('');
  const [fromYear, setFromYear] = useState('');
  const [toYear, setToYear] = useState('');
  const [passYear, setPassingYear] = useState('');
  const [fromMonth, setFromMonth] = useState('');
  const [toMonth, setToMonth] = useState('');
  const [expiryDate, setExpiryDate] = useState('');


  useEffect(() => {
    getDropdownData(7);
    getDropdownData(4);
    getDropdownData(33);
    getDropdownData(34);
    getDropdownData(35);
    getData();
  }, []);



  const saveTranningDetails = () => {

    const body = {
      txnId: txnID,
      candidateId: userId,
      qualification: selectedQualificationsValue,
      stream: selectedStreamValue,
      specilization: specilization,
      university: University,
      institute: institute,
      qualificationMode: selectedQualiModeValue,
      country: selectedCountryValue,
      state: selectedStateValue,
      city: city,
      fromYear: fromYear,
      fromMonth: fromMonth,
      toYear: toYear,
      toMonth: toMonth,
      passYear: passYear,
      expiryDate: expiryDate,
      userId: userId,
      operFlag: operFlag,
    }

    // console.log("request", body);
    axios
      .post(`${API}/api/hrms/candidateTrainInfo`, body)
      .then(response => {
        const returnedData = response?.data?.Result;
        // console.log("result..", returnedData);
        const msg = returnedData[0].MSG

        Toast.show({
          type: 'success',
          text1: msg
        })
        { props.onPress }

      })
      .catch(err => {
        // console.log(err);
        Toast.show({
          type:'error',
          text1:err
        })
      });

  };

  const getData = () => {
    axios
      .post(`${API}/api/hrms/candidateTrainInfo`, {
        candidateId: userId,
        userId: userId,
        operFlag: 'V',
      })
      .then(response => {
        const returnedData = response?.data?.Result;
        // console.log("getData", returnedData);
        const TrainingDetails = returnedData[0];
        const msg = returnedData[0].MSG


        Toast.show({
          type: 'success',
          text1: msg
        })


          (TrainingDetails.FLAG === "S" ? setOperFlag("E") : setOperFlag("A"))
        setSpecilization(TrainingDetails?.SPECIALIZATION);
        setUniversity(TrainingDetails?.UNIVERSITY);
        setInstitute(TrainingDetails?.INSTITUTE);
        setCity(TrainingDetails?.CITY);
        setFromYear(TrainingDetails?.FROM_YEAR);
        setToYear(TrainingDetails?.TO_YEAR);
        setPassingYear(TrainingDetails?.PASS_YEAR);
        // setFromMonth(TrainingDetails?.)


        setSelectQualifications(TrainingDetails?.QUALIFICATIONS_NAME);
        setSelectedQualificationsValue(TrainingDetails?.QUALIFICATIONS_ID);

        setSelectedStream(TrainingDetails?.STREAM);
        setSelectedStreamValue(TrainingDetails?.STREAM_ID);

        setSelectedQualiMode(TrainingDetails?.QUALIFICATION_MODE);
        setSelectedQualiModeValue(TrainingDetails?.QUALIFICATION_MODE_ID);

        setselectCountry(TrainingDetails?.COUNTRY);
        setSelecetCountryValue(TrainingDetails?.COUNTRY_ID);

        setSelectedState(TrainingDetails?.STATE_NAME);
        setSelectedStateValue(TrainingDetails?.STATE_ID);
        setTxnID(TrainingDetails?.TXN_ID);

        setEdit(returnedData[0]);
        // console.log("editdata", edit);
      })
      .catch(err => {
        // console.log(err);
        Toast.show({
          type:'error',
          text1:err
        })
      });
  };


  const selectedDropDownText = (id) => {
    if (id === "qualification") {
      return selectQualifications ? selectQualifications : Qualifications?.map(a => a.PARAM_NAME)[0]
    } else if (id === "Stream") {
      return selectedStream ? selectedStream : stream?.map(a => a.PARAM_NAME)[0]
    } else if (id === "QualificationMode") {
      return selectedQualiMode ? selectedQualiMode : qualificationMode?.map(a => a.PARAM_NAME)[0]
    } else if (id === "country") {
      return selectCountry ? selectCountry : country?.map(a => a.PARAM_NAME)[0]
    } else if (id === "state") {
      return selectedState ? selectedState : states?.map(a => a.PARAM_NAME)[0]
    }

  }

  const selectDropDownValue = (id) => {
    if (id === "qualification") {
      return selectedQualificationsValue ? selectedQualificationsValue : Qualifications?.map(a => a.PARAM_ID)[0];
    } else if (id === "Stream") {
      return selectedStreamValue ? selectedStreamValue : stream?.map(a => a.PARAM_ID)[0]
    } else if (id === "QualificationMode") {
      return selectedQualiModeValue ? selectedQualiModeValue : qualificationMode?.map(a => a.PARAM_ID)[0]
    } else if (id === "country") {
      return selectedCountryValue ? selectedCountryValue : country?.map(a => a.PARAM_ID)[0]
    } else if (id === "state") {

      return selectedStateValue ? selectedStateValue : states?.map(a => a.PARAM_ID)[0]
    }

  }

  // Title, States and Employment Data
  const getDropdownData = async (P) => {
    let response = await fetch(`${API}/api/User/getParam?getClaim=${P}`)
    response = await response.json();
    const returnedData = response;

    if (P === 7) {

      setStates(returnedData)

    }
    else if (P === 4) {

      setCountry(returnedData)
    } else if (P === 33) {

      setQualifications(returnedData)

    } else if (P === 34) {

      setQualificationMode(returnedData)

    } else if (P === 35) {

      setStream(returnedData)
    }

  }

  const checkStreamValue = (value) => {
    {
      for (let index = 0; index < stream.length; index++) {
        const element = stream[index];
        if (element.PARAM_NAME === value) setSelectedStreamValue(element.PARAM_ID);
      }
    }
  }
  const checkStateValue = (value) => {
    {
      for (let index = 0; index < states.length; index++) {
        const element = states[index];
        if (element.PARAM_NAME === value) setSelectedStateValue(element.PARAM_ID);
      }
    }
  }
  const checkCountryValue = (value) => {
    {
      for (let index = 0; index < country.length; index++) {
        const element = country[index];
        if (element.PARAM_NAME === value) setSelecetCountryValue(element.PARAM_ID);
      }
    }
  }
  const checkQualificationsValue = (value) => {
    {
      for (let index = 0; index < Qualifications.length; index++) {
        const element = Qualifications[index];
        if (element.PARAM_NAME === value) setSelectedQualificationsValue(element.PARAM_ID);
      }
    }
  }

  const checkQualificationsModeValue = (value) => {
    {
      for (let index = 0; index < qualificationMode.length; index++) {
        const element = qualificationMode[index];
        if (element.PARAM_NAME === value) setSelectedQualiModeValue(element.PARAM_ID);
      }
    }
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginBottom: 320 }} >
        {/* close button */}
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
          <Text style={{ flex: 1, ...FONTS.h4, fontSize: 20, color: COLORS.orange }}>Training</Text>
          <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={props.onPress}>
              <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Qualifications dropdown */}
        <View style={{ height: 75, }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Qualifications</Text>
          <SelectDropdown data={Qualifications?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectQualifications(value), checkQualificationsValue(value) }} defaultButtonText={selectedDropDownText("qualification")} defaultValueByIndex={selectDropDownValue("qualification")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* Stream dropdown */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Stream</Text>
          <SelectDropdown data={stream?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedStream(value), checkStreamValue(value) }} defaultButtonText={selectedDropDownText("Stream")} defaultValueByIndex={selectDropDownValue("Stream")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>
        {/* Specialization dropdown */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Specialization</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='' onChangeText={setSpecilization} value={specilization} />
        </View>
        {/* University dropdown */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>University</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='' onChangeText={setUniversity} value={University} />
        </View>
        {/* Institute dropdown */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Institute</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='Institute Name' onChangeText={setInstitute} value={institute} />
        </View>
        {/* Qualifications mode dropdown */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Qualifications Mode</Text>
          <SelectDropdown data={qualificationMode?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedQualiMode(value), checkQualificationsModeValue(value) }} defaultButtonText={selectedDropDownText("QualificationMode")} defaultValueByIndex={selectDropDownValue("QualificationMode")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>
        {/* Country dropdown */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Country</Text>
          <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setselectCountry(value), checkCountryValue(value) }} defaultButtonText={selectedDropDownText("country")} defaultValueByIndex={selectDropDownValue("country")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>
        {/* State dropdown */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>State</Text>
          <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText={selectedDropDownText("state")} defaultValueByIndex={selectDropDownValue("state")} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>
        {/* City dropdown */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>City</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='City' onChangeText={setCity} value={city} />
        </View>


        {/* From year */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>From Year</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='yyyy'
            onChangeText={setFromYear} value={fromYear} />
        </View>

        {/* From MOnth*/}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>From Month</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='mm'
            onChangeText={setFromMonth} value={fromMonth} />
        </View>

        {/* to year */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>To Year</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='yyyy'
            onChangeText={setToYear} value={toYear} />
        </View>

        {/* to Month */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>To Month</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='mm'
            onChangeText={setToMonth} value={toMonth} />
        </View>

        {/* Passing year */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Passing Year</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='yyyy'
            onChangeText={setPassingYear} value={passYear} />
        </View>

        {/* expiry date  */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Expiry Date</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='yyyy'
            onChangeText={setExpiryDate} value={expiryDate} />
        </View>

        {/* save button */}
        <TouchableOpacity onPress={() => Toast.show({
          type: 'success',
          text1: "Data Save Successfully"
        })}>
          <LinearGradient colors={[COLORS.orange1, COLORS.disableOrange1]} start={{ x: 0, y: 0 }} end={{ x: 2, y: 0 }} style={{ borderRadius: 8, padding: 8, marginTop: 20 }}>
            <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }} onPress={() => saveTranningDetails()}>
              Save
            </Text>
          </LinearGradient>

        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

  inputHolder: {
    borderWidth: 1,
    borderColor: COLORS.black,
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 0,
    marginVertical: 5,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
})


export default TrainingBottomView