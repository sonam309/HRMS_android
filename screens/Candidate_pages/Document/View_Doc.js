import React from 'react';
import { WebView } from 'react-native-webview';

const View_Doc = (props) => {
    const { file } = props.route.params
    return (
        // <WebView source={{ uri: `https://econnectsatya.com:7033/AssesmentDoc/${file}` }} style={{ flex: 1 }} />

        <>
            {error && <Text style={{color:COLORS.red,...FONTS.h3, height:'100%',textAlignVertical:'center',textAlign:'center'}} >There is error in opening file. Either the file is missing or it is corrupted.</Text>}
            <Pdf trustAllCerts={false} source={{ uri: `https://econnectsatya.com:7033/AssesmentDoc/${file}` }} renderActivityIndicator={() => <Loader loaderVisible={loaderVisible} />} minScale={0.5} spacing={15} style={{ flex: 1, width: '100%' }} onLoadComplete={() => setLoaderVisible(false)} onError={(err) => { setError(err) }} onPressLink={(link) => Linking.openURL(link)} />


        </>
    )
}

export default View_Doc