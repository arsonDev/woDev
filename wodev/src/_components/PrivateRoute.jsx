import React from "react";
import moment from "moment";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component : Component, rest }) {
    function auth() {
        try {
            let tokenObject = JSON.parse(localStorage.getItem("token"));
            if (tokenObject != null && tokenObject != undefined) {
                if (moment(new Date(tokenObject.expires).toLocaleString()).diff(moment(new Date(Date.now()).toLocaleString())) > 0) return true;
                return false;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }
    return <Route {...rest} render={(props) => (auth() == true ? <Component {...props} /> : <Redirect to="/login" />)} />;
}
