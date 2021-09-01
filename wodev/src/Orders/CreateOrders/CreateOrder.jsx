import { Box, Button, ButtonBase, Container, Grid, Modal } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { ErrorMessage } from "../../Utils/ErrorMessage";

export const CreateOrder = ({ onCloseCallback, editMode = false }) => {
    const { register, handleSubmit, errors } = useForm();

    const submit = (data) => {

    }

    return (
        <>
            <Modal style={{ margin: "100px", }} open onClose={onCloseCallback} aria-labelledby="Stwórz zlecenie">
                <Container maxWidth="sm" style={{ backgroundColor: "white",padding:'15px' }}>
                    <Grid container direction="column" justifyContent="center" alignItems="stretch">
                        <div style={{display:'flex'}}>
                            Utwórz zlecenie
                            <GrClose onClick={onCloseCallback} style={{ margin: "5px",marginLeft:'auto' }} />
                        </div>
                        <hr style={{width:'100%',height:'1px'}}/>
                        <input className="form-control form-control-lg input" type="text" placeholder="Nazwa" name="name" ref={register({ required: true })} />
                        {errors.name?.type === "required" && <ErrorMessage>Name is required</ErrorMessage>}
                        <input className="form-control form-control-lg input" type="text" placeholder="Typ" name="type" ref={register({ required: true })} />
                        {errors.type?.type === "required" && <ErrorMessage>Type is required</ErrorMessage>}
                        <textarea className="form-control form-control-lg input" style={{maxHeight:'500px',minHeight:'50px',width:'100%'}} type="text" placeholder="Wymagania funkcjonalne" name="func" ref={register({ required: true })} />
                        {errors.func?.type === "required" && <ErrorMessage>Zdefiniuj conajmniej jedno wymaganie</ErrorMessage>}
                        <textarea className="form-control form-control-lg input" style={{maxHeight:'500px',minHeight:'50px',width:'100%'}} type="text" placeholder="Wymagania niefunkcjonalne" name="nofunc" ref={register({ required: true })} />
                        {errors.nofunc?.type === "required" && <ErrorMessage>Zdefiniuj conajmniej jedno wymaganie</ErrorMessage>}
                        
                        <span>Dodaj projekt graficzny</span>
                        <span style={{fontSize:'10px' , color:'gray'}}>tylko spakowane archiwum zip</span>
                        <Button variant="outlined" color='secondary' style={{maxWidth:'200px',marginBottom:'5px',marginTop:'5px'}}>
                            Dodaj załącznik 
                        </Button>

                        <textarea className="form-control form-control-lg input" style={{maxHeight:'100px',minHeight:'50px',width:'100%'}} type="text" placeholder="Proponowane technologie" name="tech"/>

                        <hr style={{width:'100%',height:'1px'}}/>
                        <div style={{display:'flex',justifyContent:'end'}}>
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
