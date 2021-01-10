import Axios from 'axios';

export class PasswordService{

    ResetPassword = (data) => 
        this.SendRequest("post","https://localhost/api/user/resetPassword",data).then(res => {
            if (res.status == 200){
                return true;
            }
            return false;
        })

    SendRequest = (method,url,data) => Axios.request({method,url,data});
}
