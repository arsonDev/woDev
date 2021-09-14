import React from "react";
import { SearchBar } from "../Utils/SearchBar";
import { ProfileTypeDict } from "../Profile/ProfileType";
import { TopBar } from "../Utils/TopBar";
import { Box, Button, IconButton, Tab, Tabs } from "@material-ui/core";
import { GrAdd } from "react-icons/gr";
import { useState } from "react";
import { CreateOrder } from "../Orders/CreateOrders/CreateOrder";
import { OrderProvider, useOrders } from "../_context/orderContext";
import { OrderItem } from "./OrderItem";
import SwipeableViews from "react-swipeable-views";
import { updateOrder } from "../Services/OrderService";

export default function Home() {
    const profile = JSON.parse(localStorage.getItem("user"));

    const [createModal, setCreateModal] = useState(false);

    const [editModal, setEditModal] = useState(false);
    const [tab, setTab] = useState(0);
    const { orders, ordersInProgress,setFetchData } = useOrders();
    const [itemToEdit, setItemToEdit] = useState(null);

    const acceptOrder = (item) => {
        updateOrder({...item,WorkingUser : {UserId : profile.profile.userId , Email : profile.profile.email,Login : profile.profile.Login}},item.Id).then(res => {
            setFetchData(true);
        }).catch(err => {
            alert(err)
        })
    };

    const openOrder = (item) => {
        setItemToEdit(item);
        setEditModal(!editModal);
    };

    const tabOrders = (
        <table className="table table-lg table-striper table-responsive-lg">
            <thead>
                <tr>
                    <th>Typ</th>
                    <th>Nazwa</th>
                    <th>Wymagania funkcjonalne</th>
                    <th>Wymagania niefunkcjonalne</th>
                    <th>Technologia</th>
                    <th>Planowana data zakończenia</th>
                    <th>Akcja</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((x) => (
                    <OrderItem item={x} acceptAction={acceptOrder} openAction={openOrder} />
                ))}
            </tbody>
        </table>
    );

    const tabOrdersInProgress = <table className="table table-lg table-striper table-responsive-lg">
    <thead>
        <tr>
            <th>Typ</th>
            <th>Nazwa</th>
            <th>Wymagania funkcjonalne</th>
            <th>Wymagania niefunkcjonalne</th>
            <th>Technologia</th>
            <th>Planowana data zakończenia</th>
            <th>Akcja</th>
        </tr>
    </thead>
    <tbody>
        {ordersInProgress.map((x) => (
            <OrderItem item={x} acceptAction={acceptOrder} openAction={openOrder} />
        ))}
    </tbody>
</table>;

    const changeTab = (event, newValue) => {
        setTab(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
                {value === index && <Box p={2}>{children}</Box>}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }

    return (
        <>
            <TopBar />
            <div className="container">
                <Tabs value={tab} onChange={changeTab} indicatorColor="primary" textColor="primary" centered>
                    <Tab label="Dostępne zlecenia" {...a11yProps(0)} />
                    <Tab label="Przyjęte zlecenia" {...a11yProps(1)} disabled={ordersInProgress.length == 0 ? true : false} />
                </Tabs>
                <TabPanel value={tab} index={0}>
                    {tabOrders}
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    {tabOrdersInProgress}
                </TabPanel>
            </div>

            {createModal && (
                <CreateOrder
                    onCloseCallback={() => {
                        setCreateModal(!createModal);
                    }}
                />
            )}
            {editModal && itemToEdit != null && (
                <CreateOrder
                    onCloseCallback={() => {
                        setEditModal(!editModal);
                        setItemToEdit(null);
                    }}
                    editMode={true}
                    item={itemToEdit}
                />
            )}
            {//profile.type &&
            <Button
                style={{borderRadius:'8px', position:'absolute',top:'auto',left:'auto',right:'2vw',bottom:'2vh'}}
                // aria-label="add"
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                    setCreateModal(!createModal);
                }}
                startIcon={<GrAdd/>}>
                
                Dodaj
            </Button>}
        </>
    );
}
