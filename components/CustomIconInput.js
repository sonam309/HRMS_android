import {View, Text, TextInput} from 'react-native';
import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, SIZES} from '../constants';

const CustomIconInput = ({
  required,
  caption,
  value,
  placeholder,
  onChangeText,
  keyboardType,
  secureTextEntry,
  icon,
  isPasswordInput,
  returnKeyType = 'default',
  maxlength,
  textInputStyle,
  editable,
}) => {
  return (
    <>
      <View
        style={{
          marginVertical: SIZES.base,
        }}>
        <Text
          style={{
            marginVertical: SIZES.base / 2,
            ...FONTS.h4,
            color: COLORS.black,
            ...textInputStyle,
          }}>
          {caption} {required && <Text style={{color: COLORS.red}}>*</Text>}
        </Text>
        <View
          style={{
            // backgroundColor: "red",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderColor: COLORS.lightGray,
            borderWidth: 0.5,
            borderRadius: SIZES.base,
          }}>
          {icon}
          <TextInput
            placeholder={placeholder}
            returnKeyType={returnKeyType}
            value={value}
            onChangeText={onChangeText}
            style={{
              // padding: SIZES.radius * 1.3,
              height: 45,
              ...textInputStyle,
            }}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            maxLength={maxlength}
            editable={editable}
          />
        </View>
      </View>
    </>
  );
};

export default CustomIconInput;
