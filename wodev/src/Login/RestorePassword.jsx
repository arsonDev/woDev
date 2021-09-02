import { Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./RestorePassword.scss";
import { ErrorMessage } from "../Utils/ErrorMessage";
import { ResetPassword } from "../Services/PasswordService";
import { useHistory } from "react-router-dom";
import { TopBar } from "../Utils/TopBar";

export default function RestorePassword() {
    const { register, handleSubmit, errors } = useForm();
    const [message, setMessage] = useState();
    const [openAlert, setOpenAlert] = useState(false);
    const history = useHistory();

    const onSubmit = (data) => {
        ResetPassword(data)
            .then((res) => {
                if (res == true) {
                    setMessage("New password was send to Your email");
                    setOpenAlert(true);
                    history.push("login");
                } else {
                    setMessage("We have problem, contact with admin");
                    setOpenAlert(true);
                }
            })
            .catch((err) => {
                setMessage(`We have problem, contact with admin: ${err}`);
                setOpenAlert(true);
            });
    };
    return (
        <>
            <TopBar />
            <div className="centerRestore">
                <form name="resotrePassword" onSubmit={handleSubmit(onSubmit)}>
                    <h3>Enter Your email to send temporary password</h3>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="form-control form-control-lg input"
                        ref={register({ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })}
                    />
                    {errors.email?.type === "pattern" && <ErrorMessage>Email is invalid</ErrorMessage>}
                    {errors.email?.type === "required" && <ErrorMessage>Email is required</ErrorMessage>}
                    <div className="horizontalGroup">
                        <Button type="submit" variant="contained" color="primary">
                            Send
                        </Button>
                    </div>
                </form>
                <Snackbar
                    open={openAlert}
                    autoHideDuration={5000}
                    onClose={() => {
                        setOpenAlert(false);
                        setMessage("");
                    }}>
                    <MuiAlert elevation={6} variant="filled" severity="error">
                        {message}
                    </MuiAlert>
                </Snackbar>
            </div>
        </>
    );
}
