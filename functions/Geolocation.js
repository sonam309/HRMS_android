import {Alert, PermissionsAndroid} from 'react-native';
import GetLocation from 'react-native-get-location';
import Punch from './Punch';
import ReverseGeocoding from './ReverseGeocoding';
import {updatePunchTime} from '../redux/punchDetailSlice';
import store from '../redux/store';


const Geolocation = async ({val, userId, password, type}) => {
    store.dispatch(updatePunchTime({
        loading: true
    }));
  let action = val === 'I' ? 'In' : 'Out';

  // Degree to radians
  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  // distance from longitude and latitutde in KM
  const getDistInKm = (lat1, lon1, lat2, lon2) => {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1); // deg2rad above
    let dLon = deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  };

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  granted === PermissionsAndroid.RESULTS.GRANTED
    ? GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 30000,
      })
        .then(location => {
          dist = getDistInKm(
            location.latitude,
            location.longitude,
            28.54395,
            77.33066,
          );
          ReverseGeocoding(location.latitude, location.longitude);
          dist < 0.3
            ? Punch({val, userId, password, type})
            : Alert.alert(`Punch ${action} from your office`);
            store.dispatch(updatePunchTime({
                loading: false
            }));
        })
        .catch(error => {
          const {code, message} = error;
          Alert.alert(code, message);
          store.dispatch(updatePunchTime({
            loading: false
        }));
        })
    : Alert.alert('Location permission not granted');
    store.dispatch(updatePunchTime({
        loading: false
    }));
};

export default Geolocation;
