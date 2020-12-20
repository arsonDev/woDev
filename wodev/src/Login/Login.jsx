import styled from "styled-components";
import React from "react";
import { useForm } from "react-hook-form";
import App from "../App";
import "./Login.scss";
export default function Login() {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => console.log(data);

    const ErrorMessage = styled.span`
        color: red;
        margin-left: 5px;
        margin-top : -5px;
        margin-bottom : 15px;
    `;

    return (
        <div className="center">
            <h2 style={{ marginTop: "10vh" }}>Witaj na platformie</h2>

            <h1>WoDev</h1>
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

                <input className="btn btn-primary fullWidth" type="submit" value="Log in" />
            </form>
        </div>
    );
}
