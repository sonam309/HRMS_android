import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DocumentPicker from 'react-native-document-picker'
import COLORS from '../../../../constants/theme'
import { useSelector } from 'react-redux'
import SelectDropdown from 'react-native-select-dropdown'
import { FONTS } from '../../../../constants/font_size'

const BankBottomView = ({ filledDetails, onPress }) => {
  const userId = useSelector(state => state.candidateAuth.candidateId)

  // bank details for user
  const [accountHolder, setAccountHolder] = useState('')
  const [accountNo, setAccountNo] = useState('')
  const [cAccountNo, setCAccountNo] = useState('')
  const [checkAccountError, setCheckAccountError] = useState(false)
  const [branchHeight, setBranchHeight] = useState(40);
  const [branchName, setBranchName] = useState('')
  const [selectedDoc, setSelectedDoc] = useState([]);
  const [IFSCCode, setIFSCCode] = useState('')

  const [bank, setBank] = useState();
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedBankValue, setSelectedBankValue] = useState();

  const [accountType, setAccountType] = useState();
  const [selectedAccountType, setSelectedAccountType] = useState(null);
  const [selectedAccountTypeValue, setSelectedAccountTypeValue] = useState();

  const [operation, setOperation] = useState();
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [selectedOperationValue, setSelectedOperationValue] = useState();

  // for displaying bank documents
  const [displayDocs, setDisplayDocs] = useState(false)
  const [operFlag, setOperFlag] = useState("B");

  const getDropdownData = async (P) => {
    let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
    response = await response.json();
    const returnedData = response;

    if (P === 36) { setBank(returnedData) }
    else if (P === 27) { setAccountType(returnedData) }
    else { setOperation(returnedData) }

  }


  const DisplayPreviousDetails = () => {
    console.warn(filledDetails);
    filledDetails && (
      (filledDetails.ACCOUNT_NO ? setOperFlag("G") : setOperFlag("B")),
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
      setSelectedOperationValue(filledDetails?.OPERATION_ID)
    )
  }

  useEffect(() => {
    getDropdownData(36);
    getDropdownData(27);
    getDropdownData(37);
    DisplayPreviousDetails();
  }, [])

  const ValidateForm = () => {

    if (
      accountHolder === '' ||
      IFSCCode === '' ||
      accountNo === '' ||
      branchName === '' ||
      selectedOperationValue === '' ||
      selectedBankValue === '' ||
      selectedAccountTypeValue === ''
    ) { return false }
    else return true

  }

  const filingHandleName = () => {
    let name = '';

    for (let index = 0; index < Object.keys(selectedDoc).length; index++) {
      if (index !== 0) name += ","
      const element = selectedDoc[index];
      console.warn(element);
      name += element.name;
    }

    return name
  }

  const saveBankDetails = async () => {
    try {
      if (ValidateForm()) {
        let fileName = filingHandleName();

        let bankData = { txnId: userId, operFlag: operFlag, candidateId: userId, userId: userId, accountNo: accountNo, operation: selectedOperationValue, accountHolderName: accountHolder, ifscCode: IFSCCode, bankName: selectedBankValue, branchName: branchName, accountType: selectedAccountTypeValue, fileAttachment: fileName }

        var formData = new FormData();
        formData.append('data', JSON.stringify(bankData))
        formData.append('fileUpload', selectedDoc)
        // console.log(formData._parts)

        let res = await fetch("http://192.168.1.169:7038/api/hrms/savePersonalDetails", {
          method: "POST",
          body: formData
        })
        res = await res.json();
        res = await res?.Result[0]?.MSG
        ToastAndroid.show(res, 3000);

      } else {
        ToastAndroid.show("Fill all the Marked Fields", 5000)
      }


    } catch (error) {
      ToastAndroid.show(error, 3000)
    }
  }

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

  // selecting bank doc from phone
  const selectDoc = async () => {

    try {
      const doc = await DocumentPicker.pick({
        allowMultiSelection: false,
        type: [DocumentPicker.types.doc, DocumentPicker.types.pdf, DocumentPicker.types.docx]
      });
      // console.warn(doc);
      setSelectedDoc(selectedDoc.concat({
        name: "bankDoc" + getFormattedTimestamp() + generateRandomString() + doc[0].name,
        type: doc[0].type,
        uri: doc[0].uri,
      }));

    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        ToastAndroid.show("Please select a file to upload", 3000)
      }
      else ToastAndroid.show(error)
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

  const DisplayBankDocs = ({ doc }) => {
    return (
      <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
        <Text style={{ flex: 1, flexWrap: 'wrap' }}>{doc.name.slice(27)}</Text>
        <TouchableOpacity onPress={() => DeleteDocs(doc)} style={{ flex: 0.09 }}>
          <Icon name='trash-can' size={16} color={COLORS.orange} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 0.09 }}>
          <Icon name='eye' size={16} color={COLORS.orange} />
        </TouchableOpacity>
      </View>
    )
  }

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
    <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>

      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ ...FONTS.h3, fontSize: 20, color: COLORS.orange }}>Bank</Text>
        <TouchableOpacity onPress={onPress}>
          <Icon name='close-circle-outline' size={30} color={COLORS.orange} />
        </TouchableOpacity>
      </View>

      <Text style={styles.inputHeader}>Account Type</Text>
      <SelectDropdown data={accountType?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%' }]} onSelect={(value) => { setSelectedAccountType(value), checkSelectedAccountType(value) }} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} defaultButtonText={selectDropDownText("accountType")} defaultValueByIndex={selectDropDownValue("accountType")} />

      <Text style={styles.inputHeader}>Bank Name</Text>
      <SelectDropdown data={bank?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%' }]} onSelect={(value) => { setSelectedBank(value), checkSelectedBank(value) }} defaultButtonText={selectDropDownText("bankName")} defaultValueByIndex={selectDropDownValue("bankName")} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />

      <Text style={styles.inputHeader}>Branch Name</Text>
      <TextInput style={[styles.inputHolder, { height: branchHeight }]} multiline={true} onContentSizeChange={event => { setBranchHeight(event.nativeEvent.contentSize.height) }} value={branchName} onChangeText={(val) => setBranchName(val)} />

      <Text style={styles.inputHeader}>Account No.</Text>
      <TextInput value={accountNo} onChangeText={(val) => setAccountNo(val)} style={[styles.inputHolder]} keyboardType='numeric' />

      <Text style={styles.inputHeader}>Confirm Account No.</Text>
      <TextInput value={cAccountNo} onChangeText={(val) => (setCAccountNo(val), setCheckAccountError(true))} style={styles.inputHolder} keyboardType='numeric' />
      {checkAccountError && cAccountNo != accountNo && <Text style={{ color: 'red', paddingHorizontal: 10, fontSize: 12 }}>Account No. Fields don't match</Text>}

      <Text style={styles.inputHeader}>Account holderName</Text>
      <TextInput value={accountHolder} onChangeText={(val) => setAccountHolder(val)} style={styles.inputHolder} />


      <Text style={styles.inputHeader}>Operation</Text>
      <SelectDropdown data={operation?.map(a => a.PARAM_NAME)} buttonStyle={[styles.inputHolder, { width: '96%' }]} onSelect={(value) => { setSelectedOperation(value), checkSelectedOperation(value) }} defaultButtonText={selectDropDownText("operation")} defaultValueByIndex={selectDropDownValue("operation")} buttonTextStyle={{ fontSize: 15, color: '#a5abb5' }} />


      <Text style={styles.inputHeader}>IFSC Code</Text>
      <TextInput value={IFSCCode} onChangeText={(val) => setIFSCCode(val)} style={styles.inputHolder} />


      {/* <View style={{ flexDirection: 'row' }}>
          <Icon name={Object.keys(selectedDoc).length > 0 ? 'file' : 'cloud-upload-outline'} color={Object.keys(selectedDoc).length > 0 ? COLORS.orange : COLORS.green} size={40} style={{ padding: 2 }} />
        </View>
        <Text style={{ color: COLORS.black, fontWeight: '500' }}> {Object.keys(selectedDoc).length > 0 ? selectedDoc.name : 'Upload Bank Documents'} </Text> */}

      <View style={[styles.inputHolder, { paddingHorizontal: 6, margin: 7, height: 40, alignItems: 'center', borderColor: COLORS.skyBlue, backgroundColor: 'white', flexDirection: 'row' }]}>

        <View style={{ backgroundColor: COLORS.orange, borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>{Object.keys(selectedDoc).length}</Text>
        </View>

        <Text style={{ paddingHorizontal: 4 }}>Upload Bank Documents</Text>

        <View style={{ position: 'absolute', right: 10, flexDirection: 'row' }}>

          <TouchableOpacity style={{ paddingHorizontal: 3 }} onPress={() => selectDoc()}>
            <Icon name='plus' color={COLORS.orange} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={{ paddingHorizontal: 3 }} onPress={() => setDisplayDocs(!displayDocs)}>
            <Icon name={displayDocs ? 'chevron-up' : 'chevron-down'} color={COLORS.orange} size={20} />
          </TouchableOpacity>

        </View>

      </View>

      {displayDocs && <View style={{ margin: 7, paddingHorizontal: 7, paddingVertical: 4, backgroundColor: 'white', borderWidth: 0.5, borderColor: COLORS.orange1, borderRadius: 12 }}>
        <Text style={[FONTS.h4, { color: COLORS.green }]}>Selected Documents</Text>
        {Object.keys(selectedDoc).length > 0 ? (selectedDoc.map((doc) => <DisplayBankDocs doc={doc} />)) : <Text style={[FONTS.h6, { paddingHorizontal: 5 }]}>No Document Selected</Text>}
      </View>}

      <TouchableOpacity onPress={() => saveBankDetails()} style={{ height: 40, backgroundColor: 'orange', margin: 7, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white' }}>Save Bank Details</Text>
      </TouchableOpacity>

      <View style={{ marginBottom: 320 }}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputHeader: {
    color: 'green', paddingHorizontal: 6, paddingVertical: 3
  },
  inputHolder: {
    borderWidth: 1, height: 40, borderColor: 'black', borderRadius: 12, marginVertical: 3, marginHorizontal: 7
  },
})

export default BankBottomView