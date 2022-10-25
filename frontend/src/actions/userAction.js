import axios from "axios";
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REQUIRE_LOGIN,
    REQUIRE_SIGNIN,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    REQUIRE_LOGOUT,
    LOGOUT_FAIL,
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
    CLEAR_ERRORS
} from "../constants/userConstants";

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookie(cname) {
    let cvalue = null
    const d = new Date();
    d.setTime(d.getTime() - (10 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: REQUIRE_LOGIN
        })

        const link = `/api/v2/logIn`
        const userDetails = {
            email: email,
            password: password
        }
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(link, userDetails, config)

        // Store the data into cookies
        setCookie("token", data.token, 1)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data
        })

    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: REQUIRE_LOAD_USER
        })

        const link = '/api/v2/getUserDetails'
        const { data } = await axios.get(link)

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: REQUIRE_LOGOUT
        })

        await axios.post(`/api/v2/logout`)

        // Delete the token from cookie
        deleteCookie("token")

        dispatch({
            type: LOGOUT_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data
        })
    }
}

export const signinUser = (name, email, password, avatar) => async (dispatch) => {
    try {
        dispatch({
            type: REQUIRE_SIGNIN
        })

        const link = `/api/v2/signUp`
        const userDetails = {
            name: name,
            email: email,
            password: password,
            avatar: avatar
        }

        const config = { headers: { "Content-Type": "multiport/form-data" } }
        const { data } = await axios.post(link, userDetails)

        // Store the data into cookies
        setCookie("token", data.token, 1)

        dispatch({
            type: SIGNIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log(avatar)
        console.log(error.response.data)
        dispatch({
            type: SIGNIN_FAIL,
            payload: error.response.data
        })

    }
}

export const updateUserProfile = (name, email, avatar) => async (dispatch) => {
    try {
        dispatch({
            type: REQUIRE_UPDATE_PROFILE
        })

        const link = `api/v2/updateProfile`

        let userDetails = {}


        userDetails = {
            name: name,
            email: email,
            avatar: avatar
        }

        const config = { headers: { "Content-Type": "multiport/form-data" } }
        const { data } = await axios.put(link, userDetails)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data
        })
    }

}

export const changePassword = (userPassword) => async (dispatch) => {
    try {
        dispatch({
            type: REQUIRE_UPDATE_PASSWORD
        })

        const link = `api/v2/updatePassword`

        const { data } = await axios.put(link, userPassword)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data
        })
    }
}

export const sendMail = (email) => async (dispatch) => {
    try {
        dispatch({
            type: REQUIRE_FORGOT_PASSWORD,
        })

        const link = `api/v2/password/reset/`
        const { data } = await axios.post(link, { email: email })

        dispatch({
            type: MAIL_SENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MAIL_SENT_FAIL,
            payload: error.response.data
        })
    }

}

export const resetPassword = (token, newPassword, confirmPassword) => async (dispatch) => {
    try {
        dispatch({
            type: REQUIRE_RESET_PASSWORD
        })

        const link = `${token}`

        const { data } = await axios.put(link, {
            password: newPassword,
            confirmPassword: confirmPassword
        })

        setCookie("token", data.token, 1)

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data
        })
    }
}

export const clearUserError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}