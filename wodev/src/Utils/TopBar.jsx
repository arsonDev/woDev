import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../Resources/Logo.png";
import { UserTopMenu } from "../Views/User/UserTopMenu";

export const TopBar = () => {
    const history = useHistory();

    function logoClick() {
        if (profileExists) history.push("/dashboard");
        else history.push('/login')
    }

    function backToLogin() {
        history.push("/login");
    }

    const [profileExists, setProfileExists] = useState(false);

    React.useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user && user.profile && user.profile.userProfileTypeId) {
            setProfileExists(true);
        } else {
            setProfileExists(false);
        }
    }, [localStorage.getItem("user")]);

    return (
        <div className="container-fluid bg-primary shadow p-3 mb-5" style={{ height: "80px" }}>
            <img src={Logo} className="mh-100" alt="logo" onClick={logoClick}></img>
            <div style={{ borderRadius: "8px", position: "absolute", bottom: "auto", left: "auto", right: "2vw", top: "2vh" }}>{profileExists && <UserTopMenu />}</div>
        </div>
    );
};
