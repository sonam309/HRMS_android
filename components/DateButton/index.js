import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {COLORS, FONTS, SIZES} from '../../constants';

const DateButton = ({caption, required, date, setDate, captionStyle}) => {
  const [show, setShow] = useState(false);

  const renderDatePicker = () => {
    return (
      <DatePicker
        modal
        mode={'date'}
        open={show}
        date={new Date()}
        theme={'auto'}
        onConfirm={date => {
          let newDate = date.toDateString().split(' ');
          newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[3];
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
            ...FONTS.h5,
            color: COLORS.green,
            ...captionStyle,
          }}>
          {caption} {required && <Text style={{color: COLORS.red}}>*</Text>}
        </Text>
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={{
            borderColor: COLORS.black,
            borderWidth: 1,
            height: 40,
            padding: SIZES.base,
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
