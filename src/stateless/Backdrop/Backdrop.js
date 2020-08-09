import React from 'react'
import classes from './Backdrop.module.css'
import {connect} from 'react-redux'

const Backdrop = (props)=>(
    props.showBackdrop ? <div className={classes.Backdrop} onClick={props.closeBackdrop}></div> : null
)

const mapStateToProps = state => ({
    showBackdrop: state.backdrop.showBackdrop,
  })

export default connect(mapStateToProps)(Backdrop)