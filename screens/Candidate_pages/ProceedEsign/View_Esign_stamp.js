import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../../constants';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getCandidateList} from '../../../redux/eSignSlice';
import Pdf from 'react-native-pdf';
import {API} from '../../../utility/services';
import Loader from '../../../components/Loader';

const View_Esign_stamp = props => {
  const dispatch = useDispatch();
  const {candidateList, loading} = useSelector(state => state.eSign);
  const {candidateId} = useSelector(state => state.candidateAuth);

  const [documentUrl, setDocumentUrl] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [error, setError] = useState(false);

  const {index} = props.route.params;

  useEffect(() => {
    getEsignData();
    setDocument();
  }, []);

  useEffect(() => {
    const backAction = () => {
      props.navigation?.navigate('CandidateDashboard');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const getEsignData = async () => {
    const data = {
      user: candidateId,
      flag: 'V',
    };
    dispatch(getCandidateList(data));
  };

  // console.log('responseData', candidateList);
  // console.log('esignCount', candidateList[index]?.ESSIGN_CNT);
  // console.log('docTYpeeeeeeView', candidateList[index]?.DOCUMENT_TYPE);

  const setDocument = () => {
    if (
      candidateList[index]?.DOCUMENT_TYPE !== 'JOINING KIT' &&
      candidateList[index]?.DOCUMENT_TYPE !== 'Appointment Letter' &&
      candidateList[index]?.ESSIGN_CNT === 0
    ) {
      setDocumentUrl('IndementyBond/' + candidateList[index]?.FILE_NAME);
      console.log('1');
    } else if (
      candidateList[index]?.DOCUMENT_TYPE !== 'JOINING KIT' &&
      candidateList[index]?.DOCUMENT_TYPE !== 'Appointment Letter' &&
      candidateList[index]?.ESSIGN_CNT === 1
    ) {
      setDocumentUrl('CandidateSign/' + candidateList[index]?.FILE_NAME);
      console.log('2');
    } else if (
      candidateList[index]?.DOCUMENT_TYPE !== 'JOINING KIT' &&
      candidateList[index]?.DOCUMENT_TYPE !== 'Appointment Letter' &&
      candidateList[index]?.ESSIGN_CNT === 2
    ) {
      setDocumentUrl('FirstGranterSign/' + candidateList[index]?.FILE_NAME);
      console.log('3');
    } else if (
      candidateList[index]?.DOCUMENT_TYPE === 'JOINING KIT' &&
      candidateList[index]?.ESSIGN_CNT === 0
    ) {
      setDocumentUrl('AllMergeDoc/' + candidateList[index]?.FILE_NAME);
      console.log('4');
    } else if (
      candidateList[index]?.DOCUMENT_TYPE === 'Appointment Letter' &&
      candidateList[index]?.ESSIGN_CNT === 0
    ) {
      setDocumentUrl(
        'CreatedAppointmentDoc/' + candidateList[index]?.FILE_NAME,
      );
      console.log('5');
    } else {
      console.log('6');
      console.log('kdocjsghjhg', candidateList[index]?.DOCUMENT_TYPE);
      console.log('count', JSON.stringify(candidateList[index]?.ESSIGN_CNT));
      if (candidateList[index]?.DOCUMENT_TYPE === 'JOINING KIT') {
        setDocumentUrl('AllMergeDocSigned/' + candidateList[index]?.FILE_NAME);
      }
      if (candidateList[index]?.DOCUMENT_TYPE === 'Appointment Letter') {
        setDocumentUrl(
          'AppointmentSignedDoc/' + candidateList[index]?.FILE_NAME,
        );
        console.log('trueeee');
      } else {
        setDocumentUrl('SignedDocument/' + candidateList[index]?.FILE_NAME);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* Top headerView */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          elevation: 6,
          backgroundColor: COLORS.white,
          padding: 15,
        }}>
        <TouchableOpacity
          onPress={
            () => props.navigation.navigate('CandidateDashboard')
            // {
            // props.navigation.goBack();
            // getEsignData();
            // }
          }>
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
          View Document
          {console.log('documentUrlsllll', `${API}${documentUrl}`)}
        </Text>
      </View>

      <View style={{flex: 1}}>
        <Pdf
          trustAllCerts={false}
          source={{
            uri: `${API}${documentUrl}`,
          }}
          onError={error => {
            console.log('pdfError', error);
          }}
          style={{
            flex: 1,
          }}
        />
        {/* {console.log('docUrlll', `${API}${documentUrl}`)} */}
      </View>
    </View>
  );
};

export default View_Esign_stamp;
