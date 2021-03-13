import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

export default function SnackbarInfo({ isOpen, errorMessage,onClose,severity = "error",variant = "filled" }) {
    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={5000}
            onClose={onClose}>
            <MuiAlert elevation={6} variant={variant} severity={severity}>
                {errorMessage}
            </MuiAlert>
        </Snackbar>
    );
}
