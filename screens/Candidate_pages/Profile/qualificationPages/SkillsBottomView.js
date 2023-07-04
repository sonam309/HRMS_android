import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker'
import SelectDropdown from 'react-native-select-dropdown'

const SkillsBottomView = (props) => {

  const [skill, setSkill] = useState('');
  const [totalExperience, setTotalExperience] = useState('');

  const [skillDropDown, setSkillDropDown] = useState()
  const [selectedSkill, setSelectedSkill] = useState();
  const [selectedSkillValue, setSelectedSkillValue] = useState('');


  useEffect(() => {
    getDropdownData(39);
  }, [])

  // Country and States data 
  const getDropdownData = async (P) => {
    let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
    response = await response.json();
    const returnedData = response;
    // console.warn(returnedData);
    if (P === 39) { setSkillDropDown(returnedData) }
  }

  const checkSkillValue = (value) => {
    for (let index = 0; index < skillDropDown.length; index++) {
      const element = skillDropDown[index];
      if (element.PARAM_NAME === value) setSelectedSkillValue(element.PARAM_ID);
    }
  }

  const Skill = ({ item }) => {
    return (
      <View style={{ backgroundColor: COLORS.disableOrange1, padding: 6, borderRadius: 12, marginVertical: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.FirstName} </Text>
          <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.LastName} - </Text>
          <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.Member}</Text>
          <Icons position='absolute' onPress={() => DeleteMember({ contact: item.Contact })} right={0} name='trash-can-outline' color={COLORS.green} size={20} />
          <Icons position='absolute' onPress={() => UpdateMember(item)} right={20} name='square-edit-outline' color={COLORS.green} size={20} />
        </View>
        <Text style={{ fontWeight: 600 }}>Date of Birth:- <Text style={{ fontWeight: 400 }}>{item.BirthDate}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Contact:- <Text style={{ fontWeight: 400 }}>{item.Contact}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Address:- <Text style={{ fontWeight: 400 }}>{item.Address}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Blood Group:- <Text style={{ fontWeight: 400 }}>{item.BloodGroup}</Text></Text>
      </View>
    )
  }

  const SkillDetails = () => {
    return (
      <View style={{ padding: 4 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 700, color: 'black' }}>Member Details: </Text>
          <TouchableOpacity onPress={() => setFillForm(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>ADD</Text>
            <Icons name='plus' size={16} />
          </TouchableOpacity>
        </View>

        {
          skills.map((item) => <Skill item={item} key={item.Contact} />)
          // console.warn(members)
        }

      </View>
    )
  }


  const ValidateForm = () => {
    if (
      selectedFamilyMemberValue === '' ||
      firstName === '' ||
      lastName === '' ||
      selectedGenderValue === '' ||
      selectedBirthDate === '' ||
      contact === '' ||
      address === '' ||
      selectedBloodGroupValue === ''
    ) { return false }
    else return true
  }


  // saving data to backend
  const saveSkillDetails = async () => {
    // console.warn("Saving data");
    try {
      if (ValidateForm()) {


        let familyData = {
          txnId: userId, operFlag: operFlag, candidateId: userId, userId: userId, familyMember: skill, fDate: selcetedFromDate, tDate: selcetedToDate,
        }
        console.warn(familyData);

        let res = await fetch("http://192.168.1.169:7038/api/hrms/saveFamilyInfo", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(familyData)
        })
        res = await res.json();
        res = await res?.Result[0]?.MSG
        ToastAndroid.show(res, 3000);
      }
      else {
        ToastAndroid.show("Fill all the Required Fields", 3000)
      }
    }
    catch (error) {
      ToastAndroid.show(error, 3000)
    }
  }

  const selectDropDownValue = (id) => {
    if (id === "skill") {
      return selectedSkillValue ? selectedSkillValue : skillDropDown?.map(a => a.PARAM_NAME)[0];
    }
  }

  const selectDropDownText = (id) => {
    if (id === "skill") {
      return selectedSkill ? selectedSkill : skillDropDown?.map(a => a.PARAM_NAME)[0];
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>

      {/* close header */}
      <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ flex: 1, ...FONTS.h3, fontSize: 20, color: COLORS.black }}>Skills</Text>
        <TouchableOpacity onPress={props.onPress}>
          <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
        </TouchableOpacity>
      </View>

      {/* {SkillDetails} */}
      <View style={{ marginVertical: 5 }}>
        <Text style={{ color: 'green', paddingHorizontal: 6 }}>Skill</Text>
        <TextInput value={skill} onChangeText={(val) => setSkill(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />
      </View>

      <View style={{ marginVertical: 5 }}>
        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Level</Text>
        <SelectDropdown data={skillDropDown?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedSkill(value), checkSkillValue(value) }} defaultButtonText={selectDropDownText("skill")} defaultValueByIndex={(selectDropDownValue("skill"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />
      </View>

      <View style={{ marginVertical: 5 }}>
        <Text style={{ color: 'green', paddingHorizontal: 6 }}>Total Experience</Text>
        <TextInput value={totalExperience} onChangeText={(val) => setTotalExperience(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />
      </View>


      <TouchableOpacity onPress={() => saveSkillDetails()} style={{ height: 40, backgroundColor: 'orange', margin: 7, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white' }}>Save Skill Details</Text>
      </TouchableOpacity>

      <View style={{marginBottom:160}}></View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputHolder: {
    borderWidth: 1, height: 40, borderColor: 'black', borderRadius: 12
  },
})

export default SkillsBottomView