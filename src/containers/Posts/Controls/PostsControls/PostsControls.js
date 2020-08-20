import React from "react";

import CustomButton from "./../../../customElements/Button/Button";
import classes from "./PostsControls.module.css";
import { FaPlus } from "react-icons/fa";

const PostsControls = (props) => {
  return (
    <div className={classes.PostsControls}>
      <CustomButton color="green" bold="true" onClick={props.addPost}>
        <span style={{ paddingRight: "5px" }}>Add Post</span>
        <FaPlus />
      </CustomButton>
    </div>
  );
};

export default PostsControls;
