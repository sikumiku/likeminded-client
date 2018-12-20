import React, {Component} from 'react';
import classes from './EventCreationTracker.module.css'
import NavigationItem from '../../Navigation/NavigationItem/NavigationItem';
import NavLink from "react-router-dom/es/NavLink";

class EventCreationTracker extends Component {

    renderRow() {
        return (
            <div className={classes.row}>
                <div className={classes.timeline}>
                    <div className={classes.dot} />
                    <div className={classes.line}/>
                </div>
                <div className={classes.content}>
                    <NavLink to="/events/createEvent1">Some text</NavLink>
                    <NavLink to="/events/createEvent2">Some text</NavLink>
                    <NavLink to="/events/createEvent3">Some text</NavLink>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className="col-lg-3">
                <h1 className={classes.Heading} style={{color: "#9c3159"}}>ÜRITUSE LOOMINE</h1>
                <ul>
                    <NavigationItem link="/myEvents">
                        Minu üritused
                    </NavigationItem>
                    <NavigationItem link="/events" exact>
                        Kõik üritused
                    </NavigationItem>
                </ul>
                <div className={classes.container}>
                    <div className={classes.listView}/>
                    <div className={classes.row}>
                        <div className={classes.timeline}>
                            {this.props.activePage !== "eventDetails"?<div className={classes.dot} />:<div className={classes.dotActive} /> }
                            <div className={classes.line}/>
                        </div>
                        <div className={classes.content}>
                            <div>Ürituse detailid</div>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.timeline}>
                            {this.props.activePage !== "eventPicture"?<div className={classes.dot} />:<div className={classes.dotActive} /> }
                            <div className={classes.line}/>
                        </div>
                        <div className={classes.content}>
                            <div>Pilt</div>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.timeline}>
                            {this.props.activePage !== "eventConfirmation"?<div className={classes.dot} />:<div className={classes.dotActive} /> }
                            <div className={classes.line}/>
                        </div>
                        <div className={classes.content}>
                            <div>Kinnitamine</div>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.timeline}>
                            <div className={classes.dot} />
                            <div className={classes.line}/>
                        </div>
                        <div className={classes.content}>
                            <div>Osalejate kutsumine</div>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.timeline}>
                            <div className={classes.dot} />
                            <div className={classes.line}/>
                        </div>
                        <div className={classes.content}>
                            <div>Korduva ürituse sätted</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventCreationTracker;