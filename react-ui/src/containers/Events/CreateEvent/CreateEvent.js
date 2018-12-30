import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import EventCreationTracker from '../../../components/Events/EventCreationTracker/EventCreationTracker'
import EventCreationDetails from '../../../components/Events/EventCreationFlow/EventCreationDetails/EventCreationDetails';
import EventCreationPicture from '../../../components/Events/EventCreationFlow/EventCreationPicture/EventCreationPicture';
import EventCreationConfirmation from '../../../components/Events/EventCreationFlow/EventCreationConfirmation/EventCreationConfirmation';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './CreateEvent.module.css';
import RadioBooleanInput from '../../../components/UI/RadioInput/RadioInput';
import Checkbox from '../../../components/UI/Checkbox/Checkbox';
import GuestCountField from '../../../components/Events/EventCreationFlow/GuestCountField/GuestCountField';
import {addUsersToEvent, postEvent} from '../../../apiUtil/eventApi';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import { TimePicker } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import format from 'date-fns/format'
import EventCreationInvite from "../../../components/Events/EventCreationFlow/EventCreationInvite/EventCreationInvite";
import {getMyGroups} from "../../../apiUtil/userApi";
import {getPeople} from "../../../apiUtil/peopleApi";

class CreateEvent extends Component {
    state = {
        picture: null,
        selectedStartDate: new Date(),
        selectedEndDate: new Date(),
        selectedStartTime: new Date(),
        selectedEndTime: new Date(),
        eventDetailsForm: {
            name: {
                title:  'Nimi:',
                elementType: 'input',
                elementConfig: {
                    type: 'text'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 30
                },
                valid: false,
                touched: false
            },
            description: {
                title:  'Kirjeldus:',
                elementType: 'textarea',
                elementConfig: {
                    type: 'text'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 200
                },
                valid: false,
                touched: false
            },
            addressLine: {
                title:  'Aadress:',
                elementType: 'input',
                elementConfig: {
                    type: 'text'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 30
                },
                valid: false,
                touched: false
            },
            city: {
                title:  'Linn:',
                elementType: 'input',
                elementConfig: {
                    type: 'text'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 30
                },
                valid: false,
                touched: false
            },
            postcode: {
                title:  'Postikood:',
                elementType: 'input',
                elementConfig: {
                    type: 'text'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            // this should be a dropdown in the end
            countrycode: {
                title:  'Riik:',
                elementType: 'input',
                elementConfig: {
                    type: 'text'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 3
                },
                valid: false,
                touched: false
            }
        },
        eventName: "",
        eventDescription: "",
        openToPublic: true,
        unlimitedParticipants: true,
        maxParticipants: 1,
        categories: [],
        boardgames: true,
        cardgames: true,
        tilegames: true,
        roleplaying: true,
        miniatures: true,
        classical: true,
        dicegames: true,
        categoriesTouched: false,
        inEventDetails: true,
        inEventPicture: false,
        inEventConfirmation: false,
        inEventInvite: false,
        currentPage: "eventDetails",
        formIsValid: false,
        loading: false,
        myGroups: null,
        people: null,
        cachedPeople: null,
        createdEventId: null
    };

    componentDidMount() {
        this.setState({isLoading: true});

        getMyGroups()
            .then(data => {
                this.setState({isLoading: false});
                let fetchedGroups = [];
                for (let key in data) {
                    fetchedGroups.push({
                        ...data[key],
                        active: false
                    })
                }
                this.setState({myGroups: fetchedGroups});
            });

        getPeople()
            .then(data => {
                this.setState({isLoading: false});
                let fetchedPeople = [];
                for (let key in data) {
                    fetchedPeople.push({
                        ...data[key],
                        active: false
                    })
                }
                this.setState({cachedPeople: fetchedPeople, people: fetchedPeople});
            });
    }

    handleOptionChange = (event, name) => {
        switch(name) {
            case "unlimitedParticipants":
                if (event.target.value === "yes") {
                    this.setState({unlimitedParticipants: true});
                } else if (event.target.value === "no") {
                    this.setState({unlimitedParticipants: false});
                }
                break;
            case "openToPublic":
                if (event.target.value === "yes") {
                    this.setState({openToPublic: true});
                } else if (event.target.value === "no") {
                    this.setState({openToPublic: false});
                }
                break;
            default:
                this.setState({unlimitedParticipants: true});
                this.setState({openToPublic: true});
        }
    };

    filterByName = (nameFilter) => {
        let people = this.state.cachedPeople;
        people = people.filter((person) => {
            let personName = "";
            if (person.firstname && person.lastname) {
                personName = person.firstname.toLowerCase() + person.lastname.toLowerCase()
            }
            return personName.indexOf(
                nameFilter.toLowerCase()) !== -1
        });
        this.setState({
            people
        })
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedEventDetailsForm = {
            ...this.state.eventDetailsForm
        };
        const updatedFormElement = {
            ...updatedEventDetailsForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedEventDetailsForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedEventDetailsForm) {
            formIsValid = updatedEventDetailsForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({eventDetailsForm: updatedEventDetailsForm, formIsValid: formIsValid});
    };

    inputChanged = (event) => {
        this.setState({maxParticipants: event.target.value});
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    eventHandler = ( event ) => {
        // event.preventDefault();
        // this.setState( { loading: true } );
        // const formData = {};
        // for (let formElementIdentifier in this.state.eventDetailsForm) {
        //     formData[formElementIdentifier] = this.state.eventDetailsForm[formElementIdentifier].value;
        // }
        // const eventt = {
        //
        // };
        // post data (start using axios?)
    };

    handleSubmit = () => {
        const formData = {};
        for (let formElementIdentifier in this.state.eventDetailsForm) {
            formData[formElementIdentifier] = this.state.eventDetailsForm[formElementIdentifier].value;
        }

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

        const address = {};
        address["addressLine"] = formData.addressLine;
        address["city"] = formData.city;
        address["postcode"] = formData.postcode;
        address["countrycode"] = formData.countrycode;

        postEvent({
            name: formData.name,
            description: formData.description,
            openToPublic: this.state.openToPublic,
            unlimitedParticipants: this.state.unlimitedParticipants,
            maxParticipants: this.state.maxParticipants,
            address: address,
            categories: categories,
            startDate: this.state.selectedStartDate,
            startTime: this.state.selectedStartTime,
            endDate: this.state.selectedEndDate,
            endTime: this.state.selectedEndTime,
            picture: this.state.picture
        }).then(result => {
            console.log("Post was success! " + result)
            this.setState({createdEventId: result.id});
        }).catch(error => {
            console.log(error);
        });
        this.triggerNext("eventConfirmation");
    };

    getBase64 = (file, cb) => {
        let reader = new FileReader();
        if (file && file[0].type.match('image.*')) {
            reader.readAsDataURL(file[0]);
            reader.onload = function () {
                cb(reader.result)
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    };

    triggerNext = (page) => {

        switch (page) {
            case "eventDetails":
                this.setState({inEventDetails: false, inEventPicture: true, inEventConfirmation: false, inEventInvite: false, currentPage: "eventPicture"});
                break;
            case "eventPicture":
                this.setState({inEventPicture: false, inEventConfirmation: true, inEventDetails: false, inEventInvite: false, currentPage: "eventConfirmation"});
                break;
            case "eventConfirmation":
                this.setState({inEventConfirmation: false, inEventInvite: true, inEventPicture: false, inEventDetails: false, currentPage: "eventInvite"});
                break;
            case "eventInvite":
                this.setState({inEventInvite: false, inEventDetails: true, inEventPicture: false, inEventConfirmation: false, currentPage: "eventDetails"});
                break;
            default:
                this.setState({inEventConfirmation: false, inEventPicture: false, inEventDetails: true, inEventInvite: false, currentPage: "eventDetails"});
        }
    };

    changeCategoryWithFalse(category) {
        switch (category){
            case "boardgames":
                this.setState({boardgames: true});
                this.setState({cardgames: false});
                this.setState({tilegames: false});
                this.setState({classical: false});
                this.setState({dicegames: false});
                this.setState({roleplaying: false});
                this.setState({miniatures: false});
                break;
            case "cardgames":
                this.setState({boardgames: false});
                this.setState({cardgames: true});
                this.setState({tilegames: false});
                this.setState({classical: false});
                this.setState({dicegames: false});
                this.setState({roleplaying: false});
                this.setState({miniatures: false});
                break;
            case "tilegames":
                this.setState({boardgames: false});
                this.setState({cardgames: false});
                this.setState({tilegames: true});
                this.setState({classical: false});
                this.setState({dicegames: false});
                this.setState({roleplaying: false});
                this.setState({miniatures: false});
                break;
            case "classical":
                this.setState({boardgames: false});
                this.setState({cardgames: false});
                this.setState({tilegames: false});
                this.setState({classical: true});
                this.setState({dicegames: false});
                this.setState({roleplaying: false});
                this.setState({miniatures: false});
                break;
            case "dicegames":
                this.setState({boardgames: false});
                this.setState({cardgames: false});
                this.setState({tilegames: false});
                this.setState({classical: false});
                this.setState({dicegames: true});
                this.setState({roleplaying: false});
                this.setState({miniatures: false});
                break;
            case "roleplaying":
                this.setState({boardgames: false});
                this.setState({cardgames: false});
                this.setState({tilegames: false});
                this.setState({classical: false});
                this.setState({dicegames: false});
                this.setState({roleplaying: true});
                this.setState({miniatures: false});
                break;
            case "miniatures":
                this.setState({boardgames: false});
                this.setState({cardgames: false});
                this.setState({tilegames: false});
                this.setState({classical: false});
                this.setState({dicegames: false});
                this.setState({roleplaying: false});
                this.setState({miniatures: true});
                break;
            default:
                return;
        }
    }

    changeCategory(category) {
        switch (category){
            case "boardgames":
                this.setState({boardgames: !this.state.boardgames});
                break;
            case "cardgames":
                this.setState({cardgames: !this.state.cardgames});
                break;
            case "tilegames":
                this.setState({tilegames: !this.state.tilegames});
                break;
            case "classical":
                this.setState({classical: !this.state.classical});
                break;
            case "dicegames":
                this.setState({dicegames: !this.state.dicegames});
                break;
            case "roleplaying":
                this.setState({roleplaying: !this.state.roleplaying});
                break;
            case "miniatures":
                this.setState({miniatures: !this.state.miniatures});
                break;
            default:
                return;
        }
    }

    handleCategoryChange = (event) => {
        console.log("time is currently " + this.state.selectedStartTime);
        console.log("date is currently " + this.state.selectedStartDate);
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        console.log("formatting to date " + this.state.selectedStartDate.toLocaleDateString('en-GB', options));
        console.log("formatting to time " + this.state.selectedStartTime.toLocaleTimeString('en-GB', options));
        const incomingKey = event.target.value;
        if (!this.state.categoriesTouched) {
            this.changeCategoryWithFalse(incomingKey);
            this.setState({categoriesTouched: true});
        } else {
            this.changeCategory(incomingKey);
        }
    };

    handleStartDateChange = input => {
        this.setState({ selectedStartDate: input });
    };

    handleStartTimeChange = input => {
        this.setState({ selectedStartTime: input });
    };

    handleEndDateChange = input => {
        this.setState({ selectedEndDate: input });
    };

    handleEndTimeChange = input => {
        this.setState({ selectedEndTime: input });
    };

    onDrop = (picture) => {
        this.getBase64(picture, (result) => {
            this.setState({
                picture: result
            });
        });
    };

    groupClicked = (group) => {
        let groups = [];
        let updatedGroups = [...this.state.myGroups];

        updatedGroups.forEach(updatedGroup => {
            if (updatedGroup.id === group.id) {
                updatedGroup.active = !group.active;
            }
            groups.push(updatedGroup);
        });

        this.setState({myGroups: groups})
    };

    userClicked = (user) => {
        let users = [];
        let updatedUsers = [...this.state.cachedPeople];

        updatedUsers.forEach(updatedUser => {
            if (updatedUser.id === user.id) {
                updatedUser.active = !user.active;
            }
            users.push(updatedUser);
        });

        this.setState({people: users})
    };

    submitUsersAndGroups = () => {
        let userIds = "";
        let groupIds = "";
        this.state.people.forEach(person => {
            if (person.active) {
                userIds = userIds.concat(person.id + ",")
            }
        });
        userIds = userIds.substr(0, userIds.length-1);
        this.state.myGroups.forEach(group => {
            if (group.active) {
                groupIds = groupIds.concat(group.id + ",")
            }
        });
        groupIds = groupIds.substr(0, groupIds.length-1);

        addUsersToEvent(this.state.createdEventId, userIds, groupIds)
            .then(data => {
                console.log("Users added successfully! " + data);
            });
    };

    render() {

        const formData = {};
        for (let formElementIdentifier in this.state.eventDetailsForm) {
            formData[formElementIdentifier] = this.state.eventDetailsForm[formElementIdentifier].value;
        }

        const address = {};
        address["addressLine"] = formData.addressLine;
        address["city"] = formData.city;
        address["postcode"] = formData.postcode;
        address["countrycode"] = formData.countrycode;

        const formElementsArray = [];
        for (let key in this.state.eventDetailsForm) {
            formElementsArray.push({
                id: key,
                config: this.state.eventDetailsForm[key]
            });
        }
        let form = (
            <form className={classes.CreateEventForm} onSubmit={this.eventHandler}>
                {formElementsArray.map(formElement => (
                    <Aux key={formElement.config.title}>
                        <div>{formElement.config.title}</div>
                            <Input
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    </Aux>

                ))}
                <div className="row">
                    <div className="col-4">
                        <div className={classes.FormRow}>
                            <div style={{textAlign: "left", paddingLeft: "20px"}}>Avatud üritus:</div>
                        </div>
                    </div>
                    <RadioBooleanInput name="openToPublic" onChange={this.handleOptionChange}/>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className={classes.FormRow}>
                            <div style={{textAlign: "left", paddingLeft: "20px"}}>Piiramatu külaliste arv:</div>
                        </div>
                    </div>
                    <RadioBooleanInput name="unlimitedParticipants" onChange={this.handleOptionChange}/>
                </div>
                <GuestCountField value={this.state.maxParticipants} show={!this.state.unlimitedParticipants} changed={this.inputChanged}/>
                <div className="row">
                    <div className="col-4">
                        <div className={classes.FormRow}>
                            <div style={{textAlign: "left", paddingLeft: "20px"}}>Ürituse kategooriad:</div>
                        </div>
                    </div>
                    {/*TODO: add allCategories and trigger other checkboxes based on it*/}
                    <div className="col-6">
                        <Checkbox name="category1" value="boardgames" label=" Lauamängud" onChange={this.handleCategoryChange}/>
                        <Checkbox name="category2" value="dicegames" label=" Täringumängud" onChange={this.handleCategoryChange}/>
                        <Checkbox name="category3" value="cardgames" label=" Kaardimängud" onChange={this.handleCategoryChange}/>
                        <Checkbox name="category4" value="classical" label=" Klassikalised mängud" onChange={this.handleCategoryChange}/>
                        <Checkbox name="category5" value="tilegames" label=" 'Tile' mängud" onChange={this.handleCategoryChange}/>
                        <Checkbox name="category6" value="roleplaying" label=" Rollimängud" onChange={this.handleCategoryChange}/>
                        <Checkbox name="category7" value="miniatures" label=" Miniatuurimängud" onChange={this.handleCategoryChange}/>
                    </div>
                </div>

                    <div className="row">
                        <div className="col-4">
                            <div className={classes.FormRow}>
                                <div style={{textAlign: "left", paddingLeft: "20px"}}>Toimumise aeg:</div>
                            </div>
                        </div>
                        <div className="col-auto - variable width content">
                            <DatePicker
                                cancelLabel="TAGASI"
                                label="Alguskuupäev:"
                                okLabel="KINNITA"
                                keyboard={true}
                                minDate={Date.now()}
                                invalidDateMessage="Palun kontrolli kuupäeva"
                                value={this.state.selectedStartDate}
                                onChange={this.handleStartDateChange}
                                format={format(this.state.selectedStartDate, 'dd/MM/YYYY', { awareOfUnicodeTokens: true })}
                            />
                        </div>
                        <div className="col-auto - variable width content">
                            <TimePicker
                                clearable
                                ampm={false}
                                label="Algusaeg:"
                                value={this.state.selectedStartTime}
                                onChange={this.handleStartTimeChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                        </div>
                        <div className="col-auto - variable width content">
                            <DatePicker
                                cancelLabel="TAGASI"
                                label="Lõppkuupäev:"
                                okLabel="KINNITA"
                                keyboard={true}
                                minDate={Date.now()}
                                invalidDateMessage="Palun kontrolli kuupäeva"
                                value={this.state.selectedEndDate}
                                onChange={this.handleEndDateChange}
                                format={format(this.state.selectedEndDate, 'dd/MM/YYYY', { awareOfUnicodeTokens: true })}
                            />
                        </div>
                        <div className="col-auto - variable width content">
                            <TimePicker
                                clearable
                                ampm={false}
                                label="Lõppaeg:"
                                value={this.state.selectedEndTime}
                                onChange={this.handleEndTimeChange}
                            />
                        </div>
                    </div>

                {/*<Button onClick={this.eventHandler()} disabled={!this.state.formIsValid}>EDASI</Button>*/}

            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }

        return <BodyBackgroundColor backgroundColor='#eee2dc'>
            <div className="container">
                <div className="row">
                    <EventCreationTracker activePage={this.state.currentPage}/>
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-12 col-md-6 mb-4">
                                <EventCreationDetails form={form} activePage={this.state.currentPage} onClick={this.triggerNext} hidden={!this.state.inEventDetails}/>
                                <EventCreationPicture activePage={this.state.currentPage} onClick={this.triggerNext} onDrop={this.onDrop} hidden={!this.state.inEventPicture}/>
                                <EventCreationConfirmation
                                    activePage={this.state.currentPage}
                                    onClick={this.handleSubmit}
                                    hidden={!this.state.inEventConfirmation}
                                    name={formData.name}
                                    description={formData.description}
                                    openToPublic={this.state.openToPublic}
                                    unlimitedParticipants={this.state.unlimitedParticipants}
                                    maxParticipants={this.state.maxParticipants}
                                    address={address}
                                    startDate={this.state.selectedStartDate}
                                    startTime={this.state.selectedStartTime}
                                    endDate={this.state.selectedEndDate}
                                    endTime={this.state.selectedEndTime}
                                    boardGameCat={this.state.boardgames}
                                    cardGameCat={this.state.cardgames}
                                    miniatureCat={this.state.miniatures}
                                    classicalCat={this.state.classical}
                                    roleplayingCat={this.state.roleplaying}
                                    diceGameCat={this.state.dicegames}
                                    tileGameCat={this.state.tilegames}
                                    picture={this.state.picture}
                                />
                                <EventCreationInvite
                                    filterByName={this.filterByName}
                                    people={this.state.people}
                                    groups={this.state.myGroups}
                                    activePage={this.state.currentPage}
                                    onClick={this.submitUsersAndGroups}
                                    hidden={!this.state.inEventInvite}
                                    groupClicked={this.groupClicked}
                                    userClicked={this.userClicked}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BodyBackgroundColor>
    }
}

export default withRouter(CreateEvent);