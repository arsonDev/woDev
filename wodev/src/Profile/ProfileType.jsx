import React from "react";
import styled, { css } from "styled-components";
import worker from "../Resources/worker.png";
import employer from "../Resources/employer.png";

export const ProfileTypeDict = {
    worker: "Employee",
    employer: "Employer",
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

        ${() =>
            selected &&
            css`
                box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 1);
            `}}

        img {
            height: 120px;
        }

        :hover {
            background-color: gray;
            border-color : black;
        }
    `;

    return (
        <Card onClick={onClickEvent} className={selected ? "selectedType" : ""}>
            <h3>{profileType == ProfileTypeDict.worker ? ProfileTypeDict.worker : ProfileTypeDict.employer}</h3>
            <img src={profileType == ProfileTypeDict.worker ? worker : employer} alt={profileType == ProfileTypeDict.worker ? ProfileTypeDict.worker : ProfileTypeDict.employer} />
        </Card>
    );
}
