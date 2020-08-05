import React, { Component } from 'react'
import PostControls from './../Controls/PostControls/PostControls'
import Aux from '../../../hoc/_Aux/_Aux'
import UploadFile from './UploadFile/UploadFile'
import { FaTimes } from 'react-icons/fa'
import CustomButton from './../../customElements/Button/Button'

import classes from './Post.module.css'
import { connect } from 'react-redux'

class Post extends Component {

    render() {
        const content = []
        const editForm = []

        if (this.props.items !== null && this.props.items !== undefined) {
            Object.keys(this.props.items).map(key => {

                editForm.push(<CustomButton key={'button' + key} color='red' style={{ fontSize: '16px', padding: "5px 0 0 0", height: "auto", marginLeft: 'auto' }} onClick={() => this.props.deleteField(this.props.postId, key)} ><FaTimes /></CustomButton>)

                switch (this.props.items[key].type) {
                    case 'Title':
                        content.push(<p key={key} className={classes.Header}>{this.props.items[key].context}</p>)
                        editForm.push(<input
                            key={key}
                            onChange={(event) => { this.props.changeField(this.props.postId, key, event) }}
                            className={classes.HeaderEditLine}
                            value={this.props.items[key].context} />)
                        break;
                    case 'Paragraph':
                        content.push(<p key={key} className={classes.Details}>{this.props.items[key].context}</p>)
                        editForm.push(<input
                            key={key}
                            onChange={(event) => { this.props.changeField(this.props.postId, key, event) }}
                            className={classes.DetailsEditLine}
                            value={this.props.items[key].context} />)
                        break;
                    case "Image":
                        content.push(<img className={classes.Image} key={key} src={this.props.items[key].context} alt="Default" />)
                        editForm.push(
                            <Aux key={key}>
                                <input
                                    placeholder="Drop file or type a link to it"
                                    onChange={(event) => { this.props.changeField(this.props.postId, key, event) }}
                                    className={classes.ImageEditLine}
                                    value={this.props.items[key].context}
                                />
                                <UploadFile />
                            </Aux>
                        )
                        break;
                    default:
                        content.push(<p key={key}>You are welcome to add new items</p>)
                        break;
                }

                return null;
            })
        }

        return (
            <Aux>
                <div onKeyUp={(event) => { if (event.keyCode !== 13) return; this.props.savePost() }} className={!this.props.editMode ? classes.Post : [classes.Post, classes.Editing].join(' ')}>
                    {this.props.editMode ? editForm : content}
                    {
                        this.props.isAuthenticated && this.props.userId === this.props.authenticatedUserId ?
                            <PostControls deletePost={this.props.deletePost} editMode={this.props.editMode} editToggler={this.props.editToggler} addFieldHandler={this.props.addFieldHandler} postId={this.props.postId} />
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

export default connect(mapStateToProps, null)(Post)