import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = 'Rs';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [customerData, setCustomerData] = useState(false);

    const getProductsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/seller/list');
            if (data.success) {
                setProducts(data.products); // assuming backend returns products
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const loadCustomerProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/customer/get-profile', {
                headers: { token }
            });
            if (data.success) {
                setCustomerData(data.customerData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const value = {
        products,
        getProductsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        customerData,
        setCustomerData,
        loadCustomerProfileData
    };

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (token) {
            loadCustomerProfileData();
        } else {
            setCustomerData(false);
        }
    }, [token]);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
