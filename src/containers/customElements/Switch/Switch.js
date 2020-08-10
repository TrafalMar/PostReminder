import React from 'react';
import Aux from './../../../hoc/_Aux/_Aux'
import classes from './Switch.module.css';

const Switch = (props) => (
    <Aux>
        <label className={classes.Switch}>
            <input type="checkbox" defaultChecked={props.checked} onChange={props.toggler} />
            <span className={classes.Slider}></span>
        </label>
    </Aux>
)

export default Switch