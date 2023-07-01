import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { SIZES,FONTS } from '../constants/font_size'
import COLORS from '../constants/theme'





const CustomInput = ({ required, caption, value, onChangeText, keyboardType }) => {

    return (

        <View

            style={{

                marginVertical: SIZES.base,

            }}>

            <Text

                style={{

                    marginVertical: SIZES.base / 2,

                    ...FONTS.h3,

                    fontWeight: '500',

                }}>

                {caption} {required && <Text style={{ color: COLORS.red }}>*</Text>}

            </Text>

            <TextInput

                placeholder={caption}

                value={value}

                onChangeText={onChangeText}

                style={{

                    borderColor: COLORS.lightGray,

                    borderWidth: 0.5,

                    padding: SIZES.radius * 1.3,

                    borderRadius: SIZES.base,

                }}

                keyboardType={keyboardType}

            />

        </View>

    )

}




export default CustomInput