import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import {getEvents} from "../../../apiUtil/eventApi";
import EventMenu from '../../../components/Events/EventMenu/EventMenu';
import EventList from '../../../components/Events/EventList/EventList';

class EventHub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            cachedEvents: [],
            isLoading: true,
            progress: 50,
            options: [
                {option: 'ALL', title: 'Kõik kategooriad'},
                {option: 'BOARDGAMES', title: 'Lauamängud'},
                {option: 'DICEGAMES', title: 'Täringumängud'},
                {option: 'ROLEPLAYING', title: 'Rollimängud'},
                {option: 'MINIATURES', title: 'Miniatuurimängud'},
                {option: 'TILEGAMES', title: '"Tile" mängud'},
                {option: 'CLASSICAL', title: 'Klassikalised mängud'},
                {option: 'CARDGAMES', title: 'Kaardimängud'},
            ],
            selectedOption: {option: 'ALL', title: 'Kõik kategooriad'}
        };
        this.remove = this.remove.bind(this);
    }

    componentWillMount() {
        this.setState({selectedOption : {option: 'ALL', title: 'Kõik kategooriad'}})
    }

    componentDidMount() {
        this.setState({isLoading: true});

        getEvents()
            .then(data => {
                this.setState({events: data, isLoading: false, cachedEvents: data});
            });
    }

    onOptionClick = (optionObject) => {
        this.setState({ selectedOption: optionObject });

        if (optionObject.option === "ALL") {
            let cachedEvents = this.state.cachedEvents;
            this.setState({events: cachedEvents});
        } else {
            const events = this.state.cachedEvents;
            const updatedEvents = events.filter(function (event) {
                const categories = event.categories;
                let match = false;
                if (categories) {
                    categories.forEach(category => {
                        if (category.name === optionObject.option) {
                            match = true;
                            return match;
                        }
                    });
                }
                return match;
            });
            this.setState({events: updatedEvents});
        }
    };

    async remove(id) {
        await fetch(`http://localhost:8080/api/v1/event/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedEvents = [...this.state.events].filter(i => i.id !== id);
            this.setState({events: updatedEvents});
        });
    }

    render() {
        return (
            <BodyBackgroundColor backgroundColor='#eee2dc'>
                <div>
                    <div className="container">
                        <div className="row">
                            <EventMenu options={this.state.options} selectedOption={this.state.selectedOption} onOptionClick={this.onOptionClick}/>
                            <EventList events={this.state.events} isLoading={this.state.isLoading}/>
                        </div>
                    </div>
                </div>
            </BodyBackgroundColor>
        );
    };
}
export default withRouter(EventHub);