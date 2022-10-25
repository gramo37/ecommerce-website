const {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REQUIRE_LOGIN,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    REQUIRE_SIGNIN,
    CLEAR_ERRORS,
    REQUIRE_LOGOUT,
    LOGOUT_SUCCESS,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    REQUIRE_LOAD_USER,
    REQUIRE_UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    REQUIRE_UPDATE_PASSWORD,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    REQUIRE_FORGOT_PASSWORD,
    MAIL_SENT_SUCCESS,
    MAIL_SENT_FAIL,
    REQUIRE_RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    LOGOUT_FAIL
} = require("../constants/userConstants")


export const userReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case REQUIRE_SIGNIN:
        case REQUIRE_LOGIN:
        case REQUIRE_LOAD_USER:
            return {
                loading: true,
                isAuthenticated: false
            }
        case SIGNIN_SUCCESS:
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case SIGNIN_FAIL:
        case LOGIN_FAIL:
        case LOAD_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
                isAuthenticated: false,
                user: null
            };

        case REQUIRE_LOGOUT:
            return {
                loading: true
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,         // Experiment with message
                user: null
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case REQUIRE_UPDATE_PROFILE:
        case REQUIRE_UPDATE_PASSWORD:
            return {
                ...state,
                loading: true
            }
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                isAuthenticated: true
            }
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
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

export const forgotPasswordReducer = (state = { message: [] }, action) => {
    switch (action.type) {
        case REQUIRE_FORGOT_PASSWORD:
            return {
                loading: true
            }
        case MAIL_SENT_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }
        case MAIL_SENT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default: 
            return state
    }
}

export const resetPasswordReducer = (state = {message: []}, action) => {
    switch(action.type) {
        case REQUIRE_RESET_PASSWORD:
            return {
                loading: true
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }
        case RESET_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}