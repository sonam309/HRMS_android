import {View, Text, StyleSheet, Modal, Pressable, Platform} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../../constants';
import {LinearGradientRedButton} from '../../components';
import Custombutton from '../CustomButton';

const LogoutModal = ({logoutModal, setLogoutModal, onLogout}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const onLogout = async () => {
  //   try {
  //     setLogoutModal(false);
  //     onPress();
  //   } catch (error) {
  //     console.log('Logout', error);
  //   }
  // };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModal}
        onRequestClose={() => {
          setLogoutModal(!logoutModal);
        }}>
        <Pressable
          onPress={() => setLogoutModal(!logoutModal)}
          style={[styles.centeredViewSelect]}>
          <View style={styles.modalViewSelect}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#8885',
                alignItems: 'center',
              }}>
              <View
                style={{
                  //   flex: 1,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    width: responsiveWidth(90),
                    paddingVertical: 20,
                    borderColor: COLORS.lightGray,
                  }}>
                  <Text
                    style={{
                      ...FONTS.h2,
                      // fontWeight: '500',
                    }}>
                    Logout?
                  </Text>
                </View>
                <Text
                  style={{
                   ...FONTS.h3,
                    // width: responsiveWidth(80),
                    marginBottom: 10,
                    marginTop: 20,
                    color: COLORS.gray,
                  }}>
                  Are you sure want to log out?
                </Text>
                <View>
                  <LinearGradientRedButton
                    linearGradientStyle={styles.linearGrad}
                    btnTextHere={'Logout'}
                    btnTextStyle={styles.btnText}
                    onPress={onLogout}
                  />
                  {/* <LinearGradientDisabledButton
                    linearGradientStyle={[
                      styles.linearGrad,
                      { backgroundColor: "#F9F9F9" },
                    ]}
                    btnTextHere={"Cancel"}
                    btnTextStyle={styles.btnText}
                    onPress={() => setLogoutModal(!logoutModal)}
                  /> */}
                  <Custombutton
                    color="white"
                    title="Cancel"
                    onPress={() => setLogoutModal(!logoutModal)}
                    btnTextStyle={{fontSize: 16}}
                  />
                </View>
                {/* <TouchableOpacity onPress={() => navigation.navigate("ChangeMpin")} style={{ marginTop: 10, }}>
        <Text
          style={{
            color: color.primary,
            fontSize: 13,
            fontFamily: fontFamily.Regular,
          }}>
          Change mPin?
        </Text></TouchableOpacity> */}
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default LogoutModal;

export const styles = StyleSheet.create({
  centeredViewSelect: {
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#8888',
  },
  modalViewSelect: {
    backgroundColor: 'white',
    shadowColor: '#000',
    elevation: 5,
    width: '100%',
  },
  inputText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginVertical: 7,
    width: responsiveWidth(100),
    height: 55,
    borderWidth: 1,
  },
  linearBtn: {
    borderRadius: 50,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnText: {
    fontSize: 14,
  },
  inputMessage: {
    width: responsiveWidth(85),
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 25,
  },
  fieldStyle: {
    height: '100%',
    borderRadius: 8,
    borderWidth: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  additional: {
    marginBottom: 20,
  },
  buttonText: {
    ...FONTS.h2B,
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    // fontFamily: fontFamily.Medium,
  },
  label: {
    ...FONTS.h3,
    fontWeight: '500',
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    // fontFamily: fontFamily.Medium,
  },
  linearGrad: {
    alignSelf: 'center',
    width: responsiveWidth(90),
    height: 55,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    ...FONTS.h3,
  },
});
