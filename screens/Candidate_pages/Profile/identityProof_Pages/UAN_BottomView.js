import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';


const UAN_BottomView = (props) => {

  const [selectCountry, setselectCountry] = useState();
  const [selecetCountryValue, setSelecetCountryValue] = useState('');
  const [country, setCountry] = useState();


  useEffect(() => {
    getDropdownData(4);

  }, []);

  // Title, States and Employment Data
  const getDropdownData = async (P) => {
    let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
    response = await response.json();
    const returnedData = response;

    if (P === 4) {

      setCountry(returnedData)
    }

  }

  // getting country value
  const checkCountryValue = (value) => {
    {
      for (let index = 0; index < country.length; index++) {
        const element = country[index];
        if (element.PARAM_NAME === value) setSelecetCountryValue(element.PARAM_ID);
      }
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginBottom: 150 }} >
        {/* close button */}
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
          <Text style={{ flex: 1, ...FONTS.h3, color: COLORS.orange1 }}>UAN Details</Text>
          <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={props.onPress}>
              <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
            </TouchableOpacity>
          </View>
        </View>
        {/* esic number */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>ESIC Number</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Number' />
        </View>

        {/* esic name */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Name</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name' />
        </View>

        {/* Earlier a member of EPS 1995 */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Earlier a member of EPS 1995</Text>
          <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setselectCountry(value), checkCountryValue(value) }} defaultButtonText={country?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* International Worker*/}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>International Worker</Text>
          <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setselectCountry(value), checkCountryValue(value) }} defaultButtonText={country?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* member of EPS 1952 */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Member of Eps 1952</Text>
          <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setselectCountry(value), checkCountryValue(value) }} defaultButtonText={country?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>
        {/* member of EPS 1995 */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Member of EPS 1995</Text>
          <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setselectCountry(value), checkCountryValue(value) }} defaultButtonText={country?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* PPO no if Issued */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>PPO no if Issued</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name' />
        </View>

        {/* Previous Account number */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Previous Account number</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name' />
        </View>
        {/* Previous UAN */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Previous UAN</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name' />
        </View>

        {/* Scheme Certificate No.*/}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Scheme Certificate No.</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name' />
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

export default UAN_BottomView