import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import classes from './App.module.css';
import Posts from './containers/Posts/Posts';
import Menu from './containers/Menu/Menu'
import { connect } from 'react-redux'
import * as action from './redux/actions/index'


class App extends Component {

  componentDidMount() {
    this.props.tryAutoSingIn()
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/home' component={() => <Posts userId={this.props.userId} />} />
        <Redirect to='/auth' />
      </Switch>
    )

    if (localStorage.getItem('idToken') || this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/home' component={() => <Posts userId={this.props.userId} />} />
          <Route path='/allposts' component={Posts} />
          <Route path='/logout' component={Logout} />
          <Redirect to='/home' />
        </Switch>
      )
    }
    return (
      <Router>
        <div className={classes.App}>
          <Menu />
          {routes}
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
