import React from 'react';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import classes from './Checkbox.module.css'

const checkBox = (props) => (
    <Aux>
        <div className={classes.FormRow}>
            <input type="checkbox" name={props.name} value={props.value} onChange={(event) => props.onChange(event)}/>{props.label}
        </div>
    </Aux>
);

export default checkBox;