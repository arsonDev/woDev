import React, { useMemo, useState } from "react";
import { LoadOrders, LoadWorkingInProgress, LoadMyCreated, LoadOnWorking } from "../Services/OrderService";

const OrderContext = React.createContext();
OrderContext.displayName = "OrderContext";

function OrderProvider(props) {
    const user = JSON.parse(localStorage.getItem("user"));

    const [orders, setOrders] = useState([]);
    const [ordersInProgress, setOrderInProgress] = useState([]);

    const [maxOrderPage, setOrderMaxPage] = useState();
    const [maxOrderInProgPage, setOrderInProgMaxPage] = useState();

    const [pageOrder, setOrderPage] = useState(1);
    const [pageInProgressOrder, setPageInProgressOrder] = useState(1);

    const [pageSize, setPageSize] = useState(12);
    const [pageInProgSize, setPageInProgSize] = useState(12);

    const [fetchData, setFetchData] = useState(false);

    React.useEffect(() => {
        if (user.profile.userProfileTypeId == 1) {
            getOrders(pageOrder, pageSize);
        } else {
            getMyCreated(pageOrder, pageSize);
        }
    }, [pageOrder]);

    React.useEffect(() => {
        if (user.profile.userProfileTypeId == 1) {
            getOrderInProgress(pageInProgressOrder, pageInProgSize);
        } else {
            getOnWorking(pageInProgressOrder, pageInProgSize);
        }
    }, [pageInProgressOrder]);

    React.useEffect(() => {
        if (fetchData == true) {
            if (user.profile.userProfileTypeId == 1) {
                getOrders(pageOrder, pageSize, true);
                getOrderInProgress(pageInProgressOrder, pageInProgSize, true);
            } else {
                getMyCreated(pageOrder, pageSize, true);
                getOnWorking(pageInProgressOrder, pageInProgSize, true);
            }
        }
    }, [fetchData]);

    const getOrders = async (page, pageSize, forceReload = false) => {
        await LoadOrders({ userId: user.userId, page, pageSize })
            .then((res) => {
                if (res.status == 200) {
                    if (!forceReload) {
                        setOrders([...orders, ...res.data.Orders]);
                    } else {
                        setOrders([...res.data.Orders]);
                    }
                    setOrderMaxPage(Math.round(res.data.Count / pageSize));
                } else {
                }
            })
            .catch((err) => {});
        setFetchData(false);
    };

    const getMyCreated = async (page, pageSize, forceReload = false) => {
        await LoadMyCreated({ userId: user.userId, page, pageSize })
            .then((res) => {
                if (res.status == 200) {
                    if (!forceReload) {
                        setOrders([...orders, ...res.data.Orders]);
                    } else {
                        setOrders([...res.data.Orders]);
                    }
                    setOrderMaxPage(Math.round(res.data.Count / pageSize));
                } else {
                }
            })
            .catch((err) => {});
        setFetchData(false);
    };

    const getOnWorking = async (page, pageSize, forceReload = false) => {
        await LoadOnWorking({ userId: user.userId, page, pageSize })
            .then((res) => {
                if (res.status == 200) {
                    if (!forceReload) {
                        setOrderInProgress([...orders, ...res.data.Orders]);
                    } else {
                        setOrderInProgress([...res.data.Orders]);
                    }
                    setOrderMaxPage(Math.round(res.data.Count / pageSize));
                } else {
                }
            })
            .catch((err) => {});
        setFetchData(false);
    };

    const getOrderInProgress = async (page, pageSize, forceReload = false) => {
        await LoadWorkingInProgress({ userId: user.userId, page, pageSize })
            .then((res) => {
                if (res.status == 200) {
                    if (!forceReload) {
                        setOrderInProgress([...ordersInProgress, ...res.data.Orders]);
                    } else {
                        setOrderInProgress([...res.data.Orders]);
                    }
                    setOrderInProgMaxPage(Math.round(res.data.Count / pageSize));
                } else {
                }
            })
            .catch((err) => {});
        setFetchData(false);
    };

    const value = useMemo(
        () => ({ setFetchData, orders, ordersInProgress, setOrderPage, setPageInProgressOrder, maxOrderInProgPage, maxOrderPage }),
        [setFetchData, orders, ordersInProgress, setOrderPage, setPageInProgressOrder, maxOrderInProgPage, maxOrderPage]
    );

    return <OrderContext.Provider value={value} {...props} />;
}

function useOrders() {
    const context = React.useContext(OrderContext);
    if (context === undefined) {
        throw new Error(`useOrders must be used within a OrderContext`);
    }
    return context;
}

export { useOrders, OrderProvider };
