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

export const LoadMyCreated = async (data) => {
    let head = authHeader();
    return await axios.get(`${BaseURL}/order/getMyCreated?userId=${data.userId}&page=${data.page}&pageSize=${data.pageSize}`, {
        headers: {
            Authorization: `Bearer ${head}`,
        },
    });
};

export const LoadOnWorking = async (data) => {
    let head = authHeader();
    return await axios.get(`${BaseURL}/order/getOnWorking?userId=${data.userId}&page=${data.page}&pageSize=${data.pageSize}`, {
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

export const deleteOrder = async(id) => {
    let head = authHeader();
    return await axios.delete(`${BaseURL}/order/${id}`,{
        headers : {
            Authorization : `Bearer ${head}`
        }
    });
}

export const getById = async(id) => {
    let head = authHeader();
    return await axios.get(`${BaseURL}/order/${id}`,{
        headers : {
            Authorization : `Bearer ${head}`
        }
    });
}
