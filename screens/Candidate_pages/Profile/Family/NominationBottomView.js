import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../../../../constants/theme'
import { FONTS, SIZES } from '../../../../constants/font_size'
import SelectDropdown from 'react-native-select-dropdown'
import { useSelector } from 'react-redux'
import { API } from '../../../../utility/services'
import Toast from 'react-native-toast-message'
import LinearGradient from 'react-native-linear-gradient'
import TextDropdown from '../../../../components/TextDropdown'
import CustomInput from '../../../../components/CustomInput'
import TextButton from '../../../../components/TextButton'
import { showAlert, closeAlert } from "react-native-customisable-alert";

const NominationBottomView = ({ nominations, onPress }) => {
  const userId = useSelector(state => state.candidateAuth.candidateId);
  const [nominationTypeDw, setNominationTypeDw] = useState([]);
  const [selectedNominationType, setSelectedNominationType] = useState('');
  const [selectedNominationTypeValue, setSelectedNominationTypeValue] =
    useState('');
  const [familyMemberDropDown, setFamilyMemberDropDown] = useState([]);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState('');
  const [selectedFamilyMemberValue, setSelectedFamilyMemberValue] =
    useState('');
  const [gaurdianName, setGaurdianName] = useState('');
  const [nomineeMember, setNomineeMember] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [showNominee, setShowNominee] = useState('');
  const [allNominee, setAllNominee] = useState([]);
  const [numOfShares, setNumOfShares] = useState(0);
  const [share, setShare] = useState('');
  const [approvalFlag, setApprovalFlag] = useState('');
  const [approveRemark, setApproveRemarks] = useState('');
  const maxShares = 100;



  // Nominations Dropdown Data
  const getDropdownData = async P => {
    let response = await fetch(`${API}/api/User/getParam?getClaim=${P}`);
    response = await response.json();
    const returnedData = response;
    if (P === 41) {
      setNominationTypeDw(returnedData);
    } else if (P === 38) {
      setFamilyMemberDropDown(returnedData);
    }
  };
  useEffect(() => {
    getDropdownData(41);
    getDropdownData(38);
    getNominationData();
  }, []);

  const addMember = () => {
    if (ValidateForm()) {
      setNomineeMember(oldNominees => [
        ...oldNominees,
        {
          familyMember: selectedFamilyMemberValue,
          gaurdianName,
          nominationType: selectedNominationTypeValue,
          share,
        },
      ]);

      setSelectedNominationType('');
      setSelectedNominationTypeValue('');
      setSelectedFamilyMember('');
      setSelectedFamilyMemberValue('');
      setGaurdianName('');
      setShare('');
    }
    else {
      setLoaderVisible(false)
      Toast.show({
        type: 'error',
        text1: "Fill all the Marked Fields"
      })
    }
  };

  const handleInput = (text) => {
    setShare(text);
  };

  const checkShareValue = () => {
    const newSharesCount = numOfShares + parseInt(share);

    if (newSharesCount <= maxShares) {
      setNumOfShares(newSharesCount);
    } else {
      Toast({
        type: 'error',
        text1: 'value error'
      })
    }
    setShare('');

  };

  const ValidateForm = () => {

    if (
      selectedNominationType === '' ||
      selectedNominationTypeValue === '' ||
      share === ''
    ) { return false }
    else return true

  }

  // for deleting skill
  const DeleteNominee = async ({ txnId }) => {
    try {

      let nomineeData = {
        txnId: txnId, operFlag: "D", userId: userId
      }

      // console.warn(skillData);

      let res = await fetch(`${API}/api/hrms/candidateNomination`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nomineeData)
      })

      res = await res.json();
      res = await res?.Result[0]?.MSG
      // onPress
      getNominationData();
      Toast.show({
        type: 'success',
        text1: res
      })
      setShowNominee(true)

    }
    catch (error) {

      Toast.show({
        type: 'error',
        text1: error
      })
    }
  }

  // // for updating skill
  // const UpdateSkill = (item) => {

  //   setOperFlag("E")

  //   setSkill(item.SKILLS_NAME)
  //   setTotalExperience(item.TOTAL_EXP)
  //   setTxnId(item.TXN_ID)

  //   setSelectedSkillLevel(item.SKILL_LEVEL)
  //   setSelectedSkillLevelValue(item.SKILL_LEVEL_ID)

  //   setShowNominee(false);

  // }

  const getNominationData = async () => {

    try {

      setLoaderVisible(true)
      let nomineeData = {
        candidateId: userId,
        userId: userId,
        operFlag: 'V',

      };
      console.log('requestData', JSON.stringify(nomineeData));
      // nomineeData.param = NomineeInfo();
      let res = await fetch(`${API}/api/hrms/candidateNomination`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nomineeData),
      });
      res = await res.json();
      console.log('getNominee details', res?.Result[0]);
      setAllNominee(res?.Result)
      setShowNominee(true)
      setLoaderVisible(false);
      setApprovalFlag(res?.Result[0]?.APPROVAL_FLAG);
      setApproveRemarks(res?.Result[0]?.DOC_REJ_REMARK)

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });
    }

  }

  const submitNominee = async () => {
    if (nomineeMember.length > 0) {
      try {
        var param1 = ""

        nomineeMember.map((nominee, index) => {
          console.log(param1)
          if (param1 === "") {
            if (nomineeMember.length === index + 1) {
              param1 = `${nominee.nominationType},${nominee?.familyMember},${nominee?.gaurdianName},${nominee?.share}`

            } else {
              param1 = `${nominee.nominationType},${nominee?.familyMember},${nominee?.gaurdianName},${nominee?.share}~`
            }
          } else {
            if (nomineeMember.length === index + 1) {
              param1 = `${param1}${nominee.nominationType},${nominee?.familyMember},${nominee?.gaurdianName},${nominee?.share}`
            } else {
              param1 = `${param1}${nominee.nominationType},${nominee?.familyMember},${nominee?.gaurdianName},${nominee?.share}~`
            }
          }
          // console.log("dtaatttatatta", param1, nomineeMember.length);

        })



        setLoaderVisible(true)
        // if (param1 !== undefined) {
        let nomineeData = {
          txnId: '',
          candidateId: userId,
          userId: userId,
          operFlag: 'A',
          param: param1,
        };
        console.log('requestData', JSON.stringify(nomineeData));
        // nomineeData.param = NomineeInfo();
        let res = await fetch(`${API}/api/hrms/candidateNomination`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nomineeData),
        });
        res = await res.json();
        console.log('saveNominieedetails', res.Result[0]);
        param1 = undefined
        setLoaderVisible(false);
        if (res.Result[0].FLAG === "F") {
          Toast.show({
            type: 'error',
            text1: res.Result[0].MSG
          })
        } else {
          onPress();
          Toast.show({
            type: "success",
            text1: res.Result[0].MSG
          })
        }
        // onPress();
        // } else {
        //   setLoaderVisible(false);
        //   Toast.show({
        //     type: 'error',
        //     text1: "Please Add nominees"
        //   })
        // }
      } catch (error) {
        setLoaderVisible(false);
        Toast.show({
          type: 'error',
          text1: error,
        });
      }
    } else {
      setLoaderVisible(false);
      Toast.show({
        type: 'error',
        text1: "Please Add nominees",
      });
    }

  };



  // diplaying individual Nominee
  const Nominee = ({ item, key }) => {
    return (
      <View key={item.TXN_ID} style={{ backgroundColor: COLORS.disableOrange1, padding: 6, borderRadius: 12, marginVertical: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.GUARDIAN_NAME} </Text>
          {/* <Icons position='absolute' onPress={() => DeleteSkill({ txnId: item.TXN_ID })} right={0} name='trash-can-outline' color={COLORS.green} size={20} />
          <Icons position='absolute' onPress={() => UpdateSkill(item)} right={20} name='square-edit-outline' color={COLORS.green} size={20} /> */}
        </View>


        <TouchableOpacity style={{
          position: 'absolute',
          right: 0,
          padding: 5
        }} onPress={() => DeleteNominee({ txnId: item.TXN_ID })}>

          <Icon name='trash-can-outline' color={COLORS.green} size={20} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={{
          position: 'absolute', right: 30, padding: 5,
        }}>
          onPress={() => UpdateSkill(item)}
          <Icon name='square-edit-outline' color={COLORS.green} size={20} />
        </TouchableOpacity> */}

        <Text style={{ fontWeight: 600 }}>Nomination Type:- <Text style={{ fontWeight: 400 }}>{item.NOMINATION_TYPE}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Family Member:- <Text style={{ fontWeight: 400 }}>{item.FAMILY_MEMBER}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Gaurdian Name:- <Text style={{ fontWeight: 400 }}>{item.GUARDIAN_NAME}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Share %:- <Text style={{ fontWeight: 400 }}>{item.SHARE}</Text></Text>
      </View>
    )
  }

  // displaying skill details
  const NomineeDetails = () => {
    return (
      <View style={{ padding: 4, marginVertical: 5 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, marginTop: 15 }}>
          <Text style={{ fontWeight: 700, color: 'black' }}>Nominee: </Text>
          <TouchableOpacity onPress={() => setShowNominee(false)} style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
            <Text>ADD</Text>
            <Icon name='plus' size={16} />
          </TouchableOpacity>
        </View>

        {
          allNominee.map((item, index) => <Nominee item={item} key={index} />)
        }

      </View>
    )
  }


  return (
    <View style={{ flex: 1 }}>
      {/* close button */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{ ...FONTS.h3, fontSize: 20, color: COLORS.orange }}>
          Nominations
        </Text>
        {approvalFlag === "R" ? <TouchableOpacity style={{marginLeft:10}} onPress={() => {
          showAlert({
            title: approveRemark,
            customIcon: 'none',
            message: "",
            alertType: 'error',
            btnLabel: 'ok',
            onPress: () => closeAlert(),

          });
        }}>
          <Icon name='alert-circle-outline' size={25} color={COLORS.red} />
        </TouchableOpacity> : ""}
        <TouchableOpacity style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }} onPress={onPress}>
          <Icon name="close-circle-outline" size={30} color={COLORS.orange} />
        </TouchableOpacity>
      </View>
      {/* <Text>{JSON.stringify(nomineeMember)}</Text> */}

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

        <ScrollView
          style={{ marginBottom: 200 }}
          showsVerticalScrollIndicator={false}>
          {/* {!showNominee  && nomineeMember.length > 0 && <View>
          {nomineeMember.map((item, index) => {
            return <Nominee item={item} key={index} />
          })}
        </View>} */}
          {showNominee && allNominee[0]?.CANDIDATE_ID && allNominee.length > 0 ? <NomineeDetails /> : (
            <>
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: COLORS.lightGray,
                  padding: SIZES.base,
                  marginVertical: SIZES.radius,
                  borderRadius: SIZES.base,
                }}>
                <TextDropdown
                  caption={'Nomination type'}
                  data={nominationTypeDw}
                  setData={setSelectedNominationType}
                  setIdvalue={setSelectedNominationTypeValue}
                  defaultButtonText={selectedNominationType}
                />

                <TextDropdown
                  caption={'Family member'}
                  data={familyMemberDropDown}
                  setData={setSelectedFamilyMember}
                  setIdvalue={setSelectedFamilyMemberValue}
                  defaultButtonText={selectedFamilyMember}
                />

                <CustomInput
                  caption={'Gaurdian name'}
                  value={gaurdianName}
                  onChangeText={setGaurdianName}
                />

                <CustomInput
                  caption={'Share'}
                  required
                  value={share}
                  maxlength={3}
                  onChangeText={share <= 100 ? setShare : [showAlert({
                    title: "You can not distribute more than 100 shares",
                    customIcon: 'none',
                    message: "",
                    alertType: 'error',
                    onPress: () => closeAlert(),
                  }), setShare('')]}
                  keyboardType='numeric'
                />

                <TextButton
                  label={'Add member'}
                  linearGradientStyle={{
                    height: 50,
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                  }}
                  onPress={addMember}
                />
              </View>

              <TextButton
                label={'Submit'}
                linearGradientStyle={{
                  height: 50,
                  justifyContent: 'center',
                  borderRadius: SIZES.base,
                }}
                onPress={submitNominee}
              />

              <View style={{ marginBottom: 90 }}></View>
            </>
          )
          }
        </ScrollView>}
    </View>
  );
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