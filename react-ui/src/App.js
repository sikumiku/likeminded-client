import React, {Component} from 'react';
import './App.css';
import {getCurrentUser} from "./apiUtil";
import {ACCESS_TOKEN} from './constants/index';
import Routes from "./Routes";
import AppNavbar from './containers/AppNavbar';
import {notification} from 'antd';
import {withRouter} from 'react-router-dom';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            onLogOut: null
        };

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
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

        notification[notificationType]({
            message: 'Polling App',
            description: description,
        });
    };

    render() {
        const {currentUser, isAuthenticated, isLoading} = this.state;

        if (isLoading) {
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
                <AppNavbar isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} onLogOut={this.handleLogout}/>
                <Routes childProps={childProps} />
            </div>
        )
    }
}

export default withRouter(App);
