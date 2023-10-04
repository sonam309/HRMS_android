import Toast from "react-native-toast-message"


export const showDevelopmetMode = () => {
    Toast.show({
        type: "info",
        text1: "This feature is in development phase"
      })
}