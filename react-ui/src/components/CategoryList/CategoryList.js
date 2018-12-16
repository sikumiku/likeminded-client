import React from 'react';
import classes from './CategoryList.module.css'
import ListGroup from "react-bootstrap/es/ListGroup";
import ListGroupItem from "react-bootstrap/es/ListGroupItem";

const categoryList = (props) => {
    return (
        <div className={classes.categoryList}>
            <ListGroup >
                {props.options.map((option) => (
                    <ListGroupItem id="panel-body"
                                   className={option.option===props.selectedOption.option?"groupitem":""}
                                   onClick={(e) => props.onOptionClick(option)}>
                        <a href="#" className={option.option===props.selectedOption.option?"groupitem":"panel-link"}>{option.title}</a>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>

    );
};

export default categoryList;