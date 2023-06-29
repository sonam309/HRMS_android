import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const TrainingBottomView = (props) => {

  const [selectedState, setSelectedState] = useState();
  const [selectedStateValue, setSelectedStateValue] = useState('');
  const [states, setStates] = useState();
  const [selectCountry, setselectCountry] = useState();
  const [selecetCountryValue, setSelecetCountryValue] = useState('');
  const [country, setCountry] = useState();


  useEffect(() => {
    getDropdownData(7);
    getDropdownData(4);

  }, []);



  // Title, States and Employment Data
  const getDropdownData = async (P) => {
    let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
    response = await response.json();
    const returnedData = response;

    if (P === 7) {

      setStates(returnedData)

    }
    else if (P === 4) {

      setCountry(returnedData)
    }

  }


  // getting state value
  const checkStateValue = (value) => {
    {
      for (let index = 0; index < states.length; index++) {
        const element = states[index];
        if (element.PARAM_NAME === value) setSelectedStateValue(element.PARAM_ID);
      }
    }
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginBottom: 150 }} >
        {/* close button */}
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ flex: 1, ...FONTS.h3, fontSize: 20, color: COLORS.black }}>Training</Text>
                    <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={props.onPress}>
                            <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
                        </TouchableOpacity>
                    </View>
                </View>

        {/* Qualifications dropdown */}
        <View style={{ height: 75, }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Qualifications</Text>
          <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText={states?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* Stream dropdown */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Stream</Text>
          <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText={states?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* Specialization dropdown */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Specialization</Text>
          <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText={states?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* University dropdown */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>University</Text>
          <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText={states?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* Institute dropdown */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Institute</Text>
          {/* <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText={states?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} /> */}

          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='Institute Name' />


        </View>

        {/* Qualifications mode dropdown */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Qualifications Mode</Text>
          <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText={states?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* Country dropdown */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Country</Text>
          <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setselectCountry(value), checkCountryValue(value) }} defaultButtonText={country?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* State dropdown */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>State</Text>
          <SelectDropdown data={states?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setSelectedState(value), checkStateValue(value) }} defaultButtonText={states?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* City  */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>City</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='City' />
        </View>

        {/* From year */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>From Year</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='yyyy' />
        </View>

        {/* From MOnth*/}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>From Month</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='mm' />
        </View>

        {/* to year */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>To Year</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='yyyy' />
        </View>

        {/* to Month */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>To Month</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='mm' />
        </View>

        {/* Passing year */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Passing Year</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='DD/mm/yyyy' />
        </View>

        {/* expiry date  */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Expiry Date</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='dd/mm/yyyy' />
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