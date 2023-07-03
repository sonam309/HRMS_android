import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../../constants/theme'
import { user_profile } from '../../../assets'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
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



const Candidate_profile = () => {
  const userId = useSelector(state => state.auth.userId)

  // for showing data in listView
  const [members, setMembers] = useState([])
  const [updateMember, setUpdateMember] = useState([])
  const [medicalPolicy, setMedicalPolicy] = useState([])


  // to hide and show Dropdown
  const [aboutMeView, setAboutMeView] = useState(false)
  const [addressView, setAddressView] = useState(false)
  const [familyView, setFamilyView] = useState(false)
  const [skillView, setSkillView] = useState(false)
  const [employmentView, setEmploymentView] = useState(false)
  const [identityView, setIdentityView] = useState(false)

  const [qualificationsView, setQualificationsView] = useState(false);
  const [skillsBottomView, setSkillsBottomView] = useState(false);
  const [trainingView, setTrainingView] = useState(false);
  const [languagesView, setLanguagesView] = useState(false);
  const [passportView, setPassportView] = useState(false);
  const [panView, setPanView] = useState(false);
  const [aadharView, setAadharView] = useState(false);
  const [votersView, setVotersView] = useState(false);
  const [dlView, setDlView] = useState(false);
  const [esicView, setEsicView] = useState(false);
  const [uanView, setUanView] = useState(false);


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

  const[employHistoryView, setEmployeHistoryView]=useState(false);


  // For fetching details of AboutMe dropdown -> Personal, Contact and Bank details
  const fetchPersonalData = async () => {

    let PersonalData = { operFlag: "V", candidateId: userId }

    var formData = new FormData();
    formData.append('data', JSON.stringify(PersonalData))

    let res = await fetch("http://192.168.1.169:7038/api/hrms/savePersonalDetails", {
      method: "POST",
      body: formData
    })
    res = await res.json()
    res = await res?.Result[0]
    console.warn(res);
    setFilledDetails(res);
  }

  // For fetching details of AboutMe dropdown -> Personal, Contact and Bank details
  const fetchAddressData = async () => {

    // let AddressData = { operFlag: "V", candidateId: userId }

    let AddressData = {  operFlag: "V", candidateId: userId, userId: userId }



    let res = await fetch("http://192.168.1.169:7038/api/hrms/saveCandidateAddress", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(AddressData)
    })
    res = await res.json()
    res = await res?.Result[0]
    console.warn(res);
    setFilledDetails(res);
  }

  useEffect(() => {
    aboutMeView && fetchPersonalData()
  }, [aboutMeView])

  useEffect(() => {
    addressView && fetchAddressData()
  }, [addressView])


  return (
    <ScrollView>
      {/* Name and User id of candidate */}
      <View style={[{ backgroundColor: COLORS.white, alignItems: 'center', margin: 10, padding: 5, borderRadius: 6 }, styles.Elevation]}>
        <Image source={user_profile} style={{ height: 80, width: 80, borderRadius: 40 }} />
        <Text style={{ fontWeight: 500 }}>Ashwini</Text>
        <Text style={{ fontWeight: 500 }}>10011</Text>
      </View>

      {/* About Me header and it's dropdown content */}
      <View style={{ backgroundColor: COLORS.white, margin: 10, padding: 5, borderRadius: 6 }}>


        <TouchableOpacity onPress={() => setAboutMeView(!aboutMeView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <Ionicons name='ios-person-circle-sharp' size={20} color={COLORS.orange} />
          <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>About Me</Text>
          <FontAwesome style={{ position: 'absolute', right: 5 }} name={aboutMeView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
        </TouchableOpacity>

        {/* The dropdown options */}
        {aboutMeView && (
          <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setPersonalView(!personalView)}>
              <Icons name='id-card' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%', ...FONTS.body4 }}>Personal Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setContactView(!contactView)}>
              <Icons name='cellphone' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%', ...FONTS.body4 }}>Contact Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setBankView(!bankView)}>
              <Icons name='bank' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%', ...FONTS.body4 }}>Bank Details</Text>

            </TouchableOpacity>
          </View>
        )}

        {/* Content of About Me dropdown -> personal, Contact and Bank details */}
        {personalView && (
          <BottomUpModal isVisible={personalView} onClose={() => { setPersonalView(false); }} visibleHeight={500}>
            <PersonalBottomView filledDetails={filledDetails} />
          </BottomUpModal>
        )}

        {contactView && (
          <BottomUpModal isVisible={contactView} onClose={() => { setContactView(false); }} visibleHeight={400}>
            <ContactBottomView filledDetails={filledDetails} />
          </BottomUpModal>
        )}


        {bankView && (
          <BottomUpModal isVisible={bankView} onClose={() => { setBankView(false); }} visibleHeight={500}>
            <BankBottomView filledDetails={filledDetails} />
          </BottomUpModal>
        )}


        {/* Address header and it's dropdown content */}
        <TouchableOpacity onPress={() => setAddressView(!addressView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <Ionicons name='location-sharp' size={20} color={COLORS.orange} />
          <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>Address</Text>
          <FontAwesome style={{ position: 'absolute', right: 5 }} name={addressView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
        </TouchableOpacity>

        {/* The dropdown options */}
        {addressView && (
          <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setPersonalAddressView(!personalAddressView)}>
              <Icons name='home' color={'green'} size={20} />
              <Text style={{ padding: 4, width: '100%' }}>Present Address</Text>
            </TouchableOpacity>
          </View>
        )}


        {/* Content of Address dropdown -> Permanent, personal and emergency address */}
        {personalAddressView && (
          <BottomUpModal isVisible={personalAddressView} onClose={() => { setPersonalAddressView(false); }} visibleHeight={500}>
            <PersonalAddressBottomView filledDetails={filledDetails}/>
          </BottomUpModal>
        )}

        {/* Family header and it's dropdown content */}
        <TouchableOpacity onPress={() => setFamilyView(!familyView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <Icons name='human-male-female-child' size={20} color={COLORS.orange} />
          <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>Family</Text>
          <FontAwesome style={{ position: 'absolute', right: 5 }} name={familyView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
        </TouchableOpacity>


        {/* The dropdown options */}
        {familyView && (
          <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setFamilyDetailsView(!familyDetailsView)}>
              <Icons name='home-city' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%' }}>Family</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setNominationView(!nominationView)}>
              <Icons name='home' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%' }}>Nomination</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setMedicalView(!medicalView)}>
              <FontAwesome5 name='clinic-medical' color={'green'} size={16} />
              <Text style={{ padding: 4, width: '100%' }}>Medical</Text>
            </TouchableOpacity>
          </View>
        )}


        {/* Content of Family dropdown -> Family, Medical and nomination */}
        {familyDetailsView && (
          <BottomUpModal isVisible={familyDetailsView} onClose={() => { setFamilyDetailsView(false); }} visibleHeight={500}>
            <FamilyBottomView members={members} setMembers={setMembers} updateMember={updateMember} setUpdateMember={setUpdateMember} />
          </BottomUpModal>
        )}
        {nominationView && (
          <BottomUpModal isVisible={nominationView} onClose={() => { setNominationView(false) }} visibleHeight={550}>
            <NominationBottomView />
          </BottomUpModal>
        )}
        {medicalView && (
          <BottomUpModal isVisible={medicalView} onClose={() => { setMedicalView(false); }} visibleHeight={500}>
            <MedicalBottomView medicalPolicy={medicalPolicy} setMedicalPolicy={setMedicalPolicy} />
          </BottomUpModal>
        )}

        <TouchableOpacity onPress={() => setSkillView(!skillView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <FontAwesome name='graduation-cap' size={16} color={COLORS.orange} />
          <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>Skills & Qualification</Text>
          <FontAwesome style={{ position: 'absolute', right: 5 }} name={skillView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />

        </TouchableOpacity>

        {skillView && (
          <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setQualificationsView(!qualificationsView)}>
              <Icons name='book-education-outline' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%', ...FONTS.body4 }}>Qualifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setSkillsBottomView(!skillsBottomView)}>
              <Icons name='library' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%', ...FONTS.body4 }}>Skills</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setTrainingView(!trainingView)}>
              <Icons name='human-male-board-poll' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%', ...FONTS.body4 }}>Training</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setLanguagesView(!languagesView)}>
              <Ionicons name='language' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%', ...FONTS.body4 }}>Languages</Text>
            </TouchableOpacity>
          </View>
        )}
        {
          qualificationsView && (
            <BottomUpModal isVisible={qualificationsView} onClose={() => { setQualificationsView(false); }} visibleHeight={650}>
              {<QualificationBottomView onPress={() => setQualificationsView(false)} />}
            </BottomUpModal>
          )}
        {skillsBottomView && (
          <BottomUpModal isVisible={skillsBottomView} onClose={() => { setSkillsBottomView(false); }} visibleHeight={650}>
            {<SkillsBottomView onPress={() => setSkillsBottomView(false)} />}
          </BottomUpModal>
        )}
        {
          trainingView && (
            <BottomUpModal isVisible={trainingView} onClose={() => { setTrainingView(false); }} visibleHeight={650}>
              {<TrainingBottomView onPress={() => setTrainingView(false)} />}
            </BottomUpModal>
          )
        }
        {
          languagesView && (
            <BottomUpModal isVisible={languagesView} onClose={() => { setLanguagesView(false); }} visibleHeight={500}>
              {<LanguageBottomView onPress={() => setLanguagesView(false)} />}
            </BottomUpModal>
          )
        }

        <TouchableOpacity onPress={() => setIdentityView(!identityView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <Icons name='smart-card-outline' size={20} color={COLORS.orange} />
          <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>Identity Proofs</Text>
          <FontAwesome style={{ position: 'absolute', right: 5 }} name={identityView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
        </TouchableOpacity>

        {identityView && (
          <View style={{ padding: SIZES.radius, paddingLeft: SIZES.padding }}>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setIdentifications(!identifications)}>
              <FontAwesome name='vcard-o' color={COLORS.green} size={18} />
              <Text style={{ padding: 4, width: '100%', ...FONTS.body4 }}> Identifications </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setEsicView(!esicView)}>
              <FontAwesome name='id-badge' color={COLORS.green} size={18} />
              <Text style={{ padding: 4, width: '100%', ...FONTS.body4 }}> ESIC</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setUanView(!uanView)}>
              <Ionicons name='finger-print-sharp' color={COLORS.green} size={18} />
              <Text style={{ padding: 4, width: '100%', ...FONTS.body4 }}> UAN</Text>
            </TouchableOpacity>
          </View>
        )}
        {
          identifications && (
            <BottomUpModal isVisible={identifications} onClose={() => { setIdentifications(false); }} visibleHeight={500}>
              {<Identifications onPress={() => setIdentifications(false)} />}
            </BottomUpModal>
          )
        }
        {
          esicView && (
            <BottomUpModal isVisible={esicView} onClose={() => { setEsicView(false); }} visibleHeight={650}>
              {<Esic_Bottomview onPress={() => setEsicView(false)} />}
            </BottomUpModal>
          )
          
        }
        {
          uanView &&(
            <BottomUpModal isVisible={uanView} onClose={() => { setUanView(false); }} visibleHeight={650}>
              {<UAN_BottomView onPress={() => setUanView(false)} />}
            </BottomUpModal>
          )
        }

        <TouchableOpacity onPress={() => setEmploymentView(!employmentView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <FontAwesome name='list-alt' size={20} color={COLORS.orange} />
          <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>Employment History</Text>
          <FontAwesome style={{ position: 'absolute', right: 5 }} name={employmentView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
        </TouchableOpacity>
        {
          employmentView &&(

            <View style={{ padding: SIZES.radius, paddingLeft: SIZES.padding }}>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setEmployeHistoryView(!identifications)}>
              <FontAwesome name='vcard-o' color={COLORS.green} size={18} />
              <Text style={{ padding: 4, width: '100%', ...FONTS.body4 }}> Employment History </Text>
            </TouchableOpacity>
            </View>
          )}
        {
          employHistoryView &&(
            <BottomUpModal isVisible={employHistoryView} onClose={() => { setEmployeHistoryView(false); }} visibleHeight={650}>
              {<Emp_HistoryBottomView onPress={() => setEmployeHistoryView(false)} />}
            </BottomUpModal>
          )
        }



      </View>
    </ScrollView >
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