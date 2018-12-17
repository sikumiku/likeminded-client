import React from 'react';
import FormGroup from "react-bootstrap/es/FormGroup";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/es/Button";
import classes from "./EventCreationDetails.module.css"

const eventCreationDetails = (props) => {

    // let form = null;

    if (!props.hidden) {
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
        <div className={classes.EventCreationDetails}>{props.form}</div>
    );
};

export default eventCreationDetails;