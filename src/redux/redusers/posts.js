import { actionTypes } from '../actions/actionTypes'

const initialState = {
    posts: {}
}

const reduser = (state = initialState, action) => {

    let newPosts = { ...state.posts };

    const addPost = (userId) => {

        const newPost = ({
            items: [],
            settings:{
                private: true
            },
            editMode: false,
            userId: userId,
            date: action.time,
        })

        return { posts: { ...newPosts, [action.time + userId]: newPost } }
    }

    const toggleEditMode = (postId) => {

        newPosts[postId].editMode = !newPosts[postId].editMode

        return { posts: { ...newPosts } }

    }

    const disableEditMode = (postId) => {

        newPosts[postId].editMode = false;

        return { posts: { ...newPosts } };
    }

    const addField = (postId, fieldType) => {

        if (fieldType === 'backdropClick') return { posts: newPosts }

        const getNewFieldByType = (elementType) => {
            switch (elementType) {
                case 'Title':
                    return { type: 'Title', context: 'New Title', id: Date.now() }
                case 'Paragraph':
                    return { type: 'Paragraph', context: 'New Paragrapth', id: Date.now() }
                case 'Image':
                    return { type: 'Image', context: '', id: Date.now() }
                default:
                    break;
            }
        };


        const newItem = getNewFieldByType(fieldType)

        // Check if new post has items
        if (newPosts[postId].items === undefined || newPosts[postId].items === null) {
            newPosts[postId] = {
                ...newPosts[postId],
                items: []
            }
        }

        // Post here
        newPosts[postId].items.push(newItem)

        return { posts: { ...newPosts } }
    }

    const deleteField = (postId, itemId) => {

        // delete here
        newPosts[postId].items = Object.keys(newPosts[postId].items).filter(key => key !== itemId).map(key => (newPosts[postId].items[key]))

        return { posts: { ...newPosts } }
    }

    const changeField = (postId, itemId) => {

        let itemIndex = Object.keys(newPosts[postId].items).indexOf(itemId)

        newPosts[postId].items[itemIndex].context = action.value

        return { posts: { ...newPosts } }
    }

    const deletePost = (postId) => {
        const filteredKeys = Object.keys(newPosts).filter(key => key !== postId)
        const updatedPosts = Object.assign({}, ...Array.from(filteredKeys, (key) => ({ [key]: newPosts[key] })))
        return { posts: {...updatedPosts} }
    }

    const togglePostPrivacy = (postId)=>{
        newPosts[postId].settings.private = !newPosts[postId].settings.private
        return {posts : {...newPosts}}
    }

    const initPosts = () => {
        return { posts: action.posts }
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
        default:
            return state;
    }
}

export default reduser