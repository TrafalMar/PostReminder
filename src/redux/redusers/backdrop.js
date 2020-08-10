import { actionTypes } from './../actions/actionTypes'

const initialState = {
    showBackdrop: false,
}

const backdrop = (state = initialState, action) => {

    const openBackdrop = () => (
        { ...state, showBackdrop: true }
    )

    const closeBackdrop = () => (
        {
            ...state,
            showBackdrop: false,
        }
    )
  


    switch (action.type) {
        case actionTypes.OPEN_BACKDROP: return openBackdrop()
        case actionTypes.CLOSE_BACKDROP: return closeBackdrop()
        default: return state
    }

}

export default backdrop