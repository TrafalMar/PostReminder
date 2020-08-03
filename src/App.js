import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router, Link, Redirect } from 'react-router-dom';

import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import classes from './App.module.css';
import Posts from './containers/Posts/Posts';
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
        <Route path='/allposts' component={Posts} />
        <Redirect to='/auth' />
      </Switch>
    )

    let links = (
      <ul>
        <li><Link to="/auth">Authenticate</Link></li>
        <li><Link to="/allposts">All posts</Link></li>
      </ul>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/logout' component={Logout} />
          <Route path='/allposts' component={Posts} />
          <Route path='/' component={()=><Posts userId={this.props.userId}/>} />
          <Redirect to='/' />
        </Switch>
      )

      links = (
        <ul>
          <li><Link to="/">My posts</Link></li>
          <li><Link to="/allposts">All posts</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      )
    }

    return (
      <Router>
        <div className={classes.App}>
          <nav>
            {links}
          </nav>
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
