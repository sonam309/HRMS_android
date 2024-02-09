import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const LocationBottomUpModal = ({onPress, locationData,selectLocation,setSelectLocation}) => {

  const LocationsView = ({item}) => {
    return (
      <ScrollView contentContainerStyle={{marginTop: 10, marginBottom: 5}}>
        <TouchableOpacity
          onPress={() => {
            setSelectLocation(item.LOCATION_ID);
            onPress();
          }}
          style={{
            borderColor:
              selectLocation == item.LOCATION_ID ? COLORS.orange1 : COLORS.gray,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.base,
            justifyContent: 'center',
            padding: 8,
            borderWidth: 0.5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}>
            <View>
              <Text style={{color: COLORS.black, ...FONTS.h3, fontSize: 14}}>
                Branch Name
              </Text>
              <Text
                style={{color: COLORS.gray, ...FONTS.h5, textAlign: 'center'}}>
                {item.BRANCH_NAME}
              </Text>
            </View>
            <View>
              <Text style={{color: COLORS.black, ...FONTS.h3, fontSize: 14}}>
                Branch ID
              </Text>
              <Text
                style={{color: COLORS.gray, ...FONTS.h5, textAlign: 'center'}}>
                {item.LOCATION_ID}
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.body5,
              padding: 8,
              lineHeight: 17,
            }}>
            {item.LOCATION}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: COLORS.orange1, ...FONTS.h4, fontSize: 20}}>
          Locations
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Icon name="close-circle-outline" size={28} color={COLORS.orange} />
        </TouchableOpacity>
      </View>
      <View>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={{color: COLORS.black, ...FONTS.body4}}>
            Location Name
          </Text>
          <Text>Branch Name</Text>
          <Text>Branch ID</Text>
        </View> */}
        {locationData &&
          _.map(locationData, (item, index) => {
            return <LocationsView item={item} key={index} />;
          })}
      </View>
    </View>
  );
};

export default LocationBottomUpModal;
