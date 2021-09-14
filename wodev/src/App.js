import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import Login from "./Login/Login";
import RestorePassword from "./Login/RestorePassword";
import Home from "./Home/Home.jsx";
import {PrivateRoute, PublicRoute } from "./_components/PrivateRoute";
import Profile from "./Profile/Profile";
import SignIn from "./Login/SignIn";
import { TopBar } from "./Utils/TopBar";
import { OrderProvider } from "./_context/orderContext";
import apiUtils from "./Utils/apiUtils";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <PrivateRoute
                        path="/dashboard"
                        component={function () {
                            return (
                                <OrderProvider>
                                    <Home />
                                </OrderProvider>
                            );
                        }}
                        exact
                    />
                    <PublicRoute path="/login" component={Login} />
                    <PrivateRoute path="/createProfile" component={Profile} exact />
                    <PublicRoute path="/createAccount" component={SignIn} exact />
                    <PublicRoute path="/restorePassword" component={RestorePassword} exact />

                    <Redirect to="/dashboard" />
                </Switch>
            </Router>
        </>
    );
}

export default App;
