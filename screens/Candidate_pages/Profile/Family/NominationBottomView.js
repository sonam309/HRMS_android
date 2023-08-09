import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
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
  const [share, setShare] = useState('');
  const [nomineeMember, setNomineeMember] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);


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
  }, []);





  const addMember = () => {
    if (ValidateForm()) {
      setNomineeMember(oldNominees => [
        ...oldNominees,
        {
          nominationType: selectedNominationTypeValue,
          familyMember: selectedFamilyMemberValue,
          gaurdianName,
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



  const ValidateForm = () => {

    if (
      selectedNominationType === '' ||
      selectedNominationTypeValue === '' ||
      gaurdianName === '' ||
      share === ''
    ) { return false }
    else return true

  }


  const submitNominee = async () => {

    if (true) {
      try {
        let nomineeData = {
          txnId: '',
          candidateId: userId,
          userId: userId,
          operFlag: 'A',
          param: JSON.stringify(nomineeMember),
        };
        console.log('requestData', nomineeData);
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
        console.log('saveNominiee details', res);
        Toast.show({
          type: "success",
          text1: "Nominnees saved succesfully"
        })
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: error,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please Add nominees',
      });
    }

  };

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
          style={{ flex: 1, ...FONTS.h3, fontSize: 20, color: COLORS.orange }}>
          Nominations
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Icon name="close-circle-outline" size={30} color={COLORS.orange} />
        </TouchableOpacity>
      </View>
      {/* <Text>{JSON.stringify(nomineeMember)}</Text> */}
      <ScrollView
        style={{ marginBottom: 200 }}
        showsVerticalScrollIndicator={false}>
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
            required
            value={gaurdianName}
            onChangeText={setGaurdianName}
          />

          <CustomInput
            caption={'Share'}
            required
            value={share}
            onChangeText={setShare}
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
      </ScrollView>
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