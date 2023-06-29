import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomInput from '../../../../component/CustomInput';
import TextButton from '../../../../component/TextButton';
import DateButton from '../../../../component/DateButton';

const Voter_BottomView = () => {
    const [isVoterAvl, setIsVoterAvl] = useState(false)

    const [number, setNumber] = useState('');
    const [issueDate, setIssueDate] = useState('');
  
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
            Voters
          </Text>
          <TouchableOpacity onPress={onPress}>
            <Entypo name="cross" size={34} color="black" />
          </TouchableOpacity>
        </View>
      );
    };
  
    return (
      <View
        style={{
          flex: 1,
        }}>
        {renderClose()}
  { isVoterAvl ?
      <View
            style={{
              backgroundColor: COLORS.disableOrange1,
              padding: SIZES.base,
              borderRadius: SIZES.radius,
            }}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.orange1,
              }}>
              Voters detail
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  marginTop: SIZES.radius,
                  padding: SIZES.base,
                }}>
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.darkGray2,
                  }}>
                  Passport Number:
                </Text>
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.darkGray2,
                  }}>
                  Date of issue:
                </Text>
               
              </View>
  
              <TouchableOpacity onPress={() => setIsVoterAvl(false)}>
                <FontAwesome name="edit" size={24} color={COLORS.green} />
              </TouchableOpacity>
            </View>
          </View>
  :
        <View>
          <CustomInput
            required={true}
            caption={'Passport Number'}
            value={number}
            onChangeText={setNumber}
            keyboardType={'numeric'}
          />
  
          <DateButton
            required={true}
            caption={'Date of issue'}
            date={issueDate}
            setDate={setIssueDate}
            // isShow={false}
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
        </View>}
      </View>
    );
  };
  

export default Voter_BottomView