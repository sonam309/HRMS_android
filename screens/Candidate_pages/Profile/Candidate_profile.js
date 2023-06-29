import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../constants/theme'
import { user_profile } from '../../../assets'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomTextInput from '../../../components/CustomTextInput';
import BottomUpModal from '../../../components/BottomUpModal';
import QualificationBottomView from './qualificationPages/QualificationBottomView';
import { FONTS,SIZES } from '../../../constants/font_size';
import SkillsBottomView from './qualificationPages/SkillsBottomView';
import TrainingBottomView from './qualificationPages/TrainingBottomView';
import LanguageBottomView from './qualificationPages/LanguageBottomView';


const Candidate_profile = () => {
  const [userView, setUserView] = useState(false)
  const [personalView, setPersonalView] = useState(false)
  const [contactView, setContactView] = useState(false)
  const [bankView, setBankView] = useState(false)
  const [addressView, setAddressView] = useState(false)
  const [familyView, setFamilyView] = useState(false)
  const [skillView, setSkillView] = useState(false)
  const [employmentView, setEmploymentView] = useState(false)
  const [identityView, setIdentityView] = useState(false)
  const [userName, setUserName] = useState()
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
  const renderPersonalView = () => {
    return (

      <ScrollView style={{ height: '100%' }}>

        {/* <View style={styles.viewHolder}> */}

        {/* </View> */}
        {/* personal Detals bottom view */}
        <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Salutation</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>First Name</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Middle Name</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Last Name</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Father Name</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Category</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Actual Date of Birth</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Record Date of Birth</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Country of Birth</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Place of Birth</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Identification Marks</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Gender</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Marital Status</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Aadhar Id</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Email Id</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Mobile No.</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Date of Marriage</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Passport Number</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Blood Group</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>UAN Number</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
        </View>

        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Preferred Location</Text>
        <TextInput style={{ borderWidth: 1, marginVertical: 3, marginHorizontal: 7, borderColor: 'black', borderRadius: 12 }} />

        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Current Location</Text>
        <TextInput style={{ borderWidth: 1, marginVertical: 3, marginHorizontal: 7, borderColor: 'black', borderRadius: 12 }} />

        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Resume Source</Text>
        <TextInput style={{ borderWidth: 1, marginVertical: 3, marginHorizontal: 7, borderColor: 'black', borderRadius: 12 }} />

        <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Ref Email ID</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Ref Email ID 1</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
        </View>

        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Reference Address</Text>
        <TextInput style={{ borderWidth: 1, marginVertical: 3, marginHorizontal: 7, borderColor: 'black', borderRadius: 12 }} />


        <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Reference Address 1</Text>
        <TextInput style={{ borderWidth: 1, marginVertical: 3, marginHorizontal: 7, borderColor: 'black', borderRadius: 12 }} />


        <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Reference Contact No.</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Reference Contact No.1</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
        </View>


        <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Reference Name</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Reference Name 1</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
        </View>


        <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
          <View style={{ width: '48%', paddingHorizontal: 3 }}>
            <Text style={{ color: 'green' }}>Reference Occupation</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
          <View style={{ width: '48%', paddingHorizontal: 2 }}>
            <Text style={{ color: 'green' }}>Reference Occupation 1</Text>
            <TextInput style={{ borderWidth: 1, borderColor: 'black', borderRadius: 12 }} />
          </View>
        </View>
        <View style={{ marginBottom: 160 }}></View>

      </ScrollView>

    )
  }




  return (
    <ScrollView>
      <View style={[{ backgroundColor: COLORS.white, alignItems: 'center', margin: 10, padding: 5, borderRadius: 6 }, styles.Elevation]}>
        <Image source={user_profile} style={{ height: 80, width: 80, borderRadius: 40 }} />
        <Text style={{ fontWeight: 500 }}>Ashwini</Text>
        <Text style={{ fontWeight: 500 }}>10011</Text>
      </View>

      <View style={{ backgroundColor: COLORS.white, margin: 10, padding: 5, borderRadius: 6 }}>

        <TouchableOpacity onPress={() => setUserView(!userView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <Ionicons name='ios-person-circle-sharp' size={20} color={COLORS.orange} />
          <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>About Me</Text>
          <FontAwesome style={{ position: 'absolute', right: 5 }} name={userView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />
        </TouchableOpacity>

        {userView && (
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

        {
          personalView && (
            <BottomUpModal
              isVisible={personalView}
              onClose={() => {
                setPersonalView(false);
              }}
              visibleHeight={650}>
              {renderPersonalView()}
            </BottomUpModal>
          )}

        {
          contactView && (
            <BottomUpModal
              isVisible={personalView}
              onClose={() => {
                setPersonalView(false);
              }}
              visibleHeight={550}>
              {renderPersonalView()}
            </BottomUpModal>
          )}

        <TouchableOpacity onPress={() => setAddressView(!addressView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <Ionicons name='location-sharp' size={20} color={COLORS.orange} />
          <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>Address</Text>
          <FontAwesome style={{ position: 'absolute', right: 5 }} name={addressView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />

        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFamilyView(!familyView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <Icons name='human-male-female-child' size={20} color={COLORS.orange} />
          <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>Family</Text>
          <FontAwesome style={{ position: 'absolute', right: 5 }} name={familyView ? 'angle-up' : 'angle-down'} size={20} color={COLORS.orange} />

        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSkillView(!skillView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <FontAwesome name='graduation-cap' size={20} color={COLORS.orange} />
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
            <BottomUpModal
              isVisible={qualificationsView}
              onClose={() => {
                setQualificationsView(false);
              }}
              visibleHeight={650}>
              {<QualificationBottomView onPress={() => setQualificationsView(false)} />}
            </BottomUpModal>
          )}
        {skillsBottomView && (
          <BottomUpModal
            isVisible={skillsBottomView}
            onClose={() => {
              setSkillsBottomView(false);
            }}
            visibleHeight={650}>
            {<SkillsBottomView onPress={() => setSkillsBottomView(false)} />}
          </BottomUpModal>
        )}
        {
          trainingView && (
            <BottomUpModal
              isVisible={trainingView}
              onClose={() => {
                setTrainingView(false);
              }}
              visibleHeight={650}>
              {<TrainingBottomView onPress={() => setTrainingView(false)} />}
            </BottomUpModal>
          )
        }
        {
          languagesView && (
            <BottomUpModal
              isVisible={languagesView}
              onClose={() => {
                setLanguagesView(false);
              }}
              visibleHeight={500}>
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
            <TouchableOpacity style={{ padding: SIZES.base / 2, }} onPress={() => setPassportView(!passportView)}>
              <Text style={{ borderTopWidth: 1, borderTopColor: 'black' }}> Passport </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: SIZES.base / 2, }} onPress={() => setPanView(!panView)}>
              <Text style={{ borderTopWidth: 1, borderTopColor: 'black' }}> Pan</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: SIZES.base / 2, }} onPress={() => setAadharView(!aadharView)}>
              <Text style={{ borderTopWidth: 1, borderTopColor: 'black' }}>Aadhar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: SIZES.base / 2, }} onPress={() => setVotersView(!votersView)}>
              <Text style={{ borderTopWidth: 1, borderTopColor: 'black' }}> Voters</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: SIZES.base / 2, }} onPress={() => setDlView(!dlView)}>
              <Text style={{ borderTopWidth: 1, borderTopColor: 'black' }}> Driving liscence</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: SIZES.base / 2, }} onPress={() => setEsicView(!esicView)}>
              <Text style={{ borderTopWidth: 1, borderTopColor: 'black' }}> ESIC</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ padding: SIZES.base / 2, }} onPress={() => setUanView(!uanView)}>
              <Text style={{ borderTopWidth: 1, borderTopColor: 'black' }}> UAN</Text>
            </TouchableOpacity>

          </View>

        )}

        



        <TouchableOpacity onPress={() => setEmploymentView(!employmentView)} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <FontAwesome name='list-alt' size={20} color={COLORS.orange} />
          <Text style={{ ...FONTS.h4, paddingHorizontal: 5 }}>Employment History</Text>
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
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 3,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
})
export default Candidate_profile