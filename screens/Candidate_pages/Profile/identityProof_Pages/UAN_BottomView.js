import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, isValidElement } from 'react'
import COLORS from '../../../../constants/theme';
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS, SIZES } from '../../../../constants/font_size';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import { API, API2 } from '../../../../utility/services';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { showAlert, closeAlert } from "react-native-customisable-alert";
import { responsiveWidth } from 'react-native-responsive-dimensions';
import CustomInput from '../../../../components/CustomInput';


const UAN_BottomView = (props) => {

  const userId = useSelector(state => state.candidateAuth.candidateId)
  const [loaderVisible, setLoaderVisible] = useState(false);

  // const [EarlierEps, setEarlierEps] = useState([{ lable: 'Yes', value: 'Yes' },
  // { lable: 'No', value: 'No' }]);
  const [operFlag, setOperFlag] = useState("U");
  const [uanNumber, setUanNumber] = useState('');
  const [uanName, setUanName] = useState('');
  const [ppoNOifIssues, setPpoNoIfIssued] = useState('');
  const [priviousAccNumber, setPriviousAccNumber] = useState('');
  const [periviousUan, setPriviousUan] = useState('');
  const [certificateNum, setCertificatesNum] = useState('');
  const [selectedEarlierEps, setSelectedEarlierEps] = useState('');
  const [selectdInternationalWork, setSelectedInternationalWork] = useState('');
  const [selectedMemberEps1952, setSelectedMemberEps1952] = useState('');
  const [selecedMemberEps1995, setSelectedMemberEps1995] = useState('');
  const [approvalFlag, setApprovalFlag] = useState('');
  const [approveRemark, setApproveRemarks] = useState('');
  const [error, setError] = useState('');

  const [edit, setEdit] = useState({});

  const EarlierEps = ["YES", "NO"]
  const InternationalWork = ["YES", "NO"]
  const MemberEps1952 = ["YES", "NO"]
  const MemberEps1995 = ["YES", "NO"]

  const [uanValidationMsg, setUanValidationMsg] = useState('');
  const [validateUanUser, setValidateUanUser] = useState('');
  const [uanStausCode, setUanStatusCode] = useState('');
  const [uanData, setUanData] = useState({});


  const [otp, setOtp] = useState("");
  const [otpBox, setOtpBox] = useState(false);

  const [isUanValidated, setIsUanValidated] = useState(false)


  useEffect(() => {
    // getDropdownData(4);
    setTimeout(() => {
      getData()
    }, 1000);
  }, []);

  const isFormValidated = () => {
    if (
      uanNumber === '' ||
      uanName === '' ||
      selectedEarlierEps === '' ||
      selectdInternationalWork === '' ||
      selectedMemberEps1952 === '' ||
      selecedMemberEps1995 === '' ||
      ppoNOifIssues === '' ||
      priviousAccNumber === '' ||
      periviousUan === '' ||
      certificateNum === ''
    ) {
      setError('All field are required!');
      setTimeout(function () {
        setError('');
      }, 2000);

      return false;
    } else {
      setError('');
      return true;
    }
  };

  const getData = () => {
    setLoaderVisible(true)
    axios
      .post(`${API}/api/hrms/saveCandidateUanInfo`, {
        candidateId: userId,
        userId: userId,
        operFlag: 'V',
      })
      .then(response => {
        const returnedData = response?.data?.Result;
        const UANDetails = returnedData[0];
        const msg = returnedData[0].MSG
        setLoaderVisible(false)
        // console.log("getData", UANDetails);

        // Toast.show({
        //   type: 'success',
        //   text1: msg
        // })

        setApprovalFlag(UANDetails?.APPROVAL_FLAG);
        setApproveRemarks(UANDetails?.DOC_REJ_REMARK);

        setUanNumber(UANDetails?.UAN_NUMBER);
        setUanName(UANDetails?.UAN_NAME);
        setSelectedEarlierEps(UANDetails?.EARLIER_MEMBER_EPS_1995);
        setSelectedInternationalWork(UANDetails?.INTERNATIONAL_WORKER);
        setSelectedMemberEps1952(UANDetails?.MEMBER_OF_EPS_1952);
        setSelectedMemberEps1995(UANDetails?.MEMBER_OF_EPS_1995);
        setPpoNoIfIssued(UANDetails?.PPO_NO_IF_ISSUED);
        setPriviousAccNumber(UANDetails?.PREVIOUS_ACCOUNT_NUMBER);
        setPriviousUan(UANDetails?.PREVIOUS_UAN);
        setCertificatesNum(UANDetails?.SCHEME_CERTIFICATE_NO);

        setEdit(returnedData[0]);
        (Object.keys(UANDetails).length > 2 ? setOperFlag("E") : setOperFlag("U"))
        // console.log("editdata", edit);
      })
      .catch(err => {
        setLoaderVisible(false)
        // console.log(err);
      });
  };



  const saveUANDetails = () => {

    if (isFormValidated()) {
      setLoaderVisible(true)
      const body = {
        txnId: '',
        candidateId: userId,
        uanNo: uanNumber,
        uanName: uanName,
        uEPS1995: selectedEarlierEps,
        unationalWorker: selectdInternationalWork,
        uMembrOfEPS1952: selectedMemberEps1952,
        uMembrOfEPS1995: selecedMemberEps1995,
        uPPOno: ppoNOifIssues,
        uPreviousAcc: priviousAccNumber,
        uPreviousUan: periviousUan,
        uSchmeCertificateNo: certificateNum,
        userId: userId,
        operFlag: operFlag,

      }

      // console.log("request", body);
      axios
        .post(`${API}/api/hrms/saveCandidateUanInfo`, body)
        .then(response => {
          const returnedData = response?.data?.Result;
          // console.log("result..", returnedData);
          const msg = returnedData[0].MSG
          setLoaderVisible(false)
          Toast.show({
            type: 'success',
            text1: msg
          })
          props.onPress()

        })
        .catch(err => {
          setLoaderVisible(false)
          // console.log(err);
          Toast.show({
            type: 'error',
            text1: err
          })
        });
    }
  };

  const selectDropDownText = (id) => {
    if (id === "Select") {
      return selectedEarlierEps ? selectedEarlierEps : "Select";
    }
  }

  const getPassbookDetail = () => {
    const body = {
      candidateId: userId,
      uanDetails: "",
      userId: userId,
      operFlag: "A",
      raw: JSON.stringify({
        "client_id": uanData?.client_id
      })
    }
    // const body = JSON.stringify(value)
    axios
      .post(`${API2}/api/Hrms/uanNoPassbook`, body)
      .then(response => {
            setLoaderVisible(false)
        console.log("response", response)
        if (response.data.Result[0].FLAG === "S") {
          setIsUanValidated(true);
          setOtpBox(false);
          Toast.show({
            type: "success",
            text1: "Uan validated and saved succesfully"
          })
          setLoaderVisible(false)
        }

      })
      .catch(error => {
        console.log("sonnnnnnnnnnnnnnnnnnn", error)
        setLoaderVisible(false)
      });
  }

  const validateUan = () => {

    setUanValidationMsg('');
    if (uanNumber !== "" && uanNumber !== undefined) {
      const value = {
        "id_number": uanNumber,
      }
      const data = {
        raw: JSON.stringify(value)
      }
      setLoaderVisible(true)
      axios
        .post(`${API2}/api/Hrms/uanNoOtpSend`, data)
        .then(response => {

          const returnedData = response.data;
          setLoaderVisible(false);
          console.log("resUan", response.data);
          // const msg = returnedData[0].MSG
          // setUanValidationMsg(returnedData.status_code);
          setUanStatusCode(returnedData.status_code)
          // setUanValidationMsg(returnedData.data.full_name);

          if ((returnedData.status_code) == "200") {
            setUanData(response.data.data)
            if (response.data.data.otp_sent) {
              setOtpBox(true)
            }
            Toast.show({
              type: 'success',
              text1: "Uan Validate Successfully",
            });


          } else if ((returnedData.status_code) >= "400") {
            Toast.show({
              type: 'error',
              text1: "Invalidate Uan"
            });
          } else {
            Toast.show({
              type: 'error',
              text1: "Something went wrong, Please try again later..."
            });

          }

        })
        .catch(error => {

          console.log("sonnnnnnnnnnnnnnnnnnn", error)
          setLoaderVisible(false);
          Toast.show({
            type: 'error',
            text1: error
          })
        });

    } else {
      setLoaderVisible(false);
      // console.log("sonnnngffffffffffffffffh");
      Toast.show({
        type: 'error',
        text1: 'Please enter Pan Number'
      })

    }
  }

  const validateOtp = () => {
    setLoaderVisible(true)
    const value = {
      "client_id": uanData?.client_id,
      "otp": otp
    }
    const data = {
      raw: JSON.stringify(value)
    }
    axios
      .post(`${API2}/api/Hrms/uanNoOtpVerfication`, data)
      .then(response => {
        if (response?.data?.data?.otp_validated) {
          getPassbookDetail()
        } else if (!response?.data.status) {
          Toast.show({
            type: "error",
            text1: response?.data?.message
          })
          setLoaderVisible(false)
        } else {
          Toast.show({
            type: "error",
            text1: "Please enter correct otp"
          })
          setLoaderVisible(false)
        }
        console.log("response", response)
        setLoaderVisible(false)

      })
      .catch(error => {
        console.log("sonnnnnnnnnnnnnnnnnnn", error)
               setLoaderVisible(false)
      });
  }

  useEffect(()=>{
   if(isUanValidated){
    setIsUanValidated(false)
   }
  },[uanNumber])

  return (

    <View style={{ flex: 1 }}>

      {/* close button */}
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Text style={{ ...FONTS.h3, color: COLORS.orange }}>UAN Details</Text>
        {approvalFlag === "R" ? <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => {
          showAlert({
            title: approveRemark,
            customIcon: 'none',
            message: "",
            alertType: 'error',
            btnLabel: 'ok',
            onPress: () => closeAlert(),

          });
        }}>
          <Icons name='alert-circle-outline' size={25} color={COLORS.red} />
        </TouchableOpacity> : ""}
        <TouchableOpacity style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'flex-end' }} onPress={props.onPress}>
          <Icons name='close-circle-outline' size={30} color={COLORS.orange} />
        </TouchableOpacity>

      </View>

      {loaderVisible ? <View style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20%"
      }}>
        <ActivityIndicator color={COLORS.orange1} />
        <Text style={{
          ...FONTS.h4,
          color: COLORS.orange1
        }} >Loading you data..</Text>
      </View> :
        <KeyboardAwareScrollView
          extraScrollHeight={270}
          behavior={'padding'}
          enableAutomaticScroll={true}
          keyboardShouldPersistTaps={'always'}
          style={{ flex: 1, marginBottom: 170 }}
          contentContainerStyle={{
            paddingBottom: 170
          }}

          showsVerticalScrollIndicator={false}
        >
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <View>
            <Text>{JSON.stringify(uanData, isUanValidated)}</Text>
            {/* Uan number */}
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <View style={{ height: 75, marginTop: 10 }}>
                <Text style={{ color: COLORS.green, ...FONTS.body4 }}>UAN Number</Text>
                <TextInput style={{ width: responsiveWidth(70), borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Number' onChangeText={setUanNumber} value={uanNumber} keyboardType="number-pad" maxLength={15} />
              </View>

              <TouchableOpacity disabled={isUanValidated} onPress={() => validateUan()} >
                <LinearGradient
                  colors={isUanValidated ? [COLORS.lightGray, COLORS.lightGray] : [COLORS.orange1, COLORS.disableOrange1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 2, y: 0 }}
                  style={{ height: 45, borderRadius: 12, padding: 8, marginTop: 20, width: responsiveWidth(20), alignSelf: "flex-end" }}>
                  <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }}>
                    Validate Uan </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {otpBox &&
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"

              }}>
                <TextInput
                  placeholder='Enter otp'
                  style={{
                    borderColor: "#000",
                    borderWidth: 1,
                    borderRadius: 12,
                    height: 45,
                    width: responsiveWidth(70)
                  }}
                  value={otp}
                  onChangeText={setOtp}
                />
                <TouchableOpacity
                  onPress={() => validateOtp()}
                  style={{
                    width: responsiveWidth(20),
                    alignItems: "center",
                    justifyContent: "center",

                  }}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 2, y: 0 }}
                    colors={[COLORS.orange1, COLORS.disableOrange1]}
                    style={{
                      width: "100%",
                      height: 45,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 12
                    }}
                  >
                    <Text style={{
                      color: "#fff"
                    }}>Submit Otp</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            }

            {/* Uan name */}
            <View style={{ height: 75, marginTop: 10 }}>
              <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Name</Text>
              <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name' onChangeText={setUanName} value={uanName} />
            </View>

            {/* Earlier a member of EPS 1995 */}
            <View style={{ height: 75, marginTop: 10 }}>
              {/* <TextDropdown
                                caption={'Caste'}
                                data={caste}
                                setData={setSelectedCaste}
                                setIdvalue={setSelectedCasteValue}
                                defaultButtonText={selectedCaste}
                                captionStyle={{ color: COLORS.green, ...FONTS.h4 }}
                            /> */}



              <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Earlier a member of EPS 1995</Text>
              <SelectDropdown defaultValue={selectedEarlierEps} data={EarlierEps} buttonStyle={[styles.inputHolder]} onSelect={(selectedItem, index) => { setSelectedEarlierEps(selectedItem) }} defaultButtonText={"Select"} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
            </View>

            {/* International Worker*/}
            {/* <View style={{ height: 75, marginTop: 10 }}>
              <Text style={{ color: COLORS.green, ...FONTS.body4 }}>International Worker</Text>
              <SelectDropdown defaultValue={selectdInternationalWork} data={InternationalWork} buttonStyle={[styles.inputHolder]} onSelect={(selectedItem, index) => { setSelectedInternationalWork(selectedItem) }} defaultButtonText={"Select"} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
            </View> */}

            {/* member of EPS 1952 */}
            {/* <View style={{ height: 75, marginTop: 10 }}>
              <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Member of Eps 1952</Text>
              <SelectDropdown defaultValue={selectedMemberEps1952} data={MemberEps1952} buttonStyle={[styles.inputHolder]} onSelect={(selectedItem, index) => { setSelectedMemberEps1952(selectedItem) }} defaultButtonText={"Select"} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
            </View> */}
            {/* member of EPS 1995 */}
            <View style={{ height: 75, marginTop: 10 }}>
              <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Member of EPS 1995</Text>
              <SelectDropdown defaultValue={selecedMemberEps1995} data={MemberEps1995} buttonStyle={[styles.inputHolder]} onSelect={(selectedItem, index) => { setSelectedMemberEps1995(selectedItem) }} defaultButtonText={"Select"} buttonTextStyle={{ fontSize: 15, color: COLORS.gray }} />
            </View>

            {/* PPO no if Issued */}
            {/* <View style={{ height: 75, marginTop: 10 }}>
              <Text style={{ color: COLORS.green, ...FONTS.body4 }}>PPO No if Issued</Text>
              <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name'onChangeText={setPpoNoIfIssued} value={ppoNOifIssues} keyboardType="number-pad"maxLength={15} />
            </View> */}

            {/* Previous Account number */}
            <View style={{ height: 75, marginTop: 10 }}>
              <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Previous Account number</Text>
              <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name' onChangeText={setPriviousAccNumber} value={priviousAccNumber} keyboardType="number-pad" />
            </View>
            {/* Previous UAN */}
            <View style={{ height: 75, marginTop: 10 }}>
              <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Previous UAN</Text>
              <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name' onChangeText={setPriviousUan} value={periviousUan} keyboardType="number-pad" maxLength={15} />
            </View>


            {/* Scheme Certificate No.*/}
            {/* <View style={{ height: 75, marginTop: 10 }}>
              <Text style={{ color: COLORS.green, ...FONTS.body4 }}>Scheme Certificate No.</Text>
              <TextInput style={{ borderWidth: 1, borderColor: COLORS.black, borderRadius: 10, height: 45, paddingLeft: 5 }} placeholder='Name' onChangeText={setCertificatesNum} value={certificateNum} keyboardType="number-pad" />
            </View> */}
            {/* save button */}
            {approvalFlag !== "A"  &&
              <TouchableOpacity onPress={() => saveUANDetails()} >

                <LinearGradient
                  colors={[COLORS.orange1, COLORS.disableOrange1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 2, y: 0 }}
                  style={{ borderRadius: 8, padding: 8, marginTop: 20 }}>
                  <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }}>
                    {Object.keys(edit).length > 2 ? "Update" : "Save"} </Text>
                </LinearGradient>

              </TouchableOpacity> }

              {isUanValidated &&
              <TouchableOpacity onPress={() => saveUANDetails()} >

                <LinearGradient
                  colors={[COLORS.orange1, COLORS.disableOrange1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 2, y: 0 }}
                  style={{ borderRadius: 8, padding: 8, marginTop: 20 }}>
                  <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }}>
                    {Object.keys(edit).length > 2 ? "Update" : "Save"} </Text>
                </LinearGradient>

              </TouchableOpacity> }

          </View>

          <View style={{ marginBottom: 270 }} />

          {/* </ScrollView> */}
        </KeyboardAwareScrollView>
      }
    </View>
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