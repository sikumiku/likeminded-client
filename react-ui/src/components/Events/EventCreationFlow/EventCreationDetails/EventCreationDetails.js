import React from 'react';
import Aux from '../../../../hoc/Auxilliary/Auxilliary';
import FormGroup from "react-bootstrap/es/FormGroup";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/es/Button";
import classes from "./EventCreationDetails.module.css"

const eventCreationDetails = (props) => {

    let form = null;
    let button = null;

    if (!props.hidden) {
        form = props.form;
        button = <Button block onClick={() => props.onClick()}>EDASI</Button>
        // form = <form onSubmit={props.handleSubmit}>
        //         <FormGroup controlId="name" bsSize="large">
        //             <ControlLabel>Nimi</ControlLabel>
        //             <FormControl
        //                 autoFocus
        //                 value={props.name}
        //                 onChange={props.handleChange}
        //             />
        //         </FormGroup>
        //         <FormGroup controlId="description" bsSize="large">
        //             <ControlLabel>Kirjeldus</ControlLabel>
        //             <FormControl
        //                 value={props.description}
        //                 onChange={props.handleChange}
        //             />
        //         </FormGroup>
        //         <Button block onClick={() => props.onClick(props.activePage)}>EDASI</Button>
        //     </form>
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