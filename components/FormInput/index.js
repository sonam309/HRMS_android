import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../constants';

const FormInput = ({
  containerStyle,
  inputContainerStyle,
  label,
  labelColor = COLORS.black,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = 'default',
  autoCompleteType = 'off',
  autoCapitalize = 'none',
  errorMsg = '',
  onBlur,
  value,
  maxLengthinput,
  multiline = false,
  required = true,
}) => {
  const [didFocus, setDidFocus] = useState(false);

  const handleFocus = () => setDidFocus(true);
  const showFeedback = !!didFocus;

  return (
    <View style={{marginTop: SIZES.radius, ...containerStyle}}>
      {/* Label & error msg */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
        <Text style={{color: labelColor, ...FONTS.h4}}>
          {label}
          {required && <Text style={styles.required}>{'*'}</Text>}
        </Text>
        {showFeedback && (
          <Text style={{color: COLORS.red, ...FONTS.body4}}>{errorMsg}</Text>
        )}
      </View>

      {/* Text Input */}
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.padding / 3.5,
          borderRadius: SIZES.base,
          backgroundColor: COLORS.white,
          ...inputContainerStyle,
          flex: multiline ? 1 : null,
          alignItems: multiline ? 'center' : null,
          justifyContent: multiline ? 'center' : null,
          borderColor: COLORS.lightGray,
          borderWidth: 0.5,
        }}>
        {prependComponent}
        <TextInput
          style={{
            flex: 1,
            ...inputStyle,
          }}
          maxLength={maxLengthinput}
          value={value}
          textAlignVertical={'center'}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          onChangeText={text => onChange(text)}
          onBlur={onBlur}
          onFocus={handleFocus}
        />

        {appendComponent}
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  required: {
    color: COLORS.red,
    paddingLeft: SIZES.base,
  },
});
