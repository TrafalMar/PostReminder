import React from 'react';
import classes from './PostSettings.module.css';
import Switch from '../../customElements/Switch/Switch';
import Button from '../../customElements/Button/Button'
import Aux from '../../../hoc/_Aux/_Aux'
import { connect } from 'react-redux'
import * as action from '../../../redux/actions/index'



const PostSettings = (props) => (
    props.showSettings ? <Aux>
        <div className={classes.PostSettings}>
            <div className={classes.Field}>
                <label>Private</label>
                <span className={classes.Switch}><Switch checked={props.focusedPost.settings.private} toggler={props.togglePostPrivacy} /></span>
            </div>
            <Button color="green" onClick={() => {props.savePostAndCloseSettings(props.focusedPost, props.focusedPostId, props.token);props.closeBackdrop()}}>Save and close</Button>
        </div>
    </Aux> : null
)

const mapStateToProps = state => ({
    showSettings: state.posts.showSettings,
    focusedPost: state.posts.focusedPost,
    focusedPostId: state.posts.focusedPostId,
    token: state.auth.idToken
})

const mapDispatchToProps = dispatch => ({
    togglePostPrivacy: () => dispatch(action.togglePostPrivacy()),
    savePostAndCloseSettings: (post, id, token) => dispatch(action.savePostAndCloseSettings(post, id, token)),
    closeBackdrop: () => dispatch(action.closeBackdrop())
})

export default connect(mapStateToProps, mapDispatchToProps)(PostSettings)