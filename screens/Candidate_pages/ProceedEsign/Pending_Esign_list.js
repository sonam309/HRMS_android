import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../../constants';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {API} from '../../../utility/services';
import {useDispatch, useSelector} from 'react-redux';
import {getCandidateList} from '../../../redux/eSignSlice';
import {ActivityIndicator} from 'react-native-paper';
import _ from 'lodash';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import TextButton from '../../../components/TextButton';
import Toast from 'react-native-toast-message';
import {color} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';

const Pending_Esifn_list = props => {
  const dispatch = useDispatch();
  const {candidateList, loading} = useSelector(state => state.eSign);
  const {candidateId} = useSelector(state => state.candidateAuth);
  const {docType, setDocType} = useState('');

  useEffect(() => {
    getEsignData();

    console.log('EsignListtData', candidateList);
  }, [candidateId]);

  useEffect(() => {
    getEsignData();

    console.log('EsignListtData', candidateList);
  }, []);

  const getEsignData = async () => {
    const data = {
      user: candidateId,
      candidateId: candidateId,
      flag: 'V',
    };

    console.log('sendRequestData', data);
    dispatch(getCandidateList(data));
  };

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          marginBottom: 10,
        }}>
        {/* Top headerView */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            elevation: 6,
            backgroundColor: COLORS.white,
            padding: 15,
          }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
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
            Candidate Information{' '}
          </Text>
        </View>

        {loading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{}}>
              <ActivityIndicator color={COLORS.orange1} />
              <Text
                style={{
                  color: COLORS.black,
                  ...FONTS.h2B,
                  marginTop: SIZES.radius,
                }}>
                Loading...
              </Text>
            </View>
          </View>
        ) : (
          _.map(candidateList, (item, index) => {
            return (
              <View key={index}>
                <View
                  style={{
                    width: responsiveWidth(90),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    // gap: 10,
                    backgroundColor: COLORS.white,
                    marginTop: SIZES.radius,
                    padding: SIZES.radius,
                    borderWidth: 0.5,
                    borderColor: COLORS.orange,
                    elevation: 4,
                    borderRadius: SIZES.radius,
                  }}
                  key={index}>
                  <View style={{flex: 1}}>
                    <View>
                      <Text
                        style={{
                          ...FONTS.h4,
                          color: COLORS.black,
                        }}>
                        Registration No.
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body4,
                          fontWeight: '600',
                        }}>
                        {item?.ASSIGN_TO}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: SIZES.radius,
                      }}>
                      <Text
                        style={{
                          ...FONTS.h4,
                          color: COLORS.black,
                        }}>
                        Candidate Name
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body4,
                          fontWeight: '600',
                        }}>
                        {item?.CANDIDATE_NAME}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: SIZES.radius,
                      }}>
                      <Text
                        style={{
                          ...FONTS.h4,
                          color: COLORS.black,
                        }}>
                        Status
                      </Text>
                      {item.ESSIGN_CNT === 0 ? (
                        <Text
                          style={{
                            color: COLORS.green,
                            flexWrap: 'wrap',
                            width: responsiveWidth(40),
                          }}>
                          {item?.DOCUMENT_TYPE === 'JOINING KIT'
                            ? 'Joinigkit Esign Pending'
                            : item?.DOCUMENT_TYPE === 'Appointment Letter'
                            ? 'Appointment Letter Pending'
                            : 'Candidate Esign Pending'}
                        </Text>
                      ) : item.ESSIGN_CNT === 1 ? (
                        <Text
                          style={{
                            color: COLORS.green,
                            flexWrap: 'wrap',
                            width: responsiveWidth(40),
                          }}>
                          {(item?.DOCUMENT_TYPE === 'JOINING KIT' ||
                          item?.DOCUMENT_TYPE === 'Appointment Letter')
                            ? 'Esign Completed'
                            : 'First gauranter Esign Pending'}
                        </Text>
                      ) : item.ESSIGN_CNT === 2 ? (
                        <Text
                          style={{
                            color: COLORS.green,
                            flexWrap: 'wrap',
                            width: responsiveWidth(40),
                          }}>
                          {(item?.DOCUMENT_TYPE === 'JOINING KIT' ||
                          item?.DOCUMENT_TYPE === 'Appointment Letter')
                            ? 'Esign Completed'
                            : ' 2nd gauranter Esign Pending'}
                        </Text>
                      ) : item.KYC_FLAG && item.KYC_FLAG === 'F' ? (
                        <Text>VKYC Complete</Text>
                      ) : (
                        <Text>Initiated Kyc</Text>
                      )}
                    </View>
                  </View>

                  <View
                    style={{
                      marginBottom: 30,
                    }}>
                    <View>
                      <Text
                        style={{
                          ...FONTS.h4,
                          color: COLORS.black,
                          textAlign: 'right',
                          marginRight: 10,
                          marginTop: 20,
                        }}>
                        Post
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body4,
                          fontWeight: '600',
                          textAlign: 'right',
                          marginRight: 10,
                        }}>
                        {item?.POST}
                      </Text>
                    </View>

                    <View style={{marginTop: SIZES.radius}}>
                      <Text
                        style={{
                          ...FONTS.h4,
                          color: COLORS.black,
                          textAlign: 'right',
                          marginRight: 10,
                        }}>
                        Mobile No.
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body4,
                          fontWeight: '600',
                          textAlign: 'right',
                          marginRight: 10,
                        }}>
                        {item?.CANDIDATE_MOB}
                      </Text>
                    </View>

                    <View style={{marginTop: 10}}>
                      <TouchableOpacity
                        disabled={
                          (item?.DOCUMENT_TYPE === 'JOINING KIT' ||
                            item?.DOCUMENT_TYPE === 'Appointment Letter') &&
                          item.ESSIGN_CNT != 0
                            ? true
                            : false
                        }
                        onPress={() =>
                          props.navigation.navigate('Proceed_for_Esign', {
                            index: index,
                          })
                        }
                        style={{
                          alignSelf: 'flex-end',
                          justifyContent: 'flex-end',
                          justifyContent: 'center',
                        }}>
                        <LinearGradient
                          colors={
                            (item?.DOCUMENT_TYPE === 'JOINING KIT' ||
                              item?.DOCUMENT_TYPE === 'Appointment Letter') &&
                            item.ESSIGN_CNT != 0
                              ? [COLORS.gray, COLORS.lightGray]
                              : [COLORS.orange1, COLORS.disableOrange1]
                          }
                          start={{x: 0, y: 0}}
                          end={{x: 2, y: 0}}
                          style={{borderRadius: SIZES.base * 2, padding: 7}}>
                          <Text
                            style={{
                              color: COLORS.white,
                              textAlign: 'center',
                              ...FONTS.h4,
                            }}>
                            Proceed for Esign
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{position: 'absolute', bottom: 5, right: 20}}
                    onPress={() =>
                      props.navigation.navigate('viewEsignStamp', {
                        index: index,
                      })
                    }>
                    <Icons name="eye" size={25} color={COLORS.green} />
                  </TouchableOpacity>
                </View>
                {/* <Text>
            {JSON.stringify(item?.ASSIGN_TO)}
          </Text> */}
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

export default Pending_Esifn_list;
