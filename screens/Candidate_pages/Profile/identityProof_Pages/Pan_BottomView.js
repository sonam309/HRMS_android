import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomInput from '../../../../component/CustomInput';
import TextButton from '../../../../component/TextButton';
import DateButton from '../../../../component/DateButton';


const Pan_BottomView = (props) => {
    const [isPanAvl, setIsPanAvl] = useState(false)

    const [panNumber, setPanNumber] = useState('');
    const [nameInPan, setNameInPan] = useState('');
  
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
            Pan
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
        { isPanAvl ?
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
           Pan details
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
               Pan Number:
             </Text>
             <Text
               style={{
                 ...FONTS.body4,
                 color: COLORS.darkGray2,
               }}>
               Name as of Pan:
             </Text>
            
           </View>
  
           <TouchableOpacity onPress={() => setIsPanAvl(false)}>
             <FontAwesome name="edit" size={24} color={COLORS.green} />
           </TouchableOpacity>
         </View>
       </View>
        :
        <View>
          <CustomInput
            required={true}
            caption={'Pan Number'}
            value={panNumber}
            onChangeText={setPanNumber}
            keyboardType={'numeric'}
          />
  
          <CustomInput
            required={true}
            caption={'Name as per PAN'}
            value={nameInPan}
            onChangeText={setNameInPan}
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

export default Pan_BottomView