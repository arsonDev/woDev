import React, { useEffect, useState } from "react";
import { BrowserRouter , Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import Login from "./Views/Login/Login";
import RestorePassword from "./Views/Login/RestorePassword";
import Home from "./Views/Home/Home.jsx";
import { PrivateRoute, PublicRoute } from "./_components/PrivateRoute";
import Profile from "./Views/Profile/Profile";
import SignIn from "./Views/Login/SignIn";
import { TopBar } from "./Utils/TopBar";
import { OrderProvider } from "./_context/orderContext";
import apiUtils from "./Utils/apiUtils";

function App() {
    return (
        <>
            <BrowserRouter >
                <Switch>
                    <PrivateRoute path="/createProfile" component={Profile} />
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
                    <PublicRoute path="/login" component={Login} exact/>
                    <PublicRoute path="/createAccount" component={SignIn} />
                    <PublicRoute path="/restorePassword" component={RestorePassword} />

                    <Redirect to="/dashboard" />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
