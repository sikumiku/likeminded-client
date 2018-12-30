import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "../containers/Home/Home";
import EventHub from "../containers/Events/EventHub/EventHub";
import CreateEvent from "../containers/Events/CreateEvent/CreateEvent";
import Login from "../containers/Login/Login";
import Signup from "../containers/Signup/Signup";
import NotFound from "../components/NotFound/NotFound";
import Redirect from "react-router-dom/es/Redirect";
import GroupHub from "../containers/Groups/GroupHub/GroupHub";
import CreateGroup from "../containers/Groups/CreateGroup/CreateGroup";
import PeopleHub from "../containers/People/PeopleHub/PeopleHub";
import UserSettings from "../containers/UserSettings/UserSettings"
import MyEvents from "../containers/Events/MyEvents/MyEvents";
import MyGroups from "../containers/Groups/MyGroups/MyGroups";

export default ({childProps}) =>
    <Switch>
        <Route exact path="/" render={Home}/>
        <Route exact path="/events" render={(props) => (
                <EventHub isAuthenticated={childProps.isAuthenticated} currentUser={childProps.currentUser}/>
        )}/>
        <Route exact path="/groups" render={(props) => (
            childProps.isAuthenticated === true
                ?
                <GroupHub isAuthenticated={childProps.isAuthenticated} currentUser={childProps.currentUser}>
                </GroupHub>
                : <Redirect to='/login'/>
        )}/>
        <Route exact path="/people" render={(props) => (
            childProps.isAuthenticated === true
                ?
                <PeopleHub isAuthenticated={childProps.isAuthenticated} currentUser={childProps.currentUser}>
                </PeopleHub>
                : <Redirect to='/login'/>
        )}/>
        <Route exact path="/createEvent" render={(props) => (
            childProps.isAuthenticated === true
                ?
                <CreateEvent isAuthenticated={childProps.isAuthenticated} currentUser={childProps.currentUser}>
                </CreateEvent>
                : <Redirect to='/login'/>
        )}/>
        <Route exact path="/createGroup" render={(props) => (
            childProps.isAuthenticated === true
                ?
                <CreateGroup isAuthenticated={childProps.isAuthenticated} currentUser={childProps.currentUser}>
                </CreateGroup>
                : <Redirect to='/login'/>
        )}/>
        <Route exact path="/myEvents" render={(props) => (
            childProps.isAuthenticated === true
                ?
                <MyEvents isAuthenticated={childProps.isAuthenticated} currentUser={childProps.currentUser}>
                </MyEvents>
                : <Redirect to='/login'/>
        )}/>
        <Route exact path="/myGroups" render={(props) => (
            childProps.isAuthenticated === true
                ?
                <MyGroups isAuthenticated={childProps.isAuthenticated} currentUser={childProps.currentUser}>
                </MyGroups>
                : <Redirect to='/login'/>
        )}/>
        <Route exact path="/settings" render={(props) => (
            childProps.isAuthenticated === true
                ?
                <UserSettings isAuthenticated={childProps.isAuthenticated} currentUser={childProps.currentUser}>
                </UserSettings>
                : <Redirect to='/login'/>
        )}/>
        <Route exact path="/login" render={Login}/>
        <Route exact path="/signup" render={Signup}/>
        <Route component={NotFound}/>
    </Switch>;