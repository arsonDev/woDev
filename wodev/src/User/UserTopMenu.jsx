import React from "react";
import { useState } from "react";
import Avatar from "react-avatar";
import { useHistory } from "react-router-dom";
import { LoginService } from "../Services/LoginService";
import { ResponseStatus } from "../Services/Status";
import Dropdown from "react-dropdown-overflow";
import { Button } from "@material-ui/core";

export const UserTopMenu = () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const history = useHistory();

    const avatarClick = () => {
        setMenuOpen(!menuOpen);
    };

    const profile = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        let loginService = new LoginService();
        let response = loginService.Logout();
        if (response == ResponseStatus.SUCCESS) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            history.push("login");
        }
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
        <Button onClick={logout}>Logout</Button>
    );
};
