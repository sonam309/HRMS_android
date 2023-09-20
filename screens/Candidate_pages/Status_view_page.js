import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants/font_size'
import COLORS from '../../constants/theme'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';



const Status_view_page = () => {

  const status_ID = useSelector(state => state.candidateAuth.candidateStatusId)
  console.log("candidateStausviewwww",status_ID);

  return (
    <ScrollView>

      <View style={{ marginLeft: 20, marginTop: 5 }}>
        <Text style={{ ...FONTS.h4, fontSize: 16, color: COLORS.black, padding: 8, }}>Track Job Status</Text>
        <View style={{ padding: 8, marginTop: 10 }}>

          {/* fresh candidate view */}
          <View style={{ flexDirection: 'row', flex: 1, }}>
            <Icons name={status_ID === "116" ? "text-box-check" : (status_ID > "116" ? "text-box-check" : "text-box")} size={30} color={status_ID === "116" ? COLORS.green : (status_ID < "116" ? COLORS.gray : COLORS.lightOrange)} />
            <Text style={{ textAlignVertical: 'center', marginLeft: 8, color: status_ID === "116" ? COLORS.green : (status_ID < "116" ? COLORS.COLORS.gray : COLORS.lightOrange), fontSize: 16, fontWeight: status_ID === "116" ? 'bold' : 'normal' }}>Fresh Candidate</Text>
          </View>

          {/* dot view */}
          <View style={{ marginLeft: 12 }}>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "116" ? COLORS.green : (status_ID < "116" ? COLORS.gray : COLORS.lightOrange) }} >{status_ID === '116' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "116" ? COLORS.green : (status_ID < "116" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '116' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "116" ? COLORS.green : (status_ID < "116" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '116' ? ":" : "|"}</Text>
          </View>

          {/* Shortlisted view */}
          <View style={{ flexDirection: 'row', flex: 1, }}>
            <Icons name={status_ID === "117" ? "text-box-check" : (status_ID > "117" ? "text-box-check" : "text-box")} size={30} color={status_ID === "117" ? COLORS.green : (status_ID < "117" ? COLORS.gray : COLORS.lightOrange)} />
            <Text style={{ textAlignVertical: 'center', marginLeft: 8, color: status_ID === "117" ? COLORS.green : (status_ID < "117" ? COLORS.gray : COLORS.lightOrange), fontSize: 16, fontWeight: status_ID === "117" ? 'bold' : 'normal' }}>Shortlisted</Text>
          </View>
          {/* dot view */}
          <View style={{ marginLeft: 12 }}>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "117" ? COLORS.green : (status_ID < "117" ? COLORS.gray : COLORS.lightOrange) }} >{status_ID === '117' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "117" ? COLORS.green : (status_ID < "117" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '117' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "117" ? COLORS.green : (status_ID < "117" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '117' ? ":" : "|"}</Text>
          </View>

          {/* schedule interview view */}
          <View style={{ flexDirection: 'row', flex: 1, }}>
            <Icons name={status_ID === "118" ? "text-box-check" : (status_ID > "118" ? "text-box-check" : "text-box")} size={30} color={status_ID === "118" ? COLORS.green : (status_ID < "118" ? COLORS.gray : COLORS.lightOrange)} />
            <Text style={{ textAlignVertical: 'center', marginLeft: 8, color: status_ID === "118" ? COLORS.green : (status_ID < "118" ? COLORS.gray : COLORS.lightOrange), fontSize: 16, fontWeight: status_ID === "118" ? 'bold' : 'normal' }}>Sheduled Interview</Text>
          </View>

          {/* dot view */}
          <View style={{ marginLeft: 12 }}>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "118" ? COLORS.green : (status_ID < "118" ? COLORS.gray : COLORS.lightOrange) }} >{status_ID === '118' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "118" ? COLORS.green : (status_ID < "118" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '118' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "118" ? COLORS.green : (status_ID < "118" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '118' ? ":" : "|"}</Text>
          </View>

          {/* Interviewed view */}
          <View style={{ flexDirection: 'row', flex: 1, }}>
            <Icons name={status_ID === "119" ? "text-box-check" : (status_ID > "119" ? "text-box-check" : "text-box")} size={30} color={status_ID === "119" ? COLORS.green : (status_ID < "119" ? COLORS.gray : COLORS.lightOrange)} />
            <Text style={{ textAlignVertical: 'center', marginLeft: 8, color: status_ID === "119" ? COLORS.green : (status_ID < "119" ? COLORS.gray : COLORS.lightOrange), fontSize: 16, fontWeight: status_ID === "119" ? 'bold' : 'normal' }}>Interviewed</Text>
          </View>

          {/* dot view */}
          <View style={{ marginLeft: 12 }}>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "119" ? COLORS.green : (status_ID < "119" ? COLORS.gray : COLORS.lightOrange) }} >{status_ID === '119' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "119" ? COLORS.green : (status_ID < "119" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '119' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "119" ? COLORS.green : (status_ID < "119" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '119' ? ":" : "|"}</Text>
          </View>

          {/* Pre Offer Checklist view */}
          <View style={{ flexDirection: 'row', flex: 1, }}>
            <Icons name={status_ID === "121" ? "text-box-check" : (status_ID > "121" ? "text-box-check" : "text-box")} size={30} color={status_ID === "121" ? COLORS.green : (status_ID < "121" ? COLORS.gray : COLORS.lightOrange)} />
            <Text style={{ textAlignVertical: 'center', marginLeft: 8, color: status_ID === "121" ? COLORS.green : (status_ID < "121" ? COLORS.gray : COLORS.lightOrange), fontSize: 16, fontWeight: status_ID === "121" ? 'bold' : 'normal' }}>Pre Offer Checklist</Text>
          </View>

          {/* dot view */}
          <View style={{ marginLeft: 12 }}>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "121" ? COLORS.green : (status_ID < "121" ? COLORS.gray : COLORS.lightOrange) }} >{status_ID === '121' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "121" ? COLORS.green : (status_ID < "121" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '121' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "121" ? COLORS.green : (status_ID < "121" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '121' ? ":" : "|"}</Text>
          </View>

          {/* Salary Allocation view */}
          <View style={{ flexDirection: 'row', flex: 1, }}>
            <Icons name={status_ID === "123" ? "text-box-check" : (status_ID > "123" ? "text-box-check" : "text-box")} size={30} color={status_ID === "123" ? COLORS.green :
              (status_ID < "123" ? COLORS.gray : COLORS.lightOrange)} />
            <Text style={{ textAlignVertical: 'center', marginLeft: 8, color: status_ID === "123" ? COLORS.green : (status_ID < "123" ? COLORS.gray : COLORS.lightOrange), fontSize: 16, fontWeight: status_ID === "123" ? 'bold' : 'normal' }}>Salary Allocation </Text>
          </View>

          {/* dot view */}
          <View style={{ marginLeft: 12 }}>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "123" ? COLORS.green : (status_ID < "123" ? COLORS.gray : COLORS.lightOrange) }} >{status_ID === '123' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "123" ? COLORS.green : (status_ID < "123" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '123' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "123" ? COLORS.green : (status_ID < "123" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '123' ? ":" : "|"}</Text>
          </View>

          {/* Offer Letter */}
          <View style={{ flexDirection: 'row', flex: 1, }}>
            <Icons name={status_ID === "124" ? "text-box-check" : (status_ID > "124" ? "text-box-check" : "text-box")} size={30} color={status_ID === "124" ? COLORS.green :
              (status_ID < "124" ? COLORS.gray : COLORS.lightOrange)} />
            <Text style={{ textAlignVertical: 'center', marginLeft: 8, color: status_ID === "124" ? COLORS.green : (status_ID < "124" ? COLORS.gray : COLORS.lightOrange), fontSize: 16, fontWeight: status_ID === "124" ? 'bold' : 'normal' }}>Offer Letter</Text>
          </View>

          {/* dot view */}
          <View style={{ marginLeft: 12 }}>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "165" ? COLORS.green : (status_ID < "165" ? COLORS.gray : COLORS.lightOrange) }} >{status_ID === '165' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "165" ? COLORS.green : (status_ID < "165" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '165' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "165" ? COLORS.green : (status_ID < "165" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '165' ? ":" : "|"}</Text>
          </View>

          {/* Document verifications*/}
          <View style={{ flexDirection: 'row', flex: 1, }}>
            <Icons name={status_ID === "166" ? "text-box-check" : (status_ID > "166" ? "text-box-check" : "text-box")} size={30} color={status_ID === "166" ? COLORS.green :
              (status_ID < "166" ? COLORS.gray : COLORS.lightOrange)} />
            <Text style={{ textAlignVertical: 'center', marginLeft: 8, color: status_ID === "166" ? COLORS.green : (status_ID < "166" ? COLORS.gray : COLORS.lightOrange), fontSize: 16, fontWeight: status_ID === "166" ? 'bold' : 'normal' }}>Document  Verification</Text>
          </View>

          {/* dot view */}
          <View style={{ marginLeft: 12 }}>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "166" ? COLORS.green : (status_ID < "166" ? COLORS.gray : COLORS.lightOrange) }} >{status_ID === '166' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "166" ? COLORS.green : (status_ID < "166" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '166' ? ":" : "|"}</Text>
            <Text style={{ marginTop: -7, fontWeight: 800, fontSize: 16, color: status_ID === "166" ? COLORS.green : (status_ID < "166" ? COLORS.gray : COLORS.lightOrange) }}>{status_ID === '166' ? ":" : "|"}</Text>
          </View>

          {/* Employee Creation*/}
          <View style={{ flexDirection: 'row', flex: 1, }}>
            <Icons name={status_ID === "167" ? "text-box-check" : (status_ID > "167" ? "text-box-check" : "text-box")} size={30} color={status_ID === "167" ? COLORS.green :
              (status_ID < "167" ? COLORS.gray : COLORS.lightOrange)} />
            <Text style={{ textAlignVertical: 'center', marginLeft: 8, color: status_ID === "167" ? COLORS.green : (status_ID < "167" ? COLORS.gray : COLORS.lightOrange), fontSize: 16, fontWeight: status_ID === "167" ? 'bold' : 'normal' }}>Employee Creation</Text>
          </View>


        </View>

      </View>

    </ScrollView>
  )
}

export default Status_view_page