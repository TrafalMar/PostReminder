import React, { Component } from "react";
import Aux from "./../../hoc/_Aux/_Aux";
import { FaHome, FaDoorOpen, FaLayerGroup } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Menu.module.css";

class Menu extends Component {
  render() {
    let links = null;

    if (this.props.isAuthenticated) {
      links = (
        <div className={classes.Menu}>
          <NavLink to="/home" activeClassName={classes.active}>
            <FaHome />
          </NavLink>
          <NavLink to="/allposts" activeClassName={classes.active}>
            <FaLayerGroup />
          </NavLink>
          <NavLink to="/logout" activeClassName={classes.active}>
            <FaDoorOpen />
          </NavLink>
        </div>
      );
    }

    return <Aux>{links}</Aux>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

export default connect(mapStateToProps, null)(Menu);
