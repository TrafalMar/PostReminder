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

    const toggleEditMode = () => {

        index = Object.keys(state.posts).indexOf(action.key)

        posts[index].editMode = !posts[index].editMode

        return { posts: posts }

    }

    const saveChanges = () => {

        index = Object.keys(state.posts).indexOf(action.key)
        console.log(index);
        console.log(posts);
        posts[index].editMode = false;

        return { posts: posts };
    }

    const addField = () => {

        if (action.fieldType === 'backdropClick') return { posts: posts }

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


        const newItem = getNewFieldByType(action.fieldType)

        index = Object.keys(state.posts).indexOf(action.key)

        // Check if new post has items
        if(posts[index].items === undefined || posts[index].items === null){
            posts[index] = {
                ...posts[index],
                items:[]
            }
        }

        // Post here
        posts[index].items.push(newItem)

        return { posts: posts }
    }

    const deleteField = (postKey, itemKey) => {

        index = Object.keys(state.posts).indexOf(postKey)

        // delete here
        posts[index].items = Object.keys(posts[index].items).filter(key => key !== itemKey).map(key => (posts[index].items[key]))

        return { posts: posts }
    }

    const changeField = (postKey, itemKey) => {

        index = Object.keys(state.posts).indexOf(postKey)

        itemIndex = Object.keys(posts[index].items).indexOf(itemKey)

        action.event.persist()

        posts[index].items[itemIndex].context = action.event.target.value

        return { posts: posts }
    }

    const initPosts = () => {
        return { posts: action.posts }
    }

    switch (action.type) {
        case actionTypes.addPost:
            return addPost(action.id)
        case actionTypes.toggleEditMode:
            return toggleEditMode(action.id)
        case actionTypes.saveChanges:
            return saveChanges(action.id)
        case actionTypes.addField:
            return addField(action.id, action.fieldType)
        case actionTypes.deleteField:
            return deleteField(action.postId, action.itemId)
        case actionTypes.changeField:
            return changeField(action.postId, action.itemId)
        case actionTypes.initPosts:
            return initPosts()

        default:
            return state;
    }
}

export default reduser