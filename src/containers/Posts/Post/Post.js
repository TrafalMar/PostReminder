import React from 'react'
import Controls from './../Controls/Controls'
import Aux from '../../../hoc/_Aux/_Aux'
import UploadFile from './UploadFile/UploadFile'
import { FaTimes } from 'react-icons/fa'

import classes from './Post.module.css'

const post = (props) => {

    const content = []
    const editForm = []

    if (props.items !== null && props.items !== undefined) {
        Object.keys(props.items).map(key => {

            editForm.push(<button key={'button' + key} className={classes.DeleteButton} onClick={() => props.deleteField(props.postId, key)} ><FaTimes /></button>)

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
                <Controls editMode={props.editMode} editToggler={props.editToggler} addFieldHandler={props.addFieldHandler} postId={props.postId} />
            </div >
        </Aux>
    )
}

export default post