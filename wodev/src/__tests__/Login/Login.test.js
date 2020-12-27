import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import Login from "../../Login/Login";

describe("Login form test", () => {
    test("render form", async () => {
        const { getByText, getByPlaceholderText } = render(<Login />);
        expect(getByText("Log in")).toBeInTheDocument();
        expect(getByPlaceholderText("Login")).toBeInTheDocument();
        expect(getByPlaceholderText("Password")).toBeInTheDocument();
    });

    test("log in validation test", async () => {
        const { getByText } = render(<Login />);
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

    test("log in validation password to short", async () => {
        const { getByText, getByPlaceholderText } = render(<Login />);
        fireEvent.change(getByPlaceholderText("Password"), { target: { value: "abcde" } });
        act(() => {
            fireEvent(
                getByText("Log in"),
                new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                })
            );
        });

        const password = await waitFor(() => getByText("Password is to short"));
        expect(password).toBeInTheDocument();
    });
});
