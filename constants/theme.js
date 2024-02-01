import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  voilet: 'rgb(34,0,70)',
  lighterVoilet: 'rgba(34,0,70,0.8)',
  pink: '#e10092',
  lightPink: '#fcbdbd',
  white: '#ffffff',
  green: '#03a157',
  disableGreen: 'rgba(93, 176, 97,0.1)',
  disableRed: 'rgba(222, 111, 109, 0.1)',
  darkRed: '#960202',
  orange: '#ec672f',
  lightGray: '#e6e1e1',
  lightRed: '#FDEDEC',
  gray: 'gray',
  skyBlue: '#87CEEB',
  lightBlue: '#5DADE2',
  lightGreen: '#D5F5E3',
  red: '#E74C3C',
  MidGreen: '#28B463',
  darkGreen: '#27AE60',
  black: 'black',
  darkerGrey: '#526D82',
  lightestGreen: '#ECFFDC',
  transparentViolet: 'rgba(34,0,70,0.1)',
  bg_tile_Colo: '#F5EEF8',
  lightYellow: '#fff494',
  transparentVoilet: 'rgba(34, 0, 70, 0.1)',
  purple: '#9376E0',
  hyperlinkBlue: '#3366CC',
  lightOrange: '#F79540',
  leafGreen: 'rgba(87, 153, 12, 1)',
  orange1: 'rgb(255,102,0)',
  disableOrange1: 'rgba(255,102,0, 0.1)',
  disableOrange: 'rgba(243,102,0,)',
  gray: 'gray',
  skyBlue: '#87CEEB',
  lightGreen: '#88C385',
  black: 'black',
  darkGray: '#838383',
  darkGray2: 'rgba(105, 104, 104, 1)',
  lightGray: 'rgba(105, 104, 104, 0.3)',
  lightGray1: '#DDDDDD',
  lightGray2: '#F5F5F8',
  levender: 'rgba(198, 203, 239, 1)',
  transparent: 'transparent',
  transparentBlack1: 'rgba(0, 0, 0, 0.1)',
  transparentBlack7: 'rgba(0, 0, 0, 0.7)',
  transparentGray: 'rgba(150, 150, 150, 0.3)',
  transparentRed: 'rgba(255,0,0, 0.1)',
  transparentVoilet: 'rgba(3, 161, 87, 0.1)',
};

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
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
