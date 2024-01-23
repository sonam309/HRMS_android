import axios from "axios";
import { API as API_LINK, AxiosLog } from "./services";
import {
    setErrorMessageRedux,
    setSuccessMessageRedux,
    setUnAuthMessageRedux,
} from "./../redux/Message/message.slice";

const AxiosClient = async (
    type,
    api,
    payload,
    toolkit,
    content = "application/json"
) => {
    const { Tokenjs: { accessToken = {} } = {} } = toolkit.getState();

    const AxiosTypeString = {
        GET: "get",
        POST: "post",
        PUT: "put",
        PATCH: "patch",
        DELETE: "delete",
    };
    if (!Boolean(payload.token)) {
        delete payload.token;
    }
    if (AxiosLog) {
        console.log(
            "\x1b[1m\x1b[36m%s\x1b[0m",
            `AXIOS CLIENT PAYLOAD --> ${JSON.stringify(payload)} ${api}`
        );
        console.log("token", accessToken);
    }

    const axios_config = {
        method: AxiosTypeString[type],
        url: `${API_LINK}${api}`,
        data: payload,
        headers: {
            "Content-Type": content,
            Authorization: Boolean(payload?.token)
                ? payload?.token
                : Boolean(accessToken)
                    ? accessToken
                    : null,
        },
    };

    if (AxiosTypeString[type] === "get") {
        delete axios_config.data;
    }

    return await axios(axios_config)
        .then((response) => {
            if (AxiosLog) {
                console.log(
                    "\x1b[1m\x1b[33m%s\x1b[0m",
                    `AXIOS CLIENT SUCCESS --> ${api}\n`
                );
                console.log("\x1b[32m%s\x1b[0m", response.data);
            }

            return toolkit.fulfillWithValue({
                ...response.data,
                success: true,
            });
        })
        .catch((error) => {
            if (AxiosLog) {
                console.log(
                    "\x1b[1m\x1b[31m%s\x1b[0m",
                    `AXIOS CLIENT ERROR -->${api}\n`
                );
                console.log(
                    "\x1b[1m\x1b[31m%s\x1b[0m",
                    `AXIOS CLIENT ERROR -->${error}\n${API_LINK}${api}`
                );
            }

            if (error.response) {
                if (AxiosLog) {
                    console.log("\x1b[31m%s\x1b[0m", error.response.data);
                }

                if (error.response.data.status !== 401) {
                    toolkit.dispatch(setErrorMessageRedux(error.response.data.message));
                } else {
                    toolkit.dispatch(setUnAuthMessageRedux("Session Expired!"));
                }
            } else if (error.request) {
                toolkit.dispatch(
                    setErrorMessageRedux(
                        "Please check your internet connection and try again."
                    )
                );
            } else {
                toolkit.dispatch(setErrorMessageRedux(error.message));
            }

            return toolkit.rejectWithValue(error.response.data.message);
        });
};
export { AxiosClient };
