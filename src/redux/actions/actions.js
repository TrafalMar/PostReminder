import { actionTypes } from './actionTypes'
import API from '../../utils/API'

export const addPost = () => ({
    type: actionTypes.addPost
})

export const deletePost = (key) => {
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

const savePosts = (post, key, token) => {
    return dispatch => {
        API.put(`/posts/${key}.json?auth=` + token, {
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

export const toggleEditMode = (post, key, token) => {
    if (post.editMode) {
        return savePosts(post, key, token)
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
    value: event.target.value
})

export const saveChanges = (post, key, token) => {
    return savePosts(post, key, token)
}

const setPosts = (posts) => {
    return {
        type: actionTypes.initPosts,
        posts
    }
}

export const initPosts = (token) => {

    return dispatch => {
        API.get('/posts.json?auth=' + token).then((res) => {

            let filteredPosts = {}
            if (Array.isArray(res.data)) {
                res.data.map((post, index) => {
                    if (post !== null) {
                        return filteredPosts[index] = post
                    }
                    else return null
                })
            }else{
                filteredPosts = res.data
            }

            dispatch(setPosts(filteredPosts))
        }).catch((err) => {
            console.log(err);
        })
    }
}
