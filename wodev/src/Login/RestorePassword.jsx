import { Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./RestorePassword.scss";
import { Error, ErrorMessage } from "../Utils/ErrorMessage";
import { ResetPassword } from "../Services/PasswordService";
import { useHistory } from "react-router-dom";
import { TopBar } from "../Utils/TopBar";

export default function RestorePassword() {
    const { register, handleSubmit, errors } = useForm();
    const [message, setMessage] = useState();
    const [openAlert, setOpenAlert] = useState(false);
    const [isInfo,setIsInfo] = useState(false);
    const history = useHistory();

    const closeError = () => {
        setOpenAlert(false);
        setIsInfo(false);
        setMessage("");
    }

    const onSubmit = (data) => {
        ResetPassword(data)
            .then((res) => {
                if (res == true) {
                    setMessage("Nowe hasło zostało wyłane na twój email");
                    setOpenAlert(true);
                    setIsInfo(true);
                    history.push("login");
                } else {
                    setMessage("Skontaktuj się z adminem");
                    setOpenAlert(true);
                }
            })
            .catch((err) => {
                setMessage(`Skontaktuj się z adminem: ${err}`);
                setOpenAlert(true);
            });
    };
    return (
        <>
            <TopBar />
            <div className="centerRestore">
                <form name="resotrePassword" onSubmit={handleSubmit(onSubmit)}>
                    <h3>Wprowadź email aby wysłać hasło tymczasowe</h3>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="form-control form-control-lg input"
                        ref={register({ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })}
                    />
                    {errors.email?.type === "pattern" && <ErrorMessage>Email jest nieprawidłowy</ErrorMessage>}
                    {errors.email?.type === "required" && <ErrorMessage>Email jest wymagany</ErrorMessage>}
                    <div className="horizontalGroup">
                        <Button type="submit" variant="contained" color="primary">
                            Wyślij
                        </Button>
                    </div>
                </form>
                {openAlert && <Error closeCallback = {closeError} error={message} isInfo={isInfo}/>}
            </div>
        </>
    );
}
