import React from "react";
import classes from "./Backdrop.module.css";
import { connect } from "react-redux";
import * as action from "../../redux/actions/index";

const Backdrop = (props) =>
  props.showBackdrop ? (
    <div
      className={classes.Backdrop}
      onClick={() => {
        props.closeBackdrop();
        props.closeSettings();
      }}
    ></div>
  ) : null;

const mapStateToProps = (state) => ({
  showBackdrop: state.backdrop.showBackdrop,
});

const mapDispatchToProps = (dispatch) => ({
  closeSettings: () => dispatch(action.closeSettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);
