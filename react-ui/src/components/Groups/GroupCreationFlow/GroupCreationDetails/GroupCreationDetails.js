import React from 'react';
import Aux from '../../../../hoc/Auxilliary/Auxilliary';
import { Button } from "reactstrap";
import classes from "./GroupCreationDetails.module.css"

const groupCreationDetails = (props) => {

    let form = null;
    let button = null;

    if (!props.hidden) {
        form = props.form;
        button = <Button block onClick={() => props.onClick(props.activePage)}>EDASI</Button>
    }

    return (
        <Aux>
            <div className={classes.GroupCreationDetails}>
                {form}
            </div>
            {button}
        </Aux>
    );
};

export default groupCreationDetails;