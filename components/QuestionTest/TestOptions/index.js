import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useMemo } from 'react'
import COLORS from '../../../constants/theme'
import { SIZES } from '../../../constants/font_size'
import { responsiveHeight } from 'react-native-responsive-dimensions'

const TestOptions = ({
    key,
    item,
    OPTIONS,
    index,
    allQuestions,
    setAllQuestions,
    currentIndex,
    currentQuestion
}) => {

    const [selectAnswer, setSelectAnswer] = useState(null);


    const onSubmitSelectedData = (index) => {
        const prevAllQuestions = [...allQuestions];
        prevAllQuestions[currentIndex] = {
            ...prevAllQuestions[currentIndex],
            selectedAnswer: OPTIONS[index],
        };
        setAllQuestions(prevAllQuestions);
    };

    const onSubmitData = (i) => {
        setSelectAnswer(i);
        onSubmitSelectedData(i);
    };

    useMemo(() => {
        if (item?.selectedAnswer === "") {
            setSelectAnswer(null);
        } else {
            //   _.map(options, (opt, index) => {
            //     if (item.answer == OPTIONS[index]) setSelectAnswer(index);
            //   });
            if (currentQuestion.selectedAnswer == OPTIONS[index]) setSelectAnswer(index)
        }
    }, [currentIndex]);

    return (
        <TouchableOpacity key={key} style={{
            flexDirection: 'row', borderColor: COLORS.lightGray, borderRadius: SIZES.base, borderWidth: 0.5, marginLeft: 20,
            padding: 8, marginRight: 20, height: responsiveHeight(10), marginTop: 15,
            backgroundColor: selectAnswer == index ? COLORS.disableOrange1 : "#fff"
        }}

            onPress={() => onSubmitData(index)}
        >

            <Text style={{ textAlign: 'center', textAlignVertical: 'center', marginLeft: 10 }}>
                {OPTIONS[index]} <Text style={{ color: COLORS.lightGray }}> | </Text> {item}
            </Text>
            {/* <Text style={{ textAlign: 'center', textAlignVertical: 'center', marginLeft: 10, color: COLORS.lightGray }}>
                |
            </Text>
            <Text style={{ textAlign: 'center', textAlignVertical: 'center', marginLeft: 10 }}>
                Thresing.
            </Text> */}


        </TouchableOpacity>
    )
}

export default TestOptions