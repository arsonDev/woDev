import Axios from "axios";
import { sendRequest } from "./CommonService";

export const CreateAccount = (data) =>
    sendRequest("post", "https://localhost/api/profile/create", data).then((res) => {
        if (res.status == 200) {
            return res.data;
        }
        return false;
    });
