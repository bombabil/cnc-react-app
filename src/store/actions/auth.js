import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    CHANGE_AUTH_EMAIL,
    CHANGE_AUTH_PASSWORD,
    START_ASYNC_AUTH,
} from '../constants/actionTypes'
import {api_url} from '../../config/config'


export const requestLogin = () => {
    return async (dispatch, getState) => {
        dispatch({type: START_ASYNC_AUTH})
        const { email, password } = getState().auth
        const body = JSON.stringify({email, password})
        const resp = await fetch(api_url + '/local/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body
        }).catch(e => {
            console.error("LOGIN FAILURE")
            console.error(e)
            return dispatch(loginError(e.message))
        })

        console.log(resp)
        const data = await resp.json()
        console.log(data)

        if(!resp.ok) {
            console.error("LOGIN FAILURE")
            return dispatch(loginError(data.message))

        }

        dispatch(receiveLogin(data))

    }
}

export const requestRegister = () => {
    return async (dispatch, getState) => {
        dispatch({type: START_ASYNC_AUTH})
        const { email, password } = getState().auth
        const body = JSON.stringify({email, password})

        const resp = await fetch(api_url + '/local/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body
        }).catch(e => {
            console.error("LOGIN FAILURE")
            console.error(e)
            return dispatch(loginError(e.message))
        })

        console.log(resp)
        const data = await resp.json()
        console.log(data)

        if(!resp.ok) {
            console.error("LOGIN FAILURE")
            return dispatch(loginError(data.message))
        }

        console.log(resp)
        dispatch(receiveLogin(resp))

    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        token: user.token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export const changeAuthEmail = (email) => ({
    type: CHANGE_AUTH_EMAIL,
    email
})

export const changeAuthPassword = (password) => ({
    type: CHANGE_AUTH_PASSWORD,
    password
})