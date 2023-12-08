import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import {COLORS, FONTS, SIZES} from '../../constants/theme';
import AwesomeAlert from 'react-native-awesome-alerts';


const CustomAlert = ({messageStyle, titleStyle,showCancel=true, showConfirm=true, cancelButtonColor = COLORS.orange1, confirmButtonColor = COLORS.green, show, setShow, title, message, cancelTxt = "Cancel", confirmTxt = "Yes", onConfirmPressed = () => {

    setShow(false)

}, onCancelPressed = () => { setShow(false) } }) => {



    return (
        <View >
            <AwesomeAlert
                show={show}
                showProgress={false}
                title={title}
                message={message}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={showCancel}
                showConfirmButton={showConfirm}
                cancelText={cancelTxt}
                confirmText={confirmTxt}
                confirmButtonColor={confirmButtonColor}
                cancelButtonColor={cancelButtonColor}
                onCancelPressed={onCancelPressed}
                onConfirmPressed={onConfirmPressed}
                contentContainerStyle={{
                    borderRadius: SIZES.base,
                }}
                titleStyle={{
                    ...FONTS.h3,
                    color: COLORS.black,
                    alignSelf: "flex-start",
                    ...titleStyle
                }}
                messageStyle={{
                    ...FONTS.h4,
                    alignSelf: "flex-start",
                    marginLeft: 12,
                  ...messageStyle
                }}
                actionContainerStyle={{
                    alignSelf: "flex-end"
                }}
                confirmButtonStyle={{
                    minWidth: 65,
                    minHeight: 35,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base
                }}
                cancelButtonStyle={{
                    minWidth: 65,
                    minHeight: 35,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.base

                }}
            />
        </View>
    )
}

export default CustomAlert