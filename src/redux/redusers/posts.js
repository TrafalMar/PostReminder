import { actionTypes } from '../actions/actionTypes'

const initialState = {
    posts: {}
}

const reduser = (state = initialState, action) => {

    let { posts } = state;
    let itemIndex = null;

    const addPost = () => {

        let newPost = ({
            items: [],
            editMode: false
        })

        let lastKey = parseInt(Object.keys(posts)[Object.keys(posts).length-1])
        return { posts: {...posts, [lastKey+1]:newPost} }
    }

    const toggleEditMode = (postId) => {

        posts[postId].editMode = !posts[postId].editMode

        return { posts: {...posts} }

    }

    const saveChanges = (postId) => {

        posts[postId].editMode = false;

        return { posts: {...posts} };
    }

    const addField = (postId, fieldType) => {

        if (fieldType === 'backdropClick') return { posts: posts }

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
        if (posts[postId].items === undefined || posts[postId].items === null) {
            posts[postId] = {
                ...posts[postId],
                items: []
            }
        }

        // Post here
        posts[postId].items.push(newItem)

        return { posts: {...posts} }
    }

    const deleteField = (postId, itemId) => {

        // delete here
        posts[postId].items = Object.keys(posts[postId].items).filter(key => key !== itemId).map(key => (posts[postId].items[key]))

        return { posts: {...posts} }
    }

    const changeField = (postId, itemId) => {

        itemIndex = Object.keys(posts[postId].items).indexOf(itemId)

        posts[postId].items[itemIndex].context = action.value

        return { posts: {...posts} }
    }

    const deletePost = (postId) => {

        posts = Object.keys(posts).filter(key => key !== postId).map(key => posts[key])

        return { posts: posts }
    }

    const initPosts = () => {
        return { posts: action.posts }
    }

    switch (action.type) {
        case actionTypes.addPost:
            return addPost()
        case actionTypes.toggleEditMode:
            return toggleEditMode(action.key)
        case actionTypes.saveChanges:
            return saveChanges(action.key)
        case actionTypes.addField:
            return addField(action.key, action.fieldType)
        case actionTypes.deleteField:
            return deleteField(action.postId, action.itemId)
        case actionTypes.changeField:
            return changeField(action.postId, action.itemId)
        case actionTypes.deletePost:
            return deletePost(action.key)
        case actionTypes.initPosts:
            return initPosts()

        default:
            return state;
    }
}

export default reduser