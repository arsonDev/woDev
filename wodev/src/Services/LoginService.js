import Axios from "axios";
import { BaseURL } from ".";
import { ResponseStatus } from "./Status";

export class LoginService {
    Login = (data) =>
        this.SendRequest("post", `${BaseURL}/user/login`, data)
            .then((res) => {
                if (res.status == 200 && res.data) {
                    //TODO: pzepiac to na cookie lub cos innego
                    localStorage.setItem("token", JSON.stringify(res.data));
                    return ResponseStatus.SUCCESS;
                } else {
                    return ResponseStatus.UNAUTHORIZED;
                }
            })
            .catch((err) => {
                return { message: err?.response?.data ?? err, status: ResponseStatus.UNAUTHORIZED };
            });

    CheckEmailNotUsed = (email) => {
        this.SendRequest("post", `${BaseURL}/user/checkEmail`, email).then((res) => {
            if (res.status == 200) {
                return ResponseStatus.SUCCESS;
            } else {
                return ResponseStatus.VALIDATION_ERROR;
            }
        });
    };

    Logout = (data) => {
        this.SendRequest("post", `${BaseURL}/user/logout`, data).then((res) => {
            if (res.status == 200) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                return ResponseStatus.SUCCESS;
            } else {
                return ResponseStatus.NOT_FOUND;
            }
        });
    };

    SendRequest = (method, url, data) => Axios.request({ method, url, data });
}
