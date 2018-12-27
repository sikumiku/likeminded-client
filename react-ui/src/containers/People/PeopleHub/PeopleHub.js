import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import {getPeople} from "../../../apiUtil/peopleApi";
import PeopleMenu from '../../../components/People/PeopleMenu/PeopleMenu';
import PeopleList from "../../../components/People/PeopleList/PeopleList";

class PeopleHub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            cachedPeople: [],
            isLoading: true,
            progress: 50,
            options: [
                {option: 'ALL', title: 'Kõik kategooriad'},
                {option: 'BOARDGAMES', title: 'Lauamängud'},
                {option: 'DICEGAMES', title: 'Täringumängud'},
                {option: 'ROLEPLAYING', title: 'Rollimängud'},
                {option: 'MINIATURES', title: 'Miniatuurimängud'},
                {option: 'TILEGAMES', title: '"Tile" mängud'},
                {option: 'CLASSICAL', title: 'Klassikalised mängud'},
                {option: 'CARDGAMES', title: 'Kaardimängud'},
            ],
            selectedOption: {option: 'ALL', title: 'Kõik kategooriad'}
        };
        this.remove = this.remove.bind(this);
    }

    componentWillMount() {
        this.setState({selectedOption : {option: 'ALL', title: 'Kõik kategooriad'}})
    }

    componentDidMount() {
        this.setState({isLoading: true});

        getPeople()
            .then(data => {
                this.setState({people: data, isLoading: false, cachedPeople: data});
            });
    }

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

    filterByLocation = (locationFilter) => {
        let people = this.state.cachedPeople;
        people = people.filter((person) => {
            let city = "";
            if (person.address && person.address.city) {
                city = person.address.city.toLowerCase()
            }
            return city.indexOf(
                locationFilter.toLowerCase()) !== -1
        });
        this.setState({
            people
        })
    };

    onOptionClick = (optionObject) => {
        this.setState({ selectedOption: optionObject });

        if (optionObject.option === "ALL") {
            const cachedPeople = this.state.cachedPeople;
            this.setState({people: cachedPeople});
        } else {
            const people = this.state.cachedPeople;
        const updatedPeople = people.filter(function (people) {
        const categories = people.categories;
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
        this.setState({people: updatedPeople});
        }
    };

    async remove(id) {
        await fetch(`http://localhost:8080/api/v1/event/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedPeople = [...this.state.people].filter(i => i.id !== id);
            this.setState({people: updatedPeople});
        });
    }

    render() {
        return (
            <BodyBackgroundColor backgroundColor='#eee2dc'>
                <div>
                    <div className="container">
                        <div className="row">
                            <PeopleMenu options={this.state.options} selectedOption={this.state.selectedOption} onOptionClick={this.onOptionClick} filterByName={this.filterByName} filterByLocation={this.filterByLocation}/>
                            <PeopleList people={this.state.people} isLoading={this.state.isLoading} />
                        </div>
                    </div>
                </div>
            </BodyBackgroundColor>
        );
    };
}
export default withRouter(PeopleHub);