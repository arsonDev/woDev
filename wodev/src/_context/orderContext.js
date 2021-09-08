import React, { useMemo, useState } from 'react';
import { LoadOrders, LoadWorkingInProgress } from '../Services/OrderService';

const OrderContext = React.createContext();
OrderContext.displayName = 'OrderContext';

function OrderProvider(props) {

    const [orders,setOrders] = useState([]);
    const [ordersInProgress,setOrderInProgress] = useState([]);
    
    const [maxOrderPage,setOrderMaxPage] = useState();
    const [maxOrderInProgPage,setOrderInProgMaxPage] = useState();
    
    const [pageOrder,setOrderPage] = useState(1);
    const [pageInProgressOrder,setPageInProgressOrder] = useState(1);
    
    const [pageSize,setPageSize] = useState(12);
    const [pageInProgSize,setPageInProgSize] = useState(12);

    const [fetchData,setFetchData] = useState(false);

    React.useEffect(() => {
        getOrders(pageOrder,pageSize);
    },[pageOrder])

    React.useEffect(() => {
        getOrderInProgress(pageInProgressOrder,pageInProgSize);
    },[pageInProgressOrder])

    React.useEffect(() => {
        if (fetchData == true){
            setOrders([]);
            setOrderInProgress([]);
            getOrders(pageOrder,pageSize);
            getOrderInProgress(pageInProgressOrder,pageInProgSize);
        }
    },[fetchData])

    const user = JSON.parse(localStorage.getItem('user'));

    const getOrders = async (page,pageSize) => {
        await LoadOrders({userId : user.userId,page,pageSize}).then((res) => {
            if (res.status == 200){
                setOrders([...orders,...res.data.Orders]);
                setOrderMaxPage(Math.round(res.data.Count/pageSize));
            }else{

            }
        }).catch(err => {
            
        })
        setFetchData(false);
        
    }

    const getOrderInProgress = async (page,pageSize) => {
        await LoadWorkingInProgress({userId : user.userId,page,pageSize}).then((res) => {
            if (res.status == 200){
                setOrderInProgress([...ordersInProgress,...res.data.Orders]);
                setOrderInProgMaxPage(Math.round(res.data.Count/pageSize));
            }else{
                
            }
        }).catch(err => {
            
        })
        setFetchData(false);
    }

    const value = useMemo(() => ({setFetchData,orders,ordersInProgress,setOrderPage,setPageInProgressOrder,maxOrderInProgPage,maxOrderPage}),[setFetchData,orders,ordersInProgress,setOrderPage,setPageInProgressOrder,maxOrderInProgPage,maxOrderPage]);

    return <OrderContext.Provider value={value} {...props}/>
}

function useOrders(){
    const context = React.useContext(OrderContext);
    if (context === undefined) {
        throw new Error(`useOrders must be used within a OrderContext`);
    }
    return context;
}

export {useOrders,OrderProvider}


