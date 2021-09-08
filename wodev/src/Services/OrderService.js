import axios from "../Utils/apiUtils";
import { BaseURL } from ".";
import { authHeader} from "./CommonService";

export const saveOrder = async (data) => {
    let head = authHeader();
    return await axios.post(`${BaseURL}/order/create`, data, {
        headers: {
            Authorization: `Bearer ${head}`,
        },
    });
};

export const LoadOrders = async (data) => {
    let head = authHeader();
    return await axios.get(`${BaseURL}/order/getMy?userId=${data.userId}&page=${data.page}&pageSize=${data.pageSize}`, {
        headers: {
            Authorization: `Bearer ${head}`,
        },
    });
};

export const LoadWorkingInProgress = async (data) => {
    let head = authHeader();
    return await axios.get(`${BaseURL}/order/getOrderInProgres?userId=${data.userId}&page=${data.page}&pageSize=${data.pageSize}`, {
        headers: {
            Authorization: `Bearer ${head}`,
        },
    });
};

export const updateOrder = async(data,id) =>{
    let head = authHeader();
    return await axios.put(`${BaseURL}/order/${id}`,data,{
        headers : {
            Authorization : `Bearer ${head}`
        }
    });
}
