import React from 'react';
import classes from './Button.module.css';

const button = (props) => (
    <button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.categoryClicked}>{props.children}</button>
);

export default button;