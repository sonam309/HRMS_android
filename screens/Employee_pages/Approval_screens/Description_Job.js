import Pdf from 'react-native-pdf';
import { useState } from 'react';
import Loader from '../../../components/Loader';
import { Linking,Text } from 'react-native';
import COLORS from '../../../constants/theme';
import { API } from '../../../utility/services';

const Description_Job = (props) => {
    const { JD } = props.route.params;

    const [error, setError] = useState(null)

    const [loaderVisible, setLoaderVisible] = useState(true);
    return (
        // <Text>Hello</Text>
        <>
            {error && <Text style={{paddingHorizontal:15, color:COLORS.red, fontSize:18, height:'100%', textAlignVertical:'center', textAlign:'center', fontWeight:500 }}>There is error in opening file. Either the file is missing or it is corrupted.</Text>}
            <Pdf trustAllCerts={false} source={{ uri: `${API}/jobDesDoc/${JD}` }} renderActivityIndicator={() => <Loader loaderVisible={loaderVisible} />} minScale={0.5} spacing={15} style={{ flex: 1, width: '100%' }} onLoadComplete={() => setLoaderVisible(false)} onError={(err) => { setError(err) }} onPressLink={(link) => Linking.openURL(link)} />
        </>
    )
}

export default Description_Job