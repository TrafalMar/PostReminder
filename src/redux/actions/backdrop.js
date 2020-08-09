import { actionTypes } from './actionTypes'

export const openBackdrop = () => (
    { type: actionTypes.OPEN_BACKDROP }
)

export const openSettings = () => (
    { type: actionTypes.OPEN_SETTINGS }
)

export const closeBackdrop = () => (
    { type: actionTypes.CLOSE_BACKDROP }
)

export const closeSettings = () => (
    { type: actionTypes.CLOSE_SETTINGS }
)