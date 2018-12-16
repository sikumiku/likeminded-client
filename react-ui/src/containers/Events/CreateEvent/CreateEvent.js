import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import { Progress } from 'reactstrap';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class CreateEvent extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/api/v1/event', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
            // credentials: 'include'
        });
        this.props.history.push('/events');
    }

    validateForm() {
        return this.state.name.length > 0 && this.state.description.length > 0;
    }

    render() {
        return <BodyBackgroundColor backgroundColor='#eee2dc'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="text-center">1 of 5</div>
                        <Progress value="1" max="5" />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="name" bsSize="large">
                                <ControlLabel>Nimi</ControlLabel>
                                <FormControl
                                    autoFocus
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    type="name"
                                />
                            </FormGroup>
                            <FormGroup controlId="description" bsSize="large">
                                <ControlLabel>Kirjeldus</ControlLabel>
                                <FormControl
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    type="description"
                                />
                            </FormGroup>
                            <Button
                                block
                                bsSize="large"
                                disabled={!this.validateForm()}
                                type="submit"
                            >
                                Next
                            </Button>
                        </form>
                    </div>
                </div>

            </div>
        </BodyBackgroundColor>
    }
}

export default withRouter(CreateEvent);