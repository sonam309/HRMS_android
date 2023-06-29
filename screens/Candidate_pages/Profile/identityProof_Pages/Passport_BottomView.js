import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomInput from '../../../../component/CustomInput';
import TextButton from '../../../../component/TextButton';
import DateButton from '../../../../component/DateButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Passport_BottomView = () => {
 // const [showForm, setShowForm] = useState(false);

 const [number, setNumber] = useState('');
 const [issueDate, setIssueDate] = useState('');
 const [expiryDate, setExpiryDate] = useState('');
 const [issuePlace, setIssuePlace] = useState('');

 const [ispassportAvl, setIsPassportAvl] = useState(false);

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
         Passport
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

     {ispassportAvl ? (
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
           Passport Number
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
               Date of issue:
             </Text>
             <Text
               style={{
                 ...FONTS.body4,
                 color: COLORS.darkGray2,
               }}>
               Date of expiry:
             </Text>
             <Text
               style={{
                 ...FONTS.body4,
                 color: COLORS.darkGray2,
               }}>
               Place of issue:
             </Text>
           </View>

           <TouchableOpacity onPress={() => setIsPassportAvl(false)}>
             <FontAwesome name="edit" size={24} color={COLORS.green} />
           </TouchableOpacity>
         </View>
       </View>
     ) : (
       <KeyboardAwareScrollView
        bounces={false}
       keyboardDismissMode="on-drag"
       // extraScrollHeight={Platform.OS === "ios" ? 50 : 130}
       contentContainerStyle={{
        flex: 1,
       //  paddingHorizontal: SIZES.padding,
       }}  >
         <CustomInput
           required={true}
           caption={'Number'}
           value={number}
           onChangeText={setNumber}
           keyboardType={"numeric"}
         />

         <DateButton
           required={true}
           caption={'Date of issue'}
           date={issueDate}
           setDate={setIssueDate}
           // isShow={false}
         />

         <DateButton
           required={true}
           caption={'Date of expiry'}
           date={expiryDate}
           setDate={setExpiryDate}
           // isShow={false}
         />

         <CustomInput
           required={true}
           caption={'Place of issue'}
           value={issuePlace}
           onChangeText={setIssuePlace}
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
       </KeyboardAwareScrollView>
     )}
   </View>
 );
};
export default Passport_BottomView