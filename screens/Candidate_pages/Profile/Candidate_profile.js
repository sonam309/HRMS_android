import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../../constants/theme'
import { approveMark, rejectMark, user_profile } from '../../../assets'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomUpModal from '../../../components/BottomUpModal';
import QualificationBottomView from './qualificationPages/QualificationBottomView';
import { FONTS, SIZES } from '../../../constants/font_size';
import SkillsBottomView from './qualificationPages/SkillsBottomView';
import LanguageBottomView from './qualificationPages/LanguageBottomView';
import BankBottomView from './AboutMe/BankBottomView';
import PersonalBottomView from './AboutMe/PersonalBottomView';
import ContactBottomView from './AboutMe/ContactBottomView';
import PersonalAddressBottomView from './Address/PersonalAddressBottomView';
import FamilyBottomView from './Family/FamilyBottomView';
import MedicalBottomView from './Family/MedicalBottomView';
import NominationBottomView from './Family/NominationBottomView';
import Identifications from './identityProof_Pages/Identifications';
import Esic_Bottomview from './identityProof_Pages/Esic_Bottomview';
import UAN_BottomView from './identityProof_Pages/UAN_BottomView';
import { useSelector } from 'react-redux';
import Emp_HistoryBottomView from './EmployementHistory/Emp_HistoryBottomView';
import { API } from '../../../utility/services';
import GuarantorBottomView from './Guarantor/GuarantorBottomView';
import axios from 'axios';
import Toast from 'react-native-toast-message';



