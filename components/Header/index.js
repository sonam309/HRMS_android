import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants';


const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        elevation: 6,
        backgroundColor: COLORS.white,
        padding: 15,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icons
          name="arrow-left"
          size={28}
          color={COLORS.black}
          style={{alignSelf: 'center'}}
          verticalAlign={'center'}
        />
      </TouchableOpacity>
      <Text
        style={{
          ...FONTS.body3,
          fontSize: 17,
          color: COLORS.black,
          verticalAlign: 'middle',
          marginLeft: 20,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default Header;
