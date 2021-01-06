import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import RestorePassword from "../../Login/RestorePassword";

describe("RestorePassword test", () => {
    test("correct render", () => {
        const { getByPlaceholderText, getByText } = render(<RestorePassword />);
        expect(getByPlaceholderText("Email")).toBeInTheDocument();
        expect(getByText("Send")).toBeInTheDocument();
    });

    test("validation empty email", async () => {
        const { getByText } = render(<RestorePassword />);
        let sendButton = getByText("Send");
        act(() => {
            fireEvent(sendButton, new MouseEvent("click", { bubbles: true, cancelable: false }));
        });
        const emailReq = await waitFor(() => getByText("Email is required"));
        expect(emailReq).toBeInTheDocument();
    });

    test("validation email to short", async () => {
        const { getByText, getByPlaceholderText } = render(<RestorePassword />);
        let sendButton = getByText("Send");
        fireEvent.change(getByPlaceholderText("Email"), { target: { value: "abcde" } });
        act(() => {
            fireEvent(sendButton, new MouseEvent("click", { bubbles: true, cancelable: false }));
        });
        const emailInvalid = await waitFor(() => getByText("Email is invalid"));
        expect(emailInvalid).toBeInTheDocument();
    });
});
