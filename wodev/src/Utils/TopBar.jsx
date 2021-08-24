import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../Resources/Logo.png";
import { UserTopMenu } from "../User/UserTopMenu";

export const TopBar = () => {
    const history = useHistory();

    function logoClick() {
        history.push("/dashboard");
    }

    function backToLogin() {
        history.push("/login");
    }

    const [profileExists, setProfileExists] = useState(false);

    React.useEffect(() => {
        if (localStorage.getItem("user")) {
            setProfileExists(true);
        } else {
            setProfileExists(false);
        }
    }, [localStorage.getItem("user")]);

    return (
        <div className="container-fluid bg-primary shadow p-3 mb-5" style={{ height: "80px" }}>
            <img src={Logo} className="mh-100" alt="logo" onClick={logoClick}></img>
            {profileExists && <UserTopMenu/>}
        </div>
    );
};
