import { Alert } from 'react-native'
import axios from "axios";
import store from '../redux/store';
import { API } from '../utility/services';
import Toast from 'react-native-toast-message';

const Punch = ({ val, userId, password, type = "login" }) => {
    const state = store.getState();
    // let userId = state?.auth?.userId
    //  userPassword = state?.auth?.userPassword


    const userData = type === "login" ? { loginId: userId, password: password, oprFlag: 'L' } : { loginId: state?.auth?.userId, password: state?.auth?.userPassword, oprFlag: 'L' }

    // console.log("punchhdchcu", userData);

    let action = (val === 'I' ? "In" : "Out")
    axios.post(`${API}/api/User/login`, userData).then((response) => {
        const returnedData = response.data.Result;
        let result = returnedData.map(a => a.FLAG);
        console.log("result", result[0]);
        result[0] === "S" ? (
            fetch(`${API}/api/Admin/punchinOut`, {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ operFlag: val, userId: userId }),
            })
                .then((response) => response.json())
                .then((responseData) => {

                    console.log("butttonnn",  responseData)

                    // {
                    //     responseData?.Result[0]?.FLAG!==undefined && responseData?.Result[0]?.FLAG==="S"? Toast.show({
                    //         type: 'success',
                    //         text1: `Punched ${action} Successfully`
                    //     }): Toast.show({
                    //         type: 'success',
                    //         text1: `You have already Punched ${action}`
                    //     })
                    // }

                   
                }))
            :
            Toast.show({
                type: 'error',
                text1: "Please enter correct credentials"
            })
    })
}

export default Punch