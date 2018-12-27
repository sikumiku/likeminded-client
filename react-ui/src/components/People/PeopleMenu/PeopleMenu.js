import React from 'react';
import classes from './PeopleMenu.module.css'
import CategoryList from '../../CategoryList/CategoryList'
import Filter from '../Filter/Filter'

const peopleMenu = (props) => {
    return (
        <div className="col-lg-3">
            <h1 className={classes.PeopleMenu}>LEIA INIMESI</h1>
            <Filter filter={props.filterByName} label="Nimi:"/>
            <Filter filter={props.filterByLocation} label="Asukoht/Linn:"/>
            <div className={classes.CategoryList}>
                <CategoryList options={props.options} selectedOption={props.selectedOption} onOptionClick={props.onOptionClick}/>
            </div>
        </div>
    );
};

export default peopleMenu;