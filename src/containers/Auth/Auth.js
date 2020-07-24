import React, { Component } from 'react'
import classes from './Auth.module.css'

class Auth extends Component {

    state = {
        email: null,
        pass: null
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    render() {
        return (
            <div className={classes.Container}>
                <div className={classes.Auth}>
                    <form>
                        <input type='input' placeholder='email' onChange={(event) => this.setState({ email: event.target.value })} />
                        <input type='input' placeholder='password' onChange={(event) => this.setState({ pass: event.target.value })} />
                        <button onClick={this.submitHandler}>SUBMIT</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Auth