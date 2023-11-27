import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../redux/store";
import { updateCurrentLocation } from "../redux/punchDetailSlice"

// const dispatch = useDispatch()

const ReverseGeocoding = async (lat, long) => {
    let res = await fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${long}&lang=en-US&apiKey=WInjWPDkOf5yBA-HYb3RYp1CxdaFgAuTZp5-4gkCfYU`)
    res = await res.json()
    res = res.items[0].address
    let address = res.label

    // await AsyncStorage.setItem('Address', address)
    // dispatch(updateCurrentLocation(address))
    
    store.dispatch(updateCurrentLocation(address))
}

export default ReverseGeocoding