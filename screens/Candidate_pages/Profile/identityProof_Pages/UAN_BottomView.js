import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme';
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';


const UAN_BottomView = (props) => {

  const [openEarlierEps, setOpenEarlierEps] = useState(false);
  const [selectedEarlierEps, setSelectedEarlierEps] = useState();
  // const [EarlierEps, setEarlierEps] = useState([{ lable: 'Yes', value: 'Yes' },
  // { lable: 'No', value: 'No' }]);

  const EarlierEps=["YES","NO"] 
  const InternationalWork=["YES","NO"]
  const MemberEps1952=["YES","NO"]
  const MemberEps1995=["YES","NO"]



  useEffect(() => {
    setOpenEarlierEps(true);

  }, []);


  const saveUANDetails=()=>{

    const body={
      txnId:'',
      candidateId:'',
      uanNo:'',
      uanName:'',
      uEPS1995:'',
      unationalWorker:'',
      uMembrOfEPS1952:'',
      uMembrOfEPS1995:'',
      uPPOno:'',
      uPreviousAcc:'',

    }

    console.log("request", body);
    axios
      .post(`http://192.168.1.169:7038/api/hrms/saveCandidateUanInfo`, body)
      .then(response => {
        const returnedData = response?.data?.Result;
        console.log("result..", returnedData);
        const msg = returnedData[0].MSG
        ToastAndroid.show(msg, 5000);
        {props.onPress}

      })
      .catch(err => {
        console.log(err);
      });

  }



  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginBottom: 150 }} >
        {/* close button */}
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
          <Text style={{ flex: 1, ...FONTS.h3, color: COLORS.orange1 }}>UAN Details</Text>
          <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={props.onPress}>
              <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
            </TouchableOpacity>
          </View>
        </View>
        {/* esic number */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>ESIC Number</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Number'
          />
        </View>

        {/* esic name */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Name</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name' />
        </View>

        {/* Earlier a member of EPS 1995 */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Earlier a member of EPS 1995</Text>
          <SelectDropdown data={EarlierEps} buttonStyle={[styles.inputHolder]} onSelect={(selectedItem) => {console.log(selectedItem, index);}} defaultButtonText={"Select"} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* International Worker*/}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>International Worker</Text>
          <SelectDropdown data={InternationalWork} buttonStyle={[styles.inputHolder]} onSelect={(selectedItem) => {console.log(selectedItem, index);}} defaultButtonText={"Select"} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* member of EPS 1952 */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Member of Eps 1952</Text>
          <SelectDropdown data={MemberEps1952} buttonStyle={[styles.inputHolder]} onSelect={(selectedItem) => {console.log(selectedItem, index);}} defaultButtonText={"Select"} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>
        {/* member of EPS 1995 */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Member of EPS 1995</Text>
          <SelectDropdown data={MemberEps1995} buttonStyle={[styles.inputHolder]} onSelect={(selectedItem) => {console.log(selectedItem, index);}} defaultButtonText={"Select"} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
        </View>

        {/* PPO no if Issued */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>PPO no if Issued</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name' />
        </View>

        {/* Previous Account number */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Previous Account number</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name' />
        </View>
        {/* Previous UAN */}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Previous UAN</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name' />
        </View>

        {/* Scheme Certificate No.*/}
        <View style={{ height: 75, marginTop: 10 }}>
          <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Scheme Certificate No.</Text>
          <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name' />
        </View>
        {/* save button */}
        <TouchableOpacity onPress={() => Alert.alert("Data Save Successfully")}>

          <LinearGradient
            colors={[COLORS.orange1, COLORS.disableOrange1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 2, y: 0 }}

            style={{ borderRadius: 8, padding: 8, marginTop: 20 }}

          >
            <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }} onPress={() => Alert.alert("Data Save Successfull")}>
              Save
            </Text>
          </LinearGradient>

        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({

  inputHolder: {
    borderWidth: 1,
    borderColor: COLORS.black,
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 0,
    marginVertical: 5,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
})

export default UAN_BottomView