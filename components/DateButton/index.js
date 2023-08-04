import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import COLORS from '../../constants/theme';
import { SIZES,FONTS } from '../../constants/font_size';

const DateButton = ({caption, required, date, setDate}) => {
  const [show, setShow] = useState(false);

  const renderDatePicker = () => {
    return (
      <DatePicker
        modal
        mode={'date'}
        open={show}
        date={new Date()}
        theme={'light'}
        onConfirm={date => {
          let newDate = date.toDateString().split(' ');
          newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3];
          // console.log(newDate)
          setShow(false);
          setDate(newDate);
        }}
        onCancel={() => {
          setShow(false);
        }}
      />
    );
  };

  return (
    <View
      style={{
        marginTop: SIZES.base,
      }}>
      {renderDatePicker()}
      <View>
        <Text
          style={{
            marginVertical: SIZES.base / 2,
            ...FONTS.h3,
            fontWeight: '500',
          }}>
          {caption} {required && <Text style={{color: COLORS.red}}>*</Text>}
        </Text>
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={{
            borderColor: COLORS.lightGray,
            borderWidth: 0.5,
            padding: SIZES.radius * 1.1,
            borderRadius: SIZES.base,
          }}>
          <Text
            style={{
              ...FONTS.body4,
              color: date ? COLORS.darkGray2 : COLORS.lightGray,
            }}>
            {date ? date : caption}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DateButton;