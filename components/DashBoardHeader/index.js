import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants';

const DashBoardHeader = () => {
  const navigation = useNavigation();

  const {userId, userName} = useSelector(state => state.auth);
  const {currentLocation, punchTime, loading} = useSelector(
    state => state.punchDetail,
  );
  return (
    <SafeAreaView
      style={{
        height: 60,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        alignItems: 'center',
        width: '100%',
        elevation: 7,
        shadowColor: COLORS.green,
      }}>
      <TouchableOpacity
        style={{paddingHorizontal: 14}}
        onPress={() => navigation.openDrawer()}>
        <Icons name="reorder-horizontal" color={COLORS.green} size={25} />
      </TouchableOpacity>

      <View>
        <Text style={{fontWeight: '500', fontSize: 11}}>Welcome</Text>
        <Text style={{color: COLORS.orange, fontSize: 15}}>
          {userName?.length < 15
            ? `${userName}`
            : `${userName?.substring(0, 15)}...`}{' '}
        </Text>
        {currentLocation && (
          <Text style={{fontSize: 11, color: COLORS.black, fontWeight: '400'}}>
            {currentLocation?.length < 15
              ? `${currentLocation}`
              : `${currentLocation?.substring(0, 40)}...`}{' '}
          </Text>
        )}
      </View>

      <TouchableOpacity style={{position: 'absolute', right: 10}}>
        {/* <Icons name="bell-ring-outline" color={COLORS.green} size={30} /> */}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DashBoardHeader;
