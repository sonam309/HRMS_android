import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Entry_logo, company_logo} from '../../assets';
import COLORS from '../../constants/theme';
import {FONTS} from '../../constants/font_size';
import {useSelector} from 'react-redux';

const Entry_page = props => {
  const {userId, userName} = useSelector(state => state.auth);

  let page = null;

  const setEmployee = async () => {
    await AsyncStorage.setItem('type', 'employee');
  };
  const setCandidate = async () => {
    await AsyncStorage.setItem('type', 'candidate');
  };
  const getType = async () => {
    page = await AsyncStorage.getItem('type');

    {
      page &&
        (page === 'employee'
          ? props.navigation.navigate('Employee_Login')
          : props.navigation.navigate('Candidate_Login'));
    }
  };
  useEffect(() => {
    getType();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      {/* Company Logo */}
      <View style={{flex: 2}}>
        <Image
          source={company_logo}
          style={{marginTop: 30, width: '100%', height: '100%'}}
        />
      </View>
      {/* Middle Image */}
      <View style={{flex: 4}}>
        <Image
          resizeMode="contain"
          source={Entry_logo}
          style={{marginTop: 30, width: '100%', height: '100%'}}
        />
      </View>

      {/* Options */}
      <View style={{flex: 3, justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Employee_Login'), setEmployee();
          }}
          style={[
            styles.loginButton,
            styles.elevation,
            {backgroundColor: COLORS.green},
          ]}>
          <Text style={[styles.loginButtonText]}>Employee</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Candidate_Login'), setCandidate();
          }}
          style={[
            styles.loginButton,
            styles.elevation,
            {backgroundColor: COLORS.orange1},
          ]}>
          <Text style={[styles.loginButtonText]}>Candidate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  elevation: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7,
  },
  loginButton: {
    marginHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  loginButtonText: {
    color: 'white',
    ...FONTS.h4,
  },
});

export default Entry_page;
