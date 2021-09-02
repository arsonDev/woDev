import { BaseURL } from ".";
import { sendRequest } from "./CommonService";

export const saveOrder = ( data ) => {
    sendRequest("post", `${BaseURL}/order/create`, data);
};
