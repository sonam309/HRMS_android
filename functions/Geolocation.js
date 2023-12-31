import { Alert, PermissionsAndroid } from 'react-native'
import GetLocation from 'react-native-get-location'
import Punch from './Punch';
import ReverseGeocoding from './ReverseGeocoding';

const Geolocation = async ({ val }) => {
    let action = (val === "I" ? "In" : "Out")

    // Degree to radians 
    const deg2rad = (deg) => {
        return deg * (Math.PI / 180)
    }

    // distance from longitude and latitutde in KM
    const getDistInKm = (lat1, lon1, lat2, lon2) => {
        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2 - lat1);  // deg2rad above
        let dLon = deg2rad(lon2 - lon1);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        return d;
    }


    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    granted === PermissionsAndroid.RESULTS.GRANTED ? (GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 30000,
    })
        .then(location => {
            // console.log(location);
            dist = getDistInKm(location.latitude, location.longitude, 28.54395, 77.33066);
            ReverseGeocoding(location.latitude, location.longitude)
            dist < 0.3 ? Punch({ val }) : (Alert.alert(`Punch ${action} from your office`))
        })
        .catch(error => { const { code, message } = error; Alert.alert(code, message); })) : (Alert.alert("Location permission not granted"))

}

export default Geolocation