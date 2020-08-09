import { actionTypes } from './../actions/actionTypes'

const initialState = {
    showBackdrop: false,
    showSettings: false,
}

const backdrop = (state = initialState, action) => {

    const openBackdrop = () => (
        { ...state, showBackdrop: true }
    )

    const closeBackdrop = () => (
        {
            ...state,
            showBackdrop: false,
            showSettings: false
        }
    )
    
    const openSettings = () => (
        {
            ...state,
            showBackdrop: true,
            showSettings: true
        }
    )

    const closeSettings = () => (
        { ...state, showSettings: false }
    )


    switch (action.type) {
        case actionTypes.OPEN_BACKDROP: return openBackdrop()
        case actionTypes.OPEN_SETTINGS: return openSettings()
        case actionTypes.CLOSE_BACKDROP: return closeBackdrop()
        case actionTypes.CLOSE_SETTINGS: return closeSettings()
        default: return state
    }

}

export default backdrop