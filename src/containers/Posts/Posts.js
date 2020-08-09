import React, { Component } from 'react'
import { connect } from 'react-redux'
import classes from './Posts.module.css'
import Aux from './../../hoc/_Aux/_Aux'

import Post from './Post/Post'
import PostsControls from './Controls/PostsControls/PostsControls'

import * as action from './../../redux/actions/index'
import { Redirect } from 'react-router-dom'

class Posts extends Component {

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.initPosts(this.props.token, this.props.userId)
        }
    }

    componentDidUpdate(){
        console.log("[Posts]");
      }

    render() {

        let authRedirect = null
        if (!this.props.isAuthenticated) {
            authRedirect = <Redirect to='/auth' />
        }

        

        return (
            <Aux>
                {authRedirect}
                {this.props.isAuthenticated ? <PostsControls addPost={() => this.props.addPost(this.props.userId)} /> : null}
                <div className={classes.Posts}>
                    {this.props.isAuthenticated ?
                        Object.keys(this.props.posts).sort().reverse().map(key => {
                            return <Post
                                key={key}
                                postId={key}
                                userId={this.props.posts[key].userId}
                                items={this.props.posts[key].items}
                                editMode={this.props.posts[key].editMode}
                                editToggler={() => this.props.toggleEditMode(this.props.posts[key], key, this.props.token)}
                                savePost={() => this.props.savePost(this.props.posts[key], key, this.props.token)}
                                addFieldHandler={this.props.addField}
                                deleteField={this.props.deleteField}
                                changeField={this.props.changeField}
                                deletePost={() => this.props.deletePost(key)}
                                settingsImplemented = {this.props.posts[key].settings}
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
    isAuthenticated: state.auth.idToken !== null,
})

const mapDispatchToProps = (dispatch) => ({
    addPost: (userId) => dispatch(action.addPost(userId)),
    toggleEditMode: (editMode, key, token) => dispatch(action.toggleEditMode(editMode, key, token)),
    savePost: (post, key, token) => dispatch(action.savePost(post, key, token)),
    addField: (id, fieldType) => dispatch(action.addField(id, fieldType)),
    deleteField: (postId, itemId) => dispatch(action.deleteField(postId, itemId)),
    changeField: (postId, itemId, input) => dispatch(action.changeField(postId, itemId, input)),
    deletePost: (postId) => dispatch(action.deletePost(postId)),
    initPosts: (token, userId) => dispatch(action.initPosts(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)