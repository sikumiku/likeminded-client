import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import EventCreationTracker from '../../../components/Events/EventCreationTracker/EventCreationTracker'
import { Button } from "react-bootstrap";
import EventCreationDetails from '../../../components/Events/EventCreationFlow/EventCreationDetails/EventCreationDetails';
import EventCreationPicture from '../../../components/Events/EventCreationFlow/EventCreationPicture/EventCreationPicture';
import EventCreationConfirmation from '../../../components/Events/EventCreationFlow/EventCreationConfirmation/EventCreationConfirmation';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './CreateEvent.module.css';

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
            },
            // openToPublicYes: {
            //     elementType: 'radio',
            //     elementConfig: {
            //         name: "openToPublicTrue"
            //     },
            //     value: "Jah",
            //     validation: {},
            //     valid: true
            // },
            // openToPublicNo: {
            //     elementType: 'radio',
            //     elementConfig: {
            //         name: "openToPublicFalse"
            //     },
            //     value: "Ei",
            //     validation: {},
            //     valid: true
            // },
            // unlimitedParticipantsYes: {
            //     elementType: 'radio',
            //     elementConfig: {
            //         name: "unlimitedParticipantsTrue"
            //     },
            //     value: "Jah",
            //     validation: {},
            //     valid: true
            // },
            // unlimitedParticipantsNo: {
            //     elementType: 'radio',
            //     elementConfig: {
            //         name: "unlimitedParticipantsFalse"
            //     },
            //     value: "Ei",
            //     validation: {},
            //     valid: true
            // },
            // maxParticipants: {
            //     elementType: 'input',
            //     elementConfig: {
            //         type: 'number'
            //     },
            //     value: '',
            //     validation: {
            //         required: false,
            //         isNumeric: true
            //     },
            //     valid: false,
            //     touched: false
            // },
            // categoryBoardGame: {
            //     elementType: 'checkbox',
            //     elementConfig: {
            //         name: 'category1',
            //         fieldName: 'Lauamängud',
            //         checked: true
            //     },
            //     value: 'boardgames',
            //     validation: {
            //         required: false
            //     },
            //     valid: true
            // },
            // categoryCardgame: {
            //     elementType: 'checkbox',
            //     elementConfig: {
            //         name: 'category2',
            //         fieldName: 'Kaardimängud',
            //         checked: true
            //     },
            //     value: 'cardGames',
            //     validation: {
            //         required: false
            //     },
            //     valid: true
            // },
            // categoryClassical: {
            //     elementType: 'checkbox',
            //     elementConfig: {
            //         name: 'category3',
            //         fieldName: 'Klassikalised mängud',
            //         checked: true
            //     },
            //     value: 'classical',
            //     validation: {
            //         required: false
            //     },
            //     valid: true
            // },
            // categoryDiceGames: {
            //     elementType: 'checkbox',
            //     elementConfig: {
            //         name: 'category4',
            //         fieldName: 'Täringumängud',
            //         checked: true
            //     },
            //     value: 'diceGames',
            //     validation: {
            //         required: false
            //     },
            //     valid: true
            // },
            // categoryMiniatures: {
            //     elementType: 'checkbox',
            //     elementConfig: {
            //         name: 'category5',
            //         fieldName: 'Rollimängud',
            //         checked: true
            //     },
            //     value: 'roleplaying',
            //     validation: {
            //         required: false
            //     },
            //     valid: true
            // },
            // categoryRoleplaying: {
            //     elementType: 'checkbox',
            //     elementConfig: {
            //         name: 'category6',
            //         fieldName: '"Tile" mängud',
            //         checked: true
            //     },
            //     value: 'cardGames',
            //     validation: {
            //         required: false
            //     },
            //     valid: true
            // },
            // categoryTileGames: {
            //     elementType: 'checkbox',
            //     elementConfig: {
            //         name: 'category7',
            //         fieldName: 'Miniatuurimängud',
            //         checked: true
            //     },
            //     value: 'miniatures',
            //     validation: {
            //         required: false
            //     },
            //     valid: true
            // }
        },
        event: {
            name: "An event",
            description: "Description",
            openToPublic: true,
            unlimitedParticipants: true,
            maxParticipants: 15,
            categories: ["BOARDGAMES", "DICEGAMES"]
        },
        openToPublic: true,
        unlimitedParticipants: true,
        inEventDetails: true,
        inEventPicture: false,
        inEventConfirmation: false,
        currentPage: "eventDetails",
        formIsValid: false,
        loading: false
    };

    handleOptionChange = () => {
        console.log("option changes");
        // this.setState({
        //     targetOption: event.target.value
        // });
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
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.eventDetailsForm) {
            formData[formElementIdentifier] = this.state.eventDetailsForm[formElementIdentifier].value;
        }
        const eventt = {

        };
        //post data (start using axios?)
    };

    // async handleSubmit(event) {
    //     event.preventDefault();
    //     const {item} = this.state;
    //
    //     await fetch('/api/v1/event', {
    //         method: (item.id) ? 'PUT' : 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(item)
    //         // credentials: 'include'
    //     });
    //     this.props.history.push('/events');
    // }

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
                        optionChange={this.handleOptionChange}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <div className="row">
                    <div className="col-3">
                        <div className={classes.FormRow}>
                            <div style={{textAlign: "left", paddingLeft: "20px"}}>Avatud üritus:</div>
                        </div>
                    </div>
                    <div className="col-auto - variable width content">
                        <div className={classes.FormRow}>
                            <input className={classes.CreateEventFormElement} onChange={this.handleOptionChange} type="radio" name="openToPublic" value="yes" defaultChecked/>Jah
                        </div>
                    </div>
                    <div className="col-auto - variable width content">
                        <div className={classes.FormRow}>
                            <input className={classes.CreateEventFormElement} onChange={this.handleOptionChange} type="radio" name="openToPublic" value="no"/>Ei
                        </div>
                    </div>
                </div>
                <Button>ORDER</Button>

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