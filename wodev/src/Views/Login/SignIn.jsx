import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../Utils/ErrorMessage";
import { TopBar } from "../../Utils/TopBar";
import SnackbarInfo from "../../_components/SnackbarInfo";
import { CreateUser } from "../../Services/UserService";
import { useHistory } from "react-router";
import { EmailChecker } from "./EmailChecker";
import Logo from "../../Resources/Logo.png";

export default function SignIn() {
    const { register, handleSubmit, errors, watch } = useForm();
    const [errorMessage, setErrorMessage] = useState();
    const history = useHistory();

    function onSubmit(values) {
        CreateUser({ Email: values.Email, Password: values.Password })
            .then(() => {
                history.push("/login");
            })
            .catch((err) => {
                setErrorMessage(err.message);
            });
    }

    const isTheSame = () => watch("RepeatPassword") === watch("Password");

    return (
        <>
            <TopBar />
            <div className="center">
                <img src={Logo} style={{ width: "10%", height: "10%" }} alt="logo"></img>

                <h3>Uzupełnij pola i przejdź dalej</h3>

                <br />
                <div className="form-group centerGroup">
                    <input
                        className="form-control form-control-lg input"
                        type="text"
                        placeholder="Email"
                        name="Email"
                        ref={register({ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })}
                    />
                    {errors.Email?.type === "required" && <ErrorMessage>Email jest wymagany</ErrorMessage>}
                    {errors.Email?.type === "pattern" && <ErrorMessage>Email jest nieprawidłowy</ErrorMessage>}
                    {/* 
                        <EmailChecker email={watch("Email")} /> */}

                    <input className="form-control form-control-lg input" type="password" placeholder="Hasło" name="Password" ref={register({ required: true, minLength: 8 })} />
                    {errors.Password?.type === "required" && <ErrorMessage>Hasło jest wymagane</ErrorMessage>}
                    {errors.Password?.type === "minLength" && <ErrorMessage>Hasło jest za krótkie</ErrorMessage>}

                    <input
                        className="form-control form-control-lg input"
                        type="password"
                        placeholder="Powtórz hasło"
                        name="RepeatPassword"
                        ref={register({ required: true, minLength: 8, validate: isTheSame })}
                    />
                    {errors.RepeatPassword?.type === "required" && <ErrorMessage>Hasło jest wymagane</ErrorMessage>}
                    {errors.RepeatPassword?.type === "minLength" && <ErrorMessage>Hasło jest za krótkie</ErrorMessage>}
                    {errors.RepeatPassword?.type === "validate" && <ErrorMessage>Hasło nie jest takie samo</ErrorMessage>}

                    <br />
                    <br />
                    <div className="horizontalGroup">
                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                        Dalej
                    </Button>
                    </div>
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
