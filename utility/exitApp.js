import { BackHandler } from "react-native";
import { Alert } from "react-native";

export const backAction = () => {
  Alert.alert("Hold on!", "Are you sure you want to go back?", [
    {
      text: "Cancel",
      onPress: () => null,
      style: "cancel",
    },
    { text: "YES", onPress: () => BackHandler.exitApp() },
  ]);
  return true;
};
