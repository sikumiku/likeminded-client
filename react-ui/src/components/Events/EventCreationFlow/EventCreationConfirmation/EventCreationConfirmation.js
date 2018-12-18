import React from 'react';
import Button from "react-bootstrap/es/Button";
import classes from './EventCreationConfirmation.module.css';
import Aux from '../../../../hoc/Auxilliary/Auxilliary';

const eventCreationConfirmation = (props) => {
    let form = null;
    let button = null;

    if (!props.hidden) {
        form = (
            <div>
                <strong>Ürituse kinnitamine</strong>
            </div>
        );
        button = <Button block onClick={() => props.onClick(props.activePage)}>EDASI</Button>
    }

    return (
        <Aux>
            <div className={classes.EventCreationConfirmation}>
                {form}
            </div>
            {button}
        </Aux>
    );
};

export default eventCreationConfirmation;