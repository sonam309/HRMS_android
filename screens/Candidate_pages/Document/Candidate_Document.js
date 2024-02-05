import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Loader from '../../../components/Loader';
import {API} from '../../../utility/services';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {showAlert, closeAlert} from 'react-native-customisable-alert';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';

const Candidate_Document = props => {
  // Candidate ID & Status
  const {
    candidateId,
    candidateStatusId,
    candidateName,
    candidateRole,
    hiringLeadMail,
  } = useSelector(state => state.candidateAuth);

  // Form data for file
  let formData = new FormData();

  // Document Name
  const [document, setDocument] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);

  // array of files
  const [aadharCard, setAadharCard] = useState([]);
  const [panCard, setPanCard] = useState([]);
  const [salarySlip, setSalarySlip] = useState([]);
  const [otherFiles, setOtherFiles] = useState([...Array(22)]);

  const [operFlag, setOperFlag] = useState('A');
  const [docCount, setDocCount] = useState('');
  const [docVerify, setDocVerify] = useState([]);

  // Document information -> Pending, Uploading, Rejected, Verified
  const [pendingDocumentCount, setPendingDocumentCount] = useState('');
  const [documentCount, setDocumentCount] = useState('');
  const [verifiedDocCount, setVerifiedDocCount] = useState('');
  const [rejectDocCount, setRejectDocCount] = useState('');
  const [experience, setExperience] = useState('');
  const [aadharParamId, setAadharParamId] = useState('');

  useEffect(() => {
    getDocData();
    getDropdownData(22);
  }, []);

  // getting doc info
  const getDocData = async () => {
    try {
      setLoaderVisible(true);
      let PersonalData = {
        operFlag: 'V',
        candidateId: candidateId,
        candidateStatus: candidateStatusId,
        src: 'M',
      };
      let formData = new FormData();
      formData.append('data', JSON.stringify(PersonalData));
      // console.log("docuploaddata", formData, JSON.stringify(PersonalData))
      let res = await fetch(`${API}/api/hrms/assesmentSave`, {
        method: 'POST',
        body: formData,
      });

      res = await res.json();
      console.log('documentdata', res);
      setLoaderVisible(false);
      let pendingCount = res?.Table1[0]?.Pending - res?.Table1[0]?.Uploaded;
      setPendingDocumentCount(pendingCount);
      setDocumentCount(res?.Table1[0]?.Pending);
      setVerifiedDocCount(res?.Table1[0]?.Verified);
      setRejectDocCount(res?.Table1[0]?.Rejected);
      setExperience(res?.PO_EXPERIENCE_TYPE);

      // console.log("pendingCount", pendingCount);

      let docFiles = res?.Table;
      {
        docFiles?.length > 0 && setOperFlag('E');
      }
      setDocCount(res?.PO_DOC_REQ);
      setDocVerify(res?.Table);
      // console.log("docfilesSonam", res?.Table);

      docFiles.map(item => {
        let type = Number(item?.DOC_TYPE),
          newFile = item?.FILE_ATTACHMENT,
          TXNID = item?.TXN_ID;

        // console.log(newFile, "this is newfile", type)

        switch (type) {
          case 129:
            // console.log("bjhdvjhfj",type)
            setAadharCard(prevState => [
              ...prevState,
              {name: newFile, txnId: TXNID},
            ]);
            break;
          case 130:
            setPanCard(prevState => [
              ...prevState,
              {name: newFile, txnId: TXNID},
            ]);
            break;
          case 131:
            setSalarySlip(prevState => [
              ...prevState,
              {name: newFile, txnId: TXNID},
            ]);
            break;
          default:
            setOtherFiles(prevState => [
              ...prevState.slice(0, type - 132),
              {
                name: newFile,
                txnId: TXNID,
              },
              ...prevState.slice(type - 131),
            ]);
            break;
        }
      });
    } catch (error) {
      setLoaderVisible(false);
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
  };

  // Document Data & all files
  const getDropdownData = async P => {
    let response = await fetch(`${API}/api/User/getParam?getClaim=${P}`);
    response = await response.json();
    const returnedData = response;
    // console.log("dwData", returnedData)
    // if (P === 22) {
    setDocument(returnedData);

    // }
  };

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

  function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
  }

  // for selecting Aadhar, Pan and 3 month salary slip
  const selectDoc = async (setFileUpload, type) => {
    try {
      const doc = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.images,
        ],
      });

      if (doc[0].size / (1024 * 1024) > 10) {
        Toast.show({
          type: 'error',
          text1: 'Please upload file less than 10 MB',
        });
        return;
      }

      let compressedUri = doc[0].uri;

      if (doc[0].type.startsWith('image/')) {
        // Resize and compress the image
        const resizedImage = await ImageResizer.createResizedImage(
          doc[0].uri,
          800, // Width
          600, // Height
          'JPEG', // Format
        70, // Quality (0-100)
          90
        );

        compressedUri = resizedImage.uri;
      }

      const fileName =
        type === 'Aadhar Card'
          ? `129_Assesment_${candidateId}_${getFormattedTimestamp()}.${
              doc[0].type.split('/')[1]
            }`
          : `Assesment_${candidateId}_${getFormattedTimestamp()}.${
              doc[0].type.split('/')[1]
            }`;

      // Read the compressed file data
      const compressedData = await RNFS.readFile(compressedUri, 'base64');

      setFileUpload(current => [
        ...current,
        {
          name: fileName,
          type: doc[0].type,
          uri: compressedUri,
          data: compressedData, // Include the base64 data for PDF and DOCX files
          txnId: '',
        },
      ]);
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };

  // for removing 3 files -> aadhar, pan and 3 month salary slip
  const onRemovePress = (index, setFileUpload, fileUpload) => {
    setFileUpload([
      ...fileUpload.slice(0, index),
      ...fileUpload.slice(index + 1),
    ]);
  };

  // for selecting other 22 docs
  const selectOtherFile = async (index, type) => {
    try {
      let allowedTypes = [];

      if (type === 141) {
        allowedTypes = [DocumentPicker.types.images];
      } else {
        allowedTypes = [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.images,
        ];
      }

      const doc = await DocumentPicker.pick({
        type: allowedTypes,
      });

      if (
        doc[0]?.type.startsWith('image/') &&
        doc[0]?.size / (1024 * 1024) > 10
      ) {
        Toast.show({
          type: 'error',
          text1: 'Please upload image less than 10 MB',
        });
        return;
      }

      let compressedUri = doc[0]?.uri;

      if (doc[0]?.type.startsWith('image/')) {
        // Resize and compress the image
        const resizedImage = await ImageResizer.createResizedImage(
          doc[0]?.uri,
          800, // Width
          600, // Height
          'JPEG', // Format
          70, // Quality (0-100)
          90
        );

        compressedUri = resizedImage.uri;
      }

      const fileName = `Assesment_${candidateId}_${getFormattedTimestamp()}.${
        doc[0]?.type.split('/')[1]
      }`;

      // Read the compressed file data
      const compressedData = await RNFS.readFile(compressedUri, 'base64');

      setOtherFiles(current => [
        ...current.slice(0, index),
        {
          name: fileName,
          type: doc[0]?.type,
          uri: compressedUri,
          data: compressedData, // Include the base64 data for PDF and DOCX files
        },
        ...current.slice(index + 1),
      ]);
    } catch (error) {
      console.log('Error:', JSON.stringify(error));
      Toast.show({
        type: 'error',
        text1: 'Error selecting file. Please try again.',
      });
    }
  };

  // for removing other files
  const onRemoveOtherFiles = index => {
    let newFile = '';
    // console.log("this is new file", newFile);
    setOtherFiles([
      ...otherFiles.slice(0, index),
      newFile,
      ...otherFiles.slice(index + 1),
    ]);
  };

  const FileAttachment = () => {
    let names = '';

    for (let index = 0; index < aadharCard.length; index++) {
      // console.log("aadhar card", aadharCard[index].uri);

      if (aadharCard[index].uri) {
        const element = aadharCard[index];
        names += document[0]?.PARAM_ID + '~' + element.name + ',';
      }
    }

    for (let index = 0; index < panCard.length; index++) {
      // console.log("pan card", panCard[index].uri);

      if (panCard[index].uri) {
        const element = panCard[index];
        names += document[1]?.PARAM_ID + '~' + element.name + ',';
      }
    }

    for (let index = 0; index < salarySlip.length; index++) {
      // console.log("ss", salarySlip[index].uri);

      if (salarySlip[index].uri) {
        const element = salarySlip[index];
        names += document[2].PARAM_ID + '~' + element.name + ',';
      }
    }

    for (let index = 0; index < otherFiles.length; index++) {
      // console.log("oF", otherFiles[index]?.uri);

      if (otherFiles[index]?.uri) {
        const element = otherFiles[index];
        element &&
          (names += document[index + 3]?.PARAM_ID + '~' + element.name + ',');
      }
    }

    if (names[names.length - 1] === ',') {
      names = names.slice(0, names.length - 1);
    }
    return names;
  };

  const getFileName = () => {
    let names = '';

    for (let index = 0; index < aadharCard.length; index++) {
      if (aadharCard[index]?.uri) {
        const element = aadharCard[index];
        names += element.name + ',';
      }
    }

    for (let index = 0; index < panCard.length; index++) {
      if (panCard[index]?.uri) {
        const element = panCard[index];
        names += element.name + ',';
      }
    }

    for (let index = 0; index < salarySlip.length; index++) {
      if (salarySlip[index]?.uri) {
        const element = salarySlip[index];
        names += element.name + ',';
      }
    }

    for (let index = 0; index < otherFiles.length; index++) {
      if (otherFiles[index]?.uri) {
        const element = otherFiles[index];
        {
          element && (names += element.name + ',');
        }
      }
    }

    if (names[names.length - 1] === ',') {
      names = names.slice(0, names.length - 1);
    }
    return names;
  };

  const FileAdding = () => {
    let fileName = getFileName();
    // console.log(fileName);

    for (let index = 0; index < aadharCard.length; index++) {
      if (aadharCard[index].uri) {
        let element = {};
        (element.uri = aadharCard[index].uri),
          (element.type = aadharCard[index].type),
          (element.name = fileName);
        formData.append('fileUpload', element);
      }
    }

    for (let index = 0; index < panCard.length; index++) {
      if (panCard[index].uri) {
        let element = {};
        (element.uri = panCard[index].uri),
          (element.type = panCard[index].type),
          (element.name = fileName);
        formData.append('fileUpload', element);
      }
    }

    for (let index = 0; index < salarySlip.length; index++) {
      if (salarySlip[index].uri) {
        let element = {};
        (element.uri = salarySlip[index].uri),
          (element.type = salarySlip[index].type),
          (element.name = fileName);
        formData.append('fileUpload', element);
      }
    }

    for (let index = 0; index < otherFiles.length; index++) {
      if (otherFiles[index]?.uri) {
        let element = {};
        otherFiles[index] &&
          ((element.uri = otherFiles[index].uri),
          (element.type = otherFiles[index].type),
          (element.name = fileName),
          formData.append('fileUpload', element));
      }
    }
  };

  // validating aadharcard & Pancard files
  const ValidateForm = () => {
    // console.log("experince", experience);
    if (experience === 'No') {
      return aadharCard.length > 0 && panCard.length > 0;
    } else {
      return (
        aadharCard.length > 0 && panCard.length > 0 && salarySlip.length > 0
      );
    }
    // if(doc==="25" && experience)
  };

  // for saving documents to backend
  const saveDocs = async flag => {
    try {
      if (ValidateForm()) {
        setLoaderVisible(true);

        let candidateData = {
          txnId: '',
          userId: candidateId,
          candidateId: candidateId,
          documentType: '',
          documentName: '',
          description: '',
          status: 'S',
          operFlag: flag,
          attachment: '',
          candidateName: candidateName + '-' + candidateId,
          jobTitle: candidateRole,
          approvelMail: hiringLeadMail,
          src: 'M',
        };

        candidateData.attachment = FileAttachment();

        console.log('candidateDatarwuq', candidateData);

        formData.append('data', JSON.stringify(candidateData));

        FileAdding();

        // console.log(formData._parts)

        let res = await fetch(`${API}/api/hrms/assesmentSave`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        res = await res.json();
        console.log('SaveImages', res);
        setLoaderVisible(false);
        Toast.show({
          type: 'success',
          text1: res.MSG,
        });
        props.navigation.goBack();
      } else {
        setLoaderVisible(false);
        Toast.show({
          type: 'error',
          text1: 'Upload Mandatory Documents',
        });
      }
    } catch (error) {
      loaderVisible(false);

      Toast.show({
        type: 'error',
        text1: error,
      });
    }
  };

  const DeleteDoc = async TXNID => {
    let candidateData = {txnId: TXNID, operFlag: 'D', src: 'M'};
    // console.log(candidateData);

    let newFormData = new FormData();

    newFormData.append('data', JSON.stringify(candidateData));

    let res = await fetch(`${API}/api/hrms/assesmentSave`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: newFormData,
    });

    res = await res.json();

    // console.log("deleting doc", res)
    Toast.show({
      type: 'success',
      text1: res.MSG,
    });
  };

  // for displaying aadhar, pan and salary slip in front end
  const DocumentUploader = (file, setFile, number, type, Mandatory) => {
    return (
      <TouchableOpacity
        style={{
          elevation: 6,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.base,
          paddingVertical: SIZES.base / 3,
          marginHorizontal: SIZES.base / 4,
          borderColor:
            docVerify.length > 0
              ? docVerify?.filter(doc => doc?.TXN_ID === file[0]?.txnId)[0]
                  ?.STATUS === 'R'
                ? COLORS.red
                : COLORS.lightGray
              : '#fff',
          borderWidth:
            docVerify.length > 0
              ? docVerify?.filter(doc => doc?.TXN_ID === file[0]?.txnId)[0]
                  ?.STATUS === 'R'
                ? 0.5
                : 0
              : 0,
        }}>
        <View
          style={{
            paddingVertical: SIZES.radius,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>
            {type !== null && typeof type === 'object'
              ? type?.PARAM_NAME
              : type}
            {Mandatory && <Text style={{color: COLORS.red}}>*</Text>}
          </Text>

          {docVerify.length > 0 &&
            docVerify?.filter(doc => doc?.TXN_ID === file[0]?.txnId)[0]
              ?.STATUS === 'R' && (
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={
                  () =>
                    showAlert({
                      title: '    ',
                      customIcon: 'none',
                      message: JSON.stringify(
                        docVerify?.filter(
                          doc => doc?.TXN_ID === file[0]?.txnId,
                        )[0]?.REJ_REMARK,
                      ),
                      alertType: 'error',
                      onPress: () => closeAlert(),
                    })

                  // Toast.show({
                  //   type: 'success',
                  //   text1: JSON.stringify(
                  //     docVerify?.filter(
                  //       doc => doc?.TXN_ID === file[0]?.txnId,
                  //     )[0]?.REJ_REMARK,
                  //   ),
                  // })
                }>
                <Icon
                  name="alert-octagon-outline"
                  size={25}
                  color={COLORS.red}
                />
                {/* <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    color: COLORS.red,
                    ...FONTS.body5,
                    width: responsiveWidth(40),
                    textAlign: 'right',
                  }}> */}
                {/* Need Re-upload{' '} */}
                {/* {
                    docVerify?.filter(doc => doc?.TXN_ID === file[0]?.txnId)[0]
                      ?.REJ_REMARK
                  } */}
                {/* {console.log(
                  'documentName',
                  JSON.stringify(docVerify[0]?.DOC_NAME),
                )} */}
                {/* </Text> */}
              </TouchableOpacity>
            )}

          {file.length < number && (
            <TouchableOpacity onPress={() => selectDoc(setFile, type)}>
              <Ionicons
                name="add-circle-outline"
                size={30}
                color={COLORS.green}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* showing all the uploaded files */}
        {file?.map((item, index) => (
          <View
            style={{
              padding: SIZES.base,
              borderTopWidth: 0.5,
              borderColor: COLORS.lightGray,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            key={index}>
            {/* {
                                console.log("dfghjkhvcxsdfcgvbhvcdxcfgvhb",item?.name)
                            } */}
            <Text
              style={{width: responsiveWidth(70)}}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item?.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {operFlag === 'E' && (
                <Ionicons
                  name="eye"
                  size={24}
                  color={COLORS.green}
                  onPress={() => {
                    props.navigation.navigate('View_Doc', {file: item.name});
                  }}
                />
              )}

              {/* {docVerify.filter((doc) => doc.TXN_ID===item.txnId) &&  } */}
              {/* {console.log("deleteDoc", item.name)} */}
              {/* {console.log("deleteDoc1", docVerify?.filter((doc) => doc?.TXN_ID === item.txnId)[0]?.STATUS)} */}

              {docVerify?.filter(doc => doc?.TXN_ID === item.txnId)[0]
                ?.STATUS !== 'V' && (
                <TouchableOpacity
                  style={{marginLeft: SIZES.base}}
                  onPress={() => {
                    onRemovePress(index, setFile, file), DeleteDoc(item.txnId);
                  }}>
                  <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color={COLORS.orange1}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </TouchableOpacity>
    );
  };

  // for display other files in front end
  const otherFilesUploader = (file, setFile, type, index, Mandatory) => {
    return (
      <TouchableOpacity
        style={{
          elevation: 6,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.base,
          paddingVertical: SIZES.base / 3,
          marginHorizontal: SIZES.base / 4,
          borderColor:
            docVerify.length > 0
              ? docVerify?.filter(doc => doc?.TXN_ID === file[index]?.txnId)[0]
                  ?.STATUS === 'R'
                ? COLORS.red
                : COLORS.lightGray
              : '#fff',
          borderWidth:
            docVerify.length > 0
              ? docVerify?.filter(doc => doc?.TXN_ID === file[index]?.txnId)[0]
                  ?.STATUS === 'R'
                ? 0.5
                : 0
              : 0,
        }}>
        <View
          style={{
            paddingVertical: SIZES.radius,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* {console.log("documentName", type?.PARAM_NAME)} */}

          <Text>
            {type !== null && typeof type === 'object'
              ? type?.PARAM_NAME
              : type}
            {Mandatory && (
              <Text style={{color: COLORS.red, marginLeft: 2}}>*</Text>
            )}
          </Text>

          {/* <Text>{type?.PARAM_NAME}</Text> */}

          {docVerify.length > 0 &&
            docVerify?.filter(doc => doc?.TXN_ID === file[index]?.txnId)[0]
              ?.STATUS === 'R' && (
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={
                  () =>
                    showAlert({
                      title: '  ',
                      customIcon: 'none',
                      message: JSON.stringify(
                        docVerify?.filter(
                          doc => doc?.TXN_ID === file[index]?.txnId,
                        )[0]?.REJ_REMARK,
                      ),
                      alertType: 'error',
                      onPress: () => closeAlert(),
                    })

                  // Toast.show({
                  //   type: 'success',
                  //   text1: JSON.stringify(
                  //     docVerify?.filter(
                  //       doc => doc?.TXN_ID === file[index]?.txnId,
                  //     )[0]?.REJ_REMARK,
                  //   ),
                  // })
                }>
                <Icon
                  name="alert-octagon-outline"
                  size={25}
                  color={COLORS.red}
                />
              </TouchableOpacity>
              // <Text
              //   numberOfLines={1}
              //   ellipsizeMode="tail"
              //   style={{
              //     color: COLORS.red,
              //     ...FONTS.body5,
              //     width: responsiveWidth(40),
              //     textAlign: 'right',
              //   }}>
              //   {/* Need Re-upload{' '} */}
              //   {
              //     docVerify?.filter(
              //       doc => doc?.TXN_ID === file[index]?.txnId,
              //     )[0]?.REJ_REMARK
              //   }
              // </Text>
            )}

          {!file[index] && (
            <TouchableOpacity
              onPress={() => selectOtherFile(index, type?.PARAM_ID)}>
              <Ionicons
                name="add-circle-outline"
                size={30}
                color={COLORS.green}
              />
            </TouchableOpacity>
          )}
        </View>

        {file[index] && (
          <View
            style={[
              {
                padding: SIZES.base,
                borderTopWidth: 0.5,
                borderColor: COLORS.lightGray,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
            key={index}>
            <Text
              style={{width: responsiveWidth(70)}}
              numberOfLines={1}
              ellipsizeMode="tail">
              {file[index]?.name}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {operFlag === 'E' && (
                <Ionicons
                  name="eye"
                  size={24}
                  color={COLORS.green}
                  onPress={() => {
                    props.navigation.navigate('View_Doc', {
                      file: file[index]?.name,
                    });
                  }}
                />
              )}

              {docVerify?.filter(doc => doc?.TXN_ID === file[index]?.txnId)[0]
                ?.STATUS !== 'V' && (
                <TouchableOpacity
                  style={{marginLeft: SIZES.base}}
                  onPress={() => {
                    onRemoveOtherFiles(index, setFile, file),
                      DeleteDoc(file[index]?.txnId);
                  }}>
                  <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color={COLORS.orange1}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // for header on top of screen
  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.white,
          elevation: 10,
          marginBottom: 5,
          // shadowColor: COLORS.orange1,
          // shadowOffset: { width: 0, height: 2, },
          // shadowOpacity: 0.1,
          // shadowRadius: 7,
        }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={COLORS.black} />
        </TouchableOpacity>
        <Text
          style={{
            ...FONTS.h3,
            textAlign: 'center',
            color: COLORS.black,
            flex: 1,
          }}>
          {' '}
          Documents{' '}
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {renderHeader()}
      <ScrollView style={{backgroundColor: COLORS.white, flex: 1}}>
        <Loader loaderVisible={loaderVisible} />

        {/* document counter */}
        <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              paddingHorizontal: 2,
              width: '100%',
            }}>
            {/* displaying all the pending docs */}
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 8,
                borderRadius: 8,
                elevation: 8,
                flexDirection: 'row',
                alignItems: 'center',
                width: '45%',
                height: 70,
              }}>
              <Icon
                name="file-document-multiple-outline"
                size={40}
                color={COLORS.orange1}
                backgroundColor={COLORS.disableOrange1}
                style={{borderRadius: 6, padding: 4, marginLeft: 8}}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{color: COLORS.black, ...FONTS.h5, fontSize: 14}}>
                  Documents
                </Text>
                <Text
                  style={{color: COLORS.gray, ...FONTS.body5, marginTop: -8}}>
                  {documentCount} files
                </Text>
              </View>
            </View>

            {/* displaying all the uploaded docs  */}
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 8,
                borderRadius: 8,
                elevation: 8,
                flexDirection: 'row',
                alignItems: 'center',
                width: '45%',
                height: 70,
              }}>
              <Ionicons
                name="ios-cloud-upload-outline"
                size={40}
                color={COLORS.orange1}
                backgroundColor={COLORS.disableOrange1}
                style={{borderRadius: 6, padding: 4, marginLeft: 8}}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{color: COLORS.black, ...FONTS.h5, fontSize: 14}}>
                  Pending
                </Text>
                <Text style={{color: COLORS.red, ...FONTS.h4, marginTop: -8}}>
                  {pendingDocumentCount} files
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              paddingHorizontal: 2,
              width: '100%',
              marginTop: 10,
            }}>
            {/* for verified files */}
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 8,
                borderRadius: 8,
                elevation: 8,
                flexDirection: 'row',
                alignItems: 'center',
                width: '45%',
                height: 70,
              }}>
              <Icon
                name="check-decagram-outline"
                size={40}
                color={COLORS.orange1}
                backgroundColor={COLORS.disableOrange1}
                style={{borderRadius: 6, padding: 4, marginLeft: 8}}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{color: COLORS.black, ...FONTS.h5, fontSize: 14}}>
                  Verified
                </Text>
                <Text
                  style={{color: COLORS.gray, ...FONTS.body5, marginTop: -8}}>
                  {verifiedDocCount} files
                </Text>
              </View>
            </View>

            {/* for rejected files */}
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 8,
                borderRadius: 8,
                elevation: 8,
                flexDirection: 'row',
                alignItems: 'center',
                width: '45%',
                height: 70,
              }}>
              <Ionicons
                name="close"
                size={40}
                color={COLORS.orange1}
                backgroundColor={COLORS.disableOrange1}
                style={{borderRadius: 6, padding: 4, marginLeft: 8}}
              />
              <View style={{marginLeft: 10}}>
                {/* <Text style={{color: COLORS.black, ...FONTS.h5, fontSize: 14}}>
                  Rejected
                </Text> */}
                <Text
                  style={{color: COLORS.gray, ...FONTS.body5, marginTop: -8}}>
                  {rejectDocCount} files
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* upload document view */}
        <View
          style={{
            backgroundColor: COLORS.white,
            marginVertical: SIZES.body5,
            padding: SIZES.radius,
            borderRadius: SIZES.radius,
            borderBottomWidth: 0.5,
            borderColor: COLORS.lightGray,
            marginBottom: SIZES.radius,
          }}>
          <Text style={{...FONTS.h3, color: COLORS.black}}>
            Upload your documents
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              name="check-all"
              size={15}
              color={COLORS.green}
              style={{marginTop: 2}}
            />
            <Text
              style={{
                ...FONTS.body4,
                marginTop: 8,
                color: COLORS.gray,
                marginLeft: 4,
              }}>
              File size should be less than 10 MB.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              name="check-all"
              size={15}
              color={COLORS.green}
              style={{marginTop: 2}}
            />
            <Text style={{...FONTS.body5, color: COLORS.gray, marginLeft: 4}}>
              JPG, JPEG, PNG, DOC, DOCX, PDF only.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              name="check-all"
              size={15}
              color={COLORS.green}
              style={{marginTop: 2}}
            />

            <Text
              style={{
                ...FONTS.body4,
                alignItems: 'center',
                color: COLORS.gray,
                marginLeft: 4,
              }}>
              <Text style={{color: COLORS.red}}>*</Text>Marked Documents are
              mandatory.
            </Text>
          </View>
        </View>

        {/* image upload view */}

        <View style={{padding: SIZES.base, borderRadius: SIZES.radius}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: SIZES.base,
            }}>
            <Text style={{...FONTS.h4, color: COLORS.darkGray2}}>Name</Text>

            <Text style={{...FONTS.h4, color: COLORS.darkGray2}}>Actions</Text>
          </View>

          {document && docCount && docCount === '3' && (
            <ScrollView>
              {DocumentUploader(
                aadharCard,
                setAadharCard,
                1,
                document[0]?.PARAM_NAME,
                'imp',
              )}

              {DocumentUploader(
                panCard,
                setPanCard,
                1,
                document[1]?.PARAM_NAME,
                'imp',
              )}

              {DocumentUploader(
                salarySlip,
                setSalarySlip,
                1,
                document[2]?.PARAM_NAME,
                experience === 'Yes' && 'imp',
              )}
            </ScrollView>
          )}

          {document && docCount && docCount === '25' && (
            <ScrollView>
              {DocumentUploader(
                aadharCard,
                setAadharCard,
                1,
                document[0]?.PARAM_NAME,
                'imp',
              )}
              {DocumentUploader(
                panCard,
                setPanCard,
                1,
                document[1]?.PARAM_NAME,
                'imp',
              )}
              {DocumentUploader(
                salarySlip,
                setSalarySlip,
                1,
                document[2]?.PARAM_NAME,
                experience === 'Yes' && 'imp',
              )}

              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[3],
                0,
                'imp',
              )}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[4],
                1,
                'imp',
              )}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[5],
                2,
                '',
              )}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[6],
                3,
                'imp',
              )}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[7],
                4,
                'ijmp',
              )}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[8],
                5,
                '',
              )}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[9],
                6,
                experience === 'Yes' && 'imp',
              )}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[10],
                7,
                'imp',
              )}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[11],
                8,
                'imp',
              )}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[12],
                9,
                'imp',
              )}
              {/* {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[13],
                10,
                // experience === 'No' && 'imp',
              )} */}
              {/* {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[14],
                11,
                '',
              )} */}
              {/* {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[15],
                12,
                '',
              )} */}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[16],
                13,
                'imp',
              )}
              {/* {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[17],
                14,
                '',
              )} */}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[18],
                15,
                experience === 'Yes' && 'imp',
              )}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[19],
                16,
                'imp',
              )}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[20],
                17,
                'imp',
              )}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[21],
                18,
                'imp',
              )}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[22],
                19,
                'imp',
              )}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[23],
                20,
                '',
              )}
              {otherFilesUploader(
                otherFiles,
                setOtherFiles,
                document[24],
                21,
                '',
              )}
            </ScrollView>
          )}

          {
            // (docCount === "3" || docCount === "25") &&
            <TouchableOpacity
              onPress={() =>
                docCount === '25' ? saveDocs('P') : saveDocs('A')
              }>
              <LinearGradient
                colors={[COLORS.orange1, COLORS.disableOrange1]}
                start={{x: 0, y: 0}}
                end={{x: 2, y: 0}}
                style={{
                  borderRadius: 8,
                  padding: 10,
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{color: 'white', textAlign: 'center', ...FONTS.h4}}>
                  Submit Documents
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default Candidate_Document;
