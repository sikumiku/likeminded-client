import React, { Component } from "react";
import { Button } from "reactstrap";
import classes from "./Signup.module.css"
import {signup, login} from '../../apiUtil/index';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import {ACCESS_TOKEN} from '../../constants/index';
import {withRouter} from 'react-router-dom';
import Redirect from "react-router-dom/es/Redirect";
import {AvField, AvForm} from "availity-reactstrap-validation";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event, errors) {
        event.preventDefault();

        this.setState({errors});

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
    };

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/'/>;
        }

        return (
            <BodyBackgroundColor backgroundColor='#eee2dc'>
                <div className="container">
                    <div className={classes.Signup}>
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
                                name="username"
                                label="Kasutajanimi"
                                value={this.state.username}
                                onChange={this.handleChange}
                                errorMessage="Kasutajanime pikkus võib olla 3-20 tähemärki"
                                validate={{
                                    required: {value: true},
                                    pattern: {value: '^[A-Za-z0-9]+$'},
                                    minLength: {value: 3},
                                    maxLength: {value: 20}
                                }}
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
                </div>
            </BodyBackgroundColor>
        );
    }
}

export default withRouter(Signup);