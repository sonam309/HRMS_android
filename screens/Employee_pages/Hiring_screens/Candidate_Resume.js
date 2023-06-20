import { Linking, ToastAndroid } from 'react-native';
import Pdf from 'react-native-pdf';
import { useState } from 'react';
import Loader from '../../../components/Loader';

const Candidate_Resume = (props) => {
    const { resume } = props.route.params;
    const [loaderVisible, setLoaderVisible] = useState(true);

    return (
// fetching Resume from backend 
        <Pdf trustAllCerts={false} source={{ uri: `http://192.168.1.169:7038/Resume/${resume}` }} renderActivityIndicator={() => <Loader loaderVisible={loaderVisible} />} minScale={0.5} spacing={15} style={{ flex: 1, width: '100%' }} onLoadComplete={() => setLoaderVisible(false)} onError={(err) => {ToastAndroid.show(err, 4000)}} onPressLink={(link)=>Linking.openURL(link)} />
    )
}

export default Candidate_Resume