import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import Login from "../../Login/Login";
import { BrowserRouter } from "react-router-dom";

describe("Login form test", () => {
    test("render form", async () => {
        const { getByText, getByPlaceholderText } = render(<BrowserRouter><Login /></BrowserRouter>);
        expect(getByText("Log in")).toBeInTheDocument();
        expect(getByPlaceholderText("Login")).toBeInTheDocument();
        expect(getByPlaceholderText("Password")).toBeInTheDocument();
    });

    test("log in validation test", async () => {
        const { getByText } = render(<BrowserRouter><Login /></BrowserRouter>);
        act(() => {
            fireEvent(
                getByText("Log in"),
                new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                })
            );
        });
        const loginReq = await waitFor(() => getByText("Login is required"));
        const passwordReq = await waitFor(() => getByText("Password is required"));
        expect(loginReq).toBeInTheDocument();
        expect(passwordReq).toBeInTheDocument();
    });
});
