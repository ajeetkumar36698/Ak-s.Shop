import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import axios from "axios";



export const ShopContext = createContext();



const ShopContextProvider = (props) => {
    const currency = "₹";
    const devlivery_fee = 40;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate();




    const addTocart = async (itemId, size) => {
        try {
            // Ensure size is passed correctly (not array)
            if (Array.isArray(size)) {
                size = size[0];  // pick first size for safety
            }

            const newCart = { ...cartItems };

            if (!newCart[itemId]) {
                newCart[itemId] = {};
            }

            if (!newCart[itemId][size]) {
                newCart[itemId][size] = 1;
            } else {
                newCart[itemId][size] += 1;
            }

            setCartItems(newCart); // ✅ update local state

            // send to backend
            if (token) {
                await axios.post(backendUrl + "/api/cart/add", { itemId, size }, {
                    headers: { token }
                });
            }

        } catch (error) {
            console.error("Add to cart error:", error.message);
            toast.error("Something went wrong while adding to cart");
        }
    };
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }

                } catch (error) {

                }
            }
        }
        return totalCount

    }
    const updateQuantity = async (intemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[intemId][size] = quantity;
        setCartItems(cartData)
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { intemId, size, quantity }, { headers: { token } })


            } catch (error) {
                console.log(error)
                toast.error(error.message)

            }

        }

    }
    const getCartAmount = () => {
        let totalAmount = 0
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]

                    }

                } catch (error) {

                }

            }
            return totalAmount

        }

    }
    const getProductData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')

            // console.log(response.data)
            if (response.data.success) {
                // console.log(response.data.product)
                setProducts(response.data.product)

            }
            else {
                toast.error(response.data.message)

            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }

    }
    const getUserCart = async (token) => {

        try {
            const response = await axios.post(backendUrl + '/api/cart/get', { }, { headers: { token } })
            // console.log(response.data)
            if (response.data.success) {
                setCartItems(response.data.cartData)

            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }

    }
    useEffect(() => {
        getProductData()

    }, [])
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }

    }, [])





    const value = {
        products, currency, devlivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems,setCartItems, addTocart,
        getCartCount, updateQuantity, getCartAmount,
        navigate, backendUrl, setToken, token




    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider


