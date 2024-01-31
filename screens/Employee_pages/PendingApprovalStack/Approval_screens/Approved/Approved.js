import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {API} from '../../../../../utility/services';
import {COLORS, FONTS, SIZES} from '../../../../../constants';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useFocusEffect} from '@react-navigation/native';

const Approved = props => {
  const {navigation, flag, notificationCat, name} = props;
  const [approvedData, setApprovedData] = useState([]);
  let action = 'A';
  let openingCategory, backColor;
  const userId = useSelector(state => state.auth.userId);

  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    axios
      .post(`${API}/api/hrms/getMailnotification`, {
        userId: userId,
        operFlag: 'Y',
        notificationCat: notificationCat,
      })
      .then(response => {
        const returnedData = response?.data?.Result;
        // console.log('approvals', returnedData);
        setApprovedData(returnedData);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        // console.log(error)
      });
  };

  // useEffect(() => {
  //   getData();
  // }, [notificationCat]);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [notificationCat]),
  );

  function ListItems(props) {
    const date = props.applyDate,
      mail_body = props.mail,
      approver = props.approved_by,
      candidate_ID = props.id,
      category = props.cat,
      jobId = props.jobId;

    switch (category) {
      case 'New Job Opening':
        openingCategory = 'Job Opening';
        backColor = COLORS.voilet;
        break;
      case 'New Job Request':
        openingCategory = 'Job Request';
        backColor = COLORS.lightBlue;
        break;
      case 'Salary Allocation':
        openingCategory = 'Salary';
        backColor = COLORS.red;
        break;
    }

    return (
      <TouchableOpacity
        key={candidate_ID}
        style={[styles.ListIcons]}
        onPress={() =>
          navigation.navigate('Details', {
            candidate_ID,
            category,
            date,
            mail_body,
            approver,
            action,
            jobId,
          })
        }>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: COLORS.lightGray1,
            paddingVertical: SIZES.base,
            paddingHorizontal: SIZES.base,
            // borderStyle: 'dashed',
          }}>
          <Text style={{fontSize: 14, fontWeight: '500', color: COLORS.black}}>
            Applied date {'-'}
            <Text
              style={{fontSize: 14, fontWeight: '400', color: COLORS.voilet}}>
              {date}
            </Text>
          </Text>
          <Text style={[{backgroundColor: backColor}, styles.categoryTag]}>
            {openingCategory}
          </Text>
        </View>

        {/* <View style={{
          height: 1,
          backgroundColor :COLORS.lightGray1,
          marginTop: SIZES.base,
          width: "110%",
          alignSelf: "center"
        }} /> */}

        <View
          style={{
            paddingVertical: SIZES.base,
            // borderBottomWidth: 1,
            borderColor: COLORS.lightGray1,
            paddingHorizontal: SIZES.base,
            marginTop: SIZES.base,
            gap: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {approver != '-' ? (
              <View
                style={{
                  width: responsiveWidth(50),
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.green,
                    fontWeight: '500',
                    alignSelf: 'center',
                    backgroundColor: COLORS.disableGreen,
                    borderRadius: SIZES.base / 2,
                    padding: SIZES.base / 2,
                  }}>
                  Approved by {approver}
                </Text>
              </View>
            ) : null}

            <View
              style={{
                width: responsiveWidth(50),
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {candidate_ID && (
                <Text
                  style={{
                    color: COLORS.orange1,
                    backgroundColor: COLORS.disableOrange1,
                    padding: SIZES.base / 2,
                    borderRadius: SIZES.base / 2,
                    fontWeight: '500',
                  }}>
                  Candidate ID- ({candidate_ID})
                </Text>
              )}
              {/* {candidate_ID && jobId && (
              <Text style={{color: COLORS.orange1}}>Job ID- ({jobId})</Text>
            )} */}
            </View>
          </View>
          <View
            style={{
              width: responsiveWidth(50),
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: SIZES.base / 2,
            }}>
            {candidate_ID && jobId && (
              <Text
                style={{
                  color: COLORS.orange1,
                  backgroundColor: COLORS.disableOrange1,
                  padding: SIZES.base / 2,
                  borderRadius: SIZES.base / 2,
                  fontWeight: '500',
                }}>
                Job ID- ({jobId})
              </Text>
            )}
            {/* {candidate_ID && jobId && (
              <Text style={{color: COLORS.orange1}}>Job ID- ({jobId})</Text>
            )} */}
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: SIZES.base,
          }}>
          <Text
            style={{
              fontSize: 14,
              // marginVertical: ,
              color: COLORS.darkerGrey,
              paddingVertical: SIZES.base / 2,
            }}>
            {mail_body}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  const Hiring = () => {
    return (
      <>
        {approvedData &&
        (approvedData[0] ? approvedData[0].APPROVER_ID : null) ? (
          <FlatList
            refreshing={loading}
            onRefresh={() => getData()}
            style={{marginVertical: 10}}
            data={approvedData}
            renderItem={({item}) => (
              <ListItems
                applyDate={item.CREATED_DATE}
                mail={item.MAIL_BODY}
                approved_by={item.APPROVE_BY}
                id={item.CANDIDATE_ID}
                jobId={item.JOB_ID}
                cat={item.NOTIFICATION_CAT}
              />
            )}
          />
        ) : (
          <Text style={{textAlign: 'center', marginVertical: 20}}>
            No Data Found
          </Text>
        )}
      </>
    );
  };

  return (
    <View>
      {flag === 'A' ? <Text>Attendance</Text> : null}
      {flag === 'C' ? <Text> Claim</Text> : null}
      {flag === 'E' ? <Text> EResign</Text> : null}
      {flag === 'H' ? <Hiring /> : null}
    </View>
  );
};

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
    width: responsiveWidth(92),
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.base,
    marginBottom: SIZES.base,
    borderRadius: SIZES.base,
    borderWidth: 1,
    borderColor: COLORS.lightGray1,
    overflow: 'hidden',
  },
  categoryTag: {
    color: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: SIZES.base / 2,
  },
  textStyle: {
    color: COLORS.black,
    ...FONTS.h1,
    margin: 40,
    textAlign: 'center',
  },
});

export default Approved;
