import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import LinearGradient from 'react-native-linear-gradient';
  import COLORS from '../constants/theme';
  import { SIZES,FONTS } from '../constants/font_size';
  
  const TextButton = ({
    buttonContainerStyle,
    linearGradientStyle,
    label,
    disabled,
    onPress,
    labelStyle,
    submitting = false,
    color1 = COLORS.orange1,
    color2 = COLORS.disableOrange1,
  }) => {
    return (
      <LinearGradient
        colors={!disabled?[color1, color2]:[COLORS.gray,COLORS.lightGray]}
        start={{x: 0, y: 0}}
        end={{x: 2, y: 0}}
        style={{
          ...linearGradientStyle,
        }}
        >
        <TouchableOpacity
          style={{
            ...buttonContainerStyle,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          disabled={submitting}
          onPress={onPress}>
          {submitting ? (
            <>
              <ActivityIndicator color={labelStyle.color} />
            </>
          ) : (
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h4,
                ...labelStyle,
              }}>
              {label}
            </Text>
          )}
        </TouchableOpacity>
      </LinearGradient>
    );
  };
  
  export default TextButton;
  
  const styles = StyleSheet.create({});