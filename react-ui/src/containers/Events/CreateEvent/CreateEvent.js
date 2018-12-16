import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import EventCreationTracker from '../../../components/Events/EventCreationTracker/EventCreationTracker'
import { Button } from "react-bootstrap";
import EventCreationDetails from '../../../components/Events/EventCreationFlow/EventCreationDetails/EventCreationDetails';
import EventCreationPicture from '../../../components/Events/EventCreationFlow/EventCreationPicture/EventCreationPicture';
import EventCreationConfirmation from '../../../components/Events/EventCreationFlow/EventCreationConfirmation/EventCreationConfirmation';

class CreateEvent extends Component {
    state = {
        event: {
            name: "An event",
            description: "Description",
            openToPublic: true,
            unlimitedParticipants: true,
            maxParticipants: 15,
            categories: ["BOARDGAMES", "DICEGAMES"]
        },
        inEventDetails: true,
        inEventPicture: false,
        inEventConfirmation: false,
        currentPage: "eventDetails"
    };

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
        // return this.state.name.length > 0 && this.state.description.length > 0;
    }

    triggerNext = (page) => {
        switch (page) {
            case "eventDetails":
                this.setState({inEventDetails: false, inEventPicture: true, inEventConfirmation: false, currentPage: "eventPicture"});
                break;
            case "eventPicture":
                this.setState({inEventPicture: false, inEventConfirmation: true, inEventDetails: false, currentPage: "eventConfirmation"});
                break;
            case "eventConfirmation":
                this.setState({inEventConfirmation: false, inEventDetails: true, inEventPicture: false, currentPage: "eventDetails"});
                break;
            default:
                this.setState({inEventConfirmation: false, inEventPicture: false, inEventDetails: true, currentPage: "eventDetails"});
        }
    };

    render() {

        return <BodyBackgroundColor backgroundColor='#eee2dc'>
            <div className="container">
                <div className="row">
                    <EventCreationTracker activePage={this.state.currentPage}/>
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-12 col-md-6 mb-4">
                                <EventCreationDetails activePage={this.state.currentPage} onClick={this.triggerNext} hidden={!this.state.inEventDetails}/>
                                <EventCreationPicture activePage={this.state.currentPage} onClick={this.triggerNext} hidden={!this.state.inEventPicture}/>
                                <EventCreationConfirmation activePage={this.state.currentPage} onClick={this.triggerNext} hidden={!this.state.inEventConfirmation}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BodyBackgroundColor>
    }
}

export default withRouter(CreateEvent);