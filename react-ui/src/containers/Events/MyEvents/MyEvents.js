import React, {Component} from 'react';
import {getMyEvents} from "../../../apiUtil/userApi";
import EventList from "../../../components/Events/EventList/EventList";
import MyEventMenu from "../../../components/Events/MyEventMenu/MyEventMenu";
import BodyBackgroundColor from 'react-body-backgroundcolor';

class MyEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myEvents: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});

        getMyEvents()
            .then(data => {
                this.setState({myEvents: data, isLoading: false});
            });
    }

    render() {
        return (
            <BodyBackgroundColor backgroundColor='#eee2dc'>
                <div>
                    <div className="container">
                        <div className="row">
                            <MyEventMenu options={this.state.options} selectedOption={this.state.selectedOption} onOptionClick={this.onOptionClick}/>
                            <EventList events={this.state.myEvents} isLoading={this.state.isLoading}/>
                        </div>
                    </div>
                </div>
            </BodyBackgroundColor>
        );
    };
}

export default MyEvents;