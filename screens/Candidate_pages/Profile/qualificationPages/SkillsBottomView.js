import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown'
import { useSelector } from 'react-redux';
import { API } from '../../../../utility/services';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import TextDropdown from '../../../../components/TextDropdown';
import { showAlert, closeAlert } from "react-native-customisable-alert";


const SkillsBottomView = ({ skills, onPress, fetchSkillsData }) => {

  // for getting candidate Id from redux
  const userId = useSelector(state => state.candidateAuth.candidateId)

  const [allSkills, setAllSkills] = useState([]);

  const [skill, setSkill] = useState([]);
  const [totalExperience, setTotalExperience] = useState('');
  const [operFlag, setOperFlag] = useState("A");
  const [txnId, setTxnId] = useState('');

  const [showSkills, setShowSkills] = useState(true);

  const [skillLevelDropDown, setSkillLevelDropDown] = useState([])
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('');
  const [selectedSkillLevelValue, setSelectedSkillLevelValue] = useState('');
  const [approvalFlag, setApprovalFlag] = useState('');
  const [approveRemark, setApproveRemarks] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);

  useEffect(() => {
    getDropdownData(39);
    getSkillsData();
  }, [])

  useEffect(() => {
    setAllSkills(skills);
    // console.log("skills", skills)
  }, [skills])

  const getSkillsData = async () => {
    let skillsData = { operFlag: "V", candidateId: userId }
    let res = await fetch(`${API}/api/hrms/candidateSkills`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(skillsData)
    })
    res = await res.json()
    res = await res?.Result
    // console.log("SkillData", res);
    setApprovalFlag(res[0]?.DOC_REJ_REMARK);
    setApprovalFlag(res[0]?.APPROVAL_FLAG);
  }

  // getiing Skill dropdown data 
  const getDropdownData = async (P) => {
    let response = await fetch(`${API}/api/User/getParam?getClaim=${P}`)
    response = await response.json();
    const returnedData = response;
    // console.warn(returnedData);
    if (P === 39) { setSkillLevelDropDown(returnedData) }
  }


  // selecting skill Id for saving to backend
  const checkSkillValue = (value) => {
    for (let index = 0; index < skillLevelDropDown.length; index++) {
      const element = skillLevelDropDown[index];
      if (element.PARAM_NAME === value) setSelectedSkillLevelValue(element.PARAM_ID);
    }
  }

  // for deleting skill
  const DeleteSkill = async ({ txnId }) => {
    try {

      let skillData = {
        txnId: txnId, operFlag: "D", userId: userId
      }

      // console.warn(skillData);

      let res = await fetch(`${API}/api/hrms/candidateSkills`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(skillData)
      })

      res = await res.json();
      res = await res?.Result[0]?.MSG
      // onPress
      fetchSkillsData();
      Toast.show({
        type: 'success',
        text1: res
      })
      setShowSkills(true)

    }
    catch (error) {

      Toast.show({
        type: 'error',
        text1: error
      })
    }
  }

  // for updating skill
  const UpdateSkill = (item) => {

    setOperFlag("E")

    setSkill(item.SKILLS_NAME)
    setTotalExperience(item.TOTAL_EXP)
    setTxnId(item.TXN_ID)

    setSelectedSkillLevel(item.SKILL_LEVEL)
    setSelectedSkillLevelValue(item.SKILL_LEVEL_ID)

    setShowSkills(false);

  }

  // diplaying individual skill
  const Skill = ({ item, key }) => {
    return (
      <View key={key} style={{ backgroundColor: COLORS.disableOrange1, padding: 6, borderRadius: 12, marginVertical: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.SKILLS_NAME} </Text>
          {/* <Icons position='absolute' onPress={() => DeleteSkill({ txnId: item.TXN_ID })} right={0} name='trash-can-outline' color={COLORS.green} size={20} />
          <Icons position='absolute' onPress={() => UpdateSkill(item)} right={20} name='square-edit-outline' color={COLORS.green} size={20} /> */}
        </View>


        <TouchableOpacity style={{
          position: 'absolute',
          right: 0,
          padding: 5
        }} onPress={() => DeleteSkill({ txnId: item.TXN_ID })}>
          <Icons name='trash-can-outline' color={COLORS.green} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={{
          position: 'absolute', right: 30, padding: 5,
        }} onPress={() => UpdateSkill(item)}>
          <Icons name='square-edit-outline' color={COLORS.green} size={20} />
        </TouchableOpacity>

        <Text style={{ fontWeight: 600 }}>Skill Level:- <Text style={{ fontWeight: 400 }}>{item.SKILL_LEVEL}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Total Experience:- <Text style={{ fontWeight: 400 }}>{item.TOTAL_EXP}</Text></Text>
      </View>
    )
  }

  // displaying skill details
  const SkillDetails = () => {
    return (
      <View style={{ padding: 4, marginVertical: 5 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, marginTop: 15 }}>
          <Text style={{ fontWeight: 700, color: 'black' }}>Skills: </Text>
          <TouchableOpacity onPress={() => setShowSkills(false)} style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
            <Text>ADD</Text>
            <Icons name='plus' size={16} />
          </TouchableOpacity>
        </View>

        {
          skills.map((item, index) => <Skill item={item} key={index} />)
        }

      </View>
    )
  }

  // validating filled values
  const ValidateForm = () => {
    if (
      selectedSkillLevelValue === '' ||
      totalExperience === '' ||
      skill === ''
    ) { return false }
    else return true
  }

  // saving data to backend
  const saveSkillDetails = async () => {
    // console.warn("Saving data");
    try {
      if (ValidateForm()) {

        let skillData = {
          txnId: txnId, operFlag: operFlag, candidateId: userId, userId: userId, skillsName: skill, level: selectedSkillLevelValue, totalExp: totalExperience
        }
        // console.warn(skillData);
        setLoaderVisible(true);
        let res = await fetch(`${API}/api/hrms/candidateSkills`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(skillData)
        })
        res = await res.json();
        res = await res?.Result[0]?.MSG
        setLoaderVisible(false);
        onPress()
        Toast.show({
          type: 'success',
          text1: res
        })
      }
      else {
        setLoaderVisible(false);
        Toast.show({
          type: 'error',
          text1: "Fill all the Required Fields"
        })
      }
    }
    catch (error) {
      setLoaderVisible(false);
      Toast.show({
        type: 'error',
        text1: error
      })

    }
  }

  // selecting dropdown value
  const selectDropDownValue = (id) => {
    if (id === "skill") {
      return selectedSkillLevelValue ? selectedSkillLevelValue : skillLevelDropDown?.map(a => a.PARAM_NAME)[0];
    }
  }

  // selecting dropdown text
  const selectDropDownText = (id) => {
    if (id === "skill") {
      return selectedSkillLevel ? selectedSkillLevel : skillLevelDropDown?.map(a => a.PARAM_NAME)[0];
    }
  }


  return (
    <View style={{ flex: 1 }}>

      {/* close header */}
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ ...FONTS.h3, fontSize: 20, color: COLORS.orange }}>Skill's</Text>
        {approvalFlag === "R" ? <TouchableOpacity onPress={() => {
          showAlert({
            title: approveRemark,
            customIcon: 'none',
            message: "",
            alertType: 'error',
            btnLabel: 'ok',
            onPress: () => closeAlert(),

          });
        }}>
          <Icons name='alert-circle-outline' size={25} color={COLORS.red} style={{ marginLeft: 10 }} />
        </TouchableOpacity> : ""}
        <TouchableOpacity style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }} onPress={onPress}>
          <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
        </TouchableOpacity>
      </View>

      {loaderVisible ? (<View style={{ alignItems: 'center', marginTop: '30%', }}>
        <ActivityIndicator color={COLORS.orange1} />
        <Text
          style={{
            ...FONTS.h3,
            fontWeight: '500',
            color: COLORS.orange1,
            marginTop: SIZES.base,
          }}>
          Loading your details
        </Text>
      </View>
      ) :

        <ScrollView showsVerticalScrollIndicator={false}>
          {
            showSkills && allSkills[0]?.FLAG === "S" ? <SkillDetails /> : (
              <View>
                {/* {SkillDetails} */}
                {/* {console.log("first", skills?.length)} */}

                <View style={{
                  marginVertical: 5, marginTop: 20
                }}>
                  <Text style={{ color: 'green', paddingHorizontal: 6 }}>Skill</Text>
                  <TextInput value={skill} onChangeText={(val) => setSkill(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />
                </View>

                {/* Level dropDown */}
                <View style={{ marginVertical: 5 }}>

                  <TextDropdown
                    caption={'Level'}
                    data={skillLevelDropDown}
                    setData={setSelectedSkillLevel}
                    setIdvalue={setSelectedSkillLevelValue}
                    defaultButtonText={selectedSkillLevel}
                    captionStyle={{ color: COLORS.green, ...FONTS.h4 }}
                  />



                  {/* <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Level</Text>
                <SelectDropdown data={skillLevelDropDown?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%', marginVertical: 3, marginHorizontal: 7 }]} onSelect={(value) => { setSelectedSkillLevel(value), checkSkillValue(value) }} defaultButtonText={selectDropDownText("skill")} defaultValueByIndex={(selectDropDownValue("skill"))} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} /> */}
                </View>

                {/* Total experience */}
                <View style={{ marginVertical: 5 }}>
                  <Text style={{ color: 'green', paddingHorizontal: 6 }}>Total Experience</Text>
                  <TextInput value={totalExperience} onChangeText={(val) => setTotalExperience(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />
                </View>

                {/* Saving Data */}
                {approvalFlag !== "A" ?
                <TouchableOpacity onPress={() => saveSkillDetails()} >
                  <LinearGradient
                    colors={[COLORS.orange1, COLORS.disableOrange1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 2, y: 0 }}
                    style={{ borderRadius: 8, padding: 10, marginTop: 20 }} >
                    <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }}>Save Skill Details</Text>

                  </LinearGradient>
                </TouchableOpacity>:""}
              </View>
            )
          }

          {/* <View style={{ marginBottom: 320 }}></View> */}

        </ScrollView>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  inputHolder: {
    borderWidth: 1, height: 40, borderColor: 'black', borderRadius: 12
  },
})

export default SkillsBottomView