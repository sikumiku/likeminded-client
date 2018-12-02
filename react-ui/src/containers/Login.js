import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import {login} from '../apiUtil/index';
import {ACCESS_TOKEN} from '../constants/index';
import {withRouter} from 'react-router-dom';

import BodyBackgroundColor from 'react-body-backgroundcolor';
import NavLink from "react-router-dom/es/NavLink";
import Link from "react-router-dom/es/Link";
import {notification} from 'antd';
import Redirect from "react-router-dom/es/Redirect";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            email: "",
            password: "",
            disabled: false,
            submitted: false
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        login({
            email: this.state.email,
            password: this.state.password
        })
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.setState({redirect: true});
            }).catch(error => {
                console.log(error);
            if (error.status === 401) {
                notification.error({
                    message: 'Polling App',
                    description: 'Your Username or Password is incorrect. Please try again!'
                });
            } else {
                notification.error({
                    message: 'Polling App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
    };

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/'/>;
        }

        return (
            <BodyBackgroundColor backgroundColor='#eee2dc'>
                <div className="container">
                    <div className="Login">
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="email" bsSize="large">
                                <ControlLabel>E-mail</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                                <ControlLabel>Salasõna</ControlLabel>
                                <FormControl
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    type="password"
                                />
                            </FormGroup>
                            <Button
                                block
                                bsSize="large"
                                disabled={!this.validateForm()}
                                type="submit"
                            >
                                Sisene
                            </Button>
                        </form>
                    </div>
                    If not a user, click <NavLink tag={Link} to="/signup"><span id="navbar-link">here</span></NavLink> to sign up
                </div>
            </BodyBackgroundColor>
        );
    }
}

export default withRouter(Login);