import axios from 'axios'
import { actionTypes } from './actionTypes'

export const logout = ()=>{
    return{
        type: actionTypes.authLogout,
    }
}

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout())
        }, expirationTime*1000)
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
                    localId : res.data.localId,
                    idToken: res.data.idToken
                })
                dispatch(checkAuthTimeout(res.data.expiresIn))
                console.log(res);
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.authError,
                    error: error
                })
            })
    }
}