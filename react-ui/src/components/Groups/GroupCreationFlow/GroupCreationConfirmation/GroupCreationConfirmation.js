import React from 'react';
import { Button } from "reactstrap";
import classes from './GroupCreationConfirmation.module.css';
import Aux from '../../../../hoc/Auxilliary/Auxilliary';
import CustomButton from '../../../UI/Button/Button'

const groupCreationConfirmation = (props) => {
    let form = null;
    let button = null;

    if (!props.hidden) {
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

        let imageSrc = window.location.origin + '/img/event_placeholder.svg';
        if (props.picture) {
            imageSrc = props.picture
        }

        form = (
            <div>
                <div className={classes.ImageTitle}>Loodava grupi kinnitamine</div>
                <div className={classes.Container}>
                    <div id="panel-body" className={classes.ConfirmationPanel}>
                        <div className="row">
                            <div className="col">
                                <p className="card-text"><strong>Nimi:</strong><br/>{props.name} </p>
                                <p className="card-text"><strong>Kirjeldus:</strong><br/>{props.description}</p>
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
            <div className={classes.GroupCreationConfirmation}>
                {form}
            </div>
            {button}
        </Aux>
    );
};

export default groupCreationConfirmation;