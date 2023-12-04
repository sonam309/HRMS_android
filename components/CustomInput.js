import { View, Text, TextInput } from 'react-native';
import React from 'react';
import COLORS from '../constants/theme';
import { SIZES,FONTS } from '../constants/font_size';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomInput = ({

    required,
    caption,
    value,
    onChangeText,
    keyboardType,
    secureTextEntry,
    icon,
    isPasswordInput,
    returnKeyType="default",
    maxlength,
    textInputStyle,
    editable
}) => {
    return (
        <>
            {!isPasswordInput ? (
                <View
                    style={{
                        marginVertical: SIZES.base,
                    }}>
                    <Text
                        style={{
                            marginVertical: SIZES.base / 2,
                            ...FONTS.h4,
                            color:COLORS.black,
                            ...textInputStyle,
                        }}>
                        {caption} {required && <Text style={{ color: COLORS.red }}>*</Text>}
                    </Text>
                    <TextInput
                        placeholder={caption}
                        returnKeyType={returnKeyType}
                        value={value}
                        onChangeText={onChangeText}
                        style={{
                            borderColor: COLORS.lightGray,
                            borderWidth: 0.5,
                            paddingLeft:10,
                            // padding: SIZES.radius * 1.3,
                            height: 45,
                            borderRadius: SIZES.base,
                            ...textInputStyle
                        }}
                        keyboardType={keyboardType}
                        secureTextEntry={secureTextEntry}
                        maxLength={maxlength}
                        editable={editable}

                    />
                    {icon}
                </View>
            ) : (
                <View
                    style={{marginVertical: SIZES.base,}}>
                    <Text
                        style={{
                            marginVertical: SIZES.base / 2,
                            ...FONTS.h4,
                            color:COLORS.black,
                           
                        }}>
                        {caption} {required && <Text style={{ color: COLORS.red }}>*</Text>}
                    </Text>
                    <View style={{
                        borderColor: COLORS.lightGray,
                        borderWidth: 0.5,
                        // padding: SIZES.radius * 1.3,
                        borderRadius: SIZES.base,
                        flexDirection: "row",
                        alignItems: "center",
                        height: 45,
                       paddingHorizontal:10,
                        justifyContent: "space-between",

                    }}>
                        <TextInput
                            placeholder={caption}
                            value={value}
                            onChangeText={onChangeText}
                            style={{
                                justifyContent: "center",
                                ...textInputStyle

                            }}
                            keyboardType={keyboardType}
                            secureTextEntry={secureTextEntry}
                        />
                        {icon}
                    </View>
                </View>
            )}
        </>
    );
};

export default CustomInput;