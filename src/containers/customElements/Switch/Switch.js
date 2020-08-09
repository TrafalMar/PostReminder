import React from 'react';
import Aux from './../../../hoc/_Aux/_Aux'
import classes from './Switch.module.css';

const Switch = () => (
    <Aux>
        <label className={classes.Switch}>
            <input type="checkbox" />
            <span className={classes.Slider}></span>
        </label>
    </Aux>
)

export default Switch