import { Alert } from 'react-native'
import axios from "axios";
import store from '../redux/store';
import { API } from '../utility/services';
import Toast from 'react-native-toast-message';

const Punch = ({ val }) => {
    const state = store.getState();
    let userId = state?.auth?.userId, userPassword = state?.auth?.userPassword


    const userData = { loginId: userId, password: userPassword, oprFlag: 'L' };

    let action = (val === 'I' ? "In" : "Out")
    axios.post(`${API}/api/User/login`, userData).then((response) => {
        const returnedData = response.data.Result;
        let result = returnedData.map(a => a.FLAG);
        result[0] === "S" ? (
            fetch(`${API}/api/Admin/punchinOut`, {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ operFlag: val, userId: userId }),
            })
                .then((response) => response.json())
                .then((responseData) => {
                    Toast.show({
                        type: 'success',
                        text1: `Punched ${action} Successfully`
                    })
                }))
            :
            Toast.show({
                type: 'error',
                text1: "Please enter correct credentials"
            })
    })
}

export default Punch