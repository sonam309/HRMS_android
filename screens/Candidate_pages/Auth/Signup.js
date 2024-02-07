import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../../constants';
import Header from '../../../components/Header';
import TextDropdown from '../../../components/TextDropdown';
import FormInput from '../../../components/FormInput';
import DateButton from '../../../components/DateButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import WebView from 'react-native-webview';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import {esignIcon} from '../../../assets';
import {icons} from '../../../constants';
import axios from 'axios';
import {API} from '../../../utility/services';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useNavigation} from '@react-navigation/native';

const Signup = ({route, params}) => {
  const navigation = useNavigation();


  // dropdown data starts
  const postTitleData = [
    {
      PARAM_NAME: '--Select Post--',
      PARAM_ID: 0,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 401,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 402,
    },
    {
      PARAM_NAME: 'Asst.Vice President',
      PARAM_ID: 411,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 413,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 419,
    },
    {
      PARAM_NAME: 'Managing Director, CEO, CIO',
      PARAM_ID: 421,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 422,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 423,
    },
    {
      PARAM_NAME: 'Area Manager',
      PARAM_ID: 424,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 431,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 435,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 439,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 445,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 503,
    },
    {
      PARAM_NAME: 'Sr.Manager',
      PARAM_ID: 407,
    },
    {
      PARAM_NAME: 'Area Manager',
      PARAM_ID: 408,
    },
    {
      PARAM_NAME: 'Area Manager',
      PARAM_ID: 417,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 427,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 436,
    },
    {
      PARAM_NAME: 'Branch Operation Officer',
      PARAM_ID: 440,
    },
    {
      PARAM_NAME: 'Typist',
      PARAM_ID: 442,
    },
    {
      PARAM_NAME: 'Audit Officer',
      PARAM_ID: 623,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 405,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 414,
    },
    {
      PARAM_NAME: 'Data Protection Officer',
      PARAM_ID: 432,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 437,
    },
    {
      PARAM_NAME: 'Executive',
      PARAM_ID: 444,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 446,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 456,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 461,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 462,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 472,
    },
    {
      PARAM_NAME: 'Business Head',
      PARAM_ID: 399,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 448,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 453,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 459,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 464,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 465,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 397,
    },
    {
      PARAM_NAME: 'Software Engineer',
      PARAM_ID: 398,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 420,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 430,
    },
    {
      PARAM_NAME: 'Branch Executive',
      PARAM_ID: 705,
    },
    {
      PARAM_NAME: 'Branch Executive',
      PARAM_ID: 708,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 711,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 712,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 410,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 426,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 452,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 455,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 457,
    },
    {
      PARAM_NAME: 'Audit Officer',
      PARAM_ID: 443,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 450,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 403,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 404,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 406,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 412,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 416,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 418,
    },
    {
      PARAM_NAME: 'Area Manager',
      PARAM_ID: 425,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 429,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 447,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 449,
    },
    {
      PARAM_NAME: 'Manager',
      PARAM_ID: 636,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 400,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 415,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 454,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 458,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 460,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 428,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 434,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 451,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 463,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 466,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 467,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 468,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 647,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 474,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 478,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 469,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 470,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 473,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 475,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 476,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 477,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 479,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 480,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 481,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 496,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 482,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 504,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 505,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 483,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 484,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 485,
    },
    {
      PARAM_NAME: 'Branch Manager',
      PARAM_ID: 486,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 494,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 499,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 501,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 487,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 490,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 491,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 498,
    },
    {
      PARAM_NAME: 'Branch Manager',
      PARAM_ID: 626,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 492,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 497,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 502,
    },
    {
      PARAM_NAME: 'Area Manager',
      PARAM_ID: 628,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 493,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 500,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 511,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 519,
    },
    {
      PARAM_NAME: 'Asst.Credit Manager L',
      PARAM_ID: 658,
    },
    {
      PARAM_NAME: 'Zonal Manager-Incharge',
      PARAM_ID: 682,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 506,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 510,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 535,
    },
    {
      PARAM_NAME: 'Zonal Manager-Incharge',
      PARAM_ID: 635,
    },
    {
      PARAM_NAME: 'Relationship Officer',
      PARAM_ID: 659,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 507,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 516,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 709,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 663,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 710,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 508,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 515,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 522,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 533,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 553,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 509,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 524,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 629,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 665,
    },
    {
      PARAM_NAME: 'Software Engineer',
      PARAM_ID: 667,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 512,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 518,
    },
    {
      PARAM_NAME: 'Regional Manager- Incharge',
      PARAM_ID: 543,
    },
    {
      PARAM_NAME: 'Branch Manager',
      PARAM_ID: 557,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 713,
    },
    {
      PARAM_NAME: 'Branch Executive',
      PARAM_ID: 725,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 513,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 520,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 521,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 545,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 514,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 517,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 523,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 527,
    },
    {
      PARAM_NAME: 'Trainee Branch Manager',
      PARAM_ID: 536,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 586,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 526,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 562,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 528,
    },
    {
      PARAM_NAME: 'Executive',
      PARAM_ID: 560,
    },
    {
      PARAM_NAME: 'Apprentice Backend',
      PARAM_ID: 569,
    },
    {
      PARAM_NAME: 'Dy.Manager',
      PARAM_ID: 582,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 529,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 544,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 546,
    },
    {
      PARAM_NAME: 'Sr.Executive',
      PARAM_ID: 568,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 530,
    },
    {
      PARAM_NAME: 'Branch Manager',
      PARAM_ID: 537,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 538,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 570,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 597,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 604,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 671,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 714,
    },
    {
      PARAM_NAME: 'Credit Control Officer-Trainee',
      PARAM_ID: 726,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 598,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 600,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 605,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 606,
    },
    {
      PARAM_NAME: 'Regional Manager',
      PARAM_ID: 672,
    },
    {
      PARAM_NAME: 'Regional Manager',
      PARAM_ID: 679,
    },
    {
      PARAM_NAME: 'Software Engineer',
      PARAM_ID: 607,
    },
    {
      PARAM_NAME: 'Dy.Manager',
      PARAM_ID: 612,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 632,
    },
    {
      PARAM_NAME: 'Credit Control Officer-Trainee',
      PARAM_ID: 662,
    },
    {
      PARAM_NAME: 'Telecaller',
      PARAM_ID: 666,
    },
    {
      PARAM_NAME: 'Asst.Vice President',
      PARAM_ID: 608,
    },
    {
      PARAM_NAME: 'Relationship Officer',
      PARAM_ID: 609,
    },
    {
      PARAM_NAME: 'Regional Manager- Incharge',
      PARAM_ID: 611,
    },
    {
      PARAM_NAME: 'Audit Officer',
      PARAM_ID: 616,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 620,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 634,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 643,
    },
    {
      PARAM_NAME: 'State Head',
      PARAM_ID: 660,
    },
    {
      PARAM_NAME: 'Regional Manager',
      PARAM_ID: 673,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 718,
    },
    {
      PARAM_NAME: 'Credit Control Officer-Trainee',
      PARAM_ID: 724,
    },
    {
      PARAM_NAME: 'Software Engineer',
      PARAM_ID: 615,
    },
    {
      PARAM_NAME: 'Branch Executive',
      PARAM_ID: 735,
    },
    {
      PARAM_NAME: 'Relationship Officer',
      PARAM_ID: 534,
    },
    {
      PARAM_NAME: 'Sr.Executive',
      PARAM_ID: 587,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 677,
    },
    {
      PARAM_NAME: 'Branch Executive',
      PARAM_ID: 732,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 539,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 540,
    },
    {
      PARAM_NAME: 'Cook',
      PARAM_ID: 547,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 583,
    },
    {
      PARAM_NAME: 'Relationship Manager',
      PARAM_ID: 541,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 558,
    },
    {
      PARAM_NAME: 'Asst.Vice President',
      PARAM_ID: 567,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 688,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 694,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 542,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 549,
    },
    {
      PARAM_NAME: 'Credit Control Manager 0',
      PARAM_ID: 690,
    },
    {
      PARAM_NAME: 'Sr.Relationship Officer',
      PARAM_ID: 548,
    },
    {
      PARAM_NAME: 'Relationship Executive',
      PARAM_ID: 674,
    },
    {
      PARAM_NAME: 'Credit Control Manager 0',
      PARAM_ID: 683,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 716,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 550,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 551,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 571,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 610,
    },
    {
      PARAM_NAME: 'Branch Manager',
      PARAM_ID: 552,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 572,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 554,
    },
    {
      PARAM_NAME: 'Trainee Branch Manager',
      PARAM_ID: 559,
    },
    {
      PARAM_NAME: 'Jr.Software Engineer',
      PARAM_ID: 576,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 585,
    },
    {
      PARAM_NAME: 'Apprentice Backend',
      PARAM_ID: 619,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 719,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 556,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 566,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 599,
    },
    {
      PARAM_NAME: 'Trainee Branch Manager',
      PARAM_ID: 561,
    },
    {
      PARAM_NAME: 'Branch Manager',
      PARAM_ID: 602,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 563,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 595,
    },
    {
      PARAM_NAME: 'Sr.Executive',
      PARAM_ID: 564,
    },
    {
      PARAM_NAME: 'Regional Manager',
      PARAM_ID: 565,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 573,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 574,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 575,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 577,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 591,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 693,
    },
    {
      PARAM_NAME: 'Manager',
      PARAM_ID: 578,
    },
    {
      PARAM_NAME: 'Sr.Manager',
      PARAM_ID: 579,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 584,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 588,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 580,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 581,
    },
    {
      PARAM_NAME: 'Branch Head',
      PARAM_ID: 590,
    },
    {
      PARAM_NAME: 'Trainee Branch Manager',
      PARAM_ID: 603,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 617,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 618,
    },
    {
      PARAM_NAME: 'Software Engineer',
      PARAM_ID: 589,
    },
    {
      PARAM_NAME: 'Executive',
      PARAM_ID: 601,
    },
    {
      PARAM_NAME: 'Branch Credit Manager',
      PARAM_ID: 613,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 592,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 593,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 697,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 594,
    },
    {
      PARAM_NAME: 'Cluster Business Manager',
      PARAM_ID: 699,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 720,
    },
    {
      PARAM_NAME: 'Credit Control Officer-Trainee',
      PARAM_ID: 731,
    },
    {
      PARAM_NAME: 'Cluster Business Manager',
      PARAM_ID: 596,
    },
    {
      PARAM_NAME: 'Apprentice Backend',
      PARAM_ID: 621,
    },
    {
      PARAM_NAME: 'Sr.EDO',
      PARAM_ID: 691,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 695,
    },
    {
      PARAM_NAME: 'Telecaller',
      PARAM_ID: 721,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 722,
    },
    {
      PARAM_NAME: 'State Head-Incharge',
      PARAM_ID: 723,
    },
    {
      PARAM_NAME: 'State Head',
      PARAM_ID: 692,
    },
    {
      PARAM_NAME: 'Credit Control Officer-Trainee',
      PARAM_ID: 729,
    },
    {
      PARAM_NAME: 'Data Protection Officer',
      PARAM_ID: 698,
    },
    {
      PARAM_NAME: 'Telecaller',
      PARAM_ID: 700,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 715,
    },
    {
      PARAM_NAME: 'Cluster Credit Manager',
      PARAM_ID: 622,
    },
    {
      PARAM_NAME: 'Trainee Branch Manager',
      PARAM_ID: 625,
    },
    {
      PARAM_NAME: 'Executive',
      PARAM_ID: 624,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 633,
    },
    {
      PARAM_NAME: 'Managing Director, CEO, CIO',
      PARAM_ID: 739,
    },
    {
      PARAM_NAME: 'Executive',
      PARAM_ID: 627,
    },
    {
      PARAM_NAME: 'Sr.Relationship Officer',
      PARAM_ID: 689,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 717,
    },
    {
      PARAM_NAME: 'Regional Manager- Incharge',
      PARAM_ID: 630,
    },
    {
      PARAM_NAME: 'Regional Manager',
      PARAM_ID: 631,
    },
    {
      PARAM_NAME: 'Management Trainee',
      PARAM_ID: 637,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 646,
    },
    {
      PARAM_NAME: 'Asst.Credit Manager',
      PARAM_ID: 657,
    },
    {
      PARAM_NAME: 'Management Trainee',
      PARAM_ID: 638,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 664,
    },
    {
      PARAM_NAME: 'EDO L',
      PARAM_ID: 696,
    },
    {
      PARAM_NAME: 'Jr.Software Engineer',
      PARAM_ID: 706,
    },
    {
      PARAM_NAME: 'Relationship Officer',
      PARAM_ID: 639,
    },
    {
      PARAM_NAME: 'Dy.Manager',
      PARAM_ID: 707,
    },
    {
      PARAM_NAME: 'Jr.Software Engineer',
      PARAM_ID: 727,
    },
    {
      PARAM_NAME: 'Sr.Executive',
      PARAM_ID: 640,
    },
    {
      PARAM_NAME: 'Executive',
      PARAM_ID: 641,
    },
    {
      PARAM_NAME: 'Sr.Manager',
      PARAM_ID: 645,
    },
    {
      PARAM_NAME: 'Branch Credit Manager',
      PARAM_ID: 642,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 675,
    },
    {
      PARAM_NAME: 'Apprentice',
      PARAM_ID: 676,
    },
    {
      PARAM_NAME: 'Credit Control Manager 0',
      PARAM_ID: 678,
    },
    {
      PARAM_NAME: 'Regional Manager',
      PARAM_ID: 680,
    },
    {
      PARAM_NAME: 'Sr.Vice President',
      PARAM_ID: 648,
    },
    {
      PARAM_NAME: 'Regional Manager',
      PARAM_ID: 650,
    },
    {
      PARAM_NAME: 'Regional Manager- Incharge',
      PARAM_ID: 651,
    },
    {
      PARAM_NAME: 'EDO',
      PARAM_ID: 670,
    },
    {
      PARAM_NAME: 'Dy.Manager',
      PARAM_ID: 652,
    },
    {
      PARAM_NAME: 'Zonal Manager',
      PARAM_ID: 681,
    },
    {
      PARAM_NAME: 'Credit Control Manager',
      PARAM_ID: 654,
    },
    {
      PARAM_NAME: 'Audit Officer',
      PARAM_ID: 656,
    },
    {
      PARAM_NAME: 'Credit Control Manager 0',
      PARAM_ID: 684,
    },
    {
      PARAM_NAME: 'Zonal Manager-Incharge',
      PARAM_ID: 701,
    },
    {
      PARAM_NAME: 'Executive',
      PARAM_ID: 728,
    },
    {
      PARAM_NAME: 'Branch Executive',
      PARAM_ID: 734,
    },
    {
      PARAM_NAME: 'Credit Control Officer-Trainee',
      PARAM_ID: 730,
    },
    {
      PARAM_NAME: 'Coordinator',
      PARAM_ID: 737,
    },
    {
      PARAM_NAME: 'Assistant Manager',
      PARAM_ID: 738,
    },
  ];



  const stateData = [
    {
      S_NO: 0,
      PARAM_ID: 0,
      PARAM_NAME: '--Select State--',
      LOCAL_LANG: null,
    },
    {
      S_NO: 1,
      PARAM_ID: 29,
      PARAM_NAME: 'Andhra Pradesh',
      LOCAL_LANG: null,
    },
    {
      S_NO: 2,
      PARAM_ID: 30,
      PARAM_NAME: 'Arunachal Pradesh',
      LOCAL_LANG: null,
    },
    {
      S_NO: 3,
      PARAM_ID: 31,
      PARAM_NAME: 'Assam',
      LOCAL_LANG:
        '‘’মই কোনো ভয় আৰু চাপ অবিহনে আৰু পঢ়া আৰু শুনা আৰু ভালদৰে বুজি পোৱাৰ পিছত ওপৰোক্ত লিখিত বস্তুবোৰত স্বাক্ষৰ কৰি আছোঁ।‘’',
    },
    {
      S_NO: 4,
      PARAM_ID: 32,
      PARAM_NAME: 'Bihar',
      LOCAL_LANG: null,
    },
    {
      S_NO: 5,
      PARAM_ID: 33,
      PARAM_NAME: 'Chhattisgarh',
      LOCAL_LANG: null,
    },
    {
      S_NO: 6,
      PARAM_ID: 77,
      PARAM_NAME: 'Delhi',
      LOCAL_LANG: null,
    },
    {
      S_NO: 7,
      PARAM_ID: 34,
      PARAM_NAME: 'Goa',
      LOCAL_LANG: null,
    },
    {
      S_NO: 8,
      PARAM_ID: 35,
      PARAM_NAME: 'Gujarat',
      LOCAL_LANG:
        'હું ઉપરોક્ત લખેલી બાબતો પર કોઈપણ જાતના ડર અને દબાણ વગર અને સારી રીતે વાંચ્યા અને સાંભળ્યા અને સમજ્યા પછી સહી કરી રહ્યો છું.',
    },
    {
      S_NO: 9,
      PARAM_ID: 36,
      PARAM_NAME: 'Haryana',
      LOCAL_LANG: null,
    },
    {
      S_NO: 10,
      PARAM_ID: 37,
      PARAM_NAME: 'Himachal Pradesh',
      LOCAL_LANG: null,
    },
    {
      S_NO: 11,
      PARAM_ID: 422,
      PARAM_NAME: 'Jammu and Kashmir',
      LOCAL_LANG: null,
    },
    {
      S_NO: 12,
      PARAM_ID: 38,
      PARAM_NAME: 'Jharkhand',
      LOCAL_LANG: null,
    },
    {
      S_NO: 13,
      PARAM_ID: 39,
      PARAM_NAME: 'Karnataka',
      LOCAL_LANG:
        'ಮೇಲೆ ಬರೆದಿರುವ ವಿಷಯವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಓದಿ , ಸರಿಯಾಗಿ ತಿಳಿದುಕೊಂಡು ಮತ್ತು ಅರ್ಥಮಾಡಿಕೊಂಡು ಯಾವುದೇ ಭಯ ಮತ್ತು ಒತ್ತಡವಿಲ್ಲದೆ ನಾನು ಸಹಿ ಮಾಡುತ್ತಿದ್ದೇನೆ.',
    },
    {
      S_NO: 14,
      PARAM_ID: 40,
      PARAM_NAME: 'Kerala',
      LOCAL_LANG: null,
    },
    {
      S_NO: 15,
      PARAM_ID: 41,
      PARAM_NAME: 'Madhya Pradesh',
      LOCAL_LANG: null,
    },
    {
      S_NO: 16,
      PARAM_ID: 42,
      PARAM_NAME: 'Maharashtra',
      LOCAL_LANG: null,
    },
    {
      S_NO: 17,
      PARAM_ID: 43,
      PARAM_NAME: 'Manipur',
      LOCAL_LANG: null,
    },
    {
      S_NO: 18,
      PARAM_ID: 44,
      PARAM_NAME: 'Meghalaya',
      LOCAL_LANG: null,
    },
    {
      S_NO: 19,
      PARAM_ID: 45,
      PARAM_NAME: 'Mizoram',
      LOCAL_LANG: null,
    },
    {
      S_NO: 20,
      PARAM_ID: 46,
      PARAM_NAME: 'Nagaland',
      LOCAL_LANG: null,
    },
    {
      S_NO: 21,
      PARAM_ID: 95,
      PARAM_NAME: 'North Bengal',
      LOCAL_LANG:
        'আমি উপরোক্ত লিখিত বিষয়গুলো কোনো ভয় ও চাপ ছাড়াই এবং ভালোভাবে পড়ে, শুনে ও বুঝে সই করছি।',
    },
    {
      S_NO: 22,
      PARAM_ID: 47,
      PARAM_NAME: 'Odisha',
      LOCAL_LANG:
        'ବିନା କୌଣସି ଭୟ କିମ୍ବା ଚାପରେ ମୁଁ ଉପର ଲିଖିତ କଥା ଗୁଡ଼ିକୁ ଭଲ ଭାବରେ ରେ ପଢ଼ି ଶୁଣି ଏବଂ ବୁଝିକି ମୁଁ ମୋ ନିଜ ଇଚ୍ଛାରେ ଦସ୍ତଖତ କରୁଛି।',
    },
    {
      S_NO: 23,
      PARAM_ID: 48,
      PARAM_NAME: 'Punjab',
      LOCAL_LANG:
        'ਮੈਂ ਬਿਨਾਂ ਕਿਸੇ ਡਰ ਅਤੇ ਦਬਾਅ ਦੇ ਉਪਰੋਕਤ ਲਿਖੀਆਂ ਗੱਲਾਂ ਨੂੰ ਚੰਗੀ ਤਰ੍ਹਾਂ ਪੜ੍ਹਨ ਅਤੇ ਸੁਣਨ ਅਤੇ ਸਮਝਣ ਤੋਂ ਬਾਅਦ ਦਸਤਖਤ ਕਰ ਰਿਹਾ ਹਾਂ।',
    },
    {
      S_NO: 24,
      PARAM_ID: 49,
      PARAM_NAME: 'Rajasthan',
      LOCAL_LANG: null,
    },
    {
      S_NO: 25,
      PARAM_ID: 50,
      PARAM_NAME: 'Sikkim',
      LOCAL_LANG: null,
    },
    {
      S_NO: 26,
      PARAM_ID: 51,
      PARAM_NAME: 'Tamil Nadu',
      LOCAL_LANG: null,
    },
    {
      S_NO: 27,
      PARAM_ID: 52,
      PARAM_NAME: 'Telangana',
      LOCAL_LANG: null,
    },
    {
      S_NO: 28,
      PARAM_ID: 53,
      PARAM_NAME: 'Tripura',
      LOCAL_LANG: null,
    },
    {
      S_NO: 29,
      PARAM_ID: 54,
      PARAM_NAME: 'Uttar Pradesh',
      LOCAL_LANG: null,
    },
    {
      S_NO: 30,
      PARAM_ID: 87,
      PARAM_NAME: 'UTTAR PRADESH (EAST)',
      LOCAL_LANG: null,
    },
    {
      S_NO: 31,
      PARAM_ID: 86,
      PARAM_NAME: 'UTTAR PRADESH (WEST)',
      LOCAL_LANG: null,
    },
    {
      S_NO: 32,
      PARAM_ID: 55,
      PARAM_NAME: 'Uttarakhand',
      LOCAL_LANG: null,
    },
    {
      S_NO: 33,
      PARAM_ID: 56,
      PARAM_NAME: 'West Bengal',
      LOCAL_LANG:
        'আমি উপরোক্ত লিখিত বিষয়গুলো কোনো ভয় ও চাপ ছাড়াই এবং ভালোভাবে পড়ে, শুনে ও বুঝে সই করছি।',
    },
  ];

  const genderData = [
    {
      S_NO: 0,
      PARAM_ID: 0,
      PARAM_NAME: 'Select',
      LOCAL_LANG: null,
    },
    {
      S_NO: 1,
      PARAM_ID: 103,
      PARAM_NAME: 'Female',
      LOCAL_LANG: 'F',
    },
    {
      S_NO: 2,
      PARAM_ID: 104,
      PARAM_NAME: 'Male',
      LOCAL_LANG: 'M',
    },
    {
      S_NO: 3,
      PARAM_ID: 182,
      PARAM_NAME: 'Other',
      LOCAL_LANG: 'O',
    },
    {
      S_NO: 4,
      PARAM_ID: 105,
      PARAM_NAME: 'Transgender',
      LOCAL_LANG: 'T',
    },
  ];

  const higherEducationObtainedData = [
    {
      S_NO: 1,
      PARAM_ID: 96,
      PARAM_NAME: '10th',
      LOCAL_LANG: null,
    },
    {
      S_NO: 2,
      PARAM_ID: 97,
      PARAM_NAME: '12th',
      LOCAL_LANG: null,
    },
    {
      S_NO: 3,
      PARAM_ID: 101,
      PARAM_NAME: 'Diploma',
      LOCAL_LANG: null,
    },
    {
      S_NO: 4,
      PARAM_ID: 100,
      PARAM_NAME: 'doctorate',
      LOCAL_LANG: null,
    },
    {
      S_NO: 5,
      PARAM_ID: 98,
      PARAM_NAME: 'Graduation',
      LOCAL_LANG: null,
    },
    {
      S_NO: 6,
      PARAM_ID: 102,
      PARAM_NAME: 'Other',
      LOCAL_LANG: null,
    },
    {
      S_NO: 7,
      PARAM_ID: 99,
      PARAM_NAME: 'Post Graduation',
      LOCAL_LANG: null,
    },
  ];

  const countryData = [
    {
      S_NO: 0,
      PARAM_ID: 0,
      PARAM_NAME: 'Country',
      LOCAL_LANG: null,
    },
    {
      S_NO: 1,
      PARAM_ID: 16,
      PARAM_NAME: 'India',
      LOCAL_LANG: null,
    },
  ];

  const maritialStatusData = [
    {
      PARAM_NAME: 'Single',
      PARAM_ID: 208,
      LOCAL_LANG: null,
    },
    {
      PARAM_NAME: 'Married',
      PARAM_ID: 209,
      LOCAL_LANG: null,
    },
    {
      PARAM_NAME: 'Widow',
      PARAM_ID: 210,
      LOCAL_LANG: null,
    },
    {
      PARAM_NAME: 'Divorced',
      PARAM_ID: 211,
      LOCAL_LANG: null,
    },
  ];

  // dropdown data ends

  //    state variable start
  const [experience, setExperience] = useState(true);

  const [selectedPostTitle, setSelectedPostTitle] = useState('');
  const [selectedPostTitleValue, setSelectedPostTitleValue] = useState('706');

  const [firstname, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [gender, setGender] = useState('');
  const [genderValue, setGenderValue] = useState('');

  const [department, setDepartment] = useState('');

  const [maritialStatus, setMaritialStatus] = useState('');
  const [maritialStatusValue, setMaritialStatusValue] = useState('');

  const [currentEmployer, setCurrentEmployer] = useState('');
  const [lastEmployer, setlastEmployer] = useState('');
  const [currentCtc, setCurrentCtc] = useState('');

  const [address, setAddress] = useState('');

  const [country, setCountry] = useState('');
  const [countryValue, setCountryValue] = useState('');

  const [state, setState] = useState('');
  const [stateValue, setStateValue] = useState('');

  const [city, setCity] = useState('');

  const [postalCode, setPostalCode] = useState('');

  const [resume, setResume] = useState({});

  const [higherEducationObtained, setHigherEducationObtained] = useState('');
  const [higherEducationObtainedValue, setHigherEducationObtainedValue] =
    useState('');

  const [college, setCollege] = useState('');

  //   state variable ends
  function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
  }

  function getFormattedTimestamp() {
    var date = new Date();

    var day = addLeadingZero(date.getDate());
    var month = addLeadingZero(date.getMonth() + 1); // Months are zero-based
    var year = date.getFullYear();
    var hours = addLeadingZero(date.getHours());
    var minutes = addLeadingZero(date.getMinutes());
    var seconds = addLeadingZero(date.getSeconds());

    return day + month + year + hours + minutes + seconds;
  }

  const selectResume = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.images,
        ],
      });

      setResume({
        name: `Resume_${getFormattedTimestamp()}.${doc[0].type.split('/')[1]}`,
        type: doc[0].type,
        uri: doc[0].uri,
      });
    } catch (error) {
      console.log(error);
    }
  };

  function generateRandom12DigitNumber() {
    // Generate a random number between 1,000,000,000,000 and 9,999,999,999,999
    const randomNumber =
      Math.floor(Math.random() * 9000000000000) + 1000000000000;
    return randomNumber.toString(); // Convert to string to preserve leading zeros
  }

  const onSubmit = async () => {
    var formData = new FormData();
    console.log(resume);
    formData.append('fileUpload', resume);
    formData.append(
      'data',
      JSON.stringify({
        fname: firstname,
        lname: lastName,
        email: email,
        phone: phone,
        add: address,
        country: countryValue,
        city: city,
        state: stateValue,
        pCode: postalCode,
        resumeName: '',
        dPay: 30000,
        education: higherEducationObtainedValue,
        clgName: college,
        refName: '',
        userId: '',
        oper: 'A',
        candiateId: '',
        status: 'A',
        martialStatus: 'Single',
        dept: '7',
        gender: genderValue,
        fatherName: fatherName,
        currentEmplyeement: currentEmployer,
        latestEmplyeement: lastEmployer,
        ctc: currentCtc,
        aadhaar: generateRandom12DigitNumber(),
        dob: dob,
        jobId: '706',
        grade: '',
        referMobileNo: '',
        referEmailId: '',
        preferedLocation: '167',
        refEmpCode: '',
        exprienceType: experience ? 'Yes' : 'No',
        refEmployeeName2: '',
        refEmployeeCode2: '',
        refMobileNo2: '',
        refEmailId2: '',
        refEmployeeName3: '',
        refEmployeeCode3: '',
        refMobileNo3: '',
        refEmailId3: '',
        refEmployeeName4: '',
        refEmployeeCode4: '',
        refMobileNo4: '',
        refEmailId4: '',
        motherName: motherName,
        passMonth: 'true',
      }),
    );

    try {
      let res = await fetch(`${API}/api/addCandidate`, {
        method: 'POST',
        body: formData,
      });

      const finalRes = await res.json();
      console.log(finalRes);
      if (finalRes) {
        Toast.show({
          type: finalRes.Result[0]?.FLAG === 'S' ? 'success' : 'error',
          text1: finalRes?.Result[0]?.MSG,
        });
        navigation.goBack();
        Alert.alert(
          `Your Candidate ID is ${finalRes?.Result[0]?.CANDIDATE_ID}, Please check you mail box for details.`,
          [{text: 'OK'}],
        );
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: JSON.stringify(error),
      });
    }
  };

  useEffect(() => {
    if(route.params.jobId){
    const filteredJob =  postTitleData.filter((post)=> Number(post.PARAM_ID) === Number(route.params.jobId))
    setSelectedPostTitle(filteredJob[0].PARAM_NAME)
    setSelectedPostTitleValue(filteredJob[0].PARAM_ID)
    }
   }, [route.params?.jobId])
 
  //   // Title, States and Employment Data
  //   const getDropdownData = async P => {
  //    let response = await fetch(`${API}/api/User/getParam?getClaim=${P}`);
  //    response = await response.json();
  //    const returnedData = response;
  //    if (P === 'j') {
  //      setTitleOption(returnedData);
  //    } else if (P === 7) {
  //      setStates(returnedData);
  //    } else {
  //      setEmployementData(returnedData);
  //    }
  //  };
   
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Header />

      <KeyboardAwareScrollView
        // bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: SIZES.radius,
        }}>
        <ScrollView>
          <View>
            <Text style={styles.caption}>Choose your experience</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: SIZES.base,
                gap: SIZES.radius,
              }}>
              <TouchableOpacity
                onPress={() => setExperience(!experience)}
                style={{
                  borderWidth: 1,
                  borderColor: experience ? COLORS.lightGray1 : COLORS.orange1,
                  padding: SIZES.base,
                  borderRadius: SIZES.base,
                }}>
                <Text
                  style={{
                    color: experience ? COLORS.gray : COLORS.black,
                  }}>
                  Fresher
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setExperience(!experience)}
                style={{
                  borderWidth: 1,
                  borderColor: !experience ? COLORS.lightGray1 : COLORS.orange1,
                  padding: SIZES.base,
                  borderRadius: SIZES.base,
                }}>
                <Text
                  style={{
                    color: !experience ? COLORS.gray : COLORS.black,
                  }}>
                  Experience
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TextDropdown
            caption={'Post Title'}
            data={postTitleData}
            setData={setSelectedPostTitle}
            setIdvalue={setSelectedPostTitleValue}
            defaultButtonText={selectedPostTitle}
            captionStyle={styles.caption}
            disabled
          />
          <FormInput
            label="First Name"
            placeholder={'First Name'}
            labelColor={COLORS.black}
            value={firstname}
            onChange={setFirstname}
          />

          <FormInput
            label="Last Name"
            placeholder={'Last Name'}
            labelColor={COLORS.black}
            value={lastName}
            onChange={setLastName}
          />

          <FormInput
            label="Father Name"
            placeholder={'Father Name'}
            labelColor={COLORS.black}
            value={fatherName}
            onChange={setFatherName}
          />

          <FormInput
            label="Mother Name"
            placeholder={'Mother Name'}
            labelColor={COLORS.black}
            value={motherName}
            onChange={setMotherName}
          />

          <DateButton
            caption={'Date of Birth'}
            date={dob}
            setDate={setDob}
            captionStyle={styles.caption}
          />

          <FormInput
            label="Email"
            placeholder={'Email'}
            labelColor={COLORS.black}
            value={email}
            onChange={setEmail}
          />

          <TextDropdown
            caption={'Gender'}
            data={genderData}
            setData={setGender}
            setIdvalue={setGenderValue}
            defaultButtonText={gender}
            captionStyle={styles.caption}
          />

          <FormInput
            label="Phone"
            placeholder={'Phone'}
            labelColor={COLORS.black}
            value={phone}
            onChange={setPhone}
          />

          <TextDropdown
            caption={'Marritial Status'}
            data={maritialStatusData}
            setData={setMaritialStatus}
            setIdvalue={setMaritialStatusValue}
            defaultButtonText={maritialStatus}
            captionStyle={styles.caption}
          />

          <FormInput
            label="Department"
            placeholder={'Depatment'}
            labelColor={COLORS.black}
            value={'IT'}
            editable={false}
          />

          {experience && (
            <>
              <FormInput
                label="Current Employer"
                placeholder={'Current Employer'}
                labelColor={COLORS.black}
                value={currentEmployer}
                onChange={setCurrentEmployer}
              />

              <FormInput
                label="Last Employer"
                placeholder={'Last Employer'}
                labelColor={COLORS.black}
                value={lastEmployer}
                onChange={setlastEmployer}
              />

              <FormInput
                label="Current CTC(Monthly)"
                placeholder={'Current CTC(Monthly)'}
                labelColor={COLORS.black}
                value={currentCtc}
                onChange={setCurrentCtc}
              />
            </>
          )}

          <FormInput
            label="Address"
            placeholder={'Address'}
            labelColor={COLORS.black}
            value={address}
            onChange={setAddress}
            multiline
          />

          <TextDropdown
            caption={'Country'}
            data={countryData}
            setData={setCountry}
            setIdvalue={setCountryValue}
            defaultButtonText={country}
            captionStyle={styles.caption}
          />

          <FormInput
            label="City"
            placeholder={'City'}
            labelColor={COLORS.black}
            value={city}
            onChange={setCity}
          />

          <TextDropdown
            caption={'State'}
            data={stateData}
            setData={setState}
            setIdvalue={setStateValue}
            defaultButtonText={state}
            captionStyle={styles.caption}
          />

          <FormInput
            label="Postal Code"
            placeholder={'Postal Code'}
            labelColor={COLORS.black}
            value={postalCode}
            onChange={setPostalCode}
          />

          <View
            style={{
              marginVertical: SIZES.base,
            }}>
            <Text style={styles.caption}>Resume</Text>
            {resume?.name ? (
              <View
                style={{
                  paddingVertical: SIZES.radius * 1.3,
                  borderWidth: 1,
                  borderRadius: SIZES.radius,
                  borderColor: COLORS.lightGray1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: SIZES.radius,
                }}>
                <Text
                  style={{
                    color: COLORS.darkGray2,
                  }}>
                  {resume.name.slice(0, 12)}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: SIZES.padding,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setResume({});
                    }}>
                    <Image
                      source={icons.cross}
                      style={{
                        height: 25,
                        width: 25,
                        tintColor: COLORS.red,
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: COLORS.disableOrange1,
                      padding: SIZES.base,
                      borderRadius: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={esignIcon}
                      style={{
                        height: 44,
                        width: 44,
                        tintColor: COLORS.orange,
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => selectResume()}
                style={{
                  paddingVertical: SIZES.radius * 1.3,
                  borderWidth: 1,
                  borderRadius: SIZES.radius,
                  borderColor: COLORS.lightGray1,
                }}>
                <Text
                  style={{
                    marginLeft: SIZES.padding,
                    color: COLORS.gray,
                  }}>
                  Select Resume
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <TextDropdown
            caption={'Higher education obtained'}
            data={higherEducationObtainedData}
            setData={setHigherEducationObtained}
            setIdvalue={setHigherEducationObtainedValue}
            defaultButtonText={higherEducationObtained}
            captionStyle={styles.caption}
          />

          <FormInput
            label="College/University"
            placeholder={'College/University'}
            labelColor={COLORS.black}
            value={college}
            onChange={setCollege}
          />
        </ScrollView>

        <View
          style={{
            backgroundColor: COLORS.white,
            width: responsiveWidth(100),
            alignSelf: 'center',
            paddingVertical: SIZES.base,
          }}>
          <TouchableOpacity onPress={onSubmit}>
            <LinearGradient
              style={{
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.radius,
                marginHorizontal: SIZES.radius,
              }}
              colors={[COLORS.orange1, COLORS.lightOrange]}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h4,
                }}>
                Submit
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default Signup;

const styles = StyleSheet.create({
  caption: {color: COLORS.black, ...FONTS.h4},
});
