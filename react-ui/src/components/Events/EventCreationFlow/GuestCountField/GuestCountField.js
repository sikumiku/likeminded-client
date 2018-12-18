import React from 'react';
import classes from './GuestCountField.module.css';

const guestCountField = (props) => (
    props.show ? <div className="row">
        <div className="col-4">
            <div className={classes.FormRow}>
                <div>Külaliste arv:</div>
            </div>
        </div>
        <input className={classes.InputNumber} type="number" name="guestCount" onChange={props.changed}/>
    </div> : null
);

export default guestCountField;