import React from 'react';
import UploadFile from './../UploadFile/UploadFile'
import { FaTimes, FaEllipsisV } from 'react-icons/fa'
import CustomButton from './../../../customElements/Button/Button'
import Aux from '../../../../hoc/_Aux/_Aux'
import classes from './PostItems.module.css'

const PostItems = (props) => {

    let editFormItems = []
    let formItems = []


    if (props.items !== null && props.items !== undefined) {
        Object.keys(props.items).map(key => {
            const deleteButton = <CustomButton key={'button' + key} color='red' style={{ fontSize: '16px', padding: "5px 0 10px  0", height: "auto", marginLeft: 'auto' }} onClick={() => props.deleteField(props.postId, key)} ><FaTimes /></CustomButton>

            switch (props.items[key].type) {
                case 'Title':
                    formItems.push(<p key={key} className={classes.Header}>{props.items[key].context}</p>)
                    editFormItems.push(<div className={classes.PostItem}>
                        {deleteButton}
                        <div className={classes.EditLine}>
                            <span className={classes.Handle}><FaEllipsisV /></span>
                            <input
                                key={key}
                                onChange={(event) => { props.changeField(props.postId, key, event) }}
                                className={classes.HeaderEditLine}
                                value={props.items[key].context} />
                        </div>
                    </div>)
                    break;
                case 'Paragraph':
                    formItems.push(<p key={key} className={classes.Details}>{props.items[key].context}</p>)
                    editFormItems.push(<div className={classes.PostItem}>
                        {deleteButton}
                        <div className={classes.EditLine}>
                            <span className={classes.Handle}><FaEllipsisV /></span>
                            <input
                                key={key}
                                onChange={(event) => { props.changeField(props.postId, key, event) }}
                                className={classes.DetailsEditLine}
                                value={props.items[key].context} />
                        </div>
                    </div>)
                    break;
                case "Image":
                    formItems.push(<img className={classes.Image} key={key} src={props.items[key].context} alt="Default" />)
                    editFormItems.push(
                        <Aux key={key}>
                            <div className={classes.PostItem}>
                                {deleteButton}
                                <div className={classes.EditLine}>
                                    <span className={classes.Handle}><FaEllipsisV /></span>
                                    <input
                                        placeholder="Drop file or type a link to it"
                                        onChange={(event) => { props.changeField(props.postId, key, event) }}
                                        className={classes.ImageEditLine}
                                        value={props.items[key].context}
                                    />
                                </div>
                                <UploadFile />
                            </div>
                        </Aux>
                    )
                    break;
                default:
                    formItems.push(<p key={key}>You are welcome to add new items</p>)
                    break;
            }
            return null;
        })
    }

    const content = props.items !== undefined ? props.editMode ? editFormItems : formItems : <p style={{textAlign:"center"}}>You are welcome to add new items</p>

    return content
}

export default PostItems