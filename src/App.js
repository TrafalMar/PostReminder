import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './stateless/Routes/Routes'

import classes from './App.module.css';
import Menu from './containers/Menu/Menu'
import { connect } from 'react-redux'
import * as action from './redux/actions/index'
import Backdrop from './stateless/Backdrop/Backdrop'
import PostSettings from './containers/Posts/PostSettings/PostSettings';

class App extends Component {

  componentDidMount() {
    this.props.tryAutoSingIn()
  }

  render() {

    return (
      <Router>
        <Backdrop closeBackdrop={this.props.closeBackdrop}/>
        <PostSettings/>
        <div className={classes.App}>
          {this.props.isAuthenticated ? <div className={classes.Menu}><Menu /></div> : null}
          <div className={classes.Content}>
            <Routes isAuthenticated = {this.props.isAuthenticated} userId = {this.props.userId} />
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.idToken !== null,
  userId: state.auth.localId
})

const mapDispatchToProps = dispatch => {
  return {
    tryAutoSingIn: () => dispatch(action.checkAuthOnReload()),
    closeBackdrop: () => dispatch(action.closeBackdrop()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
