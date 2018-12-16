import React from 'react';
import Button from "react-bootstrap/es/Button";
import classes from './EventCreationConfirmation.module.css'

const eventCreationConfirmation = (props) => {
    let form = null;

    if (!props.hidden) {
        form = <div>
            <strong>Event confirmation</strong>
            <Button block onClick={() => props.onClick(props.activePage)}>EDASI</Button>
        </div>;
    }

    return (
        <div className={classes.EventCreationConfirmation}>{form}</div>
    );
};

export default eventCreationConfirmation;