import React from 'react';
import { Button } from "reactstrap";
import classes from './EventCreationInvite.module.css';
import Aux from '../../../../hoc/Auxilliary/Auxilliary';
import CustomButton from '../../../UI/Button/Button'
import Filter from "../../../People/Filter/Filter";
import user_icon from "../../../../resources/user_icon.png";

const eventCreationInvite = (props) => {
    let form = null;
    let button = null;

    let groupList = "Sa ei ole hetkel üheski grupis.";

    if (props.groups) {
        groupList = props.groups.map(group => {

            return (
                <CustomButton key={group.id} btnType={group.active?"ActiveCategory":"InactiveCategory"} buttonClicked={(e) => props.groupClicked(group)}>
                    <img className={classes.CategoryImage} src="" alt=""/>
                    <span className={classes.CategoryTitle}>{group.name}</span>
                </CustomButton>
            );
        });
    }

    let peopleList = null;

    if (props.people) {
        peopleList = props.people.map(person => {

            return (
                <CustomButton key={person.id} btnType={person.active?"ActiveCategory":"InactiveCategory"}  buttonClicked={(e) => props.userClicked(person)}>
                    <img className={classes.UserImage} src={user_icon} alt=""/>
                    <span className={classes.CategoryTitle}>{person.username}</span>
                </CustomButton>
            );

        });
    }

    if (!props.hidden) {
        form = (
            <div>
                <div className={classes.Title}>Osalejate kutsumine</div>
                <div className={classes.Container}>
                    <div id="panel-body" className={classes.ConfirmationPanel}>
                        <div className="row">
                            <div className="col">
                                <p className="card-text" style={{textAlign: "center"}}><strong>Grupid:</strong></p>
                                {groupList}
                                <p className="card-text" style={{textAlign: "center"}}><strong>Otsi inimesi:</strong><br/>
                                </p>
                                <Filter filter={props.filterByName} label="Otsi inimesi nime järgi:"/><br/>
                                {/*Otsingunupp*/}
                                {peopleList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
        button = <Button block onClick={props.onClick}>KUTSU</Button>
    }

    return (
        <Aux>
            <div className={classes.EventCreationInvite}>
                {form}
            </div>
            {button}
        </Aux>
    );
};

export default eventCreationInvite;