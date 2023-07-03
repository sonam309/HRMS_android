import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const SkillsBottomView = (props) => {

  const Skill = ({ item }) => {
    return (
      <View style={{ backgroundColor: COLORS.disableOrange1, padding: 6, borderRadius: 12, marginVertical: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.FirstName} </Text>
          <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.LastName} - </Text>
          <Text style={{ color: COLORS.orange1, fontWeight: 500 }}>{item.Member}</Text>
          <Icon position='absolute' onPress={() => DeleteMember({ contact: item.Contact })} right={0} name='trash-can-outline' color={COLORS.green} size={20} />
          <Icon position='absolute' onPress={() => UpdateMember(item)} right={20} name='square-edit-outline' color={COLORS.green} size={20} />
        </View>
        <Text style={{ fontWeight: 600 }}>Date of Birth:- <Text style={{ fontWeight: 400 }}>{item.BirthDate}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Contact:- <Text style={{ fontWeight: 400 }}>{item.Contact}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Address:- <Text style={{ fontWeight: 400 }}>{item.Address}</Text></Text>
        <Text style={{ fontWeight: 600 }}>Blood Group:- <Text style={{ fontWeight: 400 }}>{item.BloodGroup}</Text></Text>
      </View>
    )
  }

  const SkillDetails = () => {
    return (
      <View style={{ padding: 4 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 700, color: 'black' }}>Member Details: </Text>
          <TouchableOpacity onPress={() => setFillForm(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>ADD</Text>
            <Icon name='plus' size={16} />
          </TouchableOpacity>
        </View>

        {
          skills.map((item) => <Skill item={item} key={item.Contact} />)
          // console.warn(members)
        }

      </View>
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>

      {/* close header */}
      <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ flex: 1, ...FONTS.h3, fontSize: 20, color: COLORS.black }}>Skills</Text>
        <TouchableOpacity onPress={props.onPress}>
          <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
        </TouchableOpacity>
      </View>
      {SkillDetails}


    </ScrollView>
  )
}

export default SkillsBottomView