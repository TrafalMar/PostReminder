import { actionTypes } from './actionTypes'
import API from '../../utils/API'

export const addPost = (userId) => ({
    type: actionTypes.ADD_POST,
    userId,
    time: new Date().getTime(),
})

export const deletePost = (key) => {
    return dispatch => {
        API.delete(`/posts/${key}.json`)
            .then(res => {
                dispatch({
                    type: actionTypes.DELETE_POST,
                    key
                })
            }).catch(err => {
                console.log(err);
            })
    }
}

const onSave = (postKey) => (
    {
        type: actionTypes.SAVE_POST,
        key: postKey
    }
)

export const savePost = (post, key, token) => {
    return dispatch => {
        API.put(`/posts/${key}.json?auth=` + token, {
            ...post,
            items: post.items,
            editMode: false
        }
        ).then(res => {
            dispatch(onSave(key))
        }).catch(err => {
            console.log(err);
        })
    }
}

export const toggleEditMode = (post, key, token) => {
    if (post.editMode) {
        return savePost(post, key, token)
    }
    else {
        return {
            type: actionTypes.TOGGLE_EDIT_MODE,
            key
        }
    }
}

export const addField = (key, fieldType) => ({
    type: actionTypes.ADD_FIELD,
    key,
    fieldType
})

export const deleteField = (postId, itemId) => ({
    type: actionTypes.DELETE_FIELD,
    postId,
    itemId
})

export const changeField = (postId, itemId, event) => ({
    type: actionTypes.CHANGE_FIELD,
    postId,
    itemId,
    value: event.target.value
})

const setPosts = (posts) => {
    return {
        type: actionTypes.INIT_POSTS,
        posts
    }
}

const getQueryParams = (token, userId = null) => {
    const authPart = `?auth=` + token
    const getUserPart = `&orderBy="userId"&equalTo="` + userId + `"`;
    const getPublicPostsPart = `&orderBy="settings/private"&equalTo=false`
    return userId ? authPart + getUserPart : authPart + getPublicPostsPart
}

const interpretDataFromFirebase = (res) => {
    let filteredPosts = {}
    // Firebase for whatever reason sends an object if there are 4 or less
    // elements in it, otherwise it sends an array :D
    if (Array.isArray(res.data)) {
        res.data.map((post, index) => {
            return post ? filteredPosts[index] = post : null
        })
    } else {
        return res.data
    }
}

export const initPosts = (token, userId) => {
    return dispatch => {
        let queryParams = getQueryParams(token, userId)
        API.get('/posts.json' + queryParams).then((res) => {
            const posts = interpretDataFromFirebase(res)
            dispatch(setPosts(posts))
        }).catch((err) => {
            console.log(err);
        })
    }
}

export const openSettings = (postId) => (
    { type: actionTypes.OPEN_SETTINGS, postId }
)

export const savePostAndCloseSettings = (post, key, token) => {
    API.put(`/posts/${key}.json?auth=` + token, {
        ...post
    })
    return { type: actionTypes.CLOSE_SETTINGS }
}

export const closeSettings = () => ({ type: actionTypes.CLOSE_SETTINGS })

export const togglePostPrivacy = () => {
    return { type: actionTypes.TOGGLE_POST_PRIVACY }
}