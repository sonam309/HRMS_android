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


const Esic_Bottomview = (props) => {

  const [city, setCity] = useState();
  const [subcode, setSubCode] = useState();
  const [RegNumber, setRegNumber] = useState();
  const [csiNum, setCsiNum] = useState();
  const [residingWith, setResidingWith] = useState();
  const [weatherResiding, setWeatherResiding] = useState();
  const [noStatePlace, setNoStatePlace] = useState();
  const [noStatePlaceResidence, setNoStatePlaceResidence] = useState();
  const [priEmpCode, setPriEmpCode] = useState();
  const [priInsuranceNum, setPriInsuranceNum] = useState();
  const [operFlag, setOperFlag] = useState("C");
  const [error, setError] = useState('');


  useEffect(() => {
    // getDropdownData(4);
    setTimeout(() => {
      getData()
    }, 1000);
  }, []);




  //   const getDropdownData = async (P) => {
  //     let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
  //     response = await response.json();
  //     const returnedData = response;

  //     if (P === 4) {
  //         setCountry(returnedData)
  //     } 
  // }

  const saveESICDetails = () => {
    // if (isFormValidated()) {
    const body = {
      txnId: '',
      candidateId: 333,
      esCity: city,
      esSubCode: subcode,
      esRegisterationNo: RegNumber,
      esCsiNo: csiNum,
      esResidingWith: residingWith,
      esWhetherResidingWith: weatherResiding,
      esIfNoStatePalce: noStatePlace,
      esIfNoStatePalceResidance: noStatePlaceResidence,
      espreviousEmployerCode: priEmpCode,
      espreviousInsuranceNo: priInsuranceNum,
      userId: 333,
      operFlag: operFlag,

    }

    console.log("request", body);
    axios
      .post(`${API}/api/hrms/saveCandidateUanInfo`, body)
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
    // }
  };

  const getData = () => {
    axios
      .post(`${API}/api/hrms/saveCandidateUanInfo`, {
        candidateId: 333,
        userId: 333,
        operFlag: 'W',
      })
      .then(response => {
        const returnedData = response?.data?.Result;
        console.log("getData", returnedData);
        const ESICDetails = returnedData[0];
        const msg = returnedData[0].MSG


        setCity(ESICDetails?.CITY);
        setSubCode(ESICDetails?.SUB_CODE);
        setRegNumber(ESICDetails?.REGISTRATION_NO);
        setCsiNum(ESICDetails?.CSI_NO);
        setResidingWith(ESICDetails?.RESIDING_WITH_HIMOR_HER);
        setWeatherResiding(ESICDetails?.WHETHER_RESIDING_WITH_HIM_HER);
        setNoStatePlace(ESICDetails?.IF_NO_STATE_PLACE);
        noStatePlaceResidence(ESICDetails?.IF_NO_STATE_PLACE_OF_RESIDENSCE);
        priEmpCode(ESICDetails?.PREVIOUS_EMPLOYER_CODE_NO);
        priInsuranceNum(ESICDetails?.PREVIOUS_INSURANCE_NO);

        setEdit(returnedData[0]);
        (ESICDetails.FLAG === "S" ? setOperFlag("E") : setOperFlag("C"))
        console.log("editdata", edit);
      })
      .catch(err => {
        console.log(err);
      });
  };







  return (

    <View style={{ flex: 1 }}>
      {/* close button */}
      <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
        <Text style={{ ...FONTS.h3, fontSize: 20, color: COLORS.orange }}>ESIC Details</Text>
        <TouchableOpacity style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }} onPress={props.onPress}>
          <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* City */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>City</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='City'
            onChangeText={setCity} value={city} />
        </View>

        {/* Sub code */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Sub Code</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
            onChangeText={setSubCode} value={subcode} />
        </View>

        {/* Registration */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Registration No.</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
            onChangeText={setRegNumber} value={RegNumber}
          />
        </View>

        {/* CSI no */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>CSI No.</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
            onChangeText={setCsiNum} value={csiNum} />
        </View>

        {/* residing with him or her */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Residing with him or her</Text>
          {/* <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setselectCountry(value), checkCountryValue(value) }} defaultButtonText={country?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} /> */}
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
            onChangeText={setResidingWith} value={residingWith} />
        </View>

        {/* Whether residing with him  her */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Whether residing with him her</Text>
          {/* <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setselectCountry(value), checkCountryValue(value) }} defaultButtonText={country?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} /> */}
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
            onChangeText={setWeatherResiding} value={weatherResiding} />
        </View>

        {/* If No State place*/}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>If No State place</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
            onChangeText={setNoStatePlace} value={noStatePlace} />
        </View>

        {/* If No State place of Residence*/}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>If No State place of Residence</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
            value={noStatePlaceResidence} onChangeText={setNoStatePlaceResidence} />
        </View>

        {/* Previous Employee code No.*/}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Previous Employee code No.</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
            onChangeText={setPriEmpCode} value={priEmpCode} />
        </View>

        {/* Previous Insurance No.*/}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Previous Insurance No.</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
            onChangeText={setPriInsuranceNum} value={priInsuranceNum} />
        </View>

        {/* save button */}
        <TouchableOpacity onPress={() => Toast.show({
          type: 'success',
          text1: "Data Save Successfully"
        })}>

          <LinearGradient
            colors={[COLORS.orange1, COLORS.disableOrange1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 2, y: 0 }}

            style={{ borderRadius: 8, padding: 8, marginTop: 20 }}

          >
            <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }} onPress={() => saveESICDetails()}>
              Save
            </Text>
          </LinearGradient>

        </TouchableOpacity>

        <View style={{ marginBottom: 270 }}></View>
      </ScrollView>
    </View>


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

export default Esic_Bottomview