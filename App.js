import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigation/StackNav/AuthNavigator';
import messaging from '@react-native-firebase/messaging';
import {Alert, Platform, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomisableAlert from 'react-native-customisable-alert';
import { getStatusBarHeight } from 'react-native-status-bar-height';


const App = () => {

  async function getNewFCMToken() {
    let fcmToken = await AsyncStorage.getItem('FCMToken');
    if (!fcmToken) {
      try {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
          AsyncStorage.setItem('FCMToken', fcmToken);
        }
      } catch (error) {}
    }
  }

  const statusBar = Platform.systemName === "" ? getStatusBarHeight(true)*2 : getStatusBarHeight(true);


  async function requestPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getNewFCMToken();
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestPermission();
      const otherOne = messaging().setBackgroundMessageHandler(
        async remoteMessage => {},
      );
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert(
          JSON.stringify(remoteMessage?.notification?.title),
          JSON.stringify(remoteMessage?.notification?.body),
        );
      });
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1,marginTop: getStatusBarHeight(true)}}>

     
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
   
      <Toast position="top" bottomOffset={20} />
      <CustomisableAlert
        titleStyle={{
          fontSize: 18,
          fontWeight: 'bold',
        }}
      />
    </SafeAreaView>
  );
};

export default App;
