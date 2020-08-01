import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './Posts.module.css'
import Aux from './../../hoc/_Aux/_Aux'

import Post from './Post/Post'
import PostsControls from './Controls/PostsControls/PostsControls'

import { addPost, toggleEditMode, saveChanges, addField, deleteField, changeField, initPosts, deletePost } from '../../redux/actions/actions'
import { Redirect } from 'react-router-dom'

class Posts extends Component {

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.initPosts(this.props.token)
        }
    }

    render() {

        let authRedirect = null
        if(!this.props.isAuthenticated){
            authRedirect = <Redirect to='/auth'/>
        }

        return (
            <Aux>
                
                {authRedirect}
                {this.props.isAuthenticated ? <PostsControls addPost={this.props.addPost} /> : null}
                <div className={classes.Posts}>
                    { this.props.isAuthenticated ? 
                        Object.keys(this.props.posts).reverse().map(key => {
                            return <Post
                                key={key}
                                postId={key}
                                items={this.props.posts[key].items}
                                editMode={this.props.posts[key].editMode}
                                editToggler={() => this.props.toggleEditMode(this.props.posts[key], key, this.props.token)}
                                addFieldHandler={this.props.addField}
                                deleteField={this.props.deleteField}
                                changeField={this.props.changeField}
                                deletePost={() => this.props.deletePost(key)}
                                saveChanges={() => this.props.saveChanges(this.props.posts[key], key, this.props.token)}
                            />
                        }) : null}
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts.posts,
    token: state.auth.idToken,
    isAuthenticated: state.auth.idToken !== null
})

const mapDispatchToProps = (dispatch) => ({
    addPost: () => dispatch(addPost()),
    toggleEditMode: (post, key, token) => dispatch(toggleEditMode(post, key, token)),
    saveChanges: (post, key, token) => dispatch(saveChanges(post, key, token)),
    addField: (id, fieldType) => dispatch(addField(id, fieldType)),
    deleteField: (postId, itemId) => dispatch(deleteField(postId, itemId)),
    changeField: (postId, itemId, input) => dispatch(changeField(postId, itemId, input)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    initPosts: (token) => dispatch(initPosts(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)