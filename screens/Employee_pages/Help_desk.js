import { View, Text } from 'react-native'
import React from 'react'
import { FONTS, SIZES } from '../../constants/font_size'
import COLORS from '../../constants/theme'

const Help_desk = () => {
  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Text style={{
        ...FONTS.h1,
        fontSize: 32,
        color: COLORS.black
      }}>Oops...</Text>
      <Text style={{
        ...FONTS.h2,
        color: COLORS.orange1,
        marginTop: SIZES.radius
      }}>
        We are working in this screen. It will be live soon</Text>
    </View>
  )
}

export default Help_desk