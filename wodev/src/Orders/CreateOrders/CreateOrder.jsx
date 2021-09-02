import { Box, Button, ButtonBase, Container, Grid, Modal } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { saveOrder } from "../../Services/OrderService";
import { ErrorMessage } from "../../Utils/ErrorMessage";
import "./CreateOrder.scss";

export const CreateOrder = ({ onCloseCallback, editMode = false }) => {
    const { register, handleSubmit, errors } = useForm();

    const [fileList, setFileList] = useState([]);

    const readFile = (file) =>
        new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = function () {
                resolve({ data: reader.result, name: file.name });
            };

            reader.onerror = function () {
                reject(reader);
            };

            reader.readAsDataURL(file);
        });

    const selectFiles = (event) => {
        let readers = [];

        for (let file of event.target.files) {
            readers.push(readFile(file));
        }

        Promise.all(readers).then((values) => {
            setFileList(values);
        });
    };

    const submit = (data) => {
        saveOrder({ ...data, files: fileList });
    };

    return (
        <>
            <Modal style={{ margin: "100px" }} open onClose={onCloseCallback} aria-labelledby="Stwórz zlecenie">
                <Container maxWidth="sm" style={{ backgroundColor: "white", padding: "15px" }}>
                    <Grid container direction="column" justifyContent="center" alignItems="stretch">
                        <div style={{ display: "flex" }}>
                            Utwórz zlecenie
                            <GrClose onClick={onCloseCallback} style={{ margin: "5px", marginLeft: "auto" }} />
                        </div>
                        <hr style={{ width: "100%", height: "1px" }} />
                        <input className="form-control form-control-lg input" type="text" placeholder="Nazwa" name="name" ref={register({ required: true })} />
                        {errors.name?.type === "required" && <ErrorMessage>Name is required</ErrorMessage>}
                        <input className="form-control form-control-lg input" type="text" placeholder="Typ" name="type" ref={register({ required: true })} />
                        {errors.type?.type === "required" && <ErrorMessage>Type is required</ErrorMessage>}
                        <textarea
                            className="form-control form-control-lg input"
                            style={{ maxHeight: "500px", minHeight: "50px", width: "100%" }}
                            type="text"
                            placeholder="Wymagania funkcjonalne"
                            name="func"
                            ref={register({ required: true })}
                        />
                        {errors.func?.type === "required" && <ErrorMessage>Zdefiniuj conajmniej jedno wymaganie</ErrorMessage>}
                        <textarea
                            className="form-control form-control-lg input"
                            style={{ maxHeight: "500px", minHeight: "50px", width: "100%" }}
                            type="text"
                            placeholder="Wymagania niefunkcjonalne"
                            name="nofunc"
                            ref={register({ required: true })}
                        />
                        {errors.nofunc?.type === "required" && <ErrorMessage>Zdefiniuj conajmniej jedno wymaganie</ErrorMessage>}

                        <span>Dodaj projekt graficzny</span>

                        <div className="row">
                            <div className="col-4">
                                <label for="upload" className="buttonStyle">
                                    Dodaj załączniki
                                </label>
                                <input
                                    id="upload"
                                    type="file"
                                    name="files"
                                    accept="image/*,.zip,.rar"
                                    multiple
                                    onChange={selectFiles}
                                    style={{ visibility: "hidden" }}
                                    ref={register({ required: true })}
                                />
                            </div>
                            <div className="col-8">
                                <ul style={{ maxHeight: "100px", overflowX: "hidden",overflowY:'auto', width: "100%" }}>
                                    {fileList.map((x) => (
                                        <li className="row" style={{listStyle:'none',justifyContent:'left'}}>
                                            <GrClose
                                                onClick={() => {
                                                    setFileList(fileList.filter((y) => y != x));
                                                }}
                                                style={{ marginRight: "1px" }}
                                            />
                                            <span style={{textOverflow:'ellipsis',whiteSpace:'nowrap',overflow:'hidden',width:'250px'}}>{x.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <textarea
                            className="form-control form-control-lg input"
                            style={{ maxHeight: "100px", minHeight: "50px", width: "100%" }}
                            type="text"
                            placeholder="Proponowane technologie"
                            name="tech"
                            ref={register()}
                        />

                        <hr style={{ width: "100%", height: "1px" }} />
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Button variant="contained" color="primary" type="submit" onClick={handleSubmit(submit)}>
                                Zapisz
                            </Button>
                        </div>
                    </Grid>
                </Container>
            </Modal>
        </>
    );
};
