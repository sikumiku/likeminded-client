import React from 'react';
import classes from './PeopleMenu.module.css'
import CategoryList from '../../CategoryList/CategoryList'

const peopleMenu = (props) => {
    return (
        <div className="col-lg-3">
            <h1 className={classes.PeopleMenu}>LEIA INIMESI</h1>
            {/*nimefilter*/}
            {/*asukohafilter*/}
            <CategoryList options={props.options} selectedOption={props.selectedOption} onOptionClick={props.onOptionClick}/>
        </div>
    );
};

export default peopleMenu;