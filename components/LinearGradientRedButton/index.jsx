import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import {COLORS} from '../../constants';

const LinearGradientRedButton = ({
  btnTextHere,
  btnStyle,
  btnActiveStatus,
  onPress,
  linearGradientStyle,
  isLoading,
  iconName,
  btnTextStyle,
}) => {
  return (
    <>
      {isLoading ? (
        <TouchableOpacity
          onPress={onPress}
          disabled={btnActiveStatus}
          style={btnStyle}>
          <LinearGradient
            colors={[COLORS.lightGray1, COLORS.lightGray1]}
            style={[styles.linearGradient, linearGradientStyle]}>
            <ActivityIndicator size="large" color={COLORS.orange1} />
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          disabled={btnActiveStatus}
          style={btnStyle}>
          <LinearGradient
            colors={[COLORS.red, COLORS.red]}
            style={[styles.linearGradient, linearGradientStyle]}>
            {/* <AntDesign name={iconName} size={14} color="#fff" /> */}
            <Text style={[styles.buttonText, btnTextStyle]}>{btnTextHere}</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
  );
};

export default LinearGradientRedButton;