const Candidate_profile = () => {

  const userId = useSelector(state => state.candidateAuth.candidateId)
  const userName = useSelector(state => state.candidateAuth.candidateName)

  // for showing data in listView
  const [employment, setEmployement] = useState([])
  const [members, setMembers] = useState([])
  const [updateMember, setUpdateMember] = useState([])
  const [medicalPolicy, setMedicalPolicy] = useState([])
  const [skills, setSkills] = useState([])
  const [languages, setLanguages] = useState([])
  const [qualification, setQualification] = useState([])

  // to hide and show Dropdown
  const [aboutMeView, setAboutMeView] = useState(false)
  const [addressView, setAddressView] = useState(false)
  const [familyView, setFamilyView] = useState(false)
  const [skillAndQualifView, setSkillAndQualifView] = useState(false)
  const [employmentView, setEmploymentView] = useState(false)
  const [identityView, setIdentityView] = useState(false)
  const [qualificationsView, setQualificationsView] = useState(false);
  const [skillsView, setSkillsView] = useState(false);
  const [languagesView, setLanguagesView] = useState(false);
  const [esicView, setEsicView] = useState(false);
  const [uanView, setUanView] = useState(false);
  const [esignView, setEsignView] = useState(false);
  const [guarantorView, setGuarantorView] = useState(false);

  // to hide and show bottomUp modal
  const [personalView, setPersonalView] = useState(false)
  const [contactView, setContactView] = useState(false)
  const [bankView, setBankView] = useState(false)
  const [personalAddressView, setPersonalAddressView] = useState(false)
  const [identifications, setIdentifications] = useState(false);
  const [familyDetailsView, setFamilyDetailsView] = useState(false)
  const [nominationView, setNominationView] = useState(false)
  const [medicalView, setMedicalView] = useState(false)
  const [filledDetails, setFilledDetails] = useState('');
  const [employHistoryView, setEmployeHistoryView] = useState(false);
  const [filledCandidateInfo, setFilledCandidateInfo] = useState('');
  const [personalApprovalFlag, setPersonalApprovalFlag] = useState('');
  const [identificationApproveFlag, setIdentificationApproveFlag] = useState('');
  const [contactAppFlag, setConatctAppFlag] = useState('');
  const [bankAppFlag, setBankAppFlag] = useState('');
  const [addressAppFlag, setAddressAppFlag] = useState('');
  const [familyAppFlag, setFamilyAppFlag] = useState('');
  const [nominationAppFlag, setnominationAppFlag] = useState('');
  const [medicalAppFlag, setMedicalAppFlag] = useState('');
  const [qualiAppFlag, setQualiAppFlag] = useState('');
  const [skillAppFlag, setSkillAppFlag] = useState('');
  const [languageAppFlag, setLanguageAppFlag] = useState('');
  const [esicAppFlag, setEsicAppFlag] = useState('');
  const [uanAppFlag, setUAnAppFlag] = useState('');
  const [employmentAppFlag, setEmployementAppFlag] = useState('');
  const [guarantorAppFlag, setGuarantorAppFlag] = useState('');

  const fetchPersonalData = async () => {
    try {

      let PersonalData = { operFlag: 'V', candidateId: userId };
      var formData = new FormData();
      console.log(PersonalData);
      formData.append('data', JSON.stringify(PersonalData));
      let res = await fetch(
        `${API}/api/hrms/savePersonalDetails`,
        {
          method: 'POST',
          body: formData,
        },
      );
      res = await res.json();
      res = await res?.Result[0];

      console.log("personamDetailsBankkkkkkkkkkkkkkk", res);

      setPersonalApprovalFlag(res.PERSON_APP_FLAG);
      setConatctAppFlag(res.CONTACT_APP_FLAG);
      setBankAppFlag(res.BANK_APP_FLAG);

    } catch (error) {

      Toast.show({
        type: 'error',
        text1: error,
      });
    }
  };


  // For fetching details of Address dropdown -> Personal
  const fetchAddressData = async () => {
    let AddressData = { operFlag: "V", candidateId: userId }
    let res = await fetch(`${API}/api/hrms/saveCandidateAddress`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(AddressData)
    })
    res = await res.json()
    res = await res?.Result[0]
    console.log("Address", res);
    setFilledDetails(res);
    setAddressAppFlag(res.APPROVAL_FLAG);
  }

  // For fetching details of Family dropdown -> Personal
  const fetchFamilyData = async () => {
    let FamilyData = { operFlag: "V", candidateId: userId }
    let res = await fetch(`${API}/api/hrms/saveFamilyInfo`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(FamilyData)
    })
    res = await res.json()
    res = await res?.Result
    console.log("familydata", res);
    setMembers(res);
    console.log("familyappFlagSonammm", res[0].APPROVAL_FLAG)
    setFamilyAppFlag(res[0].APPROVAL_FLAG);
  }

  // For fetching details of Family dropdown -> Personal
  const fetchEmploymentData = async () => {
    let employmentData = { operFlag: "V", candidateId: userId }
    let res = await fetch(`${API}/api/hrms/candidateEmployementInfo`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employmentData)
    })
    res = await res.json()
    res = await res?.Result
    console.log("employmentdata", res);
    setEmployement(res);
    setEmployementAppFlag(res[0].APPROVAL_FLAG);
  }

  // For fetching details of Family dropdown -> Personal
  const fetchSkillsData = async () => {
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
    console.log("SkillData", res);
    setSkills(res);
    setSkillAppFlag(res[0].APPROVAL_FLAG);
  }

  const fetchMedicalData = async () => {
    let medicalData = { operFlag: "V", candidateId: userId }
    let res = await fetch(`${API}/api/hrms/candidateMedicalPolicy`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(medicalData)
    })
    res = await res.json()
    res = await res?.Result
    console.log("medicaldata", res);
    setMedicalPolicy(res);
    setMedicalAppFlag(res[0].APPROVAL_FLAG);
  }

  const fetchLanguageData = async () => {
    let languageData = { operFlag: "V", candidateId: userId }
    let res = await fetch(`${API}/api/hrms/candidateLanguage`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(languageData)
    })
    res = await res.json()
    res = await res?.Result
    console.log("languagedata", res);
    setLanguages(res);
    setLanguageAppFlag(res[0].APPROVAL_FLAG);
  }

  const fetchQualificationData = async () => {
    let qualficationData = { operFlag: "V", candidateId: userId }
    let res = await fetch(`${API}/api/hrms/candidateQualification`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(qualficationData)
    })
    res = await res.json()
    res = await res?.Result
    console.log("qualfication Data", res);
    setQualification(res);
    setQualiAppFlag(res[0].APPROVAL_FLAG);
  }

  const getIdentificationData = () => {
    axios
      .post(`${API}/api/hrms/indentityProof`, {
        candidateId: userId,
        userId: userId,
        operFlag: 'V',
      })
      .then(response => {
        const returnedData = response?.data?.Result;
        const preFilledData = returnedData[0];
        const msg = returnedData[0].MSG
        setIdentificationApproveFlag(returnedData[0].APPROVAL_FLAG);
        console.log("identificationData", returnedData[0].APPROVAL_FLAG);
      })
      .catch(err => {
        console.log(err);

      });
  };

  const getNominationData = async () => {

    try {
      let nomineeData = {
        candidateId: userId,
        userId: userId,
        operFlag: 'V',

      };

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
      console.log('getNominee details', res.Result[0].APPROVAL_FLAG);
      setnominationAppFlag(res.Result[0].APPROVAL_FLAG);
    } catch (error) {
      // Toast.show({
      //   type: 'error',
      //   text1: error,
      // });
    }

  }

  const getEsicData = () => {
    axios
      .post(`${API}/api/hrms/saveCandidateUanInfo`, {
        candidateId: userId,
        userId: userId,
        operFlag: 'W',
      }).then(response => {
        const returnedData = response?.data?.Result;
        const ESICDetails = returnedData[0];
        const msg = returnedData[0].MSG
        console.log("getEsignDataSonammmm", ESICDetails);
        setEsicAppFlag(ESICDetails.APPROVAL_FLAG);
      }).catch(error => {

      });
  };

  const getUANData = () => {
    axios
      .post(`${API}/api/hrms/saveCandidateUanInfo`, {
        candidateId: userId,
        userId: userId,
        operFlag: 'V',
      }).then(response => {
        const returnedData = response?.data?.Result;
        const ESICDetails = returnedData[0];
        const msg = returnedData[0].MSG
        console.log("getUanNumber", ESICDetails);
        setUAnAppFlag(ESICDetails.APPROVAL_FLAG);
      }).catch(error => {

      });
  };

  const getGuarantorDetails = () => {
    try {
      const guarantorData = {
        candidateId: userId,
        userId: userId,
        operFlag: "V",

      }
      console.log("GuarantoDataRequest", guarantorData)
      axios.post(`${API}/api/hrms/saveGrantorInfo`, guarantorData).then((response) => {
        const result = response.data.Result;
        console.log("resultguarantor", result);

        setGuarantorAppFlag(result[0].APPROVAL_FLAG);
      })
    } catch (error) {

      Toast.show({
        type: 'error',
        text1: error
      })

    }
  }

  // useEffect(() => {
  //   addressView && fetchAddressData()
  // }, [addressView, personalAddressView])

  useEffect(() => {
    fetchPersonalData();
    getIdentificationData();
    fetchAddressData();
    getNominationData();
    getEsicData();
    getUANData();
    getGuarantorDetails();
    familyView && fetchFamilyData()
  }, [familyView, familyDetailsView])

  useEffect(() => {
    familyView && fetchMedicalData()
  }, [familyView, medicalView])

  useEffect(() => {
    employmentView && fetchEmploymentData()
  }, [employmentView, employHistoryView])

  useEffect(() => {
    skillAndQualifView && fetchSkillsData()
  }, [skillAndQualifView, skillsView])

  useEffect(() => {
    skillAndQualifView && fetchLanguageData()
  }, [skillAndQualifView, languagesView])

  useEffect(() => {
    skillAndQualifView && fetchQualificationData()
  }, [skillAndQualifView, qualificationsView])

  return (
    <View style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <ScrollView showsVerticalScrollIndicator={false} >
        {/* Name and User id of candidate */}
        <View style={[{ backgroundColor: COLORS.white, alignItems: 'center', margin: 10, padding: SIZES.radius, borderRadius: SIZES.base, borderWidth: 0.5, borderColor: COLORS.lightGray, marginTop: SIZES.padding, }]}>
          <Image source={user_profile} style={{ height: 80, width: 80, borderRadius: 40 }} />
          <Text style={{ fontWeight: 500, ...FONTS.body4, color: COLORS.orange1, marginTop: 5 }}>Name: {userName}</Text>
          <Text style={{ fontWeight: 500, ...FONTS.body4, color: COLORS.orange1, marginTop: -5 }}>Candidate ID: {userId}</Text>
        </View>

        {/* About Me header and it's dropdown content */}
        <View style={{ flex: 1, backgroundColor: COLORS.white, margin: 10, padding: 5, borderRadius: SIZES.base, }}>

          <View style={{
            borderWidth: 0.5,
            borderRadius: SIZES.base,
            padding: SIZES.base,
            borderColor: COLORS.lightGray
          }}>
            <TouchableOpacity onPress={() => setAboutMeView(!aboutMeView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
              <Ionicons name='ios-person-circle-sharp' size={20} color={COLORS.orange} />
              <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>About Me</Text>
              <FontAwesome style={{ position: 'absolute', right: 5 }} name={aboutMeView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
            </TouchableOpacity>

            {/* about me dropdown option */}
            {aboutMeView && (
              <View style={{ paddingHorizontal: 16, marginVertical: SIZES.base }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderTopColor: 'black', width: '45%' }} onPress={() => setPersonalView(!personalView)}>
                    <Icons name='id-card' color={'green'} size={18} />
                    <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4, color: personalApprovalFlag === "R" ? COLORS.red : (personalApprovalFlag === "A" ? COLORS.green : COLORS.gray) }}>Personal Details</Text>
                  </TouchableOpacity>
                  {personalApprovalFlag &&
                    <Image source={personalApprovalFlag === "A" ? approveMark : (personalApprovalFlag === "R" && rejectMark)}
                      style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }} />
                  }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopColor: 'black', width: '45%' }} onPress={() => setContactView(!contactView)}>
                    <Icons name='cellphone' color={'green'} size={18} />
                    <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4, color: contactAppFlag === "R" ? COLORS.red : (contactAppFlag === "A" ? COLORS.green : COLORS.gray) }}>Contact Details</Text>
                  </TouchableOpacity>
                  {contactAppFlag &&
                    <Image source={contactAppFlag === "A" ? approveMark : (contactAppFlag === "R" && rejectMark)}
                      style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }} />
                  }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderTopColor: 'black', width: '45%' }} onPress={() => setBankView(!bankView)}>
                    <Icons name='bank' color={'green'} size={18} />
                    <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4, color: bankAppFlag === "R" ? COLORS.red : (bankAppFlag === "A" ? COLORS.green : COLORS.gray) }}>Bank Details</Text>
                  </TouchableOpacity>
                  {bankAppFlag &&
                    <Image source={bankAppFlag === "A" ? approveMark : (bankAppFlag === "R" && rejectMark)}
                      style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }} />
                  }
                </View>
              </View>
            )}
          </View>
          {/* The dropdown options */}

          {/* <Text>{JSON.stringify("harih om",filledCandidateInfo)}</Text> */}
          {/* Content of About Me dropdown -> personal, Contact and Bank details */}
          {personalView && (
            <BottomUpModal isVisible={personalView} onClose={() => { setPersonalView(false); }} >
              <PersonalBottomView onPress={() => setPersonalView(false)} />
            </BottomUpModal>
          )}

          {contactView && (
            <BottomUpModal isVisible={contactView} onClose={() => { setContactView(false); }} >
              <ContactBottomView onPress={() => setContactView(false)} />
            </BottomUpModal>
          )}


          {bankView && (
            <BottomUpModal isVisible={bankView} onClose={() => { setBankView(false); }}>
              <BankBottomView onPress={() => setBankView(false)} />
            </BottomUpModal>
          )}


          <View style={{
            borderWidth: 0.5,
            borderRadius: SIZES.base,
            padding: SIZES.base,
            borderColor: COLORS.lightGray,
            marginTop: SIZES.radius
          }}>
            {/* Address header and it's dropdown content */}
            <TouchableOpacity onPress={() => setAddressView(!addressView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
              <Ionicons name='location-sharp' size={20} color={COLORS.orange} />
              <Text style={{ ...FONTS.h4, paddingHorizontal: 5, }}>Address</Text>
              <FontAwesome style={{ position: 'absolute', right: 5 }} name={addressView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
            </TouchableOpacity>

            {/* The dropdown options */}
            {addressView && (
              <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopColor: 'black', width: '45%' }} onPress={() => setPersonalAddressView(!personalAddressView)}>
                    <Icons name='home' color={'green'} size={20} />
                    <Text style={{ marginLeft: SIZES.base, width: '100%', color: addressAppFlag === "R" ? COLORS.red : (addressAppFlag === "A" ? COLORS.green : COLORS.gray) }}>Address</Text>
                  </TouchableOpacity>
                  {addressAppFlag &&
                    <Image source={addressAppFlag === "A" ? approveMark : (addressAppFlag === "R" && rejectMark)}
                      style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }} />
                  }
                </View>
              </View>
            )}
          </View>

          {/* Content of Address dropdown -> Permanent, personal and emergency address */}
          {personalAddressView && (
            <BottomUpModal isVisible={personalAddressView} onClose={() => { setPersonalAddressView(false); }} >
              <PersonalAddressBottomView onPress={() => setPersonalAddressView(false)} />
            </BottomUpModal>
          )}

          <View style={{
            borderWidth: 0.5,
            borderRadius: SIZES.base,
            padding: SIZES.base,
            borderColor: COLORS.lightGray,
            marginTop: SIZES.radius
          }}>

            {/* Family header and it's dropdown content */}
            <TouchableOpacity onPress={() => setFamilyView(!familyView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
              <Icons name='human-male-female-child' size={20} color={COLORS.orange} />
              <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>Family</Text>
              <FontAwesome style={{ position: 'absolute', right: 5 }} name={familyView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
            </TouchableOpacity>


            {/* The dropdown options */}
            {familyView && (
              <View style={{ paddingHorizontal: 16, marginVertical: SIZES.base }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopColor: 'black', width: '45%' }} onPress={() => setFamilyDetailsView(!familyDetailsView)}>
                    <MaterialIcons name='family-restroom' color={'green'} size={18} />
                    <Text style={{ marginLeft: SIZES.base, width: '100%', color: familyAppFlag === "R" ? COLORS.red : (familyAppFlag === "A" ? COLORS.green : COLORS.gray) }}>Family</Text>
                  </TouchableOpacity>
                  {familyAppFlag &&
                    <Image source={familyAppFlag === "A" ? approveMark : (familyAppFlag === "R" && rejectMark)}
                      style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }} />
                  }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopColor: 'black', width: '45%' }} onPress={() => setNominationView(!nominationView)}>
                    <Icons name='form-select' color={'green'} size={18} />
                    <Text style={{ marginLeft: SIZES.base, width: '100%', color: nominationAppFlag === "R" ? COLORS.red : (nominationAppFlag === "A" ? COLORS.green : COLORS.gray) }}>Nomination</Text>
                  </TouchableOpacity>
                  {nominationAppFlag &&
                    <Image source={nominationAppFlag === "A" ? approveMark : (nominationAppFlag === "R" && rejectMark)}
                      style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }} />
                  }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopColor: 'black', width: '45%' }} onPress={() => setMedicalView(!medicalView)}>
                    <FontAwesome5 name='clinic-medical' color={'green'} size={16} />
                    <Text style={{ marginLeft: SIZES.base, width: '100%', color: medicalAppFlag === "R" ? COLORS.red : (medicalAppFlag === "A" ? COLORS.green : COLORS.gray) }}>Medical</Text>
                  </TouchableOpacity>
                  {medicalAppFlag &&
                    <Image source={medicalAppFlag === "A" ? approveMark : (medicalAppFlag === "R" && rejectMark)}
                      style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }} />
                  }
                </View>
              </View>
            )}
          </View>

          {/* Content of Family dropdown -> Family, Medical and nomination */}
          {familyDetailsView && (
            <BottomUpModal isVisible={familyDetailsView} onClose={() => { setFamilyDetailsView(false); }} >
              <FamilyBottomView members={members} setMembers={setMembers} updateMember={updateMember} setUpdateMember={setUpdateMember} onPress={() => setFamilyDetailsView(false)} fetchFamilyData={fetchFamilyData} />
            </BottomUpModal>
          )}
          {nominationView && (
            <BottomUpModal isVisible={nominationView} onClose={() => { setNominationView(false) }}>
              <NominationBottomView onPress={() => setNominationView(false)} />
            </BottomUpModal>
          )}
          {medicalView && (
            <BottomUpModal isVisible={medicalView} onClose={() => { setMedicalView(false); }}>
              <MedicalBottomView medicalPolicy={medicalPolicy} setMedicalPolicy={setMedicalPolicy} onPress={() => setMedicalView(false)} fetchMedicalData={fetchMedicalData} />
            </BottomUpModal>
          )}


          <View style={{
            borderWidth: 0.5,
            borderRadius: SIZES.base,
            padding: SIZES.base,
            borderColor: COLORS.lightGray,
            marginTop: SIZES.radius
          }}>
            <TouchableOpacity onPress={() => setSkillAndQualifView(!skillAndQualifView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
              <FontAwesome name='graduation-cap' size={16} color={COLORS.orange} />
              <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>Skills & Qualification</Text>
              <FontAwesome style={{ position: 'absolute', right: 5 }} name={skillAndQualifView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />

            </TouchableOpacity>

            {skillAndQualifView && (
              <View style={{ paddingHorizontal: 16, marginVertical: SIZES.base }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', width: '45%' }} onPress={() => setQualificationsView(!qualificationsView)}>
                    <Icons name='book-education-outline' color={'green'} size={18} />
                    <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4, color: qualiAppFlag === "R" ? COLORS.red : (qualiAppFlag === "A" ? COLORS.green : COLORS.gray) }}>Qualifications</Text>
                  </TouchableOpacity>
                  {qualiAppFlag &&
                    <Image source={qualiAppFlag === "A" ? approveMark : (qualiAppFlag === "R" && rejectMark)}
                      style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }} />
                  }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', width: '45%' }} onPress={() => setSkillsView(!skillsView)}>
                    <Icons name='library' color={'green'} size={18} />
                    <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4, color: skillAppFlag === "R" ? COLORS.red : (skillAppFlag === "A" ? COLORS.green : COLORS.gray) }}>Skills</Text>
                  </TouchableOpacity>
                  {skillAppFlag &&
                    <Image source={skillAppFlag === "A" ? approveMark : (skillAppFlag === "R" && rejectMark)}
                      style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }} />
                  }
                </View>
                {/* <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setTrainingView(!trainingView)}>
              <Icons name='human-male-board-poll' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%', ...FONTS.body4 }}>Training</Text>
            </TouchableOpacity> */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', width: '45%' }} onPress={() => setLanguagesView(!languagesView)}>
                    <Ionicons name='language' color={'green'} size={18} />
                    <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4, color: languageAppFlag === "R" ? COLORS.red : (languageAppFlag === "A" ? COLORS.green : COLORS.gray) }}>Languages</Text>
                  </TouchableOpacity>
                  {languageAppFlag &&
                    <Image source={languageAppFlag === "A" ? approveMark : (languageAppFlag === "R" && rejectMark)}
                      style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }} />
                  }
                </View>
              </View>
            )}
          </View>
          {
            qualificationsView && (
              <BottomUpModal isVisible={qualificationsView} onClose={() => { setQualificationsView(false); }} >
                {<QualificationBottomView onPress={() => setQualificationsView(false)} qualification={qualification} fetchQualificationData={fetchQualificationData} />}
              </BottomUpModal>
            )}
          {skillsView && (
            <BottomUpModal isVisible={skillsView} onClose={() => { setSkillsView(false); }} >
              {<SkillsBottomView onPress={() => setSkillsView(false)} skills={skills} fetchSkillsData={fetchSkillsData} />}
            </BottomUpModal>
          )}
          {/* {
          trainingView && (
            <BottomUpModal isVisible={trainingView} onClose={() => { setTrainingView(false); }} visibleHeight={500}>
              {<TrainingBottomView onPress={() => setTrainingView(false)} />}
            </BottomUpModal>
          )
        } */}
          {
            languagesView && (
              <BottomUpModal isVisible={languagesView} onClose={() => { setLanguagesView(false); }} visibleHeight={450}>
                {<LanguageBottomView onPress={() => setLanguagesView(false)} languages={languages} fetchLanguageData={fetchLanguageData} />}
              </BottomUpModal>
            )
          }

          <View style={{
            borderWidth: 0.5,
            borderRadius: SIZES.base,
            padding: SIZES.base,
            borderColor: COLORS.lightGray,
            marginTop: SIZES.radius
          }}>
            <TouchableOpacity onPress={() => setIdentityView(!identityView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
              <Icons name='smart-card-outline' size={20} color={COLORS.orange} />
              <Text style={{ ...FONTS.h4, paddingHorizontal: 5, }}>Identity Proofs</Text>
              <FontAwesome style={{ position: 'absolute', right: 5 }} name={identityView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
            </TouchableOpacity>

            {identityView && (
              <View style={{ paddingHorizontal: 16, marginVertical: SIZES.base }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', width: '45%' }} onPress={() => setIdentifications(!identifications)}>
                    <FontAwesome name='vcard-o' color={COLORS.green} size={18} />
                    <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4, color: identificationApproveFlag === "R" ? COLORS.red : (identificationApproveFlag === "A" ? COLORS.green : COLORS.gray) }}> Identifications </Text>
                  </TouchableOpacity>
                  {identificationApproveFlag &&
                    <Image source={identificationApproveFlag === "A" ? approveMark : (identificationApproveFlag === "R" && rejectMark)}
                      style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }} />
                  }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', width: '45%' }} onPress={() => setEsicView(!esicView)}>
                    <FontAwesome name='id-badge' color={COLORS.green} size={18} />
                    <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4, color: esicAppFlag === "R" ? COLORS.red : (esicAppFlag === "A" ? COLORS.green : COLORS.gray) }}> ESIC</Text>
                  </TouchableOpacity>
                  {esicAppFlag &&
                    <Image source={esicAppFlag === "A" ? approveMark : (esicAppFlag === "R" && rejectMark)}
                      style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }} />
                  }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', width: '45%' }} onPress={() => setUanView(!uanView)}>
                    <Ionicons name='finger-print-sharp' color={COLORS.green} size={18} />
                    <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4, color: uanAppFlag === "R" ? COLORS.red : (uanAppFlag === "A" ? COLORS.green : COLORS.gray) }}> UAN</Text>
                  </TouchableOpacity>
                  {uanAppFlag &&
                    <Image source={uanAppFlag === "A" ? approveMark : (uanAppFlag === "R" && rejectMark)}
                      style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }} />
                  }
                </View>
              </View>
            )}
          </View>

          {
            identifications && (
              <BottomUpModal isVisible={identifications} onClose={() => { setIdentifications(false); }}>
                {<Identifications isVisible={identifications} onPress={() => setIdentifications(false)} />}
              </BottomUpModal>
            )
          }
          {
            esicView && (
              <BottomUpModal isVisible={esicView} onClose={() => { setEsicView(false); }}>
                {<Esic_Bottomview onPress={() => setEsicView(false)} />}
              </BottomUpModal>
            )

          }
          {
            uanView && (
              <BottomUpModal isVisible={uanView} onClose={() => { setUanView(false); }}>
                {<UAN_BottomView onPress={() => setUanView(false)} />}
              </BottomUpModal>
            )
          }

          <View style={{
            borderWidth: 0.5,
            borderRadius: SIZES.base,
            padding: SIZES.base,
            borderColor: COLORS.lightGray,
            marginTop: SIZES.radius
          }}>
            <TouchableOpacity onPress={() => setEmploymentView(!employmentView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
              <FontAwesome name='list-alt' size={20} color={COLORS.orange} />
              <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>Employment History</Text>
              <FontAwesome style={{ position: 'absolute', right: 5 }} name={employmentView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
            </TouchableOpacity>

            {
              employmentView && (

                <View style={{ paddingHorizontal: 16, marginVertical: SIZES.base }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', width: "45%" }} onPress={() => setEmployeHistoryView(!identifications)}>
                      <Icons name='briefcase-clock-outline' color={COLORS.green} size={20} />
                      <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4, color: employmentAppFlag === "R" ? COLORS.red : (employmentAppFlag === "A" ? COLORS.green : COLORS.gray) }}> Employment History </Text>
                    </TouchableOpacity>
                    {employmentAppFlag &&
                      <Image source={employmentAppFlag === "A" ? approveMark : (employmentAppFlag === "R" && rejectMark)}
                        style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }} />
                    }
                  </View>
                </View>
              )}
          </View>
          {
            employHistoryView && (
              <BottomUpModal isVisible={employHistoryView} onClose={() => { setEmployeHistoryView(false); }} >
                {<Emp_HistoryBottomView fetchEmploymentData={fetchEmploymentData} onPress={() => setEmployeHistoryView(false)} employment={employment} setEmployement={setEmployement} />}
              </BottomUpModal>
            )
          }

          <View style={{
            borderWidth: 0.5,
            borderRadius: SIZES.base,
            padding: SIZES.base,
            borderColor: COLORS.lightGray,
            marginTop: SIZES.radius
          }}>
            <TouchableOpacity onPress={() => setEsignView(!esignView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
              <Icons name='account-check' size={20} color={COLORS.orange} />
              <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>Guarantor Details</Text>
              <FontAwesome style={{ position: 'absolute', right: 5 }} name={esignView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
            </TouchableOpacity>
            {
              esignView && (
                <View style={{ paddingHorizontal: 16, marginVesaveGrantorInfortical: SIZES.base }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', width: '45%' }} onPress={() => setGuarantorView(!guarantorView)}>
                      <Icons name='account-check' color={COLORS.green} size={18} />
                      <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4, color: guarantorAppFlag === "R" ? COLORS.red : (guarantorAppFlag === "A" ? COLORS.green : COLORS.gray) }}> Guarantor </Text>
                    </TouchableOpacity>
                    {guarantorAppFlag &&
                      <Image source={guarantorAppFlag === "A" ? approveMark : (guarantorAppFlag === "R" && rejectMark)}
                        style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }} />
                    }
                  </View>
                </View>
              )}
          </View>
          {
            guarantorView && (
              <BottomUpModal isVisible={guarantorView} onClose={() => { setGuarantorView(false); }}>
                {<GuarantorBottomView onPress={() => setGuarantorView(false)} />}
              </BottomUpModal>
            )
          }

        </View>
      </ScrollView >
    </View>
  )
}

const styles = StyleSheet.create({
  Elevation: {
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  inputHolder: {
    borderWidth: 1, height: 40, borderColor: 'black', borderRadius: 12
  },
})
export default Candidate_profile