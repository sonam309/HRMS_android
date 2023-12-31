import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DocumentPicker from 'react-native-document-picker'
import COLORS from '../../../../constants/theme'
import { useSelector } from 'react-redux'
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS, SIZES } from '../../../../constants/font_size'
import { API } from '../../../../utility/services'
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient'
import WebView from 'react-native-webview';
import TextDropdown from '../../../../components/TextDropdown'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import Pdf from 'react-native-pdf'
import { showAlert, closeAlert } from "react-native-customisable-alert";
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'


const BankBottomView = ({ onPress }) => {
  const userId = useSelector(state => state.candidateAuth.candidateId)

  const [filledDetails, setFilledDetails] = useState();

  const [showDoc, setShowDoc] = useState('');

  // bank details for user
  const [accountHolder, setAccountHolder] = useState('')
  const [accountNo, setAccountNo] = useState('')
  const [cAccountNo, setCAccountNo] = useState('')
  const [checkAccountError, setCheckAccountError] = useState(false)
  const [branchHeight, setBranchHeight] = useState(40);
  const [branchName, setBranchName] = useState('')
  const [selectedDoc, setSelectedDoc] = useState([]);
  const [IFSCCode, setIFSCCode] = useState('')

  const [bank, setBank] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedBankValue, setSelectedBankValue] = useState();

  const [accountType, setAccountType] = useState([]);
  const [selectedAccountType, setSelectedAccountType] = useState(null);
  const [selectedAccountTypeValue, setSelectedAccountTypeValue] = useState();

  const [operation, setOperation] = useState();
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [selectedOperationValue, setSelectedOperationValue] = useState();
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [approvalFlag, setApprovalFlag] = useState('');
  const [bankAppRemarks, setBankAppRemarks] = useState('');
  const [banKValidateUserName, setBanKValidateUserName] = useState('')
  const [statusCode, setStatusCode] = useState('');


  // for displaying bank documents
  const [displayDocs, setDisplayDocs] = useState(false)
  const [operFlag, setOperFlag] = useState("B");

  const getDropdownData = async (P) => {
    let response = await fetch(`${API}/api/User/getParam?getClaim=${P}`)
    response = await response.json();
    const returnedData = response;

    if (P === 36) { setBank(returnedData) }
    else if (P === 27) { setAccountType(returnedData) }
    else { setOperation(returnedData) }

  }


  const DisplayPreviousDetails = () => {
    // console.log("BankDetailsfilled", filledDetails);
    filledDetails && (
      // (filledDetails.ACCOUNT_NO ? setOperFlag("G") : setOperFlag("B")),
      setAccountHolder(filledDetails?.ACCOUNT_HOLDER_NAME),
      setAccountNo(filledDetails?.ACCOUNT_NO),
      setCAccountNo(filledDetails?.ACCOUNT_NO),
      setBranchName(filledDetails?.BRANCH_NAME),
      setIFSCCode(filledDetails?.IFSC_CODE),
      setSelectedBank(filledDetails?.BANK_NAME),
      setSelectedAccountType(filledDetails?.ACCOUNT_TYPE),
      setSelectedOperation(filledDetails?.OPERATION_TYPE),
      setSelectedBankValue(filledDetails?.BANK_NAME_ID),
      setSelectedAccountTypeValue(filledDetails?.ACCOUNT_TYPE_ID),
      setSelectedOperationValue(filledDetails?.OPERATION_ID))

    if (filledDetails?.FILE_ATTACHMENT !== null) {
      filledDetails?.FILE_ATTACHMENT?.split(',').map(file => {
        setSelectedDoc(prevState => [...prevState, { name: file }]);
      });
    }

  }

  useEffect(() => {
    fetchPersonalData();
    getDropdownData(36);
    getDropdownData(27);
    getDropdownData(37);

  }, [])

  useEffect(() => {
    DisplayPreviousDetails();
  }, [filledDetails]);

  const ValidateForm = () => {

    if (
      accountHolder === '' ||
      IFSCCode === '' ||
      accountNo === '' ||
      branchName === '' ||
      selectedOperationValue === '' ||
      selectedBankValue === '' ||
      selectedAccountTypeValue === '' ||
      selectedDoc.length < 1
    ) { return false }
    else return true

  }

  const filingHandleName = () => {
    let name = '';

    for (let index = 0; index < Object.keys(selectedDoc).length; index++) {
      if (index !== 0) name += ","
      const element = selectedDoc[index];
      // console.warn(element);
      name += element.name;
    }

    return name
  }
  // For fetching details of AboutMe dropdown -> Personal, Contact and Bank details
  const fetchPersonalData = async () => {
    try {
      setLoaderVisible(true);
      let PersonalData = { operFlag: 'V', candidateId: userId };
      var formData = new FormData();
      // console.log(PersonalData);
      formData.append('data', JSON.stringify(PersonalData));
      let res = await fetch(`${API}/api/hrms/savePersonalDetails`,
        {
          method: 'POST',
          body: formData,
        },
      );
      res = await res.json();
      res = await res?.Result[0];
      // console.log('BankDetails', res);
      setLoaderVisible(false);
      setFilledDetails(res);
      setApprovalFlag(res.BANK_APP_FLAG);
      setBankAppRemarks(res.BANK_APP_RMK);
    } catch (error) {
      setLoaderVisible(false);
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
  };

  const validateBank = () => {
    try {
      setBanKValidateUserName('');
      if (accountNo !== '' && accountNo !== undefined && IFSCCode !== '' && IFSCCode !== undefined) {
        const value = {
          "id_number": accountNo,
          "ifsc": IFSCCode
        }
        const data = {
          raw: JSON.stringify(value)
        }
        setLoaderVisible(true);
        axios.post(`${API}/api/Hrms/BanKValidate`, data).then((response) => {

          console.log("responseBankkkkk", response.data.status_code, response.data.data.full_name);
          setLoaderVisible(false)
          setStatusCode(response.data.status_code);
          setBanKValidateUserName(response.data.data.full_name);
        })
      } else {

        Toast.show({
          type: 'error',
          text1: "Please fill all Mandatory feilds"
        })

      }
    } catch (error) {

      setLoaderVisible(false);
      // console.log("error", error);
      Toast.show({
        type: 'error',
        text1: error
      })

    }

  }

  const saveBankDetails = async operFlag => {
    if (ValidateForm()) {
      try {
        if (banKValidateUserName !== undefined && banKValidateUserName !== '') {
          let fileName = filingHandleName();

          let bankData = {
            txnId: userId,
            operFlag: operFlag,
            candidateId: userId,
            userId: userId,
            accountNo: accountNo,
            operation: selectedOperationValue,
            accountHolderName: accountHolder,
            ifscCode: IFSCCode,
            bankName: selectedBankValue,
            branchName: branchName,
            accountType: selectedAccountTypeValue,
            fileAttachment: fileName,
            bankValidateName: banKValidateUserName,
          };

          setLoaderVisible(true);
          // console.log('bankdetails', bankData);
          var formData = new FormData();
          formData.append('data', JSON.stringify(bankData));
          selectedDoc.map(file => {
            // console.log("file",file)
            if (file.uri) {
              formData.append('fileUpload', file);
            }
          });
          // console.log(formData._parts);
          let res = await fetch(`${API}/api/hrms/savePersonalDetails`, {
            method: 'POST',
            body: formData,
          });

          setLoaderVisible(false);
          // console.log('response', res);
          res = await res.json();
          res = await res?.Result[0]?.MSG;
          Toast.show({
            type: 'success',
            text1: res,
          });
        } else {
          setLoaderVisible(false);
          Toast.show({
            type: 'error',
            text1: 'Please verify Bank Details First'
          })

        }
      } catch (error) {
        setLoaderVisible(false);
        Toast.show({
          type: 'error',
          text1: error,
        });
      }
    } else {
      setLoaderVisible(false);
      Toast.show({
        type: 'error',
        text1: 'Fill all the Marked Fields',
      });
    }
  };

  // for submitting file
  function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
  }

  // for submitting file
  function getFormattedTimestamp() {
    var date = new Date();

    var day = addLeadingZero(date.getDate());
    var month = addLeadingZero(date.getMonth() + 1); // Months are zero-based
    var year = date.getFullYear();
    var hours = addLeadingZero(date.getHours());
    var minutes = addLeadingZero(date.getMinutes());
    var seconds = addLeadingZero(date.getSeconds());

    return day + month + year + hours + minutes + seconds;
  }

  // for submitting file
  const generateRandomString = () => {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset.charAt(randomIndex);
    }

    return randomString;
  };


  const selectDoc = async () => {
    if (selectedDoc.length < 2) {
      try {
        const doc = await DocumentPicker.pick({
          type: [
            DocumentPicker.types.pdf,
            DocumentPicker.types.doc,
            DocumentPicker.types.docx,
            DocumentPicker.types.images,
          ],
        });
        // console.log(doc);

        setSelectedDoc(current => [
          ...current,
          {
            name: `bankDoc_${userId}_${getFormattedTimestamp()}.${doc[0].type.split('/')[1]
              }`,
            type: doc[0].type,
            uri: doc[0].uri,
          },
        ]);
      } catch (error) {
        // console.log(error);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'More than 2 file cannot upload',
      });
    }
  };

  const checkSelectedOperation = (value) => {
    for (let index = 0; index < operation.length; index++) {
      const element = operation[index];
      if (element.PARAM_NAME === value) setSelectedOperationValue(element.PARAM_ID);
    }
  }

  const checkSelectedAccountType = (value) => {
    for (let index = 0; index < accountType.length; index++) {
      const element = accountType[index];
      if (element.PARAM_NAME === value) setSelectedAccountTypeValue(element.PARAM_ID);
    }
  }

  const checkSelectedBank = (value) => {
    for (let index = 0; index < bank.length; index++) {
      const element = bank[index];
      if (element.PARAM_NAME === value) setSelectedBankValue(element.PARAM_ID);
    }
  }

  const DisplayBankDocs = ({ doc, key }) => {
    return (
      <View key={key} style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
        <Text style={{ flex: 1, flexWrap: 'wrap' }}>
          {doc?.name?.slice(0, 27)}
        </Text>
        {/* <TouchableOpacity onPress={() => DeleteDocs(doc)} style={{flex: 0.09}}>
          <Icon name="trash-can" size={16} color={COLORS.orange1} />
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            setShowDoc(doc?.name);
          }}
          style={{ flex: 0.09 }}>
          <Icon name="eye" size={16} color={COLORS.orange1} />
        </TouchableOpacity>
      </View>
    );
  };

  const selectDropDownValue = (id) => {
    if (id === "accountType") {
      return selectedAccountTypeValue ? selectedAccountTypeValue : accountType?.map(a => a.PARAM_ID)[0];
    }
    else if (id === "bankName") {
      return selectedBankValue ? selectedBankValue : bank?.map(a => a.PARAM_ID)[0];
    }
    else return selectedOperationValue ? selectedOperationValue : operation?.map(a => a.PARAM_ID)[0]
  }

  const selectDropDownText = (id) => {
    if (id === "accountType") {
      return selectedAccountType ? selectedAccountType : accountType?.map(a => a.PARAM_NAME)[0];
    }
    else if (id === "bankName") {
      return selectedBank ? selectedBank : bank?.map(a => a.PARAM_NAME)[0];
    }
    else return selectedOperation ? selectedOperation : operation?.map(a => a.PARAM_NAME)[0]
  }

  return (

    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text style={{ ...FONTS.h3, fontSize: 20, color: COLORS.orange }}>Bank Detials</Text>
          {approvalFlag === "R" ? <TouchableOpacity onPress={() => {
            showAlert({
              title: bankAppRemarks,
              customIcon: 'none',
              message: "none",
              alertType: 'error',
              btnLabel: 'ok',
              onPress: () => closeAlert(),
            });
          }
          }>
            <Icon name='alert-circle-outline' size={25} color={COLORS.red} style={{ marginLeft: 10 }} />
          </TouchableOpacity> : ""}
        </View>
        <TouchableOpacity onPress={onPress}>
          <Icon name='close-circle-outline' size={30} color={COLORS.orange} />
        </TouchableOpacity>
      </View>
      {loaderVisible ? (<View style={{ alignItems: 'center', marginTop: '30%', }}>
        <ActivityIndicator color={COLORS.orange1} />
        <Text
          style={{
            ...FONTS.h3,
            fontWeight: '500',
            color: COLORS.orange1,
            marginTop: SIZES.base,
          }}>
          Loading your details
        </Text>
      </View>
      ) : (
        <>
          {showDoc != '' ?
            <View
              style={{
                backgroundColor: '#F9F9F9',
                width: responsiveWidth(95),
                height: responsiveHeight(68),
                alignSelf: 'center',
                borderRadius: SIZES.base,
                borderWidth: 1,
                borderColor: COLORS.lightGray,
                padding: SIZES.base / 2,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: SIZES.base / 2,
                }}>
                <Text
                  style={{
                    ...FONTS.h4,
                  }}>
                  Bank Document
                </Text>
                <TouchableOpacity onPress={() => setShowDoc('')}>
                  <Entypo name="cross" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  // flex: 1,
                  width: '100%',
                  height: responsiveHeight(62),
                  backgroundColor: COLORS.white,
                  alignSelf: 'center',
                  // backgroundColor: 'red',
                }}>
                {showDoc.split(".")[1] == "pdf" ? <Pdf trustAllCerts={false} source={{ uri: `${API}/BankDoc/${showDoc}` }} minScale={0.5} spacing={15} style={{ flex: 1, width: '100%' }} /> : <WebView
                  source={{
                    uri: `${API}/BankDoc/${showDoc}`,
                  }}
                // style={{height: '100%', width: '100%'}}
                />
                }
              </View>
            </View>
            : <KeyboardAwareScrollView
              extraScrollHeight={150}
              behavior={'padding'}

              enableAutomaticScroll={true}
              keyboardShouldPersistTaps={'always'}
              style={{ flex: 1, marginBottom: 170 }}
              contentContainerStyle={{
                paddingBottom: 170
              }}

              showsVerticalScrollIndicator={false}
            >

              <TextDropdown
                caption={'Account Type'}
                data={accountType}
                setData={setSelectedAccountType}
                setIdvalue={setSelectedAccountTypeValue}
                defaultButtonText={selectedAccountType}
                captionStyle={{ color: COLORS.green, ...FONTS.h4 }}
              />
              <TextDropdown
                caption={'Bank Name'}
                data={bank}
                setData={setSelectedBank}
                setIdvalue={setSelectedBankValue}
                defaultButtonText={selectedBank}
                captionStyle={{ color: COLORS.green, ...FONTS.h4 }}
              />

              <Text style={styles.inputHeader}>Branch Name</Text>
              <TextInput style={[styles.inputHolder, { height: branchHeight }]} multiline={true} onContentSizeChange={event => { setBranchHeight(event.nativeEvent.contentSize.height) }} value={branchName} onChangeText={(val) => setBranchName(val)} />
              <Text style={styles.inputHeader}>Account No. <Text style={{ color: COLORS.red, ...FONTS.h4, justifyContent: 'center' }}>*</Text></Text>
              <TextInput value={accountNo} onChangeText={(val) => setAccountNo(val)} style={[styles.inputHolder]} keyboardType='numeric'
                maxLength={20} />
              <Text style={styles.inputHeader}>Confirm Account No.</Text>
              <TextInput value={cAccountNo} onChangeText={(val) => (setCAccountNo(val), setCheckAccountError(true))} style={styles.inputHolder} keyboardType='numeric' maxLength={20} />
              {checkAccountError && cAccountNo != accountNo && <Text style={{ color: 'red', paddingHorizontal: 10, fontSize: 12 }}>Account No. Fields don't match</Text>}
              <Text style={styles.inputHeader}>Account holder Name</Text>
              <TextInput value={accountHolder} onChangeText={(val) => setAccountHolder(val)} style={styles.inputHolder} />

              {/* <TextDropdown
                caption={'Operation'}
                data={operation}
                setData={setSelectedOperation}
                setIdvalue={setSelectedOperationValue}
                defaultButtonText={selectedOperation}
                captionStyle={{ color: COLORS.green, ...FONTS.h4 }}
              /> */}

              <Text style={styles.inputHeader}>IFSC Code <Text style={{ color: COLORS.red, ...FONTS.h4, justifyContent: 'center' }}>*</Text></Text>
              <TextInput autoCapitalize='characters' value={IFSCCode} onChangeText={(val) => setIFSCCode(val)} style={styles.inputHolder} maxLength={20} />

              <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-evenly', width: '100%' }}>
                <Text style={{ textAlign: 'left', color: statusCode == "200" ? COLORS.green : COLORS.red, ...FONTS.h4, width: '50%', verticalAlign: 'middle', marginLeft: 10 }}>
                  {statusCode !== '' ? (statusCode == '200' ? banKValidateUserName : "Invalid Bank Info") : ""}
                </Text>
                <TouchableOpacity style={{ marginBottom: 15, width: '40%', alignSelf: "flex-end", justifyContent: "flex-end", justifyContent: 'center', }} onPress={() => validateBank()}>
                  <LinearGradient
                    colors={[COLORS.orange1, COLORS.disableOrange1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 2, y: 0 }}
                    style={{ borderRadius: 8, padding: 8, marginTop: 20 }} >
                    <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.h4, }}>Validate Bank Info</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>


              <View style={[styles.inputHolder, { paddingHorizontal: 6, margin: 7, height: 40, alignItems: 'center', borderColor: COLORS.skyBlue, backgroundColor: 'white', flexDirection: 'row' }]}>
                <View style={{ backgroundColor: COLORS.orange, borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white' }}>{selectedDoc.length}</Text>
                </View>
                <Text style={{ paddingHorizontal: 5, marginRight: 5 }}>Upload Bank Documents</Text>
                <View style={{ position: 'absolute', right: 10, flexDirection: 'row' }}>
                  <TouchableOpacity style={{ paddingHorizontal: 3 }} onPress={() => selectDoc()}>
                    <Icon name='plus' color={COLORS.orange} size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => setDisplayDocs(!displayDocs)}>
                    <Icon name={displayDocs ? 'chevron-up' : 'chevron-down'} color={COLORS.orange} size={20} />
                  </TouchableOpacity>
                </View>
              </View>
              {displayDocs && <View style={{ margin: 7, paddingHorizontal: 7, paddingVertical: 4, backgroundColor: 'white', borderWidth: 0.5, borderColor: COLORS.orange1, borderRadius: 12 }}>
                <Text style={[FONTS.h4, { color: COLORS.green }]}>Selected Documents</Text>
                {Object.keys(selectedDoc).length > 0 ? (selectedDoc.map((doc, index) => <DisplayBankDocs key={index} doc={doc} />)) : <Text style={[FONTS.h6, { paddingHorizontal: 5 }]}>No Document Selected</Text>}
              </View>}

              {approvalFlag !== "A" ? <TouchableOpacity onPress={() => (filledDetails?.ACCOUNT_NO ? saveBankDetails("G") : saveBankDetails("B"))} >
                <LinearGradient
                  colors={[COLORS.orange1, COLORS.disableOrange1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 2, y: 0 }}
                  style={{ borderRadius: 8, padding: 10, marginTop: 20 }} >
                  <Text style={{ color: COLORS.white, textAlign: 'center', ...FONTS.body3, }}>
                    {filledDetails?.ACCOUNT_NO ? 'Update Bank Details' : 'Save Bank Details'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity> : ""}
              {/* <View style={{ marginBottom: 120 }}></View> */}
            </KeyboardAwareScrollView>
          }
        </>
      )
      }
    </View>

  )
}

const styles = StyleSheet.create({
  inputHeader: {
    color: COLORS.green, ...FONTS.h4, paddingHorizontal: 6, paddingVertical: 3
  },
  inputHolder: {
    borderWidth: 1, height: 40, borderColor: COLORS.black, borderRadius: 8, marginVertical: 3, marginHorizontal: 7
  },
})

export default BankBottomView