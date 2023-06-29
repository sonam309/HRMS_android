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


  
  const UAN_BottomView = (props) => {
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [earlierAMemberOfEPS1995, setEarlierAMemberOfEPS1995] = useState(null);
    const [international, setInternational] = useState(null);
    
  
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
            UAN
          </Text>
          <TouchableOpacity onPress={onPress}>
            <Entypo name="cross" size={34} color="black" />
          </TouchableOpacity>
        </View>
      );
    };
  
    return (
      <View>
        {renderClose()}
        <View
        // style={{
        //   flex: 1,
        // }}
        >
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            automaticallyAdjustKeyboardInsets={true}>
            <CustomInput
              required={true}
              caption={'Number'}
              value={number}
              onChangeText={setNumber}
              //   keyboardType={'numeric'}
            />
  
            <CustomInput
              required={true}
              caption={'Name'}
              value={name}
              onChangeText={setName}
              //   keyboardType={'numeric'}
            />
  
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
                Earlier a member of EPS 1995{" "}
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
                  onPress={() => setEarlierAMemberOfEPS1995(true)}
                  style={{
                    width: '45%',
                    height: 45,
                    borderWidth: earlierAMemberOfEPS1995 ? 2 : 0.5,
                    borderColor: earlierAMemberOfEPS1995
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
                  onPress={() => setEarlierAMemberOfEPS1995(false)}
                  style={{
                    width: '45%',
                    height: 45,
                    borderWidth: !earlierAMemberOfEPS1995 ? 2 : 0.5,
                    borderColor: !earlierAMemberOfEPS1995
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
                International{" "}
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
                  onPress={() => setInternational(true)}
                  style={{
                    width: '45%',
                    height: 45,
                    borderWidth: international ? 2 : 0.5,
                    borderColor: international
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
                  onPress={() => setInternational(false)}
                  style={{
                    width: '45%',
                    height: 45,
                    borderWidth: !international ? 2 : 0.5,
                    borderColor: !international
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
  
  export default UAN_BottomView