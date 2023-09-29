import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTS, SIZES } from '../../../constants/font_size';
import COLORS from '../../../constants/theme';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { API } from '../../../utility/services';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidateList } from '../../../redux/eSignSlice';
import { ActivityIndicator } from 'react-native-paper';
import _ from "lodash";
import { responsiveWidth } from 'react-native-responsive-dimensions';
import TextButton from '../../../components/TextButton';


const Pending_Esifn_list = (props) => {


  const dispatch = useDispatch()

  const { candidateList, loading } = useSelector((state) => state.eSign)


  useEffect(() => {

    getEsignData();

  }, [])




  const getEsignData = async () => {
    const data = {
      user: 'TMP2140',
      flag: 'V'
    }
    dispatch(getCandidateList(data))
  }



  return (
    <View style={{
      flex: 1
    }}>
      {/* Top headerView */}
      <View style={{ width: '100%', flexDirection: 'row', elevation: 6, backgroundColor: COLORS.white, padding: 15 }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} >

          <Icons name="arrow-left" size={28} color={COLORS.black} style={{ alignSelf: 'center', }} verticalAlign={'center'} />

        </TouchableOpacity>
        <Text style={{ ...FONTS.body3, fontSize: 20, color: COLORS.black, verticalAlign: 'middle', marginLeft: 20 }}>Candidate Information </Text>
      </View>


      {loading ?
        (<View style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <View style={{
          }}>
            <ActivityIndicator color={COLORS.orange1} />
            <Text style={{
              color: COLORS.black,
              ...FONTS.h2B,
              marginTop: SIZES.radius
            }}>Loading...</Text>
          </View>
        </View>)
        :
        (_.map(candidateList, (item, index) => {
          return (
            <View style={{
              width: responsiveWidth(90),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              alignSelf: "center",
              gap: 10,
              backgroundColor: COLORS.white,
              marginTop: SIZES.radius,
              padding: SIZES.radius,
              borderRadius: SIZES.radius
            }} key={index}>
              <View>

                <View>
                  <Text style={{
                    ...FONTS.h4,
                    color: COLORS.black
                  }}>Registration No.</Text>
                  <Text style={{
                    ...FONTS.body4,
                    fontWeight: "600"
                  }}>{item?.ASSIGN_TO}</Text>
                </View>

                <View style={{
                  marginTop: SIZES.radius
                }}>
                  <Text style={{
                    ...FONTS.h4,
                    color: COLORS.black
                  }}>Candidate Name</Text>
                  <Text style={{
                    ...FONTS.body4,
                    fontWeight: "600"
                  }}>{item?.CANDIDATE_NAME}</Text>
                </View>

                <View style={{
                  marginTop: SIZES.radius
                }}>
                  <Text style={{
                    ...FONTS.h4,
                    color: COLORS.black
                  }}>Status</Text>
                  {item.ESSIGN_CNT === 0 ?
                    <Text style={{
                      color: COLORS.green
                    }}>Candidate Esign Pending</Text>

                    : item.ESSIGN_CNT < 2 ?
                      <Text>First gauranter Esign Pending</Text>
                      :
                      item.ESSIGN_CNT === 2 ?
                        <Text>Second gauranter Esign Pending</Text> :
                        item.KYC_FLAG && item.KYC_FLAG === "F" ?
                          <Text>VKYC Complete</Text>
                          :
                          <Text>Initiated Kyc</Text>
                  }
                </View>

              </View>


              <View>

                <View>
                  <Text style={{
                    ...FONTS.h4,
                    color: COLORS.black
                  }}>Post</Text>
                  <Text style={{
                    ...FONTS.body4,
                    fontWeight: "600"
                  }}>{item?.POST}</Text>
                </View>

                <View style={{
                  marginTop: SIZES.radius
                }}>
                  <Text style={{
                    ...FONTS.h4,
                    color: COLORS.black
                  }}>Mobile No.</Text>
                  <Text style={{
                    ...FONTS.body4,
                    fontWeight: "600"
                  }}>{item?.CANDIDATE_MOB}</Text>
                </View>

                <View style={{
                  marginTop: SIZES.radius
                }} >
                  <TextButton
                    label={"Proceed for Esign"}
                    buttonContainerStyle={{
                      padding: 8,
                      paddingHorizontal: 12,

                      borderRadius: SIZES.radius
                    }}
                    linearGradientStyle={{
                      borderRadius: SIZES.padding * 2
                    }}
                    labelStyle={{
                      lineHeight: 19
                    }}
                  />
                </View>
              </View>
            </View>
          )
        }))
      }
    </View>


  )
}

export default Pending_Esifn_list