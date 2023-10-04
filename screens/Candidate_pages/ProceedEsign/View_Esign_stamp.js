import { View, Text,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTS, SIZES } from '../../../constants/font_size';
import COLORS from '../../../constants/theme';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const View_Esign_stamp = (props) => {
  return (
    <View>
      {/* Top headerView */}
      <View style={{ width: '100%', flexDirection: 'row', elevation: 6, backgroundColor: COLORS.white, padding: 15 }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} >

          <Icons name="arrow-left" size={28} color={COLORS.black} style={{ alignSelf: 'center', }} verticalAlign={'center'} />

        </TouchableOpacity>
        <Text style={{ ...FONTS.body3, fontSize: 17, color: COLORS.black, verticalAlign: 'middle', marginLeft: 20 }}>View Document</Text>
      </View>
    </View>
  )
}

export default View_Esign_stamp