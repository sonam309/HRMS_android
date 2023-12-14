import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { COLORS, FONTS } from "../../constants";

const Custombutton = ({
  title,
  extrasText,
  extrasContainer,
  iconName,
  onPress,
  color = "#fffff",
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.viewBtn,
        extrasContainer,
        {
          backgroundColor: color,
          borderColor: COLORS.lightGray,
          borderWidth: 1,
          borderRadius: 4,

          marginTop: 15,
          marginHorizontal: 25,
        },
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.txt, extrasText]}>{title}</Text>

        {Boolean(iconName) && (
          <AntDesign
            name={iconName}
            size={10}
            color={COLORS.orange1}
            style={{ paddingLeft: 5 }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Custombutton;

const styles = StyleSheet.create({
  viewBtn: {
    backgroundColor: COLORS.lightGray1,
    paddingVertical: 7,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: responsiveWidth(90),
    alignSelf: "center",
  },

  txt: {
    color: COLORS.gray, 
    alignSelf: "center",
    ...FONTS.h3,
    fontWeight: "500",
    // lineHeight: 36,
  },
});
