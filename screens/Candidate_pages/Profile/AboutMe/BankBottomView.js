import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DocumentPicker from 'react-native-document-picker'
import COLORS from '../../../../constants/theme'

const BankBottomView = () => {
  const [accountHolder, setAccountHolder] = useState()
  const [operation, setOperation] = useState()
  const [IFSCCode, setIFSCCode] = useState()
  const [accountNo, setAccountNo] = useState()
  const [cAccountNo, setCAccountNo] = useState()
  const [checkAccountError, setCheckAccountError] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState([]);
  const [branchHeight, setBranchHeight] = useState(40);

  const selectDoc = async () => {

    try {
      const doc = await DocumentPicker.pick({
        allowMultiSelection: false,
        type: [DocumentPicker.types.doc, DocumentPicker.types.pdf, DocumentPicker.types.docx]
      });
      // console.warn(doc);
      setSelectedDoc({
        name: doc[0].name,
        type: doc[0].type,
        uri: doc[0].uri,

      });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        ToastAndroid.show("Please select a file to upload", 3000)
      }
      else ToastAndroid.show(error)
    }
  };

  return (
    <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>

      <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Bank Name</Text>
      <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />


      <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Branch Name</Text>
      <TextInput style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7, height:branchHeight }]}  multiline={true} onContentSizeChange={event => { setBranchHeight(event.nativeEvent.contentSize.height) }} />

      <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Account No.</Text>
      <TextInput value={accountNo} onChangeText={(val) => setAccountNo(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} keyboardType='numeric' />

      <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Confirm Account No.</Text>
      <TextInput value={cAccountNo} onChangeText={(val) => (setCAccountNo(val), setCheckAccountError(true))} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} keyboardType='numeric' />
      {checkAccountError && cAccountNo != accountNo && <Text style={{ color: 'red', paddingHorizontal: 10, fontSize: 12 }}>Account No. Fields don't match</Text>}

      <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Account holderName</Text>
      <TextInput value={accountHolder} onChangeText={(val) => setAccountHolder(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

      <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>Operation</Text>
      <TextInput value={operation} onChangeText={(val) => setOperation(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

      <Text style={{ color: 'green', paddingHorizontal: 6, paddingVertical: 3 }}>IFSC Code</Text>
      <TextInput value={IFSCCode} onChangeText={(val) => setIFSCCode(val)} style={[styles.inputHolder, { marginVertical: 3, marginHorizontal: 7 }]} />

      <TouchableOpacity onPress={() => selectDoc()} style={[styles.inputHolder, { paddingHorizontal: 6, margin: 7, height: 100, justifyContent: 'center', borderColor: COLORS.skyBlue, backgroundColor: 'white' }]}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name={Object.keys(selectedDoc).length > 0 ? 'file' : 'cloud-upload-outline'} color={Object.keys(selectedDoc).length > 0 ? COLORS.orange : COLORS.green} size={40} style={{ padding: 2 }} />
        </View>
        <Text style={{ color: COLORS.black, fontWeight: '500' }}> {Object.keys(selectedDoc).length > 0 ? selectedDoc.name : 'Upload Bank Documents'} </Text>
      </TouchableOpacity>


      <View style={{ marginBottom: 320 }}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputHolder: {
    borderWidth: 1, height: 40, borderColor: 'black', borderRadius: 12
  },
})

export default BankBottomView