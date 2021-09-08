import axios from '../Utils/apiUtils';
import { BaseURL } from '.';

export const CreateUser = (data) => 
        axios.post(`${BaseURL}/user/create`,data).then(res => {
            if (res.status == 200){
                return true;
            }
            return false;
        })

