import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator,BackHandler } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveAttemptTest } from '../../../redux/eSignSlice';
import COLORS from '../../../constants/theme';
import { FONTS, SIZES } from '../../../constants/font_size';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from "lodash"
import LinearGradient from 'react-native-linear-gradient';

const OPTIONS = ["A", "B", "C", "D"];


const TestResult = (props) => {

    const dispatch = useDispatch();
    const { candidateId, candidateName, candidateRole } = useSelector(state => state.candidateAuth)
    const { testResultLoading,saveTestResult } = useSelector(state => state.eSign)

    // const options = useMemo(() => {
    //     return OPTIONS.map((i) => item[i]);
    // }, [currentIndex]);



    useEffect(() => {

        const saveData = {
            txnId: '',
            userId: candidateId,
            candidateId: candidateId,
            param: '',
            operFlag: 'V'
        }

        dispatch(saveAttemptTest(saveData))

    }, [])

    useEffect(() => {
        const backAction = () => {
         props.navigation?.navigate("CandidateDashboard");
          return true;
        };
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
        return () => backHandler.remove();
      }, []);

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#fff"
        }}>

            {/* Top headerView */}
            <View style={{ width: '100%', flexDirection: 'row', elevation: 6, backgroundColor: COLORS.white, padding: 15 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate("CandidateDashboard")} >
                    <Icons name="arrow-left" size={28} color={COLORS.black} style={{ alignSelf: 'center', }} verticalAlign={'center'} />
                </TouchableOpacity>
                <Text style={{ ...FONTS.body3, fontSize: 17, color: COLORS.black, verticalAlign: 'middle', marginLeft: 20 }}>Result</Text>
            </View>

            { testResultLoading ?
            
            <View style={{
                alignItems: "center",
                marginTop: responsiveHeight(25)
            }}> 
                <ActivityIndicator color={COLORS.orange1} />
                <Text>Loading your data...</Text>

            </View>
            : Object.keys(saveTestResult).length > 2 &&
                <>
                    {/* main view of header */}
                    <View style={{ borderWidth: 0.5, borderColor: COLORS.gray, borderRadius: 2, width: responsiveWidth(92), alignSelf: "center", marginTop: 15 }}>

                        <View style={{ flexDirection: 'row', borderWidth: 0.5, borderColor: COLORS.gray, borderRadius: 2, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, }}>
                            <Text style={{ color: COLORS.black, ...FONTS.h4, marginLeft: 10 }}>
                                Id:- {candidateId}
                            </Text>

                            <Text style={{ color: COLORS.black, ...FONTS.h4 }}>
                                Name:- {candidateName}
                            </Text>
                            <Text style={{ color: COLORS.black, ...FONTS.h4, marginRight: 10 }}>
                                Post:- {candidateRole}
                            </Text>

                        </View>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            marginRight: 10,
                            marginHorizontal: 5,
                            padding: 10
                        }}>
                            <View>
                                <View style={{
                                    alignItems: "center",
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{ color: COLORS.black, ...FONTS.h4 }}>Total Question: </Text>
                                    <Text style={{ color: COLORS.darkGray2, ...FONTS.h5 }}>{saveTestResult?.Table[0]?.TOTAL}</Text>
                                </View>

                                <View style={{
                                    alignItems: "center",
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{ color: COLORS.black, ...FONTS.h4 }}>Result: </Text>
                                    <Text style={{ color: COLORS.darkGray2, ...FONTS.h5 }}>{saveTestResult?.Table[0]?.TEST_RESULT}</Text>
                                </View>
                            </View>

                            <View>
                                <View style={{
                                    alignItems: "center",
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{ color: COLORS.black, ...FONTS.h4 }}>Correct Answer: </Text>
                                    <Text style={{ color: COLORS.darkGray2, ...FONTS.h5 }}>{saveTestResult?.Table[0]?.CORRECT_ANSWER}</Text>
                                </View>
                                <View style={{
                                    alignItems: "center",
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{ color: COLORS.black, ...FONTS.h4 }}>Wrong Answer: </Text>
                                    <Text style={{ color: COLORS.darkGray2, ...FONTS.h5 }}>{saveTestResult?.Table[0]?.WRONG_ANSWER}</Text>
                                </View>
                            </View>

                        </View>

                    </View>


                    {/* scroll view of result data */}

                    <ScrollView style={{ flex: 1, marginTop: 10, width: responsiveWidth(97), alignSelf: 'center' }}>

                        {_.map(saveTestResult?.Table1, (item, index) => {
                            return (<View key={index} style={{ borderColor: COLORS.gray, borderWidth: 0.5, borderRadius: 2,  padding: 15, margin: 10,backgroundColor:'#f9f9f9'}}>

                                <Text style={{ backgroundColor: COLORS.orange1, color: COLORS.white, ...FONTS.body5, width: responsiveWidth(25), borderRadius: 4, textAlign: 'center', marginLeft: 20 }}>
                                    Question:{item?.QUES_NO}
                                </Text>
                                <Text style={{ color: COLORS.black, ...FONTS.body4, borderRadius: 4, marginLeft: 20, marginTop: 10, }}>
                                    {item?.QUESTIONS}
                                </Text>

                                {OPTIONS.map((i, index) => {
                                    return <Text style={{ marginLeft: 20 }} key={index}>{i}.  {item[i]}</Text>
                                })}
                                <View style={{
                                    marginLeft: 15,
                                    marginTop: 20
                                }}>

                                    <LinearGradient style={{padding:8, borderRadius: 4,}}
                                     start={{ x: 0, y: 0 }}
                                     end={{ x: 2, y: 0 }}
                                     colors={[COLORS.leafGreen,COLORS.green]}>

                                        <Text style={{color:COLORS.white,...FONTS.h5, marginLeft:5}} >
                                            Correct Answer is: {item?.CORRECT_ANSWER}
                                        </Text>
                                    </LinearGradient>

                                    <LinearGradient style={{padding:8, borderRadius: 4,marginTop:10}}
                                     start={{ x: 0, y: 0 }}
                                     end={{ x: 1, y: 0 }}
                                     colors={[COLORS.darkGray2,COLORS.lightGray]}>

                                        <Text style={{color:COLORS.white,...FONTS.h5, marginLeft:5}} >
                                            Candidate Answer is: {item?.CANDIDATE_ANSWER}
                                        </Text>
                                    </LinearGradient>


                                </View>
                            </View>)
                        })}

                    </ScrollView>
                </>

            }
        </View>
    )
}

export default TestResult