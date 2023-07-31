import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../../constants/theme'
import { user_profile } from '../../../assets'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomUpModal from '../../../components/BottomUpModal';
import QualificationBottomView from './qualificationPages/QualificationBottomView';
import { FONTS, SIZES } from '../../../constants/font_size';
import SkillsBottomView from './qualificationPages/SkillsBottomView';
import TrainingBottomView from './qualificationPages/TrainingBottomView';
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
import axios from 'axios';
import { API } from '../../../utility/services';
import GuarantorBottomView from './Guarantor/GuarantorBottomView';



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
  const [filledDetails, setFilledDetails] = useState();
  const [employHistoryView, setEmployeHistoryView] = useState(false);
  const [filledCandidateInfo, setFilledCandidateInfo] = useState();


  // For fetching details of AboutMe dropdown -> Personal, Contact and Bank details
  const fetchPersonalData = async () => {
    let PersonalData = { operFlag: "V", candidateId: userId }
    var formData = new FormData();
    console.log(PersonalData)
    formData.append('data', JSON.stringify(PersonalData))
    let res = await fetch(`${API}/api/hrms/savePersonalDetails`, {
      method: "POST",
      body: formData
    })
    res = await res.json()
    res = await res?.Result[0]
    console.log("personalData", res);
    setFilledDetails(res);
  }

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
    // console.warn(res);
    setFilledDetails(res);
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
    // console.warn("family data", res);
    setMembers(res);
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
    // console.warn("employment data", res);
    setEmployement(res);
  }

  // fetch candidate info (autofill)

  const fetchCandidateInfo = async () => {
    let candidateInfo = { candiateId: userId, userId: userId, oper: "V" }

    var formData = new FormData();
    formData.append("data", JSON.stringify(candidateInfo))
    let res = await fetch(`${API}/api/addCandidate`, {
      method: "POST",
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json"
      // },
      body: formData
    })
    // axios.post(, formData).then((response) => {

    // const returnData = res.data.Result
    res = await res.json()
    // candInfo = await candInfo?.Result
    console.log("candidate Info", res);
    setFilledCandidateInfo(res);


    // }).catch((error) => {
    // console.log(error)
    // })

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
    // console.warn("employment data", res);
    setSkills(res);
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
    // console.warn("medical data", res);
    setMedicalPolicy(res);
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
    // console.warn("language data", res);
    setLanguages(res);
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
    // console.warn("qualfication Data", res);
    setQualification(res);
  }
  useEffect(() => {
    fetchCandidateInfo();
  }, [])


  useEffect(() => {
    aboutMeView && fetchPersonalData()
  }, [aboutMeView, personalView, contactView, bankView])

  useEffect(() => {
    addressView && fetchAddressData()
  }, [addressView, personalAddressView])

  useEffect(() => {
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
          <Text style={{ fontWeight: 500 }}>{userName}</Text>
          <Text style={{ fontWeight: 500 }}>{userId}</Text>
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
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderTopColor: 'black', }} onPress={() => setPersonalView(!personalView)}>
                  <Icons name='id-card' color={'green'} size={18} />
                  <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4 }}>Personal Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopColor: 'black', }} onPress={() => setContactView(!contactView)}>
                  <Icons name='cellphone' color={'green'} size={18} />
                  <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4 }}>Contact Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderTopColor: 'black', }} onPress={() => setBankView(!bankView)}>
                  <Icons name='bank' color={'green'} size={18} />
                  <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4 }}>Bank Details</Text>

                </TouchableOpacity>

              </View>
            )}
          </View>
          {/* The dropdown options */}

          {/* <Text>{JSON.stringify("harih om",filledCandidateInfo)}</Text> */}
          {/* Content of About Me dropdown -> personal, Contact and Bank details */}
          {personalView && (
            <BottomUpModal isVisible={personalView} onClose={() => { setPersonalView(false); }} >
              <PersonalBottomView candidateInfo={filledCandidateInfo} filledDetails={filledDetails} onPress={() => setPersonalView(false)} />
            </BottomUpModal>
          )}

          {contactView && (
            <BottomUpModal isVisible={contactView} onClose={() => { setContactView(false); }} >
              <ContactBottomView candidateInfo={filledCandidateInfo} filledDetails={filledDetails} onPress={() => setContactView(false)} />
            </BottomUpModal>
          )}


          {bankView && (
            <BottomUpModal isVisible={bankView} onClose={() => { setBankView(false); }}>
              <BankBottomView candidateInfo={filledCandidateInfo} filledDetails={filledDetails} onPress={() => setBankView(false)} />
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
              <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>Address</Text>
              <FontAwesome style={{ position: 'absolute', right: 5 }} name={addressView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
            </TouchableOpacity>

            {/* The dropdown options */}
            {addressView && (
              <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopColor: 'black', }} onPress={() => setPersonalAddressView(!personalAddressView)}>
                  <Icons name='home' color={'green'} size={20} />
                  <Text style={{ marginLeft: SIZES.base, width: '100%' }}>Address</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Content of Address dropdown -> Permanent, personal and emergency address */}
          {personalAddressView && (
            <BottomUpModal isVisible={personalAddressView} onClose={() => { setPersonalAddressView(false); }} >
              <PersonalAddressBottomView filledDetails={filledDetails} onPress={() => setPersonalAddressView(false)} />
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
                <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopColor: 'black', }} onPress={() => setFamilyDetailsView(!familyDetailsView)}>
                  <MaterialIcons name='family-restroom' color={'green'} size={18} />
                  <Text style={{ marginLeft: SIZES.base, width: '100%' }}>Family</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopColor: 'black', }} onPress={() => setNominationView(!nominationView)}>
                  <Icons name='form-select' color={'green'} size={18} />
                  <Text style={{ marginLeft: SIZES.base, width: '100%' }}>Nomination</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopColor: 'black', }} onPress={() => setMedicalView(!medicalView)}>
                  <FontAwesome5 name='clinic-medical' color={'green'} size={16} />
                  <Text style={{ marginLeft: SIZES.base, width: '100%' }}>Medical</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Content of Family dropdown -> Family, Medical and nomination */}
          {familyDetailsView && (
            <BottomUpModal isVisible={familyDetailsView} onClose={() => { setFamilyDetailsView(false); }} >
              <FamilyBottomView members={members} setMembers={setMembers} updateMember={updateMember} setUpdateMember={setUpdateMember} onPress={() => setFamilyDetailsView(false)} />
            </BottomUpModal>
          )}
          {nominationView && (
            <BottomUpModal isVisible={nominationView} onClose={() => { setNominationView(false) }}>
              <NominationBottomView onPress={() => setNominationView(false)} />
            </BottomUpModal>
          )}
          {medicalView && (
            <BottomUpModal isVisible={medicalView} onClose={() => { setMedicalView(false); }}>
              <MedicalBottomView medicalPolicy={medicalPolicy} setMedicalPolicy={setMedicalPolicy} onPress={() => setMedicalView(false)} />
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
                <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', }} onPress={() => setQualificationsView(!qualificationsView)}>
                  <Icons name='book-education-outline' color={'green'} size={18} />
                  <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4 }}>Qualifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', }} onPress={() => setSkillsView(!skillsView)}>
                  <Icons name='library' color={'green'} size={18} />
                  <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4 }}>Skills</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setTrainingView(!trainingView)}>
              <Icons name='human-male-board-poll' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%', ...FONTS.body4 }}>Training</Text>
            </TouchableOpacity> */}
                <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', }} onPress={() => setLanguagesView(!languagesView)}>
                  <Ionicons name='language' color={'green'} size={18} />
                  <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4 }}>Languages</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {
            qualificationsView && (
              <BottomUpModal isVisible={qualificationsView} onClose={() => { setQualificationsView(false); }} >
                {<QualificationBottomView onPress={() => setQualificationsView(false)} qualification={qualification} />}
              </BottomUpModal>
            )}
          {skillsView && (
            <BottomUpModal isVisible={skillsView} onClose={() => { setSkillsView(false); }} >
              {<SkillsBottomView onPress={() => setSkillsView(false)} skills={skills} />}
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
                {<LanguageBottomView onPress={() => setLanguagesView(false)} languages={languages} />}
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
              <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>Identity Proofs</Text>
              <FontAwesome style={{ position: 'absolute', right: 5 }} name={identityView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
            </TouchableOpacity>

            {identityView && (
              <View style={{ paddingHorizontal: 16, marginVertical: SIZES.base }}>
                <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', }} onPress={() => setIdentifications(!identifications)}>
                  <FontAwesome name='vcard-o' color={COLORS.green} size={18} />
                  <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4 }}> Identifications </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', }} onPress={() => setEsicView(!esicView)}>
                  <FontAwesome name='id-badge' color={COLORS.green} size={18} />
                  <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4 }}> ESIC</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', }} onPress={() => setUanView(!uanView)}>
                  <Ionicons name='finger-print-sharp' color={COLORS.green} size={18} />
                  <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4 }}> UAN</Text>
                </TouchableOpacity>
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
                  <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', }} onPress={() => setEmployeHistoryView(!identifications)}>
                    <Icons name='briefcase-clock-outline' color={COLORS.green} size={20} />
                    <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4 }}> Employment History </Text>
                  </TouchableOpacity>
                </View>
              )}
          </View>
          {
            employHistoryView && (
              <BottomUpModal isVisible={employHistoryView} onClose={() => { setEmployeHistoryView(false); }} >
                {<Emp_HistoryBottomView onPress={() => setEmployeHistoryView(false)} employment={employment} setEmployement={setEmployement} />}
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
                <View style={{ paddingHorizontal: 16, marginVertical: SIZES.base }}>
                  <TouchableOpacity style={{ marginVertical: SIZES.base / 2.5, flexDirection: 'row', alignItems: 'center', }} onPress={() => setGuarantorView(!guarantorView)}>
                    <Icons name='account-check' color={COLORS.green} size={18} />
                    <Text style={{ marginLeft: SIZES.base, width: '100%', ...FONTS.body4 }}> Guarantor </Text>
                  </TouchableOpacity>
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