import React from "react";
import styled, { css } from "styled-components";
import worker from "../../Resources/worker.png";
import employer from "../../Resources/employer.png";

export const ProfileTypeDict = {
    creator: "Creator",
    dev: "Programmer",
};

export default function ProfileType({ profileType, selected, onClickEvent }) {
    const Card = styled.div`
        border-color: gray;
        border-radius: 15px;
        border-width: 3px;
        border-style: solid;
        margin: 20px;
        padding: 10px;
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 165px;
        min-width: 165px;

        ${() =>
            selected &&
            css`
                box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 1);
            `}}

        img {
            height: 120px !important;
            width: 100px !important;
        }

        :hover {
            background-color: gray;
            border-color : black;
        }
    `;

    return (
        <Card onClick={onClickEvent} className={selected ? "selectedType" : ""}>
            <h3>{profileType == ProfileTypeDict.creator ? ProfileTypeDict.creator : ProfileTypeDict.dev}</h3>
            <img src={profileType == ProfileTypeDict.creator ? worker : employer} alt={profileType == ProfileTypeDict.creator ? ProfileTypeDict.creator : ProfileTypeDict.dev} />
        </Card>
    );
}
