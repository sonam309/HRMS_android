import { View, Text, Pressable } from 'react-native'
import React from 'react'
import COLORS from '../../../constants/theme'
import { FONTS, SIZES } from '../../../constants/font_size'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



const Candidate_Document = ({ navigation }) => {




    const renderHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    paddingVertical: SIZES.base,
                    paddingHorizontal: SIZES.radius,
                    borderColor: COLORS.transparentGray,
                    backgroundColor: COLORS.white,
                    elevation: 10,
                    shadowColor: COLORS.orange1,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 7,
                }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.black} />
                </Pressable>
                <Text
                    style={{
                        ...FONTS.h3,
                        alignSelf: 'center',
                        color: COLORS.black,
                        marginLeft: '36%',
                    }}>
                    Document
                </Text>
            </View>
        );
    };

    return (
        <View>
            {renderHeader()}

            {/* documnet count */}
            <View style={{ flexDirection:'row',marginTop:10,flexWrap:'wrap'}}>
                <View style={{backgroundColor:COLORS.white,padding:10, borderRadius:8,elevation:8,flexDirection:'row',alignItems:'center',width:'35%',height:50}}>
                    <Icon name="file-document-multiple-outline" size={35} color={COLORS.orange1} />
                    <View style={{marginLeft:10, }}>
                        <Text style={{color: COLORS.black, ...FONTS.h5,fontSize:14, }}>Documents</Text>
                        <Text style={{color: COLORS.black, ...FONTS.body5,marginTop:-8 }}>3 files</Text>
                    </View>
                </View>

                <View style={{backgroundColor:COLORS.white,padding:10, borderRadius:8,elevation:8,flex:1,flexDirection:'row',alignItems:'center',width:'35%',height:50}}>
                    <Icon name="file-document-multiple-outline" size={35} color={COLORS.orange1} />
                    <View style={{marginLeft:10, }}>
                        <Text style={{color: COLORS.black, ...FONTS.h5,fontSize:14, }}>Documents</Text>
                        <Text style={{color: COLORS.black, ...FONTS.body5,marginTop:-8 }}>3 files</Text>
                    </View>
                </View>

                <View style={{backgroundColor:COLORS.white,padding:10, borderRadius:8,elevation:8,flex:1,flexDirection:'row',alignItems:'center',width:'35%',height:50}}>
                    <Icon name="file-document-multiple-outline" size={35} color={COLORS.orange1} />
                    <View style={{marginLeft:10, }}>
                        <Text style={{color: COLORS.black, ...FONTS.h5,fontSize:14, }}>Documents</Text>
                        <Text style={{color: COLORS.black, ...FONTS.body5,marginTop:-8 }}>3 files</Text>
                    </View>
                </View>

                <View style={{backgroundColor:COLORS.white,padding:10, borderRadius:8,elevation:8,flex:1,flexDirection:'row',alignItems:'center',width:'35%',height:50}}>
                    <Icon name="file-document-multiple-outline" size={35} color={COLORS.orange1} />
                    <View style={{marginLeft:10, }}>
                        <Text style={{color: COLORS.black, ...FONTS.h5,fontSize:14, }}>Documents</Text>
                        <Text style={{color: COLORS.black, ...FONTS.body5,marginTop:-8 }}>3 files</Text>
                    </View>
                </View>
                
            </View>
            {/* upload document view */}
            {/* <Text style={{ color: COLORS.black, ...FONTS.h4, margin: 15 }}>

                Upload Your Documents
            </Text> */}

        </View>
    )



}



export default Candidate_Document