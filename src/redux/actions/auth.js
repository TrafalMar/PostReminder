import axios from 'axios'
import { actionTypes } from './actionTypes'

export const logout = () => {
    localStorage.removeItem('idToken')
    localStorage.removeItem('localId')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.authLogout,
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const checkAuthOnReload = () => {

    return dispatch => {
        const idToken = localStorage.getItem('idToken')
        const localId = localStorage.getItem('localId')
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if (!idToken) {
            dispatch(logout())
        } else {
            if (expirationDate < new Date()) {
                dispatch(logout())
            } else {
                dispatch({
                    type: actionTypes.succesfulSingin,
                    idToken: idToken,
                    localId: localId
                })
                const expirationTime = (expirationDate.getTime() - new Date().getTime()) / 1000
                dispatch(checkAuthTimeout(expirationTime))
            }
        }
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        const key = 'AIzaSyAw7SE-rUpkB5kAf0bVba7uzjOFem6UtQs'
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = isSignUp ?
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}` :
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`

        axios.post(url, authData)
            .then(res => {
                dispatch({
                    type: actionTypes.succesfulSingin,
                    localId: res.data.localId,
                    idToken: res.data.idToken
                })
                dispatch(checkAuthTimeout(res.data.expiresIn))
                localStorage.setItem('idToken', res.data.idToken)
                localStorage.setItem('localId', res.data.localId)
                localStorage.setItem('expirationDate', new Date(new Date().getTime() + res.data.expiresIn*1000))
            })
            .catch(error => {
                console.log(error.response.data.error.message);
                dispatch({
                    type: actionTypes.authError,
                    errorMessage: error.response.data.error.message
                })
            })
    }
}