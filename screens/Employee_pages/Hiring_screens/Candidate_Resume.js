import { Linking, ToastAndroid } from 'react-native';
import Pdf from 'react-native-pdf';
import { useState } from 'react';
import Loader from '../../../components/Loader';

const Candidate_Resume = (props) => {
    const { resume } = props.route.params;
    const [loaderVisible, setLoaderVisible] = useState(true);
    let parsed = JSON.stringify(resume)
    return (

        <Pdf trustAllCerts={false} source={{ uri: `https://econnectsatya.com:7033/Resume/${parsed}` }} renderActivityIndicator={() => <Loader loaderVisible={loaderVisible} />} minScale={0.5} spacing={15} style={{ flex: 1, width: '100%' }} onLoadComplete={() => setLoaderVisible(false)} onError={(err) => {ToastAndroid.show(err, 4000)}} onPressLink={(link)=>Linking.openURL(link)} />
    )
}

export default Candidate_Resume