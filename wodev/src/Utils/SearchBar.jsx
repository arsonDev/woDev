import styled from "styled-components";
import React from "react";
import { Input } from "@material-ui/core";
import {BiSearchAlt2} from 'react-icons/bi'
import './SearchBar.scss';

export const SearchBar = ({ hint, callbackFunc,width }) => {
    const Container = styled.div`
        align-self : center;
        margin: 10px;
        border-radius: 25px;
        width: 100%;
        max-width: 650px;
        border-color: lightgray;
        border-style: solid;
        border-width: 0.5px;
        background-color: #fefefe;
        height: 50px;
        align-content: center;
        justify-content: center;
        padding: 10px;
        padding-left: 20px;
    `;

    return (
        <Container>
            <Input style={{width:'90%'}} placeholder={hint}/>
            <BiSearchAlt2 onClick={callbackFunc} className='searchIcon' />
        </Container>
    );
};
