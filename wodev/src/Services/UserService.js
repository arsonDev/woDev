import Axios from 'axios'
import { BaseURL } from '.';
import {authHeader,sendRequest} from './CommonService'

export const CreateUser = (data) => 
        sendRequest("post",`${BaseURL}/user/create`,data).then(res => {
            if (res.status == 200){
                return true;
            }
            return false;
        })

