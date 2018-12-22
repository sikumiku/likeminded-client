import React from 'react';
import { Button } from "reactstrap";
import classes from './GroupCreationConfirmation.module.css';
import Aux from '../../../../hoc/Auxilliary/Auxilliary';

const groupCreationConfirmation = (props) => {
    let form = null;
    let button = null;

    if (!props.hidden) {
        form = (
            <div>
                <strong>Grupi loomise kinnitamine</strong>
            </div>
        );
        button = <Button block onClick={() => props.onClick(props.activePage)}>EDASI</Button>
    }

    return (
        <Aux>
            <div className={classes.GroupCreationConfirmation}>
                {form}
            </div>
            {button}
        </Aux>
    );
};

export default groupCreationConfirmation;