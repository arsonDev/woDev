import Axios from 'axios'
import {authHeader,sendRequest} from './CommonService'

export const CreateUser = (data) => 
        sendRequest("post","https://localhost/api/user/create",data).then(res => {
            if (res.status == 200){
                return true;
            }
            return false;
        })

