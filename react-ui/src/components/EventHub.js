import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link, withRouter} from 'react-router-dom';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import ListGroup from "react-bootstrap/es/ListGroup";
import ListGroupItem from "react-bootstrap/es/ListGroupItem";
import blog_spirit_island from '../resources/spiritisland.png';
import BodyBackgroundColor from 'react-body-backgroundcolor';

class EventList extends Component {
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

        console.log("Trying to fetch data about events, csrfToken: " + this.state.csrfToken);
        fetch('https://likeminded-server.herokuapp.com/api/v1/events')
            .then(response => response.json())
            .then(data => this.setState({events: data, isLoading: false}));

        console.log(this.state.events);
        this.setState(this.state.selectedOption = {option: 'Kõik kategooriad'})
    }

    onOptionClick = (option) => {
        this.setState({ selectedOption: option })
    }

    async remove(id) {
        await fetch(`https://likeminded-server.herokuapp.com/api/v1/event/${id}`, {
            method: 'DELETE',
            headers: {
                // 'X-XSRF-TOKEN': this.state.csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            // credentials: 'include'
        }).then(() => {
            let updatedEvents = [...this.state.events].filter(i => i.id !== id);
            this.setState({events: updatedEvents});
        });
    }

    render() {
        const {events, isLoading, options, selectedOption} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const eventList = events.map(event => {
            const address = event.address;
            let addressLine = "";
            let city = "";
            let postcode = "";
            let countryCode = "";

            if (address !== null) {
                addressLine = address.addressLine;
                city = address.city;
                postcode = address.postCode;
                countryCode = address.countryCode;
            }
            return <tr key={event.id}>
                <td style={{whiteSpace: 'nowrap'}}>{event.name}</td>
                <td>{event.description}</td>
                <td>
                    <div>{addressLine} {city} {postcode} {countryCode}</div>
                </td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/events/" + event.id}>Muuda</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(event.id)}>Kustuta</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <BodyBackgroundColor backgroundColor='#eee2dc'>
                <div>
                    <AppNavbar/>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3">
                                <h1 class="my-4" color="#9c3159">ÜRITUSED</h1>
                                <p/>
                                <h3 class="my-3"><a class="menu-link" href="#">Loo üritus &gt;</a></h3>
                                <p/>
                                <ListGroup>
                                    {options.map((option) => (
                                        <ListGroupItem id="panel-body"
                                            className={option.option==selectedOption.option?"groupitem":""}
                                            onClick={(e) => this.onOptionClick(option)}>
                                            {console.log("option is " + option.option + " and selecteoption is " + selectedOption.option)}
                                            <a href="#" class={option.option==selectedOption.option?"groupitem":"panel-link"}>{option.option}</a>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </div>
                            <div class="col-lg-9">

                                <div class="row">

                                    <div class="col-lg-12 col-md-6 mb-4">
                                        <div class="card">
                                            <h4 id="panel-heading" class="card-header">
                                                <a class="panel-heading" href="#">Event name</a>
                                            </h4>
                                            <div id="panel-body" class="card-body">
                                                <div class="row">
                                                    <div class="col col-lg-2">
                                                        <img class="card-img-top" src={blog_spirit_island} alt=""/>
                                                    </div>
                                                    <div class="col">
                                                        <p class="card-text">Event location</p>
                                                        <p class="card-text">Free spots at event</p>
                                                    </div>
                                                    <div class="col col-lg-3">
                                                        <p class="card-text text-right" >Event time and date</p>

                                                        <div class="event-button-right">
                                                            <Button>
                                                                OSALE
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer">
                                                <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734; Game category thumbnails</small>
                                            </div>
                                        </div>

                                        <p></p>

                                        <div class="card">
                                            <h4 id="panel-heading" class="card-header">
                                                <a class="panel-heading" href="#">Event name</a>
                                            </h4>
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col col-lg-2">
                                                        <img class="card-img-top" src={blog_spirit_island} alt=""/>
                                                    </div>
                                                    <div class="col">
                                                        <p class="card-text">Event location</p>
                                                        <p class="card-text">Free spots at event</p>
                                                    </div>
                                                    <div class="col col-lg-3">
                                                        <p class="card-text text-right" >Event time and date</p>

                                                        <div class="event-button-right">
                                                            <Button>
                                                                OSALE
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer">
                                                <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734; Game category thumbnails</small>
                                            </div>
                                        </div>

                                        <p></p>

                                        <div class="card">
                                            <h4 id="panel-heading" class="card-header">
                                                <a class="panel-heading" href="#">Event name</a>
                                            </h4>
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col col-lg-2">
                                                        <img class="card-img-top" src={blog_spirit_island} alt=""/>
                                                    </div>
                                                    <div class="col">
                                                        <p class="card-text">Event location</p>
                                                        <p class="card-text">Free spots at event</p>
                                                    </div>
                                                    <div class="col col-lg-3">
                                                        <p class="card-text text-right" >Event time and date</p>

                                                        <div class="event-button-right">
                                                            <Button>
                                                                OSALE
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer">
                                                <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734; Game category thumbnails</small>
                                            </div>
                                        </div>
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
// export default withCookies(withRouter(EventList));
export default withCookies(withRouter(EventList));