import React from 'react';
import { Button } from "reactstrap";
import classes from './EventCreationPicture.module.css'
import Aux from '../../../../hoc/Auxilliary/Auxilliary';

const eventCreationPicture = (props) => {
    let form = null;
    let button = null;

    if (!props.hidden) {
        form = (
                <div>
                    <strong>Ürituse pildi üles laadimine</strong>
                </div>
        );
        button = <Button block onClick={() => props.onClick(props.activePage)}>EDASI</Button>
    }

    return (
        <Aux>
            <div className={classes.EventCreationPicture}>
                {form}
            </div>
            {button}
        </Aux>
    );
};

export default eventCreationPicture;