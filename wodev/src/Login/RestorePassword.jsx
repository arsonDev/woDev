import { Button } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import "./RestorePassword.scss";
import {ErrorMessage} from '../Utils/ErrorMessage'

export default function RestorePassword() {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => console.log(data,errors);

    console.log(errors);
    return (
        <div className="centerRestore">
            <form name="resotrePassword" onSubmit={handleSubmit(onSubmit)}>
                <h3>Na podany email zostanie wysłany link z możliwością zmiany hasła</h3>
                <input type="text" name="email" placeholder="Email" className="form-control form-control-lg input" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
                {errors.email?.type ==='pattern' && <ErrorMessage>Email is invalid</ErrorMessage>}
                {errors.email?.type ==='required' && <ErrorMessage>Email is required</ErrorMessage>}
                <div>
                    <Button type='submit' variant="contained" color="primary">
                        Send
                    </Button>
                </div>
            </form>
        </div>
    );
}
