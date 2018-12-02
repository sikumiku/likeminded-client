import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import EventHub from "./containers/EventHub";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import Redirect from "react-router-dom/es/Redirect";

export default ({ childProps }) =>
    <Switch>
        <Route exact path="/" render={Home}/>
        <Route exact path="/events" render={(props) => (
            childProps.isAuthenticated === true
                ?
                <EventHub isAuthenticated={childProps.isAuthenticated} currentUser={childProps.currentUser}>
                </EventHub>
                : <Redirect to='/login'/>
        )}/>
        <Route exact path="/login" render={Login}/>
        <Route exact path="/signup" render={Signup}/>
        <Route component={NotFound} />
    </Switch>;