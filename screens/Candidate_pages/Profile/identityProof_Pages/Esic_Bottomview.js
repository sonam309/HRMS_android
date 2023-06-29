import {
    View,
    Text,
    TouchableOpacity,
    ActionSheetIOS,
    ScrollView,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {COLORS, FONTS, SIZES} from '../../../../constants';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Entypo from 'react-native-vector-icons/Entypo';
  import CustomInput from '../../../../component/CustomInput';
  import TextButton from '../../../../component/TextButton';

const Esic_Bottomview = () => {
    const [city, setCity] = useState('');
    const [subCode, setSubCode] = useState('');
    const [registationNo, setRegistationNo] = useState('');
    const [csiNo, setCsiNo] = useState('');
    const [residingWithhimher, setResidingWithhimher] = useState(null);
    const [whetherResidingWithHimher, setWhetherResidingWithHimher] =
      useState(null);
  
    const [ifNoStatePlace, setIfNoStatePlace] = useState('');
    const [placeOfResidence, setPlaceOfResidence] = useState('');
    const [prevEmpCodeNo, setPrevEmpCodeNo] = useState('');
    const [prevInsNo, setPrevInsNo] = useState('');
  
    const renderClose = () => {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: SIZES.padding,
          }}>
          <Text
            style={{
              ...FONTS.h2B,
              fontSize: 22,
            }}>
            ESIC
          </Text>
          <TouchableOpacity onPress={onPress}>
            <Entypo name="cross" size={34} color="black" />
          </TouchableOpacity>
        </View>
      );
    };
  
    const showActionSheet = () =>
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            'Cancel',
            'Generate number',
            'Reset',
            'Reset',
            'Reset',
            'Reset',
            'Reset',
            'Reset',
            'Reset',
            'Reset',
            'Reset',
            'Reset',
            'Reset',
            'Reset',
            'Reset',
            'Reset',
            'Reset',
          ],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 0,
          userInterfaceStyle: 'light',
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            // cancel action
          } else {
          }
        },
      );
  
    return (
      <View
        style={{
          flex: 1,
        }}>
        {renderClose()}
        <View
          style={{
            flex: 1,
          }}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
            <CustomInput
              required={true}
              caption={'Enter city'}
              value={city}
              onChangeText={setCity}
              //   keyboardType={'numeric'}
            />
  
            <CustomInput
              required={true}
              caption={'Sub Code'}
              value={city}
              onChangeText={setCity}
              //   keyboardType={'numeric'}
            />
  
            <CustomInput
              required={true}
              caption={'Registration No.'}
              value={city}
              onChangeText={setCity}
              //   keyboardType={'numeric'}
            />
  
            <CustomInput
              required={true}
              caption={'CSI No.'}
              value={city}
              onChangeText={setCity}
              //   keyboardType={'numeric'}
            />
  
            <View style={{}}>
              <Text
                style={{
                  marginVertical: SIZES.base / 2,
                  ...FONTS.h3,
                  fontWeight: '500',
                }}>
                Residing with him or her{' '}
                <Text style={{color: COLORS.red}}>*</Text>
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: SIZES.base,
                }}>
                <TouchableOpacity
                  onPress={() => setResidingWithhimher(true)}
                  style={{
                    width: '45%',
                    height: 45,
                    borderWidth: residingWithhimher ? 2 : 0.5,
                    borderColor: residingWithhimher
                      ? COLORS.green
                      : COLORS.lightGray,
                    padding: SIZES.base,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.radius,
                  }}>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.darkGray2,
                    }}>
                    yes
                  </Text>
                </TouchableOpacity>
  
                <TouchableOpacity
                  onPress={() => setResidingWithhimher(false)}
                  style={{
                    width: '45%',
                    height: 45,
                    borderWidth: !residingWithhimher ? 2 : 0.5,
                    borderColor: !residingWithhimher
                      ? COLORS.green
                      : COLORS.lightGray,
                    padding: SIZES.base,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.radius,
                  }}>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.darkGray2,
                    }}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
  
            <View
              style={{
                marginTop: SIZES.base,
              }}>
              <Text
                style={{
                  marginVertical: SIZES.base / 2,
                  ...FONTS.h3,
                  fontWeight: '500',
                }}>
                Whether residing with him her{' '}
                <Text style={{color: COLORS.red}}>*</Text>
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: SIZES.base,
                }}>
                <TouchableOpacity
                  onPress={() => setWhetherResidingWithHimher(true)}
                  style={{
                    width: '45%',
                    height: 45,
                    borderWidth: whetherResidingWithHimher ? 2 : 0.5,
                    borderColor: whetherResidingWithHimher
                      ? COLORS.green
                      : COLORS.lightGray,
                    padding: SIZES.base,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.radius,
                  }}>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.darkGray2,
                    }}>
                    yes
                  </Text>
                </TouchableOpacity>
  
                <TouchableOpacity
                  onPress={() => setWhetherResidingWithHimher(false)}
                  style={{
                    width: '45%',
                    height: 45,
                    borderWidth: !whetherResidingWithHimher ? 2 : 0.5,
                    borderColor: !whetherResidingWithHimher
                      ? COLORS.green
                      : COLORS.lightGray,
                    padding: SIZES.base,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.radius,
                  }}>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.darkGray2,
                    }}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
  
            <CustomInput
              required={true}
              caption={'If No state place'}
              value={ifNoStatePlace}
              onChangeText={setIfNoStatePlace}
  
              //   keyboardType={'numeric'}
            />
  
            <CustomInput
              required={true}
              caption={'If No state place of residence'}
              value={placeOfResidence}
              onChangeText={setPlaceOfResidence}
  
              //   keyboardType={'numeric'}
            />
  
            <CustomInput
              required={true}
              caption={'Previous employee code no.'}
              value={prevEmpCodeNo}
              onChangeText={setPrevEmpCodeNo}
  
              //   keyboardType={'numeric'}
            />
  
            
  
            <CustomInput
              required={true}
              caption={'Previous insurance no.'}
              value={prevInsNo}
              onChangeText={setPrevInsNo}
  
              //   keyboardType={'numeric'}
            />
            <TextButton
              label="Save"
              // disabled={errors.email || errors.password == null ? false : true}
              buttonContainerStyle={{
                height: 55,
                alignItems: 'center',
                marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
                // backgroundColor: COLORS.orange1,
              }}
              // onPress={handleSubmit}
            />
            <View
              style={{
                marginBottom: 130,
              }}
            />
          </ScrollView>
        </View>
      </View>
    );
  };

export default Esic_Bottomview