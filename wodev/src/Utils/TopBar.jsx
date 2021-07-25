import React from "react";
import { useHistory } from "react-router";
import Logo from "../Resources/Logo.png";

export const TopBar = () => {
    const history = useHistory();

    function logoClick() {
        history.push("dashboard");
    }

    return (
        <div className="container-fluid bg-primary shadow p-3 mb-5" style={{ height: "80px" }}>
            <img src={Logo} className="mh-100" alt="logo" onClick={logoClick}></img>
        </div>
    );
};
