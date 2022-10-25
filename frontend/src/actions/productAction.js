// This file contains "what to do"


import axios from "axios";

const {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    ALL_PRODUCT_DETAIL_REQUEST,
    ALL_PRODUCT_DETAIL_SUCCESS,
    ALL_PRODUCT_DETAIL_FAIL,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    PRICE,
    PRICE_ERROR,
    CATEGORY,
    CATEGORY_ERROR,
    CLEAR_ERRORS,
    RATINGS,
    REMOVE_ITEM,
    EDIT_ITEM,
    RATINGS_ERROR
} = require("../constants/productConstants")


export const getProduct = (keyword = "", page, productPerPage, price, category, ratings) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        })
        console.log(category, typeof (category))

        let link = ""
        if (category === undefined || category === "") {
            link = `/api/v1/products?productsPerPage=${productPerPage}&keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        }
        else {
            link = `/api/v1/products?productsPerPage=${productPerPage}&keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&category=${category}`
        }
        const { data } = await axios.get(link)

        // const { data } = await fetch("/api/v1/products?productsPerPage=10")

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error,
            // payload: error.response.data.message,
        });
    }
};

export const getCategoryList = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_CATEGORY_REQUEST
        })

        const { data } = await axios.get(`/api/v1/categories`)

        dispatch({
            type: ALL_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_DETAIL_REQUEST
        })

        const { data } = await axios.get(`/api/v1/getProductById/${id}`)
        // const { data } = await fetch("/api/v1/products?productsPerPage=10")

        dispatch({
            type: ALL_PRODUCT_DETAIL_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getBestSellers = (collectionName, page, productPerPage, price, category, ratings) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        })
        console.log(collectionName, page, productPerPage, price, category)

        // const link = `api/v1/searchByCollection?collectionName="best seller"&category=${category}&price[lte]=${price[1]}&price[gte]=${price[0]}&page=${page}&productsPerPage=${productPerPage}`
        let link = ""
        if (category === undefined || category === "") {
            link = `/api/v1/products?collectionName=Best Sellers&productsPerPage=${productPerPage}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        }
        else {
            link = `/api/v1/products?collectionName=Best Sellers&productsPerPage=${productPerPage}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&category=${category}`
        }
        // if(category === undefined || category === ""){
        //     link = `api/v1/searchByCollection?collectionName=best seller&page=${page}&price[lte]=${price[1]}&price[gte]=${price[0]}&productsPerPage=${productPerPage}&rating=`
        // }
        // else{
        //     link = `api/v1/searchByCollection?collectionName=best seller&page=${page}&price[lte]=${price[1]}&price[gte]=${price[0]}&productsPerPage=${productPerPage}&category=${category}`
        // }
        const { data } = await axios.get(link)

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const getPriceFilter = (newPrice) => async (dispatch) => {
    try {
        dispatch({
            type: PRICE,
            payload: newPrice
        })
    } catch (error) {
        dispatch({
            type: PRICE_ERROR,
            payload: error
        })
    }
}

export const getCategoryFilter = (newCategory) => async (dispatch) => {
    try {
        dispatch({
            type: CATEGORY,
            payload: newCategory
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_ERROR,
            payload: error
        })
    }
}

export const getRatingFilter = (newRating) => async (dispatch) => {
    try {
        dispatch({
            type: RATINGS,
            payload: newRating
        })
    } catch (error) {
        dispatch({
            type: RATINGS_ERROR,
            payload: error
        })
    }
}

export const addToCart = (quantity, product) => async (dispatch, getState) => {

    try {
        console.log(quantity, product);
        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: {
                product: product._id,
                name: product.name,
                price: product.price,
                image: product?.images[0]?.url,
                quantity: quantity
            }
        });

        console.log(getState().cart.cartItems)

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))

        dispatch({
            type: EDIT_ITEM,
            payload: getState().cart.cartItems
        })

    } catch (error) {
        dispatch({
            type: ADD_TO_CART_FAIL,
            payload: error
        })
    }
}

// Remove Item from cart
export const removeItem = (id) => async (dispatch) => {
    try {
        let cartItems = JSON.parse(localStorage.getItem("cartItems"))


        // Delete the below mentioned item
        cartItems.map((i, index) => {
            if (i.product === id) {
                cartItems.splice(index, 1)
            }
        })

        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        // setforceUpdate((i) => !i)

        dispatch({
            type: REMOVE_ITEM,
            payload: cartItems
        })

    } catch (error) {
        dispatch({
            type: "REMOVE_ITEM_ERROR",
            payload: error
        })
    }
}

export const editQuantity = (qty, id) => async (dispatch) => {
    try {
        let cartItems = JSON.parse(localStorage.getItem("cartItems"))
        cartItems.map((i) => {
            if (i.product === id) {
                i.quantity = qty
            }
        })

        localStorage.setItem("cartItems", JSON.stringify(cartItems))

        dispatch({
            type: EDIT_ITEM,
            payload: cartItems
        })

    } catch (error) {
        dispatch({
            type: "EDIT_ITEM_ERROR",
            payload: error
        })
    }
}

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: "SAVE_SHIPPING_INFO",
        payload: data,
    })

    localStorage.setItem("shippingInfo", JSON.stringify(data))
}

export const clearProductError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}