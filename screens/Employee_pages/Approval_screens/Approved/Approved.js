import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { API } from '../../../../utility/services'
import { FONTS } from '../../../../constants/font_size'

const Approved = (props) => {
    const { navigation, flag, notificationCat } = props;
    const [approvedData, setApprovedData] = useState([])
    let action = "A";
    let openingCategory, backColor;
    const userId = useSelector(state => state.auth.userId)

    const getData = () => {
        axios.post(`${API}/api/hrms/getMailnotification`, { userId: userId, operFlag: 'Y', notificationCat: notificationCat })
            .then(response => {
                const returnedData = response?.data?.Result;
                console.log("approvals", returnedData);
                setApprovedData(returnedData);
            });
    };

    useEffect(() => {
        getData();
    }, [notificationCat])

    function ListItems(props) {
        const date = props.applyDate, mail_body = props.mail, approver = props.approved_by, candidate_ID = props.id, category = props.cat, jobId = props.jobId

        switch (category) {
            case 'New Job Opening':
                openingCategory = 'Job Opening'
                backColor = COLORS.voilet
                break;
            case 'New Job Request':
                openingCategory = 'Job Request'
                backColor = COLORS.lightBlue
                break;
            case 'Salary Allocation':
                openingCategory = 'Salary'
                backColor = COLORS.red
                break;
        }

        return (
            <TouchableOpacity key={candidate_ID} style={[styles.ListIcons, styles.Elevation]} onPress={() => navigation.navigate("Details", { candidate_ID, category, date, mail_body, approver, action, jobId })}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: COLORS.black }}>Applied date {'-'} <Text style={{ fontSize: 14, fontWeight: '400', color: COLORS.voilet }}> {date}</Text> </Text>
                    <Text style={[{ backgroundColor: backColor }, styles.categoryTag]}>{openingCategory}</Text>
                </View>

                <Text style={{ fontSize: 14, marginVertical: 8, color: COLORS.darkerGrey, }}>{mail_body}</Text>
                {approver != '-' ? (<Text style={{ fontSize: 14, color: COLORS.green, fontWeight: '400' }}>Approved by {approver}</Text>) : null}
            </TouchableOpacity>
        )
    }

    const Hiring = () => {
        return (
            <>
                {approvedData && (approvedData[0] ? approvedData[0].APPROVER_ID : null) ? <FlatList style={{ marginVertical: 10 }} data={approvedData} renderItem={({ item }) => <ListItems applyDate={item.CREATED_DATE} mail={item.MAIL_BODY} approved_by={item.APPROVE_BY} id={item.CANDIDATE_ID} jobId={item.JOB_ID} cat={item.NOTIFICATION_CAT} />} /> : <Text style={{ textAlign: 'center', marginVertical: 20 }}>No Data Found</Text>}
            </>
        )
    }
    

    return (
        <View>
            {flag === "A" ? <Text>Attendance</Text> : null}
            {flag === "C" ? <Text> Claim</Text> : null}
            {flag === "E" ? <Text> EResign</Text> : null}
            {flag === "H" ? <Hiring /> : null}
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
    ListIcons: {
        backgroundColor: COLORS.white,
        marginVertical: 4,
        marginHorizontal: 8,
        paddingLeft: 12,
        paddingVertical: 8,
        borderRadius: 18,
        overflow: 'hidden'
    },
    categoryTag: {
        color: COLORS.white,
        paddingHorizontal: 10,
        paddingVertical: 1,
        marginRight: -5,
        borderRadius: 10
    },
    textStyle: {
        color: COLORS.black,
        ...FONTS.h1,
        margin: 40,
        textAlign: 'center'

    }
})

export default Approved