import React ,{useState} from "react";
import ProfileType from "./ProfileType";
import { ProfileTypeDict } from "../Profile/ProfileType";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";
import Profile from "./Profile";
import { Button, Snackbar } from "@material-ui/core";

export default function ProfileTypeSelect({}) {
    let { path, url } = useRouteMatch();
    const [type,setType] = useState();

    return (
        <div className="centerText">
            <h2>Choose your profile type</h2>
            <div className="centerRestore">
                <ProfileType profileType={ProfileTypeDict.worker} onClickEvent={() => setType(ProfileTypeDict.worker)}/>

                <ProfileType profileType={ProfileTypeDict.employer} onClickEvent={() => setType(ProfileTypeDict.employer)}/>
            </div>
            <Link to="/createProfile">
                <Button variant="contained" color="primary">
                    Next
                </Button>
            </Link>
        </div>
    );
}
