import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTS, SIZES } from '../../../constants/font_size';
import COLORS from '../../../constants/theme';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { API } from '../../../utility/services';


const Pending_Esifn_list = (props) => {

  useEffect(() => {

    getEsignData();

  }, [])




  const getEsignData = async () => {
    const data = {
      user: 'TMP2140',
      flag: 'V'
    }

    axios.post(`${API}/api/saveEsignDataMob`, data).then((response) => {

      const result = response.data.Result;
      console.log("esignData", result);

    }).catch((error) => {

    })

  }



  return (
    <View>
      {/* Top headerView */}
      <View style={{ width: '100%', flexDirection: 'row', elevation: 6, backgroundColor: COLORS.white, padding: 15 }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} >

          <Icons name="arrow-left" size={28} color={COLORS.black} style={{ alignSelf: 'center', }} verticalAlign={'center'} />

        </TouchableOpacity>
        <Text style={{ ...FONTS.body3, fontSize: 20, color: COLORS.black, verticalAlign: 'middle', marginLeft: 20 }}>Candidate Information </Text>
      </View>



    </View>
  )
}

export default Pending_Esifn_list