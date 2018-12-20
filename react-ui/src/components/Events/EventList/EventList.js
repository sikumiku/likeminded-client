import React from 'react';
import Button from "react-bootstrap/es/Button";
import classes from "./EventList.module.css";

const eventList = (props) => {

    const eventList = props.events.map(event => {
        // const address = event.address;
        let addressLine = "";
        let city = "";
        let postcode = "";
        let countryCode = "";

        const fullCategories = [
            {
                name: "BOARDGAMES",
                description: "Lauamängud"
            },
            {
                name: "CARDGAMES",
                description: "Kaardimängud"
            },
            {
                name: "CLASSICAL",
                description: "Klassikalised mängud"
            },
            {
                name: "DICEGAMES",
                description: "Täringumängud"
            },
            {
                name: "MINIATURES",
                description: "Miniatuurimängud"
            },
            {
                name: "ROLEPLAYING",
                description: "Rollimängud"
            },
            {
                name: "TILEGAMES",
                description: "'Tile' mängud"
            }
        ];
        let categoryList = fullCategories.map(cat => {
            return <img key={cat.name} style={{left: "0px", width: '35px', height: '35px', margin: "0px 5px 0px 5px"}} src={window.location.origin + '/img/' + cat.name + '.svg'} alt={cat.description}/>
        });

        const categories = event.categories;
        categoryList = categories.length?categories.map(category => {
            return <img key={category.name} style={{left: "0px", width: '35px', height: '35px', margin: "0px 5px 0px 5px"}} src={window.location.origin + '/img/' + category.name + '.svg'} alt={category.description}/>;
        }):categoryList;

        // if (address !== null) {
        //     addressLine = address.addressLine;
        //     city = address.city;
        //     postcode = address.postCode;
        //     countryCode = address.countryCode;
        // }
        return (
            <div style={{margin: "10px"}} className="card" key={event.id}>
                <h4 id="panel-heading" className="card-header">
                    <a className="panel-heading" href="/">{event.name}</a>
                </h4>
                <div id="panel-body" className="card-body">
                    <div className="row">
                        <div className="col col-lg-2">
                            <img className="card-img-top" src={window.location.origin + '/img/event_placeholder.svg'} alt=""/>
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
                <div className={classes.EventListCategories}>
                    {categoryList}
                </div>
            </div>
        );

    });

    return (
        <div className="col-lg-9">
            <div className="row">

                <div className="col-lg-12 col-md-6 mb-4">
                    {props.isLoading?<p>Loading...</p>:(!props.events.length?<p>No events to show.</p>:eventList)}
                </div>
            </div>
        </div>
    );
};

export default eventList;