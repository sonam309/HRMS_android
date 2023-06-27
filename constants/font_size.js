import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
  
    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 12,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,
  
    // app dimensions
    width,
    height,
  };
  
  export const FONTS = {
    largeTitle: {fontFamily: 'Ubuntu-Black', fontSize: SIZES.largeTitle},
    h1: {fontFamily: 'Ubuntu-Bold', fontSize: SIZES.h1, lineHeight: 36},
    h2: {fontFamily: 'Ubuntu-Bold', fontSize: SIZES.h2, lineHeight: 30},
    h2B: {fontFamily: 'Ubuntu-Bold', fontSize: SIZES.h2B, lineHeight: 22},
    h3: {
      fontFamily: 'Ubuntu-Regular',
      fontSize: SIZES.h3,
      lineHeight: 22,
      fontWeight: '700',
    },
    h4: {
      fontFamily: 'Ubuntu-Regular',
      fontSize: SIZES.h4,
      lineHeight: 22,
      fontWeight: '700',
    },
    h5: {
      fontFamily: 'Ubuntu-Regular',
      fontSize: SIZES.h5,
      lineHeight: 22,
      fontWeight: '700',
    },
    body1: {fontFamily: 'Ubuntu-Regular', fontSize: SIZES.body1, lineHeight: 36},
    body2: {fontFamily: 'Ubuntu-Regular', fontSize: SIZES.body2, lineHeight: 30},
    body3: {fontFamily: 'Ubuntu-Regular', fontSize: SIZES.body3, lineHeight: 22},
    body4: {fontFamily: 'Ubuntu-Regular', fontSize: SIZES.body4, lineHeight: 22},
    body5: {fontFamily: 'Ubuntu-Regular', fontSize: SIZES.body5, lineHeight: 22},
    body1: {fontFamily: 'Ubuntu-Regular', fontSize: SIZES.body1, lineHeight: 36},
}