import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import EntryStackNav from './navigation/StackNav/EntryStackNav';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  async function getNewFCMToken() {
    let fcmToken = await AsyncStorage.getItem('FCMToken');
    // console.warn("old one", fcmToken)

    if (!fcmToken) {

      try {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
          // console.warn("new one", fcmToken)
          AsyncStorage.setItem('FCMToken', fcmToken);
        }
      } catch (error) {
        console.log("error fetching FCM token")
      }

    }
  }

  async function requestPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getNewFCMToken()
    }
  }

  useEffect(() => {
    requestPermission();
    const otherOne = messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(JSON.stringify(remoteMessage?.notification?.title), JSON.stringify(remoteMessage?.notification?.body));
      console.log(JSON.stringify(remoteMessage));
    });

    // return {unsubscribe, otherOne};
  }, []);

  return (
    <NavigationContainer>
      <EntryStackNav />
    </NavigationContainer>
  );
}

export default App;