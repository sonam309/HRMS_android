import { View, Text, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../../constants/theme'
import { FONTS, SIZES } from '../../../constants/font_size'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DocumentPicker from 'react-native-document-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';

const Candidate_Document = (props) => {
    // Candidate ID & Status
    const { candidateId, candidateStatusId } = useSelector(state => state.candidateAuth)

    // Form data for file
    let formData = new FormData();

    // Document Name
    const [document, setDocument] = useState();
    const [loaderVisible, setLoaderVisible] = useState(true);

    // array of files 
    const [aadharCard, setAadharCard] = useState([]);
    const [panCard, setPanCard] = useState([]);
    const [salarySlip, setSalarySlip] = useState([]);
    const [otherFiles, setOtherFiles] = useState([...Array(22)]);

    const [operFlag, setOperFlag] = useState("A");

    // Document information -> Pending, Uploading, Rejected, Verified
    const [docInfo, setDocInfo] = useState();

    useEffect(() => {
        getDocData();
        getDropdownData(22);
    }, [])

    // getting doc info
    const getDocData = async () => {
        let PersonalData = { operFlag: "V", candidateId: candidateId }

        let formData = new FormData();
        formData.append('data', JSON.stringify(PersonalData))

        let res = await fetch("https://econnectsatya.com:7033/api/hrms/assesmentSave", {
            method: "POST",
            body: formData
        })

        res = await res.json()
        console.log("res",res)
        setDocInfo(res.Table1[0]);

        let docFiles = res.Table;
        { docFiles.length > 0 && setOperFlag("E") }
        // console.warn("docfiles", docFiles);
        // console.log(docFiles)



        docFiles.map((item) => {
            let type = Number(item?.DOC_TYPE), newFile = item?.FILE_ATTACHMENT, TXNID = item?.TXN_ID


            console.warn(newFile, "this is newfile", type)

            switch (type) {
                case 129:
                    setAadharCard(prevState => [...prevState, { name: newFile, txnId: TXNID }])
                    break;
                case 130:
                    setPanCard(prevState => [...prevState, { name: newFile, txnId: TXNID }])
                    break;
                case 131:
                    setSalarySlip(prevState => [...prevState, { name: newFile, txnId: TXNID }])
                    break;
                default:
                    setOtherFiles(prevState => [
                        ...prevState.slice(0, type - 132),
                        {
                            name: newFile,
                            txnId: TXNID
                        },
                        ...prevState.slice(type - 131)
                    ])
                    break;
            }
            setLoaderVisible(false)
        })

    }


    // Document Data & all files
    const getDropdownData = async (P) => {
        let response = await fetch(`https://econnectsatya.com:7033/api/User/getParam?getClaim=${P}`)
        response = await response.json();
        const returnedData = response;

        if (P === 22) {
            setDocument(returnedData)
        }
    }


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
    const selectDoc = async (setFileUpload) => {
        try {
            const doc = await DocumentPicker.pick({
                type: [
                    DocumentPicker.types.pdf,
                    DocumentPicker.types.doc,
                    DocumentPicker.types.docx,
                    DocumentPicker.types.images,
                ],
                // allowMultiSelection: true
            });
            console.log(doc);

            setFileUpload(current => [
                ...current,
                {
                    name: `Assesment_${candidateId}_${getFormattedTimestamp()}.${doc[0].type.split('/')[1]
                        }`,
                    type: doc[0].type,
                    uri: doc[0].uri,
                    txnId: ''
                },
            ]);

        } catch (error) {
            console.log(error);
        }
    };

    // for removing 3 files -> aadhar, pan and 3 month salary slip
    const onRemovePress = (index, setFileUpload, fileUpload) => {
        setFileUpload([
            ...fileUpload.slice(0, index),
            ...fileUpload.slice(index + 1)
        ]);
    };

    // for selecting other 22 docs
    const selectOtherFile = async (index) => {
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

            setOtherFiles([
                ...otherFiles.slice(0, index),
                {
                    name: `Assesment_${candidateId}_${getFormattedTimestamp()}.${doc[0].type.split('/')[1]
                        }`,
                    type: doc[0].type,
                    uri: doc[0].uri,
                },
                ...otherFiles.slice(index + 1)
            ])

        } catch (error) {
            ToastAndroid.show("Error Selecting File. Please try again.", 4000)
        }
    }

    // for removing other files
    const onRemoveOtherFiles = (index) => {
        let newFile = undefined
        // console.warn("this is new file", newFile);
        setOtherFiles([
            ...otherFiles.slice(0, index),
            newFile,
            ...otherFiles.slice(index + 1)
        ])
    }

    const FileAttachment = () => {

        let names = '';

        for (let index = 0; index < aadharCard.length; index++) {
            console.warn("aadhar card", aadharCard[index].uri);

            if (aadharCard[index].uri) {
                const element = aadharCard[index];
                (names += document[0].PARAM_ID + '~' + element.name + ",")
            }

        }

        for (let index = 0; index < panCard.length; index++) {

            console.warn("pan card", panCard[index].uri);

            if (panCard[index].uri) {
                const element = panCard[index];
                (names += document[1].PARAM_ID + '~' + element.name + ",")
            }
        }

        for (let index = 0; index < salarySlip.length; index++) {

            console.warn("ss", salarySlip[index].uri);

            if (salarySlip[index].uri) {
                const element = salarySlip[index];
                (names += document[2].PARAM_ID + '~' + element.name + ",")
            }
        }

        for (let index = 0; index < otherFiles.length; index++) {

            console.warn("oF", otherFiles[index]?.uri);

            if (otherFiles[index]?.uri) {
                const element = otherFiles[index];
                element && (names += document[index + 3].PARAM_ID + '~' + element.name + ",")
            }
        }



        if (names[names.length - 1] === ',') {
            names = names.slice(0, names.length - 1)
        }
        return names
    }

    const getFileName = () => {

        let names = '';

        for (let index = 0; index < aadharCard.length; index++) {
            if (aadharCard[index]?.uri) {
                const element = aadharCard[index];
                (names += element.name + ",")
            }
        }

        for (let index = 0; index < panCard.length; index++) {
            if (panCard[index]?.uri) {
                const element = panCard[index];
                (names += element.name + ",")
            }
        }

        for (let index = 0; index < salarySlip.length; index++) {
            if (salarySlip[index]?.uri) {
                const element = salarySlip[index];
                (names += element.name + ",")
            }
        }

        for (let index = 0; index < otherFiles.length; index++) {
            if (otherFiles[index]?.uri) {
                const element = otherFiles[index];
                {
                    element &&
                        (names += element.name + ",")
                }
            }

        }

        if (names[names.length - 1] === ',') {
            names = names.slice(0, names.length - 1)
        }
        return names
    }

    const FileAdding = () => {
        let fileName = getFileName();
        console.warn(fileName);

        for (let index = 0; index < aadharCard.length; index++) {
            if (aadharCard[index].uri) {
                let element = {};
                element.uri = aadharCard[index].uri, element.type = aadharCard[index].type, element.name = fileName
                formData.append('fileUpload', element)
            }
        }

        for (let index = 0; index < panCard.length; index++) {
            if (panCard[index].uri) {
                let element = {}
                element.uri = panCard[index].uri, element.type = panCard[index].type, element.name = fileName
                formData.append('fileUpload', element)
            }
        }

        for (let index = 0; index < salarySlip.length; index++) {
            if (salarySlip[index].uri) {
                let element = {}
                element.uri = salarySlip[index].uri, element.type = salarySlip[index].type, element.name = fileName
                formData.append('fileUpload', element)
            }
        }

        for (let index = 0; index < otherFiles.length; index++) {
            if (otherFiles[index]?.uri) {
                let element = {}
                otherFiles[index] && (
                    element.uri = otherFiles[index].uri, element.type = otherFiles[index].type, element.name = fileName,
                    formData.append('fileUpload', element))

            }
        }
    }

    // validating aadharcard & Pancard files
    const ValidateForm = () => {
        return aadharCard.length > 0 && panCard.length > 0
    }

    // for saving documents to backend 
    const saveDocs = async () => {
        try {
            if (ValidateForm()) {

                setLoaderVisible(true);

                let candidateData = { txnId: "", userId: candidateId, candidateId: candidateId, documentType: "", documentName: "", description: "", status: "S", operFlag: "A", attachment: "" }

                candidateData.attachment = FileAttachment();

                formData.append('data', JSON.stringify(candidateData))

                FileAdding();

                console.log(formData._parts)

                let res = await fetch("https://econnectsatya.com:7033/api/hrms/assesmentSave", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                })

                res = await res.json();

                ToastAndroid.show(res.MSG, 3000);

                setLoaderVisible(false)

            } else {
                ToastAndroid.show("Upload Mandatory Documents", 3000)
            }
        }
        catch (error) {
            ToastAndroid.show(error, 3000)
        }

    }

    const DeleteDoc = async (TXNID) => {

        let candidateData = { txnId: TXNID, operFlag: "D" }
        console.warn(candidateData);

        let newFormData = new FormData()

        newFormData.append('data', JSON.stringify(candidateData))

        let res = await fetch("https://econnectsatya.com:7033/api/hrms/assesmentSave", {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: newFormData
        })

        res = await res.json()

        console.log("deleting doc", res)
        ToastAndroid.show(res.MSG, 3000)
    }

    // for displaying aadhar, pan and salary slip in front end
    const DocumentUploader = (file, setFile, number, type, Mandatory) => {

        return (
            <TouchableOpacity style={{ elevation: 6, backgroundColor: COLORS.white, borderRadius: SIZES.radius, marginVertical: SIZES.base, paddingHorizontal: SIZES.base, paddingVertical: SIZES.base / 3, marginHorizontal: SIZES.base / 4 }}>

                <View style={{ paddingVertical: SIZES.radius, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Text>{type.PARAM_NAME} {Mandatory && <Text style={{ color: COLORS.red, }}>*</Text>}</Text>

                    {file.length < number && <TouchableOpacity onPress={() => selectDoc(setFile)}>
                        <Ionicons name="add-circle-outline" size={24} color={COLORS.green} />
                    </TouchableOpacity>}

                </View>

                {/* showing all the uploaded files */}
                {file?.map((item, index) => (

                    <View style={{ padding: SIZES.base, borderTopWidth: 0.5, borderColor: COLORS.lightGray, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                        key={index}>

                        <Text>{item?.name}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                            {operFlag === "E" && <Ionicons name="eye" size={24} color={COLORS.green} onPress={() => { props.navigation.navigate("View_Doc", { file: item.name }) }} />}

                            <TouchableOpacity style={{ marginLeft: SIZES.base }} onPress={() => { onRemovePress(index, setFile, file), DeleteDoc(item.txnId) }} >
                                <MaterialIcons name="delete-outline" size={24} color={COLORS.orange1} />
                            </TouchableOpacity>

                        </View>

                    </View>

                ))
                }

            </TouchableOpacity>
        )
    }

    // for display other files in front end 
    const otherFilesUploader = (file, setFile, type, index) => {
        return (
            <TouchableOpacity style={{ elevation: 6, backgroundColor: COLORS.white, borderRadius: SIZES.radius, marginVertical: SIZES.base, paddingHorizontal: SIZES.base, paddingVertical: SIZES.base / 3, marginHorizontal: SIZES.base / 4 }}>

                <View style={{ paddingVertical: SIZES.radius, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Text>{type.PARAM_NAME}</Text>

                    {!file[index] && <TouchableOpacity onPress={() => selectOtherFile(index)}>
                        <Ionicons name="add-circle-outline" size={24} color={COLORS.green} />
                    </TouchableOpacity>}

                </View>

                {
                    file[index] &&
                    (
                        <View style={{ padding: SIZES.base, borderTopWidth: 0.5, borderColor: COLORS.lightGray, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                            key={index}>

                            <Text>{file[index]?.name}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>


                                {operFlag === "E" && <Ionicons name="eye" size={24} color={COLORS.green} onPress={() => { props.navigation.navigate("View_Doc", { file: file[index]?.name }) }} />}

                                <TouchableOpacity style={{ marginLeft: SIZES.base }} onPress={() => {onRemoveOtherFiles(index, setFile, file), DeleteDoc(file[index]?.txnId)}} >
                                    <MaterialIcons name="delete-outline" size={24} color={COLORS.orange1} />
                                </TouchableOpacity>

                            </View>

                        </View>
                    )
                }

            </TouchableOpacity>
        )
    }

    // for header on top of screen
    const renderHeader = () => {
        return (
            <View style={{ flexDirection: 'row', paddingVertical: SIZES.base, paddingHorizontal: SIZES.radius, borderColor: COLORS.transparentGray, backgroundColor: COLORS.white, elevation: 10, shadowColor: COLORS.orange1, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.1, shadowRadius: 7, alignItems: 'center' }}>

                <Ionicons name="arrow-back" size={28} color={COLORS.black} style={{ position: 'absolute', left: 5, paddingHorizontal:5 }} onPress={() => props.navigation.goBack()} />

                <Text style={{ ...FONTS.h3, textAlign: 'center', color: COLORS.black, flex: 1 }}> Document </Text>

            </View>
        );
    };

    return (
        <ScrollView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <Loader loaderVisible={loaderVisible} />

            {renderHeader()}
            {/* document counter */}
            <View style={{ marginTop: 10 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 2, width: '100%' }}>

                    {/* displaying all the pending docs */}
                    <View style={{ backgroundColor: COLORS.white, padding: 8, borderRadius: 8, elevation: 8, flexDirection: 'row', alignItems: 'center', width: '45%', height: 70 }}>
                        <Icon name="file-document-multiple-outline" size={40} color={COLORS.orange1} backgroundColor={COLORS.disableOrange1} style={{ borderRadius: 6, padding: 4, marginLeft: 8 }} />
                        <View style={{ marginLeft: 10, }}>
                            <Text style={{ color: COLORS.black, ...FONTS.h5, fontSize: 14, }}>Documents</Text>
                            <Text style={{ color: COLORS.gray, ...FONTS.body5, marginTop: -8 }}>{docInfo?.Pending} files</Text>
                        </View>
                    </View>

                    {/* displaying all the uploaded docs  */}
                    <View style={{ backgroundColor: COLORS.white, padding: 8, borderRadius: 8, elevation: 8, flexDirection: 'row', alignItems: 'center', width: '45%', height: 70 }}>
                        <Ionicons name="ios-cloud-upload-outline" size={40} color={COLORS.orange1} backgroundColor={COLORS.disableOrange1} style={{ borderRadius: 6, padding: 4, marginLeft: 8 }} />
                        <View style={{ marginLeft: 10, }}>
                            <Text style={{ color: COLORS.black, ...FONTS.h5, fontSize: 14, }}>Uploaded</Text>
                            <Text style={{ color: COLORS.gray, ...FONTS.body5, marginTop: -8 }}>{docInfo?.Uploaded} files</Text>
                        </View>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 2, width: '100%', marginTop: 10 }}>

                    {/* for verified files */}
                    <View style={{ backgroundColor: COLORS.white, padding: 8, borderRadius: 8, elevation: 8, flexDirection: 'row', alignItems: 'center', width: '45%', height: 70 }}>
                        <Icon name="check-decagram-outline" size={40} color={COLORS.orange1} backgroundColor={COLORS.disableOrange1} style={{ borderRadius: 6, padding: 4, marginLeft: 8 }} />
                        <View style={{ marginLeft: 10, }}>
                            <Text style={{ color: COLORS.black, ...FONTS.h5, fontSize: 14, }}>Verified</Text>
                            <Text style={{ color: COLORS.gray, ...FONTS.body5, marginTop: -8 }}>{docInfo?.Verified} files</Text>
                        </View>
                    </View>

                    {/* for rejected files */}
                    <View style={{ backgroundColor: COLORS.white, padding: 8, borderRadius: 8, elevation: 8, flexDirection: 'row', alignItems: 'center', width: '45%', height: 70 }}>
                        <Ionicons name="close" size={40} color={COLORS.orange1} backgroundColor={COLORS.disableOrange1} style={{ borderRadius: 6, padding: 4, marginLeft: 8 }} />
                        <View style={{ marginLeft: 10, }}>
                            <Text style={{ color: COLORS.black, ...FONTS.h5, fontSize: 14, }}>Rejected</Text>
                            <Text style={{ color: COLORS.gray, ...FONTS.body5, marginTop: -8 }}>{docInfo?.Rejected} files</Text>
                        </View>
                    </View>

                </View>

            </View>

            {/* upload document view */}
            <View style={{ backgroundColor: COLORS.white, marginVertical: SIZES.body5, padding: SIZES.radius, borderRadius: SIZES.radius, borderBottomWidth: 0.5, borderColor: COLORS.lightGray, marginBottom: SIZES.radius, }}>

                <Text style={{ ...FONTS.h3, color: COLORS.black }}>Upload your documents</Text>

                <Text style={{ ...FONTS.body4, marginTop: 8, color: COLORS.gray }}>File size should be less than 10MB  </Text>

                <Text style={{ ...FONTS.body5, color: COLORS.gray }}>JPG, JPEG, PNG, DOC, DOCX, PDF only</Text>

                <View >

                    <Text style={{ ...FONTS.body4, alignItems: 'center', color: COLORS.gray }}>
                        <Text style={{ color: COLORS.red, }}>*</Text>Marked Documents are mandatory
                    </Text>

                </View>

            </View>

            {/* image upload view */}

            <View style={{ padding: SIZES.base, borderRadius: SIZES.radius, }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: SIZES.base }}>

                    <Text style={{ ...FONTS.h4, color: COLORS.darkGray2, }}>Name</Text>

                    <Text style={{ ...FONTS.h4, color: COLORS.darkGray2, }}>Actions</Text>
                </View>

                {document && (candidateStatusId === "123" || candidateStatusId === "121" || candidateStatusId === "124" || candidateStatusId === "122") && (<ScrollView>


                    {/* For uploading aadhar card docs */}
                    {DocumentUploader(aadharCard, setAadharCard, 2, document[0].PARAM_NAME, "imp")}

                    {/*  For uploading pan card docs  */}
                    {DocumentUploader(panCard, setPanCard, 2, document[1].PARAM_NAME, "imp")}

                    {/* For uploading payment slips docs*/}
                    {DocumentUploader(salarySlip, setSalarySlip, 3, document[2].PARAM_NAME)}


                </ScrollView>)
                }

                {document && (candidateStatusId >= "166" ) &&
                    (
                        <ScrollView>
                            {DocumentUploader(aadharCard, setAadharCard, 2, document[0], "imp")}
                            {DocumentUploader(panCard, setPanCard, 2, document[1], "imp")}
                            {DocumentUploader(salarySlip, setSalarySlip, 3, document[2])}


                            {otherFilesUploader(otherFiles, setOtherFiles, document[3], 0)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[4], 1)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[5], 2)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[6], 3)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[7], 4)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[8], 5)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[9], 6)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[10], 7)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[11], 8)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[12], 9)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[13], 10)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[14], 11)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[15], 12)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[16], 13)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[17], 14)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[18], 15)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[19], 16)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[20], 17)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[21], 18)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[22], 19)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[23], 20)}
                            {otherFilesUploader(otherFiles, setOtherFiles, document[24], 21)}
                        </ScrollView>
                    )
                }

                {(candidateStatusId === "121" || candidateStatusId > "166") && <TouchableOpacity onPress={() => saveDocs()} style={{ height: 40, backgroundColor: COLORS.MidGreen, margin: 12, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white' }}>Submit Documents</Text>
                </TouchableOpacity>}


            </View >


        </ScrollView >
    )


}

export default Candidate_Document