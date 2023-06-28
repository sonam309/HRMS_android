import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../../../constants/theme'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Pending = (props) => {
    const { navigation, flag, notificationCat } = props;
    const [pendingData, setPendingData] = useState([])
    let action = "P";
    let openingCategory, backColor;
    const userId = useSelector(state => state.auth.userId)

    const getData = () => {
        axios.post(`https://econnectsatya.com:7033/api/hrms/getMailnotification`, { userId: userId, operFlag: 'P', notificationCat: notificationCat })
            .then(response => {
                const returnedData = response?.data?.Result;
                // console.log(returnedData);
                setPendingData(returnedData);
            });
    };

    useEffect(() => {
        getData();
    }, [notificationCat])

    function ListItems(props) {
        const date = props.applyDate, mail_body = props.mail, approver = props.pending_by, candidate_ID = props.id, category = props.cat, jobId = props.jobId

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

                {approver != '-' ? (<Text style={{ fontSize: 14, color: COLORS.orange, fontWeight: '400' }}>Pending by {approver}</Text>) : null}
            </TouchableOpacity>
        )
    }

    const Hiring = () => {
        return (
            <>
                {pendingData && (pendingData[0] ? pendingData[0].APPROVER_ID : null) ? <FlatList style={{ marginVertical: 10 }} data={pendingData} renderItem={({ item }) => <ListItems applyDate={item.CREATED_DATE} mail={item.MAIL_BODY} pending_by={item.APPROVE_BY} id={item.CANDIDATE_ID} jobId={item.JOB_ID} cat={item.NOTIFICATION_CAT} />} /> : <Text style={{ textAlign: 'center', marginVertical: 20 }}>No Data found</Text>}
            </>

        )
    }

    return (
        <View>
            {flag === "A" ? <Text>It is inside Attendance</Text> : null}
            {flag === "C" ? <Text>It is inside Claim</Text> : null}
            {flag === "E" ? <Text>It is inside EResign</Text> : null}
            {flag === "H" ? <Hiring /> : null}
            {/* {console.warn("Inside pending " + notificationCat)} */}
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
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 1,
        marginRight: -5,
        borderRadius: 10
    }
})

export default Pending