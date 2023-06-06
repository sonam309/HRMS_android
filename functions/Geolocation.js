
import GetLocation from 'react-native-get-location'

const Geolocation = async () => {
    let dist;
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
            console.log(location);
            dist = getDistInKm(location.latitude, location.longitude, 28.5444665, 77.3309966);

        })
        .catch(error => { const { code, message } = error; Alert.alert(code, message); })) : (Alert.alert("Location permission not granted"))
    console.warn("Inside geo" + dist);
    return (
        { dist }
    )

}

export default Geolocation