import Icons from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Linking, ToastAndroid, PermissionsAndroid, SafeAreaView, View } from 'react-native';
import Pdf from 'react-native-pdf';
import Loader from '../../components/Loader';
import RNFetchBlob from 'rn-fetch-blob';
import COLORS from '../../constants/theme';

const Offer_Letter = () => {
  const userId = useSelector(state => state.candidateAuth.candidateId)
  const [offerLetter, setOfferLetter] = useState()
  const [loaderVisible, setLoaderVisible] = useState(true);

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
    totalData = totalData.Result[0].OFFER_LETTER
    // console.warn(totalData);
    if (!totalData) {
      ToastAndroid.show("No Offer letter is Present", 3000)
    }
    setOfferLetter(totalData)
  }

  // { console.warn("offer letter", offerLetter) }
  return (

    <>
      <View style={{ flexDirection: 'row', paddingVertical: 20, alignItems: 'center', marginTop: 5, marginBottom: 20 }}>

        {offerLetter &&
          <Icons name='file-download' onPress={() => requestFilePermission()} color={COLORS.black} size={30} style={{ position: 'absolute', right: 20 }} />}

      </View>
      {offerLetter && (
        <Pdf trustAllCerts={false} source={{ uri: `https://econnectsatya.com:7033/OfferLetter/${offerLetter}` }} renderActivityIndicator={() => <Loader loaderVisible={loaderVisible} />} minScale={0.5} spacing={15} style={{ flex: 1, width: '100%' }} onLoadComplete={() => setLoaderVisible(false)} onError={(err) => { ToastAndroid.show(err, 4000) }} onPressLink={(link) => Linking.openURL(link)} />)}
    </>
  )
}

export default Offer_Letter