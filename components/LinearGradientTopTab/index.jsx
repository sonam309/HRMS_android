/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {COLORS, FONTS} from '../../constants';

const LinearGradientTopTab = ({
  arrayList,
  selected,
  setSelected,
  tabContainerExtras,
  LinearStyle,
}) => {
  const onChangeTab = value => {
    setSelected(value);
  };

  return (
    <View style={{width: responsiveWidth(90), alignSelf: 'center'}}>
      <View style={styles.toptabContainer}>
        {_.map(arrayList, (item, key) => {
          return (
            <View
              style={[
                styles.toptabSingleContainr,
                {
                  width: `${100 / arrayList?.length}%`,
                  alignSelf: 'center',
                  justifyContent: 'center',
                },
                tabContainerExtras,
              ]}
              key={key}>
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => onChangeTab(item)}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={
                    selected == item
                      ? [COLORS?.green, COLORS.leafGreen]
                      : ['#F0F0F4', '#F0F0F4']
                  }
                  style={[styles.tabTabList, LinearStyle]}>
                  <Text
                    style={[
                      styles.tabText,
                      {color: selected == item ? '#fff' : '#67696C'},
                    ]}>
                    {item}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default LinearGradientTopTab;

const styles = StyleSheet.create({
  toptabContainer: {
    height: 52,
    backgroundColor: '#F0F0F4',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  toptabSingleContainr: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  tabTabList: {
    height: 36,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  tabText: {
    ...FONTS.h4,
    fontWeight: '500',
    lineHeight: 18,
    paddingVertical: 2,
    // marginTop: 2,

    textTransform: 'capitalize',
  },
});
