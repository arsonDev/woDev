import Axios from 'axios';
import {ResponseStatus} from './Status';

export class LoginService{
    Login = (data) => 
        this.SendRequest("post",'https://localhost/api/user/login',data).then((res) => {
            
            if (res.status == 200 && res.data){
                //TODO: pzepiac to na cookie lub cos innego
                localStorage.setItem("token",JSON.stringify(res.data));
                return ResponseStatus.SUCCESS;
            }else{
                return ResponseStatus.UNAUTHORIZED;
            }

        }).catch(err => {
            return {message : err?.response?.data ?? err, status : ResponseStatus.UNAUTHORIZED}
        })

    SendRequest = (method,url,data) => Axios.request({method,url,data})
}