import React, {Component} from 'react';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import {deleteUsersFavoriteGame, getFullCurrentUserData, updateUser} from '../../apiUtil/userApi'
import UserSettingsForm from "../../components/UserSettingsForm/UserSettingsForm";
import classes from './UserSettings.module.css';
import withRouter from "react-router-dom/es/withRouter";

class UserSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            addressLine: "",
            city: "",
            postcode: "",
            countrycode: "",
            isLoading: true,
            address: {},
            categories: [],
            favoriteGames: [],
            boardgames: false,
            cardgames: false,
            tilegames: false,
            roleplaying: false,
            miniatures: false,
            classical: false,
            dicegames: false,
            allOptionOn: false,
            categoriesTouched: false,
            gameField: ""
        };
    }

    initCategories(categories) {
        categories.forEach(cat => {
            switch (cat.name) {
                case "BOARDGAMES":
                    this.setState({boardgames: true});
                    break;
                case "CARDGAMES":
                    this.setState({cardgames: true});
                    break;
                case "TILEGAMES":
                    this.setState({tilegames: true});
                    break;
                case "ROLEPLAYING":
                    this.setState({roleplaying: true});
                    break;
                case "MINIATURES":
                    this.setState({miniatures: true});
                    break;
                case "CLASSICAL":
                    this.setState({classical: true});
                    break;
                case "DICEGAMES":
                    this.setState({dicegames: true});
                    break;
            }
        });
    }

    componentDidMount() {
        this.setState({isLoading: true});

        getFullCurrentUserData()
            .then(data => {
                console.log(data);
                this.setState({
                    username: data.username,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    addressLine: data.address.addressLine,
                    city: data.address.city,
                    postcode: data.address.postcode,
                    countrycode: data.address.countrycode,
                    categories: data.categories,
                    allOptionOn: !data.categories.length,
                    isLoading: false});
                if (data.categories.length > 0){
                    this.initCategories(data.categories);
                }
                if (data.favoriteGames.length > 0) {
                    let favGames = [];
                    data.favoriteGames.forEach(game => {
                        favGames.push(game.name);
                    });
                    this.setState({favoriteGames: favGames});
                }
            });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    onOptionClick = (optionObject) => {
        this.setState({ selectedOption: optionObject });

        if (optionObject.option === "ALL") {
            let cachedEvents = this.state.cachedEvents;
            this.setState({events: cachedEvents});
        } else {
            const events = this.state.cachedEvents;
            const updatedEvents = events.filter(function (event) {
                const categories = event.categories;
                let match = false;
                if (categories) {
                    categories.forEach(category => {
                        if (category.name === optionObject.option) {
                            match = true;
                            return match;
                        }
                    });
                }
                return match;
            });
            this.setState({events: updatedEvents});
        }
    };

    categoryClicked = (category) => {
        switch (category) {
            case "ALL":
                if (this.state.allOptionOn) {
                    this.setState({allOptionOn: false});
                } else {
                    this.setState({allOptionOn: true});
                    this.setState({boardgames: false});
                    this.setState({cardgames: false});
                    this.setState({tilegames: false});
                    this.setState({roleplaying: false});
                    this.setState({miniatures: false});
                    this.setState({classical: false});
                    this.setState({dicegames: false});
                }
                break;
            case "BOARDGAMES":
                this.setState({boardgames: !this.state.boardgames});
                break;
            case "CARDGAMES":
                this.setState({cardgames: !this.state.cardgames});
                break;
            case "TILEGAMES":
                this.setState({tilegames: !this.state.tilegames});
                break;
            case "ROLEPLAYING":
                this.setState({roleplaying: !this.state.roleplaying});
                break;
            case "MINIATURES":
                this.setState({miniatures: !this.state.miniatures});
                break;
            case "CLASSICAL":
                this.setState({classical: !this.state.classical});
                break;
            case "DICEGAMES":
                this.setState({dicegames: !this.state.dicegames});
                break;
        }
        if (category !== "ALL" && this.state.allOptionOn) {
            this.setState({allOptionOn: false});
        }
    };

    handleSubmit = () => {
        const categories = [];

        if (this.state.boardgames) {
            categories.push("BOARDGAMES");
        }
        if (this.state.cardgames) {
            categories.push("CARDGAMES");
        }
        if (this.state.classical) {
            categories.push("CLASSICAL");
        }
        if (this.state.dicegames) {
            categories.push("DICEGAMES");
        }
        if (this.state.roleplaying) {
            categories.push("ROLEPLAYING");
        }
        if (this.state.miniatures) {
            categories.push("MINIATURES");
        }
        if (this.state.tilegames) {
            categories.push("TILEGAMES");
        }

        const favoriteGames = [];

        this.state.favoriteGames.forEach(game => favoriteGames.push({"name": game, "description": ""}));


        updateUser(this.props.currentUser.id, {
            "username": this.state.username,
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "address": {
                "addressLine": this.state.addressLine,
                "city": this.state.city,
                "postcode": this.state.postcode,
                "countrycode": this.state.countrycode
            },
            "categories": categories,
            "favoriteGames": favoriteGames
        }).then(result => {
            console.log("Post was success! " + result)
        }).catch(error => {
            console.log(error);
        });
        this.props.history.push('/');
    };

    handleGameSubmit = () => {
        const game = this.state.gameField;
        const faveGames = {...this.state.favoriteGames};
        let games = [];
        for (let key in faveGames) {
            games.push(faveGames[key]);
        }
        if (!games.includes(game)){
            games.push(game);
        }
        this.setState({favoriteGames: games});
        this.setState({gameField: ""});
    };

    handleGameRemoval = (removableGame) => {
        const faveGames = {...this.state.favoriteGames};
        let games = [];
        for (let key in faveGames) {
            games.push(faveGames[key]);
        }
        if (games.includes(removableGame)){
            games.splice(games.indexOf(removableGame), 1);
        }
        this.setState({favoriteGames: games});

        deleteUsersFavoriteGame(removableGame)
            .then(result => {
                console.log("Post was success! " + result)
            }).catch(error => {
                console.log(error);
        });
    };

    render() {
        return (
            <BodyBackgroundColor backgroundColor='#eee2dc'>
                <div>
                    <div className="row justify-content-center">
                        <div className={classes.SettingsForm}>
                            <UserSettingsForm
                                onCategoryClick={this.categoryClicked}
                                addressLine={this.state.addressLine}
                                city={this.state.city}
                                postcode={this.state.postcode}
                                countrycode={this.state.countrycode}
                                favoriteGames={this.state.favoriteGames}
                                username={this.state.username}
                                firstname={this.state.firstname}
                                lastname={this.state.lastname}
                                handleChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                isLoading={this.state.isLoading}
                                boardgames={this.state.boardgames}
                                cardgames={this.state.cardgames}
                                classical={this.state.classical}
                                dicegames={this.state.dicegames}
                                miniatures={this.state.miniatures}
                                roleplaying={this.state.roleplaying}
                                tilegames={this.state.tilegames}
                                allgames={this.state.allOptionOn}
                                gameSubmit={this.handleGameSubmit}
                                gameField={this.state.gameField}
                                removed={this.handleGameRemoval}
                            />
                        </div>
                    </div>
                </div>
            </BodyBackgroundColor>
        );
    };
}

export default withRouter(UserSettings);