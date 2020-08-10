import { actionTypes } from './actionTypes'

export const openBackdrop = () => (
    { type: actionTypes.OPEN_BACKDROP }
)

export const closeBackdrop = () => (
    { type: actionTypes.CLOSE_BACKDROP }
)
