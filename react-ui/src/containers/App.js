import React, {Component} from 'react';
import './App.css';
import {getCurrentUser} from "../apiUtil/index";
import {ACCESS_TOKEN} from '../constants/index';
import Routes from "../components/Routes";
import AppNavbar from './AppNavbar/AppNavbar';
import {withRouter} from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            onLogOut: null
        };
    }

    loadCurrentUser = () => {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    };

    componentWillMount() {
        this.loadCurrentUser();
    }

    componentWillReceiveProps(nextProps) {
        this.loadCurrentUser();
    }

    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    };

    handleLogout = (redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") => {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });
    };

    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }

        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated,
            isLoading: this.state.isLoading,
            currentUser: this.state.currentUser,
            onLogOut: this.handleLogout
        };

        return (
            <div className="App">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <AppNavbar isAuthenticated={childProps.isAuthenticated} currentUser={childProps.currentUser} onLogOut={childProps.onLogOut}/>
                    <Routes childProps={childProps} />
                </MuiPickersUtilsProvider>
            </div>
        )
    }
}

export default withRouter(App);
