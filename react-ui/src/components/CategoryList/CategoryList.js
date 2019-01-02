import React from 'react';
import classes from './CategoryList.module.css'
import { ListGroup , ListGroupItem }  from "reactstrap";

const categoryList = (props) => {
    return (
        <div className={classes.categoryList}>
            <ListGroup >
                {props.options.map((option) => (
                    <ListGroupItem id="panel-body"
                                   key={option.option}
                                   className={option.option===props.selectedOption.option?"groupitem":""}
                                   onClick={(e) => props.onOptionClick(option)}>
                        <div className={option.option===props.selectedOption.option?"groupitem":"panel-link"}>{option.title}</div>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>

    );
};

export default categoryList;