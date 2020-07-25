
import { FaPencilAlt, FaSave, FaPlus, FaTrash } from 'react-icons/fa'
import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import classes from './Controls.module.css'
import Aux from '../../../hoc/_Aux/_Aux';

class Controls extends Component {

    state = {
        anchorEl: null,
        isDeleting: false
    }

    handleClickOnPlus = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleCloseMenu = (postId, elementType) => {
        this.props.addFieldHandler(postId, elementType)
        this.setState({ anchorEl: null })
    }

    deletingHandler = (param) => {
        this.setState((prevState) => ({ ...prevState, isDeleting: param }))
    }

    

    render() {

        return (
            <div className={!this.state.isDeleting ? classes.ToolBar : classes.Deleting}>
                {
                    this.state.isDeleting ?
                        <Aux >
                            <button className={classes.YES} onClick={this.props.deletePost} >YES</button>
                            <button className={classes.NO} onClick={()=>this.deletingHandler(false)} >NO</button>
                        </Aux>
                        : <Aux>
                            {
                                this.props.editMode ?
                                    <Aux>
                                        <button className={!this.props.editMode ? classes.Button : classes.Thresh} onClick={()=>this.deletingHandler(true)} ><FaTrash /></button>
                                        <Button className={classes.Ok} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClickOnPlus} >
                                            <FaPlus />
                                        </Button>
                                    </Aux>
                                    : null
                            }
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
                        </Aux>
                }

            </div>
        )
    }
}

export default Controls