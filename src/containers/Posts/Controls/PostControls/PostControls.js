
import { FaPencilAlt, FaSave, FaPlus, FaTrash } from 'react-icons/fa'
import React, { Component } from 'react'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CustomButton from './../../../customElements/Button/Button'

import classes from './PostControls.module.css'
import Aux from '../../../../hoc/_Aux/_Aux';

class PostControls extends Component {

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
            <div className={classes.PostControls}>
                {
                    this.state.isDeleting ?
                        <Aux >
                            <CustomButton color="red" bold="true" onClick={this.props.deletePost}>YES</CustomButton>
                            <CustomButton color="green" bold="true" onClick={() => this.deletingHandler(false)}>NO</CustomButton>
                        </Aux>
                        : <Aux>
                            {
                                this.props.editMode ?
                                    <Aux>
                                        <CustomButton color="red" style={{marginRight:'auto'}} onClick={() => this.deletingHandler(true)}><FaTrash /></CustomButton>
                                        <CustomButton color="green" onClick={this.handleClickOnPlus} >
                                            <FaPlus />
                                        </CustomButton>
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

                            <CustomButton color="red" onClick={this.props.editToggler}>{this.props.editMode ? <FaSave /> : <FaPencilAlt />}</CustomButton>
                        </Aux>
                }

            </div>
        )
    }
}

export default PostControls