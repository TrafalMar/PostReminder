import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';

import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import classes from './App.module.css';
import Posts from './containers/Posts/Posts';
import { connect } from 'react-redux'
import * as action from './redux/actions/index'

class App extends Component {

  componentDidMount(){
    this.props.tryAutoSingIn()
  }

  render() {
    return (
      <Router>
        <div className={classes.App}>
          <nav>
            <ul>
              {this.props.isAuthenticated ? <li><Link to="/">Home</Link></li> : null}
              <li>
                {!this.props.isAuthenticated ?
                  <Link to="/auth">Authenticate</Link> :
                  <Link to="/logout">Logout</Link>}
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path='/logout' component={Logout} />
            <Route path='/auth' component={Auth} />
            <Route path='/' component={Posts} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.idToken !== null
})

const mapDispatchToProps = dispatch=>{
  return {
    tryAutoSingIn: ()=>dispatch(action.checkAuthOnReload())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
