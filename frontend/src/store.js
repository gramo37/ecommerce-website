import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer, categoryReducer, priceFilterReducer, categoryFilterReducer, ratingsFilterReducer, addToCartReducer } from './reducers/productReducer';
import { forgotPasswordReducer, resetPasswordReducer, userReducer } from './reducers/userReducer';
import { orderInfoReducer, orderReducer } from './reducers/orderReducer';
const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    category: categoryReducer,               // Reducer for getting categories from categories table in database
    price: priceFilterReducer,
    categoryFilter: categoryFilterReducer,   // Reducer for category filter
    ratings: ratingsFilterReducer,
    user: userReducer,
    orders: orderReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    cart: addToCartReducer,
    orderInfo: orderInfoReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : []
    },
    
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;