import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { API } from '../../../../utility/services';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';




const Esic_Bottomview = (props) => {
  
  const userId = useSelector(state => state.candidateAuth.candidateId)

  const [loaderVisible, setLoaderVisible] = useState(false);

  const [city, setCity] = useState();
  const [subcode, setSubCode] = useState();
  const [RegNumber, setRegNumber] = useState();
  const [csiNum, setCsiNum] = useState();
  const [residingWithYou, setResidingWithYou] = useState();
  const [weatherResiding, setWeatherResiding] = useState();
  const [noStatePlace, setNoStatePlace] = useState();
  const [noStatePlaceResidence, setNoStatePlaceResidence] = useState();
  const [priEmpCode, setPriEmpCode] = useState();
  const [priInsuranceNum, setPriInsuranceNum] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const residenceWithYou = ["YES", "NO"]


  useEffect(() => {
    setTimeout(() => {
      getData()
    }, 1000);
  }, []);



  const saveESICDetails = operFlag => {
    setLoaderVisible(true);
    const body = {
      txnId: '',
      candidateId: userId,
      esCity: city,
      esSubCode: subcode,
      esRegisterationNo: RegNumber,
      esCsiNo: csiNum,
      esResidingWith: residingWithYou,
      esWhetherResidingWith: weatherResiding,
      esIfNoStatePalce: noStatePlace,
      esIfNoStatePalceResidance: noStatePlaceResidence,
      espreviousEmployerCode: priEmpCode,
      espreviousInsuranceNo: priInsuranceNum,
      userId: userId,
      operFlag: operFlag,

    }

    // console.log("request", body);
    axios
      .post(`${API}/api/hrms/saveCandidateUanInfo`, body)
      .then(response => {
        const returnedData = response?.data?.Result;
        console.log("result..", returnedData);
        const msg = returnedData[0].MSG
        setLoaderVisible(false)
        Toast.show({
          type: 'success',
          text1: msg,
        });
        { props.onPress }
      })
      .catch(err => {
        setLoaderVisible(false)
        console.log(err);
      });
  };

  const getData = () => {
    setLoaderVisible(true)
    axios
      .post(`${API}/api/hrms/saveCandidateUanInfo`, {
        candidateId: userId,
        userId: userId,
        operFlag: 'W',
      }).then(response => {
        const returnedData = response?.data?.Result;
        const ESICDetails = returnedData[0];
        const msg = returnedData[0].MSG
        setLoaderVisible(false)
         console.log("getDataSonammmm", ESICDetails);

        if (Object.keys(ESICDetails).length > 2) {
          setIsEdit(true);

        }
        setCity(ESICDetails?.CITY);
        setSubCode(ESICDetails?.SUB_CODE);
        setRegNumber(ESICDetails?.REGISTRATION_NO);
        setCsiNum(ESICDetails?.CSI_NO);
        setResidingWithYou(ESICDetails?.RESIDING_WITH_HIMOR_HER);
        setWeatherResiding(ESICDetails?.WHETHER_RESIDING_WITH_HIM_HER);
        setNoStatePlace(ESICDetails?.IF_NO_STATE_PLACE);
        setNoStatePlaceResidence(ESICDetails?.IF_NO_STATE_PLACE_OF_RESIDENSCE);
        setPriEmpCode(ESICDetails?.PREVIOUS_EMPLOYER_CODE_NO);
        setPriInsuranceNum(ESICDetails?.PREVIOUS_INSURANCE_NO);

      }).catch(error => {
        setLoaderVisible(false)
        Toast.show({
          type: 'error',
          text1: error
        })
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
      {loaderVisible ? <View style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20%"
      }}>
        <ActivityIndicator color={COLORS.orange1} />
        <Text style={{
          ...FONTS.h4,
          color: COLORS.orange1
        }} >Loading you data..</Text>
      </View> :
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* City */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>City</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='City'
              onChangeText={setCity} value={city} />
          </View>

          {/* Sub code */}
          {/* <View style={{ height: 75, marginTop: 10 }}>

            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Sub Code</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
              onChangeText={setSubCode} value={subcode} keyboardType='numeric' maxLength={10} />
          </View> */}

          {/* Registration */}
          <View style={{ height: 75, marginTop: 10 }}>

            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Registration No.</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
              onChangeText={setRegNumber} value={RegNumber} keyboardType='numeric' maxLength={17} />
          </View>

          {/* CSI no */}
          {/* <View style={{ height: 75, marginTop: 10 }}>

            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>CSI No.</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
              onChangeText={setCsiNum} value={csiNum} keyboardType='numeric' maxLength={25} />
          </View> */}

          {/* residing with him or her */}
          <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}> Family Residing with you</Text>

            <SelectDropdown defaultValue={residingWithYou} data={residenceWithYou} buttonStyle={[styles.inputHolder]} onSelect={(selectedItem, index) => { setResidingWithYou(selectedItem) }} defaultButtonText={"Select"} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />

            {/* <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
              onChangeText={setResidingWith} value={residingWith} maxLength={3} /> */}
          </View>

          {/* Whether residing with him  her */}
          {/* <View style={{ height: 75, marginTop: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Whether residing with him her</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
              onChangeText={setWeatherResiding} value={weatherResiding} maxLength={3} />
          </View> */}

          {/* If No State place*/}
          <View style={{ height: 75, marginTop: 10 }}>

            {/* <Text style={{ color: COLORS.green, ...FONTS.body4 }}>If No State place</Text> */}
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>If No State</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
              onChangeText={setNoStatePlace} value={noStatePlace} maxLength={3} />
          </View>

          {/* If No State place of Residence*/}
          <View style={{ height: 75, marginTop: 10 }}>

            {/* <Text style={{ color: COLORS.green, ...FONTS.body4 }}>If No State place of Residence</Text> */}
            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>If No Residence Address</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
              value={noStatePlaceResidence} onChangeText={setNoStatePlaceResidence} />
          </View>

          {/* Previous Employee code No.*/}
          {/* <View style={{ height: 75, marginTop: 10 }}>

            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Previous Employee code No.</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
              onChangeText={setPriEmpCode} value={priEmpCode} />
          </View> */}

          {/* Previous Insurance No.*/}
          <View style={{ height: 75, marginTop: 10 }}>

            <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Previous ESIC No.</Text>
            <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }}
              onChangeText={setPriInsuranceNum} value={priInsuranceNum} keyboardType='numeric' />
          </View>

          {/* save button */}
          <TouchableOpacity onPress={() => (isEdit ? saveESICDetails('G') : saveESICDetails('C'))}>

            <LinearGradient
              colors={[COLORS.orange1, COLORS.disableOrange1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 2, y: 0 }}

              style={{ borderRadius: 8, padding: 8, marginTop: 20 }}

            >
              <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }}>
                {isEdit ? 'Update' : 'Save'}
              </Text>
            </LinearGradient>

          </TouchableOpacity>

          <View style={{ marginBottom: 270 }}></View>
        </ScrollView>}
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