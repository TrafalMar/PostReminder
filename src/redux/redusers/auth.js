import { actionTypes } from './../actions/actionTypes'

const initialState = {
    localId: null,
    idToken: null,
    error: null,
    isLoading: false
}

const authLogout = (state, action) =>{
    return {
        ...state,
        idToken: null,
        localId: null
    }
}

const succesfulSingIn = (state, action) => {
    return {
        ...state,
        localId: action.localId,
        idToken: action.idToken,
        error: null
    }
}

const authError = (state, action) =>{
    return {
        ...state,
        error: action.error
    }
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.succesfulSingin: return succesfulSingIn(state, action)
        case actionTypes.authError: return authError(state, action)
        case actionTypes.authLogout: return authLogout(state, action)
        default: return state
    }
}

export default auth