import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../containers/Home/Home";
import EventHub from "../containers/Events/EventHub/EventHub";
import CreateEvent from "../containers/Events/CreateEvent/CreateEvent";
import Login from "../containers/Login/Login";
import Signup from "../containers/Signup/Signup";
import NotFound from "../components/NotFound/NotFound";
import Redirect from "react-router-dom/es/Redirect";
import GroupHub from "../containers/Groups/GroupHub/GroupHub";

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
            <Route exact path="/groups" render={(props) => (
                childProps.isAuthenticated === true
                    ?
                    <GroupHub isAuthenticated={childProps.isAuthenticated} currentUser={childProps.currentUser}>
                    </GroupHub>
                    : <Redirect to='/login'/>
            )}/>
        <Route exact path="/createEvent" render={(props) => (
        childProps.isAuthenticated === true
            ?
            <CreateEvent isAuthenticated={childProps.isAuthenticated} currentUser={childProps.currentUser}>
            </CreateEvent>
            : <Redirect to='/login'/>
        )}/>
        <Route exact path="/login" render={Login}/>
        <Route exact path="/signup" render={Signup}/>
        <Route component={NotFound} />
    </Switch>;