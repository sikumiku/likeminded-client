import React from "react";
import "./NotFound.css";
import BodyBackgroundColor from 'react-body-backgroundcolor';

export default () =>
    <BodyBackgroundColor backgroundColor='#eee2dc'>
        <div className="NotFound">
            <h3>Sorry, page not found!</h3>
        </div>
    </BodyBackgroundColor>;