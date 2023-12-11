import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigation/StackNav/AuthNavigator';
import messaging from '@react-native-firebase/messaging';
import {Alert, Platform, StatusBar, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomAlert from './components/CustomAlert';
import CustomisableAlert from 'react-native-customisable-alert';
import 'react-native-gesture-handler';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Orientation from 'react-native-orientation-locker';

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
      <SafeAreaView style={{flex: 1}}>
      
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
