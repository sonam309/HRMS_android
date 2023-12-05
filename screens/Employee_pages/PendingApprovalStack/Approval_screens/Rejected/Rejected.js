import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import COLORS from '../../../../../constants/theme';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {API} from '../../../../../utility/services';

const Rejected = props => {
  const {navigation, flag, notificationCat, name} = props;
  const [rejectedData, setRejectedData] = useState([]);

  const [loading, setLoading] = useState(false);

  let action = 'R';
  let openingCategory, backColor;
  const userId = useSelector(state => state.auth.userId);

  const getData = () => {
    setLoading(true);
    axios
      .post(`${API}/api/hrms/getMailnotification`, {
        userId: userId,
        operFlag: 'R',
        notificationCat: notificationCat,
      })
      .then(response => {
        const returnedData = response?.data?.Result;
        // console.log("Reject",returnedData);
        setRejectedData(returnedData);
        setLoading(false);
      })
      .catch(error => {
        // console.log(error)
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [notificationCat]);

  function ListItems(props) {
    const date = props.applyDate,
      mail_body = props.mail,
      approver = props.rejected_by,
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
        style={[styles.ListIcons, styles.Elevation]}
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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

        <Text
          style={{fontSize: 14, marginVertical: 8, color: COLORS.darkerGrey}}>
          {mail_body}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 10,
          }}>
          {approver != '-' ? (
            <Text style={{fontSize: 14, color: COLORS.red, fontWeight: '400'}}>
              Rejected by {approver}
            </Text>
          ) : null}
          {candidate_ID && (
            <Text style={{color: COLORS.orange1}}>
              Candidate ID- ({candidate_ID})
            </Text>
          )}

          {!candidate_ID && jobId && (
            <Text style={{color: COLORS.orange1}}>Job ID- ({jobId})</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  const Hiring = () => {
    return (
      <>
        {rejectedData &&
        (rejectedData[0] ? rejectedData[0].APPROVER_ID : null) ? (
          <FlatList
            onRefresh={getData}
            refreshing={loading}
            style={{marginVertical: 10}}
            data={rejectedData}
            renderItem={({item}) => (
              <ListItems
                applyDate={item.CREATED_DATE}
                mail={item.MAIL_BODY}
                jobId={item.JOB_ID}
                rejected_by={item.REJECT_BY}
                id={item.CANDIDATE_ID}
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
      {flag === 'A' ? <Text> Attendance</Text> : null}
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
    backgroundColor: COLORS.white,
    marginVertical: 4,
    marginHorizontal: 8,
    paddingLeft: 12,
    paddingVertical: 8,
    borderRadius: 18,
    overflow: 'hidden',
  },
  categoryTag: {
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 1,
    marginRight: -5,
    borderRadius: 10,
  },
});

export default Rejected;
