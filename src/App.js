import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './stateless/Routes/Routes'

import classes from './App.module.css';
import Menu from './containers/Menu/Menu'
import { connect } from 'react-redux'
import * as action from './redux/actions/index'


class App extends Component {

  componentDidMount() {
    this.props.tryAutoSingIn()
  }

  render() {
    return (
      <Router>
        <div className={classes.App}>
          <div className={classes.Menu}>
            <Menu />
          </div>
          <div className={classes.Content}>
            <Routes {...this.props} />
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
    tryAutoSingIn: () => dispatch(action.checkAuthOnReload())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
