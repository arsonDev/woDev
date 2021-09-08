import Axios from "axios";
import { BaseURL } from ".";
import { ResponseStatus } from "./Status";
import { authHeader, sendRequest } from "./CommonService";
import axios from '../Utils/apiUtils'
import { Redirect, useHistory } from "react-router-dom";

export const Login = (data) =>
    axios.post(`${BaseURL}/user/login`, data)
        .then((res) => {
            if (res.status == 200 && res.data) {
                let userData = JSON.stringify(res.data);
                localStorage.setItem("user", userData);
                if (res.data?.profile) {
                    return ResponseStatus.SUCCESS;
                }
                return ResponseStatus.FIRST_LOGIN;
            } else {
                return ResponseStatus.UNAUTHORIZED;
            }
        })
        .catch((err) => {
            return { message: err?.response?.data ?? err, status: ResponseStatus.UNAUTHORIZED };
        });

export const CheckEmailNotUsed = (email) => {
    axios.post(`${BaseURL}/user/checkEmail`, email).then((res) => {
        if (res.status == 200) {
            return ResponseStatus.SUCCESS;
        } else {
            return ResponseStatus.VALIDATION_ERROR;
        }
    });
};

export const logoutMethod = async () => {
    let head = authHeader();

    let res = await axios
        .post(`${BaseURL}/user/logout`, null, {
            headers: {
                Authorization: `Bearer ${head}`,
            },
        })
        .then((res) => {
            if (res.status == 204) {
                return ResponseStatus.SUCCESS;
            } else {
                return ResponseStatus.NOT_FOUND;
            }
        })
        .catch((error) => {
            return ResponseStatus.UNAUTHORIZED;
        });
    return res;
};
