import {AvField, AvForm} from "availity-reactstrap-validation";
import { Button } from "reactstrap";
import React from 'react';
import classes from './UserSettingsForm.module.css';
import CustomButton from '../UI/Button/Button';

const userSettingsForm = (props) => {

    const favoriteGames = props.favoriteGames.map(game => {
        return <div key={game} className={classes.FavoriteGameCard}>
            <div className={classes.Text}>{game}</div>
            <button className={classes.Remove} onClick={() => props.removed(game)}>X</button>
        </div>
    });

    return (
        <AvForm>
            <AvField
                autoFocus
                name="username"
                label="Kasutajanimi:"
                value={props.username}
                onChange={props.handleChange}
                errorMessage="Kasutajanime pikkus võib olla 3-20 tähemärki"
                validate={{
                    required: {value: false},
                    pattern: {value: '^[A-Za-z0-9]+$'},
                    minLength: {value: 3},
                    maxLength: {value: 20}
                }}
            />
            <AvField
                name="firstname"
                label="Eesnimi:"
                value={props.firstname}
                onChange={props.handleChange}
                errorMessage="Eesnimi peab olema vähemalt 2 tähemärki ning ei sisalda numbreid"
                validate={{
                    required: {value: false},
                    pattern: {value: '^[A-Za-z]+$'},
                    minLength: {value: 2},
                    maxLength: {value: 20}
                }}
            />
            <AvField
                name="lastname"
                label="Perekonnanimi:"
                value={props.lastname}
                onChange={props.handleChange}
                errorMessage="Perekonnanimi peab olema vähemalt 2 tähemärki ning ei sisalda numbreid"
                validate={{
                    required: {value: false},
                    pattern: {value: '^[A-Za-z]+$'},
                    minLength: {value: 2},
                    maxLength: {value: 20}
                }}
            />
            <div>Aadress:</div>
            <div className="row">
                <div className="col-6">
                    <AvField
                        name="addressLine"
                        label="Aadress:"
                        value={props.addressLine}
                        onChange={props.handleChange}
                        errorMessage="Aadress peab olema vähemalt 5 tähemärki"
                        validate={{
                            required: {value: false},
                            pattern: {value: '^[A-Za-z0-9]+$'},
                            minLength: {value: 5},
                            maxLength: {value: 40}
                        }}
                    />
                </div>
                <div className="col-6">
                    <AvField
                        name="city"
                        label="Linn:"
                        value={props.city}
                        onChange={props.handleChange}
                        errorMessage="Linn peab olema vähemalt 2 tähemärki"
                        validate={{
                            required: {value: false},
                            pattern: {value: '^[A-Za-z]+$'},
                            minLength: {value: 2},
                            maxLength: {value: 20}
                        }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <AvField
                        name="postcode"
                        label="Postikood:"
                        value={props.postcode}
                        onChange={props.handleChange}
                        errorMessage="Postikood peab olema 5 tähemärki pikk"
                        validate={{
                            required: {value: false},
                            pattern: {value: '^[A-Za-z0-9]+$'},
                            minLength: {value: 5},
                            maxLength: {value: 5}
                        }}
                    />
                </div>
                <div className="col-6">
                    <AvField
                        name="countrycode"
                        label="Riik:"
                        value={props.countrycode}
                        onChange={props.handleChange}
                        errorMessage="Riik peab olema 3 tähemärki hetkel"
                        validate={{
                            required: {value: false},
                            pattern: {value: '^[A-Za-z]+$'},
                            minLength: {value: 3},
                            maxLength: {value: 3}
                        }}
                    />
                </div>
            </div>
            <div>Lemmikud mängukategooriad:</div>
            <div className="row">
                <div className="col-auto - variable width content">
                    <CustomButton btnType={props.allgames?"ActiveCategory":"InactiveCategory"} categoryClicked={(e) => props.onCategoryClick("ALL")}>
                        <span className={classes.CategoryTitleAll}>KÕIK</span>
                    </CustomButton>
                </div>
                <div className="col-auto - variable width content">
                    <CustomButton btnType={props.boardgames?"ActiveCategory":"InactiveCategory"} categoryClicked={(e) => props.onCategoryClick("BOARDGAMES")}>
                        <img className={classes.CategoryImage} src={window.location.origin + '/img/BOARDGAMES.svg'} alt=""/>
                        <span className={classes.CategoryTitle}>LAUAMÄNGUD</span>
                    </CustomButton>
                </div>
                <div className="col-auto - variable width content">
                    <CustomButton btnType={props.cardgames?"ActiveCategory":"InactiveCategory"} categoryClicked={(e) => props.onCategoryClick("CARDGAMES")}>
                        <img className={classes.CategoryImage} src={window.location.origin + '/img/CARDGAMES.svg'} alt=""/>
                        <span className={classes.CategoryTitle}>KAARDIMÄNGUD</span>
                    </CustomButton>
                </div>
                <div className="col-auto - variable width content">
                    <CustomButton btnType={props.classical?"ActiveCategory":"InactiveCategory"} categoryClicked={(e) => props.onCategoryClick("CLASSICAL")}>
                        <img className={classes.CategoryImage} src={window.location.origin + '/img/CLASSICAL.svg'} alt=""/>
                        <span className={classes.CategoryTitle}>KLASSIKALISED MÄNGUD</span>
                    </CustomButton>
                </div>
                <div className="col-auto - variable width content">
                    <CustomButton btnType={props.dicegames?"ActiveCategory":"InactiveCategory"} categoryClicked={(e) => props.onCategoryClick("DICEGAMES")}>
                        <img className={classes.CategoryImage} src={window.location.origin + '/img/DICEGAMES.svg'} alt=""/>
                        <span className={classes.CategoryTitle}>TÄRINGUMÄNGUD</span>
                    </CustomButton>
                </div>
                <div className="col-auto - variable width content">
                    <CustomButton btnType={props.miniatures?"ActiveCategory":"InactiveCategory"} categoryClicked={(e) => props.onCategoryClick("MINIATURES")}>
                        <img className={classes.CategoryImage} src={window.location.origin + '/img/MINIATURES.svg'} alt=""/>
                        <span className={classes.CategoryTitle}>MINIATUURIMÄNGUD</span>
                    </CustomButton>
                </div>
                <div className="col-auto - variable width content">
                    <CustomButton btnType={props.roleplaying?"ActiveCategory":"InactiveCategory"} categoryClicked={(e) => props.onCategoryClick("ROLEPLAYING")}>
                        <img className={classes.CategoryImage} src={window.location.origin + '/img/ROLEPLAYING.svg'} alt=""/>
                        <span className={classes.CategoryTitle}>ROLLIMÄNGUD</span>
                    </CustomButton>
                </div>
                <div className="col-auto - variable width content">
                    <CustomButton btnType={props.tilegames?"ActiveCategory":"InactiveCategory"} categoryClicked={(e) => props.onCategoryClick("TILEGAMES")}>
                        <img className={classes.CategoryImage} src={window.location.origin + '/img/TILEGAMES.svg'} alt=""/>
                        <span className={classes.CategoryTitle}>"TILE" MÄNGUD</span>
                    </CustomButton>
                </div>
            </div>
            <div>Lemmikud mängud:</div>
            {favoriteGames}
            <div className="row">
                <AvForm className={classes.GameForm}>
                    <div className="col-9">
                    <AvField
                        name="gameField"
                        onChange={props.handleChange}
                        value={props.gameField}
                        errorMessage="Mäng peab olema vähemalt 5 tähemärki"
                        validate={{
                            required: {value: false},
                            pattern: {value: '^[A-Za-z0-9]+$'},
                            minLength: {value: 5},
                            maxLength: {value: 25}
                        }}
                    />
                    </div>
                    <div className="col-2">
                    <Button onClick={props.gameSubmit}>
                        LISA
                    </Button>
                    </div>
                </AvForm>
            </div>
            <div className="row">
                <Button className={classes.SubmitForm} onClick={props.onSubmit}>
                    KINNITA MUUDATUSED
                </Button>
            </div>
        </AvForm>
    );
};

export default userSettingsForm;