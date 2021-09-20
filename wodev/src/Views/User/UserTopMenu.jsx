import React from "react";
import { useState } from "react";
import Avatar from "react-avatar";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { logoutMethod } from "../../Services/LoginService";
import { ResponseStatus } from "../../Services/Status";
import Dropdown from "react-dropdown-overflow";
import { Button } from "@material-ui/core";

export const UserTopMenu = () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const avatarClick = () => {
        setMenuOpen(!menuOpen);
    };

    const profile = JSON.parse(localStorage.getItem("user"));
    const history = useHistory();

    const logout = async () => {
        await logoutMethod();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        history.push('/login');
    };

    return (
        // <div>
        //     <Avatar name="Foo Bar" round={true} style={{height : '100%'}} onClick={avatarClick} />

        //     {menuOpen && (
        //         <Dropdown
        //             dropdown={
        //                 <div className="dropdown-list">
        //                     Logged as : {profile?.name ?? "tester"}
        //                     <ul>
        //                         <li onClick={logout}>Logout</li>
        //                     </ul>
        //                 </div>
        //             }></Dropdown>
        //     )}
        // </div>
        <Button variant="contained" color="secondary" onClick={logout}>Wyloguj</Button>
    );
};
