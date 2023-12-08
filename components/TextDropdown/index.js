import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';


const TextDropdown = ({
  caption,
  data,
  setData,
  setIdvalue,
  defaultButtonText,
  captionStyle,
}) => {
  const checkIdValue = value => {
    {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.PARAM_NAME === value) setIdvalue(element.PARAM_ID);
      }
    }
  };

  return (
    <View style={{marginVertical: SIZES.base,}}>
      <Text style={{...FONTS.h3, fontWeight: '500',...captionStyle}}>{caption}</Text>
      <SelectDropdown
        dropdownStyle={{
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
          // height: 400,
          // marginTop:30,
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
        data={data?.map(a => a.PARAM_NAME)}
        buttonStyle={[styles.inputHolder]}
        onSelect={value => {
          setData(value), checkIdValue(value);
        }}
        defaultButtonText={
          defaultButtonText != ''
            ? defaultButtonText
            : data?.map(a => a.PARAM_NAME)[0]
        }
        buttonTextStyle={{...FONTS.body3, color: COLORS.darkGray}}
        rowStyle={{
          backgroundColor: COLORS.white,
          borderBottomWidth: 0.5,
          borderColor: COLORS.lightGray,
          // marginHorizontal: SIZES.padding*4,
        }}
        rowTextStyle={{
          ...FONTS.body3,
          color: COLORS.darkGray2,
        }}
        renderCustomizedRowChild={(item, index) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons
                name="radio-button-off-outline"
                size={24}
                color={COLORS.darkGray}
              />
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.darkGray,
                  marginLeft: SIZES.radius,
                }}>
                {item}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default TextDropdown;

const styles = StyleSheet.create({
  inputHolder: {
    borderWidth: 1,
    borderColor: COLORS.black,
    // flex: 1,
    borderRadius: SIZES.base,
    paddingVertical: SIZES.base,
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.base * 1,
    marginTop: SIZES.base,
    backgroundColor: COLORS.white,
  },
});