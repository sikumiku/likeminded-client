import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import {getGroups} from "../../../apiUtil/groupApi";
import GroupMenu from '../../../components/Groups/GroupMenu/GroupMenu';
import GroupList from "../../../components/Groups/GroupList/GroupList";

class GroupHub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            cachedGroups: [],
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

        getGroups()
            .then(data => {
                this.setState({groups: data, isLoading: false, cachedGroups: data});
                console.log(data)
            });
    }

    onOptionClick = (optionObject) => {
        // this.setState({ selectedOption: optionObject });
        //
        // if (optionObject.option === "ALL") {
        //     const cachedGroups = this.state.cachedGroups;
        //     this.setState({groups: cachedGroups});
        // } else {
        //     const groups = this.state.cachedGroups;
            // const updatedGroups = groups.filter(function (group) {
                // const categories = event.categories;
                // let match = false;
                // if (categories) {
                //     categories.forEach(category => {
                //         if (category.name === optionObject.option) {
                //             match = true;
                //             return match;
                //         }
                //     });
                // }
            //     return match;
            // });
            // this.setState({groups: updatedGroups});
        // }
    };

    async remove(id) {
        await fetch(`http://localhost:8080/api/v1/event/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedEvents = [...this.state.events].filter(i => i.id !== id);
            this.setState({events: updatedEvents});
        });
    }

    render() {
        return (
            <BodyBackgroundColor backgroundColor='#eee2dc'>
                <div>
                    <div className="container">
                        <div className="row">
                            <GroupMenu options={this.state.options} selectedOption={this.state.selectedOption} onOptionClick={this.onOptionClick}/>
                            <GroupList groups={this.state.groups} isLoading={this.state.isLoading}/>
                        </div>
                    </div>
                </div>
            </BodyBackgroundColor>
        );
    };
}
export default withRouter(GroupHub);