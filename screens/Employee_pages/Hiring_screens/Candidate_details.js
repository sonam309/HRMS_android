import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../constants/theme'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { candidateIcon } from '../../../assets'
import BottomUpModal from '../../../components/BottomUpModal'
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios'
import PieChart from 'react-native-pie-chart'
import { FONTS } from '../../../constants/font_size'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { API } from '../../../utility/services'
import { useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';


const Candidate_details = (props) => {
  const { resume, name, designation, interviewStartTime, interviewEndTime, date, status, candidateId, interviewId, interviewType, interviewMail } = props.route.params
  const dispatch = useDispatch();
    const route = useRoute();
  const [isVisible, setIsVisible] = useState(false)
  const [obtainedTechScoreValue, setObtainedTechScoreValue] = useState("");
  const [obtainedSpeakScoreValue, setObtainedSpeakScoreValue] = useState("");
  const [yourRemarks, setYourRemarks] = useState("");
  const [error, setError] = useState(false);
  const [feedback, setFeedback] = useState("")
  const {userId}=useSelector(state=>state.auth);
  

  console.log("candidateId", candidateId);
  console.log("interviewId", interviewId);
  console.log("interviewType", interviewType);
  console.log("interviewMail", interviewMail);
  console.log("resume", resume);
  console.log("UserID",userId);
  let theInterviewType = "";
  let theInterviewId = "";

  if (interviewType) {
    theInterviewType = interviewType
  }
  if (interviewId) {
    theInterviewId = interviewId
  }

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

  const onSelectPress = async (operFlag) => {
    if (validateForm()) {

      // let res = await fetch(`${API}/api/hrms/interViewDeatils`, {
      let res = await fetch(`http://192.168.1.169:7038/api/hrms/interViewDeatils`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId: candidateId,
          feedbackStatus: 'S',
          intervierwerId: interviewMail,
          interviewId: theInterviewId,
          interviewType: theInterviewType,
          operFlag: operFlag,
          interviewEmpCode:userId,
          param: `Technical~5~${obtainedTechScoreValue}$Speaking~5~${obtainedSpeakScoreValue}`,
          remark: yourRemarks
        }),
        
      })
      console.log("dfghj",theInterviewType);

      res = await res.json()
      res = res.Result[0]
      ToastAndroid.show(res.MSG, 3000)
      if(res.FLAG === "S"){
        props.navigation.navigate("Interview_status")
      }
      console.log("response", res)


    }
  };

  // Feedback bottom Up modal
  const renderFeedbackModal = () => {
    return (
      <View>

        {/* feedback header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          <Text style={{ ...FONTS.h5, fontSize: 20, color: COLORS.black }}>Feedback Request</Text>
          {/* Close Button */}
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <Entypo name="cross" size={34} color="black" />
          </TouchableOpacity>
        </View>


        <View style={{ marginVertical: 12, }}>

          <View style={{}}>

            {/* Error */}
            {error && <Text style={styles.errorText}> All fields are required! </Text>}
            {/* Heading */}
            <Text style={{ ...FONTS.h4, color: COLORS.green, fontSize: 16 }}>Candidate Rating</Text>

          </View>

          {/* Feedback starts */}
          <View style={{ paddingVertical: 12 }}>

            <View style={styles.headers}>
              {/* <Text style={{ color: COLORS.black }}>Your Rating</Text> */}
            </View>

            {/* Headers */}
            <View style={[styles.markingArea, { paddingVertical: 12, borderBottomWidth: 0.5, borderColor: COLORS.lightGray }]}>
              <Text style={{ ...FONTS.h4, color: Colors.darkGray2 }}>Category</Text>
              <Text style={{ ...FONTS.h4, color: Colors.darkGray2 }}>Maximum Score</Text>
              <Text style={{ ...FONTS.h4, color: Colors.darkGray2 }}>Obtained Score</Text>
            </View>

            {/* Technical Marking area */}
            <View style={styles.markingArea}>

              <Text style={{ ...FONTS.h4, color: Colors.darkGray2 }}>Technical</Text>
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

              <Text style={{ ...FONTS.h4, color: Colors.darkGray2 }}>Speaking</Text>
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
              <Text style={{ color: COLORS.black, ...FONTS.h4, }}>Remarks</Text>

              <TextInput value={yourRemarks} onChangeText={text => setYourRemarks(text)} multiline placeholder="Your Feedback" style={{ marginVertical: 12, height: 70, paddingLeft: 24, borderWidth: 0.5, borderColor: COLORS.lightGray, borderRadius: 12, }} />

            </View>

            {/* Submit Buttons */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

              <TouchableOpacity onPress={() => { onSelectPress('A') }} style={[styles.Elevation, styles.acceptanceButton, { backgroundColor: COLORS.disableGreen, borderColor: COLORS.green, borderWidth: 0.5 }]}>
                <Text style={{ color: COLORS.green, fontSize: 18, fontWeight: 600 }}>Select</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { onSelectPress('R') }} style={[styles.Elevation, styles.acceptanceButton, { backgroundColor: COLORS.disableOrange1, borderColor: COLORS.orange1, borderWidth: 0.5 }]}>
                <Text style={{ color: COLORS.orange, fontSize: 18, fontWeight: 600 }}>Reject</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    );
  };


  // For showing Feedback in case of Completed Interview
  const getFeedback = async () => {
    let res = await fetch(`${API}/api/hrms/interViewDeatils`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ operFlag: "V", candidateId: candidateId }),
    })

    res = await res.json()
    res = res.Result[0]
    setFeedback(res)
    console.log("response", res)

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
          <Icons name='phone-in-talk-outline' color={COLORS.white} size={30} />
        </View>

      </View>

      <Text style={{ textAlign: 'center', ...FONTS.h4, fontSize: 15, marginVertical: 5, marginTop: 10 }}>Interview Schedule</Text>

      {/* Minor details for candidate */}
      <View style={{ borderBottomWidth: 1, borderTopWidth: 1, marginTop: 10, borderColor: COLORS.lightGray, paddingVertical: 10 }}>

        {/* Image and name */}
        <View style={{ flexDirection: 'row' }}>

          <View>
            <Image source={candidateIcon} style={{ height: 60, width: 60, borderRadius: 30 }} />
          </View>

          <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
            <Text style={{ color: COLORS.green, ...FONTS.h5, fontSize: 17 }}>{name}</Text>
            <Text style={{ ...FONTS.h4 }}>{designation}</Text>
          </View>

        </View>


        {/* Interview Timings */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, marginHorizontal: 15 }}>
          <Icons name='calendar-month-outline' color={COLORS.darkGray2} size={30} />
          <Text style={{ marginHorizontal: 6, color: COLORS.darkGray2, ...FONTS.h5 }}>{date}</Text>
          <Icons name='timetable' color={COLORS.darkGray2} size={25} />
          <Text style={{ marginHorizontal: 10 }}>{interviewStartTime} - {interviewEndTime}</Text>
        </View>

        {/* Candidate Resume */}
        <TouchableOpacity style={styles.resumeArea} onPress={() => props.navigation.navigate('Candidate_Resume', { resume })}>
          <Icons name='file-document-outline' color={COLORS.orange} size={25} />
          <Text style={{ color: COLORS.darkGray2, marginHorizontal: 8, ...FONTS.h4 }}>{resume}</Text>
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
    backgroundColor: COLORS.green,
    color: COLORS.white,
    padding: 10,
    marginHorizontal: 40,
    marginTop: 25,
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
    marginBottom: 20,
    marginTop: 20,
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
    backgroundColor: COLORS.disableGreen,
    borderColor: COLORS.green,
    borderWidth: 0.5,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 10
  },
  feedBackHeader: {
    fontWeight: 500,
    fontSize: 16,
    color: COLORS.green,
    marginBottom: 10,
    paddingVertical: 5
  },
  score: {
    position: 'absolute',
    top: '60%',
    ...FONTS.h3,
    color: COLORS.orange1,
    fontWeight: 500
  },
  scoreText: {
    position: 'absolute',
    top: '70%',
    ...FONTS.h3,
    color: COLORS.orange1,
    fontWeight: 500
  }

})
export default Candidate_details