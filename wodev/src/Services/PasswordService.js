import { BaseURL } from ".";
import axios from '../Utils/apiUtils';

export const ResetPassword = (data) =>
    axios.post(`${BaseURL}/user/resetPassword`, data).then((res) => {
        if (res.status == 200) {
            return true;
        }
        return false;
    });
