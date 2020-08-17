import React, { Component } from 'react'
import PostControls from './../Controls/PostControls/PostControls'
import Aux from '../../../hoc/_Aux/_Aux'
import * as action from './../../../redux/actions/index'
import PostItems from './PostItems/PostItems'

import classes from './Post.module.css'
import { connect } from 'react-redux'

class Post extends Component {

    render() {
        const content = <PostItems {...this.props}/>

        const onEnterClick = (event) => { if (event.keyCode !== 13) return; this.props.savePost() }
        const openSettingsWithBackdrop = (postId) =>{
            this.props.openBackdrop()
            this.props.openSettings(postId)
        }

        return (
            <Aux>
                <div onKeyUp={(event) => onEnterClick(event)}
                    className={!this.props.editMode ? classes.Post : [classes.Post, classes.Editing].join(' ')}>
                    {content}
                    {
                        this.props.isAuthenticated && this.props.userId === this.props.authenticatedUserId ?
                            <div className={classes.PostControls}>
                                <PostControls
                                    settingsImplemented={this.props.settingsImplemented}
                                    deletePost={this.props.deletePost}
                                    editMode={this.props.editMode}
                                    editToggler={this.props.editToggler}
                                    addFieldHandler={this.props.addFieldHandler}
                                    openSettings={()=>{openSettingsWithBackdrop(this.props.postId)}}
                                    postId={this.props.postId} /></div>
                            : null
                    }
                </div >
            </Aux>
        )
    }
}

const mapStateToProps = state => ({
    authenticatedUserId: state.auth.localId,
    isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
    openSettings: (postId) => dispatch(action.openSettings(postId)),
    openBackdrop: () => dispatch(action.openBackdrop()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)