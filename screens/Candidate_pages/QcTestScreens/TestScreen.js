import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState, useMemo } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions, saveAttemptTest } from '../../../redux/eSignSlice';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import _ from "lodash"
import QuestionItem from './QuestionItem';
import { COLORS, FONTS, SIZES } from '../../../constants';



const TestScreen = (props) => {

  const dispatch = useDispatch();
  const { candidateId } = useSelector(state => state.candidateAuth)

  const { questionList, saveTestResult,testResultLoading } = useSelector(state => state.eSign)
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const currentQuestion = allQuestions[currentIndex];



  useEffect(() => {

    console.log("hit question data")
    const data = {
      operFlag: "Q",
      candidateId: candidateId,
      txnId: ''
    }

    dispatch(getQuestions(data))

  }, [])


  useMemo(() => {

    if (saveTestResult?.FLAG === "S" && saveTestResult?.MSG !== "") {
      Toast.show({
        type: 'success',
        text1: saveTestResult?.MSG
      })
      props.navigation.navigate("TestResult")

    } else if (saveTestResult?.FLAG === "F" && saveTestResult?.MSG !== "")

      Toast.show({
        type: 'error',
        text1: saveTestResult?.MSG
      })

    // props.navigation.navigate("TestResult")4
  },
    [saveTestResult])


  useMemo(() => {
    if (questionList && questionList?.length > 0) {

      const InitalItems = questionList;


      setAllQuestions(
        _.map(InitalItems, (evvv) => ({
          ...evvv,
          selectedAnswer: "",
        }))


      );

    }

  }, [questionList]);

  const onNext = () => {
    if (currentQuestion.selectedAnswer !== "") {
      setCurrentIndex(currentIndex + 1);
    } else {

      Toast.show({
        type: 'error',
        text1: 'Please select an option'
      })

    }
  }

  const onPrrvious = () => {
    setCurrentIndex(currentIndex - 1);
  }

  // NEXT QUESTION BUTTON
  const renderNextButton = () => {
    return (
      <TouchableOpacity onPress={() => onNext()}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 0 }}
          colors={[COLORS.leafGreen, COLORS.green]}
          style={[styles.prevButtonWrapper, { justifyContent: "flex-end" }]}
        >
          <Text
            style={{
              // fontFamily: fontFamily.Medium,
              fontSize: 15,
              color: "#fff",
              marginRight: 40
            }}
          >
            Next
          </Text>
          {/* <Image source={iconsLink.lef} style={{ tintColor: "#fff" }} /> */}
          <Icons name="arrow-right" size={24} color={COLORS.white} />

        </LinearGradient>
      </TouchableOpacity>
    );
  };

  // PREVIOUS QUESTION BUTTON
  const renderPrevButton = () => {
    return (
      <TouchableOpacity
        style={[styles.prevButtonWrapper, { maxWidth: responsiveWidth(42) }]}
        onPress={() => onPrrvious()}
      >
        {/* <Image
        source={iconsLink.lef}
        style={{ tintColor: COLORS.darkBlue, transform: [{ scaleX: -1 }] }}
      /> */}
        <Icons name="arrow-left" size={24} color={COLORS.black} />
        <Text
          style={{
            // fontFamily: fontFamily.Medium,
            fontSize: 15,
            color: COLORS.black,
          }}
        >
          Previous
        </Text>
      </TouchableOpacity>
    );
  };

  // DONE SUBMIT
  const renderDoneButton = () => {
    return (
      <TouchableOpacity onPress={() => onSubmitTest()}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 0 }}
          colors={[COLORS.orange1, COLORS.disableOrange1]}
          style={styles.prevButtonWrapper}
        >
         {testResultLoading ? 
         <ActivityIndicator color={COLORS.white} />
         : 
         <>
         <Text
            style={{
              // fontFamily: fontFamily.Medium,
              fontSize: 15,
              color: "#fff",
            }}
          >
            Submit
          </Text>
          <Icons name="arrow-right" size={24} color={COLORS.white} />
          </>
          }
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const onSubmitTest = () => {

    let finalData = '';

    _.map(allQuestions, (item, index) => {
      if (index + 1 === allQuestions.length) {
        finalData += `${item.QUES_NO},${item.selectedAnswer}`
      } else {
        finalData += `${item.QUES_NO},${item.selectedAnswer}$`
      }
    })


    const saveData = {
      txnId: '',
      userId: candidateId,
      candidateId: candidateId,
      param: finalData,
      operFlag: 'A'
    }

    // console.log("saveData",saveData);

    dispatch(saveAttemptTest(saveData))



    // console.log("finalDataSubmit", finalData);


  }


  return (

    <View style={{
      flex: 1,
      backgroundColor: COLORS.white,

    }}>

      {/* Top headerView */}
      <View style={{ width: '100%', flexDirection: 'row', elevation: 6, backgroundColor: COLORS.white, padding: 15 }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} >
          <Icons name="arrow-left" size={28} color={COLORS.black} style={{ alignSelf: 'center', }} verticalAlign={'center'} />
        </TouchableOpacity>
        <Text style={{ ...FONTS.body3, fontSize: 17, color: COLORS.black, verticalAlign: 'middle', marginLeft: 20 }}>Test</Text>
      </View>
      {loaderVisible ? (<View style={{ alignItems: 'center', marginTop: '30%', }}>
        <ActivityIndicator color={COLORS.orange1} />
        <Text style={{ ...FONTS.h3, fontWeight: '500', color: COLORS.orange1, marginTop: SIZES.base, }}>
          Loading your details
        </Text>
      </View>
      ) :
        <View style={{
          flex: 15
        }}>
          <View style={{
            flex: 1,
          }}>
            {/* <Text>{JSON.stringify(saveTestResult)}</Text> */}

            {/* <ScrollView style={{
              flex: 1,
              width: responsiveWidth(90),
              alignSelf: "center",
              paddingBottom: 80,

            }}>



              <Text style={{ padding: 10, marginLeft: 15, marginTop: 10 }}>
                {currentIndex + 1}/{questionList.length}
              </Text>
              <Text style={{ backgroundColor: COLORS.orange1, color: COLORS.white, ...FONTS.body5, width: responsiveWidth(25), borderRadius: 4, textAlign: 'center', margin: 20 }}>
                Question: {currentIndex + 1}
              </Text>
              <Text style={{ paddingLeft: 10, paddingRight: 10, marginLeft: 10, color: COLORS.black, marginTop: 20 }}>
                {currentQuestion?.QUESTIONS}

              </Text>

              <View style={{ marginTop: 20, paddingBottom: 20 }}>
            
                {_.map(options, (item, index) => {
                  return (
              
                    <TouchableOpacity key={index} style={{
                      flexDirection: 'row', borderColor: COLORS.lightGray, borderRadius: SIZES.base, borderWidth: 0.5, marginLeft: 20,
                      padding: 8, marginRight: 20, height: responsiveHeight(10), marginTop: 15,
                      backgroundColor: selectAnswer == index ? COLORS.disableOrange1 : "#fff"
                    }}

                      onPress={() => onSubmitData(index)}
                    >

                      <Text style={{ textAlign: 'center', textAlignVertical: 'center', marginLeft: 10 }}>
                        {OPTIONS[index]} <Text style={{ color: COLORS.lightGray }}> | </Text> {item}
                      </Text>
                  


                    </TouchableOpacity>
                  )
                })}

              </View>




            </ScrollView> */}
            {currentQuestion && <QuestionItem
              item={currentQuestion}
              currentIndex={currentIndex}
              allQuestions={allQuestions}
              setAllQuestions={setAllQuestions}
            />}
          </View>


          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 12,
              gap: 50,
              height: 70,
              alignSelf: currentIndex === 0 ? "flex-end" : "flex-start",
            }}
          >
            {currentIndex > 0 && renderPrevButton()}
            {currentIndex + 1 < questionList.length &&
              renderNextButton()}
            {currentIndex + 1 === questionList.length &&
              renderDoneButton()}
          </View>
        </View>
      }



    </View>
  )
}

export default TestScreen

const styles = StyleSheet.create({
  prevButtonWrapper: {
    flex: 1,
    width: responsiveWidth(42),
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 4,
    marginLeft: 0,
    backgroundColor: "#F0F0F0",
    overflow: 'hidden'

  },
})