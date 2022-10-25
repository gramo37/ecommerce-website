const {
    REQUIRE_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    REQUIRE_ORDER_BY_ID,
    REQUIRE_ORDER_BY_ID_SUCCESS,
    REQUIRE_ORDER_BY_ID_FAIL
} = require("../constants/orderConstants")

export const orderReducer = (state = { orders: [], createdOrder: [] }, action) => {
    switch (action.type) {
        case REQUIRE_ORDER:
            return {
                loading: true
            }
        case GET_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case GET_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                createdOrder: action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const orderInfoReducer = (state = { orderInfo: {} }, action) => {
    switch (action.type) {
        case REQUIRE_ORDER_BY_ID:
            return {
                loading: true
            }
        case REQUIRE_ORDER_BY_ID_SUCCESS:
            return {
                loading: false,
                orderInfo: action.payload
            }
        case REQUIRE_ORDER_BY_ID_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}