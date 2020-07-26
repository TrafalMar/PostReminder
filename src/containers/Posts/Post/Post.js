import React from 'react'
import PostControls from './../Controls/PostControls/PostControls'
import Aux from '../../../hoc/_Aux/_Aux'
import UploadFile from './UploadFile/UploadFile'
import { FaTimes } from 'react-icons/fa'
import CustomButton from './../../customElements/Button/Button'

import classes from './Post.module.css'

const Post = (props) => {

    const content = []
    const editForm = []

    if (props.items !== null && props.items !== undefined) {
        Object.keys(props.items).map(key => {

            editForm.push(<CustomButton key={'button' + key} color='red' style={{fontSize:'16px',  padding:"5px 0 0 0", height:"auto", marginLeft:'auto'}} onClick={() => props.deleteField(props.postId, key)} ><FaTimes /></CustomButton>)

            switch (props.items[key].type) {
                case 'Title':
                    content.push(<p key={key} className={classes.Header}>{props.items[key].context}</p>)
                    editForm.push(<input
                        key={key}
                        onChange={(event) => { props.changeField(props.postId, key, event) }}
                        className={classes.HeaderEditLine}
                        value={props.items[key].context} />)
                    break;
                case 'Paragraph':
                    content.push(<p key={key} className={classes.Details}>{props.items[key].context}</p>)
                    editForm.push(<input
                        key={key}
                        onChange={(event) => { props.changeField(props.postId, key, event) }}
                        className={classes.DetailsEditLine}
                        value={props.items[key].context} />)
                    break;
                case "Image":
                    content.push(<img className={classes.Image} key={key} src={props.items[key].context} alt="Default" />)
                    editForm.push(
                        <Aux key={key}>
                            <input
                                placeholder="Drop file or type a link to it"
                                onChange={(event) => { props.changeField(props.postId, key, event) }}
                                className={classes.ImageEditLine}
                                value={props.items[key].context}
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
            <div onKeyUp={(event) => { if (event.keyCode !== 13) return; props.saveChanges() }} className={!props.editMode ? classes.Post : [classes.Post, classes.Editing].join(' ')}>
                {props.editMode ? editForm : content}
                <PostControls deletePost={props.deletePost} editMode={props.editMode} editToggler={props.editToggler} addFieldHandler={props.addFieldHandler} postId={props.postId} />
            </div >
        </Aux>
    )
}

export default Post