import {View, Text, StyleSheet, Linking} from 'react-native';
import React, {useEffect} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import Navigation from '../../../navigation';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES} from '../../../constants';
import Header from '../../../components/Header';

const QRScanner = props => {
  const navigation = useNavigation();
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(codes);
      const valueParts = codes[0].value.split('/');
      const index = valueParts.indexOf('add-candidate-by-QR');
      const extractedValue = valueParts[index + 2];
      //   console.log(extractedValue); // Output: "7"

      navigation.navigate('CanidateSignup', {
        jobId: extractedValue,
      });
      //   Linking.openURL(codes[0].value);
    },
  });

  useEffect(() => {
    requestPermission();
  }, []);

  if (device == null) {
    return (
      <View>
        <Text>Device not found</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Header title={'Apply Job'} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.black,
        }}>
        <Text
          style={{
            color: COLORS.white,
            marginBottom: SIZES.padding * 2,
            fontWeight: '500',
            fontSize: 18,
          }}>
          Scan QR Code to Apply
        </Text>
        <Camera
          {...props}
          style={{
            height: 350,
            width: 350,
            alignSelf: 'center',
          }}
          device={device}
          codeScanner={codeScanner}
          isActive={true}
        />
      </View>
    </View>
  );
};

export default QRScanner;
