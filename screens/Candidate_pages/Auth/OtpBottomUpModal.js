import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {otpValidation} from '../../../redux/aadharValidationSlice';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import Loader from '../../../components/Loader';

const OtpBottomUpModal = ({onPress}) => {
  const et1 = useRef();
  et2 = useRef();
  et3 = useRef();
  et4 = useRef();
  et5 = useRef();
  et6 = useRef();

  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');
  const [f5, setF5] = useState('');
  const [f6, setF6] = useState('');

  const dispatch = useDispatch();

  const {aadharValidationResult, verifyOtpResult, otpLoading} = useSelector(
    state => state.aadharValidation,
  );

  const verifOtp = () => {
    let inputOtp = f1 + f2 + f3 + f4 + f5 + f6;
    if (inputOtp.length === 6) {
      const data = {
        client_id: aadharValidationResult?.data?.client_id,
        otp: inputOtp,
      };

      dispatch(otpValidation(data));
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please enter Valid OTP.',
      });
    }
  };

  useEffect(() => {
    if (verifyOtpResult.success) {
      onPress();
      // Toast.show({
      //   type:'success',
      //   text1:"OTP verify successfully."
      // })
    }
  }, [verifyOtpResult]);

  return (
    <>
      <View>
        {/* header text and close button */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: COLORS.orange1, ...FONTS.h4, fontSize: 20}}>
            OTP Verificataion
          </Text>
          <TouchableOpacity onPress={onPress}>
            <Icon name="close-circle-outline" size={28} color={COLORS.orange} />
          </TouchableOpacity>
        </View>
        {otpLoading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'small'} color={COLORS.orange1} />
            <Text>Verifying OTP please wait...</Text>
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 80,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: COLORS.black,
                textAlign: 'center',
                ...FONTS.body3,
              }}>
              OTP has been send to on Registered Mobile number, Please submit 6 digits OTP.
            </Text>

            {/* otp input boxes */}
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems:'center',
                marginTop: 30,
              }}>
              <TextInput
                textContentType="oneTimeCode"
                ref={et1}
                style={[
                  style.inputView,
                  {
                    borderColor:
                      f1.length >= 1 ? COLORS.green : COLORS.lightOrange,
                  },
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={f1}
                onChangeText={txt => {
                  setF1(txt);
                  if (txt.length >= 1) {
                    et2.current.focus();
                  }
                }}
              />
              <TextInput
                textContentType="oneTimeCode"
                ref={et2}
                style={[
                  style.inputView,
                  {
                    borderColor:
                      f2.length >= 1 ? COLORS.green : COLORS.lightOrange,
                  },
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={f2}
                onChangeText={txt => {
                  setF2(txt);
                  if (txt.length >= 1) {
                    et3.current.focus();
                  } else if (txt.length < 1) {
                    et1.current.focus();
                  }
                }}
              />
              <TextInput
                textContentType="oneTimeCode"
                ref={et3}
                style={[
                  style.inputView,
                  {
                    borderColor:
                      f3.length >= 1 ? COLORS.green : COLORS.lightOrange,
                  },
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={f3}
                onChangeText={txt => {
                  setF3(txt);
                  if (txt.length >= 1) {
                    et4.current.focus();
                  } else if (txt.length < 1) {
                    et2.current.focus();
                  }
                }}
              />
              <TextInput
                textContentType="oneTimeCode"
                ref={et4}
                style={[
                  style.inputView,
                  {
                    borderColor:
                      f4.length >= 1 ? COLORS.green : COLORS.lightOrange,
                  },
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={f4}
                onChangeText={txt => {
                  setF4(txt);
                  if (txt.length >= 1) {
                    et5.current.focus();
                  } else if (txt.length < 1) {
                    et3.current.focus();
                  }
                }}
              />
              <TextInput
                textContentType="oneTimeCode"
                ref={et5}
                style={[
                  style.inputView,
                  {
                    borderColor:
                      f5.length >= 1 ? COLORS.green : COLORS.lightOrange,
                  },
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={f5}
                onChangeText={txt => {
                  setF5(txt);
                  if (txt.length >= 1) {
                    et6.current.focus();
                  } else if (txt.length < 1) {
                    et4.current.focus();
                  }
                }}
              />
              <TextInput
                textContentType="oneTimeCode"
                ref={et6}
                style={[
                  style.inputView,
                  {
                    borderColor:
                      f6.length >= 1 ? COLORS.green : COLORS.lightOrange,
                  },
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={f6}
                onChangeText={txt => {
                  setF6(txt);
                  if (txt.length >= 1) {
                  } else if (txt.length < 1) {
                    et5.current.focus();
                  }
                }}
              />
            </View>

            <TouchableOpacity
              disabled={
                f1 !== '' &&
                f2 !== '' &&
                f3 !== '' &&
                f4 !== '' &&
                f5 !== '' &&
                f6 !== ''
                  ? false
                  : true
              }
              style={{
                backgroundColor:
                  f1 !== '' &&
                  f2 !== '' &&
                  f3 !== '' &&
                  f4 !== '' &&
                  f5 !== '' &&
                  f6 !== ''
                    ? COLORS.green
                    : COLORS.gray,
                width: responsiveWidth(90),
                padding: 10,
                marginTop: 80,
                borderRadius: 8,
              }}
              onPress={() => {
                verifOtp();
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 500,
                }}>
                Verify OTP
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

const style = StyleSheet.create({
  inputView: {
    width: 50,
    height: 50,
    borderWidth: 1,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '500',
    borderRadius: 10,
    marginLeft: 10,
    fontSize: 18,
  },

  resendView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
});

export default OtpBottomUpModal;
