import { BaseURL } from ".";
import { sendRequest } from "./CommonService";

export const ResetPassword = (data) =>
    sendRequest("post", `${BaseURL}/user/resetPassword`, data).then((res) => {
        if (res.status == 200) {
            return true;
        }
        return false;
    });
