import { View, Text, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../constants/theme'
import { FONTS, SIZES } from '../../../constants/font_size'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Candidate_Document = (props) => {

    const [aadharCard, setAadharCard] = useState([]);


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

    const selectDoc = async setFileUpload => {
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
            //   setFileUpload({
            //     name: `newJob${getFormattedTimestamp()}${generateRandomString()}.${
            //       doc[0].type.split('/')[1]
            //     }`,
            //     type: doc[0].type,
            //     uri: doc[0].uri,
            //   });
            setFileUpload(current => [
                ...current,
                {
                    name: `newJob${getFormattedTimestamp()}${generateRandomString()}.${doc[0].type.split('/')[1]
                        }`,
                    type: doc[0].type,
                    uri: doc[0].uri,
                },
            ]);
        } catch (error) {
            // Alert.alert('Error in picking doc', error);
            console.log(error);
            // Toast.show({
            //   type: 'error',
            //   text1: JSON.stringify(error),
            // });
        }
    };

    const onRemovePress = (index,setFileUpload, fileUpload)  => {
        // setFileUpload({});
        setFileUpload([
            ...fileUpload.slice(0, index),
            ...fileUpload.slice(index + 1)
          ]);
    };

    const renderHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row', paddingVertical: SIZES.base, paddingHorizontal: SIZES.radius, borderColor: COLORS.transparentGray,
                    backgroundColor: COLORS.white, elevation: 10, shadowColor: COLORS.orange1,
                    shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.1, shadowRadius: 7,
                }}>
                <Pressable onPress={() => props.navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.black} />
                </Pressable>
                <Text
                    style={{ ...FONTS.h3, alignSelf: 'center', color: COLORS.black, marginLeft: '36%', }}>
                    Document
                </Text>
            </View>
        );
    };

    return (
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
            {renderHeader()}

            {/* documnet count */}
            <View style={{ marginTop: 10 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 2, width: '100%' }}>

                    <View style={{ backgroundColor: COLORS.white, padding: 8, borderRadius: 8, elevation: 8, flexDirection: 'row', alignItems: 'center', width: '45%', height: 70 }}>
                        <Icon name="file-document-multiple-outline" size={40} color={COLORS.orange1} backgroundColor={COLORS.disableOrange1} style={{ borderRadius: 6, padding: 4, marginLeft: 8 }} />
                        <View style={{ marginLeft: 10, }}>
                            <Text style={{ color: COLORS.black, ...FONTS.h5, fontSize: 14, }}>Documents</Text>
                            <Text style={{ color: COLORS.gray, ...FONTS.body5, marginTop: -8 }}>3 files</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: COLORS.white, padding: 8, borderRadius: 8, elevation: 8, flexDirection: 'row', alignItems: 'center', width: '45%', height: 70 }}>
                        <Ionicons name="ios-cloud-upload-outline" size={40} color={COLORS.orange1} backgroundColor={COLORS.disableOrange1} style={{ borderRadius: 6, padding: 4, marginLeft: 8 }} />
                        <View style={{ marginLeft: 10, }}>
                            <Text style={{ color: COLORS.black, ...FONTS.h5, fontSize: 14, }}>Uploaded</Text>
                            <Text style={{ color: COLORS.gray, ...FONTS.body5, marginTop: -8 }}>3 files</Text>
                        </View>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 2, width: '100%', marginTop: 10 }}>

                    <View style={{ backgroundColor: COLORS.white, padding: 8, borderRadius: 8, elevation: 8, flexDirection: 'row', alignItems: 'center', width: '45%', height: 70 }}>
                        <Icon name="check-decagram-outline" size={40} color={COLORS.orange1} backgroundColor={COLORS.disableOrange1} style={{ borderRadius: 6, padding: 4, marginLeft: 8 }} />
                        <View style={{ marginLeft: 10, }}>
                            <Text style={{ color: COLORS.black, ...FONTS.h5, fontSize: 14, }}>Verified</Text>
                            <Text style={{ color: COLORS.gray, ...FONTS.body5, marginTop: -8 }}>3 files</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: COLORS.white, padding: 8, borderRadius: 8, elevation: 8, flexDirection: 'row', alignItems: 'center', width: '45%', height: 70 }}>
                        <Ionicons name="close" size={40} color={COLORS.orange1} backgroundColor={COLORS.disableOrange1} style={{ borderRadius: 6, padding: 4, marginLeft: 8 }} />
                        <View style={{ marginLeft: 10, }}>
                            <Text style={{ color: COLORS.black, ...FONTS.h5, fontSize: 14, }}>Rejected</Text>
                            <Text style={{ color: COLORS.gray, ...FONTS.body5, marginTop: -8 }}>3 files</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* upload document view */}
            <View
                style={{ backgroundColor: COLORS.white, marginVertical: SIZES.body5, padding: SIZES.radius, borderRadius: SIZES.radius, borderBottomWidth: 0.5, borderColor: COLORS.lightGray, marginBottom: SIZES.radius, }}>
                <Text style={{ ...FONTS.h3, color: COLORS.black }}>
                    Upload your documents
                </Text>

                <Text style={{ ...FONTS.body4, marginTop: 8, color: COLORS.gray }}>
                    File size should be less than 10MB
                </Text>
                <Text style={{ ...FONTS.body5, color: COLORS.gray }}>
                    JPG, JPEG, PNG, DOC, DOCX, PDF only
                </Text>
                <View >

                    <Text style={{ ...FONTS.body4, alignItems: 'center', color: COLORS.gray }}>
                        <Text style={{ color: COLORS.red, }}>
                            *
                        </Text>
                        Marked Documents are mandatory
                    </Text>
                </View>
            </View>

            {/* image upload view */}

            <View
                style={{
                    // marginVertical: SIZES.radius,
                    // borderColor: COLORS.lightGray,
                    // borderWidth: 0.5,
                    padding: SIZES.base,
                    borderRadius: SIZES.radius,
                   
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginHorizontal:SIZES.base
                        //   paddingVertical: SIZES.base
                    }}>
                    <Text
                        style={{
                            ...FONTS.h4,
                            color: COLORS.darkGray2,
                        }}>
                        Name
                    </Text>
                    {/* <Text
                        style={{
                            ...FONTS.h4,
                            color: COLORS.darkGray2,
                        }}>
                        Uploaded file
                    </Text> */}
                    <Text
                        style={{
                            ...FONTS.h4,
                            color: COLORS.darkGray2,
                        }}>
                        Actions
                    </Text>
                </View>

                <ScrollView>
                    {/* {/ aadhar card /} */}

                    <TouchableOpacity
                        // onPress={() => selectDoc(setAadharCard)}
                        style={{
                            marginTop: SIZES.base,
                            elevation:6,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.radius,
                            marginVertical: SIZES.base,
                            padding: SIZES.base,
                            marginHorizontal:SIZES.base/4,
                        }}>
                        <View
                            style={{
                                paddingVertical: SIZES.radius,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <Text>Aadhar card</Text>

                            <TouchableOpacity onPress={() => selectDoc(setAadharCard)}>
                                <Ionicons
                                    name="add-circle-outline"
                                    size={24}
                                    color={COLORS.green}
                                />
                            </TouchableOpacity>
                        </View>
                        {aadharCard.length > 0 &&
                            aadharCard.map((aadhar, index) => (
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
                                    <Text>{aadhar.name.slice(10, aadhar.name.length)}</Text>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}>
                                        <TouchableOpacity>
                                            <Ionicons
                                                name="eye"
                                                size={24}
                                                color={COLORS.green}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{
                                            marginLeft: SIZES.base
                                        }}onPress={()=>onRemovePress(index,setAadharCard, aadharCard)}
                                        >
                                            <MaterialIcons
                                                name="delete-outline"
                                                size={24}
                                                color={COLORS.orange1}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                    </TouchableOpacity>

                    {/*  pan card  */}
                    <View
                        style={{
                            marginTop: SIZES.base,
                           elevation:6
                        }}>
                        <View
                            style={{
                                marginVertical: SIZES.base,
                                padding: SIZES.base,
                                paddingVertical: SIZES.radius,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: COLORS.white,
                                borderRadius: SIZES.radius,
                            }}>
                            <Text>Pan card</Text>
                            <View>
                                <Text> dummy.pdf</Text>
                            </View>
                            <TouchableOpacity>
                                <MaterialIcons
                                    name="highlight-remove"
                                    size={24}
                                    color={COLORS.red}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>


        </View>
    )



}



export default Candidate_Document