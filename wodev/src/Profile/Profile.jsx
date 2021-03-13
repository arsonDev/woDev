import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@material-ui/core";
import "./Profile.scss";
import { CreateAccount } from "../Services/ProfileService";
import { CreateUser } from "../Services/UserService";
import SnackbarInfo from "../_components/SnakbarInfo";
import { ErrorMessage } from "../Utils/ErrorMessage";
import ProfileType, { ProfileTypeDict } from "./ProfileType";

export default function Profile({ userId }) {
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();
    const [startDate, setStartDate] = useState(new Date());
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [type, setType] = useState();

    function onSubmit(values) {
        let profileData = {
            ...values,
            Type: type == ProfileTypeDict.employer ? 0 : 1,
        };

        CreateUser({
            Email: values.Email,
            Password: values.Password,
        })
            .then((res) => {
                CreateAccount(profileData)
                .then((res) => {
                    //tutaj zrobic login ponowny i dac token do localStorage
                    history.push("/dashboard");
                })
                .catch((err) => {
                    setErrorMessage(err?.message ?? "An error has ocured");
                    setShowError(true);
                });
            })
            .catch((err) => {
                setErrorMessage(err?.message ?? "An error has ocured");
                setShowError(true);
            });
            
    }

    return (
        <div className="center">
            <h3>Fill inputs and select type to complete create account</h3>
            <div className="form-group centerGroup">
                <div className="centerType">
                    <ProfileType profileType={ProfileTypeDict.worker} onClickEvent={() => setType(ProfileTypeDict.worker)} selected={type == ProfileTypeDict.worker} />
                    <ProfileType profileType={ProfileTypeDict.employer} onClickEvent={() => setType(ProfileTypeDict.employer)} selected={type == ProfileTypeDict.employer} />
                </div>

                <input
                    className="form-control form-control-lg input"
                    type="text"
                    placeholder="Email"
                    name="Email"
                    ref={register({ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })}
                />
                {errors.Email?.type === "required" && <ErrorMessage>Email is required</ErrorMessage>}
                {errors.Email?.type === "pattern" && <ErrorMessage>Email is invalid</ErrorMessage>}

                <input className="form-control form-control-lg input" type="password" placeholder="Password" name="Password" ref={register({ required: true, minLength: 8 })} />
                {errors.Password?.type === "required" && <ErrorMessage>Password is required</ErrorMessage>}
                {errors.Password?.type === "minLength" && <ErrorMessage>Password is to short</ErrorMessage>}
                <input className="form-control form-control-lg input" type="text" placeholder="Name" name="Name" ref={register({ required: true })} />
                {errors.Name?.type === "required" && <ErrorMessage>Name is required</ErrorMessage>}
                <input className="form-control form-control-lg input" type="text" placeholder="Surname" name="SurName" ref={register({ required: true })} />
                {errors.SurName?.type === "required" && <ErrorMessage>Surname is required</ErrorMessage>}
                <DatePicker
                    className="form-control form-control-lg input "
                    name="BirthDate"
                    selected={startDate}
                    onChange={(e) => setStartDate(e)}
                    ref={register({ required: true })}
                />
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
                <textarea className="form-control form-control-lg input" type="text" placeholder="Description" name="Description" ref={register} />
                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                    Create a account
                </Button>
            </div>
            <SnackbarInfo
                isOpen={showError}
                message={errorMessage}
                onClose={() => {
                    setErrorMessage();
                    setShowError(false);
                }}
            />
        </div>
    );
}
