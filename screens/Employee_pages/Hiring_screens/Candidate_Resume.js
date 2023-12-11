import {Linking, Text} from 'react-native';
import Pdf from 'react-native-pdf';
import {useState} from 'react';
import Loader from '../../../components/Loader';
import {API} from '../../../utility/services';
import {COLORS} from '../../../constants';

const Candidate_Resume = props => {
  const {resume} = props.route.params;
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [error, setError] = useState(null);

  return (
    // fetching Resume from backend
    <>
      {error && (
        <Text
          style={{
            paddingHorizontal: 15,
            color: COLORS.red,
            fontSize: 18,
            height: '100%',
            textAlignVertical: 'center',
            textAlign: 'center',
            fontWeight: 500,
          }}>
          There is error in opening file. Either the file is missing or it is
          corrupted.
        </Text>
      )}
      <Pdf
        trustAllCerts={false}
        source={{uri: `${API}/Resume/${resume}`}}
        renderActivityIndicator={() => <Loader loaderVisible={loaderVisible} />}
        minScale={0.5}
        spacing={15}
        style={{flex: 1, width: '100%'}}
        onLoadComplete={() => setLoaderVisible(false)}
        onError={err => {
          setError(err);
        }}
        onPressLink={link => Linking.openURL(link)}
      />
    </>
  );
};

export default Candidate_Resume;
