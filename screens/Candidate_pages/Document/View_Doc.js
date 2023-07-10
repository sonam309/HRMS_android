import React from 'react';
import { WebView } from 'react-native-webview';

const View_Doc = (props) => {
    const { file } = props.route.params
    return (
        <WebView source={{ uri: `http://192.168.1.169:7038/AssesmentDoc/${file}` }} style={{ flex: 1 }} />
    )
}

export default View_Doc