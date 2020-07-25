import { actionTypes } from './actionTypes'
import API from './../../utils/API'

export const addPost = () => ({
    type: actionTypes.addPost
})

export const deletePost = (key) => {
    console.log("deleting");
    return dispatch => {
        API.delete(`/posts/${key}.json`)
            .then(res => {
                dispatch({
                    type: "DELETE_POST",
                    key
                })
            }).catch(err => {
                console.log(err);
            })
    }
}

const savePosts = (post, key) => {
    return dispatch => {
        API.put(`/posts/${key}.json`, {
            ...post,
            items: post.items,
            editMode: false
        }
        ).then(res => {
            dispatch({
                type: actionTypes.saveChanges,
                key
            })
        }).catch(err => {
            console.log(err);
        })
    }
}

export const toggleEditMode = (post, key) => {
    if (post.editMode) {
        return savePosts(post, key)
    }
    else {
        return {
            type: actionTypes.toggleEditMode,
            key
        }
    }
}

export const addField = (key, fieldType) => ({
    type: actionTypes.addField,
    key,
    fieldType
})

export const deleteField = (postId, itemId) => ({
    type: actionTypes.deleteField,
    postId,
    itemId
})

export const changeField = (postId, itemId, event) => ({
    type: actionTypes.changeField,
    postId,
    itemId,
    event
})

export const saveChanges = (post, key) => {
    return savePosts(post, key)
}

const setPosts = (posts) => {
    return {
        type: actionTypes.initPosts,
        posts
    }
}

export const initPosts = () => {
    return dispatch => {
        API.get('/posts.json').then((res) => {
            dispatch(setPosts(res.data))
        }).catch((err) => {
            console.log(err);
        })
    }
}
