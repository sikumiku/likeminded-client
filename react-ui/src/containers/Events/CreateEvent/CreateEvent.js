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
import {postEvent} from '../../../apiUtil/eventApi';

class CreateEvent extends Component {
    state = {
        eventDetailsForm: {
            name: {
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
        currentPage: "eventDetails",
        formIsValid: false,
        loading: false
    };

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

        console.log(formData);
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

        postEvent({
            name: formData.name,
            description: formData.description,
            openToPublic: this.state.openToPublic,
            unlimitedParticipants: this.state.unlimitedParticipants,
            maxParticipants: this.state.maxParticipants,
            categories: categories
        }).then(result => {
            console.log("Post was success! " + result)
        }).catch(error => {
            console.log(error);
        });
        this.props.history.push('/events');
    };

    triggerNext = (page) => {
        switch (page) {
            case "eventDetails":
                this.setState({inEventDetails: false, inEventPicture: true, inEventConfirmation: false, currentPage: "eventPicture"});
                break;
            case "eventPicture":
                this.setState({inEventPicture: false, inEventConfirmation: true, inEventDetails: false, currentPage: "eventConfirmation"});
                break;
            case "eventConfirmation":
                this.setState({inEventConfirmation: false, inEventDetails: true, inEventPicture: false, currentPage: "eventDetails"});
                break;
            default:
                this.setState({inEventConfirmation: false, inEventPicture: false, inEventDetails: true, currentPage: "eventDetails"});
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
        const incomingKey = event.target.value;
        if (!this.state.categoriesTouched) {
            this.changeCategoryWithFalse(incomingKey);
            this.setState({categoriesTouched: true});
        } else {
            this.changeCategory(incomingKey);
        }
    };

    render() {

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
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
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
                                {/*//TODO: amend onClick handler (confirmation page is for submitting event)*/}
                                <EventCreationDetails form={form} activePage={this.state.currentPage} onClick={this.handleSubmit} hidden={!this.state.inEventDetails}/>
                                <EventCreationPicture activePage={this.state.currentPage} onClick={this.triggerNext} hidden={!this.state.inEventPicture}/>
                                <EventCreationConfirmation activePage={this.state.currentPage} onClick={this.triggerNext} hidden={!this.state.inEventConfirmation}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BodyBackgroundColor>
    }
}

export default withRouter(CreateEvent);