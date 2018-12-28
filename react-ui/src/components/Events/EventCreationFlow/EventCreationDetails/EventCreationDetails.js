import React from 'react';
import Aux from '../../../../hoc/Auxilliary/Auxilliary';
import { Button } from "reactstrap";
import classes from "./EventCreationDetails.module.css"

const eventCreationDetails = (props) => {

    let form = null;
    let button = null;

    if (!props.hidden) {
        form = props.form;
        button = <Button block onClick={() => props.onClick(props.activePage)}>EDASI</Button>
    }

    return (
        <Aux>
            <div className={classes.EventCreationDetails}>
                {form}
            </div>
            {button}
        </Aux>
    );
};

export default eventCreationDetails;