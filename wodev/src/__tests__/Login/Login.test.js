import React from 'react';
import {render} from '@testing-library/react';
import Login from '../../Login/Login';

test("render form",async () => {    
    const {getByText,getByPlaceholderText} = render(<Login/>);
    expect(getByText("Log in")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();
    expect(getByPlaceholderText("login")).toBeInTheDocument();
    expect(getByText("Password")).toBeInTheDocument();
    expect(getByPlaceholderText("password")).toBeInTheDocument();
});