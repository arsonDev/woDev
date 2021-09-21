import axios from "axios";
import moment from "moment";

axios.interceptors.request.use(
    function (config) {
        localStorage.setItem('loading',true);
        console.log(config);
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        
        localStorage.setItem('loading',false);
        if (response.status == 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.reload(true);
        } else {
            let currentUser = JSON.parse(localStorage.getItem("user"));
            if (currentUser != null) {
                let newUser = JSON.stringify({ ...currentUser, expires: moment(currentUser.expires).add(5, "m").toDate() });
                localStorage.setItem("user", newUser);
            }
        }
        return response;
    },
    function (error) {
        if (error.response.status == 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.reload(true);
        }
        return Promise.reject(error);
    }
);

export default axios;
