import React, { Component } from "react";
import { Button } from "reactstrap";
import classes from "./Login.module.css"
import {login} from '../../apiUtil/index';
import {ACCESS_TOKEN} from '../../constants/index';
import {withRouter} from 'react-router-dom';

import BodyBackgroundColor from 'react-body-backgroundcolor';
import NavLink from "react-router-dom/es/NavLink";
import { Link } from 'react-router-dom';
import {notification} from 'antd';
import Redirect from "react-router-dom/es/Redirect";
import {AvField, AvForm} from "availity-reactstrap-validation";

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event, errors) {
        event.preventDefault();

        this.setState({errors});

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
                    <div className={classes.Login}>
                        <AvForm onSubmit={this.handleSubmit}>
                            <AvField
                                autoFocus
                                name="email"
                                label="E-mail"
                                value={this.state.email}
                                onChange={this.handleChange}
                                errorMessage="E-mail ei ole valiidne"
                                validate={{email: true}}
                            />
                            <AvField
                                type="password"
                                name="password"
                                label="Salasõna"
                                value={this.state.password}
                                onChange={this.handleChange}
                                errorMessage="Salasõna peab olema vähemalt 8 tähemärki"
                                validate={{
                                    required: {value: true},
                                    pattern: {value: '^[A-Za-z0-9]+$'},
                                    minLength: {value: 8},
                                    maxLength: {value: 20}
                                }}
                            />
                            <Button
                                block
                                type="submit"
                            >
                                SISENE
                            </Button>
                        </AvForm>
                    </div>
                    Kasutajakonto puudumisel loo uus konto <NavLink tag={Link} to="/signup"><span id="navbar-link">siin</span></NavLink>
                </div>
            </BodyBackgroundColor>
        );
    }
}

export default withRouter(Login);