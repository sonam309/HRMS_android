import React, { useEffect, useMemo, useState } from "react";
import { Image, TouchableOpacity, View, ScrollView, Text } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import _ from "lodash";
import { useDispatch } from "react-redux";
import COLORS from '../../../constants/theme'
import { SIZES, FONTS } from '../../../constants/font_size'

const OPTIONS = ["A", "B", "C", "D"];

const QuestionItem = ({
    item,
    currentIndex,
    allQuestions,
    setAllQuestions,
    type,
}) => {
    const [selectAnswer, setSelectAnswer] = useState(null);


    const options = useMemo(() => {
        return OPTIONS.map((i) => item[i]);
    }, [currentIndex]);

    useMemo(() => {
        if (item?.selectedAnswer === "") {
            setSelectAnswer(null);
        } else {
            _.map(options, (opt, index) => {
                if (item.selectedAnswer == OPTIONS[index]) setSelectAnswer(index);
            });
        }
    }, [currentIndex]);

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

    return (
        <ScrollView>
            <View>

                <Text style={{ padding: 10, marginLeft: 15, marginTop: 10 }}>
                    {currentIndex + 1}/{allQuestions.length}
                </Text>
                <Text style={{ backgroundColor: COLORS.orange1, color: COLORS.white, ...FONTS.body5, width: responsiveWidth(25), borderRadius: 4, textAlign: 'center', marginLeft: 20 }}>
                    Question: {currentIndex + 1}
                </Text>

            </View>
            <View
                style={{
                    width: responsiveWidth(100),
                    alignItems: "center",
                    marginBottom: 80,
                }}
            >
                <View
                    style={{
                        padding: 10,
                        borderRadius: 5,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: COLORS.primary,
                                padding: 5,
                                paddingVertical: 5,
                                borderRadius: 4,
                            }}
                        >
                            <Text style={{ color: "#fff", fontWeight: "500", fontSize: 10 }}>
                                Questions
                            </Text>
                        </View>

                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            width: responsiveWidth(90),
                        }}
                    >
                        <View style={{ width: responsiveWidth(75), }}>
                            {item?.QUESTIONS && (
                                <Text style={{ paddingLeft: 10, paddingRight: 10, marginLeft: 10, color: COLORS.black, marginTop: 20 }}>{item?.QUESTIONS}</Text>
                            )}
                        </View>
                    </View>
                </View>
                <Text>{JSON.stringify(item)}</Text>
                <View
                    style={{
                        marginTop: 20,
                        width: responsiveWidth(100),
                        alignItems: "center",
                    }}
                >
                    {_.map(options, (item, index) => {
                        return (
                            <TouchableOpacity key={index} style={{
                                flexDirection: 'row', borderColor: COLORS.lightGray, borderRadius: SIZES.base, borderWidth: 0.5, marginLeft: 20,
                                padding: 8, marginRight: 20, height: responsiveHeight(10), marginTop: 15,
                                width: responsiveWidth(90),
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
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
};

export default QuestionItem;