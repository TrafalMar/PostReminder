import React from 'react';
import classes from './PostSettings.module.css';
import Switch from '../../customElements/Switch/Switch';
import {connect} from 'react-redux'

const PostSettings = (props) => (
    props.showSettings ? <div className={classes.PostSettings}>
        <div className={classes.Field}>
            <label>Private</label>
            <span className={classes.Switch}><Switch /></span>
        </div>
    </div> : null
)

const mapStateToProps = state =>({
    showSettings: state.backdrop.showSettings
})

export default connect(mapStateToProps)(PostSettings)