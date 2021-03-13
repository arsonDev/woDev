import Axios from "axios";

export const SendRequest = (method, url, data) => Axios.request({ method, url, data });

export const authHeader = () => {
    let tokenObject = JSON.parse(localStorage.getItem("token"));
    if (tokenObject && tokenObject.Token && (new Date(tokenObject.expires).toLocaleString() > new Date(Date.now()).toLocaleString())) {
        return {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenObject.Token,
        };
    } else {
        return {};
    }
};
