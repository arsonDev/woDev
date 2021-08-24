import React from "react";
import { SearchBar } from "../Utils/SearchBar";
import { ProfileTypeDict } from "../Profile/ProfileType";
import { TopBar } from "../Utils/TopBar";

export default function Home() {
    const profile = JSON.parse(localStorage.getItem("user"));

    const search = () => {};

    return (
        <div>
            <TopBar/>
            <div style={{ margin:'auto',width : '40vw', display: "flex", flexDirection:'column', justifyContent: "center" }}>
                {profile?.type == ProfileTypeDict.employer ? <h2 style={{textAlign : 'center'}}>Wyszukaj najlepszego pracownika</h2> : <h2 style={{textAlign : 'center'}}>Wyszukaj najlepszej dla siebie oferty pracy</h2>}
                <SearchBar hint="Stanowisko, Miasto...?" callbackFunc={search} />
            </div>
        </div>
    );
}
