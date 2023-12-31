import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import Pdf from 'react-native-pdf';
import Loader from '../../../components/Loader'
import COLORS from '../../../constants/theme';
import { FONTS } from '../../../constants/font_size';
import { Text } from 'react-native';
import { API } from '../../../utility/services';

const View_Doc = (props) => {
    const { file } = props.route.params
    const [loaderVisible, setLoaderVisible] = useState(true);
    const [error, setError] = useState(null)

    // console.log("extention", file);
    return (
        // <WebView source={{ uri: `https://econnectsatya.com:7033/AssesmentDoc/${file}` }} style={{ flex: 1 }} />

        <>
            {error && <Text style={{ color: COLORS.red, ...FONTS.h3, height: '100%', textAlignVertical: 'center', textAlign: 'center' }} >There is error in opening file. Either the file is missing or it is corrupted.</Text>}
            {file.split(".")[1] === "pdf" ?
                <Pdf trustAllCerts={false} source={{ uri: `${API}/AssesmentDoc/${file}` }} renderActivityIndicator={() => <Loader loaderVisible={loaderVisible} />} minScale={0.5} spacing={15} style={{ flex: 1, width: '100%' }} onLoadComplete={() => setLoaderVisible(false)} onError={(err) => { setError(err) }} onPressLink={(link) => Linking.openURL(link)} /> :
                <WebView source={{ uri: `${API}/AssesmentDoc/${file}` }} style={{ flex: 1 }} />
            }
        </>

    )
}

export default View_Doc