import React from "react";
import { useForm } from "react-hook-form";
import './Login.scss'
export default function Login() {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label for="login">Login</label>
                <input id="login" className="form-control form-control-lg" type="text" placeholder="login" name="Login" ref={register({ required: true })} />
                <label for="password">Password</label>
                <input id="password" className="form-control form-control-lg" type="text" placeholder="password" name="Password" ref={register({ required: true, minLength: 8 })} />
            </div>
            <div className="form-group">
                <input className="btn btn-primary" type="submit" value="Log in" />
            </div>
        </form>
    );
}
