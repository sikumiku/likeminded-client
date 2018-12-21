import React from 'react';
import Button from 'react-bootstrap/es/Button';
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
            return <img style={{left: "0px", width: '35px', height: '35px', margin: "0px 5px 0px 5px"}} src={window.location.origin + '/img/' + cat.name + '.svg'} alt={cat.description}/>
        });

        const categories = person.categories;
        categoryList = categories.length?categories.map(category => {
            let categoryName=category.name;
            return <img style={{left: "0px", width: '35px', height: '35px', margin: "0px 5px 0px 5px"}} src={window.location.origin + '/img/' + categoryName + '.svg'} alt={category.description}/>;
        }):categoryList;
        let name = "";
        if (person.firstname && person.lastname) {
            name = person.firstname + " " + person.lastname
        }

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
                        </div>
                        <div className="col col-lg-3">

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