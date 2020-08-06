import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Posts from './../../containers/Posts/Posts'
import Auth from './../../containers/Auth/Auth'
import Logout from './../../containers/Auth/Logout/Logout'

const Routes = (props) => {
    let routes = (
        <Switch>
            <Route path='/auth' component={Auth} />
            <Route exact path='/home' component={() => <Posts userId={props.userId} />} />
            <Redirect to='/auth' />
        </Switch>
    )

    if (localStorage.getItem('idToken') || props.isAuthenticated) {
        routes = (
            <Switch>
                <Route exact path='/home' component={() => <Posts userId={props.userId} />} />
                <Route path='/allposts' component={Posts} />
                <Route path='/logout' component={Logout} />
                <Redirect to='/home' />
            </Switch>
        )
    }
    return routes
}

export default Routes

