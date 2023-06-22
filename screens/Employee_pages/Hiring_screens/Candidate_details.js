import { View, Text, TouchableOpacity, StyleSheet, Image,TextInput} from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../constants/theme'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { candidateIcon } from '../../../assets'
import BottomUpModal from '../../../components/BottomUpModal'
import Entypo from 'react-native-vector-icons/Entypo';

const Candidate_details = (props) => {
    const { resume, name, designation, interviewStartTime, interviewEndTime, date } = props.route.params
    const [isVisible, setIsVisible] = useState(false)
    const [obtainedTechScoreValue, setObtainedTechScoreValue] = useState('');
    const [obtainedSpeakScoreValue, setObtainedSpeakScoreValue] = useState('');
    const [remarks, setRemarks] = useState('');

    

    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [error, setError] = useState(false);
  
    const validateForm = () => {
      if (
        obtainedSpeakScoreValue === '' ||
        obtainedTechScoreValue === '' ||
        remarks === ''
      ) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
        return false;
      } else {
        return true;
      }
    };

    const onSelectPress = operFlag => {
        if (validateForm()) {
          axios
            .post(`http://192.168.1.169:7038/api/hrms/interViewDeatils`, {
              candidateId: InterviewDetail?.CANDIDATE_ID,
              feedbackStatus: 'S',
              intervierwerId: InterviewDetail?.INTERVIEW_MAIL,
              interviewId: InterviewDetail?.INTERVIEW_ID,
              interviewType: 'Face2Face',
              operFlag: operFlag,
              param: `Technical~5~${obtainedTechScoreValue}$Speaking~5~${obtainedSpeakScoreValue}`,
            })
            .then(async response => {
              console.log(response);
              const returnedData = response?.data?.Result;
              console.log(returnedData);
              setShowFeedbackModal(false);
              Toast.show({
                type: 'success',
                text1: returnedData[0].MSG,
              });
            })
            .catch(error => {
              console.log(error.response);
              // Toast.show({
              //   type: 'error',
              //   text1: JSON.stringify(error),
              // });
            });
        }
      };
    

    // feedback bottom up modal
    // const renderFeedbackModal = () => {
    //     return (
    //         <View>
    //             <View>
    //                 <Text>Hello</Text>
    //             </View>
    //             <View style={styles.footerDesign}>
    //                 {/* accept/reject buttons */}
    //                 <TouchableOpacity onPress={() => approveDetail()} style={[{ backgroundColor: COLORS.green }, styles.buttonStyle]}>
    //                     <Text style={{ color: COLORS.white, fontWeight: '600', }}> Approve </Text>
    //                 </TouchableOpacity>

    //                 <TouchableOpacity onPress={() => rejectDetail()} style={[{ backgroundColor: COLORS.red }, styles.buttonStyle]}>
    //                     <Text style={{ color: COLORS.white, fontWeight: '600', }}> Reject </Text>
    //                 </TouchableOpacity>

    //             </View>
    //         </View>
    //     )
    // }

    const renderFeedbackModal = () => {
        return (
          <View>
            <View style={{      flexDirection: 'row',      alignItems: 'center',      justifyContent: 'space-between',
              }}>
              <Text    style={{                  fontSize: 22,    }}>
                Feedback Request
              </Text>
              <TouchableOpacity onPress={() => setShowFeedbackModal(false)}>
                <Entypo name="cross" size={34} color="black" />
              </TouchableOpacity>
            </View>
    
            <View
              style={{
                marginVertical: 24,
              }}>
              <View style={{}}>
                {  (
                  <Text style={{        position: 'absolute',        fontSize: 12,        color: COLORS.red,        alignSelf: 'center',        top: -25,        backgroundColor: COLORS.disableRed,        paddingHorizontal:12,        borderRadius: 12,}}>
                    All fields are required!
                  </Text>
                )}
    
                <Text
                  style={{
                    fontSize: 18,
                    color: COLORS.darkGray2,
                  }}>
                  Your opinion matters Help us improve our product? Give us your
                  feedback.
                </Text>
              </View>
    
              <View
                style={{
                  marginVertical: 24,
                  paddingVertical: 12,
                  // borderColor: COLORS.lightGray,
                  // borderTopWidth: 0.5
                }}>
                <View style={{ borderBottomWidth: 0.5, borderColor: COLORS.lightGray, paddingBottom: 8,}}>
                  <Text
                    style={{
                      color: COLORS.voilet,
                      borderBottomWidth: 0.5,
                    }}>
                    Your Rating
                  </Text>
                </View>
    
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 12,
                    borderBottomWidth: 0.5,
                    borderColor: COLORS.lightGray,
                  }}>
                  <Text style={styles.titleTxt}>Categoary</Text>
                  <Text style={styles.titleTxt}>Maximum Score</Text>
                  <Text style={styles.titleTxt}>Obtained Score</Text>
                </View>
    
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical:12,
                    // borderBottomWidth: 0.5,
                    // borderColor: COLORS.lightGray
                  }}>
                  <Text style={styles.capTxt}>Technical</Text>
                  <Text style={styles.capTxt}>5</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => setObtainedTechScoreValue(1)}
                      style={[
                        styles.feedbackWrap,
                        {
                          backgroundColor:
                            obtainedTechScoreValue === 1
                              ? COLORS.green
                              : COLORS.white,
                        },
                      ]}>
                      <Text
                        style={{
                            borderRadius:10,
                            borderColor:COLORS.gray,
                          color:
                            obtainedTechScoreValue === 1
                              ? COLORS.white
                              : COLORS.black,
                        }}>
                        1
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setObtainedTechScoreValue(2)}
                      style={[
                        styles.feedbackWrap,
                        {
                          marginLeft: 8 / 2,
                          backgroundColor:
                            obtainedTechScoreValue === 2
                              ? COLORS.green
                              : COLORS.white,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            obtainedTechScoreValue === 2
                              ? COLORS.white
                              : COLORS.black,
                        }}>
                        2
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setObtainedTechScoreValue(3)}
                      style={[
                        styles.feedbackWrap,
                        {
                          marginLeft: 8 / 2,
                          backgroundColor:
                            obtainedTechScoreValue === 3
                              ? COLORS.green
                              : COLORS.white,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            obtainedTechScoreValue === 3
                              ? COLORS.white
                              : COLORS.black,
                        }}>
                        3
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setObtainedTechScoreValue(4)}
                      style={[
                        styles.feedbackWrap,
                        {
                          marginLeft:8 / 2,
                          backgroundColor:
                            obtainedTechScoreValue === 4
                              ? COLORS.green
                              : COLORS.white,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            obtainedTechScoreValue === 4
                              ? COLORS.white
                              : COLORS.black,
                        }}>
                        4
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setObtainedTechScoreValue(5)}
                      style={[
                        styles.feedbackWrap,
                        {
                          marginLeft: 8 / 2,
                          backgroundColor:
                            obtainedTechScoreValue === 5
                              ? COLORS.green
                              : COLORS.white,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            obtainedTechScoreValue === 5
                              ? COLORS.white
                              : COLORS.black,
                        }}>
                        5
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
    
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 12,
                    borderBottomWidth: 0.5,
                    borderColor: COLORS.lightGray,
                  }}>
                  <Text style={styles.capTxt}>Speaking</Text>
                  <Text style={styles.capTxt}>5</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => setObtainedSpeakScoreValue(1)}
                      style={[
                        styles.feedbackWrap,
                        {
                          backgroundColor:
                            obtainedSpeakScoreValue === 1
                              ? COLORS.green
                              : COLORS.white,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            obtainedSpeakScoreValue === 1
                              ? COLORS.white
                              : COLORS.black,
                        }}>
                        1
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setObtainedSpeakScoreValue(2)}
                      style={[
                        styles.feedbackWrap,
                        {
                          marginLeft: 8 / 2,
                          backgroundColor:
                            obtainedSpeakScoreValue === 2
                              ? COLORS.green
                              : COLORS.white,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            obtainedSpeakScoreValue === 2
                              ? COLORS.white
                              : COLORS.black,
                        }}>
                        2
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setObtainedSpeakScoreValue(3)}
                      style={[
                        styles.feedbackWrap,
                        {
                          marginLeft: 8 / 2,
                          backgroundColor:
                            obtainedSpeakScoreValue === 3
                              ? COLORS.green
                              : COLORS.white,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            obtainedSpeakScoreValue === 3
                              ? COLORS.white
                              : COLORS.black,
                        }}>
                        3
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setObtainedSpeakScoreValue(4)}
                      style={[
                        styles.feedbackWrap,
                        {
                          marginLeft: 8 / 2,
                          backgroundColor:
                            obtainedSpeakScoreValue === 4
                              ? COLORS.green
                              : COLORS.white,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            obtainedSpeakScoreValue === 4
                              ? COLORS.white
                              : COLORS.black,
                        }}>
                        4
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setObtainedSpeakScoreValue(5)}
                      style={[
                        styles.feedbackWrap,
                        {
                          marginLeft: 8 / 2,
                          backgroundColor:
                            obtainedSpeakScoreValue === 5
                              ? COLORS.green
                              : COLORS.white,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            obtainedSpeakScoreValue === 5
                              ? COLORS.white
                              : COLORS.black,
                        }}>
                        5
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
    
                <View
                  style={{
                    marginVertical:12,
                  }}>
                  <Text style={[styles.titleTxt, {color: COLORS.black}]}>
                    What could we improve?
                  </Text>
                  <TextInput
                    value={remarks}
                    onChangeText={text => setRemarks(text)}
                    multiline
                    placeholder="your message"
                    style={{
                      marginVertical:12,
                      height: 70,
                      paddingLeft: 24,
                      borderWidth: 0.5,
                      borderColor: COLORS.lightGray,
                      borderRadius: 12,
                    }}
                  />
                </View>
    
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => onSelectPress('S')}
                    style={[
                      styles.Elevation,
                      {
                        backgroundColor: COLORS.disableGreen,
                        height: 45,
                        width: '48%',
                        borderRadius:24,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    <Text
                      style={{
                        color: COLORS.green,
                        fontSize: 16,
                      }}>
                      Select
                    </Text>
                  </TouchableOpacity>
    
                  <TouchableOpacity
                    onPress={() => onSelectPress('R')}
                    style={[
                      styles.Elevation,
                      {
                        backgroundColor: COLORS.disableRed,
                        height: 45,
                        width: '48%',
                        borderRadius:24,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    <Text
                      style={{
                        color: COLORS.red,
                        fontSize: 16,
                      }}>
                      Reject
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
      };

    return (

        <View style={{ flex: 1, margin: 10, paddingHorizontal: 10, justifyContent: 'center' }}>

            {/* top icons */}
            <View style={[{ backgroundColor: COLORS.skyBlue, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', width: 80, height: 80, borderRadius: 40, marginVertical: 5 }]}>

                <View style={[{ backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30 }]}>
                    <Icons name='phone-in-talk-outline' color={COLORS.white} size={40} />
                </View>

            </View>
            <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 5 }}>Interview Schedule</Text>

            {/* Minor details for candidate */}
            <View style={{ borderBottomWidth: 2, borderTopWidth: 2, borderColor: COLORS.skyBlue, paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Image source={candidateIcon} style={{ height: 60, width: 60, borderRadius: 30 }} />
                    </View>
                    <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                        <Text style={{ color: 'black' }}>{name}</Text>
                        <Text>{designation}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }}>
                    <Icons name='calendar-month-outline' color={COLORS.orange} size={30} />
                    <Text style={{ marginHorizontal: 10 }}>{date}</Text>
                    <Icons name='timetable' color={COLORS.orange} size={30} />
                    <Text style={{ marginHorizontal: 10 }}>{interviewStartTime} - {interviewEndTime}</Text>
                </View>

                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center',overflow:'hidden', alignItems: 'center', backgroundColor: COLORS.lightGray, padding: 20, height: 100, borderRadius: 20 }} onPress={() => props.navigation.navigate('Candidate_Resume', { resume })}>
                    <Icons name='file-document-outline' color={COLORS.orange} size={40} />
                    <Text>{resume}</Text>
                </TouchableOpacity>
            </View>

            {/* button for feedback */}
            <TouchableOpacity onPress={() => setIsVisible(true)}>
                <Text style={styles.ButtonStyle}>Feedback</Text>
            </TouchableOpacity>

            {isVisible && (
                <BottomUpModal
                    isVisible={isVisible}
                    onClose={() => {
                        setIsVisible(false);
                    }}
                    visibleHieght={550}>
                    {renderFeedbackModal()}
                </BottomUpModal>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    ButtonStyle: {
        textAlign: 'center',
        backgroundColor: COLORS.voilet,
        color: COLORS.white,
        padding: 6,
        marginHorizontal: 60,
        marginTop: 15,
        fontSize: 15,
        borderRadius: 20,
    },
    acceptanceButton: {
        flex: 1,
        borderRadius: 20,
        marginHorizontal: 5
    },
    footerDesign: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        height: 80,
        backgroundColor: COLORS.white,
        justifyContent: 'center'
    },
    buttonStyle: {
        padding: 12,
        marginLeft: 24,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})
export default Candidate_details