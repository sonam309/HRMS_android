import { Alert } from 'react-native'
import axios from "axios";
import store from '../redux/store';

const Punch = ({ val }) => {
    const state = store.getState();
    let userId = state?.auth?.userId, userPassword = state?.auth?.userPassword


    const userData = { loginId: userId, password: userPassword, oprFlag: 'L' };

    let action = (val === 'I' ? "In" : "Out")
    axios.post('https://econnectsatya.com:7033/api/User/login', userData).then((response) => {
        const returnedData = response.data.Result;
        let result = returnedData.map(a => a.FLAG);
        result[0] === "S" ? (
            fetch("https://econnectsatya.com:7033/api/Admin/punchinOut", {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ operFlag: val, userId: userId }),
            })
                .then((response) => response.json())
                .then((responseData) => {
                    Alert.alert("Success", `Punched ${action} Successfully`)
                }))
            : Alert.alert("Failure", "Please enter correct credentials")
    })
}

export default Punch