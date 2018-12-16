import React from 'react';
import Button from "react-bootstrap/es/Button";
import classes from './EventCreationPicture.module.css'

const eventCreationPicture = (props) => {
    let form = null;

    if (!props.hidden) {
        form = (
                <div>
                    <strong>Event creation picture</strong>
                    <Button block onClick={() => props.onClick(props.activePage)}>EDASI</Button>
                </div>
        );

    }

    return (
        <div className={classes.EventCreationPicture}>{form}</div>
    );
};

export default eventCreationPicture;