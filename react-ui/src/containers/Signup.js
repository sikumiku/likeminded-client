import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Signup.css";
import {signup, login} from '../apiUtil/index';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import {ACCESS_TOKEN} from '../constants/index';
import {withRouter} from 'react-router-dom';
import Redirect from "react-router-dom/es/Redirect";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            disabled: false,
            submitted: false,
            step: 0,
            errorSteps: [],
            redirect: false
        }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && (this.state.username.length > 4 && this.state.username.length < 20);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        signup({
            email: this.state.email,
            password: this.state.password,
            username: this.state.username
        })
            .then(result => {

                login({
                    email: this.state.email,
                    password: this.state.password
                })
                    .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        this.setState({redirect: true});
                    })
                    .catch(error => {
                        console.log(error);
                    })

            }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/'/>;
        }

        return (
            <BodyBackgroundColor backgroundColor='#eee2dc'>
                <div className="container">
                    <div className="Signup">
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
                            <FormGroup controlId="username" bsSize="large">
                                <ControlLabel>Kasutajanimi</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="username"
                                    value={this.state.username}
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
                                Loo kasutaja
                            </Button>
                        </form>
                    </div>
                </div>
            </BodyBackgroundColor>
        );
    }
}

export default withRouter(Signup);