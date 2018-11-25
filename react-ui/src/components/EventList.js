import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link, withRouter} from 'react-router-dom';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';

class EventList extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {events: [], csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        console.log("Trying to fetch data about events, csrfToken: " + this.state.csrfToken);
        fetch('https://likeminded-server.herokuapp.com/api/v1/events')
            .then(response => response.json())
            .then(data => this.setState({events: data, isLoading: false}));

        console.log(this.state.events);
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
        const {events, isLoading} = this.state;

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
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/events/new">Lisa uus üritus</Button>
                    </div>
                    <h3>Üritused</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Nimi</th>
                            <th width="20%">Kirjeldus</th>
                            <th>Aadress</th>
                            <th width="10%">Tegevused</th>
                        </tr>
                        </thead>
                        <tbody>
                        {eventList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
// export default withCookies(withRouter(EventList));
export default withCookies(withRouter(EventList));