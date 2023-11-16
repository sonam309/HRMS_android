import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FONTS, SIZES} from '../../../constants/font_size';
import COLORS from '../../../constants/theme';
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

  const getEsignData = async () => {
    const data = {
      user: candidateId,
      flag: 'V',
    };
    dispatch(getCandidateList(data));
  };

  const setDocument = () => {
    if (
      candidateList[index]?.DOCUMENT_TYPE !== 'JOINING KIT' &&
      candidateList[index]?.ESSIGN_CNT === 0
    ) {
      setDocumentUrl('IndementyBond/' + candidateList[index]?.FILE_NAME);
    } else if (
      candidateList[index]?.DOCUMENT_TYPE !== 'JOINING KIT' &&
      candidateList[index]?.ESSIGN_CNT === 1
    ) {
      setDocumentUrl('CandidateSign/' + candidateList[index]?.FILE_NAME);
    } else if (
      candidateList[index]?.DOCUMENT_TYPE !== 'JOINING KIT' &&
      candidateList[index]?.ESSIGN_CNT === 2
    ) {
      setDocumentUrl('FirstGranterSign/' + candidateList[index]?.FILE_NAME);
    } else if (
      candidateList[index]?.DOCUMENT_TYPE === 'JOINING KIT' &&
      candidateList[index]?.ESSIGN_CNT === 0
    ) {
      setDocumentUrl('joiningKitDoc/' + candidateList[index]?.FILE_NAME);
    } else {
      if (candidateList[index]?.DOCUMENT_TYPE === 'JOINING KIT') {
        setDocumentUrl(
          'JoiningKitSignedDocument/' + candidateList[index]?.FILE_NAME,
        );
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
            //  props.navigation.goBack()
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
        {console.log('docUrlll', `${API}${documentUrl}`)}
      </View>
    </View>
  );
};

export default View_Esign_stamp;
