import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../../../constants/theme'
import { FONTS } from '../../../../constants/font_size'
import SelectDropdown from 'react-native-select-dropdown'
import { useSelector } from 'react-redux'
import { API } from '../../../../utility/services'
import Toast from 'react-native-toast-message'
import LinearGradient from 'react-native-linear-gradient'
import TextDropdown from '../../../../components/TextDropdown'

const NominationBottomView = ({ nominations, onPress }) => {
  const userId = useSelector(state => state.candidateAuth.candidateId)

  const [nominationTypeDropDown, setNominationTypeDropDown] = useState()
  const [selectedNominationType, setSelectedNominationType] = useState();
  const [selectedNominationTypeValue, setSelectedNominationTypeValue] = useState('');

  const [newNominee, setNewNominee] = useState({ guardianName: '', share: '' })

  const [showNominations, setShowNominations] = useState(true)
  const [showNomineeform, setShowNomineeform] = useState(false)
  const [showAddMember, setShowAddMember] = useState(true)
  const [nomineeMember, setNomineeMember] = useState([])

  const [familyMemberDropDown, setFamilyMemberDropDown] = useState()
  const [selectedFamilyMember, setSelectedFamilyMember] = useState()
  const [selectedFamilyMemberValue, setSelectedFamilyMemberValue] = useState('')

  // Nominations Dropdown Data
  const getDropdownData = async (P) => {
    let response = await fetch(`${API}/api/User/getParam?getClaim=${P}`)
    response = await response.json();
    const returnedData = response;
    if (P === 41) {
      setNominationTypeDropDown(returnedData)
    } else if (P === 38) {

      setFamilyMemberDropDown(returnedData)
    }
  }


  useEffect(() => {
    getDropdownData(41);
    getDropdownData(38);
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

  const NominationDetails = () => {
    return (
      <View style={{ padding: 4 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 700, color: 'black' }}>Nomination Details: </Text>
          <TouchableOpacity onPress={() => setShowNominations(false)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>ADD</Text>
            <Icon name='plus' size={16} />
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  const AddMember = () => {
    setShowNomineeform(true)
  }

  const SaveMember = () => {
    setNomineeMember(nomineeMember.concat({ guardianName: newNominee.guardianName, share: newNominee.share }))
    setShowNomineeform(false)
    // setNewNominee({ guardianName: '', share: '' })
  }

  const NomineeInfo = () => {
    let info = ''

    for (let index = 0; index < nomineeMember.length; index++) {
      console.warn(nomineeMember[index])

      const element = nomineeMember[index]
      info += selectedNominationTypeValue + "," + element.guardianName + "," + element.share + "~"
    }

    return info
  }

  const ValidateForm = () => {
    let totalShare = 0;
    for (let index = 0; index < nomineeMember.length; index++) {
      totalShare += nomineeMember[index].share
    }

    return nomineeMember.length > 0
  }

  const SaveDetails = async () => {
    try {
      if (ValidateForm()) {

        let nomineeData = { txnId: '', candidateId: userId, userId: userId, operFlag: "A", param: '' };
        console.log("requestData", nomineeData)
        nomineeData.param = NomineeInfo();
        let res = await fetch(`${API}/api/hrms/candidateNomination`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(nomineeData)
        })
        res = await res.json();
        console.log('saveNominiee details', res)
      }
      else {

        Toast.show({
          type: 'error',
          text1: "Please Add nominees"
        })
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error
      })

    }
  }

  // console.warn(nomineeMember)

  const onChangeValue = (e) => {
    setNewNominee({ ...newNominee, [e.target.name]: e.target.value })
  }


  return (

    <View style={{ flex: 1 }}>
      {/* close button */}
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ flex: 1, ...FONTS.h3, fontSize: 20, color: COLORS.orange }}>Nominations</Text>
        <TouchableOpacity onPress={onPress}>
          <Icon name='close-circle-outline' size={30} color={COLORS.orange} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
        {showNominations && nominations?.length > 0 ? <NominationDetails /> : <>


          <TextDropdown
            caption={''}
            data={nominationTypeDropDown}
            setData={setSelectedNominationType}
            setIdvalue={setSelectedNominationTypeValue}
            defaultButtonText={selectedNominationType}
            captionStyle={{ color: COLORS.green, ...FONTS.h4 }}
          />

          {/* <SelectDropdown data={nominationTypeDropDown?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedNominationType(value), checkDropDownValue(value) }} defaultButtonText={selectDropDownText("nomination")} defaultValueByIndex={(selectDropDownValue("nomination"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} /> */}
          {nomineeMember?.map((item) => {
            return (
              <View style={{ borderWidth: 0.5, borderColor: COLORS.black, marginVertical: 4, padding: 5, borderRadius: 12 }}>
                <View style={{ marginVertical: 5 }}>
                  <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Family Member</Text>
                  <SelectDropdown data={nominationTypeDropDown?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedNominationType(value), checkDropDownValue(value) }} defaultButtonText={selectDropDownText("nomination")} defaultValueByIndex={(selectDropDownValue("nomination"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />
                </View>
                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Guardian Name:</Text>
                <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={item.guardianName} />
                <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Share:</Text>
                <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={item.share} />
              </View>
            )
          })}
          {showNomineeform && <View style={{ borderWidth: 0.5, borderColor: COLORS.black, marginVertical: 4, padding: 5, borderRadius: 12 }}>
            <View style={{ marginVertical: 5 }}>

              <TextDropdown
                caption={'Family Member'}
                data={familyMemberDropDown}
                setData={setSelectedFamilyMember}
                setIdvalue={setSelectedFamilyMemberValue}
                defaultButtonText={selectedFamilyMember}
                captionStyle={{ color: COLORS.green, ...FONTS.h4 }}
              />

              {/* <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Family Member</Text>
              <SelectDropdown data={nominationTypeDropDown?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedNominationType(value), checkDropDownValue(value) }} defaultButtonText={selectDropDownText("nomination")} defaultValueByIndex={(selectDropDownValue("nomination"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} /> */}

            </View>
            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Guardian Name:</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={newNominee.guardianName} onChangeText={(val) => setNewNominee([newNominee.guardianName = val])} name="guardianName" />
            <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Sharing lmao:</Text>
            <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} value={newNominee.share} onChangeText={(val) => setNewNominee([newNominee.share = val])} name="share" />
          </View>}
          {showAddMember && <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }} onPress={() => { AddMember(), setShowAddMember(false) }}>
            <Text style={{ backgroundColor: COLORS.green, marginTop: 10, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, color: COLORS.white }}>Add Member</Text>
          </TouchableOpacity>}
          {!showAddMember && <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }} onPress={() => { SaveMember(), setShowAddMember(true) }}>
            <Text style={{ backgroundColor: COLORS.green, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, color: COLORS.white }}>Save Member</Text>
          </TouchableOpacity>}

          <TouchableOpacity disabled={!showAddMember} onPress={() => SaveDetails()} >
            <LinearGradient
              colors={[COLORS.orange1, COLORS.disableOrange1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 2, y: 0 }}
              style={{ borderRadius: 8, padding: 10, marginTop: 30 }} >
              <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }}>Save Details</Text>
            </LinearGradient>
          </TouchableOpacity>
        </>}
        {/* <View style={{ marginBottom: 320 }}></View> */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  inputHolder: {
    borderWidth: 1,
    height: 40,
    borderColor: 'black',
    borderRadius: 12,
    marginTop: 20
  },
})

export default NominationBottomView