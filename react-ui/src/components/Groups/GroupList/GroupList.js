import React from 'react';
import Button from "react-bootstrap/es/Button";
import classes from './GroupList.module.css';

const groupList = (props) => {

    const groupList = props.groups.map(group => {

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

        const categories = group.categories;
        categoryList = categories.length?categories.map(category => {
            let categoryName=category.name;
            return <img style={{left: "0px", width: '35px', height: '35px', margin: "0px 5px 0px 5px"}} src={window.location.origin + '/img/' + categoryName + '.svg'} alt={category.description}/>;
        }):categoryList;

        return (
            <div style={{margin: "10px"}} className="card" key={group.id}>
                <h4 id="panel-heading" className="card-header">
                    <a className="panel-heading" href="/">{group.name}</a>
                </h4>
                <div id="panel-body" className="card-body">
                    <div className="row">
                        <div className="col col-lg-2">
                            <img className="card-img-top" src={window.location.origin + '/img/event_placeholder.svg'} alt=""/>
                        </div>
                        <div className="col">
                            <p className="card-text">Kirjeldus: {group.description}</p>
                        </div>
                        <div className="col col-lg-3">

                            <div className="event-button-right">
                                <Button>
                                    LIITU
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.GroupListCategories}>
                    {categoryList}
                </div>
            </div>
        );

    });

    return (
        <div className="col-lg-9">
            <div className="row">

                <div className="col-lg-12 col-md-6 mb-4">
                    {props.isLoading?<p>Loading...</p>:(!props.groups.length?<p>No groups to show.</p>:groupList)}
                </div>
            </div>
        </div>
    );
};

export default groupList;