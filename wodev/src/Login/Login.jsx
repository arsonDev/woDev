import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.scss";
import { Button } from "@material-ui/core";
import { ErrorMessage } from "../Utils/ErrorMessage";
import { TextButton } from "../Utils/TextButton";
import { Link, Redirect } from "react-router-dom";
import Logo from "../Resources/Logo.png";
import { ResponseStatus } from "../Services/Status";
import { useHistory } from "react-router-dom";
import SnackbarInfo from "../_components/SnackbarInfo";
import {Login as LoginMethod} from '../Services/LoginService'
import { TopBar } from "../Utils/TopBar";

export default function Login() {
    const { register, handleSubmit, errors ,reset} = useForm({});
    const history = useHistory();
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    React.useEffect(() => {
        checkConnection();
    },[])

    const checkConnection = () => {
        LoginMethod({login:'',password:''}).then(res => {

        }).catch(err => {
            
            setErrorMessage("Brak połączenia z serwisem");
            setOpenError(true);
        })
    }

    const closeError = () => {
        setOpenError(false);
    }

    const onSubmit = (data) => {
        LoginMethod(data)
            .then((res) => {
                if (res == ResponseStatus.SUCCESS) {
                    history.push("/dashboard");
                } else if (res == ResponseStatus.FIRST_LOGIN) {

                    history.push("/createProfile");
                } else {
                    setErrorMessage(res.message);
                    setOpenError(true);
                }
            })
            .catch((error) => {
                setErrorMessage(error);
                setOpenError(true);
            });
    };

    return (
        <>
        <TopBar/>
        <div className="center">
            <h2 style={{ marginTop: "10vh" }}>Witaj w</h2>
            <img src={Logo} className="logoSize" alt=""></img>
            <h1>WoDev</h1>
            <div style={{ margin: "auto" }}>
                <form name="credentials" className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <input className="form-control form-control-lg input" type="text" placeholder="Login" name="login" ref={register({ required: true })} />
                        {errors.login?.type === "required" && <ErrorMessage>Login jest wymagany</ErrorMessage>}
                        <input className="form-control form-control-lg input" type="password" placeholder="Hasło" name="password" ref={register({ required: true })} />
                        {errors.password?.type === "required" && <ErrorMessage>Hasło jest wymagane</ErrorMessage>}
                    </div>
                    <div className="horizontalGroup">
                        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                            Zaloguj
                        </Button>
                    </div>
                </form>
                <div className="horizontalGroup">
                    <Link to="/restorePassword">
                        <TextButton>Zapomniałeś hasła ?</TextButton>
                    </Link>
                    <Link to="/createAccount">
                        <TextButton>Dołącz</TextButton>
                    </Link>
                </div>
            </div>
           <ErrorMessage error={errorMessage} openError={openError} closeCallback={closeError}/>
        </div>
        </>
    );
}
