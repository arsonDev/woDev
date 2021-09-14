import SnackbarInfo from "../_components/SnackbarInfo";
import MuiAlert from "@material-ui/lab/Alert";
import styled from "styled-components";

export const ErrorMessage = styled.span`
    color: red;
    margin-left: 5px;
    margin-bottom: 15px;
`;

export const Error = ({ error, closeCallback,isInfo=false} ) => {
    const generateMessage = error.Message ? error.Message : error.Error ? error.Error : error;

    return (
        <SnackbarInfo isOpen={true} onClose={closeCallback} autoHideDuration={5000}>
            <MuiAlert elevation={6} variant="filled" severity={isInfo ? "info" : "error"}>
                <span>{generateMessage}</span>
            </MuiAlert>
            <span>{generateMessage}</span>
        </SnackbarInfo>
    );
};
