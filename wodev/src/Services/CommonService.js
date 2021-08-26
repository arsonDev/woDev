import Axios from "axios";

export const sendRequest = (method, url, data) =>
    Axios.request({
        method,
        url,
        data,
        config: {
            Headers: { Authorization: `Bearer ${authHeader()}` },
        },
    });

export const authHeader = () => {
    let tokenObject = JSON.parse(localStorage.getItem("user"));
    if (tokenObject && tokenObject.token) {
        return tokenObject.token;
    } else {
        return {};
    }
};
