import { View, Text, ScrollView, StyleSheet,TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme'
import axios from 'axios'

const Rejected = (props) => {
    const {navigation} = props;
    const { flag } = props.route.params

    const [pendingData, setPendingData] = useState([])

    const getData = () => {
        axios.post(`https://econnectsatya.com:7033/api/hrms/getMailnotification`, { userId: '10011', operFlag: 'R', })
            .then(response => {
                const returnedData = response?.data?.Result;
                // console.log(returnedData);
                setPendingData(returnedData);
            });
    };

    useEffect(() => {
        getData();
    }, [])

    function Icons(props) {
        const date = props.applyDate, mail_body = props.mail, rejected_by = props.rejected_by, keys = props.id
        return (
            <TouchableOpacity key = {keys} style={[{ backgroundColor: COLORS.white, marginVertical: 4,marginHorizontal:8, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 18, elevation: 20 }, styles.Elevation]} onPress={()=>navigation.navigate("Data",{keys})}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: COLORS.black }}>Applied date {'-'} <Text style={{ fontSize: 14, fontWeight: '400', color: COLORS.voilet }}> {date}</Text> </Text>

                <Text style={{ fontSize: 14, marginVertical: 8, color: COLORS.darkerGrey, }}>{mail_body}</Text>

                {rejected_by != '-' ? (<Text style={{ fontSize: 14, color: COLORS.red, fontWeight: '400' }}>Rejected by {rejected_by}</Text>) : null}
            </TouchableOpacity>
        )
    }

    const Hiring = () => {
        return (
            <ScrollView>
                {pendingData ?
                    pendingData.map((item) => <Icons applyDate={item.CREATED_DATE} mail={item.MAIL_BODY} rejected_by={item.APPROVE_BY} id={item.CANDIDATE_ID}/>) :
                    <Text>No Data Found</Text>
                }
            </ScrollView>
        )
    }

    return (
        <View>
            {flag === "A" ? <Text>It is inside Attendance</Text> : null}
            {flag === "C" ? <Text>It is inside Claim</Text> : null}
            {flag === "E" ? <Text>It is inside EResign</Text> : null}
            {flag === "H" ? <Hiring/> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    Elevation: {
        elevation: 7,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
})

export default Rejected