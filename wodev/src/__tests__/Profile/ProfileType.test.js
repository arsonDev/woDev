import React from 'react';
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import ProfileType from '../../Profile/ProfileType'

describe("ProfileType one element tests",() => {
    it("Correct render employee",() => {
        const {getByText} = render(<ProfileType profileType={"Employee"}/>)
        expect(getByText("Employee")).toBeInTheDocument();
    })

    it("Correct render employer",() => {
        const {getByText} = render(<ProfileType profileType={"Employer"}/>)
        expect(getByText("Employer")).toBeInTheDocument();
    })
})
