import { actionTypes } from './../actions/actionTypes'

const initialState = {
    posts: []
}

const reduser = (state = initialState, action) => {

    var { posts } = state;
    var index = null;
    var itemIndex = null;

    const addPost = (id) => {
        return state.posts.concat({
            items: [],
            id: id,
            editMode: false
        });
    }

    const toggleEditMode = (postId) => {

        index = Object.keys(state.posts).indexOf(postId)

        posts[index].editMode = !posts[index].editMode

        return { posts: posts }

    }

    const saveChanges = (postId) => {

        index = Object.keys(state.posts).indexOf(postId)
        posts[index].editMode = false;

        return { posts: posts };
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

        index = Object.keys(state.posts).indexOf(postId)

        // Check if new post has items
        if (posts[index].items === undefined || posts[index].items === null) {
            posts[index] = {
                ...posts[index],
                items: []
            }
        }

        // Post here
        posts[index].items.push(newItem)

        return { posts: posts }
    }

    const deleteField = (postId, itemId) => {

        index = Object.keys(state.posts).indexOf(postId)

        // delete here
        posts[index].items = Object.keys(posts[index].items).filter(key => key !== itemId).map(key => (posts[index].items[key]))

        return { posts: posts }
    }

    const changeField = (postId, itemId) => {

        index = Object.keys(state.posts).indexOf(postId)

        itemIndex = Object.keys(posts[index].items).indexOf(itemId)

        action.event.persist()

        posts[index].items[itemIndex].context = action.event.target.value

        return { posts: posts }
    }

    const deletePost = (postId)=>{

        posts = Object.keys(posts).filter(key => key !== postId).map(key => posts[key])

        console.log(posts);

        return {posts: posts}
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