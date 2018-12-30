import React from 'react';
import { Button } from "reactstrap";
import classes from './GroupCreationInvite.module.css';
import Aux from '../../../../hoc/Auxilliary/Auxilliary';
import CustomButton from '../../../UI/Button/Button'
import Filter from "../../../People/Filter/Filter";
import user_icon from "../../../../resources/user_icon.png";

const groupCreationInvite = (props) => {
    let form = null;
    let button = null;

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
                <div className={classes.Title}>Gruppi inimeste kutsumine</div>
                <div className={classes.Container}>
                    <div id="panel-body" className={classes.ConfirmationPanel}>
                        <div className="row">
                            <div className="col">
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
            <div className={classes.GroupCreationInvite}>
                {form}
            </div>
            {button}
        </Aux>
    );
};

export default groupCreationInvite;