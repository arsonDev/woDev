import axios from "axios";
import Axios from "axios";
import { authHeader, sendRequest } from "./CommonService";

export const CreateAccount = (data) => {
    let head = authHeader();
    return axios
        .post("https://localhost/api/profile/create", data, {
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
