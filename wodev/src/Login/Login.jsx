import React,{useState} from "react";
import { useForm } from "react-hook-form";
import "./Login.scss";
import { Button, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { ErrorMessage } from "../Utils/ErrorMessage";
import { TextButton } from "../Utils/TextButton";
import { Link, Redirect } from "react-router-dom";
import Logo from "../Resources/Logo.png";
import { LoginService } from "../Services/LoginService";
import { ResponseStatus } from '../Services/Status'
import { useHistory } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory(); 
    const [openError,setOpenError] = useState(false);
    const [errorMessage,setErrorMessage] = useState();

    const onSubmit = (data) => {
        let service = new LoginService();
        service.Login(data).then((res) => {
            if (res == ResponseStatus.SUCCESS) {
                history.push("dashboard") 
            }else if (res.status == ResponseStatus.UNAUTHORIZED){
                setErrorMessage(res.message);
                setOpenError(true);
            }
        });
    };

    return (
        <div className="center">
            <h2 style={{ marginTop: "10vh" }}>Welcome on</h2>
            <img src={Logo} className="logoSize" alt=""></img>
            <h1>WoDev</h1>
            <div style={{ margin: "auto" }}>
                <form name="credentials" className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <input className="form-control form-control-lg input" type="text" placeholder="Login" name="login" ref={register({ required: true })} />
                        {errors.login?.type === "required" && <ErrorMessage>Login is required</ErrorMessage>}
                        <input
                            className="form-control form-control-lg input"
                            type="password"
                            placeholder="Password"
                            name="password"
                            ref={register({ required: true, minLength: 8 })}
                        />
                        {errors.password?.type === "required" && <ErrorMessage>Password is required</ErrorMessage>}
                        {errors.password?.type === "minLength" && <ErrorMessage>Password is to short</ErrorMessage>}
                    </div>
                    <div className="horizontalGroup">
                        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                            Log in
                        </Button>
                    </div>
                </form>
                <div className="horizontalGroup">
                    <Link to="/restorePassword">
                        <TextButton>Forgot password</TextButton>
                    </Link>
                    <Link to="/CreateAccount">
                        <TextButton>Sign up</TextButton>
                    </Link>
                </div>
            </div>
            <Snackbar open={openError} autoHideDuration={5000} onClose={(() => {setOpenError(false);setErrorMessage("")})}>
                <MuiAlert elevation={6} variant="filled" severity="error">{errorMessage}</MuiAlert>
            </Snackbar>
        </div>
    );
}
