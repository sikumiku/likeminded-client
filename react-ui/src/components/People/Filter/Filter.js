import React, {Component} from "react";
import classes from './Filter.module.css';
import Aux from '../../../hoc/Auxilliary/Auxilliary';

class filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            filter: e.target.value
        });
        this.props.filter(e.target.value)
    };

    render() {
        return (
            <Aux>
                <label className={classes.FilterPanel} htmlFor="filter">{this.props.label}</label>
                <input className={classes.FilterInput}
                       type="text" id="filter"
                       value={this.state.filter}
                       onChange={this.handleChange}/>
            </Aux>

        )
    }
}

export default filter;
