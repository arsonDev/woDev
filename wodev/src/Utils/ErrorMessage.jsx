import SnackbarInfo from "../_components/SnackbarInfo";
import styled from "styled-components";
import { Alert } from "@material-ui/lab";
import { useEffect } from "react";
import { Snackbar } from "@material-ui/core";

export const ErrorMessage = styled.span`
    color: red;
    margin-left: 5px;
    margin-bottom: 15px;
`;

export const Error = ({ error, closeCallback,isInfo=false} ) => {
    const generateMessage = () => {
        return error.Message ? error.Message : error.Error ? error.Error : error ? error : !isInfo ? "Błąd połączenia z serwerem" : error ;}

        
    return (
        <Snackbar open={true} onClose={closeCallback} autoHideDuration={7000}>
        <Alert color={isInfo ? 'info' : "error"} variant="filled" severity={isInfo ? 'info' : "error"} sx={{ width: '100%' }}>
                <span>{generateMessage()}</span>
        </Alert>
        </Snackbar>
    );
};
