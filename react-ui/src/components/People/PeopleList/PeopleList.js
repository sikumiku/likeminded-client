import React from 'react';
import { Button } from "reactstrap";
import classes from './PeopleList.module.css';

const peopleList = (props) => {

    const peopleList = props.people.map(person => {

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

        const categories = person.categories;
        categoryList = categories.length?categories.map(category => {
            let categoryName=category.name;
            return <img key={category.name} style={{left: "0px", width: '35px', height: '35px', margin: "0px 5px 0px 5px"}} src={window.location.origin + '/img/' + categoryName + '.svg'} alt={category.description}/>;
        }):categoryList;
        let name = "";
        if (person.firstname && person.lastname) {
            name = person.firstname + " " + person.lastname
        }

        const favoriteGames = person.favoriteGames;
        let gameNames = "";
        favoriteGames.forEach(favGame => {
           gameNames += favGame.name;
           gameNames += ", ";
        });
        gameNames = gameNames.substr(0, gameNames.length-2);

        return (
            <div style={{margin: "10px"}} className="card" key={person.id}>
                <h4 id="panel-heading" className="card-header">
                    <a className="panel-heading" href="/">{person.username}</a>
                </h4>
                <div id="panel-body" className="card-body">
                    <div className="row">
                        <div className="col col-lg-2">
                            <img className="card-img-top" src={window.location.origin + '/img/event_placeholder.svg'} alt=""/>
                        </div>
                        <div className="col">
                            <p className="card-text">Nimi: {name}</p>
                            <p className="card-text">Lemmikud mängud: {gameNames}</p>
                        </div>
                        <div className="col col-lg-3">
                            <p className="card-text text-right" >
                                {person.address.city!==""?"Asukoht: " + person.address.city:""}
                            </p>
                            <div className="event-button-right">
                                <Button>
                                    KUTSU GRUPPI
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.PeopleListCategories}>
                {categoryList}
                </div>
            </div>
        );

    });

    return (
        <div className="col-lg-9">
            <div className="row">

                <div className="col-lg-12 col-md-6 mb-4">
                    {props.isLoading?<p>Loading...</p>:(!props.people.length?<p>No people to show.</p>:peopleList)}
                </div>
            </div>
        </div>
    );
};

export default peopleList;