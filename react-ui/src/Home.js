import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { withCookies } from 'react-cookie';

class Home extends Component {
    state = {
        isLoading: true,
        isAuthenticated: false,
        user: undefined
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('https://likeminded-server.herokuapp.com/api/v1/events');
        const body = await response.text();
        console.log(JSON.parse(body));
        // if (body === '') {
        //     this.setState(({isAuthenticated: false}))
        // } else {
        //     this.setState({isAuthenticated: true, user: JSON.parse(body)})
        // }
    }

    login() {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') {
            port = ':8080';
        }
        window.location.href = '//' + window.location.hostname + port + '/private';
    }

    logout() {
        fetch('/api/logout', {method: 'POST', credentials: 'include',
            headers: {'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
            .then(response => {
                window.location.href = response.logoutUrl + "?id_token_hint=" +
                    response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
            });
    }

    render() {
        const message = this.state.user ?
            <h2>Welcome, {this.state.user.username}!</h2> :
            <p>Please log in to manage your JUG Tour.</p>;

        const button = this.state.isAuthenticated ?
            <div>
                <Button color="link"><Link to="/events">Manage JUG Tour</Link></Button>
                <br/>
                <Button color="link" onClick={this.logout}>Logout</Button>
            </div> :
            <Button color="primary" onClick={this.login}>Login</Button>;

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    {message}
                    {button}
                </Container>
            </div>
        );
    }
}

export default withCookies(Home);