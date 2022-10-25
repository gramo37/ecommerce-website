// This file includes "How to do"

const {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_DETAIL_REQUEST,
    ALL_PRODUCT_DETAIL_SUCCESS,
    ALL_PRODUCT_DETAIL_FAIL,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    PRICE,
    CATEGORY,
    RATINGS,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    REMOVE_ITEM,
    EDIT_ITEM,
    CLEAR_ERRORS
} = require("../constants/productConstants")


export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                filteredProductCount: action.payload.products.length,
                productsCount: action.payload.productsCount
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_DETAIL_REQUEST:
            return {
                loading: true,
                ...state
            };
        case ALL_PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };
        case ALL_PRODUCT_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const categoryReducer = (state = { category: "Food" }, action) => {
    switch (action.type) {
        case ALL_CATEGORY_REQUEST:
            return {
                loading: true,
                ...state
            };
        case ALL_CATEGORY_SUCCESS:
            return {
                loading: false,
                category: action.payload
            };
        case ALL_CATEGORY_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const priceFilterReducer = (state = { price: [0, 25000] }, action) => {
    switch (action.type) {
        case PRICE:
            return {
                price: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const categoryFilterReducer = (state = { category: "" }, action) => {
    switch (action.type) {
        case CATEGORY:
            return {
                category: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const ratingsFilterReducer = (state = { ratings: 0 }, action) => {
    switch (action.type) {
        case RATINGS:
            return {
                ratings: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const addToCartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case "SAVE_SHIPPING_INFO":
            return {
                ...state,
                shippinInfo: action.payload
            }
        case EDIT_ITEM:
            return {
                ...state,
                cartItems: action.payload
            }
        case REMOVE_ITEM:
            return {
                ...state,
                cartItems: action.payload
            }
        case ADD_TO_CART_SUCCESS:
            // Item Added to cart
            const item = action.payload;
            console.log(item);

            // Find if the item already exists in state.cartItems
            // find method finds the first occurance of any item in the array
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            )

            // Old item is added
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    ),
                };
            }

            // New Item is added to the cart
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }


        case ADD_TO_CART_FAIL:
            return {
                error: action.payload
            }
        default:
            return state
    }
}