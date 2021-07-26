import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../Utils/ErrorMessage";
import { TopBar } from "../Utils/TopBar";
import SnackbarInfo from "../_components/SnackbarInfo";
import { CreateUser } from "../Services/UserService";
import { useHistory } from "react-router";
import { EmailChecker } from "./EmailChecker";
export default function SignIn() {
    const { register, handleSubmit, errors, watch } = useForm();
    const [errorMessage, setErrorMessage] = useState();
    const history = useHistory();

    function onSubmit(values) {
        CreateUser({ Email: values.Email, Password: values.Password })
            .then(() => {
                history.push("createAccount/createProfile");
            })
            .catch((err) => {
                setErrorMessage(err.message);
            });
    }

    const isTheSame = () => watch("RepeatPassword") === watch("Password");

    return (
        <>
            <div className="center">
                <h3>Fill inputs and go to next step</h3>

                <br />
                <div className="form-group centerGroup">
                    <div className="row">
                        <input
                            className="form-control form-control-lg input"
                            type="text"
                            placeholder="Email"
                            name="Email"
                            ref={register({ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })}
                        />
                        {errors.Email?.type === "required" && <ErrorMessage>Email is required</ErrorMessage>}
                        {errors.Email?.type === "pattern" && <ErrorMessage>Email is invalid</ErrorMessage>}

                        <EmailChecker email={watch("Email")}/>
                    </div>

                    <input className="form-control form-control-lg input" type="password" placeholder="Password" name="Password" ref={register({ required: true, minLength: 8 })} />
                    {errors.Password?.type === "required" && <ErrorMessage>Password is required</ErrorMessage>}
                    {errors.Password?.type === "minLength" && <ErrorMessage>Password is to short</ErrorMessage>}

                    <input
                        className="form-control form-control-lg input"
                        type="password"
                        placeholder="Repeat password"
                        name="RepeatPassword"
                        ref={register({ required: true, minLength: 8, validate: isTheSame })}
                    />
                    {errors.RepeatPassword?.type === "required" && <ErrorMessage>Password is required</ErrorMessage>}
                    {errors.RepeatPassword?.type === "minLength" && <ErrorMessage>Password is to short</ErrorMessage>}
                    {errors.RepeatPassword?.type === "validate" && <ErrorMessage>Passwords are not the same</ErrorMessage>}

                    <br />
                    <br />
                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                        Next
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
