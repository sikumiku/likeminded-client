import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './CreateGroup.module.css';
import {postGroup} from '../../../apiUtil/groupApi';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import GroupCreationDetails from "../../../components/Groups/GroupCreationFlow/GroupCreationDetails/GroupCreationDetails";
import GroupCreationPicture from "../../../components/Groups/GroupCreationFlow/GroupCreationPicture/GroupCreationPicture";
import GroupCreationConfirmation from "../../../components/Groups/GroupCreationFlow/GroupCreationConfirmation/GroupCreationConfirmation";
import GroupCreationTracker from "../../../components/Groups/GroupCreationTracker/GroupCreationTracker";

class CreateGroup extends Component {
    state = {
        groupDetailsForm: {
            name: {
                title: "Nimi",
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
                title: "Kirjeldus",
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
        categories: [],
        boardgames: true,
        cardgames: true,
        tilegames: true,
        roleplaying: true,
        miniatures: true,
        classical: true,
        dicegames: true,
        categoriesTouched: false,
        inGroupDetails: true,
        inGroupPicture: false,
        inGroupConfirmation: false,
        currentPage: "groupDetails",
        formIsValid: false,
        loading: false
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedGroupDetailsForm = {
            ...this.state.groupDetailsForm
        };
        const updatedFormElement = {
            ...updatedGroupDetailsForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedGroupDetailsForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedGroupDetailsForm) {
            formIsValid = updatedGroupDetailsForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({groupDetailsForm: updatedGroupDetailsForm, formIsValid: formIsValid});
    };

    // inputChanged = (event) => {
    //     this.setState({maxParticipants: event.target.value});
    // };

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

    handleSubmit = () => {
        const formData = {};
        for (let formElementIdentifier in this.state.groupDetailsForm) {
            formData[formElementIdentifier] = this.state.groupDetailsForm[formElementIdentifier].value;
        }

        // const categories = [];
        // if (this.state.boardgames) {
        //     categories.push("BOARDGAMES");
        // }
        // if (this.state.cardgames) {
        //     categories.push("CARDGAMES");
        // }
        // if (this.state.classical) {
        //     categories.push("CLASSICAL");
        // }
        // if (this.state.dicegames) {
        //     categories.push("DICEGAMES");
        // }
        // if (this.state.roleplaying) {
        //     categories.push("ROLEPLAYING");
        // }
        // if (this.state.miniatures) {
        //     categories.push("MINIATURES");
        // }
        // if (this.state.tilegames) {
        //     categories.push("TILEGAMES");
        // }

        postGroup({
            name: formData.name,
            description: formData.description
            // categories: categories
        }).then(result => {
            console.log("Post was success! " + result)
        }).catch(error => {
            console.log(error);
        });
        this.props.history.push('/groups');
    };

    triggerNext = (page) => {
        switch (page) {
            case "groupDetails":
                this.setState({inGroupDetails: false, inGroupPicture: true, inGroupConfirmation: false, currentPage: "groupPicture"});
                break;
            case "eventPicture":
                this.setState({inGroupPicture: false, inGroupConfirmation: true, inGroupDetails: false, currentPage: "groupConfirmation"});
                break;
            case "eventConfirmation":
                this.setState({inGroupConfirmation: false, inGroupDetails: true, inGroupPicture: false, currentPage: "groupDetails"});
                break;
            default:
                this.setState({inGroupConfirmation: false, inGroupPicture: false, inGroupDetails: true, currentPage: "groupDetails"});
        }
    };

    // changeCategoryWithFalse(category) {
    //     switch (category){
    //         case "boardgames":
    //             this.setState({boardgames: true});
    //             this.setState({cardgames: false});
    //             this.setState({tilegames: false});
    //             this.setState({classical: false});
    //             this.setState({dicegames: false});
    //             this.setState({roleplaying: false});
    //             this.setState({miniatures: false});
    //             break;
    //         case "cardgames":
    //             this.setState({boardgames: false});
    //             this.setState({cardgames: true});
    //             this.setState({tilegames: false});
    //             this.setState({classical: false});
    //             this.setState({dicegames: false});
    //             this.setState({roleplaying: false});
    //             this.setState({miniatures: false});
    //             break;
    //         case "tilegames":
    //             this.setState({boardgames: false});
    //             this.setState({cardgames: false});
    //             this.setState({tilegames: true});
    //             this.setState({classical: false});
    //             this.setState({dicegames: false});
    //             this.setState({roleplaying: false});
    //             this.setState({miniatures: false});
    //             break;
    //         case "classical":
    //             this.setState({boardgames: false});
    //             this.setState({cardgames: false});
    //             this.setState({tilegames: false});
    //             this.setState({classical: true});
    //             this.setState({dicegames: false});
    //             this.setState({roleplaying: false});
    //             this.setState({miniatures: false});
    //             break;
    //         case "dicegames":
    //             this.setState({boardgames: false});
    //             this.setState({cardgames: false});
    //             this.setState({tilegames: false});
    //             this.setState({classical: false});
    //             this.setState({dicegames: true});
    //             this.setState({roleplaying: false});
    //             this.setState({miniatures: false});
    //             break;
    //         case "roleplaying":
    //             this.setState({boardgames: false});
    //             this.setState({cardgames: false});
    //             this.setState({tilegames: false});
    //             this.setState({classical: false});
    //             this.setState({dicegames: false});
    //             this.setState({roleplaying: true});
    //             this.setState({miniatures: false});
    //             break;
    //         case "miniatures":
    //             this.setState({boardgames: false});
    //             this.setState({cardgames: false});
    //             this.setState({tilegames: false});
    //             this.setState({classical: false});
    //             this.setState({dicegames: false});
    //             this.setState({roleplaying: false});
    //             this.setState({miniatures: true});
    //             break;
    //         default:
    //             return;
    //     }
    // }

    // changeCategory(category) {
    //     switch (category){
    //         case "boardgames":
    //             this.setState({boardgames: !this.state.boardgames});
    //             break;
    //         case "cardgames":
    //             this.setState({cardgames: !this.state.cardgames});
    //             break;
    //         case "tilegames":
    //             this.setState({tilegames: !this.state.tilegames});
    //             break;
    //         case "classical":
    //             this.setState({classical: !this.state.classical});
    //             break;
    //         case "dicegames":
    //             this.setState({dicegames: !this.state.dicegames});
    //             break;
    //         case "roleplaying":
    //             this.setState({roleplaying: !this.state.roleplaying});
    //             break;
    //         case "miniatures":
    //             this.setState({miniatures: !this.state.miniatures});
    //             break;
    //         default:
    //             return;
    //     }
    // }

    // handleCategoryChange = (event) => {
    //     const incomingKey = event.target.value;
    //     if (!this.state.categoriesTouched) {
    //         this.changeCategoryWithFalse(incomingKey);
    //         this.setState({categoriesTouched: true});
    //     } else {
    //         this.changeCategory(incomingKey);
    //     }
    // };

    render() {

        const formElementsArray = [];
        for (let key in this.state.groupDetailsForm) {
            formElementsArray.push({
                id: key,
                config: this.state.groupDetailsForm[key]
            });
        }
        let form = (
            <form className={classes.CreateGroupForm} onSubmit={this.eventHandler}>
                {formElementsArray.map(formElement => (
                    <Aux key={formElement.config.title}>
                        <div>{formElement.config.title}</div>
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    </Aux>
                ))}
                {/*<div className="row">*/}
                    {/*<div className="col-4">*/}
                        {/*<div className={classes.FormRow}>*/}
                            {/*<div style={{textAlign: "left", paddingLeft: "20px"}}>Ürituse kategooriad:</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*/!*TODO: add allCategories and trigger other checkboxes based on it*!/*/}
                    {/*<div className="col-6">*/}
                        {/*<Checkbox name="category1" value="boardgames" label=" Lauamängud" onChange={this.handleCategoryChange}/>*/}
                        {/*<Checkbox name="category2" value="dicegames" label=" Täringumängud" onChange={this.handleCategoryChange}/>*/}
                        {/*<Checkbox name="category3" value="cardgames" label=" Kaardimängud" onChange={this.handleCategoryChange}/>*/}
                        {/*<Checkbox name="category4" value="classical" label=" Klassikalised mängud" onChange={this.handleCategoryChange}/>*/}
                        {/*<Checkbox name="category5" value="tilegames" label=" 'Tile' mängud" onChange={this.handleCategoryChange}/>*/}
                        {/*<Checkbox name="category6" value="roleplaying" label=" Rollimängud" onChange={this.handleCategoryChange}/>*/}
                        {/*<Checkbox name="category7" value="miniatures" label=" Miniatuurimängud" onChange={this.handleCategoryChange}/>*/}
                    {/*</div>*/}
                {/*</div>*/}

                {/*<Button onClick={this.eventHandler()} disabled={!this.state.formIsValid}>EDASI</Button>*/}

            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }

        return <BodyBackgroundColor backgroundColor='#eee2dc'>
            <div className="container">
                <div className="row">
                    <GroupCreationTracker activePage={this.state.currentPage}/>
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-12 col-md-6 mb-4">
                                {/*//TODO: amend onClick handler (confirmation page is for submitting event)*/}
                                <GroupCreationDetails form={form} activePage={this.state.currentPage} onClick={this.handleSubmit} hidden={!this.state.inGroupDetails}/>
                                <GroupCreationPicture activePage={this.state.currentPage} onClick={this.triggerNext} hidden={!this.state.inGroupPicture}/>
                                <GroupCreationConfirmation activePage={this.state.currentPage} onClick={this.triggerNext} hidden={!this.state.inGroupConfirmation}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BodyBackgroundColor>
    }
}

export default withRouter(CreateGroup);