import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../constants/theme'
import { user_profile } from '../../../assets'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomTextInput from '../../../components/CustomTextInput';
import BottomUpModal from '../../../components/BottomUpModal';
import BankBottomView from './AboutMe/BankBottomView';
import PersonalBottomView from './AboutMe/PersonalBottomView';
import ContactBottomView from './AboutMe/ContactBottomView';
import PermanentAddressBottomView from './Address/PermanentAddressBottomView';
import PersonalAddressBottomView from './Address/PersonalAddressBottomView';
import EmergencyAddressBottomView from './Address/EmergencyAddressBottomView';
import FamilyBottomView from './Family/FamilyBottomView';
import MedicalBottomView from './Family/MedicalBottomView';
import NominationBottomView from './Family/NominationBottomView';

const Candidate_profile = () => {
  // for showing data in listView
  const [members, setMembers] = useState([])
  const [updateMember, setUpdateMember] = useState([])
  const [medicalPolicy, setMedicalPolicy] = useState([])


  // to hide and show Dropdown
  const [aboutMeView, setAboutMeView] = useState(false)
  const [identityView, setIdentityView] = useState(false)
  const [addressView, setAddressView] = useState(false)
  const [familyView, setFamilyView] = useState(false)
  const [skillView, setSkillView] = useState(false)
  const [employmentView, setEmploymentView] = useState(false)

  // to hide and show bottomUp modal
  const [personalView, setPersonalView] = useState(false)
  const [contactView, setContactView] = useState(false)
  const [bankView, setBankView] = useState(false)

  const [permanentAddressView, setPermanentAddressView] = useState(false)
  const [personalAddressView, setPersonalAddressView] = useState(false)
  const [emergencyAddressView, setEmergencyAddressView] = useState(false)

  const [familyDetailsView, setFamilyDetailsView] = useState(false)
  const [nominationView, setNominationView] = useState(false)
  const [medicalView, setMedicalView] = useState(false)

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
          <Ionicons name='ios-person-circle-sharp' size={25} color={COLORS.orange} />
          <Text style={{ fontSize: 18, paddingHorizontal: 5 }}>About Me</Text>
          <FontAwesome style={{ position: 'absolute', right: 5 }} name={aboutMeView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
        </TouchableOpacity>

        {/* The dropdown options */}
        {aboutMeView && (
          <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setPersonalView(!personalView)}>
              <Icons name='id-card' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%' }}>Personal Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setContactView(!contactView)}>
              <Icons name='cellphone' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%' }}>Contact Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setBankView(!bankView)}>
              <Icons name='bank' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%' }}>Bank Details</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Content of About Me dropdown -> personal, Contact and Bank details */}
        {personalView && (
          <BottomUpModal isVisible={personalView} onClose={() => { setPersonalView(false); }} visibleHeight={500}>
            <PersonalBottomView />
          </BottomUpModal>
        )}

        {contactView && (
          <BottomUpModal isVisible={contactView} onClose={() => { setContactView(false); }} visibleHeight={350}>
            <ContactBottomView />
          </BottomUpModal>
        )}


        {bankView && (
          <BottomUpModal isVisible={bankView} onClose={() => { setBankView(false); }} visibleHeight={700}>
            <BankBottomView />
          </BottomUpModal>
        )}


        {/* Address header and it's dropdown content */}
        <TouchableOpacity onPress={() => setAddressView(!addressView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <Ionicons name='location-sharp' size={25} color={COLORS.orange} />
          <Text style={{ fontSize: 18, paddingHorizontal: 5 }}>Address</Text>
          <FontAwesome style={{ position: 'absolute', right: 5 }} name={addressView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
        </TouchableOpacity>

        {/* The dropdown options */}
        {addressView && (
          <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setPermanentAddressView(!permanentAddressView)}>
              <Icons name='home-city' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%' }}>Permanent Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setPersonalAddressView(!personalAddressView)}>
              <Icons name='home' color={'green'} size={18} />
              <Text style={{ padding: 4, width: '100%' }}>Present Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: 'black', }} onPress={() => setEmergencyAddressView(!emergencyAddressView)}>
              <Icons name='home-alert' color={'green'} size={20} />
              <Text style={{ padding: 4, width: '100%' }}>Emergency Address</Text>
            </TouchableOpacity>
          </View>
        )}


        {/* Content of Address dropdown -> Permanent, personal and emergency address */}
        {permanentAddressView && (
          <BottomUpModal isVisible={permanentAddressView} onClose={() => { setPermanentAddressView(false); }} visibleHeight={500}>
            <PermanentAddressBottomView />
          </BottomUpModal>
        )}
        {personalAddressView && (
          <BottomUpModal isVisible={personalAddressView} onClose={() => { setPersonalAddressView(false); }} visibleHeight={550}>
            <PersonalAddressBottomView />
          </BottomUpModal>
        )}
        {emergencyAddressView && (
          <BottomUpModal isVisible={emergencyAddressView} onClose={() => { setEmergencyAddressView(false); }} visibleHeight={600}>
            <EmergencyAddressBottomView />
          </BottomUpModal>
        )}



        {/* Family header and it's dropdown content */}
        <TouchableOpacity onPress={() => setFamilyView(!familyView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <Icons name='human-male-female-child' size={25} color={COLORS.orange} />
          <Text style={{ fontSize: 18, paddingHorizontal: 5 }}>Family</Text>
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
              <Icons name='home-alert' color={'green'} size={20} />
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
          <BottomUpModal isVisible={nominationView} onClose={() => { setNominationView(false); }} visibleHeight={550}>
            <NominationBottomView />
          </BottomUpModal>
        )}
        {medicalView && (
          <BottomUpModal isVisible={medicalView} onClose={() => { setMedicalView(false); }} visibleHeight={500}>
            <MedicalBottomView medicalPolicy={medicalPolicy} setMedicalPolicy={setMedicalPolicy} />
          </BottomUpModal>
        )}

        <TouchableOpacity onPress={() => setSkillView(!skillView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <FontAwesome name='graduation-cap' size={20} color={COLORS.orange} />
          <Text style={{ fontSize: 18, paddingHorizontal: 5 }}>Skills & Qualification</Text>
          <FontAwesome style={{ position: 'absolute', right: 5 }} name={skillView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />

        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIdentityView(!identityView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <Icons name='smart-card-outline' size={25} color={COLORS.orange} />
          <Text style={{ fontSize: 18, paddingHorizontal: 5 }}>Identity Proofs</Text>
          <FontAwesome style={{ position: 'absolute', right: 5 }} name={identityView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />

        </TouchableOpacity>

        <TouchableOpacity onPress={() => setEmploymentView(!employmentView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <FontAwesome name='list-alt' size={25} color={COLORS.orange} />
          <Text style={{ fontSize: 18, paddingHorizontal: 5 }}>Employment History</Text>
          <FontAwesome style={{ position: 'absolute', right: 5 }} name={employmentView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
        </TouchableOpacity>

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