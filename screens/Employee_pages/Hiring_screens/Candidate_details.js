import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../constants/theme'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { candidateIcon } from '../../../assets'
import BottomUpModal from '../../../components/BottomUpModal'
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios'
import PieChart from 'react-native-pie-chart'

const Candidate_details = (props) => {
  const { resume, name, designation, interviewStartTime, interviewEndTime, date, status, candidateId, interviewId, interviewType, interviewMail } = props.route.params
  const [isVisible, setIsVisible] = useState(false)
  const [obtainedTechScoreValue, setObtainedTechScoreValue] = useState('');
  const [obtainedSpeakScoreValue, setObtainedSpeakScoreValue] = useState('');
  const [yourRemarks, setYourRemarks] = useState('');
  const [error, setError] = useState(false);
  const [feedback, setFeedback] = useState()

  const validateForm = () => {
    if (
      obtainedSpeakScoreValue === '' ||
      obtainedTechScoreValue === '' ||
      yourRemarks === ''
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
      return false;
    } else {
      return true;
    }
  };

  const onSelectPress = (operFlag) => {
    if (validateForm()) {
      axios
        .post(`https://econnectsatya.com:7033/api/hrms/interViewDeatils`, {
          candidateId: candidateId,
          feedbackStatus: 'S',
          intervierwerId: interviewMail,
          interviewId: interviewId,
          interviewType: interviewType,
          operFlag: operFlag,
          param: `Technical~5~${obtainedTechScoreValue}$Speaking~5~${obtainedSpeakScoreValue}`,
          remark: yourRemarks,
        })
        .then(response => {
          const returnedData = response?.data?.Result;
          console.log(returnedData);
          setIsVisible(false);
          ToastAndroid.show(returnedData[0].MSG, 3000);
        })
        .catch(error => {
          console.log(error.response.data.Message);
          ToastAndroid.show(error.response.data.Message, 3000);
        })
    }
  };

  // Feedback bottom Up modal
  const renderFeedbackModal = () => {
    return (
      <View>

        {/* feedback header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          <Text style={{ fontSize: 22, }}>Feedback Request</Text>
          {/* Close Button */}
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <Entypo name="cross" size={34} color="black" />
          </TouchableOpacity>
        </View>


        <View style={{ marginVertical: 12, }}>

          <View style={{ alignItems: 'center' }}>

            {/* Error */}
            {error && <Text style={styles.errorText}> All fields are required! </Text>}
            {/* Heading */}
            <Text style={{ fontSize: 18, color: COLORS.darkGray2, }}>Candidate Rating</Text>

          </View>

          {/* Feedback starts */}
          <View style={{ paddingVertical: 12 }}>

            <View style={styles.headers}>
              <Text style={{ color: COLORS.black }}>Your Rating</Text>
            </View>

            {/* Headers */}
            <View style={[styles.markingArea, { paddingVertical: 12, borderBottomWidth: 0.5, borderColor: COLORS.lightGray }]}>
              <Text>Category</Text>
              <Text>Maximum Score</Text>
              <Text>Obtained Score</Text>
            </View>

            {/* Technical Marking area */}
            <View style={styles.markingArea}>

              <Text>Technical</Text>
              <Text>5</Text>

              {/* Technical Marks */}
              <View style={styles.markingArea}>

                <TouchableOpacity onPress={() => setObtainedTechScoreValue(1)} style={[{ borderRadius: 10, backgroundColor: obtainedTechScoreValue === 1 ? COLORS.green : COLORS.white, },]}>

                  <Text style={{ paddingHorizontal: 7, color: obtainedTechScoreValue === 1 ? COLORS.white : COLORS.black, }}>1</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => setObtainedTechScoreValue(2)} style={[{ borderRadius: 10, backgroundColor: obtainedTechScoreValue === 2 ? COLORS.green : COLORS.white, },]}>

                  <Text style={{ paddingHorizontal: 7, color: obtainedTechScoreValue === 2 ? COLORS.white : COLORS.black, }}>2</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => setObtainedTechScoreValue(3)} style={[{ borderRadius: 10, backgroundColor: obtainedTechScoreValue === 3 ? COLORS.green : COLORS.white, },]}>

                  <Text style={{ paddingHorizontal: 7, color: obtainedTechScoreValue === 3 ? COLORS.white : COLORS.black, }}>3</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => setObtainedTechScoreValue(4)} style={[{ borderRadius: 10, backgroundColor: obtainedTechScoreValue === 4 ? COLORS.green : COLORS.white, },]}>

                  <Text style={{ paddingHorizontal: 7, color: obtainedTechScoreValue === 4 ? COLORS.white : COLORS.black, }}>4</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => setObtainedTechScoreValue(5)} style={[{ borderRadius: 10, backgroundColor: obtainedTechScoreValue === 5 ? COLORS.green : COLORS.white, },]}>

                  <Text style={{ paddingHorizontal: 7, color: obtainedTechScoreValue === 5 ? COLORS.white : COLORS.black, }}>5</Text>

                </TouchableOpacity>

              </View>

            </View>

            {/* Speaking Marking Area */}
            <View style={[styles.markingArea, { borderBottomWidth: 0.5, borderColor: COLORS.lightGray }]}>

              <Text>Speaking</Text>
              <Text>5</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <TouchableOpacity onPress={() => setObtainedSpeakScoreValue(1)} style={[{ borderRadius: 10, backgroundColor: obtainedSpeakScoreValue === 1 ? COLORS.green : COLORS.white }]}>

                  <Text style={{ paddingHorizontal: 7, color: obtainedSpeakScoreValue === 1 ? COLORS.white : COLORS.black, }}>1</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => setObtainedSpeakScoreValue(2)} style={[{ borderRadius: 10, backgroundColor: obtainedSpeakScoreValue === 2 ? COLORS.green : COLORS.white, },]}>

                  <Text style={{ paddingHorizontal: 7, color: obtainedSpeakScoreValue === 2 ? COLORS.white : COLORS.black, }}>2</Text>

                </TouchableOpacity>


                <TouchableOpacity onPress={() => setObtainedSpeakScoreValue(3)} style={[{ borderRadius: 10, backgroundColor: obtainedSpeakScoreValue === 3 ? COLORS.green : COLORS.white, },]}>

                  <Text style={{ paddingHorizontal: 7, color: obtainedSpeakScoreValue === 3 ? COLORS.white : COLORS.black, }}>3</Text>

                </TouchableOpacity>


                <TouchableOpacity onPress={() => setObtainedSpeakScoreValue(4)} style={[{ borderRadius: 10, backgroundColor: obtainedSpeakScoreValue === 4 ? COLORS.green : COLORS.white, },]}>

                  <Text style={{ paddingHorizontal: 7, color: obtainedSpeakScoreValue === 4 ? COLORS.white : COLORS.black, }}>4</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => setObtainedSpeakScoreValue(5)} style={[{ borderRadius: 10, backgroundColor: obtainedSpeakScoreValue === 5 ? COLORS.green : COLORS.white, },]}>

                  <Text style={{ paddingHorizontal: 7, color: obtainedSpeakScoreValue === 5 ? COLORS.white : COLORS.black, }}>5</Text>

                </TouchableOpacity>

              </View>

            </View>

            {/* Student Feedback */}
            <View style={{ marginVertical: 12 }}>
              <Text style={{ color: COLORS.black }}>Remarks</Text>

              <TextInput value={yourRemarks} onChangeText={text => setYourRemarks(text)} multiline placeholder="Your Feedback" style={{ marginVertical: 12, height: 70, paddingLeft: 24, borderWidth: 0.5, borderColor: COLORS.lightGray, borderRadius: 12, }} />

            </View>

            {/* Submit Buttons */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

              <TouchableOpacity onPress={() => {onSelectPress('A'), props.navigation.navigate('Interview_status')}} style={[styles.Elevation, styles.acceptanceButton, { backgroundColor: COLORS.lightGreen }]}>
                <Text style={{ color: COLORS.green, fontSize: 18, fontWeight: 600 }}>Select</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { onSelectPress('R'), props.navigation.navigate('Interview_status') }} style={[styles.Elevation, styles.acceptanceButton, { backgroundColor: COLORS.lightRed }]}>
                <Text style={{ color: COLORS.red, fontSize: 18, fontWeight: 600 }}>Reject</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    );
  };


  // For showing Feedback in case of Completed Interview
  const getFeedback = () => {
    axios
      .post(`https://econnectsatya.com:7033/api/hrms/interViewDeatils`, {
        candidateId: candidateId,
        operFlag: 'V',
      })
      .then(async response => {
        const returnedData = response?.data?.Result;
        // console.log(returnedData);
        setFeedback(returnedData[0]);
        // console.warn(returnedData[0]);
      })
      .catch(error => {
        console.log("error", error.response);
      });
  };

  useEffect(() => {
    { status === 'C' && getFeedback() }
  }, [])


  const Remarks = () => {
    return (
      <>

        <View style={{ flexDirection: 'row', marginHorizontal: 5, justifyContent: 'space-between' }}>

          <View style={styles.feedBackBox}>
            <Text style={styles.feedBackHeader}>Speaking Marks</Text>

            <PieChart widthAndHeight={120} series={[feedback?.Speaking_Obtained_Score, feedback?.Speaking_Maximum_Score - feedback?.Speaking_Obtained_Score]} sliceColor={['orange', 'white']} coverRadius={0.80} />

            <Text style={styles.score}>{feedback?.Speaking_Obtained_Score}/{feedback?.Speaking_Maximum_Score}</Text>
            <Text style={styles.scoreText}>Score</Text>

          </View>

          <View style={styles.feedBackBox}>
            <Text style={styles.feedBackHeader}>Technical Marks</Text>

            <PieChart widthAndHeight={120} series={[feedback?.Technical_Obtained_Score, feedback?.Technical_Maximum_Score - feedback?.Technical_Obtained_Score]} sliceColor={[COLORS.green, 'white']} coverRadius={0.80} />

            <Text style={styles.score}>{feedback?.Technical_Obtained_Score}/{feedback?.Technical_Maximum_Score}</Text>
            <Text style={styles.scoreText}>Score</Text>

          </View>

        </View>

        <View style={{ borderRadius: 12, marginVertical: 10, backgroundColor: COLORS.lightPink, justifyContent: 'center' }}>
          {feedback?.REMARK ? <Text style={{ padding: 10 }}> {feedback.REMARK} </Text> : null}
        </View>
      </>
    )
  }


  // Main component to return
  return (

    <View style={{ flex: 1, margin: 10, paddingHorizontal: 10, justifyContent: 'center' }}>

      {/* top icons */}
      <View style={styles.topIcon}>

        <View style={[{ backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30 }]}>
          <Icons name='phone-in-talk-outline' color={COLORS.white} size={40} />
        </View>

      </View>

      <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 5 }}>Interview Schedule</Text>

      {/* Minor details for candidate */}
      <View style={{ borderBottomWidth: 2, borderTopWidth: 2, borderColor: COLORS.skyBlue, paddingVertical: 10 }}>

        {/* Image and name */}
        <View style={{ flexDirection: 'row' }}>

          <View>
            <Image source={candidateIcon} style={{ height: 60, width: 60, borderRadius: 30 }} />
          </View>

          <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
            <Text style={{ color: 'black' }}>{name}</Text>
            <Text>{designation}</Text>
          </View>

        </View>


        {/* Interview Timings */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
          <Icons name='calendar-month-outline' color={COLORS.orange} size={30} />
          <Text style={{ marginHorizontal: 10 }}>{date}</Text>
          <Icons name='timetable' color={COLORS.orange} size={30} />
          <Text style={{ marginHorizontal: 10 }}>{interviewStartTime} - {interviewEndTime}</Text>
        </View>

        {/* Candidate Resume */}
        <TouchableOpacity style={styles.resumeArea} onPress={() => props.navigation.navigate('Candidate_Resume', { resume })}>
          <Icons name='file-document-outline' color={COLORS.orange} size={40} />
          <Text>{resume}</Text>
        </TouchableOpacity>
      </View>

      {/* button for feedback */}
      {status === 'P' ? <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Text style={styles.ButtonStyle}>Feedback</Text>
      </TouchableOpacity> : <Remarks />}

      {status === 'P' && isVisible && (
        <BottomUpModal
          isVisible={isVisible}
          onClose={() => {
            setIsVisible(false);
          }}
          visibleHeight={500}>
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
    padding: 10,
    marginHorizontal: 40,
    marginTop: 15,
    fontSize: 15,
    borderRadius: 20,
  },
  acceptanceButton: {
    height: 45,
    width: '48%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  markingArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  resumeArea: {
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    padding: 20,
    height: 100,
    borderRadius: 20
  },
  topIcon: {
    backgroundColor: COLORS.skyBlue,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 5
  },
  headers: {
    borderBottomWidth: 0.5,
    borderColor: COLORS.lightGray,
    paddingVertical: 12,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.darkRed,
    backgroundColor: COLORS.lightRed,
    paddingHorizontal: 12,
    borderRadius: 12
  },
  feedBackBox: {
    width: '48%',
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 10
  },
  feedBackHeader: {
    fontWeight: 500,
    fontSize: 16,
    paddingVertical: 5
  },
  score: {
    position: 'absolute',
    top: '60%',
    fontSize: 20,
    fontWeight: 600
  },
  scoreText: {
    position: 'absolute',
    top: '70%',
    fontSize: 20,
    fontWeight: 600
  }

})
export default Candidate_details