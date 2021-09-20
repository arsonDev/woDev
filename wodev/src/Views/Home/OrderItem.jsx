import { Button } from "@material-ui/core";
import React from "react";

export const OrderItem = ({ item, acceptAction, openAction,deleteAction }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const open = () => {
        openAction(item);
    };

    const accept = () => {
        acceptAction(item);
    };

    const deleteFunc = () => {
        deleteAction(item);
    }

    return (
        <tr>
            <td>{item.Type}</td>
            <td>{item.Name}</td>
            <td>{item.ReqFunc}</td>
            <td>{item.ReqNoFunc}</td>
            <td>{item.Technology}</td>
            <td>{item.DeadLine}</td>
            <td>
                <div style={{display:'flex' ,flexDirection:'row'}}>
                <Button style={{marginRight:'5px'}} variant="outlined" onClick={open}>
                    Podgląd
                </Button>
                {!item.WorkingUser && user.profile.userProfileTypeId == 1 ? (
                    <Button variant="outlined" onClick={accept}>
                        Przyjmij
                    </Button>
                ) : (
                    <div>
                        
                    </div>

                )}
                {user.profile.userProfileTypeId == 2 ? (
                    <Button variant="contained" color='secondary' onClick={deleteFunc}>
                        Usuń
                    </Button>
                ) : (
                    <div>
                        
                    </div>

                )}
                </div>
            </td>
        </tr>
    );
};
