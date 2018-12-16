import React from "react";
import classes from './NotFound.module.css';
import BodyBackgroundColor from 'react-body-backgroundcolor';

export default () =>
    <BodyBackgroundColor backgroundColor='#eee2dc'>
        <div className={classes.NotFound}>
            <h3>Sorry, page not found!</h3>
        </div>
    </BodyBackgroundColor>;