import React from 'react';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';

import Auth from './containers/Auth/Auth'
import classes from './App.module.css';
import Posts from './containers/Posts/Posts';

function App() {
  return (

    <Router>
      <div className={classes.App}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/auth">Authenticate</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/' component={Posts}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
