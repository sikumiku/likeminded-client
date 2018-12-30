import React from 'react';
import { Button } from "reactstrap";
import classes from './EventCreationConfirmation.module.css';
import Aux from '../../../../hoc/Auxilliary/Auxilliary';
import CustomButton from '../../../UI/Button/Button'

const eventCreationConfirmation = (props) => {
    let form = null;
    let button = null;

    if (!props.hidden) {
        let maxParticipants = null;
        if (!props.unlimitedParticipants) {
            maxParticipants = <p className="card-text"><strong>Maksimum külaliste arv:</strong> {props.maxParticipants}</p>;
        }

        let boardgameButton = null;
        if (props.boardGameCat) {
            boardgameButton =  <div className="col-auto - variable width content">
                <CustomButton btnType="InactiveCategory">
                    <img className={classes.CategoryImage} src={window.location.origin + '/img/BOARDGAMES.svg'} alt=""/>
                    <span className={classes.CategoryTitle}>LAUAMÄNGUD</span>
                </CustomButton>
            </div>
        }

        let cardgameButton = null;
        if (props.cardGameCat) {
            cardgameButton = <div className="col-auto - variable width content">
                    <CustomButton btnType="InactiveCategory">
                        <img className={classes.CategoryImage} src={window.location.origin + '/img/CARDGAMES.svg'} alt=""/>
                        <span className={classes.CategoryTitle}>KAARDIMÄNGUD</span>
                    </CustomButton>
                </div>
        }

        let classicalButton = null;
        if (props.classicalCat) {
            classicalButton = <div className="col-auto - variable width content">
                <CustomButton btnType="InactiveCategory">
                    <img className={classes.CategoryImage} src={window.location.origin + '/img/CLASSICAL.svg'} alt=""/>
                    <span className={classes.CategoryTitle}>KLASSIKALISED MÄNGUD</span>
                </CustomButton>
            </div>
        }

        let miniatureButton = null;
        if (props.miniatureCat) {
            miniatureButton = <div className="col-auto - variable width content">
                <CustomButton btnType="InactiveCategory">
                    <img className={classes.CategoryImage} src={window.location.origin + '/img/MINIATURES.svg'} alt=""/>
                    <span className={classes.CategoryTitle}>MINIATUURIMÄNGUD</span>
                </CustomButton>
            </div>
        }

        let roleplayingButton = null;
        if (props.roleplayingCat) {
            roleplayingButton = <div className="col-auto - variable width content">
                <CustomButton btnType="InactiveCategory">
                    <img className={classes.CategoryImage} src={window.location.origin + '/img/ROLEPLAYING.svg'} alt=""/>
                    <span className={classes.CategoryTitle}>ROLLIMÄNGUD</span>
                </CustomButton>
            </div>
        }

        let tilegameButton = null;
        if (props.tileGameCat) {
            tilegameButton = <div className="col-auto - variable width content">
                <CustomButton btnType={props.tilegames?"ActiveCategory":"InactiveCategory"}>
                    <img className={classes.CategoryImage} src={window.location.origin + '/img/TILEGAMES.svg'} alt=""/>
                    <span className={classes.CategoryTitle}>"TILE" MÄNGUD</span>
                </CustomButton>
            </div>
        }

        let dicegameButton = null;
        if (props.diceGameCat) {
            dicegameButton = <div className="col-auto - variable width content">
                <CustomButton btnType="InactiveCategory">
                    <img className={classes.CategoryImage} src={window.location.origin + '/img/DICEGAMES.svg'} alt=""/>
                    <span className={classes.CategoryTitle}>TÄRINGUMÄNGUD</span>
                </CustomButton>
            </div>
        }

        let renderedStartTime = "";
        if (props.startDate && props.startTime) {
            const hours = props.startTime.getHours();
            const minutes = props.startTime.getMinutes();
            const day = props.startDate.getDate();
            const month = props.startDate.getMonth() + 1;
            const year = props.startDate.getFullYear();
            let hourZero = "";
            if (props.startTime.getHours()<10) {
                hourZero = "0";
            }
            let minuteZero = "";
            if (props.startTime.getMinutes()<10) {
                minuteZero = "0";
            }
            renderedStartTime = hourZero + hours + ":" + minuteZero + minutes + " " + day + "/" + month + "/" + year;
        }

        let renderedEndTime = "";
        if (props.endDate && props.endTime) {
            const hours = props.endTime.getHours();
            const minutes = props.endTime.getMinutes();
            const day = props.endDate.getDate();
            const month = props.endDate.getMonth() + 1;
            const year = props.endDate.getFullYear();
            let hourZero = "";
            if (props.endTime.getHours()<10) {
                hourZero = "0";
            }
            let minuteZero = "";
            if (props.endTime.getMinutes()<10) {
                minuteZero = "0";
            }
            renderedEndTime = hourZero + hours + ":" + minuteZero + minutes + " " + day + "/" + month + "/" + year;
        }

        let imageSrc = window.location.origin + '/img/event_placeholder.svg';
        if (props.picture) {
            imageSrc = props.picture
        }

        form = (
            <div>
                <div className={classes.ImageTitle}>Loodava ürituse kinnitamine</div>
                <div className={classes.Container}>
                    <div id="panel-body" className={classes.ConfirmationPanel}>
                        <div className="row">
                            <div className="col">
                                <p className="card-text"><strong>Nimi:</strong><br/>{props.name} </p>
                                <p className="card-text"><strong>Kirjeldus:</strong><br/>{props.description}</p>
                                <p className="card-text"><strong>Aadress:</strong><br/>{props.address.addressLine} {props.address.city} {props.address.postcode}</p>
                                <p className="card-text"><strong>Avatud üritus:</strong> {props.openToPublic?'Jah':'Ei'} </p>
                                <p className="card-text"><strong>Piiramatu külaliste arv:</strong> {props.unlimitedParticipants?'Jah':'Ei'} </p>
                                {maxParticipants}
                                <p className="card-text"><strong>Mängukategooriad:</strong><br/>
                                    <div className="row">
                                        {/*allGames*/}
                                        {boardgameButton}
                                        {cardgameButton}
                                        {classicalButton}
                                        {miniatureButton}
                                        {roleplayingButton}
                                        {tilegameButton}
                                        {dicegameButton}
                                    </div>
                                </p>
                                <p className="card-text"><strong>Algusaeg:</strong><br/>{renderedStartTime}</p>
                                <p className="card-text"><strong>Lõppaeg:</strong><br/>{renderedEndTime}</p>
                            </div>
                            <div className="col col-lg-4">
                                <img className={classes.Picture} src={imageSrc} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
        button = <Button block onClick={props.onClick}>KINNITA</Button>
    }

    return (
        <Aux>
            <div className={classes.EventCreationConfirmation}>
                {form}
            </div>
            {button}
        </Aux>
    );
};

export default eventCreationConfirmation;