import React, { Component } from 'react'
import classes from './Auth.module.css'
import * as actions from './../../redux/actions/index'
import { connect } from 'react-redux'
import Button from './../customElements/Button/Button'
import { Redirect } from 'react-router-dom'

class Auth extends Component {

    state = {
        email: null,
        password: null,
        isSignUp: true,
    }

    submitHandler = (event) => {
        event.preventDefault()
        console.log(this.state)
    }

    toggleSignUpHandler = (event) => {
        event.preventDefault()
        this.setState(prevState => ({ isSignUp: !prevState.isSignUp }))
    }

    submitHandler = event => {
        event.preventDefault()
        this.props.onAuth(this.state.email, this.state.password, this.state.isSignUp)
    }

    render() {

        let authRedirect = null
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to='/'/>
        }

        return (
            <div className={classes.Container}>
                {authRedirect}
                <div className={classes.Auth}>
                    <form onSubmit={this.submitHandler}>
                        <h3>{this.state.isSignUp ? 'Registering new account' : 'Entering in account'}</h3>
                        <input type='input' placeholder='email' onChange={(event) => this.setState({ email: event.target.value })} />
                        <input type='input' placeholder='password' onChange={(event) => this.setState({ password: event.target.value })} />
                        <h4 style={{color:"red"}}>{this.props.state.errorMessage ? this.props.state.errorMessage : null}</h4>
                        <div className={classes.ButtonsPanel}>
                            <Button color='green' onClick={this.submitHandler}>SUBMIT</Button>
                            <Button color='red' onClick={this.toggleSignUpHandler}>{this.state.isSignUp ? 'SING IN' : 'SING UP'}</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

const mapStateToProps = state => {
    return {
        state: state.auth,
        isAuthenticated: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)