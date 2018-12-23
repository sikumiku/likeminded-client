import React from 'react';
import { Button } from "reactstrap";
import classes from "./EventList.module.css";

const eventList = (props) => {

    const eventList = props.events.map(event => {
        const address = event.address;
        let addressLine = "";
        let city = "";
        let postcode = "";
        let countryCode = "";

        //improve time rendering to be 12:00 - 14:00 startDate (if endDate is same day)

        let timeSplitter = "";

        let renderedStartTime = "";
        if (event.eventTimes.length > 0) {
            timeSplitter = "-";
            const time = new Date(event.eventTimes[0].startDateTime);
            const hours = time.getHours();
            const minutes = time.getMinutes();
            const day = time.getDate();
            const month = time.getMonth() + 1;
            const year = time.getFullYear();
            let hourZero = "";
            if (time.getHours()<10) {
                hourZero = "0";
            }
            let minuteZero = "";
            if (time.getMinutes()<10) {
                minuteZero = "0";
            }
            renderedStartTime = hourZero + hours + ":" + minuteZero + minutes + " " + day + "/" + month + "/" + year;
        }

        let renderedEndTime = "";
        if (event.eventTimes.length > 0) {
            const time = new Date(event.eventTimes[0].endDateTime);
            const hours = time.getHours();
            const minutes = time.getMinutes();
            const day = time.getDate();
            const month = time.getMonth() + 1;
            const year = time.getFullYear();
            let hourZero = "";
            if (time.getHours()<10) {
                hourZero = "0";
            }
            let minuteZero = "";
            if (time.getMinutes()<10) {
                minuteZero = "0";
            }
            renderedEndTime = hourZero + hours + ":" + minuteZero + minutes + " " + day + "/" + month + "/" + year;
        }

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

        if (address !== null) {
            addressLine = address.addressLine;
            city = address.city;
            postcode = address.postcode;
            countryCode = address.country;
        }

        let maxParticipantNumberField = null;
        if (!event.unlimitedParticipants) {
            maxParticipantNumberField = <p className="card-text">Max osalejate arv: {event.maxParticipants}</p>
        }

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
                            {maxParticipantNumberField}
                        </div>
                        <div className="col col-lg-3">
                            <p className="card-text text-right" >
                                {renderedStartTime} {timeSplitter} {renderedEndTime}
                            </p>
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