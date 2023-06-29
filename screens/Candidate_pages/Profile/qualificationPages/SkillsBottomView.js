import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const SkillsBottomView = (props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginBottom: 150 }} >
        {/* close header */}
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ flex: 1, ...FONTS.h3, fontSize: 20, color: COLORS.black }}>Skills</Text>
                    <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={props.onPress}>
                            <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
                        </TouchableOpacity>
                    </View>
                </View>
      </View>
    </ScrollView>
  )
}

export default SkillsBottomView