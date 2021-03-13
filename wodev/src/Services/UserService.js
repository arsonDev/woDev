import Axios from 'axios'
import {authHeader,SendRequest} from './CommonService'

export const CreateUser = (data) => 
        SendRequest("post","https://localhost/api/user/create",data).then(res => {
            if (res.status == 200){
                return true;
            }
            return false;
        })

