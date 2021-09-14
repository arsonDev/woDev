import React from "react";
import moment from "moment";
import { Redirect, Route } from "react-router-dom";

export function PrivateRoute({ component: Component, rest }) {
    function auth() {
        try {
            let tokenObject = JSON.parse(localStorage.getItem("user"));
            if (tokenObject.token != null && tokenObject.token != undefined) {
                if (new Date(tokenObject.expires).toLocaleString() > new Date(Date.now()).toLocaleString()) return true;
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

export function PublicRoute({ component: Component, rest }) {
    function auth() {
        try {
            let tokenObject = JSON.parse(localStorage.getItem("user"));
            if (tokenObject.token != null && tokenObject.token != undefined) {
                if (new Date(tokenObject.expires).toLocaleString() > new Date(Date.now()).toLocaleString()) return true;
                return false;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }
    return <Route {...rest} render={(props) => (auth() == false ? <Component {...props} /> : <Redirect to="/dashboard" />)} />;
}