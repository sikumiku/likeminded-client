import React from 'react';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import classes from './RadioInput.module.css'

const radioInput = (props) => (
    <Aux>
        <div className="col-auto - variable width content">
            <div className={classes.FormRow}>
                <input className={classes.CreateEventFormElement} onChange={(event) => props.onChange(event, props.name)} type="radio"
                       name={props.name} value="yes" defaultChecked/>Jah
            </div>
        </div>
        <div className="col-auto - variable width content">
            <div className={classes.FormRow}>
                <input className={classes.CreateEventFormElement} onChange={(event) => props.onChange(event, props.name)} type="radio"
                       name={props.name} value="no"/>Ei
            </div>
        </div>
    </Aux>
);

export default radioInput;