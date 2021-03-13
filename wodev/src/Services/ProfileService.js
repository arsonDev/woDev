import Axios from 'axios';

export const CreateAccount = (data) => 
        SendRequest("post","https://localhost/api/profile/create",data).then(res => {
            if (res.status == 200){
                return res.data;
            }
            return false;
        })

const SendRequest = (method,url,data) => Axios.request({method,url,data});