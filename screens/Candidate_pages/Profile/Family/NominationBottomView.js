import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../../../constants/theme'
import { FONTS } from '../../../../constants/font_size'
import SelectDropdown from 'react-native-select-dropdown'

const NominationBottomView = ({ nominations, onPress }) => {


  const [nominationTypeDropDown, setNominationTypeDropDown] = useState()
  const [selectedNominationType, setSelectedNominationType] = useState();
  const [selectedNominationTypeValue, setSelectedNominationTypeValue] = useState('');

  const [guardianName, setGuardianName] = useState('')
  const [share, setShare] = useState('')

  const [showNominations, setShowNominations] = useState(true)

  const [nomineeMember, setNomineeMember] = useState([])

  // Nominations Dropdown Data
  const getDropdownData = async (P) => {
    let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
    response = await response.json();
    const returnedData = response;
    // console.warn(returnedData);
    if (P === 41) { setNominationTypeDropDown(returnedData) }
  }


  useEffect(() => {
    getDropdownData(41);
  }, [])

  const checkDropDownValue = (value) => {
    for (let index = 0; index < nominationTypeDropDown.length; index++) {
      const element = nominationTypeDropDown[index];
      if (element.PARAM_NAME === value) setSelectedNominationTypeValue(element.PARAM_ID);
    }
  }

  const selectDropDownValue = (id) => {
    if (id === "nomination") {
      return selectedNominationTypeValue ? selectedNominationTypeValue : nominationTypeDropDown?.map(a => a.PARAM_ID)[0];
    }
  }

  const selectDropDownText = (id) => {
    if (id === "nomination") {
      return selectedNominationType ? selectedNominationType : nominationTypeDropDown?.map(a => a.PARAM_NAME)[0];
    }
  }

  const AddFamilyMember = () => {
    setNomineeMember(nomineeMember.concat({ guardianName: null, share: null }))
  }

  const FamilyMemberNominee = (item) => {

    return (
      <View style={{ borderWidth: 0.5, borderColor: COLORS.black, marginVertical: 4, padding: 5, borderRadius: 12 }}>

        <View style={{ marginVertical: 5 }}>
          <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Family Member</Text>
          <SelectDropdown data={nominationTypeDropDown?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedNominationType(value), checkDropDownValue(value) }} defaultButtonText={selectDropDownText("nomination")} defaultValueByIndex={(selectDropDownValue("nomination"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />
        </View>

        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Guardian Name:</Text>
        <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} onChange={(val) => { nomineeMember.guardianName = val; setNomineeMember([...nomineeMember]) }} />

        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Share</Text>
        <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={nomineeMember?.share} onChange={(val) => { nomineeMember.share = val, setNomineeMember([...nomineeMember]) }} />


      </View>
    )
  }

  const NominationForm = () => {
    return (
      <View>

        {/* Nomination Type dropdown */}
        <View style={{ marginVertical: 5 }}>
          <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Nomination Type</Text>
          <SelectDropdown data={nominationTypeDropDown?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedNominationType(value), checkDropDownValue(value) }} defaultButtonText={selectDropDownText("nomination")} defaultValueByIndex={(selectDropDownValue("nomination"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />
        </View>

        {nomineeMember?.map((item) => <FamilyMemberNominee item={item} />)}

        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }} onPress={() => AddFamilyMember()}>
          <Text style={{ backgroundColor: COLORS.green, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, color: COLORS.white }}>Add Member</Text>
        </TouchableOpacity>

      </View>
    )
  }

  // all the nominee for a particular nomination
  const Nominee = ({ item }) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: COLORS.red, fontWeight: 500 }}>Member name: </Text>
          <Text style={{ color: COLORS.red, fontWeight: 500 }}>{item.MEMBER_LAST_NAME} </Text>
        </View>
        <Text style={{ fontWeight: 600 }}>Guardian Name:- <Text style={{ fontWeight: 400 }}>{item.DATE_OF_BIRTH}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Share:- <Text style={{ fontWeight: 400 }}>{item.CONTACT_NO}%</Text></Text>
      </View>
    )
  }

  const Nomination = ({ item }) => {
    return (
      <View style={{ backgroundColor: COLORS.disableOrange1, padding: 6, borderRadius: 12, marginVertical: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>{item}</Text>

          <Icons position='absolute' onPress={() => DeleteNomination({ txnId: item.TXN_ID })} right={0} name='trash-can-outline' color={COLORS.green} size={20} />
          <Icons position='absolute' onPress={() => UpdateNomination(item)} right={20} name='square-edit-outline' color={COLORS.green} size={20} />
        </View>

        {
          item.nominee.map((member) => <Nominee item={member} />)
        }

      </View>
    )
  }

  const NominationDetails = () => {
    return (
      <View style={{ padding: 4 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 700, color: 'black', marginVertical: 10 }}>Nominations: </Text>
          <TouchableOpacity onPress={() => setShowNominations(false)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>ADD</Text>
            <Icons name='plus' size={16} />
          </TouchableOpacity>
        </View>


        {/* allNominations.map((item) => <Nomination item={item} />) */}


      </View>
    )
  }


  return (
    <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>

      {/* close button */}
      <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ flex: 1, ...FONTS.h3, fontSize: 20, color: COLORS.orange1 }}>Nominations</Text>
        <TouchableOpacity onPress={onPress}>
          <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
        </TouchableOpacity>
      </View>


      {/* <NominationDetails /> */}
      <NominationForm />

      <View style={{ marginBottom: 320 }}></View>
      {console.warn(nomineeMember.length)}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputHolder: {
    borderWidth: 1, height: 40, borderColor: 'black', borderRadius: 12
  },
})

export default NominationBottomView