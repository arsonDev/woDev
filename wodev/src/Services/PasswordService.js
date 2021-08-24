import { sendRequest } from "./CommonService";

export const ResetPassword = (data) =>
    sendRequest("post", "https://localhost/api/user/resetPassword", data).then((res) => {
        if (res.status == 200) {
            return true;
        }
        return false;
    });
