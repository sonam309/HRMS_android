import React from 'react';
import { WebView } from 'react-native-webview';

const View_Doc = (props) => {
    const { file } = props.route.params
    return (
        <WebView source={{ uri: `https://econnectsatya.com:7033/AssesmentDoc/${file}` }} style={{ flex: 1 }} />
    )
}

export default View_Doc