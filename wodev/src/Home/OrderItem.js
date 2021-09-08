import { Button } from "@material-ui/core";
import React from "react";

export const OrderItem = ({ item, acceptAction, openAction }) => {
    const open = () => {
        openAction(item);
    };

    const accept = () => {
        acceptAction(item);
    };

    return (
        <tr>
            <td>{item.Type}</td>
            <td>{item.Name}</td>
            <td>{item.ReqFunc}</td>
            <td>{item.ReqNoFunc}</td>
            <td>{item.Technology}</td>
            <td>{item.DeadLine}</td>
            <td>
                {!item.WorkingUser ? (
                    <Button variant="outlined" onClick={accept}>
                        Przyjmij
                    </Button>
                ) : (
                    <div>
                        
                    </div>

                )}
                <Button variant="outlined" onClick={open}>
                    Podgląd
                </Button>
            </td>
        </tr>
    );
};
