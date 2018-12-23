import React, {Component} from 'react';
import {getMyGroups} from "../../../apiUtil/userApi";
import GroupList from "../../../components/Groups/GroupList/GroupList";
import MyGroupMenu from "../../../components/Groups/MyGroupMenu/MyGroupMenu";
import BodyBackgroundColor from 'react-body-backgroundcolor';

class MyGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myGroups: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});

        getMyGroups()
            .then(data => {
                console.log(data);
                this.setState({myGroups: data, isLoading: false});
            });
    }

    render() {
        return (
            <BodyBackgroundColor backgroundColor='#eee2dc'>
                <div>
                    <div className="container">
                        <div className="row">
                            <MyGroupMenu options={this.state.options} selectedOption={this.state.selectedOption} onOptionClick={this.onOptionClick}/>
                            <GroupList groups={this.state.myGroups} isLoading={this.state.isLoading}/>
                        </div>
                    </div>
                </div>
            </BodyBackgroundColor>
        );
    };
}

export default MyGroups;