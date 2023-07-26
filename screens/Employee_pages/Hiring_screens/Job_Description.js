import { Linking, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import { useState } from 'react';
import Loader from '../../../components/Loader'
import COLORS from '../../../constants/theme';
import { FONTS } from '../../../constants/font_size';
import { API } from '../../../utility/services';

const Job_Description = (props) => {
    const { Job_Desc } = props.route.params;
    const [loaderVisible, setLoaderVisible] = useState(true);
    const [error, setError] = useState(null)

   

    return (
        <>
            {error && <Text style={{color:COLORS.red,...FONTS.h3, height:'100%',textAlignVertical:'center',textAlign:'center'}} >There is error in opening file. Either the file is missing or it is corrupted.</Text>}
            <Pdf trustAllCerts={false} source={{ uri: `${API}/jobDesDoc/${Job_Desc}` }} renderActivityIndicator={() => <Loader loaderVisible={loaderVisible} />} minScale={0.5} spacing={15} style={{ flex: 1, width: '100%' }} onLoadComplete={() => setLoaderVisible(false)} onError={(err) => { setError(err) }} onPressLink={(link) => Linking.openURL(link)} />


        </>

    )
}

export default Job_Description