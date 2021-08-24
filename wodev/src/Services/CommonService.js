import Axios from "axios";

export const sendRequest = (method, url, data) => Axios.request({ method, url, data });

export const authHeader = () => {
    let tokenObject = JSON.parse(localStorage.getItem("user"));
    if (tokenObject && tokenObject.token) {
        return tokenObject.token;
        // return {
        //     "authorization": tokenObject.Token,
        //     "Content-type": "application/json; charset=UTF-8",
        // };
    } else {
        return {};
    }
};
