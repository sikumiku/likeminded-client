import React from 'react';
import Button from "react-bootstrap/es/Button";
import classes from './GroupCreationPicture.module.css'
import Aux from '../../../../hoc/Auxilliary/Auxilliary';

const groupCreationPicture = (props) => {
    let form = null;
    let button = null;

    if (!props.hidden) {
        form = (
            <div>
                <strong>Grupi pildi üles laadimine</strong>
            </div>
        );
        button = <Button block onClick={() => props.onClick(props.activePage)}>EDASI</Button>
    }

    return (
        <Aux>
            <div className={classes.GroupCreationPicture}>
                {form}
            </div>
            {button}
        </Aux>
    );
};

export default groupCreationPicture;