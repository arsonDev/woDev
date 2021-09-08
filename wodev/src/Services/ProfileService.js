import axios from '../Utils/apiUtils';
import { BaseURL } from ".";
import { authHeader, sendRequest } from "./CommonService";

export const CreateAccount = (data) => {
    let head = authHeader();
    return axios
        .post(`${BaseURL}/profile/create`, data, {
            headers: {
                Authorization: `Bearer ${head}`,
            },
        })
        .then((res) => {
            if (res.status == 200) {
                return res.data;
            }
            return false;
        });
};
