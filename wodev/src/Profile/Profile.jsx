import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@material-ui/core";
import "./Profile.scss";
import { CreateAccount } from "../Services/ProfileService";
import { CreateUser } from "../Services/UserService";
import SnackbarInfo from "../_components/SnackbarInfo";
import { ErrorMessage } from "../Utils/ErrorMessage";
import ProfileType, { ProfileTypeDict } from "./ProfileType";
import { TopBar } from "../Utils/TopBar";

export default function Profile({ userId }) {
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();
    const [startDate, setStartDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState();
    const [type, setType] = useState(ProfileTypeDict.worker);

    function onSubmit(values) {
        let profileData = {
            ...values,
            Type: type == ProfileTypeDict.employer ? 0 : 1,
        };

        CreateAccount(profileData)
            .then((res) => {
                //tutaj zrobic login ponowny i dac token do localStorage
                history.push("/dashboard");
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.error ?? "An error has ocured");
            });
    }

    return (
        <>
            <TopBar />
            <div className="center">
                <h3>Fill inputs and select type to complete create account</h3>
                <div className="form-group centerGroup">
                    <div className="centerType">
                        <ProfileType profileType={ProfileTypeDict.worker} onClickEvent={() => setType(ProfileTypeDict.worker)} selected={type == ProfileTypeDict.worker} />
                        <ProfileType profileType={ProfileTypeDict.employer} onClickEvent={() => setType(ProfileTypeDict.employer)} selected={type == ProfileTypeDict.employer} />
                    </div>
                    <input className="form-control form-control-lg input" type="text" placeholder="Name" name="Name" ref={register({ required: true })} />
                    {errors.Name?.type === "required" && <ErrorMessage>Name is required</ErrorMessage>}
                    <input className="form-control form-control-lg input" type="text" placeholder="Surname" name="SurName" ref={register({ required: true })} />
                    {errors.SurName?.type === "required" && <ErrorMessage>Surname is required</ErrorMessage>}
                    <div className="datePickerStyle">
                        <DatePicker
                            className="form-control form-control-lg input"
                            name="BirthDate"
                            placeholderText="Birthdate"
                            selected={startDate}
                            onChange={(e) => setStartDate(e)}
                            ref={register({ required: true })}
                        />
                    </div>
                    {errors.BirthDate?.type === "required" && <ErrorMessage>Birthdate is required</ErrorMessage>}
                    <input className="form-control form-control-lg input" type="text" placeholder="Address" name="Address" ref={register({ required: true })} />
                    {errors.Address?.type === "required" && <ErrorMessage>Address is required</ErrorMessage>}
                    <input
                        className="form-control form-control-lg input"
                        type="text"
                        placeholder="Phone"
                        name="Phone"
                        ref={register({ required: true, pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/ })}
                    />
                    {errors.phone?.type === "required" && <ErrorMessage>Phone is required</ErrorMessage>}
                    {errors.phone?.type === "pattern" && <ErrorMessage>Phone is invalid</ErrorMessage>}
                    <textarea className="form-control form-control-lg input " style={{maxHeight:'300px', minHeight : '100px'}} type="text" placeholder="Description" name="Description" ref={register} />
                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                        Create a account
                    </Button>
                </div>
                <SnackbarInfo
                    isOpen={errorMessage != null && errorMessage != undefined}
                    message={errorMessage}
                    onClose={() => {
                        setErrorMessage(null);
                    }}
                />
            </div>
        </>
    );
}
