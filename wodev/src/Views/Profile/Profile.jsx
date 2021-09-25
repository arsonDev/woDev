import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@material-ui/core";
import "./Profile.scss";
import { CreateAccount } from "../../Services/ProfileService";
import SnackbarInfo from "../../_components/SnackbarInfo";
import { ErrorMessage } from "../../Utils/ErrorMessage";
import { ProfileType, ProfileTypeDict } from "./ProfileType";
import { TopBar } from "../../Utils/TopBar";

export default function Profile() {
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();
    const [startDate, setStartDate] = useState(new Date(2000,1,1));
    const [errorMessage, setErrorMessage] = useState();
    const [type, setType] = useState(ProfileTypeDict.creator);

    const user = JSON.parse(localStorage.getItem("user"));

    const onSubmit = (values) => {
        let profileData = {
            ...values,
            userProfileTypeId: type == ProfileTypeDict.dev ? 1 : 2,
            UserId: user.userId,
        };

        CreateAccount(profileData)
            .then((res) => {
                let localUser = JSON.parse(localStorage.getItem("user"));

                localStorage.setItem("user", JSON.stringify({ ...localUser, profile: res }));
                history.push("/dashboard");
            })
            .catch((err) => {
                setErrorMessage(err?.response?.data?.error ?? "An error has ocured");
            });
    };

    return (
        <>
            <TopBar />
            <div className="container fluid center" style={{ overflowX: "hidden" }}>
                <div className="center profileForm">
                    <h3>Wypełnij pola aby dokończyc proces tworzenia konta</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group centerGroup">
                            <div className="centerType">
                                <ProfileType
                                    profileType={ProfileTypeDict.creator}
                                    onClickEvent={() => setType(ProfileTypeDict.creator)}
                                    selected={type == ProfileTypeDict.creator}
                                />
                                <ProfileType profileType={ProfileTypeDict.dev} onClickEvent={() => setType(ProfileTypeDict.dev)} selected={type == ProfileTypeDict.dev} />
                            </div>
                            <label for="Name">Imię</label>
                            <input className="form-control form-control-lg input" type="text" placeholder="Np. Jan" name="Name" ref={register({ required: true })} />
                            {errors.Name?.type === "required" && <ErrorMessage>Imie jest wymagane</ErrorMessage>}
                            <label for="SurName">Nazwisko</label>
                            <input className="form-control form-control-lg input" type="text" placeholder="Np. Kowalski" name="SurName" ref={register({ required: true })} />
                            {errors.SurName?.type === "required" && <ErrorMessage>Nazwisko jest wymagane</ErrorMessage>}
                            <label for="BirthDate">Data urodzenia</label>
                            <div className="datePickerStyle">
                                <input
                                    type="date"
                                    className="form-control form-control-lg input"
                                    name="BirthDate"
                                    placeholderText="Np. 01/01/1990"
                                    ref={register({ required: true })}
                                />
                            </div>
                            {errors.BirthDate?.type === "required" && <ErrorMessage>Data urodzenia jest wymagana</ErrorMessage>}

                            <label for="Address">Adres</label>
                            <input className="form-control form-control-lg input" type="text" placeholder="Np Warszawa 1 Polska" name="Address" ref={register()} />

                            <label for="Phone">Telefon</label>
                            <input
                                className="form-control form-control-lg input"
                                type="text"
                                placeholder="Np. 123456789"
                                name="Phone"
                                ref={register({ pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/ })}
                            />
                            {errors.Phone?.type === "pattern" && <ErrorMessage>Telefon ma niepoprawny format</ErrorMessage>}

                            <label for="Description">Opis</label>
                            <textarea
                                className="form-control form-control-lg input "
                                style={{ maxHeight: "300px", minHeight: "100px" }}
                                type="text"
                                placeholder="Opisz siebie"
                                name="Description"
                                ref={register({ required: true })}
                            />
                            {errors.Description?.type === "required" && <ErrorMessage>Uzupełnij opis</ErrorMessage>}
                            <Button variant="contained" color="primary" type="submit">
                                Utwórz konto
                            </Button>
                        </div>
                    </form>
                    <SnackbarInfo
                        isOpen={errorMessage != null && errorMessage != undefined}
                        message={errorMessage}
                        onClose={() => {
                            setErrorMessage(null);
                        }}
                    />
                </div>
            </div>
        </>
    );
}
