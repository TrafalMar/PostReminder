import React, { Component } from 'react'
import Post from './Post/Post'
import classes from './Posts.module.css'
import { connect } from 'react-redux'
import {addPost, toggleEditMode, saveChanges, addField, deleteField, changeField, initPosts} from '../../redux/actions/counter'

class Posts extends Component {

    componentDidMount(){
        this.props.initPosts()
    }

    render() {
        return (
            <div className={classes.Posts}>
                {
                Object.keys(this.props.posts).map((key) => {
                    console.log(this.props.posts[key]);
                    return <Post
                        key={key}
                        postId={key}
                        items={this.props.posts[key].items}
                        editMode={this.props.posts[key].editMode}
                        editToggler={() => this.props.toggleEditMode(this.props.posts[key], key)}
                        addFieldHandler={this.props.addField}
                        deleteField={this.props.deleteField}
                        changeField={this.props.changeField}
                        saveChanges={()=>this.props.saveChanges(this.props.posts[key], key)}
                    />
                })}
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    posts:[...state.posts]
})

const mapDispatchToProps = (dispatch)=>({
    addPost: ()=>dispatch(addPost()),
    toggleEditMode: (post, key)=>dispatch(toggleEditMode(post, key)),
    saveChanges: (post, key)=>dispatch(saveChanges(post, key)),
    addField: (id, fieldType)=>dispatch(addField(id, fieldType)),
    deleteField: (postId, itemId)=>dispatch(deleteField(postId, itemId)),
    changeField: (postId, itemId, input) =>dispatch(changeField(postId, itemId, input)),
    initPosts: ()=>dispatch(initPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)