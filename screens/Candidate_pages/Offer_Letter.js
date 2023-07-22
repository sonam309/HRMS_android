import Icons from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Linking, ToastAndroid, PermissionsAndroid, SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import Loader from '../../components/Loader';
import RNFetchBlob from 'rn-fetch-blob';
import COLORS from '../../constants/theme';
import { SIZES, FONTS } from '../../constants/font_size';
import axios from 'axios';
import WebView from 'react-native-webview';

const Offer_Letter = (props) => {
  const userId = useSelector(state => state.candidateAuth.candidateId)
  const [offerLetter, setOfferLetter] = useState()
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [btnVisibility, setBtnVisibility] = useState(true);

  const [error, setError] = useState(false);
  const [offerLetterUrl, setOfferLetterUrl] = useState('');


  useEffect(() => {
    getOfferLetter()
  }, [])

  const requestFilePermission = async () => {
    // console.warn("Inside permisiion funct");
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'File Permission',
          message:
            'Satya HRMS needs access to your storage',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile();
      } else {
        ToastAndroid.show('Storage access denied', 5000);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadFile = () => {
    const { config, fs } = RNFetchBlob;
    const fileDir = fs.dirs.DownloadDir;

    config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        description: "Downloading File",
        path: fileDir + "/download_" + ".pdf"
      }
    })
      // .fetch('GET', `https://econnectsatya.com:7033/OfferLetter/${offerLetter}`, {
      .fetch('GET', `https://econnectsatya.com:7033/OfferLetter/${offerLetter}`, {
        //some headers ..
      })
      .then((res) => {
        // the temp file path
        console.log('The file saved to ', res.path())
        ToastAndroid.show("File saved Successfully to" + res.path(), 4000)
      })
  }

  // Fetching salary allocation template
  const getOfferLetter = async () => {

    const data = {
      candidateId: userId, operFlag: "V"
    }

    let totalData = await fetch('https://econnectsatya.com:7033/api/hrms/OfferAceptance', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    totalData = await totalData.json()
    totalData = totalData.Result[0]
    console.log("totaldata", totalData);
    setOfferLetterUrl("https://econnectsatya.com:7033/OfferLetter/" + totalData.OFFER_LETTER);
    // console.log("Urloffer", "https://econnectsatya.com:7033/OfferLetter/" + totalData.OFFER_LETTER);
    if (!totalData) {
      ToastAndroid.show("No Offer letter is Present", 3000)
    }
    if (
      totalData?.FLAG == 'S' &&
      totalData?.OFER_ACPT_FLAG == 'R'
    ) {
      setBtnVisibility(false);
    } else if (
      totalData?.FLAG == 'S' &&
      totalData?.STATUS == 124
    ) {
      setBtnVisibility(true);
    } else {
      setBtnVisibility(false);
    }
    setOfferLetter(totalData.OFFER_LETTER)
  }

  const approveOffer = operFlag => {
    const data = {
      candidateId: userId,
      operFlag: operFlag,
    };

    console.log("345678765432", data);

    axios
      .post('https://econnectsatya.com:7033/api/hrms/OfferAceptance', data)
      .then(res => {
        console.log('hjsdfvhjs', res?.data?.Result);

        if (res?.data?.Result[0]?.FLAG == 'S') {
          ToastAndroid.show(JSON.stringify(res?.data?.Result[0]?.MSG), 3000);
          props.navigation.goBack();
        }
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show(JSON.stringify(error), 3000);
      });
  };


  // { console.warn("offer letter", offerLetter) }
  return (

    <>
      <View style={{ flexDirection: 'row', paddingVertical: 20, alignItems: 'center', marginTop: 5, marginBottom: 20 }}>
        {offerLetter &&
          <Icons name='file-download' onPress={() => requestFilePermission()} color={COLORS.black} size={30} style={{ position: 'absolute', right: 20 }} />}

        {typeof offerLetter === 'undefined' || offerLetter === null &&
          <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: "60%"
          }}>
            <Text style={{ textAlign: "center", color: COLORS.red, ...FONTS.h2 }}>Offer Letter not</Text>
          </View>
        }

      </View>
      {offerLetter && offerLetter != "" ? (
        <Pdf trustAllCerts={false} source={{ uri: `https://econnectsatya.com:7033/OfferLetter/${offerLetter}` }} renderActivityIndicator={() => <Loader loaderVisible={loaderVisible} />} minScale={0.5} spacing={15} style={{ flex: 1, width: '100%' }} onLoadComplete={() => setLoaderVisible(false)} onError={(error) => {
          setError(true)
        }} onPressLink={(link) => Linking.openURL(link)} />
      ):"" }

      {error && (<Text style={{ flex: 1, textAlign: "center", color: COLORS.red, ...FONTS.h2 }}>File or directory not found</Text>)}


      {offerLetter && !error&& (<View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 20,
          backgroundColor: COLORS.white,
          paddingVertical: SIZES.base,
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          disabled={!btnVisibility}
          onPress={() => approveOffer('A')}
          style={{
            backgroundColor: COLORS.white,
            padding: SIZES.base,
            paddingHorizontal: SIZES.radius,
            // borderWidth: 1,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: btnVisibility ? COLORS.green : COLORS.lightGray,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.h3,
              color: btnVisibility ? COLORS.green : COLORS.lightGray,
            }}>
            Accept
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!btnVisibility}
          onPress={() => approveOffer('R')}
          style={{
            backgroundColor: COLORS.white,
            padding: SIZES.base,
            paddingHorizontal: SIZES.radius,
            // borderWidth: 1,
            borderWidth: 1,
            borderColor: btnVisibility ? COLORS.red : COLORS.lightGray,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.h3,
              color: btnVisibility ? COLORS.red : COLORS.lightGray,
            }}>
            Reject
          </Text>
        </TouchableOpacity>
      </View>)}
    </>
  )
}

export default Offer_Letter