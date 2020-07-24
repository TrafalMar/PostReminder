
import { FaPencilAlt, FaSave, FaPlus } from 'react-icons/fa'
import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import classes from './Controls.module.css'

class Controls extends Component {

    state = {
        anchorEl: null
    }

    handleClickOnPlus = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    };

    handleCloseMenu = (postId, elementType) => {
        this.props.addFieldHandler(postId, elementType)
        this.setState({ anchorEl: null })
    }

    render() {

        return (
            <div className={classes.ToolBar}>

                <Button className={classes.Ok} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClickOnPlus} >
                    <FaPlus />
                </Button>

                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleCloseMenu}
                >
                    <MenuItem onClick={() => { this.handleCloseMenu(this.props.postId, 'Title') }}>Title</MenuItem>
                    <MenuItem onClick={() => { this.handleCloseMenu(this.props.postId, 'Paragraph') }}>Paragraph</MenuItem>
                    <MenuItem onClick={() => { this.handleCloseMenu(this.props.postId, 'Image') }}>Image</MenuItem>
                </Menu>

                <button className={!this.props.editMode ? classes.Button : classes.Ok} onClick={this.props.editToggler} >{this.props.editMode ? <FaSave /> : <FaPencilAlt />}</button>
            </div>
        )
    }
}

export default Controls