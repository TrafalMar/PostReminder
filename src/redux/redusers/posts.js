import { actionTypes } from '../actions/actionTypes'
import { List } from '@material-ui/core';

const initialState = {
    posts: {},
    showSettings: false,
    focusedPostId: null
}

const reduser = (state = initialState, action) => {

    let newPosts = { ...state.posts };

    const addPost = (userId) => {

        const newPost = ({
            items: [],
            settings: {
                private: true
            },
            editMode: false,
            userId: userId,
            date: action.time,
        })

        return { ...state, posts: { ...newPosts, [action.time + userId]: newPost } }
    }

    const toggleEditMode = (postId) => {

        newPosts[postId].editMode = !newPosts[postId].editMode

        return { ...state, posts: { ...newPosts } }

    }

    const disableEditMode = (postId) => {

        newPosts[postId].editMode = false;

        return { ...state, posts: { ...newPosts } };
    }

    const addField = (postId, fieldType) => {

        if (fieldType === 'backdropClick') return { posts: newPosts }

        const getNewFieldByType = (elementType) => {
            switch (elementType) {
                case 'Title':
                    return { type: 'Title', context: '', id: Date.now() }
                case 'Paragraph':
                    return { type: 'Paragraph', context: '', id: Date.now() }
                case 'Image':
                    return { type: 'Image', context: '', id: Date.now() }
                default:
                    break;
            }
        };


        const newItem = getNewFieldByType(fieldType)

        // Check if new post has items if no then create new array of items
        if (newPosts[postId].items === undefined || newPosts[postId].items === null) {
            newPosts[postId] = {
                ...newPosts[postId],
                items: []
            }
        }

        // Post here
        newPosts[postId].items.push(newItem)

        return { ...state, posts: { ...newPosts } }
    }

    const deleteField = (postId, itemId) => {

        // delete here
        newPosts[postId].items = Object.keys(newPosts[postId].items).filter(key => key !== itemId).map(key => (newPosts[postId].items[key]))

        return { ...state, posts: { ...newPosts } }
    }

    const changeField = (postId, itemId) => {

        let itemIndex = Object.keys(newPosts[postId].items).indexOf(itemId)

        newPosts[postId].items[itemIndex].context = action.value

        return { ...state, posts: { ...newPosts } }
    }

    const deletePost = (postId) => {
        const filteredKeys = Object.keys(newPosts).filter(key => key !== postId)
        const updatedPosts = Object.assign({}, ...Array.from(filteredKeys, (key) => ({ [key]: newPosts[key] })))
        return { ...state, posts: { ...updatedPosts } }
    }

    const initPosts = () => {
        return { ...state, posts: action.posts }
    }

    const openSettings = (action) => (
        {
            ...state,
            showSettings: true,
            focusedPostId: action.postId,
            focusedPost: newPosts[action.postId]
        }
    )

    const closeSettings = () => (
        { ...state, showSettings: false }
    )

    const togglePostPrivacy = () => {
        newPosts[state.focusedPostId].settings.private = !newPosts[state.focusedPostId].settings.private
        return { ...state, posts: { ...newPosts } }
    }

    const dragHappened = (action) => {

        const { droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId } = action.payload

        // In the same list
        if (droppableIdStart === droppableIdEnd) {
            const item = newPosts[droppableIdStart].items.splice(droppableIndexStart, 1)
            newPosts[droppableIdStart].items.splice(droppableIndexEnd, 0, ...item)
        }
        return { ...state, posts: { ...newPosts } }
    }

    switch (action.type) {
        case actionTypes.ADD_POST:
            return addPost(action.userId)
        case actionTypes.TOGGLE_EDIT_MODE:
            return toggleEditMode(action.key)
        case actionTypes.SAVE_POST:
            return disableEditMode(action.key)
        case actionTypes.ADD_FIELD:
            return addField(action.key, action.fieldType)
        case actionTypes.DELETE_FIELD:
            return deleteField(action.postId, action.itemId)
        case actionTypes.CHANGE_FIELD:
            return changeField(action.postId, action.itemId)
        case actionTypes.DELETE_POST:
            return deletePost(action.key)
        case actionTypes.TOGGLE_POST_PRIVACY:
            return togglePostPrivacy(action.postId)
        case actionTypes.INIT_POSTS:
            return initPosts()
        case actionTypes.OPEN_SETTINGS:
            return openSettings(action)
        case actionTypes.CLOSE_SETTINGS:
            return closeSettings()
        case actionTypes.TOGGLE_POST_PRIVACY:
            return togglePostPrivacy(action.post)
        case actionTypes.DRAG_HAPPENED:
            return dragHappened(action)
        default:
            return state;
    }
}

export default reduser