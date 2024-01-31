import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../../../components/Loader';
import {API} from '../../../../../utility/services';
import {COLORS, SIZES} from '../../../../../constants';
import {getpendingApprovalsData} from '../../../../../redux/aprovalPendingSlice';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const Pending = props => {
  const dispatch = useDispatch();
  const {pendingApprovalList} = useSelector(state => state.aprovalPending);

  const {navigation, flag, notificationCat, name} = props;
  const [pendingData, setPendingData] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);

  let action = 'P';
  let openingCategory, backColor;
  const userId = useSelector(state => state.auth.userId);

  const getData = () => {
    setLoaderVisible(true);
    axios
      .post(`${API}/api/hrms/getMailnotification`, {
        userId: userId,
        operFlag: 'P',
        notificationCat: notificationCat,
      })
      .then(response => {
        const returnedData = response?.data?.Result;

        console.log('pending34', returnedData);

        setPendingData(returnedData);
        setLoaderVisible(false);
      })
      .catch(error => {
        // console.log(error)
        setLoaderVisible(false);
      });
  };

  // useEffect(() => {
  //   const requestData = {
  //     userId: userId,
  //     operFlag: 'P',
  //     notificationCat: notificationCat,
  //   };

  //   dispatch(getpendingApprovalsData(requestData));
  //   console.log('sliceResponse', pendingApprovalList);
  // }, []);

  // useEffect(() => {
  //   getData();
  //   // console.log("Hello from pending")
  // }, [notificationCat]);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [notificationCat]),
  );

  function ListItems(props) {
    const date = props?.applyDate,
      mail_body = props?.mail,
      approver = props?.pending_by,
      candidate_ID = props?.id,
      category = props?.cat,
      jobId = props?.jobId;
    wholeList = props?.totalItem;

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
        onPress={() => {
          // console.log("data99",wholeList)
          navigation.navigate('Details', {
            candidate_ID,
            category,
            date,
            mail_body,
            approver,
            action,
            jobId,
            wholeList: props?.totalItem,
          });
        }}>
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
          {/* <Text>
            {JSON.stringify(wholeList)}
          </Text> */}
          <Text style={{fontSize: 14, fontWeight: '500', color: COLORS.black}}>
            Applied date {'-'}{' '}
            <Text
              style={{fontSize: 14, fontWeight: '400', color: COLORS.voilet}}>
              {' '}
              {date}
            </Text>{' '}
          </Text>
          <Text style={[{backgroundColor: backColor}, styles.categoryTag]}>
            {openingCategory}
          </Text>
        </View>

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
              justifyContent: 'space-between',
              marginRight: 10,
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
                    color: COLORS.orange1,
                    fontWeight: '500',
                    alignSelf: 'center',
                    backgroundColor: COLORS.disableOrange1,
                    borderRadius: SIZES.base / 2,
                    padding: SIZES.base / 2,
                  }}>
                  Pending by {approver}
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
            {!candidate_ID && jobId && (
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
        <Loader loaderVisible={loaderVisible} />
        {pendingData &&
        (pendingData[0] ? pendingData[0]?.APPROVER_ID : null) ? (
          <FlatList
            refreshing={loaderVisible}
            onRefresh={() => getData()}
            style={{marginVertical: 10}}
            data={pendingData}
            renderItem={({item}) => (
              <ListItems
                applyDate={item?.CREATED_DATE}
                mail={item?.MAIL_BODY}
                pending_by={item?.APPROVE_BY}
                id={item?.CANDIDATE_ID}
                jobId={item?.JOB_ID}
                cat={item?.NOTIFICATION_CAT}
                name={`${item?.FIRST_NAME} ${item?.LAST_NAME}`}
                designation={item?.JOB_TITLE}
                totalItem={item}
              />
            )}
          />
        ) : (
          <Text style={{textAlign: 'center', marginVertical: 20}}>
            No Data found
          </Text>
        )}
      </>
    );
  };

  return (
    <View>
      {flag === 'A' ? <Text> Attendance</Text> : null}
      {flag === 'C' ? <Text> Claim</Text> : null}
      {flag === 'E' ? <Text> EResign</Text> : null}
      {flag === 'H' ? <Hiring /> : null}
      {/* {console.warn("Inside pending " + notificationCat)} */}
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
});

export default Pending;
