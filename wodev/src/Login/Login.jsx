import React from "react";
import { useForm } from "react-hook-form";
import "./Login.scss";
import { Button } from "@material-ui/core";
import { ErrorMessage } from "../Utils/ErrorMessage";
import { TextButton } from "../Utils/TextButton";
import { Link } from "react-router-dom";

export default function Login() {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <div className="center">
            <h2 style={{ marginTop: "10vh" }}>Witaj na platformie</h2>

            <h1>WoDev</h1>
            <div style={{ margin: "auto" }}>
                <form name="credentials" className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <input id="login" className="form-control form-control-lg input" type="text" placeholder="Login" name="login" ref={register({ required: true })} />
                        {errors.login && <ErrorMessage>Login is required</ErrorMessage>}
                        <input
                            id="password"
                            className="form-control form-control-lg input"
                            type="text"
                            placeholder="Password"
                            name="password"
                            ref={register({ required: true, minLength: 8 })}
                        />
                        {errors.password?.type === "required" && <ErrorMessage>Password is required</ErrorMessage>}
                        {errors.password?.type === "minLength" && <ErrorMessage>Password is to short</ErrorMessage>}
                    </div>
                    <div className="horizontalGroup">
                        <Button variant="contained" color="primary" type="submit">
                            Log in
                        </Button>
                    </div>
                </form>
                <div className="horizontalGroup">
                    <Link to="/restorePassword">
                        <TextButton>Nie pamietam hasła</TextButton>
                    </Link>
                    <Link to="/CreateAccount">
                        <TextButton>Utwórz nowe konto</TextButton>
                    </Link>
                </div>
            </div>
        </div>
    );
}
