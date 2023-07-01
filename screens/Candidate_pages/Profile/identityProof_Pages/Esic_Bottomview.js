import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';



const Esic_Bottomview = (props) => {

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
          <Text style={{ flex: 1, ...FONTS.h3,  color: COLORS.orange1 }}>ESIC Details</Text>
          <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={props.onPress}>
              <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
            </TouchableOpacity>
          </View>
        </View>
        {/* City */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>City</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} placeholder='City' />
        </View>

        {/* Sub code */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Sub Code</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} />
        </View>

        {/* Registration */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Registration No.</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} />
        </View>

        {/* CSI no */}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>CSI No.</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} />
        </View>

        {/* residing with him or her */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Residing with him or her</Text>
          <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setselectCountry(value), checkCountryValue(value) }} defaultButtonText={country?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* Whether residing with him  her */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Whether residing with him her</Text>
          <SelectDropdown data={country?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder]} onSelect={(value) => { setselectCountry(value), checkCountryValue(value) }} defaultButtonText={country?.map(a => a.PARAM_NAME)[0]} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* If No State place*/}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>If No State place</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} />
        </View>

        {/* If No State place of Residence*/}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>If No State place of Residence</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} />
        </View>

        {/* Previous Employee code No.*/}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Previous Employee code No.</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} />
        </View>

        {/* Previous Insurance No.*/}
        <View style={{ height: 75, marginTop: 10 }}>

          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Previous Insurance No.</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 12, height: 45, paddingLeft: 5 }} />
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

export default Esic_Bottomview