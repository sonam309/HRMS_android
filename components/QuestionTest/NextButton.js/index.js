import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS } from '../../../constants'

const NextButton = ({ mainWrapStyle, textValue, gradientColor1=COLORS.leafGreen, gradientColor2=COLORS.disableGreen,onClick }) => {




    return (
        <TouchableOpacity style={{
            width: responsiveWidth(30),flexDirection:'row',alignSelf: textValue === "Next" ? 'flex-end' : "flex-start",
            ...mainWrapStyle, marginTop: 30,
        }}onPress={onClick}
        >
            <LinearGradient
                colors={[gradientColor1, gradientColor2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 2, y: 0 }}
                style={{width:responsiveWidth(30),borderRadius:4,}}
                >
                <Text style={{color:COLORS.white,...FONTS.body3,textAlignVertical:'center',textAlign:'center',height:responsiveWidth(10)}}>{textValue}</Text>

            </LinearGradient>
        </TouchableOpacity>
    )
}

export default NextButton