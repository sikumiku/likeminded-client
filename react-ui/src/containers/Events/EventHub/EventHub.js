import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import ListGroup from "react-bootstrap/es/ListGroup";
import ListGroupItem from "react-bootstrap/es/ListGroupItem";
import blog_spirit_island from '../../../resources/spiritisland.png';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import NavLink from "react-router-dom/es/NavLink";
import Link from "react-router-dom/es/Link";

class EventHub extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            events: [],
            csrfToken: cookies.get('XSRF-TOKEN'),
            isLoading: true,
            progress: 50,
            options: [
                {option: 'Kõik kategooriad'},
                {option: 'Lauamängud'},
                {option: 'Täringumängud'},
                {option: 'Rollimängud'},
                {option: 'Miniatuurimängud'},
                {option: '"Tile" mängud'},
                {option: 'Klassikalised mängud'},
                {option: 'Kaardimängud'}
            ],
            selectedOption: {option: 'Kõik kategooriad'}
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('http://localhost:8080/api/v1/events')
            .then(response => response.json())
            .then(data => {
                this.setState({events: data, isLoading: false});
                console.log(data)
            });

        this.setState({selectedOption : {option: 'Kõik kategooriad'}})
    }

    onOptionClick = (option) => {
        this.setState({ selectedOption: option })
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
        const {events, isLoading, options, selectedOption} = this.state;

        const eventList = events.map(event => {
            // const address = event.address;
            let addressLine = "";
            let city = "";
            let postcode = "";
            let countryCode = "";

            // if (address !== null) {
            //     addressLine = address.addressLine;
            //     city = address.city;
            //     postcode = address.postCode;
            //     countryCode = address.countryCode;
            // }
            return <p key={event.toString()}>
                <div className="card">
                    <h4 id="panel-heading" className="card-header">
                        <a className="panel-heading" href="#">{event.name}</a>
                    </h4>
                    <div id="panel-body" className="card-body">
                        <div className="row">
                            <div className="col col-lg-2">
                                <img className="card-img-top" src={blog_spirit_island} alt=""/>
                            </div>
                            <div className="col">
                                <p className="card-text">Kirjeldus: {event.description}</p>
                                <p className="card-text">Aadress: {addressLine} {city} {postcode} {countryCode}</p>
                            </div>
                            <div className="col col-lg-3">
                                <p className="card-text text-right" >Event time and date</p>

                                <div className="event-button-right">
                                    <Button>
                                        OSALE
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734; Game category thumbnails</small>
                    </div>
                </div>
            </p>
        });

        return (
            <BodyBackgroundColor backgroundColor='#eee2dc'>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <h1 className="my-4" color="#9c3159">ÜRITUSED</h1>
                                <p/>
                                <h3 className="my-3"><NavLink tag={Link} to="/createEvent"><span id="navbar-link">Loo üritus</span></NavLink></h3>
                                <p/>
                                <ListGroup>
                                    {options.map((option) => (
                                        <ListGroupItem id="panel-body"
                                                       className={option.option===selectedOption.option?"groupitem":""}
                                                       onClick={(e) => this.onOptionClick(option)}>
                                            <a href="#" className={option.option===selectedOption.option?"groupitem":"panel-link"}>{option.option}</a>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </div>
                            <div className="col-lg-9">

                                <div className="row">

                                    <div className="col-lg-12 col-md-6 mb-4">
                                        {isLoading?<p>Loading...</p>:(!events.length?<p>No events to show.</p>:eventList)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BodyBackgroundColor>
        );
    }
}
export default withCookies(withRouter(EventHub));